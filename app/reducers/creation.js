import * as types from '../actions/actionTypes'

const initialState = {
  total: 0,
  videoList: [],
  nextVideoList: [],
  isLoading: true,
  isLoadMore: false,
  isRefreshing: false
}

let creationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CREATIONS_STAET:
      return {
        ...state,
        isLoadMore: action.payload.isLoadMore,
        isRefreshing: action.payload.isRefreshing,
        isLoading: action.payload.isLoading
      }
    case types.FETCH_CREATIONS_REJECTED:
      return {
        ...state,
        videoList: [],
        isLoading: false,
        isRefreshing: false
      }
    case types.FETCH_CREATIONS_FULFILLED:
      return {
        ...state,
        videoList: action.payload.videoList,
        videoTotal: action.payload.videoTotal,
        nextPage: action.payload.nextPage,
        page: action.payload.page,
        isLoadingTail: action.payload.isLoadingTail,
        isLoading: false,
        isRefreshing: false
      }
    default:
      return state
  }
}

export default creationReducer
