import { query } from '@faasjs/knex'
import { FuncWarpper } from '@faasjs/test'
import Func from '../add.func'

describe('add', function () {
  it('should work', async function () {
    const { statusCode, data } = await new FuncWarpper(Func).JSONhandler({ title: 'title' })

    expect(statusCode).toEqual(200)

    const item = await query('todo_items').where({ id: data.id }).first()

    expect(item).toMatchObject({
      id: data.id,
      title: 'title'
    })
  })
})
