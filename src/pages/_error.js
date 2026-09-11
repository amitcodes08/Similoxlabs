import React from "react";
import Head from "next/head";
import ErrorPage from "@/components/ErrorPage";

export default function CustomError({ statusCode }) {
  const code = statusCode || 404;

  return (
    <>
      <Head>
        <title>{`${code} - Error | Similox`}</title>
        <meta
          name="description"
          content={`An error (${code}) occurred.`}
        />
      </Head>
      <ErrorPage
        statusCode={code}
        title={code === 404 ? "Page not found" : "Something went wrong"}
        subtitle={
          code === 404
            ? "Sorry, we couldn't find the page you're looking for."
            : "An unexpected error occurred. Please try again later."
        }
      />
    </>
  );
}

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
