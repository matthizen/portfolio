# Packet Paths Portfolio

Build a professional portfolio website for me, Matt, an NJIT IT student focused on network engineering and IT infrastructure, currently pursuing the CCNA.

SOURCE CONTENT
- I've attached a ZIP exported from Notion containing all my projects and their descriptions, plus my resume.
- Use these files as the ONLY source of content. Do not invent projects, skills, dates, employers, or certifications. If something is missing, leave a clearly marked placeholder (e.g., "[Add screenshot]") instead of making it up.
- Import images/diagrams from the Notion export into the project assets and use them in the matching project pages.
- Place my resume PDF in the public folder so it can be downloaded.

PAGES & STRUCTURE
1. Home: name, one-line pitch ("IT student at NJIT focused on network engineering and infrastructure"), short intro, 2–3 featured projects, buttons to Projects and Resume.
2. About: background, career goals, technical skills grouped by category (Networking, Virtualization, Security, Automation/Scripting, Cloud, Tools) — pulled from my resume/projects. No skill percentage bars.
3. Projects: a grid of project cards (title, one-line summary, tech tags, thumbnail). Include filter buttons by tag (e.g., Networking, Security, Homelab, Automation, Cloud).
4. Individual project pages (/projects/:slug), each using this template:
   - Overview / problem
   - What I built
   - Tools & technologies (tags)
   - Topology diagram or screenshots (if present in the export)
   - Key configs or code snippets in styled code blocks with copy buttons
   - Challenges & troubleshooting
   - What I learned
   - Previous/next project navigation
5. Certifications: CCNA shown as "In Progress", plus any others from my resume. Leave space for future badges.
6. Resume: embedded PDF viewer plus a download button.
7. Contact: email, LinkedIn, and GitHub links (from my resume). Use a mailto link, no backend form.

DESIGN
- Clean, modern, technical aesthetic suited to network engineering. Dark theme by default with a light/dark toggle.
- One accent color (e.g., teal or cyan), with a monospace font for code, tags, and small accents and a clean sans-serif for body text.
- Skimmable: visuals and diagrams first, text in short sections. No long text walls.
- Subtle animations only; nothing distracting.

RESPONSIVENESS & QUALITY
- Fully responsive: test layouts for mobile (375px), tablet (768px), and desktop (1440px). Collapsible hamburger nav on mobile, images that scale, code blocks that scroll horizontally instead of breaking the layout, no horizontal page scroll.
- Accessible: semantic HTML, alt text on all images, keyboard-navigable, sufficient color contrast.
- SEO: a page title and meta description per page, Open Graph tags, and a favicon.
- A custom 404 page.

TECHNICAL REQUIREMENTS (important: I will self-host this)
- React + Vite + Tailwind, as a fully static site. No Supabase, no backend, no Lovable-specific hosting dependencies.
- Store all project content in a single data file (e.g., src/data/projects.ts) or as Markdown files so I can add or edit projects later without touching components.
- Use client-side routing that works behind Nginx with a try_files fallback to index.html.
- All assets must be local (no hotlinking to Notion URLs, since Notion export links expire).
- `npm run build` must produce a working `dist/` folder with no errors.

PRIVACY
- If any project content contains real public IP addresses, passwords, API keys, or personal phone numbers/addresses, replace them with placeholders (e.g., 203.0.113.x, [REDACTED]) and list what you redacted.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/59d1293f-2efc-40e3-8a10-90c984556318).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
