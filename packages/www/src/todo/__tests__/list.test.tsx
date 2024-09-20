import { render, screen } from '@testing-library/react'
import { TodoList } from '../list'
import { setMock, Response } from '@faasjs/browser'

let mockedData: any[] = []

describe('TodoList', function () {
  beforeAll(() => {
    setMock(async () => new Response({data: mockedData}))
  })

  test('empty', async function () {
    render(<TodoList />)

    expect(await screen.findByText('No data')).toBeInTheDocument()
  })

  test('with data', async function () {
    mockedData = [{ title: 'test' }]

    render(<TodoList />)

    expect(await screen.findByText('test')).toBeInTheDocument()
  })
})
