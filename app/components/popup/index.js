import React, {Component, PropTypes} from 'react'
import {
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native'

const {height, width} = Dimensions.get('window')

export default class Popup extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      title,
      content
    } = this.props

    if (!title && !content) {
      return null
    }

    return (
      <View style={styles.popupContainer}>
        <View style={styles.tipBoxView}>
          <View style={styles.tipBox}>
            {
              title && <View style={styles.tipTitleBox}>
                <Text style={styles.tipTitle}>{title}</Text>
              </View>
            }
            {
              content && <View style={styles.tipContentBox}>
                <Text style={styles.tipContent}>{content}</Text>
              </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },

  tipBoxView: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 50,
    borderRadius: 12
  },

  tipBox: {
    paddingTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  tipTitleBox: {
    height: 30,
    width: width - 50
  },

  tipTitle: {
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center'
  },

  tipContentBox: {
    marginTop: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  tipContent: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center'
  }
})
