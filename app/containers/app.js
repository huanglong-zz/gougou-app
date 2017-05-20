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
  // Redux 本身提供了 bindActionCreators 函数，来将 action 包装成直接可被调用的函数。
  return bindActionCreators(appActions, dispatch)

  // fetch: (page) => dispatch({
  //  type: 'fetch',
  //  payload: page
  // })
}

// connect() 接收四个参数，它们分别是 mapStateToProps，mapDispatchToProps，mergeProps和options。
// 这个函数允许我们将 store 中的数据作为 props 绑定到组件上
// mapStateToProps(state, ownProps) : stateProps

// mapDispatchToProps(dispatch, ownProps): dispatchProps
// connect 的第二个参数是 mapDispatchToProps
// 将 action 作为 props 绑定到 MyComp 上

// [mergeProps(stateProps, dispatchProps, ownProps): props]
// 不管是 stateProps 还是 dispatchProps，都需要和 ownProps merge 之后才会被赋给 MyComp
// connect 的第三个参数就是用来做这件事。通常情况下，你可以不传这个参数，connect 就会使用 Object.assign 替代该方法

// 最后还有一个 options 选项，比较简单，基本上也不大会用到

export default connect(mapStateToProps, mapDispatchToProps)(App)
