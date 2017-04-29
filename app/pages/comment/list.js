import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import * as util from '../../common/util'
import Loading from '../../components/loading'
import NoMore from '../../components/nomore'

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

class Comment extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchComments(this.props.rowData._id)
  }

  // 在视频播放的中间，有时候会出现评论列表不渲染的情况，我们可以通过让列表滚动，强制它进行渲染
  componentDidUpdate(prevProps, prevState) {
    this.listView.scrollTo({y: 1})
  }

  _hasMore() {
    const {
      commentTotal,
      commentList
    } = this.props

    return commentList.length < commentTotal
  }

  _renderFooter() {
    const {
      commentTotal,
      isCommentLoadingTail
    } = this.props

    if (!this._hasMore() && commentTotal !== 0) {
      return <NoMore />
    }

    if (!isCommentLoadingTail) {
      return <Loading />
    }

    return null
  }

  _fetchMoreData() {
    const {
      isCommentLoadingTail,
      fetchComments
    } = this.props

    if (this._hasMore() && !isCommentLoadingTail) {
      fetchComments(this.props.rowData._id)
    }
  }

  _onRefresh() {
    this.props.fetchComments(this.props.rowData._id, 'recent')
  }

  _focus() {
    this.props.willComment()
    this.props.navigation.navigate('Comment', {
      rowData: this.props.rowData
    })
  }

  _renderFooter() {
    if (!this._hasMore() && this.props.commentTotal !== 0) {
      return <NoMore />
    }

    if (!this.props.isLoadingTail) {
      return <Loading />
    }

    return null
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
      commentList
    } = this.props

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    let dataSource = ds.cloneWithRows(commentList)

    return (
      <ListView
        ref={(listView) => { this.listView = listView }}
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

export default Comment

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
    borderRadius: 2,
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
