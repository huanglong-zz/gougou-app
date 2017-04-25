import Button from 'react-native-button'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Account from '../pages/account'
import util from '../common/util'
import * as appActions from '../actions/app'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

class AccountContainer extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.checkUserStatus()
  }

  _updateUser (user) {
    this.props.navigation.navigate('AccountUpdate', {
      user: user
    })
  }

  _logout () {
    this.props.logout()
  }

  render () {

    return (
      <Account
        updateUser={this._updateUser.bind(this)}
        logout={this._logout.bind(this)}
        {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.get('app').user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)

