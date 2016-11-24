'use strict'

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
import sha1 from 'sha1'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from 'react-native-button'
import {Circle} from 'react-native-progress'
import ImagePicker from 'react-native-image-picker'
import request from '../common/request'
import Popup from '../common/popup'
import config from '../common/config'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Alert,
  Image,
  AsyncStorage,
  TouchableOpacity,
  Dimensions
} from 'react-native'


const width = Dimensions.get('window').width

const photoOptions = {
  title: '选择头像',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择相册',
  quality: 0.75,
  allowsEditing: true,
  noData: false,
  storageOptions: { 
    skipBackup: true, 
    path: 'images'
  }
}

function avatar(id, type) {
  if (id.indexOf('http') > -1) {
    return id
  }

  if (id.indexOf('data:image') > -1) {
    return id
  }

  if (id.indexOf('avatar/') > -1) {
    return config.cloudinary.base + '/' + type + '/upload/' + id
  }

  return 'http://o9spjqu1b.bkt.clouddn.com/' + id
}

export default class Account extends React.Component {
  constructor(props) {
    super(props)

    const user = this.props.user || {}

    this.state = {
      pop: null,
      user: user,
      avatarProgress: 0,
      avatarUploading: false,
      modalVisible: false
    }
  }

  _edit() {
    this.setState({
      modalVisible: true
    })
  }

  _closeModal() {
    this.setState({
      modalVisible: false
    })
  }

  componentDidMount() {
    let that = this
    
    AsyncStorage.getItem('user')
      .then((data) => {
        let user

        if (data) {
          user = JSON.parse(data)
        }

        if (user && user.accessToken) {
          that.setState({
            user: user
          })
        }
      })
  }

  _getQiniuToken() {
    const accessToken = this.state.user.accessToken
    const signatureURL = config.api.base + config.api.signature

    return request.post(signatureURL, {
      accessToken: accessToken,
      type: 'avatar',
      cloud: 'qiniu'
    })
    .catch((err) => {
      console.log(err)
    })
  }

  _pickPhoto() {
    let that = this

    ImagePicker.showImagePicker(photoOptions, (res) => {
      if (res.didCancel) {
        return
      }

      const avatarData = 'data:image/jpeg;base64,' + res.data
      const uri = res.uri

      that._getQiniuToken()
        .then((data) => {
          if (data && data.success) {
            const token = data.data.token
            const key = data.data.key
            let body = new FormData()

            body.append('token', token)
            body.append('key', key)
            body.append('file', {
              type: 'image/jpeg',
              uri: uri,
              name: key
            })

            that._upload(body)
          }
        })
    })
  }

  _alert(title, content) {
    var that = this

    this.setState({
      pop: {
        title: title,
        content: content
      }
    }, function() {
      setTimeout(function() {
        that.setState({
          pop: null
        })
      }, 1500)
    })
  }

