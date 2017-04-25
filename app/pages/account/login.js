/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
import Button from 'react-native-button'
import request from '../../common/request'
import config from '../../common/config'
import Popup from '../../components/popup'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Alert,
  AsyncStorage
} from 'react-native'

const {height, width} = Dimensions.get('window')

export default class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pop: null,
      countText: 60,
      verifyCode: '',
      phoneNumber: '',
      submiting: false,
      counting: false,
      countingDone: false,
      codeSent: false
    }
  }

  _showVerifyCode () {
    var that = this

    this.setState({
      codeSent: true
    }, function() {
      that._counting()
    })
  }

  _countingDone () {
    this.setState({
      countingDone: true
    })
  }

  _sendVerifyCode () {
    let that = this
    const phoneNumber = this.state.phoneNumber

    if (!phoneNumber) {
      return that._alert('呜呜~', '手机号不能为空！')
    }

    let body = {
      phoneNumber: phoneNumber
    }

    const signupURL = config.api.signup

    request.post(signupURL, body)
      .then((data) => {
        console.log(data)
        if (data && data.success) {
          that._showVerifyCode()
        } else {
          that._alert('呜呜~', '获取验证码失败，请检查手机号是否正确')
        }
      })
      .catch((err) => {
        console.log(err)
        that._alert('呜呜~', '获取验证码失败，请检查网络是否良好')
      })
  }

  _submit () {
    let that = this
    const phoneNumber = this.state.phoneNumber
    const verifyCode = this.state.verifyCode

    if (!phoneNumber || !verifyCode) {
      return that._alert('呜呜~', '手机号或验证码不能为空！')
    }

    let body = {
      phoneNumber: phoneNumber,
      verifyCode: verifyCode
    }

    const verifyURL = config.api.verify

    this.setState({
      submiting: true
    }, function() {
      request.post(verifyURL, body)
        .then((data) => {
          if (data && data.success) {
            that.setState({
              submiting: false
            })
            that.props.afterLogin(data.data)
          } else {
            that.setState({
              submiting: false
            })
            that._alert('呜呜~', '获取验证码失败，请检查手机号是否正确')
          }
        })
        .catch((err) => {
          that.setState({
            submiting: false
          })
          that._alert('呜呜~', '获取验证码失败，请检查网络是否良好')
        })
    })

  }

  _alert (title, content) {
    var that = this

    this.setState({
      pop: {
        title: title,
        content: content
      }
    }, function () {
      setTimeout(function () {
        that.setState({
          pop: null
        })
      }, 1500)
    })
  }

  _tick() {
    var that = this
    var countText = this.state.countText

    countText--

    if (countText >= 0) {
      setTimeout(function() {
        if (that.state.submiting) {
          that.setState({
            countText: countText
          }, function() {
            that._tick()
          })
        }
      }, 1000)
    }
  }

  _counting () {
    var that = this
    var countText = 60

    if (!this.state.counting) {
      this.setState({
        counting: true,
        countText: countText
      }, function() {
        that._tick()
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.state.pop && <Popup {...this.state.pop} />}
        <View style={styles.signupBox}>
          <Text style={styles.title}>快速登录</Text>
          <TextInput
            placeholder='输入手机号'
            autoCaptialize={'none'}
            autoCorrect={false}
            keyboardType={'number-pad'}
            style={styles.inputField}
            onChangeText={(text) => {
              this.setState({
                phoneNumber: text
              })
            }}
          />

          {
            this.state.codeSent
            ? <View style={styles.verifyCodeBox}>
              <TextInput
                placeholder='输入验证码'
                autoCaptialize={'none'}
                autoCorrect={false}
                keyboardType={'number-pad'}
                style={[styles.inputField, styles.verifyField]}
                onChangeText={(text) => {
                  this.setState({
                    verifyCode: text
                  })
                }}
                />

              {
                  this.state.countingDone
                  ? <Button
                    style={styles.countBtn}
                    onPress={this._sendVerifyCode.bind(this)}>获取验证码</Button>
                  : <Text style={styles.countBtn}>剩余秒数: {this.state.countText}</Text>

                }
            </View>
            : null
          }

          {
            this.state.codeSent
            ? <Button
              style={styles.btn}
              onPress={this._submit.bind(this)}>登录</Button>
            : <Button
              style={styles.btn}
              onPress={this._sendVerifyCode.bind(this)}>获取验证码</Button>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9'
  },

  signupBox: {
    marginTop: 30
  },

  title: {
    marginBottom: 20,
    color: '#333',
    fontSize: 20,
    textAlign: 'center'
  },

  inputField: {
    height: 40,
    padding: 5,
    color: '#666',
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4
  },

  verifyField: {
    width: width - 140
  },

  verifyCodeBox: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  countBtn: {
    width: 110,
    height: 40,
    padding: 10,
    marginLeft: 8,
    backgroundColor: '#ee735c',
    borderColor: '#ee735c',
    color: '#fff',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 15,
    borderRadius: 2
  },

  btn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'transparent',
    borderColor: '#ee735c',
    borderWidth: 1,
    borderRadius: 4,
    color: '#ee735c'
  }
})
