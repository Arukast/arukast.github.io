---
title: "High-Throughput Webhook API Queue"
description: "A highly-optimized Go API designed to ingest millions of incoming event webhooks safely. Standard architectures often choke under spikes. This pipeline decouples HTTP request handling from the business processing layer by dumping tasks straight into an indexed Redis Stream, consumed asynchronously by a swarm of lightweight Go background processes."
status: "PRODUCTION"
category: "Go Router & Queue"
tags: ["Golang", "Redis Clusters", "Docker", "Prometheus"]
githubUrl: "https://github.com"
architecture: ["Client Payload", "Go REST API", "Redis Buffer", "Worker Swarm"]
icon: "fa-cube"
image: "/images/projects/api_queue.png"
gallery:
  - "/images/projects/api_queue.png"
  - "/images/projects/debian_hardening.png"
  - "/images/projects/ingress_tunnel.png"
---

### Project Overview

This project implements an enterprise-grade ingestion system optimized for raw throughput and horizontal scalability. Traditional HTTP endpoints often suffer from high database locking contention and out-of-memory errors when processing bursts of webhooks synchronously. 

This architecture decouples the synchronous HTTP interface from asynchronous business processing by streaming workloads into Redis cluster nodes.

### System Architecture Flow

The following schematic outlines the processing path:

1. **Client Payload**: The webhook payload enters the system via a secure, rate-limited TLS connection.
2. **Go REST API**: Built using a lightweight router with minimal heap allocations. The router validates the payload and pushes it onto an active Redis stream.
3. **Redis Buffer**: Acting as an elastic buffer, Redis guarantees zero payload loss during downstream system degradation.
4. **Worker Swarm**: A configurable swarm of background workers poll from the Redis consumer group and batch-write to transactional storage.

### Key Technical Specs

- **Throughput**: Validated up to 45,000 requests per second under CPU constraints.
- **Backpressure Handling**: Automatically dials down consumer swarm speeds if database write latency exceeds 15ms.
- **Telemetry**: Exposes Prometheus metrics tracking queue length, processing duration, and error codes.
