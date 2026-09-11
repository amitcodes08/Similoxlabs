import React from "react";
import Head from "next/head";
import ErrorPage from "@/components/ErrorPage";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Similox</title>
        <meta
          name="description"
          content="Sorry, we couldn't find the page you're looking for."
        />
      </Head>
      <ErrorPage
        statusCode={404}
        title="Page not found"
        subtitle="Sorry, we couldn't find the page you're looking for. It might have been moved or removed."
      />
    </>
  );
}
