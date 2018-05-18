import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

class RiseNumber extends Component {

  static propTypes = {
    number: PropTypes.number.isRequired,
    toFixed: PropTypes.number,
  };

  static defaultProps = {
    toFixed: 2,
  };

  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  componentDidMount() {
    this.start(0, this.props.number);
  }

  componentWillReceiveProps(nextProps) {
    const number = nextProps.number;
    number > this.props.number && this.start(0, number);
  }

  componentWillUnmount() {
    this.cancel();
  }

  start(from, to) {
    const duration = 500; // 动画时长
    const interval = 15; // 每15毫秒刷新一次
    const rise = ((to - from) * interval) / duration;
    this.timer = setInterval(() => {
      let number = this.state.number + rise;
      if (number > to) {
        number = to;
      }
      this.setState({
        number,
      }, () => number >= to && this.cancel());
    }, interval);
  }

  cancel() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    const { style, toFixed, ...props } = this.props;
    return (
      <Text style={style} {...props}>{this.state.number.toFixed(toFixed)}</Text>
    );
  }
}

const styles = StyleSheet.create({

});

export default RiseNumber;
