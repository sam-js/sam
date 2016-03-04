const nop = _ => undefined

/**
 * Creates a SAM Model stat holds the Store tree.
 * The only way to change the data in the Store is to call `present()` on it.
 *
 * @param {Function} Business Logic Container
 * @param {Function} State to translate Store to State
 * @param {Function} [nap] Function that implements the next-action-predicate
 * @param {any} [initialStore]
 * @param {Function} enhancer
 * @returns {Model} A SAM model that lets you read the State, present data and
 * subscribe to changes.
 */
export default function createModel(container, state, nap = nop, initialStore, enhancer) {
  if (typeof enhancer !== 'undefined') {
    // TODO: Apply enhancer
    return enhancer(createModel)(container, state, nap, initialStore)
  }

  let listeners = []
  let store = initialStore
  let currentState = state(store)
  let currentContainer = container
  let currentNap = nap

  const updateState = _ => {
    // Rebuild state
    currentState = state(store)
    console.log('New state:', currentState)

    // Pub to listeners
    listeners.forEach(listener => listener(currentState))

    // Call nap
    currentNap(currentState)(present)
  }

  function getState() {
    return currentState
  }

  /**
   * @params {Function} listener A callback to be invoked on every preset()
   * @return {Function} A function to remove this listener.
   */
  function subscribe(listener) {
    listeners.push(listener)
    // Send current state to new listener
    // TODO: I believe ideally we should not neet to do this (Gunar)
    listener(currentState)
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  function present(dataset = {}) {
    console.log('Present:', dataset)
    store = currentContainer({ ...store }, dataset)
    console.log('Store after BLC: ', store)
    updateState()
  }

  function replaceStore(nextStore) {
    console.log('replaceStore', nextStore)
     store = { ...nextStore }
     updateState()
  }

  function replaceContainer(nextContainer) {
    console.log('replaceContainer')
    currentContainer = nextContainer
    updateState()
  }

  function replaceNap(nextNap) {
    console.log('replaceNap')
    currentNap = nextNap
    updateState()
  }

  // "INIT" present to run everything once
  present()

  return {
    present,
    subscribe,
    getState,
    replaceStore,
    replaceContainer,
    replaceNap,
  }
}
