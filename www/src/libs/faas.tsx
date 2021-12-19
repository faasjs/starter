import { FaasReactClient } from '@faasjs/react'
import { notification } from 'antd'
import React from 'react'

const client = FaasReactClient({
  domain: process.env.REACT_APP_API as string,
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
      return Promise.reject(res)
    }
  }
})

export const faas = client.faas
export const useFaas = client.useFaas
