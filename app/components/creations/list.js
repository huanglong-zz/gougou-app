/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import request from '../../common/request'  
import config from '../../common/config'
import util from '../../common/util'
import Popup from '../../common/popup'
import Detail from './detail'
import Item from './item'

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

const {height, width} = Dimensions.get('window')

export default class List extends React.Component {
  static propTypes = {
    onLoadItem: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  _renderRow(row) {
    return <Item
      key={row._id}
      user={this.props.user}
      alert={this._alert.bind(this)}
      onSelect={() => this.props.onLoadItem(row)}
      row={row} />
  }

  _alert(title, content) {
    this.props.popAlert(title, content)
  }

  _hasMore() {
    const {
      videoTotal,
      videoList
    } = this.props

    return videoList.length !== videoTotal
  }

  _renderFooter() {
    const {
      videoTotal,
      isLoadingTail,
      fetchCreations
    } = this.props

    if (!this._hasMore() && videoTotal !== 0) {
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      )
    }

    if (!isLoadingTail) {
      return <ActivityIndicator style={styles.loadingMore} />
    }

    return null
  }

  _fetchMoreData() {
    const {
      nextPage,
      isLoadingTail,
      fetchCreations
    } = this.props

    if (!this._hasMore() || isLoadingTail) {
      fetchCreations(nextPage)
    }
  }

  _onRefresh() {
    this.props.fetchCreations()
  }

  render() {
    const {
      videoList,
      fetchCreations,
      isRefreshing,
      nextPage,
      onRefresh,
    } = this.props

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    let dataSource = ds.cloneWithRows(videoList)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>狗狗有话说</Text>
        </View>
        <ListView
          dataSource={dataSource}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          onEndReached={this._fetchMoreData.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          onEndReachedThreshold={20}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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

  loadingMore: {
    marginVertical: 20
  },

  loadingText: {
    color: '#777',
    textAlign: 'center'
  }
})
