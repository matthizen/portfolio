import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ title, language, code }: { title: string; language: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <figure className="overflow-hidden rounded-lg border bg-code">
      <figcaption className="flex items-center justify-between gap-2 border-b px-3 py-2 font-mono text-xs text-muted-foreground">
        <span className="truncate">{title} <span className="text-primary">· {language}</span></span>
        <button onClick={copy} aria-label="Copy code" className="flex items-center gap-1 rounded px-2 py-1 hover:text-primary">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed"><code>{code}</code></pre>
    </figure>
  );
}
