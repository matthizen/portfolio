import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, SectionTitle, seo } from "@/components/site/Layout";
import { ProjectCard } from "@/components/site/ProjectCard";
import { allTags, projects, type Tag } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  head: () => seo("Projects", "Networking, homelab, security and monitoring projects by Matthews Martinez."),
  component: Projects,
});

function Projects() {
  const [tag, setTag] = useState<Tag | "All">("All");
  const list = tag === "All" ? projects : projects.filter((p) => p.tags.includes(tag));
  return (
    <Page>
      <SectionTitle kicker="Projects">Labs, builds &amp; homelab</SectionTitle>
      <div role="group" aria-label="Filter by tag" className="mb-8 flex flex-wrap gap-2">
        {(["All", ...allTags] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            aria-pressed={tag === t}
            className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${tag === t ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:border-primary hover:text-primary"}`}
          >
            {t}
          </button>
        ))}
      </div>
      {list.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      ) : (
        <p className="font-mono text-sm text-muted-foreground">No projects with this tag yet.</p>
      )}
    </Page>
  );
}
