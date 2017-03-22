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

export let willComment = (comment) => {
  return {
    type: types.WILL_COMMENT
  }
}

export let sendComment = (comment) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.SEND_COMMENTS_START
    })

    storage.getItem('user')
      .then(function(user) {
        const url = config.api.comment
        const body = {
          accessToken: user.accessToken,
          comment: comment
        }

        request.post(url, body)
          .then(function(data) {
            if (data && data.success) {
              let commentList = data.data
              let commentTotal = data.total

              dispatch({
                type: types.SEND_COMMENTS_FULFILLED,
                payload: {
                  user: user,
                  commentList: commentList,
                  commentTotal: commentTotal,
                  isSending: false,
                }
              })
            }
          })
          .catch((err) => {
            console.log(err)
            dispatch({
              type: types.SEND_COMMENTS_REJECTED,
              payload: {
                isLoadingTail: false,
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


export let fetchComments = (page, creationid) => {
  let url = config.api.comment
  let isLoadingTail = true

  return (dispatch, getState) => {
    dispatch({
      type: types.FETCH_COMMENTS_START,
      payload: {
        isLoadingTail: isLoadingTail
      }
    })

    storage.getItem('user')
      .then(function(user) {
        request.get(url, {
          creation: creationid,
          accessToken: user.accessToken,
          page: page
        })
        .then(data => {
          if (data && data.success) {
            if (data.data.length > 0) {
              let {
                commentList,
                nextPage,
                commentTotal
              } = getState()

              if (!nextPage) {
                nextPage = 1
              }

              let newCommentList = commentList || []
              let items = newCommentList.slice()

              if (page !== 0) {
                items = items.concat(data.data)
                nextPage += 1
              }
              else {
                items = data.data.concat(items)
              }

              newCommentList = items
              commentTotal = data.total

              dispatch({
                type: types.FETCH_COMMENTS_FULFILLED,
                payload: {
                  page: page,
                  user: user,
                  nextPage: nextPage,
                  commentList: newCommentList,
                  commentTotal: commentTotal,
                  isLoadingTail: false,
                  isRefreshing: false
                }
              })
            }
          }
          else {
            dispatch({
              type: types.FETCH_COMMENTS_REJECTED,
              payload: {
                isLoadingTail: false
              }
            })
          }
        })
        .catch((err) => {
          dispatch({
            type: types.FETCH_COMMENTS_REJECTED,
            payload: {
              isLoadingTail: false,
              err: err
            }
          })
        })
    })
  }
}
