import React from "react";
import TopTopicsCard from "./TopTopicsCard";
import OverallRatingDonut from "./OverallRatingDonut";

export default function AnalysisSection({ user }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Deep analysis.
        </h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Skillwise recommendation according to topics solved.
        </p>
      </div>

      <TopTopicsCard topics={user?.topTopics ?? []} />

      <OverallRatingDonut rating={user?.overallRating ?? 80} />
    </div>
  );
}
