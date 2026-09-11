import React, { useState, useEffect } from "react";
import GfgHeader from "./GfgHeader";
import GfgRecentQuestions from "./GfgRecentQuestions";
import GfgProblemDonutChart from "./GfgProblemDonutChart";
import GfgContestCard from "./GfgContestCard";
import SubmissionsTimelineChart from "./SubmissionsTimelineChart";
import LanguageCard from "./LanguageCard";
import TopTopicsCard from "./TopTopicsCard";
import { Award, Flame, School, TrendingUp } from "lucide-react";

export default function GfgDashboard() {
  const [gfgData, setGfgData] = useState({
    handle: "aryaampeu5",
    name: "Amit Gupta",
    institution: "Noida Institute of Engineering and Technology",
    codingScore: 27,
    totalProblemsSolved: 14,
    globalLongestStreak: 1852,
    difficultyBreakdown: { school: 3, basic: 5, easy: 4, medium: 2, hard: 0 },
    // languages: { "C++": 8, Java: 4, Python: 2 },
    topTopics: ["Arrays", "Strings", "Searching", "Mathematical"],
    submissionsTimeline: [
      { date: "10 Aug", count: 1 },
      { date: "11 Aug", count: 0 },
      { date: "12 Aug", count: 2 },
      { date: "13 Aug", count: 0 },
      { date: "14 Aug", count: 1 },
      { date: "15 Aug", count: 3 },
      { date: "16 Aug", count: 0 },
      { date: "17 Aug", count: 1 },
      { date: "18 Aug", count: 2 },
      { date: "19 Aug", count: 0 },
      { date: "20 Aug", count: 1 },
      { date: "21 Aug", count: 4 },
      { date: "22 Aug", count: 2 },
      { date: "23 Aug", count: 0 },
      { date: "24 Aug", count: 1 },
      { date: "25 Aug", count: 3 },
      { date: "26 Aug", count: 0 },
      { date: "27 Aug", count: 1 },
      { date: "28 Aug", count: 2 },
      { date: "29 Aug", count: 1 },
      { date: "30 Aug", count: 0 },
      { date: "31 Aug", count: 2 },
      { date: "1 Sep", count: 1 },
      { date: "2 Sep", count: 3 },
      { date: "3 Sep", count: 0 },
      { date: "4 Sep", count: 1 },
      { date: "5 Sep", count: 2 },
      { date: "6 Sep", count: 0 },
      { date: "7 Sep", count: 1 },
      { date: "8 Sep", count: 3 },
    ],
    recentQuestions: [],
  });

  useEffect(() => {
    let isMounted = true;
    async function loadGfgData() {
      try {
        const res = await fetch("/api/gfg?username=aryaampeu5");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            setGfgData(data);
          }
        }
      } catch (e) {
        // Fallback pre-populated
      }
    }
    loadGfgData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col">
      <GfgHeader />

      <main className="flex-1 w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-14 gap-4 items-start">
          <section
            id="gfg-left-column"
            className="lg:col-span-3 w-full flex flex-col gap-5"
            aria-label="GFG Stats and Topics"
          >
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  GFG Score
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-300">
                  Practice
                </span>
              </div>

              <div className="py-4 text-center">
                <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {gfgData.codingScore}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  Overall Coding Score
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-center">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-400">Streak</div>
                  <div className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                    <Flame className="w-3.5 h-3.5 text-[#2F9E44]" />
                    <span>{gfgData.globalLongestStreak}d</span>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-400">Problems</div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {gfgData.totalProblemsSolved}
                  </div>
                </div>
              </div>
            </div>

            <TopTopicsCard topics={gfgData.topTopics} />
          </section>

          <section
            id="gfg-center-column"
            className="lg:col-span-7 w-full flex flex-col gap-5"
            aria-label="GFG Activity Timeline and Recent Questions"
          >
            <SubmissionsTimelineChart
              submissionsTimeline={gfgData.submissionsTimeline}
              totalSubmissions={gfgData.codingScore}
            />

            <GfgRecentQuestions questions={gfgData.recentQuestions} />
          </section>

          <section
            id="gfg-right-column"
            className="lg:col-span-4 w-full flex flex-col gap-5"
            aria-label="GFG Problem Difficulty and Languages"
          >
            <GfgProblemDonutChart
              breakdown={gfgData.difficultyBreakdown}
              totalSolved={gfgData.totalProblemsSolved}
            />

            <GfgContestCard contestStats={gfgData.contestStats} />
          </section>
        </div>
      </main>
    </div>
  );
}
