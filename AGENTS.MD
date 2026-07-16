# AGENTS.md

## Section 1: Agent Operational Workflow

### 1.1 Startup Workflow
Before writing any code, the agent must complete these steps:
1. Confirm the working directory using `pwd`.
2. Read `claude-progress.md` for the latest verified state and the next required step (if present).
3. Check `src/data/profile.json` and the content collection files in `src/content/projects/` to understand current configuration states.
4. Review recent repository history by checking the last 5 commits using `git log --oneline -5`.
5. Run the required build verification using `npm run build` or `npx astro check` before starting new work. If baseline verification fails, fix that issue first before stacking new feature work on top of a broken starting state.

### 1.2 Working Rules
1. Focus entirely on one feature or task at a time.
2. Do not mark a task or feature complete just because code was added. Ensure it compiles and is verified.
3. Keep all changes within the selected task scope unless a critical blocker forces a narrow supporting fix.
4. Do not silently alter verification rules during implementation.
5. Prefer durable repository artifacts over transient chat summaries.

### 1.3 Required Artifacts
1. `src/data/profile.json`: The source of truth for bio information, virtual terminal listings, and stats.
2. `src/content/projects/`: Case study files defining individual portfolio project items.
3. `package.json`: Main repository dependencies, runtime constraints, and script targets.

### 1.4 Definition Of Done
A feature achieves the status of completed only when all of the following conditions are met:
1. The target behavior is fully implemented.
2. The site compiles successfully locally using `npm run build`.
3. Astro diagnostics run successfully using `npx astro check` with zero errors.
4. If testing dynamic logic (like the virtual terminal or API forms), manually verify correct DOM rendering and network/simulation fallbacks.

### 1.5 End Of Session Workflow
Before ending a session, the agent must perform these tasks:
1. Confirm no trailing linter or type errors remain by running validation tasks.
2. Explicitly record any unresolved risk, technical debt, or workflow blocker in the session handoff.
3. Commit the changes with a descriptive message adhering to the Conventional Commits specification once the work is in a safe state.

---

## Section 2: Tech Stack & Architecture

### 2.1 Framework & Core Stack
- **Framework**: Astro v7.0.9 (configured as a static site generator / SSG).
- **Styling**: Tailwind CSS v4.0.0 (integrated using `@tailwindcss/vite` plugin).
- **Languages**: TypeScript, HTML5, Vanilla CSS.
- **Runtime & Build Tools**: Node.js v22, npm.
- **Infrastructure & IaC**: Ansible playbooks (for server provisioning & deployment), Docker Compose (Caddy containerization).
- **Secure Network Ingress**: Cloudflare Tunnels (`cloudflared` for portless DNS routing).

### 2.2 Directory Layout & Component Roles
- `src/layouts/`
  - [Layout.astro](./src/layouts/Layout.astro): Main scaffolding layout providing page structure, global metadata, font imports (JetBrains Mono, Inter), FontAwesome assets, and Astro client transitions `<ClientRouter />`.
- `src/components/`
  - [Terminal.astro](./src/components/Terminal.astro): Client-side interactive terminal emulator running the `sys_diagnose.sh` interface. Parses commands: `help`, `ls`, `cat`, `neofetch`, `uptime`, `clear`, `sudo`.
  - [ContactForm.astro](./src/components/ContactForm.astro): Interactive message dispatcher form simulated as a `POST /api/v1/contact` client. Submits live to Web3Forms API when `PUBLIC_WEB3FORMS_KEY` is present; falls back to simulated memory log output with styled JSON responses when absent.
  - [Navbar.astro](./src/components/Navbar.astro): Responsive console-themed header menu handling site view routes (/home and /projects).
  - [ProjectCard.astro](./src/components/ProjectCard.astro): Renders project cases, displaying status badges, tags, description, external links, and architecture stacks.
  - [Footer.astro](./src/components/Footer.astro): Custom footer containing an active clock loop simulating node uptime daemon processes.
- `src/pages/`
  - [index.astro](./src/pages/index.astro): Core landing page. Integrates profile details, interactive terminal, featured projects, and contact form.
  - `projects/index.astro`: Grid registry of all collection projects sorted by order flag.
  - `projects/[...slug].astro`: Dynamic case study layout rendering complete project Markdown files.
- `src/data/`
  - [profile.json](./src/data/profile.json): Decoupled JSON data store containing profile text, interactive terminal files, and system statistics.
