import { createFileRoute } from "@tanstack/react-router";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { Page, TagPill, seo } from "@/components/site/Layout";
import { site } from "@/data/site";
import { resume } from "@/data/resume";

export const Route = createFileRoute("/resume")({
  head: () => seo("Resume", "Resume of Matthews Martinez: education, networking projects, experience, skills and certifications."),
  component: Resume,
});

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t py-8 md:grid md:grid-cols-[180px_1fr] md:gap-8">
      <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-primary md:mb-0">{title}</h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Entry({ title, sub, right, points }: { title: string; sub?: string; right?: string; points?: string[] }) {
  return (
    <article>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-semibold">{title}</h3>
        {right && <span className="shrink-0 font-mono text-xs text-muted-foreground">{right}</span>}
      </div>
      {sub && <p className="text-sm text-muted-foreground">{sub}</p>}
      {points && (
        <ul className="mt-2 space-y-1.5">
          {points.map((p) => (
            <li key={p} className="flex gap-3 text-sm text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>{p}</span>
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
      <header className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Resume</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{site.name}</h1>
          <p className="mt-2 text-muted-foreground">{site.pitch}</p>
          <div className="mt-3 flex flex-wrap gap-4 font-mono text-sm text-muted-foreground">
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-primary"><Mail className="h-4 w-4" aria-hidden />{site.email}</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Linkedin className="h-4 w-4" aria-hidden />LinkedIn</a>
            <a href={site.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Github className="h-4 w-4" aria-hidden />GitHub</a>
          </div>
        </div>
        <a href={site.resume} download="Matthews_Martinez_Resume.pdf" className="inline-flex shrink-0 items-center gap-2 self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:self-auto">
          <Download className="h-4 w-4" /> Download PDF
        </a>
      </header>

      <Block title="Education">
        {resume.education.map((e) => <Entry key={e.school} title={e.school} sub={`${e.degree} · ${e.location}`} right={e.dates} />)}
      </Block>
      <Block title="Projects">
        {resume.projects.map((p) => <Entry key={p.title} title={p.title} points={p.points} />)}
      </Block>
      <Block title="Experience">
        {resume.experience.map((e) => <Entry key={e.role} title={e.role} sub={`${e.org} · ${e.location}`} right={e.dates} points={e.points} />)}
      </Block>
      <Block title="Skills">
        {Object.entries(resume.skills).map(([cat, list]) => (
          <div key={cat}>
            <h3 className="mb-2 text-sm font-semibold">{cat}</h3>
            <div className="flex flex-wrap gap-1.5">{list.map((s) => <TagPill key={s}>{s}</TagPill>)}</div>
          </div>
        ))}
      </Block>
      <Block title="Certifications">
        {resume.certifications.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <span className="font-semibold">{c.name}</span>
            <span className="rounded border border-primary px-2 py-0.5 font-mono text-xs text-primary">{c.status}</span>
          </div>
        ))}
      </Block>
    </Page>
  );
}
