# Deployment

## GitHub Pages (project site)
- Vite base is `/project-keystone/` in production.
- SPA fallback via `404.html` uses `?/path` redirect; `client/index.html` decodes it.
- Workflow builds to `dist/public` and deploys that folder to Pages.

## Steps
1. Push to `main`.
2. GitHub Action runs `vite build`, copies `404.html` to `dist/public`, then deploys.
3. Site at: `https://<user>.github.io/project-keystone/`.

## Static API
- Place JSON/PNG under `client/public/api/`.
- Client resolver maps `/api/*` → `/project-keystone/api/*.json` and adds a cache-buster.

## Troubleshooting
- Deep-link 404 or loops → verify `base` in `vite.config.ts` and ensure `404.html` is included in the deployed output.
- Stale JSON → filenames/case on Pages; cache-buster in client is enabled.
- Assets broken → paths must include `/project-keystone/` prefix on Pages.
