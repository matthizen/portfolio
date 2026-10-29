# Matthews Martinez — Networks & Infrastructure Portfolio

**Live site:** https://portfolio.parore-wage.ts.net/

Portfolio of an NJIT Information Technology student (class of 2027) focused on network engineering and IT infrastructure, working toward the CCNA. The site documents 10 projects: enterprise network designs in Cisco Packet Tracer, builds running on real hardware in my homelab, and a ticket-based troubleshooting series.

This site is also a project in its own right: it is **self-hosted on my homelab**, not on a hosting platform.

---

## Projects featured

| Type | Projects |
|---|---|
| Network design (Packet Tracer) | Campus and branch network (serial WAN, RIPv2) · Enterprise network capstone (six VLANs) · Hotel network |
| Homelab (real hardware) | pfSense home edge · Tailscale on pfSense · Pi-hole DNS filter · Nagios monitoring · Proxmox home server · Minecraft server |
| Troubleshooting | Ticket-based Packet Tracer troubleshooting labs |

---

## How it's hosted

```
Visitor ──HTTPS──▶ Tailscale Funnel ──▶ Nginx (reverse proxy, :80) ──▶ Node.js app (:3000)
                                        └──────── Debian LXC on Proxmox VE ────────┘
                                                            ▲
                         GitHub (main) ──── auto-deploy ────┘
```

- **Hypervisor:** Proxmox VE on an upgraded desktop, shared with a Minecraft server, a Nagios monitoring VM and a Plex container
- **Container:** unprivileged Debian 12 LXC (1 vCPU, 2 GB RAM), on its own VLAN behind a pfSense firewall
- **App server:** Node.js, run as a systemd service with automatic restarts
- **Reverse proxy:** Nginx in front of the app
- **Public access:** Tailscale Funnel provides HTTPS with an automatically issued certificate. No ports are forwarded on the firewall, and the home IP is never exposed.
- **Deployment:** a cron job checks GitHub every 5 minutes; when `main` changes, the server pulls, rebuilds and restarts the service, and logs the update

---

## Tech stack

- React + TypeScript, built with Vite
- Tailwind CSS and shadcn/ui components
- Nitro server output (built with the `node-server` preset for self-hosting)
- Designed and iterated in [Lovable](https://lovable.dev); every change is committed to this repo

---

## Running locally

Requires Node.js 22+.

```bash
git clone https://github.com/matthizen/portfolio.git
cd portfolio
npm install
npm run dev
```

## Building for self-hosting

The default build targets Cloudflare Workers. To run on a regular server, build with the Node preset:

```bash
NITRO_PRESET=node-server npm run build
PORT=3000 HOST=127.0.0.1 node .output/server/index.mjs
```

Then put a reverse proxy in front of port 3000. An example Nginx config is in [`nginx.conf.example`](nginx.conf.example).

---

## Problems solved during deployment

| Problem | Cause | Fix |
|---|---|---|
| Container had no internet access | VLAN tagging / pfSense rules on the new segment | Corrected VLAN config and added firewall rules, keeping the container segmented from other networks |
| Tailscale would not start | Unprivileged LXC containers have no `/dev/net/tun` | Passed the TUN device through from the Proxmox host |
| Build produced no running server | Framework defaulted to the `cloudflare-module` preset | Rebuilt with `NITRO_PRESET=node-server` |
| Nginx not running after reboot | systemd never launched the unit at boot | systemd override with `Restart=always`, plus a boot-time fallback |
| Site not updating from GitHub | Deploy script and cron job were never created | Rewrote the script to sync to `origin/main`, with logging |

---

## Contact

- **LinkedIn:** [matthews-martinez](https://www.linkedin.com/in/matthews-martinez/)
- **Email:** martinezmatthews01@gmail.com
- **Résumé:** [portfolio.parore-wage.ts.net/resume](https://portfolio.parore-wage.ts.net/resume)
