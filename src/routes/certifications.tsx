import { createFileRoute } from "@tanstack/react-router";
import { Award, Plus } from "lucide-react";
import { Page, SectionTitle, seo } from "@/components/site/Layout";

export const Route = createFileRoute("/certifications")({
  head: () => seo("Certifications", "Certifications of Matthews Martinez, including the Cisco CCNA (in progress)."),
  component: Certs,
});

function Certs() {
  return (
    <Page>
      <SectionTitle kicker="Certifications">Credentials</SectionTitle>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-lg border border-primary/50 bg-card p-6">
          <Award className="h-10 w-10 text-primary" aria-hidden />
          <h2 className="mt-4 text-xl font-semibold">Cisco CCNA</h2>
          <p className="text-sm text-muted-foreground">Cisco Certified Network Associate</p>
          <span className="mt-4 inline-block rounded border border-primary px-2 py-0.5 font-mono text-xs text-primary">In Progress</span>
        </article>
        {[1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-muted-foreground">
            <Plus className="h-6 w-6" aria-hidden />
            <span className="font-mono text-xs">[Future badge]</span>
          </div>
        ))}
      </div>
    </Page>
  );
}
