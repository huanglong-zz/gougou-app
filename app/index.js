import React from 'react'
import {AppRegistry} from 'react-native'
import {Provider} from 'react-redux'

import AppContainer from './pages/app'
import configureStore from './store'

// 我们通过 redux 来创建存数据的对象 store，把 store 放到 provider 里面，这样就被传递给了我们的容器 RootContainer

//*  ```configureStore``` will connect the ```reducers```, the
const store = configureStore()


// 而 imoocApp 就是提供应用的入口，无论是 iOS 还是 Android，都首先调用这个组件，里面的 RootContainer 则是这个 App 里面第一个可见组件，同时它也是所有其他页面和组件的祖先容器。


// * ```Provider``` will tie the React-Native to the Redux store

const imoocApp = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

AppRegistry.registerComponent('imoocApp', () => imoocApp)
