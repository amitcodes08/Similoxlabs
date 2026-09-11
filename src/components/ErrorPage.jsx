import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, Home, Code2 } from "lucide-react";

export default function ErrorPage({
  statusCode = 404,
  title,
  subtitle,
}) {
  const router = useRouter();

  const isNotFound = statusCode === 404;
  const displayTitle = title || (isNotFound ? "Page not found" : "Something went wrong");
  const displaySubtitle =
    subtitle ||
    (isNotFound
      ? "Sorry, we couldn't find the page you're looking for. It might have been moved or removed."
      : "An unexpected error occurred. Please try again later or return home.");

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 flex flex-col justify-between font-sans selection:bg-slate-200">
      <Head>
        <title>{`${statusCode} - ${displayTitle} | Similox`}</title>
        <meta name="description" content={displaySubtitle} />
      </Head>

      <header className="w-full max-w-[1340px] mx-auto px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-900 font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 rounded-lg bg-[#FFA116] flex items-center justify-center text-white font-black text-xs shadow-xs">
            LC
          </div>
          <span className="text-base font-bold">Similox</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md text-center">
          <p className="text-sm font-bold text-[#FFA116] uppercase tracking-wider mb-2">
            {statusCode} error
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {displayTitle}
          </h1>

          <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
            {displaySubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors shadow-xs"
            >
              <Home className="w-4 h-4" />
              <span>Go to Home</span>
            </Link>

            <Link
              href="/problems"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 transition-colors shadow-2xs"
            >
              <Code2 className="w-4 h-4 text-slate-500" />
              <span>Problems</span>
            </Link>

            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium text-sm transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-400">
        Similox Labs
      </footer>
    </div>
  );
}
