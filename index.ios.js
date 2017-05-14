import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View
} from 'react-native'


import { applyMiddleware, combineReducers, createStore } from 'redux'

const userReducer = function(state={name: 'Scott', age: 28}, action) {
  switch (action.type) {
    case 'CHNAGE_NAME': {
      return {
        ...state,
        name: action.payload
      }
    }
    case 'CHNAGE_AGE': {
      return {
        ...state,
        age: action.payload
      }
    }
  }

  return state
}

const friendsReducer = function(state=[], action) {
  switch (action.type) {
    case 'CHNAGE_FRIENDS': {
      return action.payload
    }
    case 'CHNAGE_NAME': {
      return ['Nodejs']
    }
  }

  return state
}

const reducers = combineReducers({
  user: userReducer,
  friends: friendsReducer
})

const logger = (store) => (next) => (action) => {
  console.log('action fired', action)
  action.type = 'CHNAGE_NAME'
  next(action)
}

const store = createStore(reducers, {}, applyMiddleware(logger))

store.subscribe(() => {
  console.log('store changed to ', store.getState())
})

store.dispatch({type: 'CHNAGE_NAME', payload: 'Bill'})
store.dispatch({type: 'CHNAGE_AGE', payload: 29})
store.dispatch({type: 'CHNAGE_FRIENDS', payload: ['imooc']})

class Child1 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      a: 1,
      c: this.props.c
    }
  }

  render() {
    return (
      <Text onPress={() => this.props.setD(5)}>
        Child1:
          {this.state.a},
          {this.state.c},
          {this.props.d}
      </Text>
    )
  }
}

class Child2 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      b: 2,
      c: this.props.c
    }
  }

  render() {
    return (
      <Text onPress={() => this.props.setD(6)}>
        Child2:
        {this.state.b},
        {this.state.c},
        {this.props.d}
      </Text>
    )
  }
}

class imoocApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      c: 3,
      d: 4
    }
  }

  _setD(v) {
    this.setState({
      d: v
    })
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>d: {this.state.d}</Text>
        <Child1
          setD={this._setD.bind(this)}
          c={this.state.c}
          d={this.state.d} />
        <Child2
          setD={this._setD.bind(this)}
          c={this.state.c}
          d={this.state.d} />
      </View>
    )
  }
}

AppRegistry.registerComponent('imoocApp', () => imoocApp)