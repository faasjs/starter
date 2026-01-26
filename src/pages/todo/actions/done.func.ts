import { useHttp, useHttpFunc } from '@faasjs/http'
import { query, useKnex } from '@faasjs/knex'
import type { InferFaasAction } from '@faasjs/types'
import { z } from 'zod'

const schema = z
  .object({
    id: z.string(),
  })
  .required()

export const func = useHttpFunc<
  z.infer<typeof schema>
>(() => {
  useHttp()
  useKnex()

  return async ({ params }) => {
    const parsed = schema.parse(params)
    await query('todo_items')
      .update({ status: 'done' })
      .where({ id: parsed.id })
  }
})

declare module '@faasjs/types' {
  interface FaasActions {
    'todo/actions/done': InferFaasAction<typeof func>
  }
}
