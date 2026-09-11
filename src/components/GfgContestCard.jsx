import React from "react";
import { Trophy, Globe2, Star, Calendar, ExternalLink, Flame } from "lucide-react";

function Sparkline({ data, width = 120, height = 40 }) {
  if (!Array.isArray(data) || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 6) - 3;
    return [x, y];
  });

  const path = points.map((p, i) => (i === 0 ? "M" : "L") + p[0] + "," + p[1]).join(" ");
  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path d={path} stroke="#2F9E44" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="3" fill="#2F9E44" />
    </svg>
  );
}

export default function GfgContestCard({ contestStats }) {
  const isRated = Boolean(contestStats?.rating && contestStats.rating > 0);

  const stats = contestStats || {
    attended: 6,
    rating: 1400,
    stars: 2,
    starText: "Rated",
    globalRank: 18643,
    ratingHistory: [0,0,0,0,0,0,1400],
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              GFG Contest Rating
            </p>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                isRated
                  ? "bg-emerald-50 text-[#2F9E44] border-emerald-200"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              {isRated ? `${stats.stars} ★ Rated` : "Unrated"}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-bold text-slate-900 tracking-tight">
              {isRated ? stats.rating : "—"}
            </p>
            {!isRated && (
              <span className="text-xs text-slate-400 font-normal">
                (No rated contests yet)
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-slate-600" />
            <span>Tier: <strong>{isRated ? `${stats.stars} Star` : "1 Star Target (≤ 1399)"}</strong></span>
          </p>
        </div>

        {isRated && stats.ratingHistory && stats.ratingHistory.length > 1 ? (
          <Sparkline data={stats.ratingHistory} />
        ) : <></>}
      </div>

      <div className="grid grid-cols-3 mt-5 pt-4 border-t border-slate-100">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-slate-400">
            <Trophy className="w-3.5 h-3.5 text-slate-400" />
            <p className="text-xs text-slate-500">Contests</p>
          </div>
          <p className="text-base font-bold text-slate-900">
            {stats.attended ?? 0}
          </p>
        </div>

        <div className="flex flex-col gap-1 border-l border-slate-100 pl-3">
          <div className="flex items-center gap-1 text-slate-400">
            <Globe2 className="w-3.5 h-3.5 text-slate-400" />
            <p className="text-xs text-slate-500">Rank</p>
          </div>
          <p className="text-base font-bold text-slate-900">
            {stats.globalRank || "Unranked"}
          </p>
        </div>
      </div>
    </div>
  );
}
