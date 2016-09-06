'use strict'

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Icon from 'react-native-vector-icons/Ionicons'
import List from './app/creation/index'
import Edit from './app/edit/index'
import Login from './app/account/login'
import Account from './app/account/index'
import Slider from './app/account/slider'

import React, {Component} from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS,
  Navigator,
  Dimensions,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'

// 第二点，对于这种不变的变量，我们全部使用 const
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


class imoocApp extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      user: null,
      selectedTab: 'list',
      welcomed: false,
      entered: false,
      booted: false,
      logined: false
    }
  }

  componentDidMount() {
    this._asyncAppStatus()
  }

  _logout() {
    AsyncStorage.removeItem('user')

    this.setState({
      logined: false,
      user: null
    })
  }

  _asyncAppStatus() {
    let that = this

    AsyncStorage.multiGet(['user', 'entered'])
      .then((data) => {
        const userData = data[0][1]
        const entered = data[1][1]
        let user
        let newState = {
          booted: true
        }

        if (userData) {
          user = JSON.parse(userData)
        }

        if (user && user.accessToken) {
          newState.user = user
          newState.logined = true
        }
        else {
          newState.logined = false
        }

        if (entered === 'yes') {
          newState.entered = true
        }

        that.setState(newState)
      })
  }

  _afterLogin(user) {
    let that = this

    console.log(this)
    console.log(that)
    user = JSON.stringify(user)

    AsyncStorage.setItem('user', user)
      .then(() => {
        that.setState({
          logined: true,
          user: user
        })
      })
  }

  _enterSlide() {
    this.setState({
      entered: true
    }, function() {
      AsyncStorage.setItem('entered', 'yes')
    })
  }

  render() {
    if (!this.state.booted) {
      return (
        <View style={styles.bootPage}>
          <ActivityIndicator color='#ee735c' />
        </View>
      )
    }

    if (!this.state.entered) {
      return <Slider enterSlide={this._enterSlide.bind(this)} />
    }

    if (!this.state.logined) {
      return <Login afterLogin={this._afterLogin.bind(this)} />
    }

    // https://medium.com/@dabit3/react-native-navigator-navigating-like-a-pro-in-react-native-3cb1b6dc1e30#.p4c4qjmf0
    return (
      <TabBarIOS tintColor="#ee735c">
        <Icon.TabBarItem
          iconName='ios-videocam-outline'
          selectedIconName='ios-videocam'
          selected={this.state.selectedTab === 'list'}
          onPress={() => {
            this.setState({
              selectedTab: 'list',
            })
          }}>
          <Navigator
            initialRoute={{
              name: 'list',
              component: List
            }}
            configureScene={(route) => {
              return Navigator.SceneConfigs.FloatFromRight
            }}
            renderScene={(route, navigator) => {
              const Component = route.component

              return <Component {...route.params} navigator={navigator} />
            }} />

        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-recording-outline'
          selectedIconName='ios-recording'
          selected={this.state.selectedTab === 'edit'}
          onPress={() => {
            this.setState({
              selectedTab: 'edit'
            })
          }}>
          <Edit />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-more-outline'
          selectedIconName='ios-more'
          selected={this.state.selectedTab === 'account'}
          onPress={() => {
            this.setState({
              selectedTab: 'account'
            })
          }}>
          <Account user={this.state.user} logout={this._logout.bind(this)} />
        </Icon.TabBarItem>
      </TabBarIOS>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bootPage: {
    width: width,
    height: height,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
})


AppRegistry.registerComponent('imoocApp', () => imoocApp)
