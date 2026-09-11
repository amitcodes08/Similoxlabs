import React from "react";
import { Code2 } from "lucide-react";
import { mockUserData } from "@/data/mockData";

const LanguageCard = ({ languages = mockUserData?.languages }) => {
  // Normalize languages whether passed as an object ({ CPP: 50, ... }) or array ([{ name, solved, total }, ...])
  let list = [];
  if (Array.isArray(languages)) {
    list = languages;
  } else if (languages && typeof languages === "object") {
    list = Object.entries(languages).map(([name, val]) => {
      const displayName = name === "CPP" ? "C++" : name;
      if (typeof val === "object" && val !== null) {
        return {
          name: displayName,
          solved: val.solved ?? 0,
          total: val.total ?? 100,
        };
      }
      return {
        name: displayName,
        solved: val,
        total: 100,
      };
    });
  } else {
    list = [
      { name: "C++", solved: 50, total: 100 },
      { name: "Python", solved: 30, total: 100 },
      { name: "Java", solved: 20, total: 100 },
    ];
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-slate-900 tracking-tight flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-slate-600" />
          <span>Languages</span>
        </p>
        <span className="text-[11px] font-medium text-slate-400">
          {list.length} languages
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-3">
        {list.map((language) => (
          <div
            key={language.name}
            className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center"
          >
            <p className="text-xs font-semibold text-slate-900 tracking-tight">
              {language.name}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {language.solved}{" "}
              <span className="text-slate-400 font-normal">/ {language.total}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageCard;