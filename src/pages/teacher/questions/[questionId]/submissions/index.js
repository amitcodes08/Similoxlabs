import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Code2,
  Search,
  ExternalLink,
  Edit3,
  Users,
  ChevronRight,
  Filter,
  RotateCcw
} from "lucide-react";
import TeacherLayout from "@/components/teacher/Layout";
import { useTeacher } from "@/context/TeacherContext";

export default function QuestionSubmissionsPage() {
  const router = useRouter();
  const { questionId } = router.query;
  const { getQuestionById, getSubmissionsForQuestion, students } = useTeacher();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // All, Solved, Attempted

  const question = useMemo(() => {
    if (!questionId) return null;
    return getQuestionById(questionId);
  }, [questionId, getQuestionById]);

  const submissions = useMemo(() => {
    if (!questionId) return [];
    return getSubmissionsForQuestion(questionId);
  }, [questionId, getSubmissionsForQuestion]);

  // Combine enrolled students with submission status
  const studentRows = useMemo(() => {
    return students.map((student) => {
      // Find submission for this student on this question
      const studentSub = submissions.find((s) => s.studentId === student.id);

      const isSolved = studentSub && studentSub.status === "Accepted";
      const isAttempted = studentSub && studentSub.status !== "Accepted";

      return {
        student,
        submission: studentSub || null,
        status: isSolved ? "Solved" : isAttempted ? "Attempted" : "Unattempted"
      };
    });
  }, [students, submissions]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return studentRows.filter((row) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = row.student.name.toLowerCase().includes(query);
        const matchEmail = row.student.email.toLowerCase().includes(query);
        const matchRoll = row.student.rollNo?.toLowerCase().includes(query);
        if (!matchName && !matchEmail && !matchRoll) return false;
      }

      // Status filter
      if (statusFilter === "Solved") {
        return row.status === "Solved";
      }
      if (statusFilter === "Attempted") {
        return row.status === "Attempted";
      }

      return true;
    });
  }, [studentRows, searchQuery, statusFilter]);

  if (!question && router.isReady) {
    return (
      <TeacherLayout
        breadcrumbs={[
          { label: "Dashboard", href: "/teacher" },
          { label: "Question Not Found" }
        ]}
      >
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center max-w-md mx-auto shadow-xs">
          <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900">Question Not Found</h2>
          <p className="text-xs text-gray-500 mt-1 mb-5">
            The question you are looking for does not exist.
          </p>
          <Link
            href="/teacher"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </TeacherLayout>
    );
  }

  const difficultyStyles = {
    Easy: "text-emerald-800 bg-emerald-50 border-emerald-200",
    Medium: "text-amber-800 bg-amber-50 border-amber-200",
    Hard: "text-rose-800 bg-rose-50 border-rose-200"
  };

  const solvedStudentsCount = studentRows.filter((r) => r.status === "Solved").length;
  const attemptedStudentsCount = studentRows.filter((r) => r.status === "Attempted").length;

  return (
    <TeacherLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/teacher" },
        { label: question?.title || "Question", href: `/teacher/questions/${questionId}/submissions` },
        { label: "Student Submissions" }
      ]}
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/teacher"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Questions Dashboard</span>
        </Link>

        {/* Question Header Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${
                    difficultyStyles[question?.difficulty] ||
                    "text-gray-700 bg-gray-50 border-gray-200"
                  }`}
                >
                  {question?.difficulty}
                </span>
                {question?.isExempted && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                    Exempted
                  </span>
                )}
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500 font-medium">
                  {question?.category || "Algorithms"}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 tracking-tight mt-2">
                {question?.number || question?.id || "1"}. {question?.title}
              </h1>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Link
                href={`/teacher/questions/${question?.id}/edit`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors shadow-2xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-gray-500" />
                <span>Edit Question</span>
              </Link>

              <Link
                href={`/problems/${question?.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors shadow-2xs"
                title="Preview in Student Code Editor"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                <span>Student View</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-gray-100">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-[11px] font-semibold uppercase text-gray-500 block">
                Total Enrolled
              </span>
              <span className="text-xl font-bold text-gray-900 mt-0.5 block">
                {students.length} Students
              </span>
            </div>

            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg">
              <span className="text-[11px] font-semibold uppercase text-emerald-800 block">
                Solved (Accepted)
              </span>
              <span className="text-xl font-bold text-emerald-900 mt-0.5 block">
                {solvedStudentsCount} Students
              </span>
            </div>

            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg">
              <span className="text-[11px] font-semibold uppercase text-amber-800 block">
                Attempted (Pending)
              </span>
              <span className="text-xl font-bold text-amber-900 mt-0.5 block">
                {attemptedStudentsCount} Students
              </span>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-[11px] font-semibold uppercase text-gray-500 block">
                Class Solve Rate
              </span>
              <span className="text-xl font-bold text-gray-900 mt-0.5 block">
                {students.length > 0
                  ? `${Math.round((solvedStudentsCount / students.length) * 100)}%`
                  : "0%"}
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students by name, email, or roll no..."
              className="w-full pl-10 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gray-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-lg border border-gray-200 self-start sm:self-auto">
            {[
              { key: "All", label: "All Students" },
              { key: "Solved", label: "Solved" },
              { key: "Attempted", label: "Attempted" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                  statusFilter === tab.key
                    ? "bg-white text-gray-900 font-semibold shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80 text-[12px] font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Student Profile</th>
                  <th className="py-3.5 px-5 w-36">Status</th>
                  <th className="py-3.5 px-5 w-32 text-center">Score / Tests</th>
                  <th className="py-3.5 px-5 w-32">Language</th>
                  <th className="py-3.5 px-5 w-44">Submitted At</th>
                  <th className="py-3.5 px-5 w-36 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400">
                      <div className="max-w-xs mx-auto space-y-2">
                        <Users className="w-8 h-8 text-gray-300 mx-auto" />
                        <p className="font-semibold text-gray-700 text-sm">
                          No matching students found
                        </p>
                        <p className="text-xs text-gray-400">
                          Try adjusting your search query or filter selection.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map(({ student, submission, status }) => {
                    const hasSubmission = Boolean(submission);

                    return (
                      <tr
                        key={student.id}
                        onClick={() => {
                          if (hasSubmission) {
                            router.push(
                              `/teacher/questions/${questionId}/submissions/${submission.id}`
                            );
                          }
                        }}
                        className={`transition-colors ${
                          hasSubmission
                            ? "hover:bg-gray-50/70 cursor-pointer group"
                            : "opacity-60"
                        }`}
                      >
                        {/* Student Info */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-9 h-9 rounded-full object-cover border border-gray-200"
                            />
                            <div>
                              <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors block">
                                {student.name}
                              </span>
                              <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                                <span>{student.email}</span>
                                <span>•</span>
                                <span>{student.rollNo}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-5">
                          {status === "Solved" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Solved</span>
                            </span>
                          ) : status === "Attempted" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                              <span>Attempted</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                              Unattempted
                            </span>
                          )}
                        </td>

                        {/* Tests Passed */}
                        <td className="py-4 px-5 text-center font-mono text-xs">
                          {hasSubmission ? (
                            <span
                              className={`font-semibold ${
                                status === "Solved"
                                  ? "text-emerald-700"
                                  : "text-amber-700"
                              }`}
                            >
                              {submission.passedTests} / {submission.totalTests} Passed
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>

                        {/* Language */}
                        <td className="py-4 px-5 text-xs text-gray-600">
                          {hasSubmission ? (
                            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded font-medium text-gray-700">
                              {submission.language}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>

                        {/* Submitted At */}
                        <td className="py-4 px-5 text-xs text-gray-500">
                          {hasSubmission ? (
                            submission.submittedAt
                          ) : (
                            <span className="text-gray-400">No submission</span>
                          )}
                        </td>

                        {/* Action: View Submission */}
                        <td className="py-4 px-5 text-right">
                          {hasSubmission ? (
                            <Link
                              href={`/teacher/questions/${questionId}/submissions/${submission.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-800 text-xs font-semibold shadow-2xs transition-colors"
                            >
                              <span>View Code</span>
                              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                            </Link>
                          ) : (
                            <span className="text-xs text-gray-400 font-medium">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
            <span>
              Showing <strong className="text-gray-800">{filteredStudents.length}</strong> of{" "}
              <strong className="text-gray-800">{students.length}</strong> enrolled students
            </span>
            <span className="text-gray-400">
              Click any student row to view their submitted source code and test results
            </span>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
