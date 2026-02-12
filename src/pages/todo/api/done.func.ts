import { defineFunc } from '@faasjs/func'
import { query } from '@faasjs/knex'
import type { InferFaasAction } from '@faasjs/types'
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
      .update({ status: 'done' })
      .where({ id: parsed.id })
  }
)

declare module '@faasjs/types' {
  interface FaasActions {
    'todo/api/done': InferFaasAction<typeof func>
  }
}
