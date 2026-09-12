import React from 'react';
import Head from 'next/head';
import CodeEditorWorkspace from '@/components/codeeditor/CodeEditorWorkspace';
import { problems as fallbackProblems } from '@/data/problemsData';

export default function CodeEditorPage({ initialProblem }) {
  return (
    <>
      <Head>
        <title>
          {initialProblem
            ? `${initialProblem.number}. ${initialProblem.title} - Code Editor | Similox`
            : "Code Editor - LeetCode | Similox"}
        </title>
        <meta
          name="description"
          content="Interactive LeetCode-style code editor with Monaco editor, real-time question analysis, multi-language support, and testcase execution in a clean white/grey theme."
        />
      </Head>
      <CodeEditorWorkspace
        initialSlug={initialProblem?.slug || "two-sum"}
        initialProblem={initialProblem}
      />
    </>
  );
}

export async function getStaticProps() {
  let firstProblem = null;

  if (process.env.DATABASE_URL) {
    try {
      const { getDb, questions, testCases } = await import('@/db');
      const { eq } = await import('drizzle-orm');
      const db = getDb();
      const qRows = await db.select().from(questions).orderBy(questions.number).limit(1);

      if (qRows.length > 0) {
        const q = qRows[0];
        let diff = "Easy";
        if (q.difficulty) {
          const upper = String(q.difficulty).toUpperCase();
          if (upper === "HARD") diff = "Hard";
          else if (upper === "MEDIUM") diff = "Medium";
          else diff = "Easy";
        }

        const tcRows = await db
          .select()
          .from(testCases)
          .where(eq(testCases.questionId, q.id))
          .orderBy(testCases.orderIndex);

        firstProblem = {
          ...q,
          difficulty: diff,
          testcases: tcRows.map((tc, idx) => ({
            id: tc.id || idx + 1,
            name: tc.name || `Case ${idx + 1}`,
            stdin: tc.stdin || "",
            expectedStdout: tc.expectedStdout || "",
            isHidden: Boolean(tc.isHidden),
            explanation: tc.explanation || null
          }))
        };
      }
    } catch (err) {
      console.error('Error in codeeditor.js getStaticProps:', err);
    }
  }

  if (!firstProblem) {
    firstProblem = fallbackProblems[0] || null;
  }

  return {
    props: {
      initialProblem: firstProblem ? JSON.parse(JSON.stringify(firstProblem)) : null,
    },
    revalidate: 30
  };
}