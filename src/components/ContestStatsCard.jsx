import React from "react";
import { Trophy, Globe2, TrendingUp } from "lucide-react";

function Sparkline({ data, width = 120, height = 40 }) {
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
      <path d={path} stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="3" fill="#1F2937" />
    </svg>
  );
}

export default function ContestStatsCard({ contestStats }) {
  const stats = contestStats || {
    participated: 5,
    rating: 1606,
    globalRanking: 123,
    topPercentage: 5,
    ratingHistory: [1420, 1480, 1465, 1540, 1606],
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Contest rating</p>
          <p className="text-3xl font-semibold text-gray-900 tracking-tight">{stats.rating}</p>
          <p className="text-xs text-gray-500 mt-1">Top {stats.topPercentage}%</p>
        </div>
        <Sparkline data={stats.ratingHistory} />
      </div>

      <div className="grid grid-cols-3 mt-6 pt-5 border-t border-gray-100">
        <div className="flex flex-col gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-xs text-gray-500">Contests</p>
          <p className="text-lg font-medium text-gray-900">{stats.participated}</p>
        </div>
        <div className="flex flex-col gap-1.5 border-l border-gray-100 pl-4">
          <Globe2 className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-xs text-gray-500">Global rank</p>
          <p className="text-lg font-medium text-gray-900">#{stats.globalRanking}</p>
        </div>
        <div className="flex flex-col gap-1.5 border-l border-gray-100 pl-4">
          <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-xs text-gray-500">Top percentile</p>
          <p className="text-lg font-medium text-gray-900">{stats.topPercentage}%</p>
        </div>
      </div>
    </div>
  );
}