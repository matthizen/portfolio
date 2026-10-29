import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter, buttonInk, useReveal } from "@/components/site/Layout";

function NotFoundComponent() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="font-sans text-[clamp(6rem,28vw,22rem)] leading-[0.8]">404</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <p className="max-w-[40ch] text-lead leading-snug">
          Destination host unreachable. There's no route to this page; it may have moved, or never
          existed.
        </p>
        <div className="flex flex-wrap gap-3 md:justify-end md:self-end">
          <Link to="/" className={buttonInk}>
            Back to the home page
          </Link>
          <Link
            to="/projects"
            className="inline-flex min-h-12 items-center px-2 font-sans text-small font-bold underline underline-offset-4"
          >
            See the projects
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Matthews Martinez | Networks and infrastructure" },
      {
        name: "description",
        content:
          "Matthews Martinez builds networks in Packet Tracer and runs them at home: pfSense, Proxmox, Nagios. IT student at NJIT, working toward the CCNA.",
      },
      { name: "author", content: "Matthews Martinez" },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#e1ac10" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// Runs before paint: marks JS as available (for entrance motion) and applies the saved or system theme.
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');var t=null;try{t=localStorage.getItem('theme')}catch(e){}if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark');setTimeout(function(){if(!window.__reveal)d.classList.remove('js')},2500);})();`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" id="top" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useReveal();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-foreground p-3 font-sans text-background focus:not-sr-only focus:fixed focus:left-2 focus:top-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div id="main" className="flex flex-1 flex-col">
          <Outlet />
        </div>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
