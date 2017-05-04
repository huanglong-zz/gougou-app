import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Tabs from './tabs'
import Boot from '../components/boot'
import Login from '../pages/account/login'
import Slider from '../pages/slider'
import * as appActions from '../actions/app'

// import {
//   AsyncStorage,
// } from 'react-native'

// AsyncStorage.multiRemove(['logined', 'user'])


class App extends Component {
  static propTypes = {
    booted: PropTypes.bool.isRequired,
    entered: PropTypes.bool.isRequired,
    logined: PropTypes.bool.isRequired,
    banners: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.willEnterApp()
  }

  render() {
    if (!this.props.booted) {
      return <Boot {...this.props} />
    }

    if (!this.props.entered) {
      return <Slider {...this.props} />
    }

    if (!this.props.logined) {
      return <Login {...this.props} />
    }

    return <Tabs />
  }
}


function mapStateToProps(state) {
  console.log(state)
  return {
    popup: state.get('app').popup,
    booted: state.get('app').booted,
    entered: state.get('app').entered,
    logined: state.get('app').logined,
    banners: state.get('app').banners
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


