export type TodoItem = {
  id: string
  title: string
  status: 'pending' | 'done'
  created_at: Date
}

declare module 'knex/types/tables' {
  interface Tables {
    todo_items: TodoItem
  }
}
