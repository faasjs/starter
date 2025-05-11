import '@ant-design/v5-patch-for-react-19'
import { lazy, Routes, App } from "@faasjs/ant-design";

export function Root() {
  return <App
    faasConfigProviderProps={{
      faasClientOptions: {
        baseUrl: '/pages/',
      }
    }}
  >
    <Routes
      routes={[
        {
          path: '',
          page: lazy(() => import('./pages/home')),
        },
        {
          path: 'todo/*',
          page: lazy(() => import('./pages/todo')),
        }
      ]}
    />
  </App>
}
