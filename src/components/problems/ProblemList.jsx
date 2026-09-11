import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Search,
  CheckCircle2,
  Circle,
  Shuffle,
  ChevronRight,
  Code2,
  RotateCcw,
  ArrowUpDown,
  LayoutDashboard
} from "lucide-react";
import { problems, defaultSubmissions } from "@/data/problemsData";

export default function ProblemList() {
  const router = useRouter();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All"); // All, Easy, Medium, Hard
  const [statusFilter, setStatusFilter] = useState("All"); // All, Solved, Todo
  const [sortField, setSortField] = useState("number"); // number, title, acceptance, difficulty
  const [sortOrder, setSortOrder] = useState("asc"); // asc, desc

  // Determine problem status based on defaultSubmissions
  const solvedProblemIds = useMemo(() => {
    const solvedSet = new Set();
    defaultSubmissions.forEach((sub) => {
      if (sub.status === "Accepted") {
        solvedSet.add(sub.problemId);
      }
    });
    return solvedSet;
  }, []);

  const attemptedProblemIds = useMemo(() => {
    const attemptedSet = new Set();
    defaultSubmissions.forEach((sub) => {
      if (sub.status !== "Accepted" && !solvedProblemIds.has(sub.problemId)) {
        attemptedSet.add(sub.problemId);
      }
    });
    return attemptedSet;
  }, [solvedProblemIds]);

  // Stats calculation
  const stats = useMemo(() => {
    const total = problems.length;
    let solved = 0;
    let easySolved = 0, easyTotal = 0;
    let medSolved = 0, medTotal = 0;
    let hardSolved = 0, hardTotal = 0;

    problems.forEach((p) => {
      const isSolved = solvedProblemIds.has(p.id);
      if (isSolved) solved++;

      if (p.difficulty === "Easy") {
        easyTotal++;
        if (isSolved) easySolved++;
      } else if (p.difficulty === "Medium") {
        medTotal++;
        if (isSolved) medSolved++;
      } else if (p.difficulty === "Hard") {
        hardTotal++;
        if (isSolved) hardSolved++;
      }
    });

    return {
      total,
      solved,
      easySolved,
      easyTotal,
      medSolved,
      medTotal,
      hardSolved,
      hardTotal
    };
  }, [solvedProblemIds]);

  // Filter and sort problems
  const filteredProblems = useMemo(() => {
    return problems
      .filter((problem) => {
        // Search filter (number, title, or topic)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchesTitle = problem.title.toLowerCase().includes(query);
          const matchesNumber = problem.number.toString().includes(query);
          const matchesTopic = problem.topics?.some((t) =>
            t.toLowerCase().includes(query)
          );
          if (!matchesTitle && !matchesNumber && !matchesTopic) return false;
        }

        // Difficulty filter
        if (difficultyFilter !== "All" && problem.difficulty !== difficultyFilter) {
          return false;
        }

        // Status filter
        if (statusFilter === "Solved" && !solvedProblemIds.has(problem.id)) {
          return false;
        }
        if (statusFilter === "Todo" && solvedProblemIds.has(problem.id)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        let compare = 0;
        if (sortField === "number") {
          compare = a.number - b.number;
        } else if (sortField === "title") {
          compare = a.title.localeCompare(b.title);
        } else if (sortField === "acceptance") {
          const accA = parseFloat(a.acceptance) || 0;
          const accB = parseFloat(b.acceptance) || 0;
          compare = accA - accB;
        } else if (sortField === "difficulty") {
          const rank = { Easy: 1, Medium: 2, Hard: 3 };
          compare = (rank[a.difficulty] || 0) - (rank[b.difficulty] || 0);
        }
        return sortOrder === "asc" ? compare : -compare;
      });
  }, [
    searchQuery,
    difficultyFilter,
    statusFilter,
    sortField,
    sortOrder,
    solvedProblemIds
  ]);

  // Pick random problem
  const handlePickRandom = () => {
    if (problems.length === 0) return;
    const randomIndex = Math.floor(Math.random() * problems.length);
    const randomProblem = problems[randomIndex];
    router.push(`/problems/${randomProblem.slug}`);
  };

  // Toggle sort order
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setDifficultyFilter("All");
    setStatusFilter("All");
    setSortField("number");
    setSortOrder("asc");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-slate-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-slate-900 font-bold tracking-tight text-lg hover:opacity-80 transition-opacity"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/leetcode.webp"
                alt="LeetCode Logo"
                className="w-6 h-6 object-contain"
              />
              <span>LeetCode</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
              <Link
                href="/problems"
                className="px-3.5 py-1.5 rounded-md bg-slate-100 text-slate-900 border border-slate-200"
              >
                Problems
              </Link>
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <span className="px-3.5 py-1.5 text-slate-400 cursor-not-allowed">
                Contest
              </span>
              <span className="px-3.5 py-1.5 text-slate-400 cursor-not-allowed">
                Discuss
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePickRandom}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-xs transition-colors cursor-pointer"
              title="Pick a random problem to solve"
            >
              <Shuffle className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Pick One</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <img
                src="https://assets.leetcode.com/users/ycb5lAHqph/avatar_1731774786.png"
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover border border-slate-200"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/leetcode.webp";
                }}
              />
              <span className="text-sm font-semibold text-slate-700 hidden sm:inline">
                dorimon08
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-6">
        {/* Progress & Overview Card */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Overall Solved Counter */}
            <div className="flex items-center gap-5">
              <div className="relative w-22 h-22 shrink-0 flex items-center justify-center rounded-full border-4 border-slate-100 bg-slate-50/50">
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-900 leading-tight">
                    {stats.solved}
                  </div>
                  <div className="text-xs text-slate-400 font-medium -mt-0.5">
                    / {stats.total} Solved
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Problem Set
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Practice coding interview questions with interactive test runner and multi-language editor.
                </p>
                <div className="flex items-center gap-3.5 mt-2.5 text-sm font-medium text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{stats.solved} Solved</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <Circle className="w-4 h-4 text-slate-400" />
                    <span>{stats.total - stats.solved} Unsolved</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Search & Filter Toolbar */}
        <section className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions by title or number..."
                className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Controls Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Difficulty Dropdown / Pill */}
              <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
                {["All", "Easy", "Medium", "Hard"].map((diff) => {
                  const isActive = difficultyFilter === diff;
                  return (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={`text-sm px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                        isActive
                          ? "bg-white text-slate-900 font-semibold shadow-xs"
                          : "text-slate-600 hover:text-slate-900 font-medium"
                      }`}
                    >
                      {diff}
                    </button>
                  );
                })}
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-hidden focus:bg-white cursor-pointer font-medium"
              >
                <option value="All">Status: All</option>
                <option value="Solved">Status: Solved</option>
                <option value="Todo">Status: Todo</option>
              </select>

              {/* Reset button if any filter applied */}
              {(searchQuery ||
                difficultyFilter !== "All" ||
                statusFilter !== "All") && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer font-medium"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Problems Table */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[13px] font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3.5 px-5 w-14 text-center">Status</th>
                  <th className="py-3.5 px-5">
                    <button
                      onClick={() => handleSort("title")}
                      className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer"
                    >
                      <span>Title</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="py-3.5 px-5 w-36">
                    <button
                      onClick={() => handleSort("acceptance")}
                      className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer"
                    >
                      <span>Acceptance</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="py-3.5 px-5 w-32">
                    <button
                      onClick={() => handleSort("difficulty")}
                      className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer"
                    >
                      <span>Difficulty</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="py-3.5 px-5 w-20 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredProblems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-14 text-center text-slate-400">
                      <div className="max-w-xs mx-auto space-y-2.5">
                        <Code2 className="w-9 h-9 text-slate-300 mx-auto" />
                        <p className="font-semibold text-slate-700 text-base">No problems found</p>
                        <p className="text-[13px] text-slate-400">
                          Try adjusting your search query or clear selected filters.
                        </p>
                        <button
                          onClick={handleResetFilters}
                          className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Clear Filters</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProblems.map((problem) => {
                    const isSolved = solvedProblemIds.has(problem.id);
                    const isAttempted = attemptedProblemIds.has(problem.id);

                    const difficultyBadgeStyles = {
                      Easy: "text-emerald-700 bg-emerald-50 border-emerald-200",
                      Medium: "text-amber-700 bg-amber-50 border-amber-200",
                      Hard: "text-rose-700 bg-rose-50 border-rose-200"
                    };

                    return (
                      <tr
                        key={problem.id}
                        onClick={() => router.push(`/problems/${problem.slug}`)}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      >
                        {/* Status Icon */}
                        <td className="py-4 px-5 text-center">
                          {isSolved ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 mx-auto" />
                          ) : isAttempted ? (
                            <span className="inline-block w-4 h-4 rounded-full border-2 border-amber-500" />
                          ) : (
                            <Circle className="w-4.5 h-4.5 text-slate-300 mx-auto" />
                          )}
                        </td>

                        {/* Title (No topic tags) */}
                        <td className="py-4 px-5">
                          <span className="font-semibold text-[15px] sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                            {problem.number}. {problem.title}
                          </span>
                        </td>

                        {/* Acceptance Rate */}
                        <td className="py-4 px-5 font-mono text-slate-600 text-sm">
                          {problem.acceptance}
                        </td>

                        {/* Difficulty */}
                        <td className="py-4 px-5">
                          <span
                            className={`inline-block text-[13px] font-semibold px-2.5 py-0.5 rounded border ${
                              difficultyBadgeStyles[problem.difficulty] ||
                              "text-slate-700 bg-slate-50 border-slate-200"
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                        </td>

                        {/* Action Arrow */}
                        <td className="py-4 px-5 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 group-hover:text-slate-900 group-hover:bg-slate-100 transition-colors">
                            <ChevronRight className="w-4.5 h-4.5" />
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count indicator */}
          <div className="p-4.5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-2">
            <span>
              Showing <strong className="text-slate-800">{filteredProblems.length}</strong> of{" "}
              <strong className="text-slate-800">{problems.length}</strong> questions
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[13px] text-slate-400">
                Click any problem to open the interactive code editor
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
