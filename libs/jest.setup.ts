if (globalThis.window) {
  Object.defineProperty(globalThis.window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
} else {
  const { loadConfig } = require('@faasjs/load')
  const { readFileSync } = require('node:fs')
  const knex = require('knex')
  const { useHttp } = require('@faasjs/http')
  const { useKnex } = require('@faasjs/knex')

  if (!process.env.SECRET_KNEX_CONNECTION)
    process.env.SECRET_KNEX_CONNECTION = `postgresql://testing@pg_testing${process.env.JEST_WORKER_ID}/testing`

  if (!process.env.SECRET_HTTP_COOKIE_SESSION_SECRET)
    process.env.SECRET_HTTP_COOKIE_SESSION_SECRET = 'secret'

  const config = loadConfig(`${__dirname}/..`, '', 'testing')

  let schema: string
  let tables: string[]

  function log(message: string) {
    process.stdout.write(`${message}\n`)
  }

  global.beforeEach(async () => {
    if (!schema) {
      schema = readFileSync(`${__dirname}/../schema.sql`).toString()

      const db = knex({
        client: 'pg',
        connection: process.env.SECRET_KNEX_CONNECTION,
      })

      await db.raw('DROP SCHEMA IF EXISTS public CASCADE;CREATE SCHEMA public;')
      await db.raw(schema)
      await db.destroy()

      await useHttp().mount()
      await useKnex({
        config: config.plugins.knex.config,
      }).mount()
    }

    try {
      const db = knex({
        client: 'pg',
        connection: process.env.SECRET_KNEX_CONNECTION,
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

  global.afterAll(async () => {
    await useKnex().quit()
  })
}
