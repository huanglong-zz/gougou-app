import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native'

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  bootPage: {
    width: width,
    height: height,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
})


const Boot = () => (
  <View style={styles.bootPage}>
    <ActivityIndicator color='#ee735c' />
  </View>
)

export default Boot