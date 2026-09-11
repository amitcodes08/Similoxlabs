import React from "react";
import { Layers } from "lucide-react";

export default function TopTopicsCard({ topics = [] }) {
  const topicCounts = {
    Arrays: "38 solved",
    "Two Pointers": "24 solved",
    "Dynamic Programming": "19 solved",
    Graphs: "15 solved",
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-sm font-semibold text-slate-900 tracking-tight flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-slate-600" />
          <span>Top topics:-</span>
        </h3>
        <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
          {topics.length} topics
        </span>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-3 space-y-3">
        {topics.map((topic) => (
          <div
            key={topic}
            className="flex items-center justify-between text-xs py-0.5"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              <span className="font-semibold text-slate-800">
                {topic}
              </span>
            </div>
            <span className="font-normal text-slate-400">
              {topicCounts[topic] || "12 solved"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
