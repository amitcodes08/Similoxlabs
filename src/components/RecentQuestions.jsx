import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Code2, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@heroui/react";

// Format Unix timestamp into human-readable relative time
function formatRelativeTime(timestamp) {
  if (!timestamp) return "Recently";
  const ts = typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp;
  if (!ts || isNaN(ts)) return "Recently";

  const now = Math.floor(Date.now() / 1000);
  const diffSec = Math.max(0, now - ts);

  if (diffSec < 60) return "Just now";
  if (diffSec < 3600) {
    const mins = Math.floor(diffSec / 60);
    return `${mins}m ago`;
  }
  if (diffSec < 86400) {
    const hours = Math.floor(diffSec / 3600);
    return `${hours}h ago`;
  }
  if (diffSec < 86400 * 7) {
    const days = Math.floor(diffSec / 86400);
    return days === 1 ? "Yesterday" : `${days}d ago`;
  }
  if (diffSec < 86400 * 30) {
    const weeks = Math.floor(diffSec / (86400 * 7));
    return `${weeks}w ago`;
  }

  const date = new Date(ts * 1000);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function RecentQuestions() {
  const [questions, setQuestions] = useState([
    {
      id: "2134219857",
      questionNumber: "977",
      title: "Distinct Subsequences II",
      titleSlug: "distinct-subsequences-ii",
      difficulty: "Hard",
      timestamp: 1788802434,
      topicTags: ["String", "Dynamic Programming"],
    },
    {
      id: "2133077133",
      questionNumber: "115",
      title: "Distinct Subsequences",
      titleSlug: "distinct-subsequences",
      difficulty: "Hard",
      timestamp: 1788713338,
      topicTags: ["String", "Dynamic Programming"],
    },
    {
      id: "2131248868",
      questionNumber: "200",
      title: "Number of Islands",
      titleSlug: "number-of-islands",
      difficulty: "Medium",
      timestamp: 1788578455,
      topicTags: ["Array", "DFS", "BFS"],
    },
    {
      id: "2131242325",
      questionNumber: "4285",
      title: "Smallest Stable Index II",
      titleSlug: "smallest-stable-index-ii",
      difficulty: "Medium",
      timestamp: 1788577522,
      topicTags: ["Array", "Prefix Sum"],
    },
    {
      id: "2131051827",
      questionNumber: "516",
      title: "Longest Palindromic Subsequence",
      titleSlug: "longest-palindromic-subsequence",
      difficulty: "Medium",
      timestamp: 1788547162,
      topicTags: ["String", "Dynamic Programming"],
    },
    {
      id: "2130504652",
      questionNumber: "4285",
      title: "Smallest Stable Index II",
      titleSlug: "smallest-stable-index-ii",
      difficulty: "Medium",
      timestamp: 1788512273,
      topicTags: ["Array"],
    },
    {
      id: "2130500474",
      questionNumber: "4284",
      title: "Smallest Stable Index I",
      titleSlug: "smallest-stable-index-i",
      difficulty: "Easy",
      timestamp: 1788511973,
      topicTags: ["Array"],
    },
    {
      id: "2129711316",
      questionNumber: "221",
      title: "Maximal Square",
      titleSlug: "maximal-square",
      difficulty: "Medium",
      timestamp: 1788445881,
      topicTags: ["Array", "Dynamic Programming"],
    },
    {
      id: "2129673614",
      questionNumber: "3452",
      title: "Construct Uniform Parity Array II",
      titleSlug: "construct-uniform-parity-array-ii",
      difficulty: "Medium",
      timestamp: 1788443715,
      topicTags: ["Array", "Math"],
    },
    {
      id: "2128334335",
      questionNumber: "3451",
      title: "Construct Uniform Parity Array I",
      titleSlug: "construct-uniform-parity-array-i",
      difficulty: "Easy",
      timestamp: 1788346208,
      topicTags: ["Array", "Math"],
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadRecentQuestions() {
      try {
        setLoading(true);
        const res = await fetch("/api/leetcode?username=dorimon08");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data?.recentSubmissions?.length > 0) {
            setQuestions(data.recentSubmissions);
          }
        }
      } catch (err) {
        // Fallback pre-populated state is preserved
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadRecentQuestions();
    return () => {
      isMounted = false;
    };
  }, []);

  const difficultyColors = {
    Easy: "text-green-500 bg-gray-100 border-gray-100",
    Medium: "text-yellow-500 bg-gray-100 border-gray-100",
    Hard: "text-red-500 bg-gray-100 border-gray-100",
  };

  // Counts for filter pills
  const counts = useMemo(() => {
    const c = { All: questions.length, Easy: 0, Medium: 0, Hard: 0 };
    questions.forEach((q) => {
      if (c[q.difficulty] !== undefined) c[q.difficulty]++;
    });
    return c;
  }, [questions]);

  // Filtered list
  const filteredQuestions = useMemo(() => {
    if (activeFilter === "All") return questions;
    return questions.filter((q) => q.difficulty === activeFilter);
  }, [questions, activeFilter]);

  // Pagination display limit: 6 items collapsed, all items expanded
  const visibleQuestions = isExpanded ? filteredQuestions : filteredQuestions.slice(0, 6);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Code2 className="w-5 h-5 text-slate-700" />
              <span>Recent Submissions</span>
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-200 text-slate-900 border border-gray-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Accepted</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/problems"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 bg-white transition-colors"
          >
            <Code2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Problemset</span>
          </Link>

          <a
            href="https://leetcode.com/u/dorimon08/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-colors"
          >
            <span>LeetCode</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 pb-2 border-b border-slate-50">
        <div className="flex items-center gap-1.5 flex-wrap">
          {["All", "Easy", "Medium", "Hard"].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
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

      {/* Questions list */}
      <div className="divide-y divide-slate-100 mt-1">
        {visibleQuestions.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No {activeFilter} submissions found in recent activity.
          </div>
        ) : (
          visibleQuestions.map((q) => {
            const timeDisplay = formatRelativeTime(q.timestamp);
            return (
              <div
                key={q.id}
                className="flex items-center justify-between py-3 px-2 hover:bg-slate-50/80 rounded-lg transition-colors group"
              >
                {/* Left: Checkmark, Number & Title & Tags */}
                <div className="flex items-center gap-2.5 min-w-0 pr-3">                  
                  {q.questionNumber && (
                    <span className="text-xs font-mono text-slate-400 shrink-0">
                      {q.questionNumber}.
                    </span>
                  )}

                  <div className="flex items-center gap-1.5 min-w-0">
                    <Link
                      href={`/problems/${q.titleSlug}`}
                      className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors truncate"
                      title={`Solve ${q.title} in Code Editor`}
                    >
                      <span className="truncate">{q.title}</span>
                    </Link>
                    <a
                      href={`https://leetcode.com/problems/${q.titleSlug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-600 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      title="Open on LeetCode"
                    >
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                      difficultyColors[q.difficulty] || difficultyColors.Medium
                    }`}
                  >
                    {q.difficulty}
                  </span>

                  <span className="text-xs text-slate-400 w-16 text-right font-normal">
                    {timeDisplay}
                  </span>
                </div>
              </div>
            );
          })
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