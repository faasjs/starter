import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Todo } from 'todo'

ReactDOM.render(
  <BrowserRouter>
    <Todo />
  </BrowserRouter>,
  document.getElementById('root')
)
