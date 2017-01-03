/*
 *
 * GlobalNavigation reducer
 *
 */

import {
  cardStackReducer
} from 'react-native-navigation-redux-helpers'

const initialState = {
  index: 0,
  key: 'global',
  routes: [
    {
      key: 'tabs',
      index: 0
    },
  ],
}

module.exports = cardStackReducer(initialState)
