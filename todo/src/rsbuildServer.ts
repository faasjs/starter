import { createRsbuild, loadConfig } from '@rsbuild/core'
import { resolve } from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

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

export async function renderHtml() {
  if (!rsbuildServer) await init()

  const indexModule =
    await rsbuildServer.environments.ssr.loadBundle<any>('index')

  const template =
    await rsbuildServer.environments.web.getTransformedHtml('index')

  return template.replace('<!--app-content-->', indexModule.render().html)
}

export async function handle(req: IncomingMessage, res: ServerResponse) {
  if (!rsbuildServer) await init()

  await new Promise(resolve => {
    rsbuildServer.middlewares.handle(req, res, resolve)
  })
}
