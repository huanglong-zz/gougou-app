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

export let fetchCreations = (up) => {
  return (dispatch, getState) => {
    let url = config.api.creations
    let isLoadingTail = false
    let isRefreshing = false
    let cid
    let {
      videoList,
      videoTotal
    } = getState()

    if (up) {
      isRefreshing = true
    }
    else {
      isLoadingTail = true
    }

    if (videoList && videoList.length > 0) {
      if (up) {
        cid = videoList[0]
      }
      else {
        cid = videoList[videoList.length - 1]
      }
    }

    dispatch({
      type: types.FETCH_CREATIONS_START,
      payload: {
        isLoadingTail: isLoadingTail,
        isRefreshing: isRefreshing
      }
    })

    let body = {
      up: up,
      cid: cid
    }

    storage.getItem('user')
      .then(function(user) {
        body.accessToken = user.accessToken

        request.get(url, body)
        .then(data => {
          if (data && data.success) {
            if (data.data.length > 0) {
              data.data.map(function(item) {
                const votes = item.votes || []

                if (user && votes.indexOf(user._id) > -1) {
                  item.voted = true
                }
                else {
                  item.voted = false
                }

                return item
              })


              let newVideoList = videoList || []
              let items = newVideoList.slice()

              if (!up) {
                items = items.concat(data.data)
              }
              else {
                items = data.data.concat(items)
              }

              newVideoList = items
              videoTotal = data.total

              dispatch({
                type: types.FETCH_CREATIONS_FULFILLED,
                payload: {
                  user: user,
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

export let popAlert = (title, content) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.SHOW_ALERT,
      payload: {
        title: title,
        content: content
      }
    })

    setTimeout(function () {
      dispatch({
        type: types.HIDE_ALERT
      })
    }, 1500)
  }
}
