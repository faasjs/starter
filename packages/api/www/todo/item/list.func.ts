import { useFunc } from '@faasjs/func'
import { useHttp } from '@faasjs/http'
import { useKnex, query } from '@faasjs/knex'

export default useFunc(function () {
  useHttp()
  useKnex()

  return async function () {
    return query('todo_items').orderByRaw('array_position(ARRAY[\'pending\', \'done\']::varchar[], status), "createdAt" desc')
  }
})
