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


export let fetchComments = (cid, feed) => {
  return (dispatch, getState) => {
    let url = config.api.comment
    let isCommentLoadingTail = false
    let isCommentRefreshing = false
    let comment
    let id = ''

    const {
      commentList
    } = getState().get('comments')

    const {
      user
    } = getState().get('app')


    if (feed === 'recent') {
      isCommentRefreshing = true
      comment = commentList[0]
    }
    else {
      isCommentLoadingTail = true
      comment = commentList[commentList.length - 1]
    }

    if (comment && comment._id) {
      id = comment._id
    }

    dispatch({
      type: types.FETCH_COMMENTS_START,
      payload: {
        isCommentLoadingTail: isCommentLoadingTail,
        isCommentRefreshing: isCommentRefreshing
      }
    })

    request.get(url, {
      accessToken: user.accessToken,
      feed: feed,
      cid: cid,
      id: id
    })
    .then(data => {
      if (data && data.success) {
        if (data.data.length > 0) {
          let newCommentList

          if (feed === 'recent') {
            newCommentList = data.data.concat(commentList)
          }
          else {
            newCommentList = commentList.concat(data.data)
          }

          dispatch({
            type: types.FETCH_COMMENTS_FULFILLED,
            payload: {
              commentList: newCommentList,
              commentTotal: data.total,
              isCommentLoadingTail: false,
              isCommentRefreshing: false
            }
          })
        }
      }
    })
    .catch(err => {
      dispatch({
        type: types.FETCH_COMMENTS_REJECTED,
        payload: {
          isCommentLoadingTail: false,
          isCommentRefreshing: false,
          err: err
        }
      })
    })
  }
}
