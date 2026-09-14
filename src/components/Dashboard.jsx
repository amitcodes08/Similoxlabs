import React, { useState } from "react";
import AnalysisSection from "./AnalysisSection";
import SubmissionsTimelineChart from "./SubmissionsTimelineChart";
import RightColumn from "./RightColumn";
import LanguageCard from "./LanguageCard";
import { mockUserData } from "@/data/mockData";
import LeetcodeHeader from "./LeetcodeHeader";
import RecentQuestions from "./RecentQuestions";
import PlatformTabs from "./PlatformTabs";
import GfgDashboard from "./GfgDashboard";
import SimiloxDashboard from "./similox/SimiloxDashboard";

export default function Dashboard({ data = mockUserData }) {
  const [activePlatform, setActivePlatform] = useState("similox");
  const currentData = data || mockUserData;
  const { user, submissionsTimeline, problemSolving, contestStats, languages } =
    currentData;

  return (
    <div className="min-h-screen bg-[#fafbfc] text-gray-800 flex flex-col font-sans selection:bg-gray-200">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <PlatformTabs
          activePlatform={activePlatform}
          onSelectPlatform={setActivePlatform}
        />
      </div>

      {activePlatform === "similox" ? (
        <SimiloxDashboard />
      ) : activePlatform === "leetcode" ? (
        <>
          <LeetcodeHeader />

          <main className="flex-1 w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-14 gap-4 items-start">
              <section
                id="left-analysis-column"
                className="lg:col-span-3 w-full"
                aria-label="Analysis and Topics"
              >
                <AnalysisSection user={user} />
              </section>

              <section
                id="center-timeline-area"
                className="lg:col-span-7 w-full flex flex-col gap-5"
                aria-label="Activity Timeline"
              >
                <SubmissionsTimelineChart
                  submissionsTimeline={submissionsTimeline}
                  totalSubmissions={user.totalSubmissions}
                />

                <RecentQuestions />
              </section>

              <section
                id="right-problems-contests"
                className="lg:col-span-4 w-full flex flex-col gap-5"
                aria-label="Problem Solving and Contests"
              >
                <RightColumn
                  problemSolving={problemSolving}
                  contestStats={contestStats}
                />

                <LanguageCard languages={languages} />
              </section>
            </div>
          </main>
        </>
      ) : (
        <GfgDashboard />
      )}
    </div>
  );
}
