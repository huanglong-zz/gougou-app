'use strict'

import React, {Component, PropTypes} from 'react'
import {NavigationExperimental, Navigator} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import { actions } from 'react-native-navigation-redux-helpers'

const {
  popRoute,
  pushRoute
} = actions

import List from './creation'
import Edit from './edit'
import Account from './account'
import Tabs from '../components/tabs'
import Popup from '../components/popup'
import storage from '../common/storage'
import Detail from '../components/creations/detail'
import * as appActions from '../actions/app'

import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
} from 'react-native'

const {
  CardStack,
  Header: NavigationHeader,
} = NavigationExperimental
const {height, width} = Dimensions.get('window')

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

class App extends Component {
  constructor(props) {
    super(props)

    this._renderHeader = this._renderHeader.bind(this)
    this._renderScene = this._renderScene.bind(this)
  }

  _renderScene = props => {
    console.log('tabs props')
    console.log(props.scene.route.key)
    switch (props.scene.route.key) {
      case 'list':
        return <List {...this.props} />
      case 'edit':
        return <Edit {...this.props} />
      case 'account':
        return <Account {...this.props} />
      case 'detail':
        return <Detail rowData={props.scene.route.rowData} {...this.props} />
      default:
        return <Text>Hi There!</Text>
    }
  }

  _renderHeader = props => {
    return null
  }

  render() {
    const {
      pop,
      navigation
    } = this.props

    return (
      <View style={{flex: 1}}>
        <CardStack
          direction="horizontal"
          onNavigate={() => {}}
          navigationState={this.props.navigation}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          configureScene={(route) => {
            const InstantTransition = {
              gestures: null,
              defaultTransitionVelocity: null,
              springFriction: null,
              springTension: 1000,
              animationInterpolators: {
                into: r => r.opacity = 1,
                out: r => r.opacity = 1,
              }
            }
            return InstantTransition
            //return Navigator.SceneConfigs.FadeAndroid
          }}
        />
        <Tabs {...this.props} navigate={this.handleNavigation}  />
        {pop && pop.title && <Popup {...pop} />}
      </View>
    )
  }
}


function mapStateToProps(state) {
  return {
    navigation: state.get('tabs')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps)(App)


