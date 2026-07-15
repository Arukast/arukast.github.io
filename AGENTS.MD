Project Vision

An elite, high-performance, single-page interactive portfolio representing an engineer specializing in:

Infrastructure & Systems: Linux (Debian/Ubuntu), Proxmox VE, homelab orchestration.

DevOps & Automation: Ansible, Docker/Compose, CI/CD pipelines (GitHub Actions), Cloudflare Tunnels.

Backend Engineering: High-performance, concurrent APIs (Go, Python/FastAPI), caching (Redis), relational engines (PostgreSQL).

ICT Operations: Secure network routing, DNS zone configuration, TLS/SSL automation.

Architectural & Design Principles

Strict Performance First: The portfolio must compile down to a zero-overhead, blazing-fast static build (100/100 Lighthouse target score).

Systems Engineering Aesthetic: Minimalist dark mode (zinc-950), clean monospace typography (JetBrains Mono/Fira Code), systems diagnostics logs, and functional interactive widgets (like a virtual terminal shell).

No Aesthetic Bloat: Avoid slow Javascript animation frameworks. Rely on native browser capabilities (like the View Transitions API) and highly optimized Tailwind utility classes.

"Show, Don't Tell" Infrastructure: The build and deployment configuration (Ansible playbooks, Dockerfiles, and GitHub Actions) should be public and accessible, serving as projects in their own right.

Active Code State (index.html)

The current active iteration is a highly-optimized, single-file HTML implementation (index.html) designed for modern web standards. It features:

Header Navigation: Interactive single-page view router (/home and /projects).

Hero Profile Component: Centered systems engineer bio with social nodes (GitHub, LinkedIn, Discord).

sys_diagnose.sh Virtual Terminal: Fully interactive, client-side JavaScript terminal emulator handling commands like help, ls, neofetch, cat about.md, cat cv.txt, uptime, and clear with mobile touch presets.

Dynamic View Routing: Flawless opacity-transition single-page view controller.

Mock POST API Client Dashboard: Dynamic form rendering real JSON response code outputs instantly on simulated submission.

Uptime Simulation Daemon: Dynamic client-side clock running an active server uptime loop.

Ongoing Development Backlog

When continuing this project, prioritize these tasks in order:

Phase 1: Static Site Framework Migration (Astro)

Deconstruct the monolithic index.html into a modular Astro project structure.

Create a reusable base layout: src/layouts/Layout.astro (including Astro's native <ClientRouter /> for smooth transitions).

Break down elements into components: src/components/Terminal.astro, src/components/Navbar.astro, src/components/ProjectCard.astro.

Establish Content Collections (src/content/projects/) using strict schemas so new project case studies can be added using simple Markdown (.md) files.

Phase 2: Pipeline Automation & IaC

Draft a production-ready .github/workflows/deploy.yml pipeline that compiles the Astro project and pushes the static assets straight to GitHub Pages.

Write a sample Ansible playbook to deploy, secure, and run containerized reverse-proxy services (e.g., Caddy, Docker) on a cheap VPS.

Phase 3: Homelab Secure Bridging (Completed)

Write a template configuration for deploying a Cloudflare Tunnel (cloudflared) inside a Proxmox VM or Docker environment.

Document how to safely map subdomains (demo.yourname.dev) straight to local homelab microservices without exposing a residential WAN IP.