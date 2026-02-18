# FaasJS Starter

[![Testing](https://github.com/faasjs/starter/actions/workflows/testing.yml/badge.svg)](https://github.com/faasjs/starter/actions/workflows/testing.yml)

A starter template for [FaasJS](https://faasjs.com).

## Quick Start with codespace

1. Click `Code` -> `Codespaces` -> `Create codespace on main`.
2. Wait for the codespace to be created.
3. In VS Code, open a new terminal and run `ni && nd` (shorten command of `npm install && npm run dev`).
4. Enjoy!

## Run Locally with macOS

### System Requirements

- Latest stable **macOS**
- Latest stable **Docker** https://www.docker.com/
- Latest stable **Visual Studio Code** https://code.visualstudio.com/

### Setup

1. Use VS Code to open project.
2. Install VS Code extension: `ms-vscode-remote.vscode-remote-extensionpack`.
3. In VS Code, click `F1` then choose `Remote-Containers: Reopen in Container`.
4. In VS Code, open a new terminal `ni && nd` (shorten command of `npm install && npm run dev`).
5. Open `http://localhost:5173/` in browser.

### Test

Run `nt` (shorten command of `npm run test`).

Run `npm run test:types` to check action params/data type inference regressions.

`npm run ci` runs coverage with the Node binary next to `npm`, avoiding Bun `node` shims that do not support V8 coverage APIs.

Tests use embedded PGlite in Node test setup, so no external PostgreSQL service is required for local runs.

### Development Database

- `src/faas.yaml` sets `defaults.plugins.knex.config.client` to `pg` with a default pool.
- `development.plugins.knex.config.client` uses `pglite` with persisted storage at `./.pglite_dev`.
- `testing.plugins.knex.config.client` uses `pglite` in-memory (no `connection`).
- `production` still uses PostgreSQL (`client: pg`).
- Run `npm run migrate:latest` to apply pending migrations (prints batch and files).
- Run `npm run migrate:rollback` to rollback the latest migration batch (prints batch and files).
- Run `npm run migrate:status` to print pending migration count.
- Run `npm run migrate:current` to print current migration version.
- Run `npm run migrate:make -- create_todo_items` to generate a migration file in `src/db/migrations`.

### Type Generation

- Run `npm run typegen` to generate action/event types into `src/.faasjs/types.d.ts`.
- `npm run dev` uses `viteFaasJsServer()`, which auto-generates on startup and regenerates when `.func.ts` or `src/faas.yaml` changes.

### Preview

1. Run `nb` (shorten command of `npm run build`) to build the frontend by Vite.
2. Run `nr server` (shorten command of `npm run server`) to start the server.
3. Open `http://localhost:3000/` in browser.

## Zero-mapping API routing

FaasJS Starter follows the zero-mapping rule: API file path equals API route path.

- File: `src/pages/todo/api/list.func.ts`
- Client action: `/pages/todo/api/list`
- Request URL (with `baseUrl: '/'`): `POST /pages/todo/api/list`

Use action paths with a leading slash (for example: `/pages/todo/api/list`) so TypeScript can match generated `FaasActions` keys.

Use `api/` as the API directory name. Avoid custom rewrites such as `actions -> api`.

### Deploy

#### with Docker

1. Run `docker build -t faasjs-starter .` to build the Docker image.
2. Run `docker run -p 3000:3000 faasjs-starter` to start the container.
3. Open `http://localhost:3000/` in browser.

#### locally

Same as preview.
