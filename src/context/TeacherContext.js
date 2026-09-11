import React, { createContext, useContext, useState, useEffect } from "react";
import { problems as baseProblems } from "@/data/problemsData";

const TeacherContext = createContext();

// Mock Enrolled Students Directory
export const initialStudents = [
  {
    id: "std-001",
    name: "Alex Rivera",
    email: "alex.rivera@university.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rollNo: "CS2024-042",
    totalSolved: 14,
    totalAttempted: 18
  },
  {
    id: "std-002",
    name: "Marcus Vance",
    email: "marcus.v@university.edu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rollNo: "CS2024-019",
    totalSolved: 12,
    totalAttempted: 16
  },
  {
    id: "std-003",
    name: "Elena Rostova",
    email: "elena.r@university.edu",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rollNo: "CS2024-088",
    totalSolved: 16,
    totalAttempted: 17
  },
  {
    id: "std-004",
    name: "Devon Chen",
    email: "devon.chen@university.edu",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rollNo: "CS2024-103",
    totalSolved: 9,
    totalAttempted: 15
  },
  {
    id: "std-005",
    name: "Priya Sharma",
    email: "priya.s@university.edu",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    rollNo: "CS2024-055",
    totalSolved: 15,
    totalAttempted: 18
  },
  {
    id: "std-006",
    name: "Liam O'Connor",
    email: "liam.oc@university.edu",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    rollNo: "CS2024-071",
    totalSolved: 11,
    totalAttempted: 14
  }
];

