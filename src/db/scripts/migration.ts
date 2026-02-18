import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { KnexSchema, type OriginKnex, useKnex } from '@faasjs/knex'
import { loadConfig } from '@faasjs/node-utils'

const __filename = fileURLToPath(import.meta.url)
const srcRoot = join(dirname(__filename), '../../..')

function formatMigrationFiles(files: unknown): string {
  if (!Array.isArray(files) || files.length === 0) return '(none)'

  return files.join(', ')
}

async function main(): Promise<void> {
  const staging = process.env.FaasEnv || 'development'
  const config = loadConfig(srcRoot, __filename, staging)
  const knexConfig = config.plugins?.knex?.config as
    | OriginKnex.Config
    | undefined

  if (!knexConfig)
    throw Error(
      `[migrate:make] Missing knex config in faas.yaml for staging "${staging}"`
    )
  const knex = useKnex({
    config: knexConfig,
  })

  await knex.mount()

  const schema = new KnexSchema(knex)
  const action = process.argv[2]?.trim()

  if (!action)
    throw Error(
      '[migrate] Missing action. Usage: npm run migrate:latest|migrate:rollback|migrate:status|migrate:current|migrate:make -- [name]'
    )

  try {
    switch (action) {
      case 'latest': {
        const [batch, files] = await schema.migrateLatest()
        console.log(`batch: ${batch}`)
        console.log(`files: ${formatMigrationFiles(files)}`)
        break
      }
      case 'rollback': {
        const [batch, files] = await schema.migrateRollback()
        console.log(`batch: ${batch}`)
        console.log(`files: ${formatMigrationFiles(files)}`)
        break
      }
      case 'status': {
        console.log(await schema.migrateStatus())
        break
      }
      case 'current': {
        console.log(await schema.migrateCurrentVersion())
        break
      }
      case 'make': {
        const name = process.argv[3]?.trim()

        if (!name)
          throw Error(
            '[migrate:make] Missing migration name. Usage: npm run migrate:make -- create_users'
          )

        const filePath = await schema.migrateMake(name)
        console.log(filePath)
        break
      }
      default:
        throw Error(
          `[migrate] Unknown action "${action}". Supported actions: latest, rollback, status, current, make`
        )
    }
  } finally {
    await knex.quit()
  }
}

await main().catch(error => {
  console.error(error)
  process.exit(1)
})
