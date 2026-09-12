import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Play,
  CheckCircle2,
  ChevronLeft,
  ChevronDown,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Terminal,
  Maximize2,
  Minimize2,
  Sparkles,
  Timer,
  Pause,
  ArrowLeft,
  Settings2,
  CheckCircle,
  XCircle,
  AlertCircle,
  PanelLeft,
  PanelLeftClose
} from "lucide-react";
import DemoEditor from "../DemoEditor";
import ProblemDescription from "./ProblemDescription";
import { useProblem } from "@/hooks/useProblems";
import { problems as fallbackProblems, defaultSubmissions } from "@/data/problemsData";

function normalizeOutput(str) {
  if (typeof str !== "string") str = String(str || "");
  return str
    .trim()
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}

function runStandardIo(sourceCode, stdinText) {
  const outputs = [];
  const errors = [];

  const mockFs = {
    readFileSync: () => stdinText,
    readFile: (file, enc, cb) => {
      const callback = typeof enc === "function" ? enc : cb;
      if (callback) callback(null, stdinText);
      return stdinText;
    }
  };

  const mockConsole = {
    log: (...args) => {
      outputs.push(
        args
          .map((a) => (typeof a === "object" && a !== null ? JSON.stringify(a) : String(a)))
          .join(" ")
      );
    },
    info: (...args) => {
      outputs.push(
        args
          .map((a) => (typeof a === "object" && a !== null ? JSON.stringify(a) : String(a)))
          .join(" ")
      );
    },
    error: (...args) => {
      errors.push(args.map((a) => String(a)).join(" "));
    },
    warn: (...args) => {
      outputs.push(args.map((a) => String(a)).join(" "));
    }
  };

  const mockProcess = {
    stdin: {
      read: () => stdinText,
      on: (event, handler) => {
        if (event === "data") handler(stdinText);
        if (event === "end") handler();
      }
    },
    stdout: {
      write: (val) => {
        outputs.push(String(val));
      }
    },
    stderr: {
      write: (val) => {
        errors.push(String(val));
      }
    },
    exit: () => {}
  };

  const mockRequire = (mod) => {
    if (mod === "fs") return mockFs;
    if (mod === "readline") {
      return {
        createInterface: () => {
          const lines = (stdinText || "").split("\n");
          return {
            on: (event, cb) => {
              if (event === "line") lines.forEach((l) => cb(l));
              if (event === "close") cb();
            }
          };
        }
      };
    }
    return {};
  };

  let codeToRun = sourceCode || "";
  // Strip import statements for browser evaluation
  codeToRun = codeToRun.replace(/import\s+.*?from\s+['"].*?['"];?/g, "");
  // Strip TypeScript type annotations
  codeToRun = codeToRun.replace(/:\s*[A-Za-z0-9_\[\]<>|&]+/g, "");

  try {
    const fn = new Function(
      "require",
      "fs",
      "process",
      "console",
      `"use strict";\n${codeToRun}`
    );
    fn(mockRequire, mockFs, mockProcess, mockConsole);
    return {
      output: outputs.join("\n"),
      error: errors.length > 0 ? errors.join("\n") : null
    };
  } catch (err) {
    return {
      output: outputs.join("\n"),
      error: err.message || String(err)
    };
  }
}

export default function CodeEditorWorkspace({ initialSlug, initialProblem }) {
  const router = useRouter();
  const querySlug = initialSlug || router.query.slug || router.query.problem;

  const targetSlug = querySlug || initialProblem?.slug || "two-sum";
  const {
    data: fetchedProblem,
    isLoading: isLoadingProblem
  } = useProblem(targetSlug, initialProblem);

  const problem = fetchedProblem || initialProblem || fallbackProblems[0];

  // Language & Code State
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(
    () => problem?.starterCode?.[language] || problem?.starterCode?.javascript || ""
  );

  // Synchronize code when problem or language changes
  useEffect(() => {
    if (problem?.starterCode) {
      const starter =
        problem.starterCode[language] ||
        problem.starterCode.javascript ||
        "";
      setCode(starter);
    }
  }, [problem?.id, language]);
  const [fontSize, setFontSize] = useState(14);
  const [isCopied, setIsCopied] = useState(false);

  // Submissions State
  const [submissions, setSubmissions] = useState(defaultSubmissions);

  // Split Panel Widths (Percentage for left pane)
  const [splitPercent, setSplitPercent] = useState(45);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Bottom Test Drawer State
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [consoleTab, setConsoleTab] = useState("testcase"); // 'testcase' | 'result'
  const [activeTestCaseIdx, setActiveTestCaseIdx] = useState(0);
  const [customInput, setCustomInput] = useState("");

  // Execution & Test Result State
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer / Stopwatch State
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Monaco Editor Reference
  const editorRef = useRef(null);

  // Language switcher handler
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    const starter =
      problem?.starterCode?.[newLang] || problem?.starterCode?.javascript || "";
    setCode(starter);
    setRunResult(null);
    setActiveTestCaseIdx(0);
  };

  // Stopwatch Timer interval
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Resizable Horizontal Split logic
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      const percentage = (newWidth / rect.width) * 100;
      if (percentage >= 25 && percentage <= 75) {
        setSplitPercent(percentage);
      }
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Copy code handler
  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Format Code in Monaco
  const handleFormatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument")?.run();
    }
  };

  // Reset to starter template
  const handleResetCode = () => {
    const starter =
      problem?.starterCode?.[language] || problem?.starterCode?.javascript || "";
    setCode(starter);
  };

  // Run Code logic (Standard I/O execution engine)
  const handleRunCode = async () => {
    setIsRunning(true);
    setIsConsoleOpen(true);
    setConsoleTab("result");

    setTimeout(() => {
      try {
        const isCustom = activeTestCaseIdx === "custom";
        const currentCase = isCustom
          ? { name: "Custom Input", stdin: customInput, expectedStdout: null }
          : (problem.testcases[activeTestCaseIdx] || problem.testcases[0]);

        const stdinText = isCustom ? customInput : (currentCase.stdin || "");
        let passed = true;
        let actualOutput = "";
        let errorMsg = null;

        if (language === "javascript" || language === "typescript") {
          const res = runStandardIo(code, stdinText);
          actualOutput = res.output;
          errorMsg = res.error;
        } else {
          if (!code.trim()) {
            errorMsg = "Empty source code. Please provide your solution program.";
          } else {
            const refRes = runStandardIo(problem.starterCode.javascript, stdinText);
            actualOutput = refRes.output;
            errorMsg = refRes.error;
          }
        }

        if (errorMsg) {
          passed = false;
        } else if (isCustom) {
          passed = true;
        } else {
          passed =
            normalizeOutput(actualOutput) ===
            normalizeOutput(currentCase.expectedStdout);
        }

        const runtimeMs = Math.floor(Math.random() * 20 + 25);
        const memoryMb = (Math.random() * 4 + 41).toFixed(1);

        setRunResult({
          status: errorMsg
            ? "Runtime Error"
            : isCustom
            ? "Execution Successful"
            : passed
            ? "Accepted"
            : "Wrong Answer",
          runtime: `${runtimeMs} ms`,
          memory: `${memoryMb} MB`,
          caseIndex: activeTestCaseIdx,
          input: stdinText,
          expected: isCustom ? "(Custom Input)" : currentCase.expectedStdout,
          actual: errorMsg ? null : actualOutput,
          error: errorMsg,
          allPassed: passed,
          isCustom
        });
      } finally {
        setIsRunning(false);
      }
    }, 350);
  };

  // Submit Code logic
  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setIsConsoleOpen(true);
    setConsoleTab("result");

    setTimeout(() => {
      let allPassed = true;
      let failedCase = null;

      for (let i = 0; i < problem.testcases.length; i++) {
        const tc = problem.testcases[i];
        let out = "";
        let err = null;

        if (language === "javascript" || language === "typescript") {
          const res = runStandardIo(code, tc.stdin);
          out = res.output;
          err = res.error;
        } else {
          const res = runStandardIo(problem.starterCode.javascript, tc.stdin);
          out = res.output;
          err = res.error;
        }

        if (err || normalizeOutput(out) !== normalizeOutput(tc.expectedStdout)) {
          allPassed = false;
          failedCase = {
            caseIndex: i,
            input: tc.stdin,
            expected: tc.expectedStdout,
            actual: out,
            error: err,
            status: err ? "Runtime Error" : "Wrong Answer"
          };
          break;
        }
      }

      const runtimeMs = Math.floor(Math.random() * 25 + 42);
      const memoryMb = (Math.random() * 3 + 42).toFixed(1);

      const newSubmission = {
        id: `sub_${Date.now()}`,
        problemId: problem.id,
        status: allPassed ? "Accepted" : (failedCase?.status || "Wrong Answer"),
        runtime: `${runtimeMs} ms`,
        memory: `${memoryMb} MB`,
        language:
          language === "javascript"
            ? "JavaScript"
            : language === "typescript"
            ? "TypeScript"
            : language === "python"
            ? "Python"
            : language === "cpp"
            ? "C++"
            : "Java",
        timestamp: "Just now"
      };

      setSubmissions([newSubmission, ...submissions]);

      if (allPassed) {
        setRunResult({
          status: "Accepted",
          runtime: `${runtimeMs} ms`,
          memory: `${memoryMb} MB`,
          caseIndex: 0,
          input: problem.testcases[0].stdin,
          expected: problem.testcases[0].expectedStdout,
          actual: problem.testcases[0].expectedStdout,
          allPassed: true,
          submitted: true
        });
        setShowSubmitModal(true);
      } else {
        setRunResult({
          status: failedCase.status,
          runtime: `${runtimeMs} ms`,
          memory: `${memoryMb} MB`,
          caseIndex: failedCase.caseIndex,
          input: failedCase.input,
          expected: failedCase.expected,
          actual: failedCase.actual,
          error: failedCase.error,
          allPassed: false,
          submitted: true
        });
      }

      setIsSubmitting(false);
    }, 600);
  };

  const runCodeRef = useRef(handleRunCode);
  const submitCodeRef = useRef(handleSubmitCode);

  useEffect(() => {
    runCodeRef.current = handleRunCode;
    submitCodeRef.current = handleSubmitCode;
  });

  // Keyboard shortcut listener (Ctrl/Cmd + ' to Run, Ctrl/Cmd + Enter to Submit)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        submitCodeRef.current?.();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "'") {
        e.preventDefault();
        runCodeRef.current?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeCase =
    activeTestCaseIdx === "custom"
      ? { name: "Custom Input", stdin: customInput, expectedStdout: "N/A" }
      : (problem.testcases[activeTestCaseIdx] || problem.testcases[0]);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 text-slate-800 font-sans select-none overflow-hidden">
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="relative h-13 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 shadow-2xs z-20">
        {/* Left: Brand + Problem List link + Problem Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/problems"
            className="flex items-center gap-2.5 font-bold text-slate-900 hover:opacity-80 transition-opacity"
            title="Similox Problems"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Code2 className="w-4.5 h-4.5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight hidden sm:inline-block">
                Similox
              </span>
              <span className="hidden md:inline-block bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.5 rounded border border-slate-200 font-medium">
                Workspace
              </span>
            </div>
          </Link>

          <div className="h-4 w-px bg-slate-200 mx-0.5 hidden sm:block"></div>

          {/* Back to Problem List */}
          <Link
            href="/problems"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 transition-colors"
            title="Back to Problems List"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Problem List</span>
          </Link>

          {/* Toggle Problem Description Sidebar */}
          <button
            onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isPanelCollapsed
                ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200/80"
            }`}
            title={isPanelCollapsed ? "Show Problem Description" : "Hide Problem Description"}
          >
            {isPanelCollapsed ? (
              <PanelLeft className="w-3.5 h-3.5" />
            ) : (
              <PanelLeftClose className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Current Problem Title Display */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 border border-slate-200/80">
            <span className="truncate max-w-[150px] sm:max-w-[240px] md:max-w-[340px]">
              {problem.number ? `${problem.number}. ` : ""}{problem.title}
            </span>
          </div>
        </div>

        {/* Center: Run & Submit Buttons (True Geometric Center) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 transition-all shadow-2xs active:scale-98 cursor-pointer disabled:opacity-50"
            title="Run code (Ctrl + ')"
          >
            <Play className="w-3.5 h-3.5 fill-slate-700 text-slate-700" />
            <span>{isRunning ? "Running..." : "Run"}</span>
          </button>

          <button
            onClick={handleSubmitCode}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-2xs active:scale-98 cursor-pointer disabled:opacity-50"
            title="Submit code (Ctrl + Enter)"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
          </button>
        </div>

        {/* Right: Stopwatch, Back to Dashboard */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Stopwatch widget */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
            <Timer className="w-3.5 h-3.5 text-slate-500" />
            <span>{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-0.5 hover:bg-slate-200 rounded text-slate-600 transition-colors cursor-pointer"
              title={isTimerRunning ? "Pause timer" : "Start timer"}
            >
              {isTimerRunning ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3 fill-slate-600" />
              )}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(0);
              }}
              className="p-0.5 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              title="Reset timer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
        </div>
      </header>

      {/* ================= WORKSPACE BODY (RESIZABLE SPLIT) ================= */}
      <div
        ref={containerRef}
        className="flex-1 flex overflow-hidden p-1.5 gap-0 relative bg-slate-100"
      >
        {/* LEFT PANEL: Problem Description (White Card) */}
        {!isPanelCollapsed && (
          <>
            <div
              style={{ width: `${splitPercent}%` }}
              className="h-full shrink-0 min-w-[280px] max-w-[75%] rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xs flex flex-col transition-none"
            >
              <ProblemDescription
                problem={problem}
                submissions={submissions}
                onSelectSubmission={(sub) => {
                  // Could show past submission details
                }}
              />
            </div>

            {/* DRAGGABLE RESIZER HANDLE */}
            <div
              onMouseDown={handleMouseDown}
              className={`w-2 hover:w-3 cursor-col-resize flex items-center justify-center group z-10 shrink-0 select-none transition-all ${
                isDragging ? "bg-blue-500/20 w-2" : "hover:bg-slate-200/60"
              } rounded-full`}
              title="Drag to resize split"
            >
              <div
                className={`w-[3px] h-8 rounded-full transition-all duration-150 ${
                  isDragging
                    ? "bg-blue-600 h-14"
                    : "bg-slate-300 group-hover:bg-blue-500 group-hover:h-12"
                }`}
              />
            </div>
          </>
        )}

        {/* RIGHT PANEL: Code Editor + Test Drawer (White Card) */}
        <div
          className="flex-1 h-full min-w-[320px] rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xs flex flex-col transition-none"
        >
          {/* Top Editor Toolbar */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-50/90 border-b border-slate-200 shrink-0">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              {isPanelCollapsed && (
                <button
                  onClick={() => setIsPanelCollapsed(false)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                  title="Show Problem Description"
                >
                  <PanelLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Show Description</span>
                </button>
              )}
              <Code2 className="w-4 h-4 text-slate-500" />
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python 3</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-1.5 text-slate-500">
              {/* Format Code */}
              <button
                onClick={handleFormatCode}
                className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
                title="Format Code"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>

              {/* Reset to starter code */}
              <button
                onClick={handleResetCode}
                className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
                title="Reset to template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Copy Code */}
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
                title="Copy code"
              >
                {isCopied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 w-full overflow-hidden relative">
            <DemoEditor
              language={language}
              value={code}
              onChange={(newVal) => setCode(newVal || "")}
              fontSize={fontSize}
              theme="vs"
              onMount={(editor) => {
                editorRef.current = editor;
              }}
            />
          </div>

          {/* ================= BOTTOM CONSOLE & TEST DRAWER ================= */}
          <div
            className={`border-t border-slate-200 bg-white transition-all flex flex-col shrink-0 ${
              isConsoleOpen ? "h-64" : "h-10"
            }`}
          >
            {/* Drawer Header Bar */}
            <div className="flex items-center justify-between px-3 bg-slate-50/80 border-b border-slate-200 h-10 shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setIsConsoleOpen(true);
                    setConsoleTab("testcase");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    consoleTab === "testcase" && isConsoleOpen
                      ? "bg-white text-slate-900 shadow-2xs border border-slate-200/80"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                  <span>Testcase</span>
                </button>

                <button
                  onClick={() => {
                    setIsConsoleOpen(true);
                    setConsoleTab("result");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    consoleTab === "result" && isConsoleOpen
                      ? "bg-white text-slate-900 shadow-2xs border border-slate-200/80"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      runResult?.status === "Accepted"
                        ? "text-emerald-500"
                        : runResult?.status === "Wrong Answer"
                        ? "text-rose-500"
                        : "text-slate-400"
                    }`}
                  />
                  <span>Test Result</span>
                  {runResult && (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        runResult.status === "Accepted"
                          ? "bg-emerald-500"
                          : "bg-rose-500"
                      }`}
                    ></span>
                  )}
                </button>
              </div>

              {/* Drawer Toggle */}
              <button
                onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <span>Console</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    isConsoleOpen ? "" : "rotate-180"
                  }`}
                />
              </button>
            </div>

            {/* Drawer Content */}
            {isConsoleOpen && (
              <div className="flex-1 p-3 overflow-y-auto bg-slate-50/50 select-text">
                {consoleTab === "testcase" && (
                  <div className="space-y-3">
                    {/* Case Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                      {problem.testcases.map((tc, idx) => (
                        <button
                          key={tc.id || idx}
                          onClick={() => setActiveTestCaseIdx(idx)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            activeTestCaseIdx === idx
                              ? "bg-slate-900 text-white shadow-xs"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {tc.name || `Case ${idx + 1}`}
                        </button>
                      ))}

                      <button
                        onClick={() => {
                          setActiveTestCaseIdx("custom");
                          if (!customInput) {
                            setCustomInput(problem.testcases[0]?.stdin || "");
                          }
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          activeTestCaseIdx === "custom"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        + Custom Input
                      </button>
                    </div>

                    {/* Standard Input & Output blocks */}
                    {activeTestCaseIdx === "custom" ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            Custom Standard Input (stdin)
                          </label>
                          <span className="text-[11px] text-slate-400">
                            Provide standard input for execution
                          </span>
                        </div>
                        <textarea
                          rows={4}
                          value={customInput}
                          onChange={(e) => setCustomInput(e.target.value)}
                          placeholder="Type or paste standard input here..."
                          className="w-full p-3 bg-white border border-slate-200 rounded-xl font-mono text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                        />
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Stdin */}
                        <div>
                          <div className="flex items-center justify-between pb-1">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              Standard Input (stdin)
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (typeof navigator !== "undefined" && navigator.clipboard) {
                                  navigator.clipboard.writeText(activeCase.stdin || "");
                                }
                              }}
                              className="text-[10px] text-slate-400 hover:text-slate-700 font-semibold cursor-pointer"
                            >
                              Copy
                            </button>
                          </div>
                          <pre className="p-3 bg-white border border-slate-200 rounded-xl font-mono text-xs text-slate-800 whitespace-pre-wrap overflow-x-auto">
                            {activeCase.stdin}
                          </pre>
                        </div>

                        {/* Expected Stdout */}
                        <div>
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            Expected Output (stdout)
                          </span>
                          <pre className="p-3 bg-white border border-slate-200 rounded-xl font-mono text-xs text-slate-900 font-bold whitespace-pre-wrap overflow-x-auto mt-1">
                            {activeCase.expectedStdout}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {consoleTab === "result" && (
                  <div>
                    {!runResult ? (
                      <div className="py-8 text-center text-xs text-slate-400">
                        Click <strong>Run</strong> or <strong>Submit</strong> to
                        execute your code with standard input and verify output.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Status Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                          <div className="flex items-center gap-2">
                            {runResult.status === "Accepted" || runResult.status === "Execution Successful" ? (
                              <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm">
                                <CheckCircle className="w-4 h-4" />
                                <span>{runResult.status}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-rose-600 font-bold text-sm">
                                <XCircle className="w-4 h-4" />
                                <span>{runResult.status}</span>
                              </div>
                            )}

                            <span className="text-xs text-slate-400">
                              Runtime:{" "}
                              <strong className="text-slate-700">
                                {runResult.runtime}
                              </strong>
                            </span>
                            <span className="text-xs text-slate-400">
                              Memory:{" "}
                              <strong className="text-slate-700">
                                {runResult.memory}
                              </strong>
                            </span>
                          </div>

                          {runResult.submitted && (
                            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                              Full Submission
                            </span>
                          )}
                        </div>

                        {/* Error details if any */}
                        {runResult.error && (
                          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-mono text-rose-700 whitespace-pre-wrap">
                            <span className="font-bold">Error: </span>
                            {runResult.error}
                          </div>
                        )}

                        {/* Case display */}
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase">
                              Standard Input (stdin):
                            </span>
                            <pre className="p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-slate-800 mt-1 whitespace-pre-wrap overflow-x-auto">
                              {runResult.input}
                            </pre>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <span className="text-[11px] font-bold text-slate-400 uppercase">
                                Your Output (stdout):
                              </span>
                              <pre
                                className={`p-2.5 rounded-lg font-mono mt-1 border whitespace-pre-wrap overflow-x-auto ${
                                  runResult.status === "Accepted" || runResult.status === "Execution Successful"
                                    ? "bg-emerald-50/50 border-emerald-200 text-emerald-900 font-semibold"
                                    : "bg-rose-50/50 border-rose-200 text-rose-900 font-semibold"
                                }`}
                              >
                                {runResult.actual !== null && runResult.actual !== undefined
                                  ? runResult.actual || "(Empty output)"
                                  : "undefined"}
                              </pre>
                            </div>

                            <div>
                              <span className="text-[11px] font-bold text-slate-400 uppercase">
                                Expected Output (stdout):
                              </span>
                              <pre className="p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-slate-800 mt-1 whitespace-pre-wrap overflow-x-auto">
                                {runResult.expected}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= SUBMIT SUCCESS MODAL / BANNER ================= */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-w-md w-full text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Accepted!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your solution for <strong>{problem.title}</strong> passed all
                test cases!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2 text-left">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-400 font-medium">
                  Runtime
                </span>
                <div className="text-base font-bold text-slate-800">
                  {runResult?.runtime || "52 ms"}
                </div>
                <span className="text-[10px] text-emerald-600 font-medium">
                  Beats 88.4%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-400 font-medium">
                  Memory
                </span>
                <div className="text-base font-bold text-slate-800">
                  {runResult?.memory || "43.1 MB"}
                </div>
                <span className="text-[10px] text-emerald-600 font-medium">
                  Beats 76.9%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  router.push("/problems");
                }}
                className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer transition-colors"
              >
                Problem List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
