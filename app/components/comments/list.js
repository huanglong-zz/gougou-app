/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
import Icon from 'react-native-vector-icons/Ionicons'
import * as commentActions from '../../actions/comment'
import * as util from '../../common/util'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  Image,
  Dimensions,
} from 'react-native'

const {height, width} = Dimensions.get('window')

class Comment extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchComments(1)
  }

  _fetchMoreData() {
    if (!this._hasMore() || this.props.isLoadingTail) {
      this.setState({
        isLoadingTail: false
      })

      return
    }

    const page = this.props.nextPage

    this.props.fetchComments(page)
  }

  _hasMore() {
    const {
      commentTotal,
      commentList
    } = this.props

    return commentList.length !== commentTotal
  }

  _focus() {
    this.props.navigation.navigate('Comment', {
      rowData: this.props.rowData
    })
  }

  _renderFooter() {
    if (!this._hasMore() && this.props.commentTotal !== 0) {
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      )
    }

    if (!this.props.isLoadingTail) {
      return <View style={styles.loadingMore} />
    }

    return <ActivityIndicator style={styles.loadingMore} />
  }

  _renderRow(row) {
    return (
      <View key={row._id} style={styles.replyBox}>
        <Image style={styles.replyAvatar} source={{uri: util.avatar(row.replyBy.avatar)}} />
        <View style={styles.reply}>
          <Text style={styles.replyNickname}>{row.replyBy.nickname}</Text>
          <Text style={styles.replyContent}>{row.content}</Text>
        </View>
      </View>
    )
  }

  _renderHeader() {
    const data = this.props.rowData

    return (
      <View style={styles.listHeader}>
        <View style={styles.infoBox}>
          <Image style={styles.avatar} source={{uri: util.avatar(data.author.avatar)}} />
          <View style={styles.descBox}>
            <Text style={styles.nickname}>{data.author.nickname}</Text>
            <Text style={styles.title}>{data.title}</Text>
          </View>
        </View>
        <View style={styles.commentBox}>
          <View style={styles.comment}>
            <TextInput
              placeholder='敢不敢评论一个...'
              style={styles.content}
              multiline={true}
              onFocus={this._focus.bind(this)}
            />
          </View>
        </View>

        <View style={styles.commentArea}>
          <Text style={styles.commentTitle}>精彩评论</Text>
        </View>
      </View>
    )
  }

  render() {
    const {
      commentList,
      fetchComments,
      isRefreshing,
      nextPage,
      onRefresh,
    } = this.props

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    let dataSource = ds.cloneWithRows(commentList)

    return (
      <ListView
        dataSource={dataSource}
        renderRow={this._renderRow.bind(this)}
        renderHeader={this._renderHeader.bind(this)}
        renderFooter={this._renderFooter.bind(this)}
        onEndReached={this._fetchMoreData.bind(this)}
        onEndReachedThreshold={20}
        enableEmptySections={true}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
      />
    )
  }
}

function mapStateToProps(state) {
  const {
    isLoadingTail,
    commentList,
    nextPage,
    commentTotal,
    page,
    user
  } = state.get('comments')

  return {
    user: user,
    page: page,
    nextPage: nextPage,
    isLoadingTail: isLoadingTail,
    commentTotal: commentTotal,
    commentList: commentList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(commentActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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

  content: {
    paddingLeft: 4,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 14,
    height: 40
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
