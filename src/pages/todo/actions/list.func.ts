import { useFunc } from '@faasjs/func'
import { useHttp } from '@faasjs/http'
import { useKnex, query } from '@faasjs/knex'
import type { InferFaasAction } from '@faasjs/types'

const func = useFunc(() => {
  useHttp()
  useKnex()

  return async () => query('todo_items').orderByRaw('array_position(ARRAY[\'pending\', \'done\']::varchar[], status), "createdAt" desc')
})

export default func

declare module '@faasjs/types' {
  interface FaasActions {
    'examples/todo/actions/list': InferFaasAction<typeof func>
  }
}
