import React from "react";
import { CheckCircle2 } from "lucide-react";

// Helper to calculate SVG arc path clockwise
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);
  const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    arcSweep,
    1,
    end.x,
    end.y,
  ].join(" ");
}

export default function SimiloxStatsDonut({ problemSolving }) {
  const easy = problemSolving?.easy || { solved: 168, total: 200 };
  const medium = problemSolving?.medium || { solved: 164, total: 240 };
  const hard = problemSolving?.hard || { solved: 52, total: 100 };
  const attempting = problemSolving?.attempting || 14;

  const totalSolved = easy.solved + medium.solved + hard.solved;
  const totalProblems = easy.total + medium.total + hard.total;
  const solvePercentage = Math.round((totalSolved / (totalProblems || 1)) * 100);

  // Circular gauge layout
  const cx = 95;
  const cy = 95;
  const r = 68;
  const strokeWidth = 6.5;

  // 3 Sectors matching LeetCode circular gauge:
  // 1. Medium: 290° to 385° (span: 95°)
  const medStart = 290;
  const medSpan = 95;
  const medRatio = medium.solved / (medium.total || 1);
  const medActiveSpan = Math.max(medRatio > 0 ? 8 : 0, medRatio * medSpan);

  // 2. Hard: 40° to 155° (span: 115°)
  const hardStart = 40;
  const hardSpan = 115;
  const hardRatio = hard.solved / (hard.total || 1);
  const hardActiveSpan = Math.max(hardRatio > 0 ? 8 : 0, hardRatio * hardSpan);

  // 3. Easy: 170° to 275° (span: 105°)
  const easyStart = 170;
  const easySpan = 105;
  const easyRatio = easy.solved / (easy.total || 1);
  const easyActiveSpan = Math.max(easyRatio > 0 ? 8 : 0, easyRatio * easySpan);

  // Custom distinct colors for Donut:
  // Easy: #00b8a3 (LeetCode Cyan / Teal)
  // Medium: #ffa116 (LeetCode Orange / Amber)
  // Hard: #ef4444 (LeetCode Red / Rose)
  // Track: #f3f4f6 (Gray-100)

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">
            Problems Solved
          </h3>
          <p className="text-[11px] text-gray-400">Curriculum & Practice Completion</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-gray-900">
            {solvePercentage}%
          </span>
          <span className="text-[11px] text-gray-400 block">Solved Rate</span>
        </div>
      </div>

      {/* Main Donut & Difficulty Stack */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-auto">
        {/* SVG Circular Donut */}
        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 190 190" className="w-full h-full">
            {/* Background Tracks */}
            <path
              d={describeArc(cx, cy, r, medStart, medStart + medSpan)}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d={describeArc(cx, cy, r, hardStart, hardStart + hardSpan)}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d={describeArc(cx, cy, r, easyStart, easyStart + easySpan)}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />

            {/* Active Foreground Arcs with distinct vibrant colors */}
            {/* Medium Arc (Amber) */}
            {medium.solved > 0 && (
              <path
                d={describeArc(cx, cy, r, medStart, medStart + medActiveSpan)}
                fill="none"
                stroke="#ffa116"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            )}

            {/* Hard Arc (Red) */}
            {hard.solved > 0 && (
              <path
                d={describeArc(cx, cy, r, hardStart, hardStart + hardActiveSpan)}
                fill="none"
                stroke="#ef4444"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            )}

            {/* Easy Arc (Teal/Cyan) */}
            {easy.solved > 0 && (
              <path
                d={describeArc(cx, cy, r, easyStart, easyStart + easyActiveSpan)}
                fill="none"
                stroke="#00b8a3"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Centered Numbers */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-1">
            <div className="flex items-baseline gap-0.5">
              <span className="text-3xl font-black tracking-tight text-gray-900 leading-none">
                {totalSolved}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                /{totalProblems}
              </span>
            </div>

            <div className="flex items-center gap-1 mt-1.5 text-gray-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00b8a3]" />
              <span className="text-xs font-semibold text-gray-700">Solved</span>
            </div>

            <div className="text-[11px] text-gray-400 mt-1 font-medium">
              {attempting} Attempting
            </div>
          </div>
        </div>

        {/* 3 Stacked Difficulty Breakdown Cards */}
        <div className="flex flex-col gap-2.5 w-full sm:w-36">
          {/* Easy Card */}
          <div className="bg-gray-50/80 hover:bg-gray-100 transition-colors rounded-xl py-2 px-3 border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-bold text-[#00b8a3] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00b8a3]" />
                Easy
              </span>
              <span className="text-[10px] text-gray-400">
                {Math.round((easy.solved / (easy.total || 1)) * 100)}%
              </span>
            </div>
            <div className="text-sm font-bold text-gray-900 tracking-tight">
              {easy.solved}{" "}
              <span className="text-xs text-gray-400 font-normal">/ {easy.total}</span>
            </div>
          </div>

          {/* Medium Card */}
          <div className="bg-gray-50/80 hover:bg-gray-100 transition-colors rounded-xl py-2 px-3 border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-bold text-[#ffa116] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ffa116]" />
                Medium
              </span>
              <span className="text-[10px] text-gray-400">
                {Math.round((medium.solved / (medium.total || 1)) * 100)}%
              </span>
            </div>
            <div className="text-sm font-bold text-gray-900 tracking-tight">
              {medium.solved}{" "}
              <span className="text-xs text-gray-400 font-normal">/ {medium.total}</span>
            </div>
          </div>

          {/* Hard Card */}
          <div className="bg-gray-50/80 hover:bg-gray-100 transition-colors rounded-xl py-2 px-3 border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-bold text-[#ef4444] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                Hard
              </span>
              <span className="text-[10px] text-gray-400">
                {Math.round((hard.solved / (hard.total || 1)) * 100)}%
              </span>
            </div>
            <div className="text-sm font-bold text-gray-900 tracking-tight">
              {hard.solved}{" "}
              <span className="text-xs text-gray-400 font-normal">/ {hard.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
        <span>Verified Submissions</span>
        <span>LeetCode & Similox Synced</span>
      </div>
    </div>
  );
}
