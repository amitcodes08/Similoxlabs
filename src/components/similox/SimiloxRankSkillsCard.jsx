import React from "react";
import { Trophy, Code2, Sparkles } from "lucide-react";

export default function SimiloxRankSkillsCard({ ranking, skills = [], languages = [] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      <div className="space-y-5">
        {/* Card Header & Rank Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-800">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                  Rank & Competency
                </h3>
                <p className="text-[11px] text-gray-400">Institutional & Batch Standing</p>
              </div>
            </div>

            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gray-900 text-white">
              {ranking?.rankBadge || "Tier 1"}
            </span>
          </div>

          {/* 3 Rank Metric Blocks */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <div className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                Institute Rank
              </div>
              <div className="text-base sm:text-lg font-extrabold text-gray-900 mt-0.5">
                #{ranking?.instituteRank || 7}
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                of {ranking?.totalStudents || 420}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <div className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                Batch Rank
              </div>
              <div className="text-base sm:text-lg font-extrabold text-gray-900 mt-0.5">
                #{ranking?.batchRank || 3}
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                of {ranking?.batchTotal || 140}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <div className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                Percentile
              </div>
              <div className="text-base sm:text-lg font-extrabold text-gray-900 mt-0.5">
                {ranking?.percentile || 98.4}%
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                Rating {ranking?.globalRating || 1845}
              </div>
            </div>
          </div>
        </div>

        {/* Top Skills Section */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gray-500" />
              <span>Top Skills</span>
            </div>
            <span className="text-[11px] text-gray-400 font-medium">Mastery level</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 6).map((skill) => (
              <div
                key={skill.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors text-xs font-medium text-gray-700"
              >
                <span>{skill.name}</span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-white text-gray-800 border border-gray-200">
                  {skill.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5 text-gray-500" />
              <span>Languages</span>
            </div>
            <span className="text-[11px] text-gray-400 font-medium">Solved distribution</span>
          </div>

          {/* Languages Multi-bar (Monochrome gray shades: 900, 700, 500, 300) */}
          <div className="w-full h-2 rounded-full bg-gray-100 flex overflow-hidden mb-3">
            {languages.map((lang, idx) => {
              const bgColors = ["bg-gray-900", "bg-gray-700", "bg-gray-500", "bg-gray-300"];
              return (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%` }}
                  className={`${bgColors[idx % bgColors.length]} h-full transition-all`}
                  title={`${lang.name}: ${lang.percentage}% (${lang.solved} solved)`}
                />
              );
            })}
          </div>

          {/* Languages legend & breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {languages.map((lang, idx) => {
              const dotColors = ["bg-gray-900", "bg-gray-700", "bg-gray-500", "bg-gray-300"];
              return (
                <div
                  key={lang.name}
                  className="p-2 rounded-lg bg-gray-50/80 border border-gray-100 flex flex-col"
                >
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium truncate">
                    <span className={`w-2 h-2 rounded-full ${dotColors[idx % dotColors.length]}`} />
                    <span className="truncate">{lang.name}</span>
                  </div>
                  <div className="flex items-baseline justify-between mt-1 text-[11px]">
                    <span className="font-bold text-gray-900">{lang.solved}</span>
                    <span className="text-gray-400">{lang.percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
