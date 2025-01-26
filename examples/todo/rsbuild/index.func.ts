import { useMiddleware } from '@faasjs/server'
import { renderHtml } from './rsbuildServer'

export default useMiddleware(renderHtml)
