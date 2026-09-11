import React from "react";
import ProblemDonutChart from "./ProblemDonutChart";
import ContestStatsCard from "./ContestStatsCard";

export default function RightColumn({ problemSolving, contestStats }) {
  return (
    <div className="flex flex-col gap-5">
      <ProblemDonutChart problemSolving={problemSolving} attempting={2} />

      <ContestStatsCard contestStats={contestStats} />
    </div>
  );
}
