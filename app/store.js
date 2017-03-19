import {createStore, applyMiddleware} from 'redux'
import {fromJS} from 'immutable'
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

function configureStore (initialState = fromJS({})) {
  const enhancer = applyMiddleware(...middlewares)
  const store = createStore(reducers(), initialState, enhancer)

  // if (module.hot) {
  //   module.hot.accept(() => {
  //     store.replaceReducer(require('./reducers').default)
  //   })
  // }

  return store
}

export default configureStore

