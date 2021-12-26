# FaasJS Starter

[![Api-Unit](https://github.com/faasjs/starter/actions/workflows/api-unit.yml/badge.svg)](https://github.com/faasjs/starter/actions/workflows/api-unit.yml)
[![Www-Unit](https://github.com/faasjs/starter/actions/workflows/www-unit.yml/badge.svg)](https://github.com/faasjs/starter/actions/workflows/www-unit.yml)

A starter template for [FaasJS](https://faasjs.com).

## System Requirements

- Latest stable **macOS**
- Latest stable **Docker** https://www.docker.com/
- Latest stable **Visual Studio Code** https://code.visualstudio.com/
  - With shell command (Open Visual Studio Code, click `⇧⌘P`, then choose `Shell Command: Install 'code' command in PATH`)
  - Install Remote plugins: `code --install-extension ms-vscode-remote.remote-containers`

## Setup

1. Run `code starter.code-workspace` to start VS Code.
2. In VS Code, click `F1` then choose `Remote-Containers: Reopen in Container`.
3. In VS Code, open a new terminal `ni && nd` (shorten command of `npm install && npm run dev`).
4. Open `http://localhost:3000/` in browser.

## Test

`nt` (shorten command of `npm run test`)
