import { Link } from '@faasjs/ant-design'

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <h1>Hi, 🚀 FaasJS is here!</h1>
      <p>
        You can edit current page in{' '}
        <code style={{ fontWeight: 'bold' }}>src/pages/home/index.tsx</code>.
      </p>
      <p>Or you can explore examples:</p>
      <p>
        <Link href='/todo'>Todo App</Link> based on Ant Design and Vite.
      </p>
    </div>
  )
}
