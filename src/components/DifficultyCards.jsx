import React from "react";

export default function DifficultyCards({ problemSolving }) {
  const easy = problemSolving?.easy || { solved: 10, total: 100 };
  const medium = problemSolving?.medium || { solved: 1, total: 300 };
  const hard = problemSolving?.hard || { solved: 4, total: 90 };

  const difficulties = [
    {
      name: "Easy",
      solved: easy.solved,
      total: easy.total,
      textColor: "text-[#00B8A3]",
      badgeBg: "bg-emerald-50 text-[#00a895] border-emerald-200",
      barColor: "bg-[#00B8A3]",
      dotColor: "bg-[#00B8A3]",
    },
    {
      name: "Medium",
      solved: medium.solved,
      total: medium.total,
      textColor: "text-[#D97706]",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      barColor: "bg-[#FFC01E]",
      dotColor: "bg-[#FFC01E]",
    },
    {
      name: "Hard",
      solved: hard.solved,
      total: hard.total,
      textColor: "text-[#EF4444]",
      badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
      barColor: "bg-[#FF375F]",
      dotColor: "bg-[#FF375F]",
    },
  ];

  return (
    <div className="flex flex-col gap-2.5">
      {difficulties.map((diff) => {
        const percent = ((diff.solved / diff.total) * 100).toFixed(1);
        const progressWidth = Math.min(100, Math.max(3, (diff.solved / diff.total) * 100));

        return (
          <div
            key={diff.name}
            className="bg-[#f8fafc] border border-slate-200/90 rounded-xl p-3.5 shadow-sm transition-all hover:border-slate-300"
          >
            {/* Card header with exact layout from sketch: [Difficulty] on left, [Solved/Total] on right */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${diff.dotColor}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${diff.textColor}`}>
                  {diff.name}
                </span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${diff.badgeBg}`}>
                  {percent}%
                </span>
              </div>

              {/* Exact breakdown required: 10/100, 1/300, 4/90 */}
              <div className="text-xs font-bold text-slate-800">
                <span className={diff.textColor}>{diff.solved}</span>
                <span className="text-slate-400 font-normal"> / {diff.total}</span>
              </div>
            </div>

            {/* Minimal subtle progress bar */}
            <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
              <div
                className={`${diff.barColor} h-1.5 rounded-full transition-all duration-500`}
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
