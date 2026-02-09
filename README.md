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

Tests use embedded PGlite in Node test setup, so no external PostgreSQL service is required for local runs.

### Preview

1. Run `nb` (shorten command of `npm run build`) to build the frontend by Vite.
2. Run `nr server` (shorten command of `npm run server`) to start the server.
3. Open `http://localhost:3000/` in browser.

## Zero-mapping API routing

FaasJS Starter follows the zero-mapping rule: API file path equals API route path.

- File: `src/pages/todo/api/list.func.ts`
- Client action: `todo/api/list`
- Request URL (with `baseUrl: '/pages/'`): `POST /pages/todo/api/list`

Use `api/` as the API directory name. Avoid custom rewrites such as `actions -> api`.

### Deploy

#### with Docker

1. Run `docker build -t faasjs-starter .` to build the Docker image.
2. Run `docker run -p 3000:3000 faasjs-starter` to start the container.
3. Open `http://localhost:3000/` in browser.

#### locally

Same as preview.
