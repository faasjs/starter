import { test } from '@faasjs/dev'
import { query } from '@faasjs/knex'
import { describe, expect, it } from 'vitest'
import { func } from '../add.func'

describe('add', () => {
  it('should work', async () => {
    const { statusCode, data } = await test(func).JSONhandler({
      title: 'title',
    })

    expect(statusCode).toEqual(200)

    const item = await query('todo_items').where({ id: data.id }).first()

    expect(item).toMatchObject({
      id: data.id,
      title: 'title',
    })
  })
})
