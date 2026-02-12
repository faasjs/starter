import { defineFunc } from '@faasjs/func'
import { query } from '@faasjs/knex'
import type { InferFaasAction } from '@faasjs/types'
import * as z from 'zod'

const schema = z
  .object({
    title: z.string(),
  })
  .required()

export const func = defineFunc<
  { params?: z.infer<typeof schema> },
  unknown,
  { id: string }
>(async ({ event }) => {
  const parsed = schema.parse(event.params || {})

  const ids = await query('todo_items')
    .insert({
      title: parsed.title,
      status: 'pending',
    })
    .returning('id')

  return { id: ids[0].id }
})

declare module '@faasjs/types' {
  interface FaasActions {
    'todo/api/add': InferFaasAction<typeof func>
  }
}
