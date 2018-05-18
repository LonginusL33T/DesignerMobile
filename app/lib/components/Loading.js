import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Roots from 'react-native-roots';

const ROOT_VIEW_KEY = '__Loading';

class Loading extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Roots.remove(ROOT_VIEW_KEY)}>
        <View style={styles.container}>
          <View style={styles.mask}>
            <ActivityIndicator
              animating
              size="small"
              color="#fff"
            />
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
    Roots.add(ROOT_VIEW_KEY, <Loading />);
  },
  hide() {
    Roots.remove(ROOT_VIEW_KEY);
  },
  dismiss() {
    Roots.remove(ROOT_VIEW_KEY);
  },
};
