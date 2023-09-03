export type Base = {
  id: string
  createdAt: Date
  updatedAt: Date
}

/* Todo Item */
export type TodoItem = Base & {
  title: string
  status: 'pending' | 'done'
}
