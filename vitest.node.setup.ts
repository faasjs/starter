import { join } from 'node:path'
import { afterAll, beforeEach } from 'vitest'
import { loadConfig } from '@faasjs/load'
import { readFileSync } from 'node:fs'
import { knex } from 'knex'
import { useHttp } from '@faasjs/http'
import { useKnex } from '@faasjs/knex'

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
      // biome-ignore lint/style/noNonNullAssertion:
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
  } catch (error) {
    log((error as Error)?.message)
  }
})

afterAll(async () => {
  await useKnex().quit()
})
