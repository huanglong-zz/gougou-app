/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
import Icon from 'react-native-vector-icons/Ionicons'
import request from '../../common/request'  
import config from '../../common/config'
import * as util from '../../common/util'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native'

const {height, width} = Dimensions.get('window')

class Modal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      animationType: 'none',
      isSending: false
    }
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
            onPress={this._closeModal.bind(this)}
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
                  this.setState({
                    content: text
                  })
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
