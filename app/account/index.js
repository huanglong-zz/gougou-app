/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
var React = require('react-native')
var Icon = require('react-native-vector-icons/Ionicons')
var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View
var AsyncStorage = React.AsyncStorage

var Account = React.createClass({
  getInitialState() {
    return {
      user: {
        nickname: '老四',
        times: 0
      }
    }
  },

  componentDidMount() {
    var that = this

    // AsyncStorage.multiSet([['user1', '1'], ['user2', '2']])
    //   .then(function() {
    //     console.log('save ok')
    //   })
    // AsyncStorage.multiGet(['user1', 'user2', 'user'])
    //   .then(function(data) {
    //     console.log(data)

    //     console.log(JSON.parse(data[2][1]))
    //   })
    AsyncStorage.multiRemove(['user1', 'user2'])
      .then(function(err) {
        console.log('remove ok')
        AsyncStorage.multiGet(['user1', 'user2', 'user'])
        .then(function(data) {
          console.log(data)

          console.log(JSON.parse(data[2][1]))
        })
      })
    // AsyncStorage
    //   .getItem('user')
    //   .catch(function(err) {
    //     console.log(err)
    //     console.log('get fails')
    //   })
    //   .then(function(data) {
    //     console.log('data return')
    //     console.log(data)

    //     if (data) {
    //       data = JSON.parse(data)
    //     }
    //     else {
    //       data = that.state.user
    //     }

    //     that.setState({
    //       user: data
    //     }, function() {
    //       data.times++
    
    //       var userData = JSON.stringify(data)

    //       AsyncStorage
    //         .setItem('user', userData)
    //         .catch(function(err) {
    //           console.log(err)
    //           console.log('save fails')
    //         })
    //         .then(function() {
    //           console.log('save ok')
    //         })
    //     })
    //   })

    // AsyncStorage.removeItem('user')
    //   .then(function() {
    //     console.log('remove ok')
    //   })
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.item, styles.item1]}>
          老大，你☺️么？
        </Text>
        <View style={[styles.item, styles.item2]}>
          <Text>老二喜极而泣</Text>
        </View>
        <View style={[styles.item, styles.item1]}>
          <Text>老三，老大欺负你么老大欺负你么？</Text>
        </View>
        <Text style={[styles.item, styles.item3]}>
          {this.state.user.nickname}不爽了{this.state.user.times}次
        </Text>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 70,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff6600',
  },
  item1: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  item2: {
    width: 100,
    backgroundColor: '#999',
  },
  item3: {
    flex: 2,
    backgroundColor: '#666',
  }
})

module.exports = Account
