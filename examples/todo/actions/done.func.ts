import { useFunc } from '@faasjs/func'
import { useHttp } from '@faasjs/http'
import { useKnex, query } from '@faasjs/knex'

export default useFunc(() => {
  const http = useHttp<{
    id: string
  }>({ validator: { params: { rules: { id: { required: true } } } } })
  useKnex()

  return async () => {
    await query('todo_items').update({ status: 'done' }).where({ id: http.params.id })
  }
})
