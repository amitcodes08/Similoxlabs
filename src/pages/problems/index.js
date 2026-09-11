import React from "react";
import Head from "next/head";
import ProblemList from "@/components/problems/ProblemList";

export default function ProblemsPage() {
  return (
    <>
      <Head>
        <title>Problems - LeetCode | Similox</title>
        <meta
          name="description"
          content="Explore coding interview problems, filter by difficulty, category, and solve challenges directly in our interactive code editor."
        />
      </Head>
      <ProblemList />
    </>
  );
}
