import React from "react";
import SimiloxProfileCard from "./SimiloxProfileCard";
import SimiloxRankSkillsCard from "./SimiloxRankSkillsCard";
import SimiloxStatsDonut from "./SimiloxStatsDonut";
import SimiloxHeatmap from "./SimiloxHeatmap";
import SimiloxRecentSubmissions from "./SimiloxRecentSubmissions";
import { similoxStudentData } from "@/data/similoxDashboardData";

export default function SimiloxDashboard({ data = similoxStudentData }) {
  const currentData = data || similoxStudentData;
  const {
    profile,
    ranking,
    skills,
    languages,
    problemSolving,
    heatmapStats,
    recentSubmissions,
  } = currentData;

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Main Grid: Left Profile Card + Right 3-Row Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: Profile Card (spanning 4 of 12 cols on desktop) */}
        <aside
          id="similox-left-profile-column"
          className="lg:col-span-3 xl:col-span-2.5 w-full sticky top-5"
          aria-label="Student Profile"
        >
          <SimiloxProfileCard profile={profile} />
        </aside>

        {/* Right Side: Stack of Top 2 grids, Middle Heatmap, Bottom Recent Submissions */}
        <main
          id="similox-right-main-column"
          className="lg:col-span-9 xl:col-span-9.5 w-full flex flex-col gap-5"
          aria-label="Student Analytics & Submissions"
        >
          {/* Top Row: Two Grids side-by-side (Rank/Skills/Languages + Stats Donut) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            <div className="w-full h-full">
              <SimiloxRankSkillsCard
                ranking={ranking}
                skills={skills}
                languages={languages}
              />
            </div>

            <div className="w-full h-full">
              <SimiloxStatsDonut problemSolving={problemSolving} />
            </div>
          </div>

          {/* Middle Row: Activity Heatmap (Full width of right column) */}
          <section id="similox-heatmap-section" aria-label="Activity Heatmap">
            <SimiloxHeatmap heatmapStats={heatmapStats} />
          </section>

          {/* Bottom Row: Recent Submissions (Full width of right column) */}
          <section
            id="similox-recent-submissions-section"
            aria-label="Recent Submissions"
          >
            <SimiloxRecentSubmissions submissions={recentSubmissions} />
          </section>
        </main>
      </div>
    </div>
  );
}
