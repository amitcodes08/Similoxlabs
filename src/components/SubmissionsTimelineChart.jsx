import React, { useState, useEffect, useRef, useMemo, useSyncExternalStore } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-md text-xs">
        <div className="font-semibold text-slate-800 mb-1">{label}</div>
        <div className="flex items-center gap-1.5 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-[#FFA116]"></span>
          <span>
            Submissions: <strong className="text-slate-900">{payload[0].value}</strong>
          </span>
        </div>
      </div>
    );
  }
  return null;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function SubmissionsTimelineChart({
  submissionsTimeline = [],
  totalSubmissions = 780,
}) {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(1200);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mounted && scrollRef.current) {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
      }, 50);
    }
  }, [mounted, submissionsTimeline]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -260 : 260,
        behavior: "smooth",
      });
    }
  };

  const totalRecent = submissionsTimeline.reduce((acc, item) => acc + item.count, 0);
  const firstDate = submissionsTimeline[0]?.date || "";
  const lastDate = submissionsTimeline[submissionsTimeline.length - 1]?.date || "";
  const daysCount = submissionsTimeline.length;

  const innerChartWidth = Math.max(800, daysCount * 47);

  // Maximum value in dataset
  const maxActualCount = Math.max(
    ...submissionsTimeline.map((d) => d.count || 0),
    0
  );

  // Dynamic Y-axis scale and tick generation based on data amplitude
  const { yAxisMax, yTicks } = useMemo(() => {
    if (maxActualCount <= 5) {
      const top = Math.max(4, maxActualCount + 1);
      return {
        yAxisMax: top,
        yTicks: Array.from({ length: top + 1 }, (_, i) => i),
      };
    }
    if (maxActualCount <= 12) {
      const top = Math.ceil((maxActualCount + 2) / 4) * 4;
      return {
        yAxisMax: top,
        yTicks: [0, Math.round(top / 2), top],
      };
    }
    if (maxActualCount <= 30) {
      const top = Math.ceil((maxActualCount + 4) / 10) * 10;
      const ticks = [0, 10, 20, 30];
      if (top > 30) ticks.push(top);
      return { yAxisMax: top, yTicks: ticks };
    }
    const top = Math.ceil((maxActualCount + 6) / 10) * 10;
    const step = Math.round(top / 4);
    return {
      yAxisMax: top,
      yTicks: [0, step, step * 2, step * 3, top],
    };
  }, [maxActualCount]);

  // Dynamically calculated optimal height based on viewport width and data amplitude
  const dynamicHeight = useMemo(() => {
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth < 1024;

    if (isMobile) {
      return maxActualCount <= 6 ? 210 : 240;
    }
    if (isTablet) {
      return maxActualCount <= 6 ? 230 : 270;
    }

    // Desktop view: scale proportionally to data range
    if (maxActualCount <= 6) return 245;
    if (maxActualCount <= 15) return 275;
    if (maxActualCount <= 30) return 310;
    return 335;
  }, [windowWidth, maxActualCount]);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Total Submissions - {totalSubmissions}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Submission activity timeline {firstDate && lastDate ? `(${firstDate} to ${lastDate})` : ""}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Last {daysCount} Days</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
                className="p-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
                title="Scroll to older dates"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
                className="p-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
                title="Scroll to recent dates"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="w-full overflow-x-auto pt-6 pb-2 scroll-smooth select-none"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 transparent",
          }}
        >
          <div
            style={{
              width: `${innerChartWidth}px`,
              height: `${dynamicHeight}px`,
              transition: "height 250ms ease-out",
            }}
          >
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={submissionsTimeline}
                  margin={{ top: 15, right: 30, left: -10, bottom: 20 }}
                  onMouseMove={(state) => {
                    if (state?.activeTooltipIndex !== undefined) {
                      setHoveredIndex(state.activeTooltipIndex);
                    }
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <CartesianGrid
                    strokeDasharray="2 2"
                    stroke="#f1f5f9"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#cbd5e1"
                    tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                    tickLine={false}
                    axisLine={{ stroke: "#e2e8f0" }}
                    dy={12}
                    interval={0}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, yAxisMax]}
                    ticks={yTicks}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc", radius: 4 }} />
                  <Bar
                    dataKey="count"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={24}
                  >
                    {submissionsTimeline.map((entry, index) => {
                      const isHovered = hoveredIndex === index;
                      const fill = isHovered ? "#94a3b8" : "#cbd5e1";
                      return (
                        <Cell
                          key={`activity-bar-${index}`}
                          fill={fill}
                          className="transition-colors duration-200 cursor-pointer"
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full min-h-[300px] bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 text-xs animate-pulse">
                Loading timeline...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 mt-2 gap-1.5">
        <span>
          Timeline Submissions: <strong className="text-slate-800">{totalRecent}</strong>
        </span>
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <span>↔ Drag or use arrows to scroll through all {daysCount} days</span>
        </span>
      </div>
    </div>
  );
}
