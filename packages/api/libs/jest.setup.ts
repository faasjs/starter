import { loadConfig } from '@faasjs/load'
import { readFileSync } from 'fs'
import knex from 'knex'
import { useCloudFunction } from '@faasjs/cloud_function'
import { useHttp } from '@faasjs/http'
import { useKnex } from '@faasjs/knex'

if (!process.env.SECRET_KNEX_CONNECTION)
  process.env.SECRET_KNEX_CONNECTION = `postgresql://testing@pg_testing${process.env.JEST_WORKER_ID}/testing`

if (!process.env.SECRET_HTTP_COOKIE_SESSION_SECRET)
  process.env.SECRET_HTTP_COOKIE_SESSION_SECRET = 'secret'

const config = loadConfig(process.cwd(), '')['testing']
let schema
let tables

function log (message:string) {
  process.stdout.write(message + '\n')
}

global.beforeEach(async function () {
  if (!schema) {
    schema = readFileSync(__dirname + '/../schema.sql').toString()

    const db = knex({
      client: 'pg',
      connection: process.env.SECRET_KNEX_CONNECTION
    })

    await db.raw('DROP SCHEMA IF EXISTS public CASCADE;CREATE SCHEMA public;')
    await db.raw(schema)
    await db.destroy()

    await useCloudFunction({ config })
    await useHttp().mount({ config })
    await useKnex().mount({ config })
  }

  try {
    const db = knex({
      client: 'pg',
      connection: process.env.SECRET_KNEX_CONNECTION
    })

    if (!tables) tables = await db('pg_tables')
      .where('schemaname', '=', 'public')
      .pluck('tablename')

    await db.raw(tables.map(t => `TRUNCATE ${t} RESTART IDENTITY`).join(';'))
    await db.destroy()
  } catch (error) {
    log(error?.message)
  }
})
