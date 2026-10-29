import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({
  title,
  language,
  code,
}: {
  title: string;
  language: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable (insecure context): the text stays selectable */
    }
  };
  return (
    <figure className="min-w-0 bg-code text-code-ink">
      <figcaption className="flex items-center justify-between gap-3 px-4 pt-4 font-sans text-small">
        <span className="min-w-0">
          {title} <span className="opacity-60">({language})</span>
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : `Copy ${title}`}
          className="flex shrink-0 items-center gap-1.5 bg-white/10 px-3 py-1.5 font-bold transition-colors hover:bg-white/20 active:scale-95"
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[0.875rem] leading-relaxed">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
