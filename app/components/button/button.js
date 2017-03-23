import React, { PropTypes, Component } from 'react'
import {
    Button,
} from 'react-native'

const Button = ({onPress, disabled, text}) => (
  <Button
    onPress={onPress}
    title={text}
    color={color}
  />
)

Button.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string
}

Button.defaultProps = {
  onPress() { },
  disabled: false
}

export default Button
