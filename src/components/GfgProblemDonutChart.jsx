import React from "react";
import { Check } from "lucide-react";

export default function GfgProblemDonutChart({
  breakdown = { school: 3, basic: 5, easy: 4, medium: 2, hard: 0 },
  totalSolved = 14,
}) {
  const categories = [
    { label: "School", count: breakdown.school ?? 3, color: "#64748b", bg: "bg-slate-50", text: "text-slate-700" },
    { label: "Basic", count: breakdown.basic ?? 5, color: "#3b82f6", bg: "bg-blue-50", text: "text-blue-600" },
    { label: "Easy", count: breakdown.easy ?? 4, color: "#2F9E44", bg: "bg-emerald-50", text: "text-[#2F9E44]" },
    { label: "Med.", count: breakdown.medium ?? 2, color: "#d97706", bg: "bg-amber-50", text: "text-amber-600" },
    { label: "Hard", count: breakdown.hard ?? 0, color: "#ef4444", bg: "bg-rose-50", text: "text-rose-600" },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Center circular gauge */}
        <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="7"
            />
            {/* Progress ring in GFG emerald green */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#2F9E44"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset="140"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-1">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">
              {totalSolved}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[#2F9E44]">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span className="text-xs font-semibold text-slate-700">Solved</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-normal">
              GFG Practice
            </div>
          </div>
        </div>

        {/* Stacked difficulty pill list */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 w-full sm:w-36">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className={`rounded-xl py-1.5 px-3 border border-slate-200/80 shadow-xs flex items-center justify-between ${cat.bg}`}
            >
              <span className={`text-xs font-semibold ${cat.text}`}>
                {cat.label}
              </span>
              <span className="text-xs font-bold text-slate-900 tracking-tight">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
