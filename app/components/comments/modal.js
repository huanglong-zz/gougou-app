/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
import Icon from 'react-native-vector-icons/Ionicons'
import * as commentActions from '../../actions/comment'
import * as util from '../../common/util'
import Button from 'react-native-button'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  Modal,
  View,
  TextInput,
  Image,
  Dimensions,
} from 'react-native'

const {height, width} = Dimensions.get('window')

class CommentModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      animationType: 'none',
      isSending: false
    }
  }

  _submit() {
    let that = this

    if (!this.state.content) {
      return that.props.popAlert('呜呜~', '留言不能为空！')
    }

    if (this.state.isSending) {
      return that.props.popAlert('呜呜~', '正在评论中！')
    }

    this.props.sendComment({
      creation: this.state.data._id,
      isSending: true,
      content: this.state.content
    })
  }

  _close() {
    this.props.navigation.goBack()
  }

  componentWillReceiveProps(a, b) {
    console.log(a)
    console.log('abc')
    console.log(b)
  }

  setContent(text) {
    this.setState({
      content: text
    })
  }

  render() {
    const {
      modalVisible
    } = this.props

    return (
      <Modal
        visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Icon
            onPress={this._close.bind(this)}
            name='ios-close-outline'
            style={styles.closeIcon} />

          <View style={styles.commentBox}>
            <View style={styles.comment}>
              <TextInput
                placeholder='敢不敢评论一个...'
                style={styles.content}
                multiline={true}
                defaultValue={this.state.content}
                onChangeText={(text) => {
                  this.setContent(text)
                }}
              />
            </View>
          </View>

          <Button style={styles.submitBtn} onPress={this._submit.bind(this)}>评论</Button>
        </View>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  const {
    modalVisible,
  } = state.get('comments')

  return {
    modalVisible: modalVisible,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(commentActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#fff'
  },

  closeIcon: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#ee753c'
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
    height: 80
  }
})
