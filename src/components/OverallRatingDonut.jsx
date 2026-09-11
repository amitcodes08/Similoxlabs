import React, { useSyncExternalStore } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function OverallRatingDonut({ rating = 80 }) {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const total = 100;
  const remaining = Math.max(0, total - rating);

  const data = [
    { name: "Achieved", value: rating, color: "#FFA116" },
    { name: "Remaining", value: remaining, color: "#F1F5F9" },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
          Overall Rating
        </h3>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded border border-gray-200 bg-gray-100 text-gray-600">
          Rank Score
        </span>
      </div>

      <div className="relative w-full h-44 flex items-center justify-center">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={66}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`overall-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-28 h-28 rounded-full border-8 border-slate-200 border-t-[#FFA116] animate-pulse" />
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {rating}/100
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">
            Rating
          </span>
        </div>
      </div>
    </div>
  );
}
