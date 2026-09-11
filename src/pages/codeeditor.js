import React from 'react';
import Head from 'next/head';
import CodeEditorWorkspace from '@/components/codeeditor/CodeEditorWorkspace';

export default function CodeEditorPage() {
  return (
    <>
      <Head>
        <title>LeetCode Style Code Editor | Similox</title>
        <meta
          name="description"
          content="Interactive LeetCode-style code editor with Monaco editor, real-time question analysis, multi-language support, and testcase execution in a clean white/grey theme."
        />
      </Head>
      <CodeEditorWorkspace />
    </>
  );
}