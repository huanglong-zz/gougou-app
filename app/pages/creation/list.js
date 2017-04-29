import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Popup from '../../components/popup'
import Loading from '../../components/loading'
import NoMore from '../../components/nomore'
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
      popup={this._popup.bind(this)}
      onSelect={() => this.props.onLoadItem(row)}
      row={row} />
  }

  _popup(title, content) {
    this.props.popAlert(title, content)
  }

  _hasMore() {
    const {
      videoTotal,
      videoList
    } = this.props

    return videoList.length < videoTotal
  }

  _renderFooter() {
    const {
      videoTotal,
      isLoadingTail
    } = this.props

    if (!this._hasMore() && videoTotal !== 0) {
      return <NoMore />
    }

    if (!isLoadingTail) {
      return <Loading />
    }

    return null
  }

  _fetchMoreData() {
    const {
      isLoadingTail,
      videoList,
      fetchCreations
    } = this.props

    if (this._hasMore() && !isLoadingTail) {
      fetchCreations()
    }
  }

  _onRefresh() {
    this.props.fetchCreations('recent')
  }

  render() {
    const {
      videoList,
      fetchCreations,
      isRefreshing,
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
        <Popup {...this.props} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default List