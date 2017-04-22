/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
import Button from 'react-native-button'
import config from '../common/config'
import util from '../common/util'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as appActions from '../actions/app'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

class Account extends Component {
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
    const user = this.props.user || {}

    return (
      <View style={styles.container}>
        <View style={styles.fieldItem}>
          <Text style={styles.label}>头像</Text>
          <View style={styles.avatarBox}>
            <Image
              source={{uri: util.avatar(user.avatar, 'image')}}
              style={styles.avatar} />
          </View>
        </View>
        <View style={styles.fieldItem}>
          <Text style={styles.label}>昵称</Text>
          <Text style={styles.content}>{user.nickname}</Text>
        </View>

        <View style={styles.fieldItem}>
          <Text style={styles.label}>品种</Text>
          <Text style={styles.content}>{user.breed}</Text>
        </View>

        <View style={styles.fieldItem}>
          <Text style={styles.label}>年龄</Text>
          <Text style={styles.content}>{user.age}</Text>
        </View>

        <View style={styles.fieldItem}>
          <Text style={styles.label}>性别</Text>
          {
            user.gender === 'male' && <Text style={styles.content}>男</Text>
          }
          {
            user.gender === 'female' && <Text style={styles.content}>女</Text>
          }
        </View>

        <Button
          style={styles.btn}
          onPress={this._logout.bind(this)}>退出登录</Button>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Account)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff'
  },

  fieldItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: '#eee',
    borderBottomWidth: 1
  },

  label: {
    textAlign: 'left',
    color: '#999',
    marginRight: 10
  },

  content: {
    textAlign: 'right',
    color: '#555'
  },

  avatarBox: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  avatar: {
    marginBottom: 15,
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderColor: '#f9f9f9',
    borderWidth: 1,
    borderRadius: 20
  },

  btn: {
    marginTop: 25,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'transparent',
    borderColor: '#ee735c',
    borderWidth: 1,
    borderRadius: 4,
    color: '#ee735c'
  }
})

