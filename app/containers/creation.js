import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import CreationList from '../components/creations/list'
import * as creationActions from '../actions/creation'


class creationContainer extends Component {
  constructor(props) {
    super(props)

    this._onLoadItem = this._onLoadItem.bind(this)
    this._backTo = this._backTo.bind(this)
  }

  render() {
    return (
      <CreationList
        backTo={this._backTo}
        onLoadItem={this._onLoadItem}
        {...this.props} />
    )
  }

  _onLoadItem(row) {
    console.log(row)
    this.props.navigation.navigate('Detail', {
      rowData: row
    })
  }

  _backTo(key) {
    this.props.pop(key)
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
