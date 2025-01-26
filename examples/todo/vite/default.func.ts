import { useMiddleware } from '@faasjs/server'
import { handle } from './viteServer'

export default useMiddleware(handle)
