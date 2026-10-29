import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Page, seo } from "@/components/site/Layout";
import { ResumeViewer } from "@/components/site/ResumeViewer";
import { contacts, external, site } from "@/data/site";
import { resume } from "@/data/resume";

export const Route = createFileRoute("/resume")({
  head: () =>
    seo(
      "Resume",
      "The resume of Matthews Martinez, shown in full on the page: education, networking projects, experience, skills and certifications.",
    ),
  component: Resume,
});

// Nothing on this page waits for an animation or a script: the resume is plain HTML and always visible.

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 pt-10 md:grid-cols-[11rem_1fr] md:gap-8">
      <h2 className="font-sans text-lead">{title}</h2>
      <div className="grid gap-7">{children}</div>
    </section>
  );
}

function Entry({
  title,
  sub,
  when,
  points,
}: {
  title: string;
  sub?: string;
  when?: string;
  points?: string[];
}) {
  return (
    <article>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="font-sans text-[1.1875rem] tracking-tight">{title}</h3>
        {when && <p className="shrink-0 font-sans text-small text-muted-foreground">{when}</p>}
      </div>
      {sub && <p className="mt-1 font-sans text-small">{sub}</p>}
      {points && points.length > 0 && (
        <ul className="mt-3 grid gap-2">
          {points.map((x) => (
            <li key={x} className="grid grid-cols-[1.1rem_1fr]">
              <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 bg-field" />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function Resume() {
  return (
    <Page>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h1 className="text-head lg:col-span-7">My resume, in full</h1>
        <div className="lg:col-span-5">
          <p className="max-w-[44ch]">
            Everything is on this page; nothing to open or unfold. The PDF is the same document,
            ready to print or forward.
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <article aria-label="Resume" className="bg-card p-5 sm:p-10 lg:col-span-8">
          <header>
            <p className="font-sans text-sub font-bold tracking-tight">{site.name}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-sans text-small">
              {contacts.map((c) => (
                <li key={c.label}>
                  <span className="text-muted-foreground">{c.label} </span>
                  <a
                    href={c.href}
                    {...external(c.href)}
                    className="break-all font-bold underline underline-offset-4 hover:no-underline"
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </header>

          <Block title="Education">
            {resume.education.map((e) => (
              <Entry
                key={e.school}
                title={e.school}
                sub={`${e.degree} · ${e.location}`}
                when={e.dates}
              />
            ))}
          </Block>

          <Block title="Projects">
            {resume.projects.map((p) => (
              <Entry key={p.title} title={p.title} points={p.points} />
            ))}
          </Block>

          <Block title="Experience">
            {resume.experience.map((e) => (
              <Entry
                key={e.role}
                title={e.role}
                sub={`${e.org} · ${e.location}`}
                when={e.dates}
                points={e.points}
              />
            ))}
          </Block>

          <Block title="Skills">
            {Object.entries(resume.skills).map(([k, v]) => (
              <p key={k}>
                <strong className="font-sans">{k}:</strong> {v.join(", ")}
              </p>
            ))}
          </Block>

          <Block title="Certifications">
            {resume.certifications.map((c) => (
              <p key={c.name}>
                <strong className="font-sans">{c.name}</strong> ({c.status.toLowerCase()})
              </p>
            ))}
          </Block>
        </article>

        <aside aria-labelledby="pdf-h" className="lg:col-span-4">
          <div className="lg:sticky lg:top-8">
            <h2 id="pdf-h" className="font-sans text-sub">
              The PDF
            </h2>
            <p className="mt-3 text-muted-foreground">{"\n"}</p>
            <div className="mt-6 bg-card p-2">
              <ResumeViewer src={site.resume} title="Resume of Matthews Martinez, PDF, one page" />
            </div>
          </div>
        </aside>
      </div>
    </Page>
  );
}
