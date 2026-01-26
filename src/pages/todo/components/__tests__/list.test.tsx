import { setMock } from '@faasjs/browser'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TodoList } from '../TodoList'

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
