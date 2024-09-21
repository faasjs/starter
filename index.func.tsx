import { useFunc } from '@faasjs/func'
import { useHttp } from '@faasjs/http'
import { renderToString } from 'react-dom/server'

function App() {
  return (
    <html lang='en'>
      <head>
        <title>Hi, 🚀 FaasJS is here!</title>
      </head>
      <body style={{
        padding: '20px',
        textAlign: 'center',
      }}>
        <h1>Hi, 🚀 FaasJS is here!</h1>
        <p>You can edit current page in <code style={{fontWeight: 'bold'}}>index.func.tsx</code>.</p>
        <p>Or you can try the <a href="/todo">Todo demo</a> based on Vite.</p>
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
