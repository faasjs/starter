/**
 * @jest-environment @happy-dom/jest-environment
 */
import { render, screen } from '@testing-library/react'
import { TodoList } from '../TodoList'
import { setMock, Response } from '@faasjs/browser'

let mockedData: any[] = []

describe('TodoList', () => {
  beforeAll(() => {
    setMock(async () => new Response({ data: mockedData }))
  })

  it('empty', async () => {
    render(<TodoList />)

    expect(await screen.findByText('No data')).toBeDefined()
  })

  it('with data', async () => {
    mockedData = [{ title: 'test' }]

    render(<TodoList />)

    expect(await screen.findByText('test')).toBeDefined()
  })
})
