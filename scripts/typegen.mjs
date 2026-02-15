import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { execSync } from 'node:child_process'

const TYPES_FILE = resolve('src/.faasjs/types.d.ts')
const SOURCE = "Parameters<ReturnType<TFunc['export']>['handler']>[0]['params']"
const TARGET =
  "NonNullable<Parameters<ReturnType<TFunc['export']>['handler']>[0]>['params']"

execSync('faas-types', { stdio: 'inherit' })

const content = readFileSync(TYPES_FILE, 'utf8')

if (content.includes(TARGET)) {
  process.exit(0)
}

if (!content.includes(SOURCE)) {
  throw new Error(`Cannot find params type pattern in ${TYPES_FILE}`)
}

writeFileSync(TYPES_FILE, content.replace(SOURCE, TARGET))
