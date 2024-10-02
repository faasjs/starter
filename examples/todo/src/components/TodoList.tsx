import { Button, Input, List, Modal, Typography, message } from 'antd'
import { CheckOutlined, UndoOutlined } from '@ant-design/icons'
import { faas, withFaasData } from '@faasjs/ant-design'

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
                await faas('examples/todo/actions/add', { title })
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
                      faas('examples/todo/actions/done', {
                        id: item.id,
                      }).finally(async () => props.reload())
                    }
                  />
                ) : (
                  <UndoOutlined
                    key='undo'
                    style={{ cursor: 'pointer' }}
                    onClick={async () =>
                      faas('examples/todo/actions/undo', {
                        id: item.id,
                      }).finally(async () => props.reload())
                    }
                  />
                ),
              ]}
            >
              <Typography.Text
                delete={item.status === 'done'}
                type={item.status === 'done' ? 'secondary' : undefined}
              >
                {item.title}
              </Typography.Text>
            </List.Item>
          )}
        />
      </>
    )
  },
  {
    action: 'examples/todo/actions/list',
  }
)
