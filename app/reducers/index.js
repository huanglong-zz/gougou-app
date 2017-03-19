import {combineReducers} from 'redux-immutable'

// import tabs from './tabs'
import app from './app'
import creations from './creation'
import comments from './comment'

const reducers = {
  app,
  comments,
  creations
}

export default function createReducer () {
  return combineReducers(reducers)
}
