import { defineFunc } from '@faasjs/func'
import { query } from '@faasjs/knex'
import * as z from 'zod'

const schema = z
  .object({
    id: z.string(),
  })
  .required()

export const func = defineFunc<{ params?: z.infer<typeof schema> }>(
  async ({ event }) => {
    const parsed = schema.parse(event.params || {})
    await query('todo_items')
      .update({ status: 'pending' })
      .where({ id: parsed.id })
  }
)
