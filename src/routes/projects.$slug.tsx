import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { Page, TagPill, buttonInk } from "@/components/site/Layout";
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
      <h1 className="text-head">No such project</h1>
      <p className="mt-6 max-w-[40ch] text-lead">
        That address doesn't match any build. It may have been renamed.
      </p>
      <Link to="/projects" className={`${buttonInk} mt-10`}>
        Back to all projects
      </Link>
    </Page>
  ),
  errorComponent: () => (
    <Page>
      <h1 className="text-head">This project didn't load</h1>
      <Link to="/projects" className={`${buttonInk} mt-10`}>
        Back to all projects
      </Link>
    </Page>
  ),
});

function Section({
  title,
  children,
  wide,
}: {
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <section data-reveal className="grid gap-6 lg:grid-cols-12">
      <h2 className="font-sans text-sub lg:col-span-4">{title}</h2>
      <div className={wide ? "min-w-0 lg:col-span-8" : "min-w-0 max-w-[68ch] lg:col-span-8"}>
        {children}
      </div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-4">
      {items.map((i) => (
        <li key={i} className="grid grid-cols-[1.25rem_1fr]">
          <span aria-hidden className="mt-[0.7em] h-2 w-2 bg-field" />
          <span>{i}</span>
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
  const challenges = p.challenges.filter((c) => c.trim());
  const learned = p.learned.filter((c) => c.trim());

  return (
    <Page>
      <header data-reveal className="grid gap-8 lg:grid-cols-12">
        <h1 className="text-head lg:col-span-8">{p.title}</h1>
        <p className="max-w-[44ch] text-lead leading-snug lg:col-span-4 lg:self-end">{p.summary}</p>
      </header>

      <dl className="mt-12 grid grid-cols-2 gap-6 bg-card p-6 font-sans text-small sm:grid-cols-4">
        <div>
          <dt className="text-muted-foreground">Built in</dt>
          <dd className="mt-1 font-bold">{p.where}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Status</dt>
          <dd className="mt-1 font-bold">{p.status}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-muted-foreground">Topics</dt>
          <dd className="mt-1 font-bold">{p.tags.join(", ")}</dd>
        </div>
      </dl>

      <div className="mt-6 grid gap-6">
        {p.images.map((img) => (
          <figure key={img.alt} data-reveal className="min-w-0">
            <div className={img.wide ? "diagram-scroll bg-white" : "bg-card"}>
              <a
                href={img.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open full-size image: ${img.alt}`}
                className="block"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={
                    img.wide
                      ? "h-auto w-full min-w-[760px]"
                      : "mx-auto h-auto max-h-[80vh] w-auto max-w-full"
                  }
                />
              </a>
            </div>
            <figcaption className="mt-3 max-w-[72ch] font-sans text-small text-muted-foreground">
              {img.alt}
              {img.wide && (
                <span className="md:hidden"> Swipe sideways to see the whole diagram.</span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-28 grid gap-24 md:mt-36 md:gap-32">
        <Section title="The problem">
          <p className="text-lead leading-snug">{p.overview}</p>
        </Section>

        <Section title="What I built">
          <List items={p.built} />
        </Section>

        <Section title="Tools">
          <div className="flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <TagPill key={t}>{t}</TagPill>
            ))}
          </div>
        </Section>

        {p.addressing && (
          <Section title="Addressing" wide>
            <div className="diagram-scroll">
              <table className="w-full min-w-[520px] border-collapse font-sans text-small">
                <caption className="mb-4 text-left text-muted-foreground">
                  {p.addressing.caption}
                </caption>
                <thead>
                  <tr className="bg-invert text-invert-ink">
                    {p.addressing.columns.map((c) => (
                      <th key={c} scope="col" className="px-3 py-2.5 text-left font-bold">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {p.addressing.rows.map((r) => (
                    <tr key={r.join()} className="even:bg-card">
                      {r.map((cell, i) => (
                        <td key={i} className="px-3 py-2.5 align-top tabular-nums">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {p.source && (
          <Section title={p.source.title}>
            <p>{p.source.text}</p>
            <a
              href={p.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonInk} mt-6`}
            >
              Open BridgeOpsOne Academy <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </Section>
        )}

        {p.snippets.length > 0 && (
          <Section title="The config" wide>
            <div className="grid gap-4">
              {p.snippets.map((s) => (
                <CodeBlock key={s.title} {...s} />
              ))}
            </div>
          </Section>
        )}

        {challenges.length > 0 && (
          <Section title="What went wrong">
            <List items={challenges} />
          </Section>
        )}

        {learned.length > 0 && (
          <Section title="What it taught me">
            <List items={learned} />
          </Section>
        )}

        {p.next && p.next.length > 0 && (
          <Section title="Still to come">
            <List items={p.next} />
          </Section>
        )}
      </div>

      <nav aria-label="More projects" className="mt-32 grid gap-4 sm:grid-cols-2">
        <Link
          to="/projects/$slug"
          params={{ slug: prev.slug }}
          className="group bg-card p-6 transition-colors hover:bg-muted"
        >
          <img
            src={prev.thumbnail}
            alt=""
            loading="lazy"
            className="mb-5 aspect-[16/9] w-full object-cover object-left-top"
          />
          <span className="flex items-center gap-2 font-sans text-small text-muted-foreground">
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              aria-hidden
            />{" "}
            Previous
          </span>
          <span className="mt-3 block font-sans text-lead font-bold tracking-tight">
            {prev.title}
          </span>
        </Link>
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="group bg-card p-6 text-right transition-colors hover:bg-muted"
        >
          <img
            src={next.thumbnail}
            alt=""
            loading="lazy"
            className="mb-5 aspect-[16/9] w-full object-cover object-left-top"
          />
          <span className="flex items-center justify-end gap-2 font-sans text-small text-muted-foreground">
            Next{" "}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </span>
          <span className="mt-3 block font-sans text-lead font-bold tracking-tight">
            {next.title}
          </span>
        </Link>
      </nav>
      <Link
        to="/projects"
        className="group mt-10 inline-flex items-center gap-2 font-sans text-small font-bold"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          aria-hidden
        />{" "}
        Back to all projects
      </Link>
    </Page>
  );
}
