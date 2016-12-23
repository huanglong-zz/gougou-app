import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import CreationList from '../components/creations/list'
import * as creationActions from '../actions/creation'

class creationContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CreationList {...this.props} />
    )
  }

  componentWillMount() {
    this.props.fetchCreations(1)
  }

  _loadPage(row) {
    this.props.navigator.push({
      name: 'detail',
      component: Detail,
      params: {
        data: row
      }
    })
  }
}

function mapStateToProps(state) {
  const {
    isRefreshing,
    isLoadingTail,
    videoList,
    nextVideoList,
    nextPage,
    videoTotal,
    page,
    user
  } = state.get('creations')

  if (nextVideoList) {
    nextVideoList.map(function(item) {
      const votes = item.votes || []

      if (votes.indexOf(user._id) > -1) {
        item.voted = true
      }
      else {
        item.voted = false
      }

      return item
    })
  }

  let items = videoList.slice()
  let newVideoList
  let newPage = nextPage

  if (page !== 0) {
    newVideoList = items.concat(nextVideoList)
    newPage += 1
  }
  else {
    newVideoList = nextVideoList.concat(items)
  }

  return {
    isRefreshing: false,
    isLoadingTail: false,
    videoTotal: videoTotal,
    nextPage: newPage,
    page: page,
    user: user,
    videoList: []
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(creationActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(creationContainer)
