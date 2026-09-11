import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Code2,
  PlusCircle,
  LayoutDashboard,
  GraduationCap,
  ChevronRight,
  User,
  BookOpen
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Custom404 from "@/pages/404";

export default function TeacherLayout({ children, breadcrumbs = [] }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const { isTeacher, isHydrated } = useAuth();

  // If client has not hydrated yet, render blank placeholder to prevent layout flashing
  if (!isHydrated) {
    return <div className="min-h-screen bg-[#f9fafb]" />;
  }

  // Role-based access control: Non-teachers get standard 404 page
  if (!isTeacher) {
    return <Custom404 />;
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-800 font-sans selection:bg-gray-200 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
          {/* Left: Brand + Badge + Main Navigation */}
          <div className="flex items-center gap-6">
            <Link
              href="/teacher"
              className="flex items-center gap-2.5 font-bold text-gray-900 hover:opacity-85 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                <Code2 className="w-4.5 h-4.5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-gray-900">
                  Similox
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 border border-gray-200">
                  Teacher Portal
                </span>
              </div>
            </Link>

            {/* Nav Items */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/teacher"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPath === "/teacher"
                    ? "bg-gray-100 text-gray-900 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-gray-500" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/teacher/questions/create"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPath === "/teacher/questions/create"
                    ? "bg-gray-100 text-gray-900 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <PlusCircle className="w-4 h-4 text-gray-500" />
                <span>Create Question</span>
              </Link>
            </nav>
          </div>

          {/* Right: Switch Portal & Profile */}
          <div className="flex items-center gap-3">
            {/* Switch to Student Portal */}
            <Link
              href="/problems"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-xs transition-colors"
              title="Return to Student Problems Portal"
            >
              <GraduationCap className="w-4 h-4 text-gray-600" />
              <span className="hidden sm:inline">Student Portal</span>
            </Link>

            {/* Teacher Profile Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-xs">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Teacher Profile"
                className="w-6 h-6 rounded-full object-cover border border-gray-300"
              />
              <div className="hidden sm:block text-left leading-tight">
                <span className="block font-semibold text-gray-900">
                  Prof. Sarah Jenkins
                </span>
                <span className="block text-[10px] text-gray-500">
                  CS Department
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-header / Breadcrumbs bar */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="bg-gray-50/70 border-t border-gray-200/80 px-4 sm:px-6 lg:px-8 py-2">
            <div className="max-w-[1340px] mx-auto flex items-center gap-1.5 text-xs text-gray-500">
              <Link
                href="/teacher"
                className="hover:text-gray-900 font-medium transition-colors"
              >
                Teacher Portal
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-gray-900 font-medium transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-900 font-semibold truncate max-w-[280px]">
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1340px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {children}
      </main>
    </div>
  );
}