// Seeded student submissions for questions
export const initialSubmissions = [
  // Problem 1: Two Sum
  {
    id: "sub-101",
    questionId: 1,
    studentId: "std-001",
    status: "Accepted",
    language: "JavaScript",
    runtime: "48 ms",
    memory: "42.1 MB",
    passedTests: 5,
    totalTests: 5,
    submittedAt: "Today at 10:24 AM",
    code: `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (input.length < 2) return;
  const n = parseInt(input[0], 10);
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(parseInt(input[1 + i], 10));
  }
  const target = parseInt(input[1 + n], 10);

  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) {
      console.log(\`\${map.get(comp)} \${i}\`);
      return;
    }
    map.set(nums[i], i);
  }
}

solve();`,
    testResults: [
      { case: 1, status: "Passed", input: "4\\n2 7 11 15\\n9", expected: "0 1", actual: "0 1" },
      { case: 2, status: "Passed", input: "3\\n3 2 4\\n6", expected: "1 2", actual: "1 2" },
      { case: 3, status: "Passed", input: "2\\n3 3\\n6", expected: "0 1", actual: "0 1" },
      { case: 4, status: "Passed", input: "5\\n1 5 3 7 9\\n12", expected: "1 3", actual: "1 3" },
      { case: 5, status: "Passed", input: "4\\n-3 4 3 90\\n0", expected: "0 2", actual: "0 2" }
    ]
  },
  {
    id: "sub-102",
    questionId: 1,
    studentId: "std-002",
    status: "Wrong Answer",
    language: "Python",
    runtime: "56 ms",
    memory: "16.4 MB",
    passedTests: 3,
    totalTests: 5,
    submittedAt: "Today at 09:40 AM",
    code: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    nums = [int(tokens[i + 1]) for i in range(n)]
    target = int(tokens[n + 1])
    
    # Buggy brute force: i and j can be equal
    for i in range(n):
        for j in range(n):
            if nums[i] + nums[j] == target and i != j:
                print(f"{i} {j}")
                return

if __name__ == "__main__":
    main()`,
    testResults: [
      { case: 1, status: "Passed", input: "4\\n2 7 11 15\\n9", expected: "0 1", actual: "0 1" },
      { case: 2, status: "Passed", input: "3\\n3 2 4\\n6", expected: "1 2", actual: "1 2" },
      { case: 3, status: "Failed", input: "2\\n3 3\\n6", expected: "0 1", actual: "1 0", error: "Output order does not match ascending indices." },
      { case: 4, status: "Passed", input: "5\\n1 5 3 7 9\\n12", expected: "1 3", actual: "1 3" },
      { case: 5, status: "Failed", input: "4\\n-3 4 3 90\\n0", expected: "0 2", actual: "2 0", error: "Index ordering mismatch" }
    ]
  },
  {
    id: "sub-103",
    questionId: 1,
    studentId: "std-003",
    status: "Accepted",
    language: "C++",
    runtime: "12 ms",
    memory: "10.8 MB",
    passedTests: 5,
    totalTests: 5,
    submittedAt: "Yesterday at 04:15 PM",
    code: `#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    if (!(cin >> n)) return 0;
    
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) {
        cin >> nums[i];
    }
    int target;
    cin >> target;
    
    unordered_map<int, int> seen;
    for (int i = 0; i < n; ++i) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            cout << seen[complement] << " " << i << "\\n";
            return 0;
        }
        seen[nums[i]] = i;
    }
    return 0;
}`,
    testResults: [
      { case: 1, status: "Passed", input: "4\\n2 7 11 15\\n9", expected: "0 1", actual: "0 1" },
      { case: 2, status: "Passed", input: "3\\n3 2 4\\n6", expected: "1 2", actual: "1 2" },
      { case: 3, status: "Passed", input: "2\\n3 3\\n6", expected: "0 1", actual: "0 1" },
      { case: 4, status: "Passed", input: "5\\n1 5 3 7 9\\n12", expected: "1 3", actual: "1 3" },
      { case: 5, status: "Passed", input: "4\\n-3 4 3 90\\n0", expected: "0 2", actual: "0 2" }
    ]
  },
  {
    id: "sub-104",
    questionId: 1,
    studentId: "std-005",
    status: "Accepted",
    language: "Python",
    runtime: "42 ms",
    memory: "16.8 MB",
    passedTests: 5,
    totalTests: 5,
    submittedAt: "Yesterday at 02:40 PM",
    code: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    target = int(raw[n+1])
    
    seen = {}
    for i, val in enumerate(nums):
        comp = target - val
        if comp in seen:
            print(f"{seen[comp]} {i}")
            return
        seen[val] = i

if __name__ == "__main__":
    solve()`,
    testResults: [
      { case: 1, status: "Passed", input: "4\\n2 7 11 15\\n9", expected: "0 1", actual: "0 1" },
      { case: 2, status: "Passed", input: "3\\n3 2 4\\n6", expected: "1 2", actual: "1 2" },
      { case: 3, status: "Passed", input: "2\\n3 3\\n6", expected: "0 1", actual: "0 1" },
      { case: 4, status: "Passed", input: "5\\n1 5 3 7 9\\n12", expected: "1 3", actual: "1 3" },
      { case: 5, status: "Passed", input: "4\\n-3 4 3 90\\n0", expected: "0 2", actual: "0 2" }
    ]
  },
  {
    id: "sub-105",
    questionId: 1,
    studentId: "std-006",
    status: "Wrong Answer",
    language: "JavaScript",
    runtime: "52 ms",
    memory: "41.9 MB",
    passedTests: 2,
    totalTests: 5,
    submittedAt: "2 days ago",
    code: `const fs = require('fs');

const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (data.length > 0) {
  // Sorts array first which loses original indices!
  console.log("0 1");
}`,
    testResults: [
      { case: 1, status: "Passed", input: "4\\n2 7 11 15\\n9", expected: "0 1", actual: "0 1" },
      { case: 2, status: "Failed", input: "3\\n3 2 4\\n6", expected: "1 2", actual: "0 1", error: "Wrong Answer on test case 2" },
      { case: 3, status: "Failed", input: "2\\n3 3\\n6", expected: "0 1", actual: "0 1" },
      { case: 4, status: "Failed", input: "5\\n1 5 3 7 9\\n12", expected: "1 3", actual: "0 1", error: "Wrong Answer" },
      { case: 5, status: "Failed", input: "4\\n-3 4 3 90\\n0", expected: "0 2", actual: "0 1", error: "Wrong Answer" }
    ]
  },

  // Problem 2: Valid Parentheses (ID: 2)
  {
    id: "sub-201",
    questionId: 2,
    studentId: "std-001",
    status: "Accepted",
    language: "JavaScript",
    runtime: "41 ms",
    memory: "40.9 MB",
    passedTests: 4,
    totalTests: 4,
    submittedAt: "Yesterday at 11:30 AM",
    code: `const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').trim();

function isValid(str) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of str) {
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch);
    } else if (map[ch]) {
      if (stack.pop() !== map[ch]) return false;
    }
  }
  return stack.length === 0;
}

console.log(isValid(s) ? 'true' : 'false');`,
    testResults: [
      { case: 1, status: "Passed", input: "()", expected: "true", actual: "true" },
      { case: 2, status: "Passed", input: "()[]{}", expected: "true", actual: "true" },
      { case: 3, status: "Passed", input: "(]", expected: "false", actual: "false" },
      { case: 4, status: "Passed", input: "([)]", expected: "false", actual: "false" }
    ]
  },
  {
    id: "sub-202",
    questionId: 2,
    studentId: "std-004",
    status: "Wrong Answer",
    language: "Python",
    runtime: "49 ms",
    memory: "15.9 MB",
    passedTests: 2,
    totalTests: 4,
    submittedAt: "Yesterday at 01:10 PM",
    code: `import sys

s = sys.stdin.read().strip()
# Incomplete matching
print("true" if len(s) % 2 == 0 else "false")`,
    testResults: [
      { case: 1, status: "Passed", input: "()", expected: "true", actual: "true" },
      { case: 2, status: "Passed", input: "()[]{}", expected: "true", actual: "true" },
      { case: 3, status: "Failed", input: "(]", expected: "false", actual: "true", error: "Length check failed on invalid mismatched bracket" },
      { case: 4, status: "Failed", input: "([)]", expected: "false", actual: "true", error: "Interleaved brackets not checked" }
    ]
  },

  // Problem 3: Longest Substring (ID: 3)
  {
    id: "sub-301",
    questionId: 3,
    studentId: "std-003",
    status: "Accepted",
    language: "JavaScript",
    runtime: "62 ms",
    memory: "44.1 MB",
    passedTests: 4,
    totalTests: 4,
    submittedAt: "2 days ago",
    code: `const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').trim();

let left = 0;
let maxLen = 0;
const seen = new Map();

for (let right = 0; right < s.length; right++) {
  if (seen.has(s[right]) && seen.get(s[right]) >= left) {
    left = seen.get(s[right]) + 1;
  }
  seen.set(s[right], right);
  maxLen = Math.max(maxLen, right - left + 1);
}

console.log(maxLen);`,
    testResults: [
      { case: 1, status: "Passed", input: "abcabcbb", expected: "3", actual: "3" },
      { case: 2, status: "Passed", input: "bbbbb", expected: "1", actual: "1" },
      { case: 3, status: "Passed", input: "pwwkew", expected: "3", actual: "3" },
      { case: 4, status: "Passed", input: "", expected: "0", actual: "0" }
    ]
  }
];

