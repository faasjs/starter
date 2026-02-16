import { execSync } from 'node:child_process'

execSync('faas-types', { stdio: 'inherit' })
