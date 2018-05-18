import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TextInput,
} from 'react-native';

class InputItem extends Component {

  static propTypes = {
    onChangeText: PropTypes.func,
  };

  static defaultProps = {
    onChangeText: () => {},
  };

  render() {
    const {
      style,
      value,
      onChangeText,
      thumb,
      extra,
      onPress,
      placeholder,
      children,
      _rightStyle,
      ...props,
    } = this.props;
    return (
      <View onPress={onPress} style={[styles.item, style]}>
        { thumb }
        <View style={[styles.itemRight, _rightStyle]}>
          { typeof children === 'string' ?
            <Text style={styles.rightContentText}>{children}</Text>
            : children
          }
          <TextInput
            style={[styles.input]}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            underlineColorAndroid="transparent"
            {...props}
          />
          { extra ?
            <View style={styles.rightRight}>
              { typeof extra === 'string' ?
                <Text style={styles.rightExtraText}>{extra}</Text>
                : extra
              }
            </View> : null
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRight: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  rightContentText: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    maxWidth: 120,
    fontSize: 16,
    color: '#333',
  },
  input: {
    paddingTop: Platform.OS === 'ios' ? 0 : 15,
    flexGrow: 1,
    fontSize: 16,
    textAlignVertical: 'top',
    color: '#555',
  },
  rightRight: {
    maxWidth: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightExtraText: {
    paddingHorizontal: 10,
    color: '#888',
    fontSize: 16,
  },
  rightExtra: {},
  arrow: {
    fontSize: 24,
    color: '#ccc',
  },

});

export default InputItem;
