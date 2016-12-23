import {combineReducers} from 'redux-immutable'

//import tabs from './tabs'
import tabsReducer from './tabs'
import appReducer from './app'
import creationReducer from './creation'

const reducers = {
  app: appReducer,
  tabs: tabsReducer,
  creations: creationReducer
}

export default function createReducer() {
  return combineReducers(reducers)
}