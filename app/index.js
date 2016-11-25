'use strict'

import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import App from './containers/app'
import configureStore from './store'

const store = configureStore()

const imoocApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('imoocApp', () => imoocApp)
