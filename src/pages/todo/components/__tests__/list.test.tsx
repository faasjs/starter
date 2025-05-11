/**
 * @vitest-environment happy-dom
 */

import { render, screen } from '@testing-library/react'
import { TodoList } from '../TodoList'
import { setMock } from '@faasjs/browser'
import { describe, expect, it } from 'vitest'

describe('TodoList', () => {


  it('empty', async () => {
    setMock(async () => ({ data: [] }))

    render(<TodoList />)

    expect(await screen.findAllByText('No data')).toHaveLength(2)
  })

  it('with data', async () => {
    setMock(async () => ({ data: [{ title: 'test' }] }))

    render(<TodoList />)

    expect(await screen.findByText('test')).not.toBeNull()
  })
})
