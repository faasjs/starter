import { defineFunc } from '@faasjs/core'
import { query } from '@faasjs/knex'

export const func = defineFunc({
  async handler() {
    return query('todo_items').orderByRaw(
      "array_position(ARRAY['pending', 'done']::varchar[], status), \"created_at\" desc"
    )
  },
})
