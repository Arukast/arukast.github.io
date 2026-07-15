# Infrastructure & Deployment Automation (IaC)

This directory contains Ansible playbooks to provision, harden, and deploy this portfolio application to a remote Debian VPS.

## Prerequisites

Before running the playbooks, ensure you have:
1. Ansible installed locally (`pip install ansible`).
2. SSH key-based access to the VPS.
3. Node.js installed locally to build the static assets.

## Directory Layout

```text
ansible/
├── inventory.ini.example    # Host and configuration layout example
├── playbooks/
│   ├── harden.yml           # Host hardening and security setup
│   └── deploy.yml           # Application deployment and reverse-proxy setup
└── templates/
    ├── Caddyfile.j2         # Caddy configuration template
    └── docker-compose.yml.j2# Docker Compose stack template
```

## Step-by-Step Instructions

### Step 1: Set Up Inventory
1. Copy the example inventory:
   ```bash
   cp inventory.ini.example inventory.ini
   ```
2. Open `inventory.ini` and replace the placeholder IP address, username (`ansible_user`), SSH key file location, and `domain_name`.

### Step 2: System Hardening
Run the security hardening playbook to configure UFW, Fail2Ban, unattended upgrades, and disable root/password SSH connections.

> [!WARNING]
> Ensure your public SSH key is configured in `~/.ssh/authorized_keys` for the deployment user on the target machine BEFORE running this command, as password authentication will be disabled.

```bash
ansible-playbook -i inventory.ini playbooks/harden.yml --ask-become-pass
```

### Step 3: Build the Application
Before deploying the static site, compile the production Astro build locally:
```bash
# Run from the repository root
npm run build
```

### Step 4: Deploy the Application
Run the deployment playbook to install Docker, structure directories, transfer static assets, generate the reverse-proxy configuration, and start Caddy.

```bash
ansible-playbook -i inventory.ini playbooks/deploy.yml
```
