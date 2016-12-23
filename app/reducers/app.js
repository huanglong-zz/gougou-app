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
    case types.EnteredSlide:
      return {
        ...state,
        entered: true
      }
    case types.AfterLogin:
      return {
        ...state,
        user: action.user,
        logined: true,
      }
    case types.AppBooted:
      return {
        ...state,
        booted: true,
      }
    case types.UserLogined:
      return {
        ...state,
        logined: true,
        user: action.user
      }
    case types.UserLogouted:
      return {
        ...state,
        logined: false,
        user: null
      }
    case types.WillEnterApp:
      let userData = action.user
      let entered = action.entered
      let newState = {booted: true}

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
      
      return {
        ...state,
        ...newState
      }
    default:
      return state
  }
}
