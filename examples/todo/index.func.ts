import { useFunc } from '@faasjs/func'
import { useHttp } from '@faasjs/http'

export default useFunc(() => {
  const http = useHttp()

  return async () => {
    const { renderHtml } = await import('./rsbuildServer')

    http.setContentType('html')
    http.setBody(await renderHtml())
  }
})
