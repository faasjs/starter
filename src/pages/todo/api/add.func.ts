import { useHttpFunc } from '@faasjs/http'
import { query, useKnex } from '@faasjs/knex'
import type { InferFaasAction } from '@faasjs/types'
import * as z from 'zod'

const schema = z
  .object({
    title: z.string(),
  })
  .required()

export const func = useHttpFunc<z.infer<typeof schema>, { id: string }>(() => {
  useKnex()

  return async ({ params }) => {
    const parsed = schema.parse(params)

    const ids = await query('todo_items')
      .insert({
        title: parsed.title,
        status: 'pending',
      })
      .returning('id')

    return { id: ids[0].id }
  }
})

declare module '@faasjs/types' {
  interface FaasActions {
    'todo/api/add': InferFaasAction<typeof func>
  }
}
