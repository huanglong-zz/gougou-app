import * as types from '../actions/actionTypes'

const initialState = {
  booted: false,
  entered: false,
  logined: false,
  sliderLoop: true,
  user: null,
  banners: [
    require('../assets/images/s1.jpg'),
    require('../assets/images/s2.jpg'),
    require('../assets/images/s3.jpg')
  ]
}

export default rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ENTER_SLIDE:
      return {
        ...state,
        entered: true
      }
    case types.AFTER_LOGIN:
      return {
        ...state,
        user: action.payload.user,
        logined: true
      }
    case types.APP_BOOTED:
      return {
        ...state,
        booted: true
      }
    case types.USER_LOGINED:
      return {
        ...state,
        logined: true,
        user: action.payload.user
      }
    case types.USER_LOGOUT:
      return {
        ...state,
        logined: false,
        user: null
      }
    case types.WILL_ENTER_APP:
      let userData = action.payload.user
      let entered = action.payload.entered
      let newState = {booted: true}

      if (entered === 'yes') {
        newState.entered = true
      }

      if (userData && userData[1]) {
        let user = JSON.parse(userData[1])

        if (user.accessToken) {
          newState.logined = true
          newState.user = user
        }
      }

      if (entered && entered[1] === 'yes') {
        newState.entered = true
      }

      console.log({
        ...state,
        ...newState
      })

      return {
        ...state,
        ...newState
      }
    default:
      return state
  }
}
