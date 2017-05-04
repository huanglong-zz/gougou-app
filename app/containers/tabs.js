import React, {Component, PropTypes} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import List from './creation'
import Detail from './detail'
import Comment from './comment'
import Edit from './edit'
import Account from './account'
import AccountUpdate from './accountUpdate'

import {
  TabNavigator,
  StackNavigator
} from 'react-navigation'

import {
  Text
} from 'react-native'

const headerStyle = {
  height: 52,
  paddingTop: 14,
  backgroundColor: '#ee735c'
}

const ListTab = StackNavigator({
  List: {
    screen: List,
    navigationOptions: {
      headerTitle: '狗狗说',
      tabBarVisible: true,
      headerStyle: headerStyle,
      headerTintColor: '#fff',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={focused ? 'ios-videocam' : 'ios-videocam-outline'}
          color={tintColor}
          size={28} />
      )
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.rowData.author.nickname} 的创意`,
      headerStyle: headerStyle,
      headerTintColor: '#fff',
      tabBarVisible: false
    })
  },
  Comment: {
    screen: Comment,
    navigationOptions: {
      title: '评论',
      headerStyle: headerStyle,
      headerTintColor: '#fff',
      tabBarVisible: false
    }
  }
})

const AccountTab = StackNavigator({
  Account: {
    screen: Account,
    navigationOptions: ({navigation}) => ({
      headerTitle: '狗狗的账户',
      tabBarVisible: true,
      headerStyle: headerStyle,
      headerRight: (
        <Text style={{color: '#fff', paddingRight: 10}} onPress={() => navigation.navigate('AccountUpdate')}>编辑</Text>
      ),
      headerTintColor: '#fff',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={focused ? 'ios-more' : 'ios-more-outline'}
          color={tintColor}
          size={28} />
      )
    })
  },
  AccountUpdate: {
    screen: AccountUpdate,
    navigationOptions: {
      headerTitle: '更新资料',
      headerStyle: headerStyle,
      headerTintColor: '#fff',
      headerRight: (
        <Text style={{color: '#fff', paddingRight: 10}} onPress={() => navigate('AccountUpdate')}>编辑</Text>
      ),
      tabBarVisible: false
    }
  }
})

// https://github.com/react-community/react-navigation/blob/master/docs/api/navigators/TabNavigator.md
const Tabs = TabNavigator({
  ListTab: {
    screen: ListTab
  },
  EditTab: {
    title: '理解狗狗，从配音开始',
    screen: Edit,
    navigationOptions: {
      headerTitle: '更新资料',
      headerRight: (
        <Text style={{color: '#fff', paddingRight: 10}} onPress={() => navigate('AccountUpdate')}>编辑</Text>
      ),
      headerStyle: headerStyle,
      headerTintColor: '#fff',
      tabBarVisible: true,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={focused ? 'ios-recording' : 'ios-recording-outline'}
          color={tintColor}
          size={28} />
      )
    }
  },
  AccountTab: {
    screen: AccountTab
  }
}, {
  tabBarPosition: 'bottom',
  lazyload: true,
  tabBarOptions: {
    activeTintColor: '#ee735c',
    inactiveTintColor: '#666',
    showIcon: true,
    showLabel: false,
    labelStyle: {
      fontSize: 12
    },
    style: {
      borderTopWidth: 1,
      borderTopColor: '#f1f1f1',
      backgroundColor: '#fff',
    }
  }
})

export default Tabs
