import React, { useState } from "react";
import { Copy, Check, Code2, Terminal } from "lucide-react";

export default function CodeViewer({
  code = "",
  language = "JavaScript",
  runtime = "",
  memory = ""
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = (code || "").split("\n");

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <Code2 className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            {language} Solution
          </span>

          {(runtime || memory) && (
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-gray-500 font-mono pl-2 border-l border-gray-200">
              {runtime && <span>Runtime: {runtime}</span>}
              {runtime && memory && <span>•</span>}
              {memory && <span>Memory: {memory}</span>}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer shadow-2xs"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="p-4 bg-white overflow-x-auto text-xs font-mono leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                <td className="w-10 pr-4 text-right select-none text-gray-400 font-mono text-[11px] align-top">
                  {idx + 1}
                </td>
                <td className="text-gray-900 whitespace-pre font-mono">
                  {line || " "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
