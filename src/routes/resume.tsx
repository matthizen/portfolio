import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Page, SectionTitle, seo } from "@/components/site/Layout";
import { site } from "@/data/site";

export const Route = createFileRoute("/resume")({
  head: () => seo("Resume", "View or download the resume of Matthews Martinez."),
  component: Resume,
});

function Resume() {
  return (
    <Page>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle kicker="Resume">Resume</SectionTitle>
        <a href={site.resume} download="Matthews_Martinez_Resume.pdf" className="mb-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Download className="h-4 w-4" /> Download PDF
        </a>
      </div>
      <object data={site.resume} type="application/pdf" aria-label="Resume PDF" className="h-[80vh] w-full rounded-lg border bg-card">
        <p className="p-6 text-muted-foreground">Your browser can't display PDFs. <a className="text-primary underline" href={site.resume}>Open the resume</a>.</p>
      </object>
    </Page>
  );
}
