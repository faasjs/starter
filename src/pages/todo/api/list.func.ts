import { defineFunc } from '@faasjs/func'
import { query } from '@faasjs/knex'
import type { InferFaasAction } from '@faasjs/types'

export const func = defineFunc(async () => {
  return query('todo_items').orderByRaw(
    "array_position(ARRAY['pending', 'done']::varchar[], status), \"createdAt\" desc"
  )
})

declare module '@faasjs/types' {
  interface FaasActions {
    'todo/api/list': InferFaasAction<typeof func>
  }
}
