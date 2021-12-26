import { Base } from './base'

/* 待办事项 */
export type TodoItem = Base & {
  /* 标题 */
  title: string
  /* 状态 */
  status: '未完成' | '已完成'
}

declare module 'knex/types/tables' {
  interface Tables {
    todo_items: TodoItem
  }
}
