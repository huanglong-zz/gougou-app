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
  key: 'list',
  routes: [
    {
      key: 'creations',
      title: 'items'
    },
  ],
}

module.exports = cardStackReducer(initialState)
