import { type Knex, KnexSchema, type OriginKnex, useKnex } from '@faasjs/knex'
import { loadConfig } from '@faasjs/node-utils'
import { afterAll, beforeAll, beforeEach } from 'vitest'

if (!process.env.SECRET_HTTP_COOKIE_SESSION_SECRET)
  process.env.SECRET_HTTP_COOKIE_SESSION_SECRET = 'secret'

let db: Knex | undefined

beforeAll(async () => {
  const config = loadConfig('./src', '', 'testing')
  const knexConfig = config.plugins?.knex?.config as
    | OriginKnex.Config
    | undefined

  if (!knexConfig)
    throw Error(`[migrate:make] Missing knex config in faas.yaml for testing`)
  const db = useKnex({
    config: knexConfig,
  })

  await db.mount()

  const schema = new KnexSchema(db)

  await schema.migrateLatest()
})

beforeEach(async () => {
  await db?.query('todo_items').delete()
})

afterAll(async () => {
  await db?.quit()
})
