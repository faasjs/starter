import { lazy, Routes } from '@faasjs/ant-design'

export default function TodoRoutes() {
  return (
    <Routes
      routes={[
        {
          path: '',
          page: lazy(() => import('./home')),
        },
      ]}
    />
  )
}
