import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import CreationList from '../components/creation/list'
import * as creationActions from '../actions/creation'


class creationContainer extends Component {
  constructor(props) {
    super(props)
  }

  _onLoadItem(row) {
    this.props.navigation.navigate('Detail', {
      rowData: row
    })
  }

  componentWillMount() {
    this.props.fetchCreations(1)
  }
  
  render() {
    return (
      <CreationList
        onLoadItem={this._onLoadItem.bind(this)}
        {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  const {
    isRefreshing,
    isLoadingTail,
    videoList,
    nextPage,
    videoTotal,
    page,
    user
  } = state.get('creations')

  return {
    isRefreshing: false,
    isLoadingTail: false,
    videoTotal: videoTotal,
    nextPage: nextPage,
    page: page,
    user: user,
    videoList: videoList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(creationActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(creationContainer)
