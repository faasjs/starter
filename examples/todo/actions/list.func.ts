import { useFunc } from '@faasjs/func'
import { useHttp } from '@faasjs/http'
import { useKnex, query } from '@faasjs/knex'

export default useFunc(() => {
  useHttp()
  useKnex()

  return async () => query('todo_items').orderByRaw('array_position(ARRAY[\'pending\', \'done\']::varchar[], status), "createdAt" desc')
})
