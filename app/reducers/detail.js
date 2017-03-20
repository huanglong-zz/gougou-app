import * as types from '../actions/actionTypes'

const initialState = {
  PAUSED: false,
  data: {}
}

let detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PAUSED:
      return {
        ...state,
        paused: true
      }
    case types.PLAY:
      return {
        ...state,
        paused: false
      }
    case types.SHOW_MODAL:
      return {
        ...state,
        modalVisible: true
      }
    case types.HIDE_MODAL:
      return {
        ...state,
        modalVisible: false
      }
    default:
      return state
  }
}

export default detailReducer