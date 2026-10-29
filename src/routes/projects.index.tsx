import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, PageTitle, seo } from "@/components/site/Layout";
import { ProjectRow } from "@/components/site/ProjectCard";
import { allTags, projects, roadmap, type Tag } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  head: () =>
    seo(
      "Projects",
      "Ten networking, homelab, security and monitoring builds by Matthews Martinez, each with its topology, configs and what went wrong.",
    ),
  component: Projects,
});

function Projects() {
  const [tag, setTag] = useState<Tag | "All">("All");
  const list = tag === "All" ? projects : projects.filter((p) => p.tags.includes(tag));
  return (
    <Page>
      <PageTitle title="Projects">
        <p>
          Packet Tracer designs and the real network I live on, each with its topology and configs.
        </p>
      </PageTitle>

      <div
        role="group"
        aria-label="Filter projects by topic"
        className="mb-10 flex flex-wrap gap-2"
      >
        {(["All", ...allTags] as const).map((t) => {
          const count =
            t === "All" ? projects.length : projects.filter((p) => p.tags.includes(t)).length;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              aria-pressed={tag === t}
              className="min-h-11 bg-card px-4 font-sans text-small font-medium transition-colors hover:bg-muted active:scale-95 aria-pressed:bg-foreground aria-pressed:text-background"
            >
              {t} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {list.length} projects shown
      </p>
      <div data-reveal className="grid gap-4">
        {list.map((p) => (
          <ProjectRow key={p.slug} p={p} />
        ))}
      </div>

      <section
        aria-labelledby="roadmap-h"
        data-reveal
        className="mt-32 grid gap-10 lg:grid-cols-12"
      >
        <h2 id="roadmap-h" className="text-head lg:col-span-5">
          Not started yet
        </h2>
        <ul className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
          {roadmap.map((r) => (
            <li key={r.title}>
              <h3 className="font-sans text-lead">{r.title}</h3>
              <p className="mt-2 text-muted-foreground">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
