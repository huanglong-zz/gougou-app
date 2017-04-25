/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
import * as commentActions from '../../actions/comment'
import Button from 'react-native-button'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native'

const {height, width} = Dimensions.get('window')

class Comment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      content: '',
      multiline: true,
      isSending: false
    }
  }

  componentWillReceiveProps (props) {
    if (props.commentDone) {
      this.props.navigation.goBack()
    }
  }

  _submit () {
    if (!this.state.content) {
      return this.props.popAlert('呜呜~', '留言不能为空！')
    }

    if (this.state.isSending) {
      return this.props.popAlert('呜呜~', '正在评论中！')
    }

    this.setState({
      isSending: true
    })

    this.props.submit(this.state.content)
  }

  render () {
    return (
      <View style={styles.commentContainer}>
        <View style={styles.commentBox}>
          <View style={styles.comment}>
            <TextInput
              placeholder='敢不敢评论一个...'
              style={styles.content}
              multiline={this.state.multiline}
              defaultValue={this.state.content}
              onChangeText={(text) => {
                this.setState({
                  content: text
                })
              }}
            />
          </View>
        </View>

        {this.state.isSending && <ActivityIndicator color='#ee735c' />}

        <Button style={styles.submitBtn} onPress={this._submit.bind(this)}>评论</Button>
        <Popup {...this.props} />
      </View>
    )
  }
}

export default Comment

const styles = StyleSheet.create({
  commentContainer: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#fff'
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
