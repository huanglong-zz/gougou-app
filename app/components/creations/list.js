/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as creationActions from '../../actions/creation'
import Popup from '../../common/popup'
import Detail from './detail'
import Item from './item'

import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'

class List extends React.Component {
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

  loadingMore: {
    marginVertical: 20
  },

  loadingText: {
    color: '#777',
    textAlign: 'center'
  }
})

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(creationActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List)