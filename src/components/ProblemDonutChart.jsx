import React from "react";
import { Check } from "lucide-react";

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

export default function ProblemDonutChart({ problemSolving, attempting = 2 }) {
  const easy = problemSolving?.easy || { solved: 10, total: 100 };
  const medium = problemSolving?.medium || { solved: 1, total: 300 };
  const hard = problemSolving?.hard || { solved: 4, total: 90 };

  const totalSolved = easy.solved + medium.solved + hard.solved;
  const totalProblems = easy.total + medium.total + hard.total;

  // Arc configuration matching LeetCode circular gauge layout:
  const cx = 95;
  const cy = 95;
  const r = 68;
  const strokeWidth = 5.5;

  // Exact 3 Sectors matching the reference screenshot:
  // 1. Medium (Yellow) at Top-Left: 290° to 385° (span: 95°)
  const medStart = 290;
  const medSpan = 95;
  const medRatio = medium.solved / (medium.total || 1);
  const medActiveSpan = Math.max(medRatio > 0 ? 8 : 0, medRatio * medSpan);

  // 2. Hard (Red) at Right: 40° to 155° (span: 115°)
  const hardStart = 40;
  const hardSpan = 115;
  const hardRatio = hard.solved / (hard.total || 1);
  const hardActiveSpan = Math.max(hardRatio > 0 ? 8 : 0, hardRatio * hardSpan);

  // 3. Easy (Teal) at Bottom-Left: 170° to 275° (span: 105°)
  const easyStart = 170;
  const easySpan = 105;
  const easyRatio = easy.solved / (easy.total || 1);
  const easyActiveSpan = Math.max(easyRatio > 0 ? 8 : 0, easyRatio * easySpan);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Left Side: Circular Donut Gauge */}
        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 190 190" className="w-full h-full">
            {/* Background Tracks */}
            <path
              d={describeArc(cx, cy, r, medStart, medStart + medSpan)}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d={describeArc(cx, cy, r, hardStart, hardStart + hardSpan)}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d={describeArc(cx, cy, r, easyStart, easyStart + easySpan)}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />

            {/* Active Foreground Arcs */}
            {medium.solved > 0 && (
              <path
                d={describeArc(
                  cx,
                  cy,
                  r,
                  medStart,
                  medStart + medActiveSpan
                )}
                fill="none"
                stroke="#ffc01e"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            )}
            {hard.solved > 0 && (
              <path
                d={describeArc(
                  cx,
                  cy,
                  r,
                  hardStart,
                  hardStart + hardActiveSpan
                )}
                fill="none"
                stroke="#ff375f"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            )}
            {easy.solved > 0 && (
              <path
                d={describeArc(
                  cx,
                  cy,
                  r,
                  easyStart,
                  easyStart + easyActiveSpan
                )}
                fill="none"
                stroke="#00b8a3"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Centered Numbers strictly matching screenshot */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-1">
            <div className="flex items-baseline gap-0.5">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">
                {totalSolved}
              </span>
              <span className="text-xs text-slate-400 font-normal">
                /{totalProblems}
              </span>
            </div>

            <div className="flex items-center gap-1 mt-1 text-[#00b8a3]">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span className="text-xs font-semibold text-slate-700">Solved</span>
            </div>

            <div className="text-[11px] text-slate-400 mt-2 font-normal">
              {attempting} Attempting
            </div>
          </div>
        </div>

        {/* Right Side: 3 Stacked Difficulty Cards */}
        <div className="flex flex-col gap-2.5 w-full sm:w-32">
          {/* Easy Card */}
          <div className="bg-white hover:bg-slate-50 transition-colors rounded-xl py-2 px-3 text-center border border-slate-200/80 shadow-xs">
            <div className="text-xs font-semibold text-[#00b8a3] mb-0.5">
              Easy
            </div>
            <div className="text-sm font-bold text-slate-900 tracking-tight">
              {easy.solved}/{easy.total}
            </div>
          </div>

          {/* Medium Card */}
          <div className="bg-white hover:bg-slate-50 transition-colors rounded-xl py-2 px-3 text-center border border-slate-200/80 shadow-xs">
            <div className="text-xs font-semibold text-[#ffa116] mb-0.5">
              Med.
            </div>
            <div className="text-sm font-bold text-slate-900 tracking-tight">
              {medium.solved}/{medium.total}
            </div>
          </div>

          {/* Hard Card */}
          <div className="bg-white hover:bg-slate-50 transition-colors rounded-xl py-2 px-3 text-center border border-slate-200/80 shadow-xs">
            <div className="text-xs font-semibold text-[#ff375f] mb-0.5">
              Hard
            </div>
            <div className="text-sm font-bold text-slate-900 tracking-tight">
              {hard.solved}/{hard.total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
