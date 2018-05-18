import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Text,
} from 'react-native';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight;

class Button extends Component {

  static propTypes = {
    style: PropTypes.any,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    onPress: () => {
    },
  };

  render() {
    const { title, style, titleStyle, disabled, onPress, ...props } = this.props;
    return (
      <Touchable
        style={[styles.button, style]}
        onPress={disabled ? null : onPress}
        {...props}
      >
        <Text style={titleStyle}>{ title }</Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#00A0E8',
    borderRadius: 4,
  },
});

export default Button;
