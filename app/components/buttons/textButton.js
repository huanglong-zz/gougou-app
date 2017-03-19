import React, {PropTypes, Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

export default class TextButton extends Component {
  defaultProps = {
    onPress() { },
    disabled: false
  }
  
  static propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    containerStyle: View.propTypes.style,
    text: PropTypes.string
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {onPress, disabled, style, text, upText, upTextStyle} = this.props

    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
      style={{alignItems: 'center'}}
      >
      <Text style={upTextStyle}>
        {upText}
      </Text>
      <Text style={style}>
        {text}
      </Text>
    </TouchableOpacity>
  }
)
