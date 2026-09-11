import React from "react";
import Link from "next/link";
import { Code2 } from "lucide-react";

export default function PlatformTabs({ activePlatform, onSelectPlatform }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 pb-5">
      <div className="inline-flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200 shadow-xs">
        <button
          type="button"
          onClick={() => onSelectPlatform("leetcode")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
            activePlatform === "leetcode"
              ? "bg-white text-slate-900 font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900 font-medium"
          }`}
        >
          <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/leetcode.webp" alt="LeetCode" className="w-4 h-4"/>
          <span>LeetCode</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPlatform("gfg")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
            activePlatform === "gfg"
              ? "bg-white text-slate-900 font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900 font-medium"
          }`}
        >
          <img src="https://cdn.simpleicons.org/geeksforgeeks/2F8D46" alt="GeeksforGeeks" className="w-4 h-4"/>
          <span>GeeksforGeeks</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/problems"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs transition-all"
        >
          <Code2 className="w-3.5 h-3.5 text-slate-600" />
          <span>Problems (Practice)</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span>Active Platform:</span>
          <span className="font-semibold text-slate-700">
            {activePlatform === "leetcode" ? "LeetCode Profile" : "GeeksforGeeks Profile"}
          </span>
        </div>
      </div>
    </div>
  );
}
