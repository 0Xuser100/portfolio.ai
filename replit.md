# Portfolio — Data & AI Engineer

## Overview

A dark, neon-themed portfolio website for a Data & AI Engineer. Ported from Lovable.dev into the Replit pnpm monorepo stack.

## Architecture

- **Frontend**: React + Vite app at `artifacts/portfolio/` (served at `/`)
- **Backend**: Express API server at `artifacts/api-server/` (served at `/api`)
- **AI**: OpenAI via Replit AI Integrations (`@workspace/integrations-openai-ai-server`)

## Key Features

- Hero, About, Skills, Projects, Contact sections
- Floating AI chatbot powered by GPT via `/api/chat` (SSE streaming)
- Dark neon design: cyan primary (#00e5ff), magenta accent, purple secondary
- Fonts: Inter (sans), Space Grotesk (display), JetBrains Mono (mono) via Google Fonts

## API Endpoints

- `GET /api/healthz` — health check
- `POST /api/chat` — AI chatbot (SSE streaming, body: `{ messages: [{role, content}] }`)

## Design Tokens (from `artifacts/portfolio/src/index.css`)

- Background: `232 30% 6%`
- Primary (cyan): `186 100% 55%`
- Accent (magenta): `295 100% 65%`
- Secondary (purple): `252 80% 60%`
- Radius: `0.85rem`

## Project Structure

```
artifacts/
  api-server/          # Express backend
    src/routes/
      chat.ts          # AI chatbot SSE endpoint
      health.ts        # Healthz
  portfolio/           # React+Vite frontend
    src/
      components/portfolio/   # Hero, About, Skills, Projects, Contact, Chatbot, Navbar
      components/ui/          # shadcn components
      pages/                  # Index, NotFound
lib/
  integrations-openai-ai-server/  # OpenAI SDK wrapper
  db/                              # Drizzle ORM (no tables needed for this app)
  api-spec/                        # OpenAPI spec
```

## Environment Variables

- `AI_INTEGRATIONS_OPENAI_BASE_URL` — Replit AI Integrations proxy URL (auto-provisioned)
- `AI_INTEGRATIONS_OPENAI_API_KEY` — dummy key for SDK compat (auto-provisioned)
- `DATABASE_URL` — PostgreSQL connection (provisioned by Replit, not actively used)
- `PORT` — assigned by workflow for each artifact
- `BASE_PATH` — URL base path for Vite (assigned by workflow)

## Development

Workflows start automatically. Do not run `pnpm dev` at the workspace root.
- Portfolio frontend: workflow `artifacts/portfolio: web`
- API server: workflow `artifacts/api-server: API Server`
