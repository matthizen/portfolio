import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

/** One project in the index: big title on the left, its picture on the right. */
export function ProjectRow({ p }: { p: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      className="group grid gap-5 bg-card p-4 transition-colors hover:bg-muted sm:p-6 md:grid-cols-12 md:gap-8"
    >
      <div className="flex flex-col md:col-span-5">
        <h2 className="font-sans text-sub">
          {p.title}
          <ArrowUpRight
            className="ml-1 inline h-[0.7em] w-[0.7em] align-baseline transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            aria-hidden
          />
        </h2>
        <p className="mt-2 font-sans text-small text-muted-foreground">
          {p.where}
          {p.status === "In progress" && (
            <span className="font-bold text-foreground">, in progress</span>
          )}
          {" · "}
          {p.tags.filter((t) => t !== p.where).join(", ")}
        </p>
        <p className="mt-4 max-w-[48ch]">{p.summary}</p>
      </div>
      <div className="aspect-[16/10] overflow-hidden bg-muted md:col-span-7">
        <img
          src={p.thumbnail}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    </Link>
  );
}
