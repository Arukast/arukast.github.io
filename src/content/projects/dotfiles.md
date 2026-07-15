---
title: "Custom Arch Linux & Wayland Desktop Environment"
description: "A highly optimized, keyboard-centric Wayland desktop environment built on Arch Linux using Hyprland. Features custom Python/Bash NVIDIA power management daemons, a minimalist terminal workspace, and modular UI components engineered for maximum developer productivity."
status: "PRODUCTION" # Options: PRODUCTION, ONLINE, BLUEPRINT, STABLE
category: "Linux Systems & Dotfiles" # e.g., "Docker Routing", "Go Router & Queue", "Web Application"
tags: ["Arch Linux", "Hyprland", "Wayland", "NVIDIA", "Python", "Bash", "Fish Shell", "Waybar"]
icon: "fa-desktop" # FontAwesome icon name (e.g., fa-cube, fa-server, fa-globe, fa-shield-halved)
architecture: ["Arch Linux Core", "Hyprland Tiling Compositor", "Modular UI (Waybar/SwayNC/Rofi)", "Hardware & Power Control Daemons"] # Optional: flows for the system path schematic

# Links (Both are optional, omit if not applicable)
githubUrl: "https://github.com/Arukast/dotfiles"
liveUrl: ""

# Ordering & Homepage Pinning (Optional)
order: 2 # Integer: lower numbers are displayed first (e.g., 1 before 2)
featured: true # Boolean: set to true to feature this project on the homepage

# Media Showcase, Recommended Limit between 6 to 12 images per project (Optional, omit if not applicable)
image: ""
gallery:
  - ""
  - ""
---

### Project Overview

This project is a fully customized, bare-metal operating system configuration and dotfiles ecosystem designed to eliminate desktop environment bloat. Built on top of Arch Linux and running the Wayland protocol, this workspace is tailor-made to streamline a heavy developer workflow. 

The core motivation was to establish a rock-solid, 100% keyboard-driven user experience while solving the notorious power-drain issues associated with running dedicated NVIDIA hardware on Linux laptops through granular, programmatic hardware control.

### System Architecture & Flow

The environment operates as a highly modular stack where independent system utilities, UI bars, and custom scripts communicate to provide a fluid, unified interface.

1. **Core Operating System & Compositor**: Arch Linux serves as the rolling-release foundation. The visual workspace is driven by Hyprland, a dynamic tiling Wayland compositor that enforces a strict keyboard-centric workflow via explicit window layout routing (`windowrule` directives) and handles plug-and-play multi-monitor configuration.
2. **Modular UI & Notification Layer**: The visual shell is completely decentralized. Real-time system telemetry and hardware metrics are handled by customized `Waybar` layouts, system alerts are intercepted and formatted by `SwayNC` (Sway Notification Center), and application launching or power menus are bound to custom `Rofi` applets.
3. **Terminal Workspace & Shell Environment**: The primary text interface couples the GPU-accelerated `Kitty` terminal emulator with the interactive `Fish` shell. Visual prompts are kept uniform using `Starship`, while custom shell/Bash utilities index and search directories instantaneously via fuzzy-finding scripts.
4. **Hardware Daemons & Maintenance Pipeline**: System-level automation scripts run in the background. Custom Python scripts hook into low-level graphics subsystems to handle NVIDIA GPU undervolting and dynamic power-state toggling, while automated cron jobs execute file backup pipelines and refresh fast pacman mirrors via `reflector.conf`.

### Key Technical Specifications

- **Workflow Efficiency**: Absolute mouse-free navigation achieved through custom-mapped Hyprland workspace anchoring and workspace rules.
- **Power Management**: Drastic reduction in idle power draw and thermal output on laptop hardware via custom Python/Bash GPU undervolting engines.
- **Resource Footprint**: Exceptionally low idle RAM usage compared to mainstream desktop environments (GNOME/KDE), preserving resources for heavy Docker or compilation workloads.
- **Privacy & System Hardening**: Network and browser level tracking mitigated through custom system configurations and automated Firefox `user.js` privacy deployments.

### Deployment & Usage

The entire desktop environment is version-controlled and can be symlinked onto a clean Arch Linux installation using an automated installation script.