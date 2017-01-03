import {combineReducers} from 'redux-immutable'

//import tabs from './tabs'
import tabs from './tabs'
import app from './app'
import creations from './creation'
import globalNav from './globalNav'

const reducers = {
  globalNav: globalNav,
  tabs,
  app,
  creations,
}

export default function createReducer() {
  return combineReducers(reducers)
}