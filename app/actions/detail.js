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
import {actions} from 'react-native-navigation-redux-helpers'

const {
  popRoute,
  pushRoute
} = actions

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

export let videoPaused = () => {
  return {
    type: types.PAUSED
  }
}

export let videoPlay = () => {
  return {
    type: types.PLAY
  }
}

export let showModal = () => {
  return {
    type: types.SHOW_MODAL
  }
}

export let hideModal = () => {
  return {
    type: types.HIDE_MODAL
  }
}

export let backTo = (key) => {
  return (dispatch, getState) => {
    dispatch(popRoute(key))
  }
}

