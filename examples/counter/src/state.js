// Input: Store (from Model)
// Output: State (to View and nap)
const state = store => {
  return {
    counter: store.counter,
    launchImminent: (store.counter == 9),
    hasLaunched: (store.launched ? true : false),
  }
}

export default state
