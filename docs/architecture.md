# Architecture

See `.claude/context/architecture.md` for the AI-readable reference.

## Overview
{{PROJECT_NAME}} uses a {{PROJECT_PROFILE}}-scale architecture with JSON-RPC 2.0 for inter-service communication.

## Deployment Topology
See `infra/` for Docker, Kubernetes, and Terraform configurations.

## Observability
- Structured JSON logs (all services)
- Health checks: `GET /health` on every service
- Metrics: Prometheus-compatible `/metrics` endpoint (enterprise profile)
- Tracing: OpenTelemetry (enterprise profile)
