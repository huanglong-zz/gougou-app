import {AsyncStorage} from 'react-native'

export const getItem = (key) => {
  return AsyncStorage.getItem(key)
    .then((data) => {
      if (data) {
        return JSON.parse(data)
      }
      else {
        return {}
      }
    })
}

export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  
  return AsyncStorage.setItem(key, value)
}

export const clear = () => {
 return AsyncStorage.clear()
}

export const removeItem = (...args) => {
  return AsyncStorage.removeItem(...args)
}

export const multiGet = (keys) => {
  return AsyncStorage.multiGet(keys)
    // .then(results => {
    //   return results.map(item => {
    //     //return [item[0], JSON.parse(item[1])]
    //     return [item[0], item[1]]
    //   })
    // })
}

export const multiRemove = (keys) => {
  return AsyncStorage.multiRemove(keys)
}
