import React, { useState, useEffect } from "react";
import { ExternalLink, Award, Hash, CheckCircle2, Trophy } from "lucide-react";

export default function LeetcodeHeader() {
  const [profile, setProfile] = useState({
    username: "dorimon08",
    realName: "Amit Gupta",
    userAvatar: "https://assets.leetcode.com/users/ycb5lAHqph/avatar_1731774786.png",
    ranking: 151072,
    rating: 1932,
    contests: 16,
    globalRanking: 32501,
    topPercentage: 3.8,
    totalSolved: 583,
    easy: 154,
    medium: 315,
    hard: 114,
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchUserData() {
      try {
        const res = await fetch("/api/leetcode?username=dorimon08");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            setProfile(data);
          }
        }
      } catch (err) {
        // Fallback already pre-set
      }
    }
    fetchUserData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Side: Profile picture + Name & Stats */}
        <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
          {/* Profile Picture */}
          <div className="relative shrink-0">
            <img
              src={profile.userAvatar}
              alt={profile.realName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-slate-200 object-cover bg-slate-50 shadow-xs"
              onError={(e) => {
                e.currentTarget.src =
                  "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/leetcode.webp";
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">
              ✓
            </div>
          </div>

          {/* User Details */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {profile.realName}
              </h1>
            </div>

            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
              @{profile.username}
            </p>

            {/* Flat block metrics row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>
                  Solved: <strong className="text-slate-900 font-semibold">{profile.totalSolved}</strong>
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                <Hash className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Rank: <strong className="text-slate-900 font-semibold">{profile.ranking.toLocaleString()}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: LeetCode Banner */}
        <div className="flex items-center gap-4 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 shrink-0">
              <img
                src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/leetcode.webp"
                alt="LeetCode Banner Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">
                LeetCode
              </div>
              <div className="text-[11px] text-slate-400">
                Verified Profile
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}