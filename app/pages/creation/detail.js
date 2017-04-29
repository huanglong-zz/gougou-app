import Icon from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import Popup from '../../components/popup'

import CommentList from '../comment/list'
import util from '../../common/util'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ListView,
  ActivityIndicator
} from 'react-native'

const {height, width} = Dimensions.get('window')

class Detail extends Component {
  constructor (props) {
    super(props)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      // comments
      dataSource: ds.cloneWithRows([]),

      // video loads
      videoOk: true,
      videoLoaded: false,
      playing: false,
      paused: false,
      duration: 0.0,
      currentTime: 0.0,

      // video player
      rate: 1,
      muted: false,
      resizeMode: 'contain',
      repeat: false
    }
  }

  _onLoadStart () {
    console.log('load start')
  }

  _onLoad (data) {
    this.setState({duration: data.duration})
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
    } else {
      return 0
    }
  }

  _onProgress (data) {
    if (data.playableDuration === 0) {
      this.setState({
        currentTime: this.state.duration,
        playing: false
      })
    } else {
      if (!this.state.videoLoaded) {
        this.setState({
          videoLoaded: true
        })
      }

      let newState = {
        currentTime: data.currentTime,
      }

      if (!this.state.videoLoaded) {
        newState.videoLoaded = true
      }
      if (!this.state.playing) {
        newState.playing = true
      }

      this.setState(newState)
    }
  }

  _onEnd () {
    this.setState({
      currentTime: this.state.duration,
      playing: false
    })
  }

  _onError (e) {
    this.setState({
      videoOk: false
    })
  }

  _rePlay () {
    this.player.seek(0)
  }

  _pause() {
    if (!this.state.paused) {
      this.setState({
        paused: true
      })
    }
  }

  _resume() {
    if (this.state.paused) {
      this.setState({
        paused: false
      })
    }
  }

  render () {
    const data = this.props.rowData
    const flexCompleted = this.getCurrentTimePercentage()

    return (
      <View style={styles.container}>
        <View style={styles.videoBox}>
          <Video
            ref={(ref) => {
              this.player = ref
            }} 
            source={{uri: util.video(data.qiniu_video)}}
            style={styles.video}
            volume={5}
            paused={this.state.paused}
            rate={this.state.rate}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            repeat={this.state.repeat}

            onLoadStart={this._onLoadStart.bind(this)}
            onLoad={this._onLoad.bind(this)}
            onProgress={this._onProgress.bind(this)}
            onEnd={this._onEnd.bind(this)}
            onError={this._onError.bind(this)} />

          {
            !this.state.videoOk && <Text style={styles.failText}>视频出错了！很抱歉</Text>
          }

          {
            !this.state.videoLoaded && <ActivityIndicator color='#ee735c' style={styles.loading} />
          }

          {
            (this.state.videoLoaded && !this.state.playing) &&
              <Icon onPress={this._rePlay.bind(this)} name='ios-play' size={48} style={styles.playIcon} />
          }

          {
            this.state.videoLoaded && this.state.playing
            ? <TouchableOpacity onPress={this._pause.bind(this)} style={styles.pauseBtn}>
              {
                this.state.paused && <Icon onPress={this._resume.bind(this)} size={48} name='ios-play' style={styles.resumeIcon} />
              }
            </TouchableOpacity>
            : null
          }

          <View style={styles.progressBox}>
            <View style={[styles.progressBar, {width: width * flexCompleted}]} />
          </View>
        </View>

        <CommentList {...this.props} />
        <Popup {...this.props.pop} />
      </View>
    )
  }
}

export default Detail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  submitBtn: {
    width: width - 20,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ee753c',
    alignSelf: 'center',
    borderRadius: 4,
    fontSize: 18,
    color: '#ee753c'
  },

  videoBox: {
    width: width,
    height: width * 0.56,
    backgroundColor: '#000'
  },

  video: {
    width: width,
    height: width * 0.56,
    backgroundColor: '#000'
  },

  failText: {
    position: 'absolute',
    left: 0,
    top: 90,
    width: width,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent'
  },

  loading: {
    position: 'absolute',
    left: 0,
    top: 80,
    width: width,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },

  progressBox: {
    width: width,
    height: 2,
    backgroundColor: '#ccc'
  },

  progressBar: {
    width: 1,
    height: 2,
    backgroundColor: '#ff6600'
  },

  playIcon: {
    position: 'absolute',
    top: 90,
    left: width / 2 - 30,
    width: 60,
    height: 60,
    paddingTop: 8,
    paddingLeft: 22,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    color: '#ed7b66'
  },

  pauseBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: width * 0.56
  },

  resumeIcon: {
    position: 'absolute',
    top: 80,
    left: width / 2 - 30,
    width: 60,
    height: 60,
    paddingTop: 8,
    paddingLeft: 22,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    color: '#ed7b66'
  },

  infoBox: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },

  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 30
  },

  descBox: {
    flex: 1
  },

  nickname: {
    fontSize: 18
  },

  title: {
    marginTop: 8,
    fontSize: 16,
    color: '#666'
  },

  replyBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10
  },

  replyAvatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20
  },

  replyNickname: {
    color: '#666'
  },

  replyContent: {
    marginTop: 4,
    color: '#666'
  },

  reply: {
    flex: 1
  },

  loadingMore: {
    marginVertical: 20
  },

  loadingText: {
    color: '#777',
    textAlign: 'center'
  },

  listHeader: {
    width: width,
    marginTop: 10
  },

  commentBox: {
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    width: width
  },

  commentArea: {
    width: width,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
})
