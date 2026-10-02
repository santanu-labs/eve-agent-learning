# pears-agentic

Demo [eve](https://eve.dev) agent for order lookup, refunds, support triage, and MCP integration. Sample data only — not a production storefront.

## Features

- **Orders** — `search_orders` / `get_order` over a local `ORD-*` catalog; optional [Swagger Petstore](https://petstore.swagger.io/) connection
- **Refunds** — Policy checks (`audit_refund`), human-approved `issue_refund`, and a `refund_auditor` subagent
- **Support** — Ticket classification and review subagents; sample tickets in `data/`
- **Workflows** — Durable `watch_order` background monitoring
- **Channels** — MCP (`/mcp`) for Cursor and other MCP clients; Slack channel scaffold
- **Ops** — Audit logging hook, daily sales report schedule, evals under `evals/`

## Prerequisites

- [Node.js 24.x](https://nodejs.org/)
- An OpenAI-compatible API (e.g. [Vercel AI Gateway](https://vercel.com/docs/ai-gateway))

## Setup

```bash
npm install
cp .env.example .env.local
# Edit .env.local — set OPENAI_API_KEY, OPENAI_BASE_URL, OPENAI_MODEL
npm run dev
```

The dev TUI starts an interactive session. Edit behavior in `agent/instructions.md` and capabilities under `agent/`.

## MCP (Cursor)

With `npm run dev` running, point an MCP client at the agent:

```json
{
  "mcpServers": {
    "order-agent": {
      "url": "http://localhost:2000/mcp"
    }
  }
}
```

See [`.cursor/mcp.json.example`](.cursor/mcp.json.example). MCP uses local dev auth — do not expose `/mcp` to the public internet without hardening.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server + TUI |
| `npm run build` | Production build |
| `npm run deploy` | Deploy to Vercel (`eve deploy`) |
| `npm run eval` | Run agent evals |
| `npm run typecheck` | TypeScript check |

## Project layout

| Path | Purpose |
|------|---------|
| `agent/` | Instructions, tools, subagents, channels, schedules |
| `lib/` | Shared order/refund/budget logic |
| `data/` | Sample tickets and job definitions |
| `evals/` | Deterministic agent tests |

## Publishing to GitHub

This repo is set up for public open source:

- Secrets stay in `.env.local` (gitignored); commit only `.env.example`
- Runtime output goes to `logs/` and `reports/` (gitignored)
- `.eve/` and `node_modules/` are gitignored

```bash
git init -b main
git add -A
git status   # confirm .env.local and .eve are not staged
git commit -m "Initial public release"
gh repo create pears-agentic --public --source=. --push
```

Replace the repo name and use your preferred GitHub flow if you do not use the GitHub CLI.

## Deploy on Vercel

```bash
eve deploy
```

Set environment variables in the Vercel project to match `.env.example`. See [eve deployment docs](https://eve.dev/docs/guides/deployment/vercel).

## License

MIT — see [LICENSE](LICENSE).

## Learn more

- [eve documentation](https://eve.dev/docs)
- [Build an Agent tutorial](https://eve.dev/docs/tutorial/first-agent)
- [eve on GitHub](https://github.com/vercel/eve)
