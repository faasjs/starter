import { readFileSync } from 'node:fs'
import { afterAll, beforeAll, beforeEach } from 'vitest'
import { knex } from 'knex'
import PgliteDialect from 'knex-pglite'

const globalWithFaasKnex = global as typeof global & {
  FaasJS_Knex?: Record<
    string,
    {
      adapter: ReturnType<typeof knex>
      query: ReturnType<typeof knex>
      config: Record<string, unknown>
    }
  >
}

if (!process.env.SECRET_HTTP_COOKIE_SESSION_SECRET)
  process.env.SECRET_HTTP_COOKIE_SESSION_SECRET = 'secret'

const SCHEMA_FILE_PATH = `${__dirname}/schema.sql`
const CREATE_UUID_GENERATE_V4_SQL = `
CREATE OR REPLACE FUNCTION uuid_generate_v4()
RETURNS TEXT AS $$
SELECT
  LOWER(
    LPAD(TO_HEX(FLOOR(EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT), 12, '0') ||
    LPAD(TO_HEX((RANDOM() * 65535)::BIGINT), 4, '0') ||
    LPAD(TO_HEX((RANDOM() * 65535)::BIGINT), 4, '0') ||
    LPAD(TO_HEX((RANDOM() * 65535)::BIGINT), 4, '0') ||
    LPAD(TO_HEX((RANDOM() * 281474976710655)::BIGINT), 12, '0')
  )
$$ LANGUAGE SQL IMMUTABLE;
`

let db: ReturnType<typeof knex>

beforeAll(async () => {
  db = knex({
    client: PgliteDialect,
    connection: {},
  })

  const schema = readFileSync(SCHEMA_FILE_PATH, 'utf8').replace(
    /CREATE EXTENSION IF NOT EXISTS "uuid-ossp";\s*/i,
    ''
  )

  await db.raw(CREATE_UUID_GENERATE_V4_SQL)
  await db.raw(schema)

  if (!globalWithFaasKnex.FaasJS_Knex) {
    globalWithFaasKnex.FaasJS_Knex = {}
  }

  globalWithFaasKnex.FaasJS_Knex.knex = {
    adapter: db,
    query: db,
    config: {},
  }
})

beforeEach(async () => {
  await db('todo_items').delete()
})

afterAll(async () => {
  await db.destroy()
  if (globalWithFaasKnex.FaasJS_Knex) {
    delete globalWithFaasKnex.FaasJS_Knex.knex
  }
})
