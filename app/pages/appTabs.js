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
import * as appActions from '../actions/app'

import {
  StyleSheet,
  View,
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

class Header extends Component {
  render() {
    return (
      <NavigationHeader
        {...this.props}
        renderTitleComponent={this._renderTitleComponent}
        onNavigateBack={this._back}
      />
    )
  }

  _back = () => {
    this.props.pop()
  }

  _renderTitleComponent= (props) => {
    return (
      <NavigationHeader.Title>
        {props.scene.route.key}
      </NavigationHeader.Title>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this._renderHeader = this._renderHeader.bind(this)
    this._renderScene = this._renderScene.bind(this)
  }

  _renderScene = props => {
    switch (props.scene.key) {
      case 'scene_list':
        return <List {...this.props} />
      case 'scene_edit':
        return <Edit {...this.props} />
      case 'scene_account':
        return <Account {...this.props} />
      default:
        return null
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
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps)(App)


