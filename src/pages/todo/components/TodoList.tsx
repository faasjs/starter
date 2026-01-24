import { CheckOutlined, UndoOutlined } from '@ant-design/icons'
import { faas, withFaasData } from '@faasjs/ant-design'
import { Button, Input, List, Modal, message, Typography } from 'antd'

export const TodoList = withFaasData<
  {
    id: string
    title: string
    status: 'pending' | 'done'
  }[]
>(
  props => {
    return (
      <>
        <Button
          type='primary'
          onClick={() => {
            let title: string
            const modal = Modal.confirm({
              title: 'Add a new item',
              content: (
                <Input
                  placeholder='Title'
                  onChange={e => (title = e.target.value?.trim())}
                />
              ),
              okText: 'Add',
              async onOk() {
                if (!title) {
                  message.error('Title is required')
                  return
                }
                modal.destroy()
                await faas('todo/actions/add', { title })
                await props.reload()
              },
              cancelText: 'Cancel',
            })
          }}
        >
          New
        </Button>
        <List
          dataSource={props.data}
          rowKey={item => item.id}
          renderItem={item => (
            <List.Item
              actions={[
                item.status === 'pending' ? (
                  <CheckOutlined
                    key='done'
                    style={{
                      cursor: 'pointer',
                      color: 'var(--ant-success-color)',
                    }}
                    onClick={async () =>
                      faas('todo/actions/done', {
                        id: item.id,
                      }).finally(async () => props.reload())
                    }
                  />
                ) : (
                  <UndoOutlined
                    key='undo'
                    style={{ cursor: 'pointer' }}
                    onClick={async () =>
                      faas('todo/actions/undo', {
                        id: item.id,
                      }).finally(async () => props.reload())
                    }
                  />
                ),
              ]}
            >
              {item.status === 'done' ? (
                <Typography.Text type='secondary'>{item.title}</Typography.Text>
              ) : (
                <Typography.Text>{item.title}</Typography.Text>
              )}
            </List.Item>
          )}
        />
      </>
    )
  },
  {
    action: 'todo/actions/list',
  }
)
