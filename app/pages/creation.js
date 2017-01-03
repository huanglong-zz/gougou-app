import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import CreationList from '../components/creations/list'
import * as creationActions from '../actions/creation'

import { actions } from 'react-native-navigation-redux-helpers'

const {
  popRoute,
  pushRoute
} = actions

class creationContainer extends Component {
  constructor(props) {
    super(props)

    this._onLoadItem = this._onLoadItem.bind(this)
  }

  render() {
    return (
      <CreationList onLoadItem={this._onLoadItem} {...this.props} />
    )
  }

  _onLoadItem(row) {
    this.props.routeTo({
      key: 'detail',
      title: 'Detail Page',
      showBackButton: true,
      rowData: row
    }, 'global')
  }

  componentWillMount() {
    this.props.fetchCreations(1)
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
