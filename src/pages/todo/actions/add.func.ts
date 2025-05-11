import { useFunc } from '@faasjs/func'
import { useHttp } from '@faasjs/http'
import { useKnex, query } from '@faasjs/knex'
import type { InferFaasAction } from '@faasjs/types'
import { z } from 'zod'

const schema = z
  .object({
    title: z.string(),
  })
  .required()

const func = useFunc<
  { params: z.infer<typeof schema> },
  unknown,
  { id: string }
>(() => {
  useHttp()
  useKnex()

  return async ({ event }) => {
    schema.parse(event.params)

    const ids = await query('todo_items')
      .insert({
        title: event.params.title,
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
