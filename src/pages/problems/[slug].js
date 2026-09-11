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
  const paths = problems.map((p) => ({
    params: { slug: p.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const problem = problems.find((p) => p.slug === params.slug) || null;
  return {
    props: {
      problemSlug: params.slug,
      initialProblem: problem ? JSON.parse(JSON.stringify(problem)) : null,
    },
  };
}
