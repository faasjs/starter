import {
  Button, Input, List, Modal, Skeleton, Typography, message
} from 'antd'
import { CheckOutlined, UndoOutlined } from '@ant-design/icons'
import { faas, useFaas } from 'libs/faas'
import type { TodoItem } from '@faasjs-starter/types'

export function TodoList () {
  const list = useFaas<TodoItem[]>('todo/item/list', {})

  if (!list.data) return <Skeleton active />

  return <div style={ {
    maxWidth: '500px',
    margin: '24px auto'
  } }>
    <Typography.Title>FaasJS Todo Demo</Typography.Title>
    <Button
      type='primary'
      onClick={ () => {
        let title: string
        const modal = Modal.confirm({
          title: 'Add a new item',
          content: <Input
            placeholder='Title'
            onChange={ e => title = e.target.value?.trim() }
          />,
          okText: 'Add',
          async onOk () {
            if (!title) {
              message.error('Title is required')
              return
            }
            modal.destroy()
            await faas('todo/item/add', { title })
            await list.reload()
          },
          cancelText: 'Cancel',
        })
      } }>New</Button>
    <List<TodoItem>
      dataSource={ list.data }
      rowKey={ item => item.id }
      renderItem={ item => (
        <List.Item actions={ [
          item.status === 'pending' ? <CheckOutlined
            key='done'
            style={ {
              cursor: 'pointer',
              color: 'var(--ant-success-color)',
            } }
            onClick={ async () => faas('todo/item/done', { id: item.id }).finally(async () => list.reload()) }
          /> : <UndoOutlined
            key='undo'
            style={ { cursor: 'pointer' } }
            onClick={ async () => faas('todo/item/undo', { id: item.id }).finally(async () => list.reload()) }
          />
        ] }>
          <Typography.Text
            delete={ item.status === 'done' }
            type={ item.status === 'done' ? 'secondary' : undefined }
          >{item.title}</Typography.Text>
        </List.Item>
      ) }
    />
  </div>
}
