import { Skeleton } from 'antd'
import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'


export function Todo () {
  return <Route
    key="/config"
    path={ ['/'] }
    exact
    component={ () => <div style={ { padding: '1rem' } }>
      <Suspense fallback={ <Skeleton active /> }>
        <Switch>
          <Route
            exact
            path={ ['/'] }
            component={ lazy(async () => import('./list')) } />
        </Switch>
      </Suspense>
    </div> } />
}
