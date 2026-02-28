# ApexTrust Banking

Institutional-grade white-label bitcoin banking platform demo. This repo now includes:

- a static SPA in `app/index.html`
- a NestJS API in `apps/api`
- dockerized PostgreSQL + API for local backend scaffolding

## Repository Layout

```text
app/                 # Static SPA
  index.html
  config.js          # Runtime API base config for static hosting
apps/api/            # NestJS backend scaffold
  src/main.ts
  src/app.controller.ts
  src/cors.middleware.ts
docker-compose.yml   # Local postgres + api stack
.env.example         # Shared env template
codebase.yaml        # Minimal service manifest
```

## Local Development (Docker)

1. Copy env vars:

```bash
cp .env.example .env
```

2. Start API + Postgres:

```bash
docker compose up --build
```

3. Verify backend endpoints:

```bash
curl http://localhost:7072/api/hello
curl http://localhost:7072/api/health
```

Expected:

- `/api/hello` → `{"message":"Hello from NestJS (dev starter)."}`
- `/api/health` → `{"ok":true}`

## Strict CORS Preflight Example

Only origins in `CORS_ALLOWED_ORIGINS` are allowed.

```bash
curl -i -X OPTIONS http://localhost:7072/api/hello \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET"
```

Expected for allowed origin:

- `HTTP/1.1 204 No Content`
- `Access-Control-Allow-Origin: http://localhost:3000`
- no wildcard CORS

## Running the SPA Locally

Serve the SPA with any static server (recommended for browser CORS behavior):

```bash
python3 -m http.server 3000 --directory app
```

Open <http://localhost:3000>.

### Setting API base URL (static build)

`app/index.html` reads runtime config from `app/config.js` using this precedence:

1. `NEXT_PUBLIC_API_BASE_URL`
2. `APP_API_BASE_URL`
3. fallback `http://localhost:7072`

For static deployments, set one of those values in `window.__APP_CONFIG__` before app boot.

## Running API without Docker

```bash
cd apps/api
npm install
PORT=7072 \
CORS_ALLOWED_ORIGINS=http://localhost:3000 \
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nexus_financial?schema=public \
npm run start:dev
```

## Notes

- API framework: NestJS (npm-based setup)
- Security middleware: `helmet`
- CORS strategy: strict allowlist from `CORS_ALLOWED_ORIGINS` (comma-separated)
