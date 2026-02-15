import { defineFunc } from '@faasjs/func'
import { query } from '@faasjs/knex'

export const func = defineFunc(async () => {
  return query('todo_items').orderByRaw(
    "array_position(ARRAY['pending', 'done']::varchar[], status), \"createdAt\" desc"
  )
})