// Normalization helper for questions
function normalizeQuestion(q, fallbackIndex = 0) {
  if (!q) return null;
  const num =
    q.number !== undefined && q.number !== null && !isNaN(Number(q.number))
      ? Number(q.number)
      : typeof q.id === "number"
      ? q.id
      : parseInt(String(q.id || "").replace(/\D/g, ""), 10) || (fallbackIndex + 1);

  const id = q.id !== undefined && q.id !== null ? q.id : num;

  let diff = q.difficulty || "Easy";
  if (typeof diff === "string") {
    const lower = diff.toLowerCase();
    if (lower === "easy") diff = "Easy";
    else if (lower === "medium") diff = "Medium";
    else if (lower === "hard") diff = "Hard";
  }

  return {
    ...q,
    id,
    number: num,
    difficulty: diff,
    topics: Array.isArray(q.topics)
      ? q.topics
      : Array.isArray(q.tags)
      ? q.tags
      : ["Algorithms"]
  };
}

export function TeacherProvider({ children }) {
  const [questions, setQuestions] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const savedQuestions = localStorage.getItem("similox_teacher_questions");
        if (savedQuestions) {
          const parsed = JSON.parse(savedQuestions);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((item, idx) => normalizeQuestion(item, idx));
          }
        }
      } catch (e) {
        console.warn("Failed to read questions from localStorage", e);
      }
    }
    return baseProblems.map((item, idx) => normalizeQuestion(item, idx));
  });

  const [students] = useState(initialStudents);

  const [submissions, setSubmissions] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const savedSubmissions = localStorage.getItem("similox_teacher_submissions");
        if (savedSubmissions) {
          const parsed = JSON.parse(savedSubmissions);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn("Failed to read submissions from localStorage", e);
      }
    }
    return initialSubmissions;
  });

  // Save changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("similox_teacher_questions", JSON.stringify(questions));
        localStorage.setItem("similox_teacher_submissions", JSON.stringify(submissions));
      } catch (e) {
        console.warn("Failed to persist teacher data", e);
      }
    }
  }, [questions, submissions]);

  // Add new question
  const addQuestion = (newQuestionData) => {
    let maxNumber = 0;
    let maxId = 0;

    questions.forEach((q, idx) => {
      const n = Number(q.number) || (idx + 1);
      if (n > maxNumber) maxNumber = n;
      const i = typeof q.id === "number" ? q.id : parseInt(String(q.id).replace(/\D/g, ""), 10) || (idx + 1);
      if (i > maxId) maxId = i;
    });

    const nextNumber = maxNumber + 1;
    const nextId = Math.max(maxId, maxNumber) + 1;

    const createdQuestion = normalizeQuestion({
      id: nextId,
      number: nextNumber,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      acceptance: "0.0%",
      ...newQuestionData,
      number: nextNumber,
      id: nextId
    }, questions.length);

    setQuestions((prev) => [createdQuestion, ...prev]);
    return createdQuestion;
  };

  // Update question
  const updateQuestion = (questionId, updatedData) => {
    const strId = String(questionId).trim();
    const numId = Number(questionId);

    setQuestions((prev) =>
      prev.map((q) => {
        const matches =
          String(q.id) === strId ||
          (!isNaN(numId) && Number(q.id) === numId) ||
          (q.number !== undefined && String(q.number) === strId);

        if (!matches) return q;

        return normalizeQuestion({
          ...q,
          ...updatedData,
          id: q.id,
          number: q.number ?? updatedData.number
        });
      })
    );
  };

  // Delete question
  const deleteQuestion = (questionId) => {
    const strId = String(questionId).trim();
    const numId = Number(questionId);

    setQuestions((prev) =>
      prev.filter((q) => {
        if (String(q.id) === strId) return false;
        if (!isNaN(numId) && Number(q.id) === numId) return false;
        if (q.number !== undefined && String(q.number) === strId) return false;
        return true;
      })
    );

    setSubmissions((prev) =>
      prev.filter((s) => {
        if (String(s.questionId) === strId) return false;
        if (!isNaN(numId) && Number(s.questionId) === numId) return false;
        return true;
      })
    );
  };

  // Get question with enriched submission metrics
  const getQuestionById = (questionId) => {
    if (questionId === undefined || questionId === null) return null;
    const strId = String(questionId).trim();
    const numId = Number(questionId);

    const raw = questions.find((item) => {
      if (String(item.id) === strId) return true;
      if (item.number !== undefined && String(item.number) === strId) return true;
      if (!isNaN(numId) && (Number(item.id) === numId || Number(item.number) === numId)) return true;
      if (item.slug && item.slug === strId) return true;
      return false;
    });

    if (!raw) return null;
    const q = normalizeQuestion(raw);

    const qIdStr = String(q.id);
    const qNum = Number(q.number || q.id);

    const qSubs = submissions.filter((s) => {
      if (String(s.questionId) === qIdStr) return true;
      if (!isNaN(qNum) && Number(s.questionId) === qNum) return true;
      if (q.slug && s.questionSlug === q.slug) return true;
      return false;
    });

    const solvedSet = new Set();
    const attemptedSet = new Set();

    qSubs.forEach((sub) => {
      if (sub.status === "Accepted") {
        solvedSet.add(sub.studentId);
      } else {
        attemptedSet.add(sub.studentId);
      }
    });

    const onlyAttemptedCount = [...attemptedSet].filter((id) => !solvedSet.has(id)).length;

    return {
      ...q,
      totalSubmissions: qSubs.length,
      solvedCount: solvedSet.size,
      attemptedCount: onlyAttemptedCount,
      passRate:
        qSubs.length > 0
          ? `${Math.round((solvedSet.size / (solvedSet.size + onlyAttemptedCount || 1)) * 100)}%`
          : q.acceptance || "0%"
    };
  };

  // Get submissions for a specific question
  const getSubmissionsForQuestion = (questionId) => {
    if (questionId === undefined || questionId === null) return [];
    const targetQuestion = getQuestionById(questionId);
    const strId = String(questionId).trim();
    const numId = Number(questionId);

    const targetIdStr = targetQuestion ? String(targetQuestion.id) : strId;
    const targetNum = targetQuestion ? Number(targetQuestion.number) : numId;

    return submissions
      .filter((s) => {
        if (String(s.questionId) === strId) return true;
        if (String(s.questionId) === targetIdStr) return true;
        if (!isNaN(numId) && Number(s.questionId) === numId) return true;
        if (!isNaN(targetNum) && Number(s.questionId) === targetNum) return true;
        return false;
      })
      .map((sub) => {
        const student = students.find((std) => std.id === sub.studentId) || {
          id: sub.studentId,
          name: "Unknown Student",
          email: "student@university.edu",
          avatar: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/leetcode.webp",
          rollNo: "CS2024-000"
        };
        return {
          ...sub,
          student
        };
      });
  };

  // Get individual submission by ID
  const getSubmissionById = (submissionId) => {
    const sub = submissions.find((s) => s.id === submissionId);
    if (!sub) return null;

    const student = students.find((std) => std.id === sub.studentId);
    const question = getQuestionById(sub.questionId) || questions.find((q) => q.id === sub.questionId);

    return {
      ...sub,
      student,
      question
    };
  };

  return (
    <TeacherContext.Provider
      value={{
        questions,
        students,
        submissions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        getQuestionById,
        getSubmissionsForQuestion,
        getSubmissionById
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeacher() {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useTeacher must be used within a TeacherProvider");
  }
  return context;
}
