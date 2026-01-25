import { useHttpFunc } from '@faasjs/http'
import { query, useKnex } from '@faasjs/knex'
import type { InferFaasAction } from '@faasjs/types'
import { z } from 'zod'

const schema = z
  .object({
    title: z.string(),
  })
  .required()

const func = useHttpFunc<z.infer<typeof schema>, { id: string }>(() => {
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

export default func

declare module '@faasjs/types' {
  interface FaasActions {
    'examples/todo/actions/add': InferFaasAction<typeof func>
  }
}
