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

export let fetchComments = (page) => {
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
            that.setState({
              isLoadingTail: false
            })
          }
        })
        .catch(err => {
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
