'use strict'

import React, {Component, PropTypes} from 'react'
import {NavigationExperimental, Navigator} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import List from './creation'
import Edit from './edit'
import Account from './account'
import Tabs from '../components/tabs'
import storage from '../common/storage'
import * as appActions from '../actions/app'

import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
} from 'react-native'

const {CardStack} = NavigationExperimental
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
  static propTypes = {
    booted: PropTypes.bool.isRequired,
    entered: PropTypes.bool.isRequired,
    logined: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
  }


  handleNavigation = action => {
    this.props.dispatch(action)
  }

  renderScene = props => {
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

  componentWillMount() {
    this.props.willEnterApp()
  }

  render() {
    const {
      booted,
      entered,
      logined,
      afterLogin,
      enteredSlide,
      navigation
    } = this.props

    if (!booted) {
      return (
        <View style={styles.bootPage}>
          <ActivityIndicator color='#ee735c' />
        </View>
      )
    }

    if (!entered) {
      return <Slider enterSlide={enteredSlide()} />
    }

    if (!logined) {
      return <Login afterLogin={afterLogin()} />
    }

    return (
      <View style={{flex: 1}}>
        <CardStack
          direction="horizontal"
          navigationState={this.props.navigation}
          renderScene={this.renderScene.bind(this)}
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
        <Tabs {...this.props} navigate={this.handleNavigation} />
      </View>
    )
  }
}


function mapStateToProps(state) {
  return {
    booted: state.get('app').booted,
    entered: state.get('app').entered,
    logined: state.get('app').logined,
    navigation: state.get('tabs')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


