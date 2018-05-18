import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Roots from 'react-native-roots';

const ROOT_VIEW_KEY = '__TOAST';
const TOAST_SHORT = 2000;
const TOAST_LONG = 3500;

class Toast extends Component {
  static SHORT = TOAST_SHORT;
  static LONG = TOAST_LONG;

  static propTypes = {
    content: PropTypes.string.isRequired,
    duration: PropTypes.number,
    mask: PropTypes.bool,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    duration: TOAST_SHORT,
    mask: true,
    onClose: () => {},
  };

  constructor() {
    super();
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
    this._hide = this._hide.bind(this);
  }

  componentWillMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        duration: 200,
        toValue: 1,
      }
    ).start();
  }

  componentDidMount() {
    const { duration } = this.props;
    if (duration > 0) {
      this.timer = setTimeout(() => {
        Animated.timing(
          this.state.fadeAnim,
          {
            duration: 200,
            toValue: 0,
          }
        ).start(this._hide);
      }, duration);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  _hide() {
    Roots.remove(ROOT_VIEW_KEY);
    this.props.onClose();
  }

  render() {
    const { content, mask } = this.props;
    let backgroundColor = 'rgba(0,0,0,0.75)';
    const message = (
      <Animated.View style={styles.mask}>
        <Animated.View style={[styles.content, { backgroundColor, opacity: this.state.fadeAnim, }]}>
          <Text style={styles.message}>{content}</Text>
        </Animated.View>
      </Animated.View>
    );
    const loading = (
      <Animated.View style={styles.mask}>
        <Animated.View style={[styles.content, { backgroundColor, opacity: this.state.fadeAnim, }]}>
          <ActivityIndicator
            animating
            size="small"
            color="#fff"
          />
          <Text style={styles.message}>{content}</Text>
        </Animated.View>
      </Animated.View>
    );
    return mask ?
      <TouchableWithoutFeedback onPress={this._hide}>
        {message}
      </TouchableWithoutFeedback> : message;
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mask: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  content: {
    position: 'absolute',
    minWidth: 72,
    maxWidth: width * 0.8,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.75)',
  },
  message: {
    fontSize: 14,
    color: '#efefef',
    textAlign: 'center',
  },
  loading: {
    padding: 10,
  },
});

export default {
  SHORT: Toast.SHORT,
  LONG: Toast.LONG,
  show(content, duration, onClose, mask) {
    const props = { content, duration, onClose, mask };
    Roots.add(ROOT_VIEW_KEY, <Toast {...props} />);
  },
  showWithGravity() {

  },
  loading(content, duration) {
    Roots.add(ROOT_VIEW_KEY, <Toast type="loading" content={content} duration={duration} />);
  },
  hide() {
    Roots.remove(ROOT_VIEW_KEY);
  },
};
