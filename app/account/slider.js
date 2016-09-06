'use strict'


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
const Swiper = require('react-native-swiper')

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Slider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loop: false,
      banners: [
        require('../assets/images/s1.jpg'),
        require('../assets/images/s2.jpg'),
        require('../assets/images/s3.jpg')
      ]
    }
  }

  _enter() {
    this.props.enterSlide()
  }

  render() {
    return (
      <Swiper
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.pagination}
        loop={this.state.loop}>
        <View style={styles.slide}>
          <Image style={styles.image} source={this.state.banners[0]} />
        </View>
        <View style={styles.slide}>
          <Image style={styles.image} source={this.state.banners[1]} />
        </View>
        <View style={styles.slide}>
          <Image style={styles.image} source={this.state.banners[2]}>
            <TouchableHighlight style={styles.btn} onPress={this._enter.bind(this)}>
              <Text style={styles.btnText}>马上体验</Text>
            </TouchableHighlight>
          </Image>
        </View>
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: width
  },

  image: {
    flex: 1,
    width: width,
    height: height
  },

  dot: {
    width: 14,
    height: 14,
    backgroundColor: 'transparent',
    borderColor: '#ff6600',
    borderRadius: 7,
    borderWidth: 1,
    marginLeft: 12,
    marginRight: 12
  },

  activeDot: {
    width: 14,
    height: 14,
    borderWidth: 1,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 7,
    borderColor: '#ee735c',
    backgroundColor: '#ee735c',
  },

  pagination: {
    bottom: 30
  },

  btn: {
    position: 'absolute',
    width: width - 20,
    left: 10,
    bottom: 60,
    height: 50,
    padding: 15,
    backgroundColor: '#ee735c',
    borderColor: '#ee735c',
    borderWidth: 1,
    borderRadius: 3
  },

  btnText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
})