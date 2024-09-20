import { createRoot } from 'react-dom/client'
import { FaasReactClient } from '@faasjs/react'
import { notification } from 'antd'
import { Todo } from 'todo'

FaasReactClient({
  baseUrl: import.meta.env.VITE_REACT_APP_API as any,
  onError (action: string) {
    return async function (res: any) {
      console.error('e', res.body)
      if (res.body && res.body.error)
        notification.error({
          message: `错误 #${action}`,
          description: <div dangerouslySetInnerHTML={ ({ __html: res.body.error.message.replace(/\n/g, '<br>') }) }></div>,
          duration: 0
        })
      else
        notification.error({
          message: res.status,
          description: `${action}`,
          duration: 10
        })
    }
  }
})

createRoot(document.getElementById('root')).render(<Todo />)
