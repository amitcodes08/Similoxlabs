import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  HardDrive,
  Cpu,
  Code2,
  Layers,
  Terminal,
  ExternalLink
} from "lucide-react";
import TeacherLayout from "@/components/teacher/Layout";
import CodeViewer from "@/components/teacher/CodeViewer";
import { useTeacher } from "@/context/TeacherContext";

export default function StudentSubmissionDetailPage() {
  const router = useRouter();
  const { questionId, submissionId } = router.query;
  const { getSubmissionById } = useTeacher();

  const submission = useMemo(() => {
    if (!submissionId) return null;
    return getSubmissionById(submissionId);
  }, [submissionId, getSubmissionById]);

  if (!submission && router.isReady) {
    return (
      <TeacherLayout
        breadcrumbs={[
          { label: "Dashboard", href: "/teacher" },
          { label: "Submissions", href: `/teacher/questions/${questionId}/submissions` },
          { label: "Submission Not Found" }
        ]}
      >
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center max-w-md mx-auto shadow-xs">
          <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900">Submission Not Found</h2>
          <p className="text-xs text-gray-500 mt-1 mb-5">
            The requested student submission record does not exist.
          </p>
          <Link
            href={`/teacher/questions/${questionId}/submissions`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Submissions</span>
          </Link>
        </div>
      </TeacherLayout>
    );
  }

  const student = submission?.student;
  const question = submission?.question;
  const isAccepted = submission?.status === "Accepted";

  const difficultyStyles = {
    Easy: "text-emerald-800 bg-emerald-50 border-emerald-200",
    Medium: "text-amber-800 bg-amber-50 border-amber-200",
    Hard: "text-rose-800 bg-rose-50 border-rose-200"
  };

  return (
    <TeacherLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/teacher" },
        {
          label: question?.title || "Question",
          href: `/teacher/questions/${questionId}/submissions`
        },
        {
          label: "Submissions",
          href: `/teacher/questions/${questionId}/submissions`
        },
        { label: student?.name || "Student Submission" }
      ]}
    >
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Back Link */}
        <Link
          href={`/teacher/questions/${questionId}/submissions`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {question?.title || "Question"} Submissions</span>
        </Link>

        {/* Student & Submission Overview Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            {/* Student Profile Info */}
            <div className="flex items-center gap-4">
              <img
                src={student?.avatar}
                alt={student?.name}
                className="w-13 h-13 rounded-full object-cover border-2 border-gray-200 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                    {student?.name}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      isAccepted
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {isAccepted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    <span>{submission?.status}</span>
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                  <span>{student?.email}</span>
                  <span>•</span>
                  <span>Roll No: {student?.rollNo}</span>
                  <span>•</span>
                  <span>Submitted {submission?.submittedAt}</span>
                </div>
              </div>
            </div>

            {/* Question Reference Badge */}
            <div className="flex items-center gap-2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg self-start md:self-auto">
              <div>
                <span className="text-[10px] uppercase font-semibold text-gray-400 block">
                  Question
                </span>
                <span className="text-xs font-bold text-gray-900 block mt-0.5">
                  {question?.number || question?.id || "1"}. {question?.title}
                </span>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded border ml-2 ${
                  difficultyStyles[question?.difficulty] ||
                  "text-gray-700 bg-gray-50 border-gray-200"
                }`}
              >
                {question?.difficulty}
              </span>
            </div>
          </div>

          {/* Submission Performance Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-[10px] uppercase font-semibold text-gray-500 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-gray-500" />
                <span>Language</span>
              </span>
              <span className="text-sm font-bold text-gray-900 mt-1 block">
                {submission?.language}
              </span>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-[10px] uppercase font-semibold text-gray-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>Runtime</span>
              </span>
              <span className="text-sm font-bold text-gray-900 mt-1 block font-mono">
                {submission?.runtime || "N/A"}
              </span>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-[10px] uppercase font-semibold text-gray-500 flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-gray-500" />
                <span>Memory</span>
              </span>
              <span className="text-sm font-bold text-gray-900 mt-1 block font-mono">
                {submission?.memory || "N/A"}
              </span>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-[10px] uppercase font-semibold text-gray-500 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-gray-500" />
                <span>Score</span>
              </span>
              <span
                className={`text-sm font-bold mt-1 block font-mono ${
                  isAccepted ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {submission?.passedTests} / {submission?.totalTests} Passed
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 1: Source Code Viewer */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4 text-gray-600" />
              <span>Submitted Source Code</span>
            </h2>
            <span className="text-xs text-gray-400 font-medium">
              Read-Only Code Review
            </span>
          </div>

          <CodeViewer
            code={submission?.code}
            language={submission?.language}
            runtime={submission?.runtime}
            memory={submission?.memory}
          />
        </div>

        {/* SECTION 2: Test Case Execution Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-gray-600" />
              <span>Test Case Execution Breakdown</span>
            </h2>
            <span className="text-xs font-semibold text-gray-600">
              {submission?.passedTests} of {submission?.totalTests} Passed
            </span>
          </div>

          <div className="space-y-3">
            {submission?.testResults?.map((tr, idx) => {
              const passed = tr.status === "Passed";

              return (
                <div
                  key={idx}
                  className={`border rounded-xl p-4 transition-colors ${
                    passed
                      ? "bg-white border-gray-200"
                      : "bg-amber-50/40 border-amber-200"
                  }`}
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900">
                        Test Case #{tr.case || idx + 1}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                        passed
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {passed ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                      )}
                      <span>{tr.status}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 text-xs">
                    {/* Input */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase">
                        Standard Input (stdin)
                      </span>
                      <pre className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-mono text-gray-900 text-xs overflow-x-auto whitespace-pre-wrap">
                        {tr.input}
                      </pre>
                    </div>

                    {/* Output comparison */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-semibold uppercase text-gray-400">
                        <span>Expected Output</span>
                        <span>Student Output</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <pre className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-mono text-gray-900 text-xs overflow-x-auto whitespace-pre-wrap">
                          {tr.expected}
                        </pre>
                        <pre
                          className={`p-2.5 border rounded-lg font-mono text-xs overflow-x-auto whitespace-pre-wrap ${
                            passed
                              ? "bg-emerald-50/40 border-emerald-200 text-emerald-900"
                              : "bg-amber-50/60 border-amber-200 text-amber-900 font-bold"
                          }`}
                        >
                          {tr.actual || "(No output)"}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {tr.error && (
                    <div className="mt-2.5 p-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs font-mono">
                      <span className="font-bold">Error: </span>
                      {tr.error}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
