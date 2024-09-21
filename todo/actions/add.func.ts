import { useFunc } from '@faasjs/func'
import { useHttp } from '@faasjs/http'
import { useKnex, query } from '@faasjs/knex'

export default useFunc(() => {
  const http = useHttp<{
    title: string
  }>({ validator: { params: { rules: { title: { required: true } } } } })
  useKnex()

  return async () => {
    const ids = await query('todo_items').insert({
      title: http.params.title,
      status: 'pending',
    }).returning('id')

    return { id: ids[0].id }
  }
})
