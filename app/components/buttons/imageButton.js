import React, { PropTypes, Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

const ImageButton = ({onPress, disabled, style, text, imageUrl, imageStyle}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.75}
    style={{alignItems:'center'}}
    >
    <Image
      source={imageUrl}
      style={imageStyle}
    />
    <Text style={style}>
      {text}
    </Text>
  </TouchableOpacity>
)

ImageButton.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  style: Text.propTypes.style,
  containerStyle: View.propTypes.style,
  text: PropTypes.string
}

ImageButton.defaultProps = {
  onPress() { },
  disabled: false
}

export default ImageButton
