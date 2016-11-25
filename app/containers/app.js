'use strict'

import React, {Component, PropTypes} from 'react'
import {NavigationExperimental} from 'react-native'
import {connect} from 'react-redux'

//import Home from './Home'
//import Counter from './Counter'
import List from '../creation/index'
import Edit from '../edit/index'
import Login from '../account/login'

const {CardStack} = NavigationExperimental

@connect(
  state => state,
  dispatch => ({dispatch})
)
export default class Root extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  handleNavigation = action => {
    this.props.dispatch(action)
  }

  renderScene = props => {
    switch (props.scene.key) {
      case 'scene_home':
        return <List navigate={this.handleNavigation} />
      case 'scene_edit':
        return <Edit navigate={this.handleNavigation} />
      case 'scene_account':
        return <Login navigate={this.handleNavigation} />
      default:
        return null
    }
  }

  render() {
    return (
      <CardStack
        direction="horizontal"
        navigationState={this.props.routes}
        renderScene={this.renderScene}
      />
    )
  }
}
