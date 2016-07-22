/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
var React = require('react-native')
var Icon = require('react-native-vector-icons/Ionicons')

var List = require('./app/creation/index')
var Edit = require('./app/edit/index')
var Account = require('./app/account/index')
var Login = require('./app/account/login')
var Slider = require('./app/account/slider')

var AppRegistry = React.AppRegistry
var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View
var TabBarIOS = React.TabBarIOS
var Navigator = React.Navigator
var AsyncStorage = React.AsyncStorage
var ActivityIndicatorIOS = React.ActivityIndicatorIOS
var Dimensions = React.Dimensions
var AlertIOS = React.AlertIOS

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height


var imoocApp = React.createClass({
  getInitialState() {
    console.log('child', 'getInitialState')
    return {
      user: null,
      selectedTab: 'list',
      entered: false,
      booted: false,
      logined: false
    }
  },

  componentDidMount() {
    this._asyncAppStatus()
  },

  _logout() {
    AsyncStorage.removeItem('user')

    this.setState({
      logined: false,
      user: null
    })
  },

  _asyncAppStatus() {
    var that = this

    AsyncStorage.multiGet(['user', 'entered'])
      .then((data) => {
        var userData = data[0][1]
        var entered = data[1][1]
        var user
        var newState = {
          booted: true
        }

        if (userData) {
          user = JSON.parse(userData)
        }

        if (user && user.accessToken) {
          newState.user = user
          newState.logined = true
        }
        else {
          newState.logined = false
        }

        if (entered === 'yes') {
          newState.entered = true
        }

        that.setState(newState)
      })
  },

  _afterLogin(user) {
    var that = this

    user = JSON.stringify(user)

    AsyncStorage.setItem('user', user)
      .then(() => {
        that.setState({
          logined: true,
          user: user
        })
      })
  },

  _enterSlide() {
    this.setState({
      entered: true
    }, function() {
      AsyncStorage.setItem('entered', 'yes')
      AlertIOS.alert('进入 App')
    })
  },

  render() {
    if (!this.state.booted) {
      return (
        <View style={styles.bootPage}>
          <ActivityIndicatorIOS color='#ee735c' />
        </View>
      )
    }

    if (!this.state.entered) {
      return <Slider enterSlide={this._enterSlide} />
    }

    if (!this.state.logined) {
      return <Login afterLogin={this._afterLogin} />
    }

    // https://medium.com/@dabit3/react-native-navigator-navigating-like-a-pro-in-react-native-3cb1b6dc1e30#.p4c4qjmf0
    return (
      <TabBarIOS tintColor="#ee735c">
        <Icon.TabBarItem
          iconName='ios-videocam-outline'
          selectedIconName='ios-videocam'
          selected={this.state.selectedTab === 'list'}
          onPress={() => {
            this.setState({
              selectedTab: 'list',
            })
          }}>
          <Navigator
            initialRoute={{
              name: 'list',
              component: List
            }}
            configureScene={(route) => {
              return Navigator.SceneConfigs.FloatFromRight
            }}
            renderScene={(route, navigator) => {
              var Component = route.component

              return <Component {...route.params} navigator={navigator} />
            }} />

        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-recording-outline'
          selectedIconName='ios-recording'
          selected={this.state.selectedTab === 'edit'}
          onPress={() => {
            this.setState({
              selectedTab: 'edit'
            })
          }}>
          <Edit />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-more-outline'
          selectedIconName='ios-more'
          selected={this.state.selectedTab === 'account'}
          onPress={() => {
            this.setState({
              selectedTab: 'account'
            })
          }}>
          <Account user={this.state.user} logout={this._logout} />
        </Icon.TabBarItem>
      </TabBarIOS>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bootPage: {
    width: width,
    height: height,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
})


AppRegistry.registerComponent('imoocApp', () => imoocApp)
