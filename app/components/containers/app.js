import React, {Component, PropTypes} from 'react'
import {NavigationExperimental, Navigator} from 'react-native'
import {connect} from 'react-redux'

const {CardStack} = NavigationExperimental

import List from '../creation'
import Edit from '../edit'
import Account from '../account'
import Tabs from '../tabs'

import {
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  handleNavigation = action => {
    this.props.dispatch(action)
  }

  renderScene = props => {
    switch (props.scene.key) {
      case 'scene_list':
        return <List navigate={this.handleNavigation} />
      case 'scene_edit':
        return <Edit navigate={this.handleNavigation} />
      case 'scene_account':
        return <Account navigate={this.handleNavigation} />
      default:
        return null
    }
  }

  render() {
    const { dispatch, navigation } = this.props

    return (
      <View style={styles.container}>
        <CardStack
          direction="horizontal"
          navigationState={this.props.navigation}
          configureScene={(route) => {
            const InstantTransition = {
              gestures: null,
              defaultTransitionVelocity: null,
              springFriction: null,
              springTension: 1000,
              animationInterpolators: {
                into: r => r.opacity = 1,
                out: r => r.opacity = 1,
              },
            }
            return InstantTransition
            //return Navigator.SceneConfigs.FadeAndroid
          }}
          renderScene={this.renderScene.bind(this)}
        />
        <Tabs {...this.props} navigate={this.handleNavigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})


function mapStateToProps(state) {
  return {
    counter: state.get('counter'),
    navigation: state.get('tabs')
  }
}

function mapDispatchToProps(dispatch) {
  //return bindActionCreators(CounterActions, dispatch)
  return {
    dispatch,
    onNavigate() {
      console.log('@@ onNavigate', arguments)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

