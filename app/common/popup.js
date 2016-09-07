'use strict'

import React, {Component, PropTypes} from 'react'
import {
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native'

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

export default class Popup extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      title: this.props.title,
      content: this.props.content
    }
  }

  render() {
    let title = this.state.title
    let content = this.state.content

    return (
      <View style={styles.popupContainer}>
        <View style={styles.tipBoxView}>
          <View style={styles.tipBox}>
            {
              title ? <View style={styles.tipTitleBox}>
                <Text style={styles.tipTitle}>{title}</Text>
              </View>
              : null
            }
            {
              content ? <View style={styles.tipContentBox}>
                <Text style={styles.tipContent}>{content}</Text>
              </View>
              : null
            }
          </View>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  tipBoxView: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 50,
    borderRadius: 12,
    overflow: 'hidden',
  },
  
  tipBox: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  tipTitleBox: {
    height: 30,
    width: width - 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  tipTitle: {
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center',
  },
  
  tipContentBox: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tipContent: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  }
})
