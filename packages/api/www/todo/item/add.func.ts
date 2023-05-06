import { useFunc } from '@faasjs/func'
import { useHttp } from '@faasjs/http'
import { useKnex, query } from '@faasjs/knex'

export default useFunc(function () {
  const http = useHttp<{
    title: string
  }>({ validator: { params: { rules: { title: { required: true } } } } })
  useKnex()

  return async function () {
    const ids = await query('todo_items').insert({
      title: http.params.title,
      status: '未完成'
    }).returning('id')

    return { id: ids[0].id }
  }
})
