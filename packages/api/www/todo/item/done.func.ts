import { useFunc } from '@faasjs/func'
import { useHttp } from '@faasjs/http'
import { useKnex, query } from '@faasjs/knex'

export default useFunc(function () {
  const http = useHttp<{
    id: string
  }>({ validator: { params: { rules: { id: { required: true } } } } })
  useKnex()

  return async function () {
    await query('todo_items').update({ status: 'done' }).where({ id: http.params.id })
  }
})
