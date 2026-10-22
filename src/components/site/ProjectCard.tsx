import { Link } from "@tanstack/react-router";
import { Network } from "lucide-react";
import type { Project } from "@/data/projects";
import { TagPill } from "./Layout";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/60"
    >
      <div className="aspect-video overflow-hidden border-b bg-muted">
        {p.thumbnail ? (
          <img src={p.thumbnail} alt={`${p.title} screenshot`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid-bg flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <Network className="h-8 w-8 text-primary" aria-hidden />
            <span className="font-mono text-xs">[Add screenshot]</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold group-hover:text-primary">{p.title}</h3>
          {p.status === "In progress" && <span className="shrink-0 font-mono text-[10px] uppercase text-primary">WIP</span>}
        </div>
        <p className="text-sm text-muted-foreground">{p.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {p.tags.map((t) => <TagPill key={t}>{t}</TagPill>)}
        </div>
      </div>
    </Link>
  );
}
