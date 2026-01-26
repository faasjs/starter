import { useHttp, useHttpFunc } from '@faasjs/http'
import { query, useKnex } from '@faasjs/knex'
import type { InferFaasAction } from '@faasjs/types'

export const func = useHttpFunc(() => {
  useHttp()
  useKnex()

  return async () =>
    query('todo_items').orderByRaw(
      "array_position(ARRAY['pending', 'done']::varchar[], status), \"createdAt\" desc"
    )
})

declare module '@faasjs/types' {
  interface FaasActions {
    'todo/actions/list': InferFaasAction<typeof func>
  }
}
