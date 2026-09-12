import React, { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Tag,
  Building2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle2,
  FileText,
  BookOpen,
  Users,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Sparkles
} from "lucide-react";

export default function ProblemDescription({
  problem,
  submissions = [],
  onSelectSubmission
}) {
  const [activeTab, setActiveTab] = useState("description");
  const [showCompanies, setShowCompanies] = useState(false);
  const [expandedHints, setExpandedHints] = useState({});
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopyText = (text, key) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  if (!problem) return null;

  const toggleHint = (index) => {
    setExpandedHints((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const difficultyColors = {
    Easy: "text-emerald-700 bg-emerald-50 border-emerald-200",
    Medium: "text-amber-700 bg-amber-50 border-amber-200",
    Hard: "text-rose-700 bg-rose-50 border-rose-200"
  };

  const normDifficulty = (() => {
    if (!problem.difficulty) return "Easy";
    const u = String(problem.difficulty).toUpperCase();
    if (u === "HARD") return "Hard";
    if (u === "MEDIUM") return "Medium";
    return "Easy";
  })();

  const safeExamples = Array.isArray(problem.examples)
    ? problem.examples
    : typeof problem.examples === "string"
    ? (() => { try { return JSON.parse(problem.examples); } catch { return []; } })()
    : [];

  const safeConstraints = Array.isArray(problem.constraints)
    ? problem.constraints
    : typeof problem.constraints === "string"
    ? (() => { try { return JSON.parse(problem.constraints); } catch { return []; } })()
    : [];

  const safeHints = Array.isArray(problem.hints)
    ? problem.hints
    : typeof problem.hints === "string"
    ? (() => { try { return JSON.parse(problem.hints); } catch { return []; } })()
    : [];

  const currentSubmissions = submissions.filter(
    (s) => s.problemId === problem.id
  );

  return (
    <div className="flex flex-col h-full bg-white text-slate-800 select-text overflow-hidden">
      {/* Top Tab Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-3 py-1.5 shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("description")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "description"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Description</span>
          </button>

          <button
            onClick={() => setActiveTab("editorial")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "editorial"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Editorial</span>
          </button>

          <button
            onClick={() => setActiveTab("solutions")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "solutions"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-600" />
            <span>Solutions</span>
          </button>

          <button
            onClick={() => setActiveTab("submissions")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "submissions"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            <span>Submissions</span>
            {currentSubmissions.length > 0 && (
              <span className="ml-0.5 text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 font-bold text-slate-700">
                {currentSubmissions.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div
        className="flex-1 overflow-y-auto px-5 py-5 no-scrollbar scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {activeTab === "description" && (
          <div className="space-y-6">
            {/* Title & Metadata Header */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  {problem.number}. {problem.title}
                </h1>
              </div>

              {/* Badges & Stats */}
              <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs">
                <span
                  className={`font-semibold px-2.5 py-0.5 rounded-md border ${
                    difficultyColors[normDifficulty] ||
                    difficultyColors.Easy
                  }`}
                >
                  {normDifficulty}
                </span>

                {problem.isExempted && (
                  <>
                    <span className="text-slate-400">•</span>
                    <span className="font-semibold px-2 py-0.5 rounded-md border text-slate-700 bg-slate-50 border-slate-200">
                      Exempted
                    </span>
                  </>
                )}

                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-medium">
                  Acceptance:{" "}
                  <strong className="text-slate-800 font-semibold">
                    {problem.acceptance}
                  </strong>
                </span>

                <span className="text-slate-400">•</span>
                <div className="flex items-center gap-1 text-slate-500">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>{problem.category}</span>
                </div>
              </div>

              {/* Action Buttons Row (Likes, Bookmark, etc.) */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setLiked(!liked);
                    if (disliked) setDisliked(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                    liked
                      ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{problem.likes + (liked ? 1 : 0)}</span>
                </button>

                <button
                  onClick={() => {
                    setDisliked(!disliked);
                    if (liked) setLiked(false);
                  }}
                  className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                    disliked
                      ? "bg-rose-50 border-rose-300 text-rose-700"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                  title="Dislike"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                    bookmarked
                      ? "bg-amber-50 border-amber-300 text-amber-600"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                  title="Star problem"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      bookmarked ? "fill-amber-500" : ""
                    }`}
                  />
                </button>

                <button
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs transition-colors cursor-pointer ml-auto"
                  title="Share link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Topic Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {problem.topics?.map((topic) => (
                <span
                  key={topic}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 border border-slate-200/80 text-slate-700"
                >
                  {topic}
                </span>
              ))}

              {problem.companies?.length > 0 && (
                <button
                  onClick={() => setShowCompanies(!showCompanies)}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Building2 className="w-3 h-3" />
                  <span>Companies ({problem.companies.length})</span>
                  {showCompanies ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
              )}
            </div>

            {/* Companies List (Expandable) */}
            {showCompanies && problem.companies && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap gap-1.5 animate-fadeIn">
                {problem.companies.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-0.5 rounded-md text-xs bg-white border border-slate-200 text-slate-700 font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}

            {/* Problem Description HTML Content */}
            <div
              className="text-sm leading-relaxed text-slate-700 border-t border-slate-100 pt-4"
              dangerouslySetInnerHTML={{ __html: problem.description }}
            />

            {/* Input Format */}
            {problem.inputFormat && (
              <div className="space-y-1.5 pt-2">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Input Format
                </h3>
                <div
                  className="text-xs text-slate-700 leading-relaxed p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  dangerouslySetInnerHTML={{ __html: problem.inputFormat }}
                />
              </div>
            )}

            {/* Output Format */}
            {problem.outputFormat && (
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Output Format
                </h3>
                <div
                  className="text-xs text-slate-700 leading-relaxed p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  dangerouslySetInnerHTML={{ __html: problem.outputFormat }}
                />
              </div>
            )}

            {/* Examples / Sample Cases */}
            {safeExamples.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Sample Input &amp; Output
                </h3>

                {safeExamples.map((ex, idx) => {
                  const sampleIn = ex.stdin !== undefined ? ex.stdin : (typeof ex.input === 'string' ? ex.input : JSON.stringify(ex.input));
                  const sampleOut = ex.stdout !== undefined ? ex.stdout : (typeof ex.output === 'string' ? ex.output : JSON.stringify(ex.output));
                  const inKey = `in_${idx}`;
                  const outKey = `out_${idx}`;

                  return (
                    <div
                      key={ex.id || idx}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-xs"
                    >
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        <span>Sample Case {idx + 1}:</span>
                      </div>

                      <div className="space-y-3">
                        {/* Sample Input */}
                        <div>
                          <div className="flex items-center justify-between pb-1 text-[11px] font-semibold text-slate-500">
                            <span>Sample Input:</span>
                            <button
                              type="button"
                              onClick={() => handleCopyText(sampleIn, inKey)}
                              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-700 font-medium cursor-pointer"
                            >
                              {copiedKey === inKey ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-600">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-slate-900 text-xs overflow-x-auto whitespace-pre-wrap">
                            {sampleIn}
                          </pre>
                        </div>

                        {/* Sample Output */}
                        <div>
                          <div className="flex items-center justify-between pb-1 text-[11px] font-semibold text-slate-500">
                            <span>Sample Output:</span>
                            <button
                              type="button"
                              onClick={() => handleCopyText(sampleOut, outKey)}
                              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-700 font-medium cursor-pointer"
                            >
                              {copiedKey === outKey ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-600">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-slate-900 font-bold text-xs overflow-x-auto whitespace-pre-wrap">
                            {sampleOut}
                          </pre>
                        </div>

                        {ex.explanation && (
                          <div className="pt-1 font-sans text-slate-600">
                            <span className="text-slate-500 font-medium">
                              Explanation:{" "}
                            </span>
                            <span>{ex.explanation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Constraints */}
            {safeConstraints.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Constraints:
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 marker:text-slate-400">
                  {safeConstraints.map((c, i) => (
                    <li key={i}>
                      <code className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono text-[11px]">
                        {c}
                      </code>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hints Accordion */}
            {safeHints.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Hints</span>
                </h3>

                <div className="space-y-2">
                  {safeHints.map((hint, i) => {
                    const isExpanded = !!expandedHints[i];
                    return (
                      <div
                        key={i}
                        className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50"
                      >
                        <button
                          onClick={() => toggleHint(i)}
                          className="w-full text-left px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-700">
                              {i + 1}
                            </span>
                            <span>Hint {i + 1}</span>
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="px-3.5 py-3 text-xs text-slate-600 bg-white border-t border-slate-200 leading-relaxed">
                            {hint}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Editorial Tab */}
        {activeTab === "editorial" && (
          <div className="space-y-5 text-xs text-slate-700">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <h3 className="font-bold text-emerald-900 text-sm mb-1">
                Official Editorial
              </h3>
              <p className="leading-relaxed text-emerald-800">
                {problem.editorial?.summary ||
                  "Detailed step-by-step breakdown of optimal approaches."}
              </p>
            </div>

            {problem.editorial?.approaches?.map((app, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {app.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-medium text-[11px]">
                      Time: {app.timeComplexity}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-medium text-[11px]">
                      Space: {app.spaceComplexity}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed text-xs">
                  {app.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Community Solutions Tab */}
        {activeTab === "solutions" && (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="font-semibold text-slate-800">
                Community Solutions
              </span>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Top voted solutions written in JavaScript, Python, C++, and Java.
              </p>
            </div>

            {[
              {
                title: `Clean 1-pass solution with O(n) Time & O(n) Space`,
                author: "algomaster",
                votes: 1420,
                lang: "JavaScript",
                tags: ["Hash Table", "One Pass"]
              },
              {
                title: `Beginner-Friendly Explanation with Diagrams`,
                author: "codewithme",
                votes: 980,
                lang: "Python",
                tags: ["Array", "Beginner"]
              },
              {
                title: `Detailed Tradeoffs between Time vs Space Complexity`,
                author: "striver_fan",
                votes: 620,
                lang: "C++",
                tags: ["Optimization"]
              }
            ].map((sol, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2 cursor-pointer group shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {sol.title}
                  </h4>
                  <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px] shrink-0">
                    ▲ {sol.votes}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                      {sol.author[0].toUpperCase()}
                    </span>
                    <span>{sol.author}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {sol.lang}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === "submissions" && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-semibold text-slate-800">
                Your Past Submissions
              </span>
              <span className="text-slate-400 text-[11px]">
                {currentSubmissions.length} record(s)
              </span>
            </div>

            {currentSubmissions.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p>No submissions for this question yet.</p>
                <p className="text-[11px] text-slate-400">
                  Click <strong>Submit</strong> in the code editor to record one!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {currentSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => onSelectSubmission && onSelectSubmission(sub)}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{sub.status}</span>
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {sub.timestamp}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        Language: {sub.language}
                      </div>
                    </div>

                    <div className="text-right space-y-0.5 text-[11px]">
                      <div className="font-semibold text-slate-800">
                        {sub.runtime}
                      </div>
                      <div className="text-slate-400">{sub.memory}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
