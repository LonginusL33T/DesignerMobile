import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Roots from 'react-native-roots';

class Popover extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Roots.remove}>
        <View style={styles.container}>
          <View style={styles.mask}>
            <View style={{width: 100, height: 100}}>

            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },

  mask: {
    width: 42,
    height: 42,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});

export default {
  show() {
    Roots.add(<Popover />);
  },
  hide() {
    Roots.remove();
  },
  dismiss() {
    Roots.remove();
  },
};
