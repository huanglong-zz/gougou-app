import React, {Component, PropTypes} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import List from './creation'
import Edit from './edit'
import Account from './account'
import Detail from '../components/creations/detail'
import Comment from '../components/comments/index'

import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation'

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
        },
      }),
    },
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      title: ({state}) => `${state.params.rowData.author.nickname} 的创意`,
      header: header,
      tabBar: ({ state, setParams }) => ({
        visible: false
      }),
    }
  },
  Comment: {
    screen: CommentScreen,
    navigationOptions: {
      title: '评论',
      header: header,
      tabBar: ({ state, setParams }) => ({
        visible: false
      }),
    }
  },
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
        },
      })
    }
  },
  AccountTab: {
    title: '狗狗的账户',
    screen: Account,
    navigationOptions: {
      tabBar: ({ state, setParams }) => ({
        label: '账户',
        icon: ({ tintColor, focused }) => {
          return (
            <Icon
              name={focused ? 'ios-more' : 'ios-more-outline'}
              color={tintColor}
              size={28} />
          )
        },
      }),
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#ee735c',
    showLabel: false,
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: '#fff',
    },
  },
})


export default Tabs