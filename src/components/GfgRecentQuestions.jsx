import React, { useState, useMemo } from "react";
import { CheckCircle2, Code2, ArrowUpRight, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@heroui/react";

export default function GfgRecentQuestions({ questions = [] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);

  const fallbackQuestions = [
    {
      id: "gfg-1",
      title: "Subarray with Given Sum",
      titleSlug: "subarray-with-given-sum-1587115621",
      difficulty: "Medium",
      topic: "Arrays",
      timeAgo: "1d ago",
    },
    {
      id: "gfg-2",
      title: "Missing Number in Array",
      titleSlug: "missing-number-in-array1416",
      difficulty: "Easy",
      topic: "Arrays",
      timeAgo: "2d ago",
    },
    {
      id: "gfg-3",
      title: "Find Duplicates in an Array",
      titleSlug: "find-duplicates-in-an-array",
      difficulty: "Easy",
      topic: "Arrays",
      timeAgo: "3d ago",
    },
    {
      id: "gfg-4",
      title: "Second Largest",
      titleSlug: "second-largest3735",
      difficulty: "Easy",
      topic: "Arrays",
      timeAgo: "4d ago",
    },
    {
      id: "gfg-5",
      title: "Kadane's Algorithm",
      titleSlug: "kadanes-algorithm-1587115620",
      difficulty: "Medium",
      topic: "Dynamic Programming",
      timeAgo: "5d ago",
    },
    {
      id: "gfg-6",
      title: "Reverse a String",
      titleSlug: "reverse-a-string",
      difficulty: "Basic",
      topic: "Strings",
      timeAgo: "6d ago",
    },
    {
      id: "gfg-7",
      title: "Check for Binary",
      titleSlug: "check-for-binary",
      difficulty: "School",
      topic: "Strings",
      timeAgo: "1w ago",
    },
    {
      id: "gfg-8",
      title: "Sum of Array Elements",
      titleSlug: "sum-of-array-elements2502",
      difficulty: "School",
      topic: "Arrays",
      timeAgo: "1w ago",
    },
  ];

  const questionList = questions && questions.length > 0 ? questions : fallbackQuestions;

  const difficultyColors = {
    School: "text-gray-500 bg-gray-100 border-gray-100",
    Basic: "text-blue-500 bg-gray-100 border-gray-100",
    Easy: "text-green-500 bg-gray-100 border-gray-100",
    Medium: "text-yellow-500 bg-gray-100 border-gray-100",
    Hard: "text-red-500 bg-gray-100 border-gray-100",
  };

  const counts = useMemo(() => {
    const c = { All: questionList.length, School: 0, Basic: 0, Easy: 0, Medium: 0 };
    questionList.forEach((q) => {
      if (c[q.difficulty] !== undefined) c[q.difficulty]++;
    });
    return c;
  }, [questionList]);

  const filteredQuestions = useMemo(() => {
    if (activeFilter === "All") return questionList;
    return questionList.filter((q) => q.difficulty === activeFilter);
  }, [questionList, activeFilter]);

  const visibleQuestions = isExpanded ? filteredQuestions : filteredQuestions.slice(0, 6);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Code2 className="w-5 h-5 text-slate-700" />
              <span>Recent Solved Problems</span>
            </h2>

          </div>
        </div>

        <a
          href="https://www.geeksforgeeks.org/user/aryaampeu5/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-colors self-start sm:self-auto"
        >
          <span>GFG Profile</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 pb-2 border-b border-slate-50">
        <div className="flex items-center gap-1.5 flex-wrap">
          {["All", "School", "Basic", "Easy", "Medium"].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-medium px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs font-semibold"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70"
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-slate-700 text-slate-200"
                      : "bg-slate-200/80 text-slate-600"
                  }`}
                >
                  {counts[filter] || 0}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-[11px] text-slate-400 hidden sm:inline-block">
          Showing {visibleQuestions.length} of {filteredQuestions.length}
        </span>
      </div>

      <div className="divide-y divide-slate-100 mt-1">
        {visibleQuestions.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No {activeFilter} problems found in recent activity.
          </div>
        ) : (
          visibleQuestions.map((q) => (
            <div
              key={q.id}
              className="flex items-center justify-between py-3 px-2 hover:bg-slate-50/80 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-3">
                <div className="flex items-center gap-2 min-w-0">
                  <a
                    href={`https://www.geeksforgeeks.org/problems/${q.titleSlug}/1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#2F9E44] transition-colors truncate flex items-center gap-1"
                  >
                    <span className="truncate">{q.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 shrink-0" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                    difficultyColors[q.difficulty] || difficultyColors.Easy
                  }`}
                >
                  {q.difficulty}
                </span>

                <span className="text-xs text-slate-400 w-16 text-right font-normal">
                  {q.timeAgo}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredQuestions.length > 6 && (
        <div className="pt-3 border-t border-slate-100 flex justify-center">
          <Button
            color="primary"
            radius="full"
            size="sm"
            onPress={() => setIsExpanded(!isExpanded)}
            endContent={
              isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )
            }
            className="font-semibold shadow-xs"
          >
            {isExpanded
              ? "Show Less"
              : `Show All (${filteredQuestions.length})`}
          </Button>
        </div>
      )}
    </div>
  );
}
