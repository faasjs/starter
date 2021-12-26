import {
  Button, Input, List, Modal, Skeleton, Typography
} from 'antd'
import { CheckOutlined, UndoOutlined } from '@ant-design/icons'
import { faas, useFaas } from 'libs/faas'

export function TodoList () {
  const list = useFaas<{
    id: string
    title: string
    status: string
  }[]>('todo/item/list', {})

  if (!list.data) return <Skeleton active />

  return <div style={ {
    maxWidth: '500px',
    margin: '24px auto'
  } }>
    <Typography.Title>待办事项</Typography.Title>
    <Button
      type='primary'
      onClick={ () => {
        let title: string
        const modal = Modal.confirm({
          title: '添加',
          content: <Input
            placeholder='输入事项内容'
            onChange={ e => title = e.target.value }
          />,
          okText: '提交',
          async onOk () {
            modal.destroy()
            await faas('todo/item/add', { title })
            await list.reload()
          },
          cancelText: '取消'
        })
      } }>添加</Button>
    <List
      dataSource={ list.data }
      renderItem={ item => (
        <List.Item actions={ [
          item.status === '未完成' ? <CheckOutlined
            key='done'
            style={ { cursor: 'pointer' } }
            onClick={ async () => faas('todo/item/done', { id: item.id }).finally(async () => list.reload()) }
          /> : <UndoOutlined
            key='undo'
            style={ { cursor: 'pointer' } }
            onClick={ async () => faas('todo/item/undo', { id: item.id }).finally(async () => list.reload()) }
          />
        ] }>
          <Typography.Text>{item.title}</Typography.Text>
        </List.Item>
      ) }
    />
  </div>
}
