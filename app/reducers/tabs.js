import {
  tabReducer
} from 'react-native-navigation-redux-helpers'

const initialState = {
  index: 0,
  key: 'tabs',
  routes: [
    {
      key: 'list',
      icon: 'ios-videocam',
      title: 'Items'
    },
    {
      key: 'edit',
      icon: 'ios-recording',
      title: 'Notifications'
    },
    {
      key: 'account',
      icon: 'ios-more',
      title: 'Settings'
    }
  ]
}

module.exports = tabReducer(initialState)
