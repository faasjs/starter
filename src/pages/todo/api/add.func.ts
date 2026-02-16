import { defineFunc, z } from '@faasjs/core'
import { query } from '@faasjs/knex'

const schema = z
  .object({
    title: z.string(),
  })
  .required()

export const func = defineFunc<
  typeof schema,
  { params: z.infer<typeof schema> },
  unknown,
  { id: string }
>({
  schema,
  async handler({ params }) {
    if (!params) {
      throw new Error('params are required')
    }

    const ids = await query('todo_items')
      .insert({
        title: params.title,
        status: 'pending',
      })
      .returning('id')

    return { id: ids[0].id }
  },
})
