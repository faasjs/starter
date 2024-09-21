import { TodoItem } from '@faasjs-starter/types'

declare module 'knex/types/tables' {
  interface Tables {
    todo_items: TodoItem
  }
}
