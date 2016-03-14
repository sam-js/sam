# SAM-JS

> **Note**: Although this is working, this project is still under development and you should not use it for production because the API may still change.

## What is SAM-JS

SAM-JS is a lightweight library for building applications in the SAM architecture.

It intends to extend the discussion about SAM happening in [Gitter](https://gitter.im/jdubray/sam-architecture).

## What is SAM

SAM is a new reactive/functional pattern that simplifies Front-End architectures by clearly separating the business logic from the view and, in particular, strictly decoupling back-end APIs from the Front-End. SAM is technology independent and as such can be used to build Web Apps or Native Apps. It is also protocol independent and can be implemented over HTTP, WebSockets...

SAM is unapologetically driven by simplicity and challenges the complexity of frameworks like Google's Angular or Facebook's React+JSX+Flux/Redux+Saga+Thunk+GraphQL+Relay. 

[more](http://jdubray.github.io/sam/)

## Developer tools

[sam-devtools](https://github.com/sam-js/sam-devtools)

## Example

Check the [working example with devtools](https://github.com/sam-js/sam-devtools/tree/master/examples/counter).

## The gist

Increases the counter by clicking **INC**. Launches when counter reaches 10.

```js
import { createModel } from 'sam'

// Input: Current store, dataset presented
// Output: New store
const container = (store = {}, dataset = {}) => {
  if (dataset.increaseBy !== undefined) {
    store.counter += dataset.increaseBy
  }
  if (dataset.launch) {
    store.launched = true
  }
  return store
}

// Input: Store (from Model)
// Output: State (to View and nap)
const state = store => {
  return {
    counter: store.counter,
    launchImminent: (store.counter == 9),
    hasLaunched: (store.launched ? true : false),
  }
}

// Input: State
// Output: NAP, i.e. a function which accepts a function (present) and may or may not call it
const nap = state => {
  return present => {
    if (state.counter == 10 && state.hasLaunched != true) {
      present({ launch: true })
    }
  }
}

const initialStore = {
  counter: 0
}

// Input: Model
// Output: Dispatch, i.e. a function which accepts an action and presents values to the model
const createDispatch = present => action => {
  switch (action.type) {
    case 'INC':
      present({ increaseBy: 1 })
      break
  }
}

const model = createModel(container, state, nap, initialStore)
const dispatch = createDispatch(model.present)

// You may render the View however you wish
// e.g. with React
import React from 'react'
import { render } from 'react-dom'
model.subscribe(state => {
  render(
    <App state={state} dispatch={dispatch} />,
      document.getElementById('root')
  )
})
```

## Thanks

- [JJ Dubray](https://github.com/jdubray) for the SAM architecture and starting the discussion around it.
- [Redux](https://github.com/reactjs/redux) for promoting many awesome ideas happening in the community.
- [Jonah Fox](https://github.com/weepy) for handing over the `sam` NPM package name.