- `src/content/`
  - `projects/`: Collection directory holding individual project Markdown files (`dotfiles.md`, `homelab-infrastructure.md`, etc.).
  - [content.config.ts](./src/content.config.ts): Definition of the `projects` content collection schema using Zod.
- `src/styles/`
  - [global.css](./src/styles/global.css): Core design tokens (zinc-950, emerald-500, custom variables), custom scrollbars, animations, and Tailwind v4 imports.
- `ansible/`: Container deployment scripts.
  - `inventory.ini.example`: Target VPS configuration variables and directory overrides.
  - `playbooks/harden.yml`: Hardens remote nodes (UFW, Fail2Ban, unattended upgrades, disables password authentication).
  - `playbooks/deploy.yml`: Installs Docker, builds the project locally, sends assets, templates the Caddy container stack, and deploys.
- `homelab/`: Cloudflare Tunnel deployment scripts.
  - `docker-compose.yml`: Hardened container definition (dropping all Linux capabilities, running as non-root, read-only filesystem).
  - `config.yml.example`: Ingress router templates mapping local subdomains to physical LAN assets (Proxmox, local containers, etc.).

### 2.3 Role-Based Access Control & Scoping (If Applicable)
- **Not Applicable**: The portfolio is a fully public-facing static application. There are no users, authentication schemas, session tokens, or multi-tenant database roles.

### 2.4 Service & Business Logic Layer
- **Content Validation Schema**: The Zod configuration schema in `src/content.config.ts` acts as the data-validating firewall for case studies.
- **Config-Driven Architecture**: Profile components consume state directly from JSON, ensuring formatting or content changes do not require code/template alterations.
- **Form Ingress Handlers**: The contact page decouples web requests from visual DOM results, handling failure, production Web3Forms integration, or local simulation states based on env-variable injection.

---

## Section 3: Privacy, Security & Specifications

### 3.1 Privacy & Environment Safety
1. Do not hardcode personal user data in the source code, comments, or documentation. Keep emails and generic references public.
2. Secrets management: Do not commit active variables or access keys. Keep `.env` and `creds.json` files out of source control using `.gitignore`.

### 3.2 Security Rules
1. XSS: Escape dynamic terminal parameters and form inputs. Utilize Astro/React's standard escaping or client-side sanitization.
2. Content Security Policy (CSP): Enforced via Caddy headers inside the server deployment template. Restricts assets, styling, and frame injection (`X-Frame-Options: DENY`, `Strict-Transport-Security`).
3. Outbound Isolation: For homelab ingress agents (`cloudflared`), drop container kernel capabilities (`cap_drop: [ALL]`) and lock host permissions to prevent potential container breakout.

### 3.3 Database Status & State Codes (If Applicable)
- **Project Life-Cycle Status Enum**: Used within project Frontmatter to label operational statuses on cards:
  - `PRODUCTION`: Live containerized deployments running active traffic.
  - `ONLINE`: Fully operational public network services.
  - `BLUEPRINT`: Architectural draft, mock config, or pipeline in active development.
  - `STABLE`: Confirmed solid self-hosted release or configured homelab node.

---

## Section 4: Development, Testing & Operations

### 4.1 Coding Standards & Formatting
1. Indentation: 2 spaces for HTML, CSS, JS, TS, Astro, JSON, and YAML configurations.
2. Formatting: Enforced using standard Astro framework standards and strict TypeScript compiler settings.
3. Commit conventions: All commits must follow the Conventional Commits specification.

### 4.2 Testing & Portability
1. Verification: 
   - Run type checks and framework linting: `npx astro check`
   - Run production compilation test: `npm run build`
2. Test Isolation: Since this is a static site without database state modification, assure local web dev environments run on isolated local host ports (default: `http://localhost:4321`).

### 4.3 Containerization & Ports (If Applicable)
- **Caddy Web Server Container**:
  - Outbound Port Mappings: Host port `80` to container `80` (HTTP redirection), Host port `443` to container `443` (Caddy automated SSL ingress).
  - Target Path: `/var/www/portfolio` serves built files from Astro `./dist/` folder.
- **Cloudflare Tunnel Container**:
  - Image: `cloudflare/cloudflared:latest`
  - Host directory mounting: Configuration `/etc/cloudflared/config.yml` (read-only), Credentials `/etc/cloudflared/creds.json` (read-only).
  - User: `65534:65534` (nobody) for maximum container isolation.