import React, { useState, useMemo } from "react";
import { Calendar, Flame, Zap, CheckCircle, Info } from "lucide-react";

const SKY_COLORS = {
  0: "#f3f4f6", // gray-100 (clean light neutral)
  1: "#bae6fd", // sky-200
  2: "#38bdf8", // sky-400
  3: "#0284c7", // sky-600
  4: "#0369a1", // sky-700
};

export default function SimiloxHeatmap({ heatmapStats }) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2026");

  const submissions = heatmapStats?.submissions || [];
  const totalSubmissions = heatmapStats?.totalSubmissionsYear || 842;
  const activeDays = heatmapStats?.activeDays || 246;
  const currentStreak = heatmapStats?.currentStreak || 18;
  const maxStreak = heatmapStats?.maxStreak || 41;

  // Group submissions by week (52 weeks x 7 days)
  const weeks = useMemo(() => {
    const result = [];
    let currentWeek = [];

    submissions.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === submissions.length - 1) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });

    return result;
  }, [submissions]);

  // Compute month label positions based on first week that month starts
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = "";

    weeks.forEach((week, weekIndex) => {
      const firstDayInWeek = week[0];
      if (firstDayInWeek && firstDayInWeek.month !== lastMonth) {
        labels.push({
          month: firstDayInWeek.month,
          weekIndex,
        });
        lastMonth = firstDayInWeek.month;
      }
    });

    return labels;
  }, [weeks]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    const date = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const MONTHS = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // SVG Dimension Constants for 100% pixel-perfect alignment
  const CELL_SIZE = 11;
  const CELL_GAP = 3.5;
  const STEP = CELL_SIZE + CELL_GAP; // 14.5px
  const LEFT_OFFSET = 34; // Margin for Mon/Wed/Fri day labels
  const TOP_OFFSET = 22; // Margin for Month labels
  const SVG_WIDTH = LEFT_OFFSET + 52 * STEP + 10; // ~798px
  const SVG_HEIGHT = TOP_OFFSET + 7 * STEP + 4; // ~128px

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
      {/* Top Header Row with Title, Stats & Year Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                Submission Activity Heatmap
              </h3>
              <p className="text-[11px] text-gray-400">
                {totalSubmissions} submissions in the last 12 months
              </p>
            </div>
          </div>
        </div>

        {/* 4 Summary Stats Chips */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs">
            <Flame className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-gray-500">Current:</span>
            <span className="font-bold text-gray-900">{currentStreak} days</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs">
            <Zap className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-gray-500">Max Streak:</span>
            <span className="font-bold text-gray-900">{maxStreak} days</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs">
            <CheckCircle className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-gray-500">Active:</span>
            <span className="font-bold text-gray-900">{activeDays} days</span>
          </div>

          {/* Year toggle buttons */}
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-xs">
            {["2026", "2025"].map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                  selectedYear === yr
                    ? "bg-white text-gray-900 font-bold shadow-2xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Perfectly Aligned SVG Heatmap Grid */}
      <div className="pt-4 overflow-x-auto custom-scrollbar flex justify-center">
        <div className="min-w-[780px] w-full flex justify-center py-2">
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full max-w-[800px] h-auto select-none overflow-visible"
          >
            {/* Month Labels - Positioned exactly above the starting week column */}
            {monthLabels.map((item, idx) => {
              const xPos = LEFT_OFFSET + item.weekIndex * STEP;
              return (
                <text
                  key={`${item.month}-${idx}`}
                  x={xPos}
                  y={13}
                  className="fill-gray-400 text-[10px] font-medium"
                >
                  {item.month}
                </text>
              );
            })}

            {/* Day of Week Labels - Perfectly vertically aligned with respective square rows */}
            {/* Mon: Row 1 */}
            <text
              x={LEFT_OFFSET - 8}
              y={TOP_OFFSET + 1 * STEP + 9}
              textAnchor="end"
              className="fill-gray-400 text-[9px] font-medium"
            >
              Mon
            </text>
            {/* Wed: Row 3 */}
            <text
              x={LEFT_OFFSET - 8}
              y={TOP_OFFSET + 3 * STEP + 9}
              textAnchor="end"
              className="fill-gray-400 text-[9px] font-medium"
            >
              Wed
            </text>
            {/* Fri: Row 5 */}
            <text
              x={LEFT_OFFSET - 8}
              y={TOP_OFFSET + 5 * STEP + 9}
              textAnchor="end"
              className="fill-gray-400 text-[9px] font-medium"
            >
              Fri
            </text>

            {/* 52x7 Heatmap Squares */}
            {weeks.map((week, wIdx) => {
              const colX = LEFT_OFFSET + wIdx * STEP;
              return (
                <g key={`week-${wIdx}`}>
                  {week.map((day, dIdx) => {
                    const rowY = TOP_OFFSET + dIdx * STEP;
                    const fillColor = SKY_COLORS[day.level] || SKY_COLORS[0];
                    const isHovered = hoveredDay?.date === day.date;

                    return (
                      <rect
                        key={day.date}
                        x={colX}
                        y={rowY}
                        width={CELL_SIZE}
                        height={CELL_SIZE}
                        rx={2.5}
                        ry={2.5}
                        fill={fillColor}
                        stroke={
                          isHovered
                            ? "#0284c7"
                            : day.level === 0
                            ? "#e5e7eb"
                            : "transparent"
                        }
                        strokeWidth={isHovered ? 1.5 : 0.5}
                        className="cursor-pointer transition-all hover:opacity-90"
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Heatmap Footer: Hover Tooltip & Sky Blue Legend */}
      <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Tooltip display */}
        <div className="text-gray-600 flex items-center gap-2 h-6">
          {hoveredDay ? (
            <span className="inline-flex items-center gap-1.5 font-medium animate-fadeIn">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-xs" />
              <strong className="text-gray-900">
                {hoveredDay.count} {hoveredDay.count === 1 ? "submission" : "submissions"}
              </strong>{" "}
              on {formatDate(hoveredDay.date)}
            </span>
          ) : (
            <span className="text-gray-400 text-[11px] flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-sky-500" />
              Hover over any square to view submission history
            </span>
          )}
        </div>

        {/* Sky Blue Legend */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 select-none">
          <span>Less</span>
          <div
            className="w-[10px] h-[10px] rounded-[2px] border border-gray-200 bg-[#f3f4f6]"
            title="0 submissions"
          />
          <div
            className="w-[10px] h-[10px] rounded-[2px] bg-[#bae6fd]"
            title="1-2 submissions"
          />
          <div
            className="w-[10px] h-[10px] rounded-[2px] bg-[#38bdf8]"
            title="3-5 submissions"
          />
          <div
            className="w-[10px] h-[10px] rounded-[2px] bg-[#0284c7]"
            title="6-9 submissions"
          />
          <div
            className="w-[10px] h-[10px] rounded-[2px] bg-[#0369a1]"
            title="10+ submissions"
          />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
