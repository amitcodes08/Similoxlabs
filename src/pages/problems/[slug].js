import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import CodeEditorWorkspace from "@/components/codeeditor/CodeEditorWorkspace";
import { problems } from "@/data/problemsData";

export default function ProblemDetailPage({ initialProblem, problemSlug }) {
  const router = useRouter();
  const slug = problemSlug || router.query.slug;

  const problem =
    initialProblem ||
    problems.find(
      (p) =>
        p.slug === slug ||
        p.id.toString() === slug ||
        p.number.toString() === slug
    ) ||
    problems[0];

  return (
    <>
      <Head>
        <title>
          {problem
            ? `${problem.number}. ${problem.title} - LeetCode | Similox`
            : "Problem - LeetCode"}
        </title>
        <meta
          name="description"
          content={
            problem
              ? `Solve ${problem.title} (${problem.difficulty}) with interactive compiler, test cases, and editorial analysis.`
              : "Solve coding problems on Similox."
          }
        />
      </Head>
      <CodeEditorWorkspace
        key={problem.slug}
        initialSlug={problem.slug}
        initialProblem={problem}
      />
    </>
  );
}

export async function getStaticPaths() {
  let paths = [];
  if (process.env.DATABASE_URL) {
    try {
      const { getDb, questions } = await import("@/db");
      const db = getDb();
      const allQ = await db.select({ slug: questions.slug }).from(questions);
      paths = allQ.map((q) => ({ params: { slug: q.slug } }));
    } catch (err) {
      console.error("Error generating static paths from DB:", err);
    }
  }

  if (paths.length === 0) {
    paths = problems.map((p) => ({
      params: { slug: p.slug },
    }));
  }

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  let problem = null;

  if (process.env.DATABASE_URL) {
    try {
      const { getDb, questions, testCases } = await import("@/db");
      const { eq } = await import("drizzle-orm");
      const db = getDb();

      // Fetch real question by slug from database
      const rows = await db
        .select()
        .from(questions)
        .where(eq(questions.slug, params.slug))
        .limit(1);

      if (rows.length > 0) {
        const q = rows[0];
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

        problem = {
          ...q,
          difficulty: diff,
          testcases: tcRows.map((tc, idx) => ({
            id: tc.id || idx + 1,
            name: tc.name || `Case ${idx + 1}`,
            stdin: tc.stdin || "",
            expectedStdout: tc.expectedStdout || "",
            isHidden: Boolean(tc.isHidden),
            explanation: tc.explanation || null,
          })),
        };
      }
    } catch (err) {
      console.error("Error loading problem from DB:", err);
    }
  }

  // Fallback to static data if database is offline
  if (!problem) {
    problem = problems.find((p) => p.slug === params.slug) || null;
  }

  if (!problem) {
    return { notFound: true };
  }

  return {
    props: {
      problemSlug: params.slug,
      initialProblem: JSON.parse(JSON.stringify(problem)),
    },
    revalidate: 30,
  };
}

