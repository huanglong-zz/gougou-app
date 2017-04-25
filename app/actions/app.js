import * as types from './actionTypes'
import * as storage from '../common/storage'
import request from '../common/request'
import config from '../common/config'

export let enteredSlide = () => {
  return (dispatch, getState) => {
    storage.setItem('entered', 'yes').then(function () {
      dispatch({
        type: types.ENTER_SLIDE
      })
    })
  }
}

export let appBooted = () => {
  return {
    type: types.APP_BOOTED
  }
}

export let afterLogin = (user) => {
  return (dispatch, getState) => {
    storage.setItem('user', user).then(function () {
      dispatch({
        type: types.USER_LOGINED,
        payload: {
          user: user
        }
      })
    })
  }
}

export let pop = () => {
  return {
    type: types.POP
  }
}

export let back = () => {
  return {
    type: types.BACK
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

export let willEnterApp = () => {
  return (dispatch, getState) => {
    storage.multiGet(['user', 'entered'])
      .then(function (data) {
        let user = data[0]
        let entered = data[1]

        dispatch({
          type: types.WILL_ENTER_APP,
          payload: {
            user: user,
            entered: entered
          }
        })
      })
  }
}

export let checkUserStatus = () => {
  return (dispatch, getState) => {
    storage.getItem('user')
      .then(function (data) {
        if (data && data.accessToken) {
          dispatch({
            type: types.USER_LOGINED,
            payload: {
              user: data
            }
          })
        } else {
          dispatch({
            type: types.USER_LOGOUT
          })
        }
      })
  }
}

export let updateUserInfo = (userInfo) => {
  const url = config.api.update

  return (dispatch, getState) => {
    request.post(url, userInfo)
    .then(data => {
      if (data && data.success) {
        storage.setItem('user', JSON.stringify(data.data))

        dispatch({
          type: types.USER_UPDATED,
          payload: {
            user: data.data,
            popup: {
              title: 'Yeah',
              content: '更新成功'
            }
          }
        })

        setTimeout(function () {
          console.log('hide')
          dispatch({
            type: types.HIDE_ALERT,
            popup: null
          })
        }, 1500)
      }
    })
  }
}

/**
 *
 * @param isLoading
 * @returns {function(*)}
 */
// export let productView = (product_id, app_cart_cookie_id, access_token) => {
//     let url = urls.kUrlProductView + product_id
//     let data = {
//         app_cart_cookie_id: app_cart_cookie_id,
//         access_token: access_token,
//     }
//     return (dispatch) => {
//         dispatch({'type': types.kProductView, 'isLoading':true})
//         Util.post(url, data,
//             (status, code, message, data, share) => {
//                 let product = []
//                 let cart_num = 0
//                 if (status) {
//                     product = data.product
//                     cart_num = data.cart_num
//                 }
//                 dispatch({type:types.kProductViewReceived, status:status, code:code, message:message, share:share, product:product, cart_num:cart_num})
//                 dispatch(cartNumFromSync(cart_num))
//             },
//             (error) => {
//                 // Alert.alert(error.message)
//                 dispatch({'type': types.kActionError, 'isLoading':false, 'error':error})
//             })
//     }
// }
