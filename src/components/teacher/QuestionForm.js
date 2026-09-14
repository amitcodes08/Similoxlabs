import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Layers,
  Save,
  SlidersHorizontal
} from "lucide-react";
import { useTeacher } from "@/context/TeacherContext";
import { Button } from "@heroui/react";

export default function QuestionForm({ mode = "create", initialData = null }) {
  const router = useRouter();
  const { addQuestion, updateQuestion } = useTeacher();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || "Easy");
  const [category, setCategory] = useState(initialData?.category || "Algorithms");
  const [isExempted, setIsExempted] = useState(Boolean(initialData?.isExempted));
  const [topicInput, setTopicInput] = useState("");
  const [topics, setTopics] = useState(
    initialData?.topics || ["Array", "Hash Table"]
  );

  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [inputFormat, setInputFormat] = useState(
    initialData?.inputFormat || ""
  );
  const [outputFormat, setOutputFormat] = useState(
    initialData?.outputFormat || ""
  );
  const [constraints, setConstraints] = useState(
    initialData?.constraints || [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ]
  );
  const [constraintInput, setConstraintInput] = useState("");

  // Sample Cases
  const [examples, setExamples] = useState(
    initialData?.examples || [
      {
        id: 1,
        stdin: "4\n2 7 11 15\n9",
        stdout: "0 1",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        id: 2,
        stdin: "3\n3 2 4\n6",
        stdout: "1 2",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ]
  );

  // Hidden Test Cases
  const [testcases, setTestcases] = useState(
    initialData?.testcases || [
      { id: 1, stdin: "4\n2 7 11 15\n9", expectedStdout: "0 1" },
      { id: 2, stdin: "3\n3 2 4\n6", expectedStdout: "1 2" },
      { id: 3, stdin: "2\n3 3\n6", expectedStdout: "0 1" }
    ]
  );

  // Starter Code
  const [activeCodeLang, setActiveCodeLang] = useState("javascript");
  const [starterCode, setStarterCode] = useState(
    initialData?.starterCode || {
      javascript: `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (input.length === 0 || input[0] === '') return;
  // Write solution below
}

solve();`,
      python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    # Write solution below

if __name__ == "__main__":
    solve()`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Write solution below
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Write solution below
    }
}`
    }
  );

  // Topic Add/Remove
  const handleAddTopic = () => {
    if (topicInput.trim() && !topics.includes(topicInput.trim())) {
      setTopics([...topics, topicInput.trim()]);
      setTopicInput("");
    }
  };

  const handleRemoveTopic = (t) => {
    setTopics(topics.filter((item) => item !== t));
  };

  // Constraint Add/Remove
  const handleAddConstraint = () => {
    if (constraintInput.trim()) {
      setConstraints([...constraints, constraintInput.trim()]);
      setConstraintInput("");
    }
  };

  const handleRemoveConstraint = (idx) => {
    setConstraints(constraints.filter((_, i) => i !== idx));
  };

  // Sample Case Add/Remove
  const handleAddExample = () => {
    setExamples([
      ...examples,
      {
        id: Date.now(),
        stdin: "",
        stdout: "",
        explanation: ""
      }
    ]);
  };

  const handleUpdateExample = (index, field, value) => {
    const updated = [...examples];
    updated[index] = { ...updated[index], [field]: value };
    setExamples(updated);
  };

  const handleRemoveExample = (index) => {
    setExamples(examples.filter((_, i) => i !== index));
  };

  // Test Case Add/Remove
  const handleAddTestCase = () => {
    setTestcases([
      ...testcases,
      {
        id: Date.now(),
        stdin: "",
        expectedStdout: ""
      }
    ]);
  };

  const handleUpdateTestCase = (index, field, value) => {
    const updated = [...testcases];
    updated[index] = { ...updated[index], [field]: value };
    setTestcases(updated);
  };

  const handleRemoveTestCase = (index) => {
    setTestcases(testcases.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a question title.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const questionPayload = {
      title: title.trim(),
      slug: initialData?.slug || slug,
      difficulty,
      category,
      isExempted,
      topics,
      description: description.trim(),
      inputFormat: inputFormat.trim(),
      outputFormat: outputFormat.trim(),
      constraints,
      examples,
      testcases,
      starterCode
    };

    try {
      if (mode === "edit" && initialData?.id) {
        await updateQuestion(initialData.id, questionPayload);
      } else {
        await addQuestion(questionPayload);
      }
      router.push("/teacher");
    } catch (err) {
      console.error("Error saving question:", err);
      setSubmitError(err.message || "Failed to save question to database");
      alert(err.message || "Failed to save question to database");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto pb-12">
      {submitError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-medium text-rose-700">
          {submitError}
        </div>
      )}
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <button
            type="button"
            onClick={() => router.push("/teacher")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {mode === "edit" ? "Edit Question" : "Create New Question"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Author comprehensive coding challenges with sample inputs, standard I/O, and evaluation test cases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            color="primary"
            variant="flat"
            radius="full"
            size="sm"
            onPress={() => router.push("/teacher")}
            className="font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            radius="full"
            size="sm"
            isLoading={isSubmitting}
            startContent={!isSubmitting && <Save className="w-3.5 h-3.5" />}
            className="font-semibold shadow-xs"
          >
            {isSubmitting
              ? "Saving to Database..."
              : mode === "edit"
              ? "Save Changes"
              : "Create Question"}
          </Button>
        </div>
      </div>

      {/* SECTION 1: Basic Information Card */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            1. Basic Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Question Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Merge Two Sorted Lists"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-gray-400 outline-none transition-colors"
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Easy", "Medium", "Hard"].map((diff) => (
                <button
                  type="button"
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    difficulty === diff
                      ? diff === "Easy"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs"
                        : diff === "Medium"
                        ? "bg-amber-50 border-amber-300 text-amber-800 shadow-xs"
                        : "bg-rose-50 border-rose-300 text-rose-800 shadow-xs"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-gray-400 outline-none transition-colors cursor-pointer"
            >
              <option value="Algorithms">Algorithms</option>
              <option value="Data Structures">Data Structures</option>
              <option value="Database">Database</option>
              <option value="Shell">Shell</option>
            </select>
          </div>

          {/* Exempted Toggle */}
          <div className="md:col-span-2 pt-2">
            <label className="flex items-center gap-3 p-3.5 rounded-lg border border-gray-200 bg-gray-50/70 hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={isExempted}
                onChange={(e) => setIsExempted(e.target.checked)}
                className="w-4 h-4 rounded text-gray-900 focus:ring-gray-400 cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-gray-900 block">
                  Exempted Question (Bonus Marks)
                </span>
                <span className="text-xs text-gray-500 block mt-0.5">
                  When enabled, an &quot;Exempted&quot; chip appears next to the title, and students receive bonus marks for honest solutions.
                </span>
              </div>
            </label>
          </div>

          {/* Topics Tag Input */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Topics &amp; Tags
            </label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[44px]">
              {topics.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded bg-white border border-gray-200 text-gray-700 shadow-2xs"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTopic(t)}
                    className="hover:text-rose-600 text-gray-400 cursor-pointer font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
              <div className="flex items-center gap-2 flex-1 min-w-[140px]">
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTopic();
                    }
                  }}
                  placeholder="Type topic and press Enter..."
                  className="w-full text-xs bg-transparent text-gray-900 outline-none px-1"
                />
                <Button
                  color="primary"
                  radius="full"
                  size="sm"
                  onPress={handleAddTopic}
                  className="text-xs font-semibold shrink-0"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Problem Statement & Formats */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <FileText className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            2. Problem Statement &amp; Specifications
          </h2>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Description / Problem Details
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-gray-400 outline-none leading-relaxed transition-colors font-mono"
          />
        </div>

        {/* Input & Output Formats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Input Format Specification
            </label>
            <textarea
              rows={3}
              value={inputFormat}
              onChange={(e) => setInputFormat(e.target.value)}
              placeholder="First line contains integer n. Second line contains n space-separated integers..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-gray-400 outline-none transition-colors leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Output Format Specification
            </label>
            <textarea
              rows={3}
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              placeholder="Print the two indices separated by a space on a single line..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-gray-400 outline-none transition-colors leading-relaxed"
            />
          </div>
        </div>

        {/* Constraints List */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Constraints
          </label>
          <div className="space-y-2">
            {constraints.map((c, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 p-2 px-3 rounded-lg bg-gray-50 border border-gray-200 text-xs font-mono text-gray-800"
              >
                <span>• {c}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveConstraint(idx)}
                  className="text-gray-400 hover:text-rose-600 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={constraintInput}
                onChange={(e) => setConstraintInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddConstraint();
                  }
                }}
                placeholder="e.g. 1 <= nums.length <= 10^5"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-xs focus:bg-white focus:border-gray-400 outline-none transition-colors font-mono"
              />
              <Button
                color="primary"
                radius="full"
                size="sm"
                onPress={handleAddConstraint}
                className="text-xs font-semibold shrink-0"
              >
                Add Constraint
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Sample Cases */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              3. Sample Cases (Visible to Students)
            </h2>
          </div>
          <Button
            color="primary"
            radius="full"
            size="sm"
            onPress={handleAddExample}
            startContent={<Plus className="w-3.5 h-3.5" />}
            className="font-semibold shadow-2xs"
          >
            Add Sample Case
          </Button>
        </div>

        <div className="space-y-4">
          {examples.map((ex, idx) => (
            <div
              key={ex.id || idx}
              className="border border-gray-200 rounded-xl p-4.5 bg-gray-50/60 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-gray-200/80">
                <span className="text-xs font-bold text-gray-900">
                  Sample Case {idx + 1}
                </span>
                {examples.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveExample(idx)}
                    className="text-gray-400 hover:text-rose-600 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-600 uppercase">
                    Sample Input (stdin)
                  </label>
                  <textarea
                    rows={3}
                    value={ex.stdin}
                    onChange={(e) =>
                      handleUpdateExample(idx, "stdin", e.target.value)
                    }
                    placeholder="4\n2 7 11 15\n9"
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg font-mono text-xs text-gray-900 outline-none focus:border-gray-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-600 uppercase">
                    Sample Output (stdout)
                  </label>
                  <textarea
                    rows={3}
                    value={ex.stdout}
                    onChange={(e) =>
                      handleUpdateExample(idx, "stdout", e.target.value)
                    }
                    placeholder="0 1"
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg font-mono text-xs text-gray-900 outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-600 uppercase">
                  Explanation (Optional)
                </label>
                <input
                  type="text"
                  value={ex.explanation || ""}
                  onChange={(e) =>
                    handleUpdateExample(idx, "explanation", e.target.value)
                  }
                  placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 outline-none focus:border-gray-400"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Hidden Evaluation Test Cases */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              4. Evaluation Test Cases (Grading)
            </h2>
          </div>
          <Button
            color="primary"
            radius="full"
            size="sm"
            onPress={handleAddTestCase}
            startContent={<Plus className="w-3.5 h-3.5" />}
            className="font-semibold shadow-2xs"
          >
            Add Evaluation Case
          </Button>
        </div>

        <div className="space-y-3">
          {testcases.map((tc, idx) => (
            <div
              key={tc.id || idx}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-xl"
            >
              <div className="w-16 shrink-0 text-xs font-bold text-gray-700">
                Case #{idx + 1}
              </div>

              <div className="flex-1 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-gray-500">
                  Input (stdin)
                </span>
                <input
                  type="text"
                  value={tc.stdin}
                  onChange={(e) =>
                    handleUpdateTestCase(idx, "stdin", e.target.value)
                  }
                  placeholder="e.g. 4\n2 7 11 15\n9"
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-mono text-gray-900 outline-none focus:border-gray-400"
                />
              </div>

              <div className="flex-1 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-gray-500">
                  Expected Output
                </span>
                <input
                  type="text"
                  value={tc.expectedStdout}
                  onChange={(e) =>
                    handleUpdateTestCase(idx, "expectedStdout", e.target.value)
                  }
                  placeholder="e.g. 0 1"
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-mono text-gray-900 outline-none focus:border-gray-400"
                />
              </div>

              {testcases.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTestCase(idx)}
                  className="p-2 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-white self-center sm:self-end transition-colors cursor-pointer"
                  title="Remove Test Case"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: Starter Code Templates */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <Code2 className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            5. Starter Code Templates
          </h2>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
          {["javascript", "python", "cpp", "java"].map((lang) => (
            <button
              type="button"
              key={lang}
              onClick={() => setActiveCodeLang(lang)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                activeCodeLang === lang
                  ? "bg-gray-900 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              {lang === "cpp" ? "C++" : lang}
            </button>
          ))}
        </div>

        <div className="space-y-1.5">
          <textarea
            rows={10}
            value={starterCode[activeCodeLang] || ""}
            onChange={(e) =>
              setStarterCode({
                ...starterCode,
                [activeCodeLang]: e.target.value
              })
            }
            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-mono text-xs focus:bg-white focus:border-gray-400 outline-none leading-relaxed transition-colors"
          />
        </div>
      </section>

      {/* Action footer */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          color="primary"
          variant="flat"
          radius="full"
          onPress={() => router.push("/teacher")}
          className="font-semibold"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          radius="full"
          isLoading={isSubmitting}
          startContent={!isSubmitting && <Save className="w-4 h-4" />}
          className="font-semibold shadow-xs"
        >
          {isSubmitting
            ? "Saving to Database..."
            : mode === "edit"
            ? "Save Changes"
            : "Create Question"}
        </Button>
      </div>
    </form>
  );
}
