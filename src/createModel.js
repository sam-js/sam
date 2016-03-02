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
    return enhancer(createModel)(container, initialStore)
  }

  let listeners = []
  let store = initialStore
  let currentState = state(store)
  saveSnapshot({}, store)


  const loadSnapshot = i => {
    store = getSnapshot(i)
    updateState()
  }

  const updateState = _ => {
    // TODO: Remove this
    // Rebuild state
    currentState = state(store)
    console.log('New state:', currentState)

    // Pub to listeners
    listeners.forEach(listener => listener(currentState))

    // Call nap
    nap(currentState)(present)
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
    // TODO: Remove this
    listener(currentState)

    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  function present(dataset = {}) {

    console.log('Present:', dataset)
    store = container({ ...store }, dataset)
    console.log('Store after BLC: ', store)

    // TODO: Move this to enhancer
    // Save Store to TimeTravelStore
    saveSnapshot(dataset, store)

    // Rebuild state
    currentState = state(store)
    console.log('New state:', currentState)

    // Pub to listeners
    listeners.forEach(listener => listener(currentState))

    // Call nap
    nap(currentState)(present)

  }

  // TODO: for HMR
  function replaceContainer(nextContainer) {
  }

  // "INIT" present to run everything once
  present()

  return {
    present,
    subscribe,
    getState,
    replaceContainer,
    // TODO: move this
    loadSnapshot,
  }
}
