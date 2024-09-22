import { useFunc } from '@faasjs/func'
import { useHttp } from '@faasjs/http'
import { renderToString } from 'react-dom/server'

function App() {
  return (
    <html lang='en'>
      <head>
        <title>Hi, 🚀 FaasJS is here!</title>
      </head>
      <body
        style={{
          padding: '20px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <h1>Hi, 🚀 FaasJS is here!</h1>
        <p>
          You can edit current page in{' '}
          <code style={{ fontWeight: 'bold' }}>index.func.tsx</code>.
        </p>
        <p>Or you can explore examples:</p>
        <p>
          <a href='/examples/todo'>Todo demo</a> based on RsBuild.
        </p>
        <p>
          <a href='/examples/download'>File download demo</a>.
        </p>
      </body>
    </html>
  )
}

export default useFunc(() => {
  const http = useHttp()

  return async () => {
    http.setContentType('html')
    http.setBody(renderToString(<App />))
  }
})
