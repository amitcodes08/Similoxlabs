import React from "react";
import {
  User,
  GraduationCap,
  Hash,
  GitBranch,
  Layers,
  Calendar,
  Check,
  Mail,
} from "lucide-react";

export default function SimiloxProfileCard({ profile }) {
  if (!profile) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col h-full">
      {/* Top Profile Header: Circular Avatar & Verification */}
      <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
        <div className="relative mb-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-gray-200 p-1 bg-white shadow-xs">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover bg-gray-100"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <User className="w-10 h-10" />
              </div>
            )}
          </div>
          {/* Active / Verified Badge - Green tick */}
          <div
            className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-xs"
            title="Verified Similox Student"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>

        {/* Student Name */}
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          {profile.name}
        </h2>

        {/* Email & Status */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
          <Mail className="w-3.5 h-3.5 text-gray-400" />
          <span>{profile.email}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
          <span>{profile.status || "Enrolled Student"}</span>
        </div>
      </div>

      {/* Profile Details List matching wireframe:
          - roll no
          - course
          - branch
          - section
          - year
      */}
      <div className="py-5 space-y-4 flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Academic Credentials
        </div>

        <div className="space-y-3 text-xs">
          {/* Roll No */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <Hash className="w-4 h-4 text-gray-400" />
              <span>Roll No</span>
            </div>
            <span className="font-mono font-semibold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">
              {profile.rollNo}
            </span>
          </div>

          {/* Course */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              <span>Course</span>
            </div>
            <span className="font-semibold text-gray-800 text-right max-w-[160px] truncate">
              {profile.course}
            </span>
          </div>

          {/* Branch */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <GitBranch className="w-4 h-4 text-gray-400" />
              <span>Branch</span>
            </div>
            <span className="font-semibold text-gray-800 text-right max-w-[160px] truncate">
              {profile.branch}
            </span>
          </div>

          {/* Section */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <Layers className="w-4 h-4 text-gray-400" />
              <span>Section</span>
            </div>
            <span className="font-semibold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">
              {profile.section}
            </span>
          </div>

          {/* Year */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Year</span>
            </div>
            <span className="font-semibold text-gray-800">
              {profile.year}
            </span>
          </div>
        </div>

        {/* Academic Highlights */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl border border-gray-200 bg-white text-center">
            <div className="text-[10px] text-gray-400 uppercase font-medium">CGPA</div>
            <div className="text-sm font-bold text-gray-900 mt-0.5">{profile.cgpa || "8.92"}</div>
          </div>
          <div className="p-2.5 rounded-xl border border-gray-200 bg-white text-center">
            <div className="text-[10px] text-gray-400 uppercase font-medium">Attendance</div>
            <div className="text-sm font-bold text-gray-900 mt-0.5">{profile.attendance || "94.6%"}</div>
          </div>
        </div>
      </div>

      {/* Footer institute */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
        <span className="truncate">{profile.institute || "Similox Labs"}</span>
        <span className="font-mono text-gray-500">{profile.academicSession || "2022-26"}</span>
      </div>
    </div>
  );
}
