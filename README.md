# HackWave

## Overview

`v0-sync-sphere-event-app/` contains a Next.js 14 project generated from v0.app. This README explains how to run it locally and how to deploy the app to [Railway](https://railway.app).

## Prerequisites

- Node.js 18.17+ (recommended 20.x)
- `pnpm` 9+ (or use `npm`/`yarn` with equivalent commands)

## Local development

From the repository root:

```bash
cd v0-sync-sphere-event-app
pnpm install
pnpm dev
```

The development server runs on `http://localhost:3000` by default.

## Deploying to Railway

1. **Create a new Railway project.** Choose “Deploy from GitHub” and connect this repository.
2. **Set the service root.** When prompted for the project root (monorepo setup), enter `v0-sync-sphere-event-app`.
3. **Configure install/build/start commands.** In the Railway service settings, set:
   - Install command: `pnpm install`
   - Build command: `pnpm run build`
   - Start command: `pnpm run start -- --hostname 0.0.0.0 --port $PORT`
4. **Ensure buildpack detection.** The repository now includes `v0-sync-sphere-event-app/requirements.txt` and `v0-sync-sphere-event-app/Procfile` so Railway picks the correct installer and launch command.
5. **Environment variables (optional).** Add any required `NEXT_PUBLIC_*` or server-side secrets under the Environment tab. No defaults are required for the base app.
6. **Deploy.** Railway will install dependencies, run the build, and start the Next.js server listening on the provided `$PORT` using the Procfile definition.

> **Tip:** If you prefer `npm`, use `npm install`, `npm run build`, and `npm run start -- --hostname 0.0.0.0 --port $PORT`.

## Useful scripts

- `pnpm dev` — start local dev server with hot reloading
- `pnpm build` — generate production build
- `pnpm start` — serve the production build (Railway uses this with the `--port $PORT` flag)

## Troubleshooting

- Ensure `PNPM_HOME` is on the PATH when Railway installs dependencies.
- Check the Railway Logs tab if the service fails to boot; confirm the start command includes `--port $PORT` so Next.js binds to the supplied port.
- For environment variable issues, re-run the deployment after adding them to Railway.
