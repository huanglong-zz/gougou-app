import React, {Component, PropTypes} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import List from './creation'
import Edit from './edit'
import Account from './account'
import Detail from '../components/creation/detail'
import Comment from '../components/comment/index'
import AccountUpdate from '../components/account/update'

import {
  TabNavigator,
  StackNavigator
} from 'react-navigation'

import {
  Text
} from 'react-native'

const DetailScreen = ({ navigation }) => (
  <Detail
    rowData={navigation.state.params.rowData}
    navigation={navigation}
  />
)

const CommentScreen = ({ navigation }) => (
  <Comment
    navigation={navigation}
  />
)

const AccountUpdateScreen = ({ navigation }) => (
  <AccountUpdate
    navigation={navigation}
  />
)

const header = {
  style: {
    height: 52,
    paddingTop: 14,
    backgroundColor: '#ee735c'
  },
  tintColor: '#fff'
}

const ListTab = StackNavigator({
  List: {
    screen: List,
    navigationOptions: {
      title: '狗狗说',
      header: header,
      tabBar: ({ state, setParams }) => ({
        label: '合集',
        visible: true,
        icon: ({ tintColor, focused }) => {
          return (
            <Icon
              name={focused ? 'ios-videocam' : 'ios-videocam-outline'}
              color={tintColor}
              size={28} />
          )
        }
      })
    }
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      title: ({state}) => `${state.params.rowData.author.nickname} 的创意`,
      header: header,
      tabBar: ({ state, setParams }) => ({
        visible: false
      })
    }
  },
  Comment: {
    screen: CommentScreen,
    navigationOptions: {
      title: '评论',
      header: header,
      tabBar: ({ state, setParams }) => ({
        visible: false
      })
    }
  }
})

const AccountTab = StackNavigator({
  Account: {
    screen: Account,
    navigationOptions: {
      title: '狗狗的账户',
      header: ({ navigate }) => ({
        style: header.style,
        tintColor: header.tintColor,
        right: (
          <Text style={{color: '#fff', paddingRight: 10}} onPress={() => navigate('AccountUpdate')}>编辑</Text>
        )
      }),
      tabBar: ({ state, setParams }) => ({
        label: '账户',
        icon: ({ tintColor, focused }) => {
          return (
            <Icon
              name={focused ? 'ios-more' : 'ios-more-outline'}
              color={tintColor}
              size={28} />
          )
        }
      })
    }
  },
  AccountUpdate: {
    screen: AccountUpdateScreen,
    navigationOptions: {
      title: '更新资料',
      header: header,
      tabBar: ({ state, setParams }) => ({
        visible: false
      })
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
      tabBar: ({ state, setParams }) => ({
        icon: ({ tintColor, focused }) => {
          return (
            <Icon
              name={focused ? 'ios-recording' : 'ios-recording-outline'}
              color={tintColor}
              size={28} />
          )
        }
      })
    }
  },
  AccountTab: {
    screen: AccountTab
  }
}, {
  tabBarOptions: {
    activeTintColor: '#ee735c',
    showLabel: false,
    labelStyle: {
      fontSize: 14
    },
    style: {
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#f1f1f1'
    }
  }
})

export default Tabs
