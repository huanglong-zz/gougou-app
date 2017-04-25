import Button from 'react-native-button'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as commentActions from '../actions/comment'
import Comment from '../pages/comment'

import React, {Component} from 'react'

class CommentContainer extends Component {
  constructor (props) {
    super(props)
  }

  componentWillReceiveProps (props) {
    if (props.commentDone) {
      this.props.navigation.goBack()
    }
  }

  _submit (content) {
    this.props.sendComment({
      creation: this.props.navigation.state.params.rowData._id,
      content: content
    })
  }

  render () {
    return (
      <Comment
        submit={this._submit.bind(this)}
        {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  return {
    commentDone: state.get('comments').commentDone
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(commentActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer)
