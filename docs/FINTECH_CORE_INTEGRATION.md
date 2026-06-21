# Fintech Core Integration

## Architecture

The browser-facing SPA calls the NestJS API. The NestJS API performs read-only health probes against `fintech-microservices-core`.

```text
Browser SPA -> Nexus NestJS API -> Fintech FastAPI core
```

The browser does not call the Python core directly.

## Configuration

Set these values for the Nexus API:

```text
FINTECH_CORE_API_URL=http://localhost:8000
CORE_REQUEST_TIMEOUT_MS=5000
```

The status endpoint is:

```text
GET /api/system/status
```

It reports whether the core URL is configured, whether the core is reachable, the upstream health response, and the enforced Nexus safety state.

## Current boundary

This integration intentionally supports read-only health and gateway metadata only. It does not proxy card issuance, funding, internal transfer, or webhook routes.

The write boundary stays disabled until all of these are complete:

1. The core protects every financial write route with authenticated gateway access.
2. Nexus has real user authentication and role authorization.
3. Request validation, rate limits, audit logging, and idempotency are tested end to end.
4. Sandbox card and conversion flows pass CI and deployment checks.
5. Security and compliance review approve the exact provider contract.
6. Live mode receives a separate explicit owner approval.

## Verification

From the Nexus API directory:

```bash
npm install
npm test
npm run start:dev
```

Then request:

```bash
curl http://localhost:7072/api/health
curl http://localhost:7072/api/system/status
```

A missing or unreachable core returns a degraded status response instead of enabling fallback financial behavior.
