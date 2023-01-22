import { render, screen } from '@testing-library/react'
import { TodoList } from '../list'

let mockedData: any[] = []

jest.mock('libs/faas', function () {
  return {
    useFaas: function () {
      return { data: mockedData }
    },
    faas: async function () {
      return Promise.resolve({ data: mockedData })
    }
  }
})

describe('TodoList', function () {
  test('empty', function () {
    render(<TodoList />)

    expect(screen.getByText('No data')).toBeInTheDocument()
  })

  test('with data', function () {
    mockedData = [{ title: 'test' }]

    render(<TodoList />)

    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
