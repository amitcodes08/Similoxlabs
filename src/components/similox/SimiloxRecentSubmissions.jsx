import React from "react";
import Link from "next/link";
import { Clock, ExternalLink } from "lucide-react";

export default function SimiloxRecentSubmissions({ submissions = [] }) {
  // Difficulty badge styled with gray border/bg and colored text matching the donut
  const renderDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "Hard":
        return (
          <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-gray-50 border border-gray-200 text-[#ef4444]">
            Hard
          </span>
        );
      case "Medium":
        return (
          <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-gray-50 border border-gray-200 text-[#ffa116]">
            Medium
          </span>
        );
      case "Easy":
      default:
        return (
          <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-gray-50 border border-gray-200 text-[#00b8a3]">
            Easy
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-800">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">
              Recent Submissions
            </h3>
            <p className="text-[11px] text-gray-400">
              Latest coding activity & verification records
            </p>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="pt-3 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              <th className="pb-3 pl-1">Problem</th>
              <th className="pb-3 px-3">Difficulty</th>
              <th className="pb-3 pr-1 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {submissions.length > 0 ? (
              submissions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-gray-50/70 transition-colors group"
                >
                  {/* Problem Name & Link */}
                  <td className="py-3 pl-1 font-medium text-gray-900 max-w-[220px] sm:max-w-none truncate">
                    <Link
                      href={`/problems`}
                      className="group-hover:text-gray-950 inline-flex items-center gap-1.5 hover:underline"
                    >
                      <span className="truncate">{sub.title}</span>
                      <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-gray-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </td>

                  {/* Difficulty */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    {renderDifficultyBadge(sub.difficulty)}
                  </td>

                  {/* Time */}
                  <td className="py-3 pr-1 text-right whitespace-nowrap text-[11px] text-gray-400">
                    {sub.submittedAt}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-8 text-center text-xs text-gray-400">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
        <span>Showing {submissions.length} submissions</span>
        <Link
          href="/problems"
          className="text-gray-700 hover:text-gray-900 font-semibold hover:underline inline-flex items-center gap-1"
        >
          <span>Practice More Problems</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
