import { useMiddleware } from '@faasjs/server'
import { handle } from './rsbuildServer'

export default useMiddleware(handle)
