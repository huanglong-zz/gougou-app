'use strict'

import React, {Component, PropTypes} from 'react'
import {NavigationExperimental, Navigator} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import AppTabs from './appTabs'
import Login from './login'
import Slider from '../components/slider'
import Detail from '../components/creations/detail'
import BootPage from '../components/boot'
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

    this._renderHeader = this._renderHeader.bind(this)
    this._renderScene = this._renderScene.bind(this)
  }

  _renderScene = props => {
    if (props.scene.key === 'scene_detail') {
      return <Detail rowData={props.scene.rowData} {...this.props} />
    }

    if (props.scene.key === 'scene_tabs') {
      return (
        <View style={{flex: 1}}>
          <AppTabs {...this.props} />
        </View>
      )
    }

    if (props.scene.key === 'scene_new') {
      return (
        <View style={{flex: 1}}>
        </View>
      )
    }
  }

  componentWillMount() {
    this.props.willEnterApp()
  }

  _renderHeader = props => {
    return null
  }

  render() {
    const {
      booted,
      entered,
      logined,
      afterLogin,
      pop,
      enteredSlide,
      navigation
    } = this.props

    if (!booted) {
      return <BootPage {...this.props} />
    }

    if (!entered) {
      return <Slider enterSlide={enteredSlide()} {...this.props} />
    }

    if (!logined) {
      return <Login afterLogin={afterLogin()} {...this.props} />
    }

    return (
      <CardStack
        direction="horizontal"
        onNavigate={() => {}}
        navigationState={this.props.navigation}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
      />
    )
  }
}


function mapStateToProps(state) {
  return {
    booted: state.get('app').booted,
    entered: state.get('app').entered,
    logined: state.get('app').logined,
    navigation: state.get('globalNav')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


