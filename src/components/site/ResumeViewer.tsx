import { useEffect, useRef, useState } from "react";

type State = "loading" | "ready" | "failed";

/**
 * Draws every page of the resume PDF straight onto the page with pdf.js, so it reads the
 * same on a phone as on a desktop: no plugin, no new tab, no download needed to see it.
 */
export function ResumeViewer({ src, title }: { src: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    let cancelled = false;
    let doc: import("pdfjs-dist").PDFDocumentProxy | undefined;
    let lastWidth = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const render = async () => {
      const el = box.current;
      if (!el || !doc) return;
      const width = el.clientWidth;
      if (!width || width === lastWidth) return;
      lastWidth = width;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const canvases: HTMLCanvasElement[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const base = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: (width / base.width) * dpr });
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        canvas.style.display = "block";
        canvas.setAttribute("aria-hidden", "true");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("no canvas");
        await page.render({ canvasContext: ctx, viewport }).promise;
        canvases.push(canvas);
      }
      if (cancelled) return;
      el.replaceChildren(...canvases);
      setState("ready");
    };

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        doc = await pdfjs.getDocument(src).promise;
        if (!cancelled) await render();
      } catch (e) {
        console.error(e);
        if (!cancelled) setState("failed");
      }
    })();

    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => render().catch(() => setState("failed")), 150);
    });
    if (box.current) ro.observe(box.current);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      ro.disconnect();
      doc?.destroy();
    };
  }, [src]);

  return (
    <div role="img" aria-label={title} className="relative bg-white">
      <div ref={box} className="min-h-[240px] [&>canvas+canvas]:mt-2" />
      {state === "loading" && (
        <p className="absolute inset-x-0 top-1/3 text-center font-sans text-small text-neutral-600">
          Loading the resume…
        </p>
      )}
      {state === "failed" && (
        <iframe
          src={`${src}#view=FitH`}
          title={title}
          className="absolute inset-0 h-full min-h-[80vh] w-full"
        />
      )}
    </div>
  );
}
