/**
 * imoocApp
 * redux actions - 视频列表模块
 *
 * @author Scott
 * @date 2016-12-10
 * @license The MIT License (MIT)
 */

import * as types from './actionTypes'
import config from '../common/config'
import request from '../common/request'
import * as storage from '../common/storage'

export let fetchCreations = (page) => {
    let url = config.api.creations
    let isLoadingTail = false
    let isRefreshing = false

    if (page !== 0) {
      isLoadingTail = true
    }
    else {
      isRefreshing = true
    }

    return (dispatch, getState) => {
      dispatch({
        type: types.FETCH_CREATIONS_START,
        payload: {
          isLoadingTail: isLoadingTail,
          isRefreshing: isRefreshing
        }
      })

      storage.getItem('user')
        .then(function(user) {
          request.get(url, {
            accessToken: user.accessToken,
            page: page
          })
          .then(data => {
            if (data && data.success) {
              if (data.data.length > 0) {
                data.data.map(function(item) {
                  const votes = item.votes || []

                  if (votes.indexOf(user._id) > -1) {
                    item.voted = true
                  }
                  else {
                    item.voted = false
                  }

                  return item
                })

                let {
                  videoList,
                  nextPage,
                  videoTotal
                } = getState()

                if (!nextPage) {
                  nextPage = 1
                }

                let newVideoList = videoList || []

                let items = newVideoList.slice()

                if (page !== 0) {
                  items = items.concat(data.data)
                  nextPage += 1
                }
                else {
                  items = data.data.concat(items)
                }

                newVideoList = items
                videoTotal = data.total

                dispatch({
                  type: types.FETCH_CREATIONS_FULFILLED,
                  payload: {
                    page: page,
                    user: user,
                    nextPage: nextPage,
                    videoList: newVideoList,
                    videoTotal: videoTotal,
                    isLoadingTail: false,
                    isRefreshing: false
                  }
                })
              }
            }
          })
          .catch(err => {
            dispatch({
              type: types.FETCH_CREATIONS_REJECTED,
              payload: {
                isLoadingTail: false,
                isRefreshing: false,
                err: err
              }
            })
          })
        })
    }
}
