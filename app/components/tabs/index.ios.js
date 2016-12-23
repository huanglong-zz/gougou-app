import Icon from 'react-native-vector-icons/Ionicons'

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {actions as navigationActions} from 'react-native-navigation-redux-helpers'

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'


const { jumpTo } = navigationActions
const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },

  handleBox: {
    padding: 10,
    flexDirection: 'row',
    width: width / 3,
    justifyContent: 'center'
  },

  selectedIcon: {
    color: '#ee735c'
  }
})


class Tabs extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { dispatch, navigation, routes } = this.props

    const children = navigation.routes.map((tab, i) => {
      return (
        <TouchableOpacity
          key={tab.key}
          style={styles.handleBox}
          onPress={() => dispatch(jumpTo(i, navigation.key))}>
          <Icon
            name={this.props.navigation.index == i ? tab.icon : tab.icon + '-outline'}
            style={this.props.navigation.index == i ? styles.selectedIcon : null}
            size={28} />
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.container}>
        {children}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.get('tabs')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
