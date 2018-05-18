import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;

class Bubble extends Component {
  render() {
    const { style, contentStyle } = this.props;
    return (
      <View style={[styles.container, style]}>
        <View style={{ width: 16, height: 16, marginLeft: 0, marginTop: 10, zIndex: 9999 }}>
          <View
            style={{
                position: 'absolute',
                top: 0,
                right: -1,
                width: 0,
                height: 0,
                borderLeftWidth: 8,
                borderRightWidth: 8,
                borderTopWidth: 8,
                borderBottomWidth: 8,
                borderColor: 'transparent',
                zIndex: 1,
                borderRightColor: '#fff' }}
          />
          <View
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 0,
                height: 0,
                borderLeftWidth: 8,
                borderRightWidth: 8,
                borderTopWidth: 8,
                borderBottomWidth: 8,
                borderColor: 'transparent',
                zIndex: 0,
                borderRightColor: '#e4e7dc' }}
          />
        </View>
        <Touchable style={{ flex: 1 }} onPress={this.props.onPress} underlayColor="#ddd" >
          <View style={[styles.content, contentStyle]}>
            {this.props.children}
          </View>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 0,
  },
  content: {
    flex: 1,
    minHeight: 40,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e4e7dc',
  },
  left: {

  },
});

export default Bubble;
