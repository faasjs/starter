/* eslint-disable @typescript-eslint/no-var-requires */
const join = require('path').join

const tsconfig = require(join(process.env.FaasRoot, 'tsconfig.json'))

if (tsconfig.compilerOptions?.baseUrl && tsconfig.compilerOptions?.paths)
  require('tsconfig-paths').register({
    baseUrl: tsconfig.compilerOptions.baseUrl || '.',
    paths: tsconfig.compilerOptions.paths || {}
  })

require('ts-node').register({
  project: join(process.env.FaasRoot, 'tsconfig.json'),
  compilerOptions: { module: 'commonjs' },
  transpileOnly: true,
  typeCheck: false
})

process.env.FaasEnv = 'development'
process.env.FaasMode = 'local'

const Server = require('@faasjs/server').Server

const server = new Server(process.env.FaasRoot, { port: 3001 })

server.listen()
