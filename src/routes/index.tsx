import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import { Page, seo } from "@/components/site/Layout";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => seo("Network Engineering Portfolio", "Matthews Martinez — NJIT IT student focused on network engineering and IT infrastructure, pursuing the CCNA."),
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  return (
    <>
      <section className="grid-bg border-b">
        <div className="mx-auto max-w-6xl bg-gradient-to-b from-background/60 to-background px-4 py-20 md:py-28">
          <p className="font-mono text-sm text-primary">$ whoami</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">{site.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">{site.pitch}.</p>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            I build and troubleshoot networks — Cisco routing &amp; switching labs, a pfSense-based home network, and a Proxmox homelab with monitoring. Currently pursuing the <span className="font-mono text-primary">CCNA</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              View projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/resume" className="inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary">
              <FileText className="h-4 w-4" /> Resume
            </Link>
          </div>
        </div>
      </section>
      <Page>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Featured</p>
            <h2 className="mt-1 text-2xl font-semibold">Selected projects</h2>
          </div>
          <Link to="/projects" className="font-mono text-sm text-muted-foreground hover:text-primary">all →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </Page>
    </>
  );
}
