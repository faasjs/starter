import { useMiddleware } from '@faasjs/server'
import { renderHtml } from './viteServer'

export default useMiddleware(renderHtml)
