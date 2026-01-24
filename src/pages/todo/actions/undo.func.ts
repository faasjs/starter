import { useFunc } from '@faasjs/func'
import { useHttp } from '@faasjs/http'
import { query, useKnex } from '@faasjs/knex'
import type { InferFaasAction } from '@faasjs/types'
import { z } from 'zod'

const schema = z
  .object({
    id: z.string(),
  })
  .required()

const func = useFunc<
  {
    params: z.infer<typeof schema>
  },
  unknown,
  void
>(() => {
  useHttp()
  useKnex()

  return async ({ event }) => {
    schema.parse(event.params)
    await query('todo_items')
      .update({ status: 'pending' })
      .where({ id: event.params.id })
  }
})

export default func

declare module '@faasjs/types' {
  interface FaasActions {
    'examples/todo/actions/undo': InferFaasAction<typeof func>
  }
}
