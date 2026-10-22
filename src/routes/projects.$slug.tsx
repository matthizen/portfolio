import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Page, TagPill } from "@/components/site/Layout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const p = getProject(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug, title: p.title, summary: p.summary };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.title} | Matthews Martinez` : "Project not found";
    const d = loaderData?.summary ?? "Project not found.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <Page>
      <p className="font-mono text-primary">404</p>
      <h1 className="text-2xl font-semibold">Project not found</h1>
      <Link to="/projects" className="mt-4 inline-block text-primary">← Back to projects</Link>
    </Page>
  ),
  errorComponent: () => <Page><p>Something went wrong loading this project.</p></Page>,
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">{title}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-muted-foreground">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span className={i.startsWith("[") ? "font-mono text-sm italic" : ""}>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectPage() {
  const { slug } = Route.useParams();
  const p = getProject(slug)!;
  const idx = projects.findIndex((x) => x.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length]!;
  const next = projects[(idx + 1) % projects.length]!;

  return (
    <Page>
      <Link to="/projects" className="font-mono text-sm text-muted-foreground hover:text-primary">← projects</Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h1>
        <span className="rounded border border-primary/50 px-2 py-0.5 font-mono text-xs text-primary">{p.status}</span>
      </div>
      <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{p.summary}</p>

      <Section title="Topology / Screenshots">
        {p.images.length ? (
          <div className="grid gap-4">
            {p.images.map((img) => (
              <figure key={img.alt} className="overflow-hidden rounded-lg border bg-card">
                <img src={img.src} alt={img.alt} className="h-auto w-full" />
                <figcaption className="border-t px-3 py-2 font-mono text-xs text-muted-foreground">{img.alt}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="grid-bg flex aspect-[21/9] items-center justify-center rounded-lg border font-mono text-sm text-muted-foreground">[Add screenshot]</div>
        )}
      </Section>

      <div className="grid gap-x-10 lg:grid-cols-2">
        <Section title="Overview"><p className={p.overview.startsWith("[") ? "font-mono text-sm italic text-muted-foreground" : "text-muted-foreground"}>{p.overview}</p></Section>
        <Section title="Tools & technologies">
          <div className="flex flex-wrap gap-1.5">{p.tech.map((t) => <TagPill key={t}>{t}</TagPill>)}</div>
        </Section>
      </div>

      <Section title="What I built"><Bullets items={p.built} /></Section>

      <Section title="Key configs & code">
        {p.snippets.length ? (
          <div className="grid gap-4">{p.snippets.map((s) => <CodeBlock key={s.title} {...s} />)}</div>
        ) : (
          <p className="font-mono text-sm italic text-muted-foreground">[Add config or code snippet]</p>
        )}
      </Section>

      <div className="grid gap-x-10 lg:grid-cols-2">
        <Section title="Challenges & troubleshooting"><Bullets items={p.challenges} /></Section>
        <Section title="What I learned"><Bullets items={p.learned} /></Section>
      </div>

      <nav aria-label="Project navigation" className="mt-14 grid gap-4 border-t pt-6 sm:grid-cols-2">
        <Link to="/projects/$slug" params={{ slug: prev.slug }} className="rounded-lg border p-4 hover:border-primary">
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground"><ArrowLeft className="h-3 w-3" /> Previous</span>
          <span className="mt-1 block font-medium">{prev.title}</span>
        </Link>
        <Link to="/projects/$slug" params={{ slug: next.slug }} className="rounded-lg border p-4 text-right hover:border-primary">
          <span className="flex items-center justify-end gap-1 font-mono text-xs text-muted-foreground">Next <ArrowRight className="h-3 w-3" /></span>
          <span className="mt-1 block font-medium">{next.title}</span>
        </Link>
      </nav>
    </Page>
  );
}
