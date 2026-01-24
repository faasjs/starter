import { Typography } from 'antd'
import { TodoList } from './components/TodoList'

export default function TodoHome() {
  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '24px auto',
      }}
    >
      <Typography.Title>FaasJS Todo Demo</Typography.Title>
      <TodoList />
    </div>
  )
}
