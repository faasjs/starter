import { defineFunc, z } from '@faasjs/core'
import { query } from '@faasjs/knex'

const schema = z
  .object({
    id: z.string(),
  })
  .required()

export const func = defineFunc<
  typeof schema,
  { params: z.infer<typeof schema> }
>({
  schema,
  async handler({ params }) {
    if (!params) {
      throw new Error('params are required')
    }

    await query('todo_items')
      .update({ status: 'pending' })
      .where({ id: params.id })
  },
})
