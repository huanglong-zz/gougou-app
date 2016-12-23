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

// function fetchSongs(url, playlist) {
//   return (dispatch, getState) => {
//     dispatch(requestSongs(playlist))
//     return fetch(url)
//       .then(response => response.json())
//       .then(json => {
//         const songs = json.collection.filter(song => song.streamable && song.duration < 600000 )
//         const nextUrl = json.next_href
//         const normalized = normalize(songs, arrayOf(songSchema))
//         dispatch(receiveSongs(normalized.entities, normalized.result, nextUrl, playlist))
//       })
//       .catch(error => console.log(error))
//   }
// }

// export function fetchSongsIfNeeded(playlist) {
//   return (dispatch, getState) => {
//     const {playlists, songs} = getState()
//     if (shouldFetchSongs(playlists, playlist)) {
//       const nextUrl = getNextUrl(playlists, playlist)
//       return dispatch(fetchSongs(nextUrl, playlist))
//     }
//   }
// }

export let enteredSlide = () => {
  return {
    type: types.EnteredSlide
  }
}

export let appBooted = () => {
  return {
    type: types.AppBooted
  }
}

export let afterLogin = () => {
  return {
    type: types.AfterLogin
  }
}

export let showAlert = () => {
  return {
  }
}


export let popAlert = (title, content) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.ShowAlert,
      pop: {
        title: title,
        content: content
      }
    })

    setTimeout(function() {
      dispatch({
        type: types.HideAlert
      })
    }, 1500)
  }
}

export let willEnterApp = () => {
  return (dispatch, getState) => {
    storage.multiGet(['user', 'entered'])
      .then(function(data) {
        let user = data[0]
        let entered = data[1]

        dispatch({
          type: types.WillEnterApp,
          user: user,
          entered: entered
        })
      })
  }
}

export let checkUserStatus = () => {
  return (dispatch, getState) => {
    storage.getItem('user')
      .then(function(data) {
        var type = types.CheckUserStatus

        if (data && data.accessToken) {
          dispatch({
            type: types.UserLogined,
            user: data
          })
        }
        else {
          dispatch({
            type: types.UserLogouted
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
