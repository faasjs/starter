import { query } from '@faasjs/knex'
import { test } from '@faasjs/test'
import Func from '../add.func'
import { describe, expect, it } from 'vitest'

describe('add', () => {
  it('should work', async () => {
    const { statusCode, data } = await test(Func).JSONhandler({ title: 'title' })

    expect(statusCode).toEqual(200)

    const item = await query('todo_items').where({ id: data.id }).first()

    expect(item).toMatchObject({
      id: data.id,
      title: 'title'
    })
  })
})
