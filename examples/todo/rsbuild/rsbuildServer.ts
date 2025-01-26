import { createRsbuild, loadConfig } from '@rsbuild/core'
import { dirname, resolve } from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import type { Logger } from '@faasjs/logger'
import { staticHandler } from '@faasjs/server'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

let rsbuildServer: Awaited<
  ReturnType<Awaited<ReturnType<typeof createRsbuild>>['createDevServer']>
>

async function init() {
  const rsbuild = await createRsbuild({
    rsbuildConfig: (
      await loadConfig({
        path: resolve(__dirname, 'rsbuild.config.ts'),
      })
    ).content,
  })

  rsbuildServer = await rsbuild.createDevServer()
}

export async function renderHtml(_: IncomingMessage, res: ServerResponse, logger: Logger) {
  const prebuiltPath = resolve(__dirname, 'dist/server/index.js')

  if (existsSync(prebuiltPath)) {
    logger.debug('Using prebuilt file', prebuiltPath)
    const template = readFileSync(resolve(__dirname, 'dist/index.html')).toString()
    const { render } = require(prebuiltPath)

    res.writeHead(200, {
      'Content-Type': 'text/html',
    })

    res.end(template.replace('<!--app-content-->', render()))

    return
  }

  if (!rsbuildServer) await init()

  const indexModule =
    await rsbuildServer.environments.ssr.loadBundle<any>('index')

  const template =
    await rsbuildServer.environments.web.getTransformedHtml('index')

  res.writeHead(200, {
    'Content-Type': 'text/html',
  })

  res.end(template.replace('<!--app-content-->', indexModule.render()))
}

export async function handle(req: IncomingMessage, res: ServerResponse, logger: Logger) {
  const prebuiltPath = `${__dirname}/dist/static/` as `${string}/`
  if (existsSync(prebuiltPath)) {
    logger.debug('Using prebuilt file', prebuiltPath)

    req.url = req.url.replace('/examples/todo/rsbuild/static/', '/')

    await staticHandler({
      root: prebuiltPath,
    })(req as any, res, logger)

    return
  }

  if (!rsbuildServer) await init()

  await new Promise(resolve => {
    rsbuildServer.middlewares.handle(req, res, resolve)
  })
}
