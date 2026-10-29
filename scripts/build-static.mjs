// Builds the site as plain static files in dist/, for self-hosting behind nginx.
//
// TanStack Start's own prerenderer can't run our custom server entry (src/server.ts), so this
// builds the Node server instead, starts it, saves every page it links to as HTML, and copies the
// static assets alongside. The pages hydrate in the browser exactly as they do from the server.
//
//   npm run build:static   ->   dist/   (copy to /var/www/portfolio, see nginx.conf.example)
import { spawn, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const out = "dist";
const port = 4870 + Math.floor(Math.random() * 100);
const origin = `http://127.0.0.1:${port}`;

console.log("Building the Node server…");
const build = spawnSync("npx vite build", {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NITRO_PRESET: "node-server" },
});
if (build.status !== 0) process.exit(build.status ?? 1);

const server = spawn(process.execPath, [".output/server/index.mjs"], {
  env: { ...process.env, PORT: String(port), HOST: "127.0.0.1" },
  stdio: "ignore",
});
const stop = () => server.kill();
process.on("exit", stop);

async function waitForServer() {
  for (let i = 0; i < 100; i++) {
    try {
      await fetch(origin);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }
  throw new Error("The built server never started.");
}

// "/" -> index.html, "/about" -> about.html, "/projects/pi-hole" -> projects/pi-hole.html
const fileFor = (path) => join(out, path === "/" ? "index.html" : `${path.slice(1)}.html`);

function save(file, body) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, body);
}

try {
  await waitForServer();
  rmSync(out, { recursive: true, force: true });
  cpSync(".output/public", out, { recursive: true });

  const seen = new Set(["/"]);
  const queue = ["/"];
  while (queue.length) {
    const path = queue.shift();
    const res = await fetch(origin + path);
    if (!res.ok) throw new Error(`${path} answered ${res.status}`);
    const html = await res.text();
    save(fileFor(path), html);
    console.log("  page", path);

    // Follow internal page links only: no files (a dot in the last segment), no #anchors.
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      const clean = href.length > 1 ? href.replace(/\/+$/, "") : href;
      if (/\.[a-z0-9]+$/i.test(clean) || clean.startsWith("/assets/") || seen.has(clean)) continue;
      seen.add(clean);
      queue.push(clean);
    }
  }

  // The custom 404 page, served by nginx for any path that has no file.
  const missing = await fetch(origin + "/this-page-does-not-exist");
  save(join(out, "404.html"), await missing.text());
  console.log("  page 404");

  if (!existsSync(join(out, "resume.pdf"))) throw new Error("resume.pdf is missing from dist/.");
  console.log(`\nDone: ${seen.size} pages and a 404 page in ${out}/`);
} finally {
  stop();
}
