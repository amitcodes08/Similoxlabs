import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export default function DemoEditor({
  language = 'cpp',
  value = '// Write your code here',
  onChange,
  theme = 'vs', // White/grey light theme
  fontSize = 14,
  onMount,
  readOnly = false,
}) {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Optional: Define an ultra-sleek white/grey LeetCode theme
    monaco.editor.defineTheme('codeeditor-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '94a3b8', fontStyle: 'italic' },
        { token: 'keyword', foreground: '0284c7', fontStyle: 'bold' },
        { token: 'string', foreground: '16a34a' },
        { token: 'number', foreground: 'd97706' },
        { token: 'type', foreground: '7c3aed' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#0f172a',
        'editorLineNumber.foreground': '#94a3b8',
        'editorLineNumber.activeForeground': '#334155',
        'editor.lineHighlightBackground': '#f8fafc',
        'editorCursor.foreground': '#0f172a',
        'editor.selectionBackground': '#e2e8f0',
        'editor.inactiveSelectionBackground': '#f1f5f9',
        'editorBracketMatch.background': '#e2e8f0',
        'editorBracketMatch.border': '#cbd5e1',
      }
    });

    monaco.editor.setTheme('codeeditor-light');

    if (onMount) {
      onMount(editor, monaco);
    }
  };

  const options = {
    fontSize: fontSize,
    fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace",
    lineHeight: Math.round(fontSize * 1.55),
    minimap: { enabled: false }, // LeetCode clean layout without minimap
    scrollBeyondLastLine: false,
    automaticLayout: true, // Recalculates canvas size on split resize
    tabSize: 2,
    insertSpaces: true,
    padding: { top: 12, bottom: 12 },
    folding: true,
    lineNumbersMinChars: 3,
    glyphMargin: false,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    bracketPairColorization: { enabled: true },
    formatOnType: true,
    formatOnPaste: true,
    suggestOnTriggerCharacters: true,
    readOnly: readOnly,
    overviewRulerBorder: false,
    renderLineHighlight: 'all',
  };

  return (
    <div className="w-full h-full bg-white overflow-hidden">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage={language}
        language={language}
        theme="vs"
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={options}
      />
    </div>
  );
}