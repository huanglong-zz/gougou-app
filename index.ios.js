import './app'

// import React, {Component} from 'react'

// import {
//   AppRegistry,
//   StyleSheet,
//   View,
//   Image,
//   Button,
//   Text,
//   AsyncStorage,
//   Dimensions,
//   ActivityIndicator,
// } from 'react-native'

// var { TabNavigator, StackNavigator } = require('react-navigation')

// class InnerScreen extends React.Component {
//   static navigationOptions = {
//     title: 'StackListTab',
//   }

//   render() {
//     return (
//       <Button
//         onPress={() => this.props.navigation.navigate('StackInner', {name: 'Lucy'})}
//         title="Go to Lucy's profile"
//       />
//     )
//   }
// }

// class StackInnerScreen extends React.Component {
//   static navigationOptions = {
//     title: 'StackInnerScreen'
//   }



//   render() {
//     return (
//       <View>
//         <Button
//         onPress={() => this.props.navigation.goBack()}
//         title="Go back"
//       />
//       <Button
//         onPress={() => this.props.navigation.navigate('EditTab')}
//         title="Go To EditTab"
//       />
//     </View>
//     )
//   }
// }

// var stackScreen = StackNavigator({
//   Inner: {
//     screen: InnerScreen,
//   },
//   StackInner: {
//     path: 'people/:name',
//     screen: StackInnerScreen,
//   },
// })


// class ListScreen extends React.Component {
//   static navigationOptions = {
//     tabBar: {
//       title: '狗狗有话说',
//       label: 'List',
//       // Note: By default the icon is only shown on iOS. Search the showIcon option below.
//       icon: ({ tintColor }) => (
//         <Image
//           source={require('./assets/images/app.png')}
//           style={[styles.icon, {tintColor: '#f9f9f9'}]}
//         />
//       ),
//     },
//   }

//   render() {
//     return (
//       <View>
//         <Button
//           onPress={() => this.props.navigation.navigate('Detail', {cid: '123'})}
//           title="Go To Detail 123"
//         />
//       </View>
//     )
//   }
// }

// class DetailScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Detail',
//   }

//   render() {
//     return (
//       <View>
//         <Button
//           onPress={() => this.props.navigation.goBack()}
//           title="Go back"
//         />
//       </View>
//     )
//   }
// }


// class EditTab extends React.Component {
//   static navigationOptions = {
//     title: ({ state }) => 'EditTab',
//     tabBar: ({ state, setParams }) => ({
//       visible: false,
//       icon: (
//         <Image source={require('./assets/images/app.png')}
//           style={[styles.icon]} />
//       ),
//     }),
//   }

//   render() {
//     return (
//       <View>
//         <Button
//           onPress={() => this.props.navigation.goBack()}
//           title="Go back"
//         />
//         <Button
//           onPress={() => this.props.navigation.navigate('ProfileTab')}
//           title="Go To ProfileTab"
//         />
//       </View>
//     )
//   }
// }

// class ProfileTab extends React.Component {
//   static navigationOptions = {
//     title: ({ state }) => 'ProfileTab',

//     tabBar: ({ state, setParams }) => ({
//       icon: (
//         <Image source={require('./assets/images/app.png')}
//           style={[styles.icon]} />
//       ),
//     }),
//   }

//   render() {
//     return (
//       <View>
//         <Button
//           onPress={() => this.props.navigation.goBack()}
//           title="Go back"
//         />
//         <Button
//           onPress={() => this.props.navigation.navigate('ListTab')}
//           title="Go To ListTab"
//         />
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   icon: {
//     width: 26,
//     height: 26,
//   },
// })

// const ListTab = StackNavigator({
//   List: {
//     screen: ListScreen,
//     navigationOptions: {
//       title: ({state}) => '狗狗有话说',
//     },
//   },
//   Detail: {
//     path: 'creations/:cid',
//     screen: DetailScreen,
//     navigationOptions: {
//       title: ({state}) => `${state.params.cid} 的创意`,
//       tabBar: ({ state, setParams }) => ({
//         visible: false,
//         icon: (
//           <Image source={require('./assets/images/app.png')}
//             style={[styles.icon]} />
//         ),
//       }),
//     }
//   },
// })

// // https://github.com/react-community/react-navigation/blob/master/docs/api/navigators/TabNavigator.md
// const SimpleApp = TabNavigator({
//   ListTab: {
//     title: '狗狗有话说',
//     screen: ListTab,
//   },
//   EditTab: {
//     title: '理解狗狗，从配音开始',
//     screen: EditTab,
//   },
//   ProfileTab: {
//     title: '狗狗的账户',
//     screen: ProfileTab,
//   }
// }, {
//   tabBarOptions: {
//     activeTintColor: '#ff6600',
//     labelStyle: {
//       fontSize: 26,
//     },
//     style: {
//       backgroundColor: '#ccc',
//     },
//   },
// })

// AppRegistry.registerComponent('imoocApp', () => SimpleApp)
