import { TodoList } from './components/TodoList'
import { notification } from 'antd'
import { FaasReactClient } from '@faasjs/react'

FaasReactClient({
  onError(action: string) {
    return async (res: any) => {
      console.error('e', res.body)
      if (res.body?.error)
        notification.error({
          message: `Error: #${action}`,

          description: (
            <div
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{
                __html: res.body.error.message.replace(/\n/g, '<br>'),
              }}
            />
          ),
          duration: 0,
        })
      else
        notification.error({
          message: res.status,
          description: `${action}`,
          duration: 10,
        })
    }
  },
})

export default function App() {
  return <TodoList />
}
