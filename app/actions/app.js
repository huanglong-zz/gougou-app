import * as types from './actionTypes'
import * as storage from '../common/storage'

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

        console.log(user)
        console.log(entered)
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
        var type = types.CHECK_USER_STATUS

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
