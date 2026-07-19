"use client";

import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  title?: string;
}

function highlightPython(code: string): string {
  let result = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comments
  result = result.replace(/(#.*$)/gm, '<span class="token-comment">$1</span>');
  // Strings (triple quotes first)
  result = result.replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, '<span class="token-string">$1</span>');
  // Strings (single and double quoted)
  result = result.replace(/(f?"[^"\\]*(?:\\.[^"\\]*)*"|f?'[^'\\]*(?:\\.[^'\\]*)*')/g, '<span class="token-string">$1</span>');
  // Keywords
  const keywords = ["False", "None", "True", "and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"];
  keywords.forEach((kw) => {
    result = result.replace(new RegExp(`\\b(${kw})\\b`, "g"), '<span class="token-keyword">$1</span>');
  });
  // Builtins
  const builtins = ["print", "input", "int", "float", "str", "list", "dict", "tuple", "set", "len", "range", "type", "map", "filter", "zip", "enumerate", "sorted", "sum", "min", "max", "abs", "round", "open", "isinstance", "hasattr", "getattr", "setattr", "super", "property", "staticmethod", "classmethod"];
  builtins.forEach((b) => {
    result = result.replace(new RegExp(`\\b(${b})\\b`, "g"), '<span class="token-builtin">$1</span>');
  });
  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="token-number">$1</span>');
  // self
  result = result.replace(/\b(self)\b/g, '<span class="token-keyword">$1</span>');

  return result;
}

export function CodeBlock({ code, title }: CodeBlockProps) {
  const trimmedCode = code.replace(/\n+$/, "");
  const highlighted = highlightPython(trimmedCode);
  const lines = highlighted.split("\n");

  return (
    <div className="code-block">
      <div className="code-block-header">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {title && (
            <span className="text-xs text-muted-foreground ml-2">{title}</span>
          )}
        </div>
        <CopyButton code={trimmedCode} />
      </div>
      <div className="code-block-content">
        <pre>
          {lines.map((line, i) => (
            <span
              key={i}
              className="code-line"
              dangerouslySetInnerHTML={{ __html: line || " " }}
            />
          ))}
        </pre>
      </div>
    </div>
  );
}
