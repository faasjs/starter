import { useFunc } from '@faasjs/func'
import { handle } from './rsbuildServer'

export default useFunc(() => {
  return async ({ event }) => {
    await handle(event.raw.request, event.raw.response)
  }
})
