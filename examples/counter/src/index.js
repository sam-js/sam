import React from 'react'
import { render } from 'react-dom'
import { createModel } from 'sam'

import App from './containers/App'

import createDispatch from './createDispatch'
import container from './container'
import nap from './nap'
import state from './state'

const initialStore = {
  counter: 5,
}
const model = createModel(container, state, nap, initialStore)

const dispatch = createDispatch(model.present)

model.subscribe(state => {
  console.log('View received new state', state)
  render(
    <App state={state} dispatch={dispatch} />,
      document.getElementById('root')
  )
})
