'use strict'

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
import Icon from 'react-native-vector-icons/Ionicons'
import request from '../common/request'  
import config from '../common/config'
import util from '../common/util'
import Popup from '../common/popup'
import Detail from './detail'  

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Image,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  AlertIOS,
  AsyncStorage,
} from 'react-native'

const width = Dimensions.get('window').width

let cachedResults = {
  nextPage: 1,
  items: [],
  total: 0
}

class Item extends React.Component {
  constructor(props) {
    super(props)
    const row = this.props.row

    this.state = {
      up: row.voted,
      row: row
    }
  }

  _up() {
    let that = this
    let up = !this.state.up
    const row = this.state.row
    const url = config.api.base + config.api.up

    const body = {
      id: row._id,
      up: up ? 'yes' : 'no',
      accessToken: this.props.user.accessToken
    }

    request.post(url, body)
      .then(function(data) {
        if (data && data.success) {
          that.setState({
            up: up
          })
        }
        else {
          that.props.alert('失败', '点赞失败，稍后重试')
        }
      })
      .catch(function(err) {
        that.props.alert('失败', '点赞失败，稍后重试')
      })
  }

  render() {
    const row = this.state.row

    return (
      <TouchableHighlight onPress={this.props.onSelect.bind(this)}>
        <View style={styles.item}>
          <Text style={styles.title}>{row.title}</Text>
          <Image
            source={{uri: util.thumb(row.qiniu_thumb)}}
            style={styles.thumb}
          >
            <Icon
              name='ios-play'
              size={28}
              style={styles.play} />
          </Image>
          <View style={styles.itemFooter}>
            <View style={styles.handleBox}>
              <Icon
                name={this.state.up ? 'ios-heart' : 'ios-heart-outline'}
                size={28}
                onPress={this._up.bind(this)}
                style={[styles.up, this.state.up ? null : styles.down]} />
              <Text style={styles.handleText} onPress={this._up.bind(this)}>喜欢</Text>
            </View>
            <View style={styles.handleBox}>
              <Icon
                name='ios-chatboxes-outline'
                size={28}
                style={styles.commentIcon} />
              <Text style={styles.handleText}>评论</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default class List extends React.Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      pop: null,
      isRefreshing: false,
      isLoadingTail: false,
      dataSource: ds.cloneWithRows([]),
    }
  }

  _renderRow(row) {
    return <Item
      key={row._id}
      user={this.state.user}
      alert={this._alert.bind(this)}
      onSelect={() => this._loadPage(row)}
      row={row} />
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
          }, function() {
            that._fetchData(1)
          })
        }
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

  _fetchData(page) {
    let that = this

    if (page !== 0) {
      this.setState({
        isLoadingTail: true
      })
    }
    else {
      this.setState({
        isRefreshing: true
      })
    }

    let user = this.state.user

    request.get(config.api.base + config.api.creations, {
      accessToken: user.accessToken,
      page: page
    })
      .then((data) => {
        if (page !== 0) {
          that.setState({
            isLoadingTail: false
          })
        }
        else {
          that.setState({
            isRefreshing: false
          })
        }

        if (data && data.success) {
          if (data.data.length > 0) {
            data.data.map(function(item) {
              const votes = item.votes || []

              if (votes.indexOf(user._id) > -1) {
                item.voted = true
              }
              else {
                item.voted = false
              }

              return item
            })

            let items = cachedResults.items.slice()

            if (page !== 0) {
              items = items.concat(data.data)
              cachedResults.nextPage += 1
            }
            else {
              items = data.data.concat(items)
            }

            cachedResults.items = items
            cachedResults.total = data.total

            if (page !== 0) {
              that.setState({
                dataSource: that.state.dataSource.cloneWithRows(cachedResults.items)
              })
            }
            else {
              that.setState({
                dataSource: that.state.dataSource.cloneWithRows(cachedResults.items)
              })
            }
          }
        }
      })
      .catch((err) => {
        that._alert('请求失败，稍后重试')

        if (page !== 0) {
          this.setState({
            isLoadingTail: false
          })
        }
        else {
          this.setState({
            isRefreshing: false
          })
        }
      })
  }

  _hasMore() {
    return cachedResults.items.length !== cachedResults.total
  }

  _fetchMoreData() {
    if (!this._hasMore() || this.state.isLoadingTail) {

      this.setState({
        isLoadingTail: false
      })

      return
    }

    const page = cachedResults.nextPage

    this._fetchData(page)
  }

  _onRefresh() {
    if (!this._hasMore() || this.state.isRefreshing) {
      return
    }

    this._fetchData(0)
  }

  _renderFooter() {
    if (!this._hasMore() && cachedResults.total !== 0) {
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      )
    }

    if (!this.state.isLoadingTail) {
      return <View style={styles.loadingMore}></View>
    }

    return <ActivityIndicator style={styles.loadingMore} />
  }

  _loadPage(row) {
    this.props.navigator.push({
      name: 'detail',
      component: Detail,
      params: {
        data: row
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>狗狗有话说</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          onEndReached={this._fetchMoreData.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          onEndReachedThreshold={20}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
        />
        {this.state.pop && <Popup {...this.state.pop} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header: {
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c'
  },
  
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },

  item: {
    width: width,
    marginBottom: 10,
    backgroundColor: '#fff'
  },

  thumb: {
    width: width,
    height: width * 0.56,
    resizeMode: 'cover'
  },

  title: {
    padding: 10,
    fontSize: 18,
    color: '#333'
  },

  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },

  handleBox: {
    padding: 10,
    flexDirection: 'row',
    width: width / 2 - 0.5,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  play: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    color: '#ed7b66'
  },

  handleText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  },

  down: {
    fontSize: 22,
    color: '#333'
  },

  up: {
    fontSize: 22,
    color: '#ed7b66'
  },

  commentIcon: {
    fontSize: 22,
    color: '#333'
  },

  loadingMore: {
    marginVertical: 20
  },

  loadingText: {
    color: '#777',
    textAlign: 'center'
  }
})
