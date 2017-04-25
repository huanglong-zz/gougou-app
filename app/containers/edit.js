import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Edit from '../pages/creation/edit'
import * as creationActions from '../actions/creation'

class EditContainer extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
     <Edit {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  const {
    user
  } = state.get('app')

  return {
    user: user
  }
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators(creationActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)
