/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// ES5
var React = require('react-native')
var Swiper = require('react-native-swiper')
var Button = require('react-native-button')
var StyleSheet = React.StyleSheet
var Text = React.Text
var View = React.View
var Image = React.Image
var Dimensions = React.Dimensions

var width = Dimensions.get('window').width

var Slider = React.createClass({
  getInitialState() {
    return {
      loop: false,
      banners: [
        require('../assets/images/s1.jpg'),
        require('../assets/images/s2.jpg'),
        require('../assets/images/s3.jpg')
      ]
    }
  },

  _enter() {
    this.props.enterSlide()
  },

  render() {
    return (
      <Swiper
        style={styles.container}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.pagination}
        loop={this.state.loop}>
        <View style={styles.slide}>
          <Image style={styles.image} source={this.state.banners[0]} />
        </View>
        <View style={styles.slide}>
          <Image style={styles.image} source={this.state.banners[1]} />
        </View>
        <View style={styles.slide}>
          <Image style={styles.image} source={this.state.banners[2]} />
          <Button
            style={styles.btn}
            onPress={this._enter}>马上体验</Button>
        </View>
      </Swiper>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1
  },

  slide: {
    flex: 1,
    width: width
  },

  image: {
    flex: 1,
    width: width
  },

  dot: {
    width: 14,
    height: 14,
    backgroundColor: 'transparent',
    borderColor: '#ff6600',
    borderRadius: 7,
    borderWidth: 1,
    marginLeft: 12,
    marginRight: 12
  },

  activeDot: {
    width: 14,
    height: 14,
    borderWidth: 1,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 7,
    borderColor: '#ee735c',
    backgroundColor: '#ee735c',
  },

  pagination: {
    bottom: 30
  },

  btn: {
    position: 'absolute',
    width: width - 20,
    left: 10,
    bottom: 60,
    height: 50,
    padding: 10,
    backgroundColor: '#ee735c',
    borderColor: '#ee735c',
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 3,
    color: '#fff'
  }
})

module.exports = Slider