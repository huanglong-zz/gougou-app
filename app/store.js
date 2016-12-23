import {Platform} from 'react-native'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise'
import reducers from './reducers'

const logger = createLogger()

const middlewares = [
  thunk,
  promiseMiddleware,
  logger
]

function configureStore(initialState) {
  const enhancer = applyMiddleware(...middlewares)
  const store = createStore(reducers(), initialState, enhancer)
  
  // if (module.hot) {
  //   module.hot.accept(() => {
  //     store.replaceReducer(require('./reducers').default)
  //   })
  // }

  return store
}

module.exports = configureStore

