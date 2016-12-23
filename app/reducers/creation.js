import * as types from '../actions/actionTypes'

const initialState = {
  logined: false,
  user: null,
  page: 0,
  total: 0,
  nextPage: 1,
  videoList: [],
  nextVideoList: [],
  isLoading: true,
  isLoadMore: false,
  isRefreshing: false,
}

let creationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CREATIONS_STAET:
      return Object.assign({}, state, {
        isLoadMore: action.isLoadMore,
        isRefreshing: action.isRefreshing,
        isLoading: action.isLoading,
      })
    case types.FETCH_CREATIONS_REJECTED:
      return {
        ...state,
        videoList: [],
        isLoading: false,
        isRefreshing: false,
      }
    case types.FETCH_CREATIONS_FULFILLED:
      return {
        ...state,
        videoList: action.videoList,
        videoTotal: action.videoTotal,
        nextPage: action.nextPage,
        page: action.page,
        isLoadingTail: action.isLoadingTail,
        isLoading: false,
        isRefreshing: false,
      }
    default:
      return state
  }
}

export default creationReducer