# Security

## Supported versions

Security fixes are applied on the default branch. This is a demo/reference agent, not a production service.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security-sensitive reports.

If you find a vulnerability, email the repository maintainer privately with:

- A description of the issue
- Steps to reproduce
- Impact assessment (if known)

## Secrets and deployment

- Never commit `.env.local` or real API keys. Use `.env.example` as a template only.
- Refund tooling in this repo is for demonstration; `issue_refund` requires human approval in dev and must be reviewed before any production use.
- MCP local dev auth (`agent/channels/mcp.ts`) is intended for development, not public internet exposure without proper authentication.
