import type { IncomingMessage, ServerResponse } from 'node:http'
import { createServer } from 'vite'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import type { Logger } from '@faasjs/logger'
import { staticHandler } from '@faasjs/server'
import viteConfig from './vite.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const viteServer = await createServer({
  ...viteConfig,
  server: { middlewareMode: true },
  appType: 'custom',
})

export async function renderHtml(
  req: IncomingMessage,
  res: ServerResponse,
  logger: Logger
) {
  const prebuiltPath = `${__dirname}/dist/index.html`

  if (existsSync(prebuiltPath)) {
    logger.debug('Using prebuilt file', prebuiltPath)

    res.writeHead(200, {
      'Content-Type': 'text/html',
    })

    res.end(readFileSync(
      prebuiltPath,
      'utf-8'
    ).toString())
    return
  }

  let template = readFileSync(`${__dirname}/../src/index.html`, 'utf-8')
  template = await viteServer.transformIndexHtml(req.url, template)
  const render = (
    await viteServer.ssrLoadModule(`${__dirname}/../src/entry-server.tsx`)
  ).render
  const rendered = await render(req.url)

  const html = template.replace('<!--app-html-->', rendered.html ?? '')

  res.writeHead(200, {
    'Content-Type': 'text/html',
  })

  res.end(html)
}

export async function handle(
  req: IncomingMessage,
  res: ServerResponse,
  logger: Logger
) {
  const prebuiltPath = `${__dirname}/dist/assets/` as `${string}/`

  if (existsSync(prebuiltPath)) {
    logger.debug('Using prebuilt file', prebuiltPath)
    req.url = req.url?.replace('/examples/todo/vite/assets/', '/')
    await staticHandler({
      root: prebuiltPath,
    })(req as any, res, logger)
    return
  }

  await new Promise(resolve => viteServer.middlewares(req, res, resolve))
}
