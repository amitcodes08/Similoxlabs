import React from "react";
import Head from "next/head";
import ErrorPage from "@/components/ErrorPage";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 - Server Error | Similox</title>
        <meta
          name="description"
          content="An unexpected server error occurred."
        />
      </Head>
      <ErrorPage
        statusCode={500}
        title="Internal server error"
        subtitle="Something went wrong on our end. Please try again later."
      />
    </>
  );
}
