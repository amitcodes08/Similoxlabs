import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Search,
  Plus,
  Users,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Code2,
  FileCode2,
  ArrowUpDown,
  BarChart3,
  TrendingUp,
  RotateCcw
} from "lucide-react";
import TeacherLayout from "@/components/teacher/Layout";
import { useTeacher } from "@/context/TeacherContext";
import { Button } from "@heroui/react";

export default function TeacherDashboard() {
  const router = useRouter();
  const { questions, students, submissions, deleteQuestion, getQuestionById } =
    useTeacher();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortField, setSortField] = useState("number");
  const [sortOrder, setSortOrder] = useState("asc");

  // Calculate Metrics
  const metrics = useMemo(() => {
    const totalQuestions = questions.length;
    const totalSubmissions = submissions.length;
    const acceptedSubmissions = submissions.filter((s) => s.status === "Accepted").length;
    const overallRate =
      totalSubmissions > 0
        ? `${Math.round((acceptedSubmissions / totalSubmissions) * 100)}%`
        : "0%";

    return {
      totalQuestions,
      totalSubmissions,
      overallRate,
      totalStudents: students.length
    };
  }, [questions, submissions, students]);

  // Enrich & Filter Questions
  const enrichedQuestions = useMemo(() => {
    return questions
      .map((q, idx) => {
        const enriched = getQuestionById(q.id) || q;
        const qNum =
          enriched.number !== undefined && enriched.number !== null && !isNaN(Number(enriched.number))
            ? Number(enriched.number)
            : typeof enriched.id === "number"
            ? enriched.id
            : parseInt(String(enriched.id || "").replace(/\D/g, ""), 10) || (idx + 1);

        return {
          ...enriched,
          number: qNum,
          id: enriched.id !== undefined && enriched.id !== null ? enriched.id : qNum
        };
      })
      .filter((q) => {
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const cleanQuery = query.replace(/^#/, "");
          const matchTitle = (q.title || "").toLowerCase().includes(query);
          const matchNum =
            q.number?.toString().includes(cleanQuery) ||
            q.id?.toString().includes(cleanQuery);
          const matchTopic = q.topics?.some((t) =>
            t.toLowerCase().includes(query)
          );
          if (!matchTitle && !matchNum && !matchTopic) return false;
        }

        if (difficultyFilter !== "All" && q.difficulty !== difficultyFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortField === "number") {
          const numA = Number(a.number) || 0;
          const numB = Number(b.number) || 0;
          return sortOrder === "asc" ? numA - numB : numB - numA;
        }
        let valA = a[sortField] || "";
        let valB = b[sortField] || "";
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [questions, searchQuery, difficultyFilter, sortField, sortOrder, getQuestionById]);


  // Sort Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleDelete = (e, questionId, title) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteQuestion(questionId);
    }
  };

  return (
    <TeacherLayout breadcrumbs={[{ label: "Dashboard" }]}>
      <div className="space-y-6">
        {/* Top Header & Create CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Teacher Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your authored questions, monitor student engagement, and review student code submissions.
            </p>
          </div>

          <Button
            as={Link}
            href="/teacher/questions/create"
            color="primary"
            radius="full"
            size="sm"
            startContent={<Plus className="w-4 h-4" />}
            className="font-semibold shadow-xs self-start sm:self-auto"
          >
            Create Question
          </Button>
        </div>

        {/* Overview Metric Cards (White and Gray - strictly no gradients) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Questions */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                Total Questions
              </span>
              <span className="text-2xl font-black text-gray-900 mt-1 block">
                {metrics.totalQuestions}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
              <FileCode2 className="w-5 h-5 text-gray-700" />
            </div>
          </div>

          {/* Total Submissions */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                Total Submissions
              </span>
              <span className="text-2xl font-black text-gray-900 mt-1 block">
                {metrics.totalSubmissions}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
              <BarChart3 className="w-5 h-5 text-gray-700" />
            </div>
          </div>

          {/* Average Solved Rate */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                Overall Pass Rate
              </span>
              <span className="text-2xl font-black text-gray-900 mt-1 block">
                {metrics.overallRate}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
              <TrendingUp className="w-5 h-5 text-gray-700" />
            </div>
          </div>

          {/* Enrolled Students */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                Active Students
              </span>
              <span className="text-2xl font-black text-gray-900 mt-1 block">
                {metrics.totalStudents}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
              <Users className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions by title, number, or topic..."
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

          {/* Difficulty Filter Tabs */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-gray-100 rounded-lg border border-gray-200">
              {["All", "Easy", "Medium", "Hard"].map((diff) => {
                const isActive = difficultyFilter === diff;
                return (
                  <button
                    key={diff}
                    onClick={() => setDifficultyFilter(diff)}
                    className={`text-xs px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      isActive
                        ? "bg-white text-gray-900 font-semibold shadow-xs"
                        : "text-gray-600 hover:text-gray-900 font-medium"
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>

            {(searchQuery || difficultyFilter !== "All") && (
              <Button
                color="primary"
                radius="full"
                size="sm"
                onPress={() => {
                  setSearchQuery("");
                  setDifficultyFilter("All");
                }}
                startContent={<RotateCcw className="w-3.5 h-3.5" />}
                title="Reset Filters"
                className="font-semibold"
              >
                <span className="hidden sm:inline">Reset</span>
              </Button>
            )}
          </div>
        </div>

        {/* Questions Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80 text-[12px] font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-3.5 px-5">
                    <button
                      onClick={() => handleSort("number")}
                      className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer"
                      title="Sort by question number"
                    >
                      <span>Question Title</span>
                      <ArrowUpDown className="w-3 h-3 text-gray-400" />
                    </button>
                  </th>
                  <th className="py-3.5 px-5 w-28">
                    <button
                      onClick={() => handleSort("difficulty")}
                      className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer"
                    >
                      <span>Difficulty</span>
                      <ArrowUpDown className="w-3 h-3 text-gray-400" />
                    </button>
                  </th>
                  <th className="py-3.5 px-5 w-36 text-center">
                    <span>Solved By</span>
                  </th>
                  <th className="py-3.5 px-5 w-36 text-center">
                    <span>Attempted</span>
                  </th>
                  <th className="py-3.5 px-5 w-28 text-center">
                    <span>Pass Rate</span>
                  </th>
                  <th className="py-3.5 px-5 w-44 text-right">
                    <span>Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {enrichedQuestions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-14 text-center text-gray-400">
                      <div className="max-w-xs mx-auto space-y-2.5">
                        <Code2 className="w-9 h-9 text-gray-300 mx-auto" />
                        <p className="font-semibold text-gray-700 text-base">
                          No questions found
                        </p>
                        <p className="text-xs text-gray-400">
                          Try adjusting your search criteria or create a new question.
                        </p>
                        <Link
                          href="/teacher/questions/create"
                          className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Create Question</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  enrichedQuestions.map((question) => {
                    const difficultyStyles = {
                      Easy: "text-emerald-800 bg-emerald-50 border-emerald-200",
                      Medium: "text-amber-800 bg-amber-50 border-amber-200",
                      Hard: "text-rose-800 bg-rose-50 border-rose-200"
                    };

                    return (
                      <tr
                        key={question.id}
                        onClick={() =>
                          router.push(
                            `/teacher/questions/${question.id}/submissions`
                          )
                        }
                        className="hover:bg-gray-50/70 transition-colors cursor-pointer group"
                      >
                        {/* Title & Topics with Plain Number like Student Portal */}
                        <td className="py-4 px-5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                                {question.number}. {question.title}
                              </span>
                              {question.isExempted && (
                                <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                                  Exempted
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              {question.topics?.slice(0, 3).map((topic) => (
                                <span
                                  key={topic}
                                  className="text-[11px] px-2 py-0.2 rounded bg-gray-100 text-gray-600 font-medium"
                                >
                                  {topic}
                                </span>
                              ))}
                              {question.topics?.length > 3 && (
                                <span className="text-[10px] text-gray-400">
                                  +{question.topics.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </td>


                        {/* Difficulty */}
                        <td className="py-4 px-5">
                          <span
                            className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded border ${
                              difficultyStyles[question.difficulty] ||
                              "text-gray-700 bg-gray-50 border-gray-200"
                            }`}
                          >
                            {question.difficulty}
                          </span>
                        </td>

                        {/* Solved By */}
                        <td className="py-4 px-5 text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{question.solvedCount || 0} Solved</span>
                          </span>
                        </td>

                        {/* Attempted */}
                        <td className="py-4 px-5 text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>{question.attemptedCount || 0} Pending</span>
                          </span>
                        </td>

                        {/* Pass Rate */}
                        <td className="py-4 px-5 text-center font-mono text-xs font-semibold text-gray-700">
                          {question.passRate || "0%"}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5 text-right">
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-end gap-1.5"
                          >
                            {/* View Submissions */}
                            <Link
                              href={`/teacher/questions/${question.id}/submissions`}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold shadow-2xs transition-colors"
                              title="View student submissions"
                            >
                              <Users className="w-3.5 h-3.5 text-gray-600" />
                              <span className="hidden lg:inline">Students</span>
                            </Link>

                            {/* Edit */}
                            <Link
                              href={`/teacher/questions/${question.id}/edit`}
                              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 transition-colors shadow-2xs"
                              title="Edit Question"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </Link>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={(e) =>
                                handleDelete(e, question.id, question.title)
                              }
                              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors shadow-2xs cursor-pointer"
                              title="Delete Question"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count indicator */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
            <span>
              Showing <strong className="text-gray-800">{enrichedQuestions.length}</strong> of{" "}
              <strong className="text-gray-800">{questions.length}</strong> questions
            </span>
            <span className="text-gray-400">
              Click any question row to view students who solved or attempted it
            </span>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
