/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 * Shamelessly copied from Redux by Gunar
 */
function isCrushed() {}

if (
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
  isCrushed.name !== 'isCrushed'
) {
  console.log('You are currently using minified code outside of NODE_ENV === \'production\'.')
}

export { default as createModel } from './createModel'
