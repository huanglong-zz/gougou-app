import {combineReducers} from 'redux-immutable'

//import tabs from './tabs'
import tabs from './tabs'
import app from './app'
import creations from './creation'
import comments from './comment'
import list from './list'
import globalNav from './globalNav'

const reducers = {
  globalNav: globalNav,
  tabs,
  app,
  creations,
  comments,
  list,
}

export default function createReducer() {
  return combineReducers(reducers)
}