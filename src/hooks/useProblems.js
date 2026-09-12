import { useQuery } from "@tanstack/react-query";
import { problems as fallbackProblems } from "@/data/problemsData";

export const PROBLEMS_QUERY_KEY = ["problems"];

export function normalizeApiQuestions(rawQuestions) {
  if (!Array.isArray(rawQuestions)) return [];
  return rawQuestions.map((q) => {
    let diff = "Easy";
    if (q.difficulty) {
      const upper = String(q.difficulty).toUpperCase();
      if (upper === "HARD") diff = "Hard";
      else if (upper === "MEDIUM") diff = "Medium";
      else diff = "Easy";
    }

    let topics = [];
    if (Array.isArray(q.topics)) {
      topics = q.topics;
    } else if (typeof q.topics === "string") {
      try {
        topics = JSON.parse(q.topics);
      } catch {
        topics = [];
      }
    }

    return {
      ...q,
      difficulty: diff,
      topics,
      number: Number(q.number || 0)
    };
  });
}

export async function fetchProblems() {
  const res = await fetch("/api/questions");
  if (!res.ok) {
    throw new Error(`Server returned HTTP ${res.status}`);
  }
  const data = await res.json();
  if (data.success && Array.isArray(data.questions)) {
    return normalizeApiQuestions(data.questions);
  }
  throw new Error(data.error || "Failed to load questions from database");
}

export function useProblems(options = {}) {
  return useQuery({
    queryKey: PROBLEMS_QUERY_KEY,
    queryFn: fetchProblems,
    staleTime: 1000 * 60 * 10, // 10 minutes cache: avoids re-querying the DB
    gcTime: 1000 * 60 * 60, // 1 hour garbage collection
    placeholderData: fallbackProblems,
    ...options
  });
}

export async function fetchProblemBySlug(slug) {
  if (!slug) return null;
  const res = await fetch(`/api/questions/${slug}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch problem: HTTP ${res.status}`);
  }
  const data = await res.json();
  if (data.success && data.question) {
    const q = data.question;
    let diff = "Easy";
    if (q.difficulty) {
      const upper = String(q.difficulty).toUpperCase();
      if (upper === "HARD") diff = "Hard";
      else if (upper === "MEDIUM") diff = "Medium";
      else diff = "Easy";
    }
    const tcList =
      Array.isArray(data.testCases) && data.testCases.length > 0
        ? data.testCases
        : Array.isArray(q.testcases)
        ? q.testcases
        : [];

    return {
      ...q,
      difficulty: diff,
      testcases: tcList.map((tc, idx) => ({
        id: tc.id || idx + 1,
        name: tc.name || `Case ${idx + 1}`,
        stdin: tc.stdin || "",
        expectedStdout: tc.expectedStdout || tc.expected_stdout || "",
        isHidden: Boolean(tc.isHidden || tc.is_hidden),
        explanation: tc.explanation || null
      }))
    };
  }
  throw new Error(data.error || "Question not found");
}

export function useProblem(slug, initialData = null) {
  return useQuery({
    queryKey: ["problem", slug],
    queryFn: () => fetchProblemBySlug(slug),
    enabled: Boolean(slug),
    initialData: initialData || undefined,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60
  });
}
