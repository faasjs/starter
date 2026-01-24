import { join } from 'node:path'
import { afterAll, beforeEach, vi } from 'vitest'

if (globalThis.window) {
  Object.defineProperty(globalThis.window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
} else {
  const { loadConfig } = await import('@faasjs/load')
  const { readFileSync } = await import('node:fs')
  const { default: knex } = await import('knex')
  const { useHttp } = await import('@faasjs/http')
  const { useKnex } = await import('@faasjs/knex')

  if (!process.env.SECRET_HTTP_COOKIE_SESSION_SECRET)
    process.env.SECRET_HTTP_COOKIE_SESSION_SECRET = 'secret'

  const config = loadConfig(join(__dirname, 'src'), '', 'testing')

  let schema: string
  let tables: string[]

  function log(message: string) {
    process.stdout.write(`${message}\n`)
  }

  beforeEach(async () => {
    if (!schema) {
      schema = readFileSync(`${__dirname}/schema.sql`).toString()

      const db = knex({
        client: 'pg',
        connection: process.env.SECRET_KNEX_CONNECTION as string,
      })

      await db.raw('DROP SCHEMA IF EXISTS public CASCADE;CREATE SCHEMA public;')
      await db.raw(schema)
      await db.destroy()

      await useHttp().mount()
      await useKnex({
        config: config.plugins!.knex.config!,
      }).mount()
    }

    try {
      const db = knex({
        client: 'pg',
        connection: process.env.SECRET_KNEX_CONNECTION as string,
      })

      if (!tables)
        tables = await db('pg_tables')
          .where('schemaname', '=', 'public')
          .pluck('tablename')

      await db.raw(tables.map(t => `TRUNCATE ${t} RESTART IDENTITY`).join(';'))
      await db.destroy()
    } catch (error: any) {
      log(error?.message)
    }
  })

  afterAll(async () => {
    await useKnex().quit()
  })
}
