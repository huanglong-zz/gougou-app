import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Update from '../pages/account/update'
import * as appActions from '../actions/app'

class UpdateContainer extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
     <Update {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.get('app').user,
    popup: state.get('app').popup
  }
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContainer)