  _upload(body) {
    let that = this
    const xhr = new XMLHttpRequest()
    const url = config.qiniu.upload

    this.setState({
      avatarUploading: true,
      avatarProgress: 0
    })

    xhr.open('POST', url)
    xhr.onload = () => {
      if (xhr.status !== 200) {
        that._alert('呜呜~', '上传失败，稍后重试')

        return
      }

      if (!xhr.responseText) {
        that._alert('呜呜~', '服务器异常，稍后重试')

        return
      }

      let response

      try {
        response = JSON.parse(xhr.response)
      }
      catch (e) {
        that._alert('呜呜~', '返回数据异常，稍后重试')
      }

      if (response) {
        let user = this.state.user

        if (response.public_id) {
          user.avatar = response.public_id
        }
        
        if (response.key) {
          user.avatar = response.key
        }

        that.setState({
          avatarUploading: false,
          avatarProgress: 0,
          user: user
        })

        that._asyncUser(true)
      }
    }

    if (xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          let percent = Number((event.loaded / event.total).toFixed(2))

          that.setState({
            avatarProgress: percent
          })
        }
      }
    }

    xhr.send(body)
  }

  _asyncUser(isAvatar) {
    let that = this
    let user = this.state.user

    if (user && user.accessToken) {
      const url = config.api.base + config.api.update

      request.post(url, user)
        .then((data) => {
          if (data && data.success) {
            user = data.data

            if (isAvatar) {
              that._alert('汪汪~', '头像更新成功')
            }

            that.setState({
              user: user
            }, function() {
              that._closeModal()
              AsyncStorage.setItem('user', JSON.stringify(user))
            })
          }
        })
    }
  }

  _changeUserState(key, value) {
    let user = this.state.user

    user[key] = value

    this.setState({
      user: user
    })
  }

  _submit() {
    this._asyncUser()
  }

  _logout() {
    this.props.logout()
  }

  render() {
    const user = this.state.user

    return (
      <View style={styles.container}>
        {this.state.pop && <Popup {...this.state.pop} />}
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>狗狗的账户</Text>
          <Text style={styles.toolbarExtra} onPress={this._edit.bind(this)}>编辑</Text>
        </View>

        {
          user.avatar
          ? <TouchableOpacity onPress={this._pickPhoto.bind(this)} style={styles.avatarContainer}>
            <Image source={{uri: avatar(user.avatar, 'image')}} style={styles.avatarContainer}>
              <View style={styles.avatarBox}>
                {
                  this.state.avatarUploading
                  ? <Circle
                    showsText={true}
                    size={75}
                    color={'#ee735c'}
                    progress={this.state.avatarProgress} />
                  : <Image
                    source={{uri: avatar(user.avatar, 'image')}}
                    style={styles.avatar} />
                }
              </View>
              <Text style={styles.avatarTip}>戳这里换头像</Text>
            </Image>
          </TouchableOpacity>
          : <TouchableOpacity onPress={this._pickPhoto.bind(this)} style={styles.avatarContainer}>
            <Text style={styles.avatarTip}>添加狗狗头像</Text>
            <View style={styles.avatarBox}>
              {
                this.state.avatarUploading
                ? <Circle
                    showsText={true}
                    size={75}
                    color={'#ee735c'}
                    progress={this.state.avatarProgress} />
                : <Icon          
                    name='ios-cloud-upload-outline'
                    style={styles.plusIcon} />
              }
            </View>
          </TouchableOpacity>
        }

        <Modal
          animationType={'slide'}
          visible={this.state.modalVisible}>
          <View style={styles.modalContainer}>
            <Icon
              name='ios-close-outline'
              onPress={this._closeModal.bind(this)}
              style={styles.closeIcon} />
            
            <View style={styles.fieldItem}>
              <Text style={styles.label}>昵称</Text>
              <TextInput
                placeholder={'输入你的昵称'}
                style={styles.inputField}
                autoCapitalize={'none'}
                autoCorrect={false}
                defaultValue={user.nickname}
                onChangeText={(text) => {
                  this._changeUserState('nickname', text)
                }}
              />
            </View>

            <View style={styles.fieldItem}>
              <Text style={styles.label}>品种</Text>
              <TextInput
                placeholder={'狗狗的品种'}
                style={styles.inputField}
                autoCapitalize={'none'}
                autoCorrect={false}
                defaultValue={user.breed}
                onChangeText={(text) => {
                  this._changeUserState('breed', text)
                }}
              />
            </View>

            <View style={styles.fieldItem}>
              <Text style={styles.label}>年龄</Text>
              <TextInput
                placeholder={'狗狗的年龄'}
                style={styles.inputField}
                autoCapitalize={'none'}
                autoCorrect={false}
                defaultValue={user.age}
                onChangeText={(text) => {
                  this._changeUserState('age', text)
                }}
              />
            </View>

            <View style={styles.fieldItem}>
              <Text style={styles.label}>性别</Text>
              <Icon.Button
                onPress={() => {
                  this._changeUserState('gender', 'male')
                }}
                style={[
                  styles.gender,
                  user.gender === 'male' && styles.genderChecked
                ]}
                name='ios-paw'>男</Icon.Button>
              <Icon.Button
                onPress={() => {
                  this._changeUserState('gender', 'female')
                }}
                style={[
                  styles.gender,
                  user.gender === 'female' && styles.genderChecked
                ]}
                name='ios-paw-outline'>女</Icon.Button>
            </View>

            <Button
              style={styles.btn}
              onPress={this._submit.bind(this)}>保存资料</Button>
          </View>
        </Modal>

        <Button
          style={styles.btn}
          onPress={this._logout.bind(this)}>退出登录</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  toolbar: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c'
  },

  toolbarTitle: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600'
  },

  toolbarExtra: {
    position: 'absolute',
    right: 10,
    top: 26,
    color: '#fff',
    textAlign: 'right',
    fontWeight: '600',
    fontSize: 14
  },

  avatarContainer: {
    width: width,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666'
  },

  avatarTip: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 14
  },

  avatarBox: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  avatar: {
    marginBottom: 15,
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'cover',
    borderColor: '#f9f9f9',
    borderWidth: 1,
    borderRadius: width * 0.1
  },

  plusIcon: {
    padding: 20,
    paddingLeft: 25,
    paddingRight: 25,
    color: '#999',
    fontSize: 24,
    backgroundColor: '#fff',
    borderRadius: 8
  },

  modalContainer: {
    flex: 1,
    paddingTop: 50,
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
    color: '#ccc',
    marginRight: 10
  },

  closeIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    fontSize: 32,
    right: 20,
    top: 30,
    color: '#ee735c'
  },

  gender: {
    backgroundColor: '#ccc'
  },

  genderChecked: {
    backgroundColor: '#ee735c'
  },

  inputField: {
    flex: 1,
    height: 50,
    color: '#666',
    fontSize: 14
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

