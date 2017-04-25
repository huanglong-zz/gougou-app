import React, {Component} from 'react'
import {
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

const styles = StyleSheet.create({
  loadingMore: {
    marginVertical: 20
  }
})


const Loading = () => (
  <ActivityIndicator style={styles.loadingMore} />
)

export default Loading