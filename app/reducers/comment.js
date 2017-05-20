import * as types from '../actions/actionTypes'

const initialState = {
  creationId: null,
  commentotal: 0,
  commentList: [],
  isCommentLoadingTail: false,
  isCommentRefreshing: false,
  commentDone: false
}

let commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COMMENTS_START:
      return {
        ...state,
        creationId: action.payload.creationId,
        isCommentLoadingTail: action.payload.isCommentLoadingTail,
        isRefreshing: action.payload.isRefreshing
      }
    case types.FETCH_COMMENTS_REJECTED:
      return {
        ...state,
        commentList: [],
        isCommentLoadingTail: action.payload.isCommentLoadingTail,
        isRefreshing: action.payload.isRefreshing
      }
    case types.FETCH_COMMENTS_FULFILLED:
      return {
        ...state,
        commentList: action.payload.commentList,
        commentTotal: action.payload.commentTotal,
        isCommentLoadingTail: action.payload.isCommentLoadingTail,
        isRefreshing: action.payload.isRefreshing
      }
    case types.WILL_COMMENT:
      return {
        ...state,
        commentDone: false
      }
    case types.SEND_COMMENTS_STAET:
      return Object.assign({}, state, {
        commentDone: false
      })
    case types.SEND_COMMENTS_REJECTED:
      return {
        ...state,
        commentList: [],
        commentDone: false,
        isLoading: false
      }
    case types.SEND_COMMENTS_FULFILLED:
      return {
        ...state,
        commentList: action.payload.commentList,
        commentTotal: action.payload.commentTotal,
        isCommentLoadingTail: action.payload.isCommentLoadingTail,
        commentDone: true,
        isLoading: false
      }
    default:
      return state
  }
}

export default commentReducer
