/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import ImagePicker from 'react-native-image-picker'
import {AudioRecorder, AudioUtils} from 'react-native-audio'
import Sound from 'react-native-sound'
import {Circle} from 'react-native-progress'
import Button from 'react-native-button'
import Popup from '../common/popup'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  AsyncStorage,
  ProgressViewIOS,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Modal,
  TextInput
} from 'react-native'

import request from '../common/request'
import config from '../common/config'

const {height, width} = Dimensions.get('window')

const videoOptions = {
  title: '选择视频',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '录制 15 秒视频',
  chooseFromLibraryButtonTitle: '选择已有视频',
  videoQuality: 'medium',
  mediaType: 'video',
  durationLimit: 15,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

const defaultState = {
  pop: null,
  previewVideo: null,

  videoId: null,
  audioId: null,

  title: '',
  modalVisible: false,
  publishing: false,
  willPublish: false,
  publishProgress: 0.2,

  // video upload
  video: null,
  videoUploaded: false,
  videoUploading: false,
  videoUploadedProgress: 0.14,

  // video loads
  videoProgress: 0.01,
  videoTotal: 0,
  currentTime: 0,
  audioCurrentTime: 0,

  // count down
  countText: '',
  counting: false,
  recording: false,

  // audio
  audio: null,
  audioPlaying: false,
  recordDone: false,
  hasPermission: false,
  audioPath: AudioUtils.DocumentDirectoryPath + '/gougou.aac',

  audioUploaded: false,
  audioUploading: false,
  audioUploadedProgress: 0.14,

  // video player
  rate: 1,
  muted: true,
  resizeMode: 'contain',
  repeat: false
}

export default class Edit extends Component {

  constructor (props) {
    super(props)
    const user = this.props.user || {}
    const state = _.clone(defaultState)

    state.user = user

    this.state = state
  }

  _onLoadStart () {
    console.log('load start')
  }

  _onLoad (data) {
    this.setState({videoTotal: data.duration})
  }

  _onProgress (data) {
    this.setState({currentTime: data.currentTime})
  }

  getCurrentTimePercentage () {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.videoTotal)
    } else {
      return 0
    }
  }

  // _onProgress (data) {
  //   console.log('data onproress')
  //   console.log(data)
  //   const duration = data.playableDuration
  //   const currentTime = data.currentTime
  //   const percent = Number((currentTime / duration).toFixed(2))

  //   if (this.state.videoProgress < 1) {
  //     this.setState({
  //       videoTotal: duration,
  //       currentTime: Number(data.currentTime.toFixed(2)),
  //       videoProgress: percent
  //     })
  //   }
  // }

  async _onEnd () {
    var newState = {}

    if (this.state.recording) {
      newState.recordDone = true
      newState.recording = false

      try {
        const filePath = await AudioRecorder.stopRecording()

        if (Platform.OS === 'android') {
          this._finishRecording(true, filePath)
        }
      } catch (e) {
        console.log(e)
      }
    }

    this.setState(newState)
  }

  _onError (e) {
    this.setState({
      videoOk: false
    })
  }

  async _preview () {
    // if (this.state.audioPlaying) {
    //   AudioRecorder.stopPlaying()
    // }

    this.setState({
      audioPlaying: true
    })

    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error)
        }
      })

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing')
          } else {
            console.log('playback failed due to audio decoding errors')
          }
        })
      }, 100)
    }, 100)

    this.refs.videoPlayer.seek(0)
  }

  async _record () {
    await this._initAudio()

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!')
      return
    }

    if (this.state.recording) {
      console.warn('Already recording!')
      return
    }

    this.setState({
      counting: false,
      recordDone: false,
      recording: true
    })

    try {
      await AudioRecorder.startRecording()
    } catch (error) {
      console.error(error)
    }

    this.refs.videoPlayer.seek(0)
  }

  _finishRecording (didSucceed, filePath) {
    this.setState({ finished: didSucceed })
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`)
  }

  _checkPermission () {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true)
    }

    const rationale = {
      'title': 'Microphone Permission',
      'message': 'GougouApp needs access to your microphone so you can record audio.'
    }

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        console.log('Permission result:', result)
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED)
      })
  }

  async _initAudio () {
    var hasPermission = await this._checkPermission()

    this.setState({
      hasPermission: hasPermission
    })

    if (!hasPermission) return

    const audioPath = this.state.audioPath

    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'High',
      AudioEncoding: 'aac'
    })

    AudioRecorder.onProgress = (data) => {
      console.log('is recording audio: ')
      this.setState({
        audioCurrentTime: Math.floor(data.currentTime)
      })
    }
    AudioRecorder.onFinished = (data) => {
      if (Platform.OS === 'ios') {
        this._finishRecording(data.status === 'OK', data.audioFileURL)
      }
      this.setState({
        finished: data.finished
      })
    }
  }

  _closeModal () {
    this.setState({
      modalVisible: false
    })
  }

  _showModal () {
    this.setState({
      modalVisible: true
    })
  }

  _tick () {
    var that = this
    var countText = this.state.countText

    countText--

    if (countText === 0) {
      this._record()
    } else {
      setTimeout(function () {
        that.setState({
          countText: countText
        }, function () {
          that._tick()
        })
      }, 1000)
    }
  }

  _counting () {
    var that = this
    var countText = 3

    if (!this.state.counting && !this.state.recording && !this.state.audioPlaying) {
      this.refs.videoPlayer.seek(this.state.videoTotal - 0.01)
      this.setState({
        counting: true,
        countText: countText
      }, function () {
        that._tick()
      })
    }
  }

  _getToken (body) {
    const signatureURL = config.api.signature

    body.accessToken = this.state.user.accessToken

    return request.post(signatureURL, body)
  }

  _upload (body, type) {
    let that = this
    let xhr = new XMLHttpRequest()
    let url = config.qiniu.upload

    if (type === 'audio') {
      url = config.cloudinary.video
    }

    let state = {}

    state[type + 'UploadedProgress'] = 0
    state[type + 'Uploading'] = true
    state[type + 'Uploaded'] = false

    this.setState(state)

    xhr.open('POST', url)
    xhr.onload = () => {
      if (xhr.status !== 200) {
        that._alert('呜呜~', '请求失败')
        console.log(xhr.responseText)

        return
      }

      if (!xhr.responseText) {
        that._alert('呜呜~', '未获得服务器响应')

        return
      }

      let response

      try {
        response = JSON.parse(xhr.response)
      } catch (e) {
        console.log(e)
        console.log('parse fails')
      }

      if (response) {
        let newState = {}

        newState[type] = response
        newState[type + 'Uploading'] = false
        newState[type + 'Uploaded'] = true

        that.setState(newState)

        const updateURL = config.api[type]
        const accessToken = this.state.user.accessToken
        let updateBody = {
          accessToken: accessToken
        }

        updateBody[type] = response

        if (type === 'audio') {
          updateBody.videoId = that.state.videoId
        }

        request
          .post(updateURL, updateBody)
          .catch((err) => {
            console.log(err)
            if (type === 'video') {
              that._alert('呜呜~', '视频同步出错，请重新上传！')
            } else if (type === 'audio') {
              that._alert('呜呜~', '音频同步出错，请重新上传！')
            }
          })
          .then((data) => {
            if (data && data.success) {
              let mediaState = {}

              mediaState[type + 'Id'] = data.data

              if (type === 'audio') {
                mediaState.modalVisible = true
                mediaState.willPublish = true
              }

              console.log(mediaState)
              that.setState(mediaState)
            } else {
              if (type === 'video') {
                that._alert('呜呜~', '视频同步出错，请重新上传！')
              } else if (type === 'audio') {
                that._alert('呜呜~', '音频同步出错，请重新上传！')
              }
            }
          })
      }
    }

    if (xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          let percent = Number((event.loaded / event.total).toFixed(2))
          let progressState = {}

          progressState[type + 'UploadedProgress'] = percent
          that.setState(progressState)
        }
      }
    }

    xhr.send(body)
  }

  _pickVideo () {
    let that = this

    ImagePicker.showImagePicker(videoOptions, (res) => {
      if (res.didCancel) {
        return
      }

      let state = _.clone(defaultState)
      const uri = res.uri

      state.previewVideo = uri
      state.user = this.state.user
      that.setState(state)

      that._getToken({
        type: 'video',
        cloud: 'qiniu'
      })
      .catch((err) => {
        that._alert('呜呜~', '上传出错')
      })
        .then((data) => {
          if (data && data.success) {
            const token = data.data.token
            const key = data.data.key
            let body = new FormData()

            body.append('token', token)
            body.append('key', key)
            body.append('file', {
              type: 'video/mp4',
              uri: uri,
              name: key
            })

            that._upload(body, 'video')
          }
        })
    })
  }

  async _uploadAudio () {
    const tags = 'app,audio'
    const folder = 'audio'
    const timestamp = Date.now()

    try {
      const data = await this._getToken({
        type: 'audio',
        timestamp: timestamp,
        cloud: 'cloudinary'
      })

      if (data && data.success) {
        // data.data
        const signature = data.data.token
        const key = data.data.key
        let body = new FormData()

        body.append('folder', folder)
        body.append('signature', signature)
        body.append('tags', tags)
        body.append('timestamp', timestamp)
        body.append('api_key', config.cloudinary.api_key)
        body.append('resource_type', 'video')
        body.append('file', {
          type: 'video/mp4',
          uri: this.state.audioPath,
          name: key
        })

        this._upload(body, 'audio')
      }
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount () {
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

  _submit () {
    let that = this
    let body = {
      title: this.state.title,
      videoId: this.state.videoId,
      audioId: this.state.audioId
    }

    const creationURL = config.api.creations
    const user = this.state.user

    if (user && user.accessToken) {
      body.accessToken = user.accessToken

      this.setState({
        publishing: true
      })

      request
        .post(creationURL, body)
        .catch((err) => {
          that._alert('呜呜~', '视频发布失败，请稍后重试')
        })
        .then((data) => {
          if (data && data.success) {
            that._closeModal()
            that._alert('汪汪~', '视频发布成功')
            const state = _.clone(defaultState)

            that.setState(state)
          } else {
            this.setState({
              publishing: false
            })
            that._alert('呜呜~', '视频发布失败')
          }
        })
    }
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

  shouldComponentUpdate (props, state) {
    console.log('shouldComponentUpdate props state')
    console.log(state)

    return true
  }

  onBuffer (isBuffering) {
    console.log(isBuffering)
  }

  onTimedMetadata (onTimedMetadata) {
    console.log(onTimedMetadata)
  }

  renderModal () {
    return (
      <Modal
        animationType={'slide'}
        visible={this.state.modalVisible}
        onRequestClose={() => {console.log('Modal has been closed.')}}>
        <View style={styles.modalContainer}>
          <Icon
            name='ios-close-outline'
            onPress={this._closeModal.bind(this)}
            style={styles.closeIcon} />
          {
            this.state.audioUploaded && !this.state.publishing
            ? <View style={styles.fieldBox}>
              <TextInput
                placeholder={'给狗狗一句宣言吧'}
                style={styles.inputField}
                autoCapitalize={'none'}
                autoCorrect={false}
                defaultValue={this.state.title}
                onChangeText={(text) => {
                  this.setState({
                    title: text
                  })
                }}
                />
            </View>
            : null
          }

          {
            this.state.publishing
            ? <View style={styles.loadingBox}>
              <Text style={styles.loadingText}>耐心等一下，拼命为您生成专属视频中...</Text>
              {
                  this.state.willPublish
                  ? <Text style={styles.loadingText}>正在合并视频音频...</Text>
                  : null
                }
              {
                  this.state.publishProgress > 0.3
                  ? <Text style={styles.loadingText}>开始上传喽！...</Text>
                  : null
                }

              <Circle
                showsText
                size={60}
                color={'#ee735c'}
                progress={this.state.publishProgress} />
            </View>
            : null
          }

          <View style={styles.submitBox}>
            {
              this.state.audioUploaded && !this.state.publishing
              ? <Button
                style={styles.btn}
                onPress={this._submit.bind(this)}>发布视频</Button>
              : null
            }
          </View>
        </View>
      </Modal>
    )
  }

  render () {
    const videoProgress = this.getCurrentTimePercentage()

    return (
      <View style={styles.container}>
        {this.state.pop && <Popup {...this.state.pop} />}
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>
            {this.state.previewVideo ? ('点击按钮配音' + this.state.modalVisible) : ('理解狗狗，从配音开始' + this.state.modalVisible)}
          </Text>
          {
            this.state.previewVideo && this.state.videoUploaded
            ? <Text style={styles.toolbarExtra} onPress={this._pickVideo.bind(this)}>更换视频</Text>
            : null
          }
        </View>

        <View style={styles.page}>
          {
            this.state.previewVideo
            ? <View style={styles.videoContainer}>
              <View style={styles.videoBox}>
                <Video
                  ref='videoPlayer'
                  source={{uri: this.state.previewVideo}}
                  style={styles.video}
                  volume={5}
                  playInBackground={false}
                  paused={this.state.paused}
                  rate={this.state.rate}
                  muted={this.state.muted}
                  resizeMode={this.state.resizeMode}
                  repeat={this.state.repeat}

                  onBuffer={this.onBuffer}
                  onTimedMetadata={this.onTimedMetadata}

                  onLoadStart={this._onLoadStart.bind(this)}
                  onLoad={this._onLoad.bind(this)}
                  onProgress={this._onProgress.bind(this)}
                  onEnd={this._onEnd.bind(this)}
                  onError={this._onError.bind(this)} />
                {
                    !this.state.videoUploaded && this.state.videoUploading
                    ? <View style={styles.progressTipBox}>
                      <ProgressViewIOS style={styles.progressBar} progressTintColor='#ee735c' progress={videoProgress} />
                      <Text style={styles.progressTip}>
                          正在生成静音视频，已完成{(this.state.videoUploadedProgress * 100).toFixed(2)}%
                        </Text>
                    </View>
                    : null
                  }

                {
                    this.state.recording || this.state.audioPlaying
                    ? <View style={styles.progressTipBox}>
                      <ProgressViewIOS style={styles.progressBar} progressTintColor='#ee735c' progress={videoProgress} />
                      {
                          this.state.recording
                          ? <Text style={styles.progressTip}>
                            录制声音中
                            </Text>
                          : null
                        }
                    </View>
                    : null
                  }

                {
                    this.state.recordDone && !this.state.recording
                    ? <View style={styles.previewBox}>
                      <Icon name='ios-play' style={styles.previewIcon} />
                      <Text style={styles.previewText} onPress={this._preview.bind(this)}>
                          预览{this.state.modalVisible}
                        </Text>
                    </View>
                    : null
                  }
              </View>
            </View>
            : <TouchableOpacity style={styles.uploadContainer} onPress={this._pickVideo.bind(this)}>
              <View style={styles.uploadBox}>
                <Image source={require('../assets/images/record.png')} style={styles.uploadIcon} />
                <Text style={styles.uploadTitle}>点我上传视频</Text>
                <Text style={styles.uploadDesc}>建议时长不超过 15 秒</Text>
              </View>
            </TouchableOpacity>
          }

          {
            this.state.videoUploaded
            ? <View style={styles.recordBox}>
                <View style={[styles.recordIconBox, (this.state.recording || this.state.audioPlaying) && styles.recordOn]}>
                  {
                    this.state.counting && !this.state.recording
                    ? <Text style={styles.countBtn}>{this.state.countText}</Text>
                    : <TouchableOpacity onPress={this._counting.bind(this)}>
                        <Icon name='ios-mic' style={styles.recordIcon} />
                      </TouchableOpacity>
                  }
                </View>
                {
                  this.state.recordDone && !this.state.recording && this.state.audioUploading
                  ? <Circle
                      showsText={true}
                      size={60}
                      color={'#ee735c'}
                      progress={this.state.audioUploadedProgress} />
                    : null
                }
              </View>
            : null
          }


          {
            this.state.videoUploaded && this.state.recordDone && !this.state.recording
            ? <View style={styles.uploadAudioBox}>
              {
                !this.state.audioUploaded && !this.state.audioUploading
                ? <Text style={styles.uploadAudioText} onPress={this._uploadAudio.bind(this)}>下一步</Text>
                : null
              }
            </View>
            : null
          }
        </View>
        { this.state.modalVisible && this.renderModal() }
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

  page: {
    flex: 1,
    alignItems: 'center'
  },

  uploadContainer: {
    marginTop: 90,
    width: width - 40,
    height: 210,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#ee735c',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#fff'
  },

  uploadTitle: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#000'
  },

  uploadDesc: {
    color: '#999',
    textAlign: 'center',
    fontSize: 12
  },

  uploadIcon: {
    width: 110,
    resizeMode: 'contain'
  },

  uploadBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  videoContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  videoBox: {
    width: width,
    height: height * 0.6
  },

  video: {
    width: width,
    height: height * 0.6,
    backgroundColor: '#333'
  },

  progressTipBox: {
    width: width,
    height: 30,
    backgroundColor: 'rgba(244,244,244,0.65)'
  },

  progressTip: {
    color: '#333',
    width: width - 10,
    padding: 5
  },

  progressBar: {
    width: width
  },

  recordBox: {
    width: width,
    height: 60,
    alignItems: 'center'
  },

  recordIconBox: {
    width: 68,
    height: 68,
    marginTop: -30,
    borderRadius: 34,
    backgroundColor: '#ee735c',
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  recordIcon: {
    fontSize: 58,
    backgroundColor: 'transparent',
    color: '#fff'
  },

  countBtn: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff'
  },

  recordOn: {
    backgroundColor: '#ccc'
  },

  previewBox: {
    width: 80,
    height: 30,
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: '#ee735c',
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  previewIcon: {
    marginRight: 5,
    fontSize: 20,
    color: '#ee735c',
    backgroundColor: 'transparent'
  },

  previewText: {
    fontSize: 20,
    color: '#ee735c',
    backgroundColor: 'transparent'
  },

  uploadAudioBox: {
    width: width,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  uploadAudioText: {
    width: width - 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ee735c',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 30,
    color: '#ee735c'
  },

  modalContainer: {
    width: width,
    height: height,
    paddingTop: 50,
    backgroundColor: '#fff'
  },

  closeIcon: {
    position: 'absolute',
    fontSize: 32,
    right: 20,
    top: 30,
    color: '#ee735c'
  },

  loadingBox: {
    width: width,
    height: 50,
    marginTop: 10,
    padding: 15,
    alignItems: 'center'
  },

  loadingText: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#333'
  },

  fieldBox: {
    width: width - 40,
    height: 36,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea'
  },

  inputField: {
    height: 36,
    textAlign: 'center',
    color: '#666',
    fontSize: 14
  },

  submitBox: {
    marginTop: 50,
    padding: 15
  },

  btn: {
    marginTop: 65,
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

