import React, { useState, useEffect } from "react";
import { CheckCircle2, Award, Flame, School, ExternalLink } from "lucide-react";

export default function GfgHeader() {
  const [profile, setProfile] = useState({
    handle: "aryaampeu5",
    name: "Amit Gupta",
    headline: "Learning and Growing Every Day 🌎",
    institution: "Noida Institute of Engineering and Technology",
    codingScore: 27,
    totalProblemsSolved: 14,
    globalLongestStreak: 1852,
    avatar: "https://media.geeksforgeeks.org/auth/profile/n4c9wl2whxepe9khi11c",
    profileUrl: "https://www.geeksforgeeks.org/user/aryaampeu5/",
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchGfgData() {
      try {
        const res = await fetch("/api/gfg?username=aryaampeu5");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            setProfile(data);
          }
        }
      } catch (err) {
        // Fallback pre-populated
      }
    }
    fetchGfgData();
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
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-slate-200 object-cover bg-slate-50 shadow-xs"
              onError={(e) => {
                e.currentTarget.src =
                  "https://media.geeksforgeeks.org/img-practice/user_web-1598433228.svg";
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#2F9E44] border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">
              ✓
            </div>
          </div>

          {/* User Details */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {profile.name}
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
              <span>@{profile.handle}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-500 truncate">
                <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{profile.institution}</span>
              </span>
            </div>

            {/* Flat block metrics row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                <Award className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  Coding Score: <strong className="text-slate-900 font-semibold">{profile.codingScore}</strong>
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  Solved: <strong className="text-slate-900 font-semibold">{profile.totalProblemsSolved}</strong>
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                <Flame className="w-3.5 h-3.5 text-[#2F9E44]" />
                <span>
                  Streak: <strong className="text-slate-900 font-semibold">{profile.globalLongestStreak}d</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: GeeksforGeeks Banner */}
        <div className="flex items-center gap-4 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 shrink-0">
              <img
                src="https://media.geeksforgeeks.org/gfg-gg-logo.svg"
                alt="GeeksforGeeks Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://media.geeksforgeeks.org/img-practice/favicon-1600252871.ico";
                }}
              />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">
                GeeksforGeeks
              </div>
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-slate-500 hover:text-slate-900 font-medium flex items-center gap-1"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
