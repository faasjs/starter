import { createRsbuild, loadConfig } from '@rsbuild/core'
import { resolve } from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { existsSync, readFileSync } from 'node:fs'

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
  const prebuiltPath = resolve(__dirname, 'dist/server/index.js')

  if (existsSync(prebuiltPath)) {
    console.log('Using prebuilt file', prebuiltPath)
    const template = readFileSync(resolve(__dirname, 'dist/index.html')).toString()
    const { render } = await import(prebuiltPath)
    return template.replace('<!--app-content-->', render())
  }

  if (!rsbuildServer) await init()

  const indexModule =
    await rsbuildServer.environments.ssr.loadBundle<any>('index')

  const template =
    await rsbuildServer.environments.web.getTransformedHtml('index')

  return template.replace('<!--app-content-->', indexModule.render())
}

export async function handle(req: IncomingMessage, res: ServerResponse) {
  if (req.url.includes('/static/')) {
    const prebuiltPath = resolve(
      __dirname + req.url.replace('/examples/todo/static/', '/dist/static/')
    )
    if (existsSync(prebuiltPath)) {
      console.log('Using prebuilt file', prebuiltPath)
      res.end(readFileSync(prebuiltPath).toString())
      return
    }
  }

  if (!rsbuildServer) await init()

  await new Promise(resolve => {
    rsbuildServer.middlewares.handle(req, res, resolve)
  })
}
