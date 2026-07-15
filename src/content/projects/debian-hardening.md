---
title: "Bare-Metal Debian Server Hardening Configuration"
description: "An automated Ansible playbook designed to lock down a newly provisioned Debian VPS from scratch. The configuration shuts down root password logons, enforces secure SSH-Key-Only connections, structures persistent IP tables rules, mounts a robust local UFW firewall, installs fail2ban intrusion preventions, and configures daily automated backup routines securely."
status: "BLUEPRINT"
category: "Server Hardening"
tags: ["Debian 12", "Ansible", "Shell Scripting", "Fail2Ban"]
githubUrl: "https://github.com"
architecture: ["Base Debian VPS", "Ansible Playbook", "UFW Firewall", "fail2ban Daemon"]
icon: "fa-server"
image: "/images/projects/debian_hardening.png"
---

### Project Overview

Deploying servers in public cloud regions exposes them to active brute-force scripts within minutes. This infrastructure blueprint leverages Ansible to build consistent, reproducible server environments, enforcing key security benchmarks (similar to CIS Benchmarks) automatically on raw OS installations.

### Security Configurations Enforced

- **Disable Insecure Access**: Root login is disabled (`PermitRootLogin no`) and password authentication is rejected (`PasswordAuthentication no`).
- **Firewall Integration**: Installs UFW (Uncomplicated Firewall) blocking all incoming traffic by default, only allowing ssh on a custom port and public HTTP/HTTPS ports.
- **Fail2Ban Jail Setup**: Monitors audit logs and dynamically updates iptables rules to temporarily ban IPs showing malicious access patterns.
- **System Updates**: Activates `unattended-upgrades` to automatically install security patches daily.

### Usage Instructions

```bash
# Verify connection to remote node
ansible all -m ping -i inventory.ini

# Execute full server hardening playbook
ansible-playbook -i inventory.ini playbooks/harden.yml --ask-become-pass
```
