import React from 'react'

const App = ({
  dispatch,
  state,
}) => {
  const inc = _ => dispatch({ type: 'INC' })
  return (
    <div>
      <p>Counter: {state.counter} {state.launchImminent ? '(watch out! will launch soon!)' : ''}</p>
      <h3>{state.hasLaunched ? 'LAUNCHED' : ''}</h3>
      <button onClick={inc}>INC</button>
      <pre>{JSON.stringify(state)}</pre>
    </div>
  )
}
export default App
