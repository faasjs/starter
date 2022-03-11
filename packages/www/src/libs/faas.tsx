import { FaasReactClient } from '@faasjs/react'
import { notification } from 'antd'

const client = FaasReactClient({
  domain: import.meta.env.VITE_REACT_APP_API,
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

export const faas = client.faas
export const useFaas = client.useFaas
