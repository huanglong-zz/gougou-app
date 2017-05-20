import {createStore, applyMiddleware} from 'redux'
import {fromJS} from 'immutable'
// redux 异步 action 中间件，它处理掉同步或异步调用，异步过程也放在 action 里面操作
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

// store.dispatch 方法可以接受 Promise 对象作为参数
import promiseMiddleware from 'redux-promise'
import reducers from './reducers'

const logger = createLogger()

const middlewares = [
  thunk,
  promiseMiddleware,
  logger
]

function configureStore (initialState = fromJS({})) {
  // 让数组作为函数的参数，可以使用三点运算符展开数组，形成参数
  const enhancer = applyMiddleware(...middlewares)
  // createStore 方法接收**reducer函数**和**初始化的数据(currentState)
  const store = createStore(reducers(), initialState, enhancer)

  // actions 通知发生了什么事情，传递事情的一些要素
  // reducers 匹配 actions，根据事情的要素，加工出新的状态
  // store 是一个数据对象，提前集成了 reducers 以及一些中间件，他让 actions 和 reducers 建立联系，action 一发出，recucer 就会收到并且相应

  /*
  var {
    getState,
    dispatch,
    subscribe,
    replaceReducer
  } = store

  store共有 4 个API,
  getState 获取状态
  dispatch 更新状态，store 提供 dispatch 来分发 actions
  subscribe 注册监听，监听每一次 dispatch 被调用
  replaceReducer 重启 store，加载自最新的 reducers
  */

  // 总之呢，， store 的核心就是数据，也就是应用的状态，它提供的这些角色或者方法，便于对状态进行组织管理。

  // React Native 继承了模块系统，且引入了 hot 对象，也就是热重载，
  // 热重载和实时重载不太一样，实时重载可以看做是应用更新时候的全局刷新，热重载可以看做是局部刷新，组件渲染但是不丢失应用状态
  // 这个在 RN 里面称为  HMR，关于它的原理我们不去深究，
  // 只需要知道这个 API 是基于  Webpack 实现的，他通过 hot 对象，
  // 暴露一个 accept 的函数，可以让你定义一个回调函数，来做一些其他的事情，比如把 reducers 全部重新载入一遍
  // 这样呢，可以避免长时间的代码编译过程，节约开发时间
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default)
    })
  }

  return store
}

export default configureStore
