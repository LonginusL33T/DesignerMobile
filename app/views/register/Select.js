/**
 * Created by Jeepeng on 2017/2/17.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  Picker,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Text,
  Modal
} from 'react-native';
import Roots from 'react-native-roots';

const ROOT_VIEW_KEY = '__Select';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',  // 选中的值，当Select为不可控组件时使用
      showingOption: false,  // 标记是否显示option(ios)
    };
  }

  static propTypes = {
    options: React.PropTypes.array,
    onChange: React.PropTypes.func,
  };

  static defaultProps = {
    enabled: true,
    options: [],
    renderItem: () => null,
    onChange: () => {},
  };

  _onChange(value) {
    let isChange = this.props.value !== value;
    isChange && this.props.onChange(value);
  }

  _onPressItem(item) {
    this._onChange(item);
    Roots.remove(ROOT_VIEW_KEY);
    this.setState({
      showingOption: !this.state.showingOption,
    });
  }

  _renderItem(item) {
    if (this.props.value === item.value) {
      return null;
    }
    return (
      <TouchableWithoutFeedback key={item.value} onPress={() => this._onPressItem(item)}>
        { this.props.renderItem(item) }
      </TouchableWithoutFeedback>
    );
  }

  /**
   * 显示或隐藏
   * @private
   */
  _toggleOption() {
    this._select.measure((ox, oy, width, height, px, py) => {
      const showingOption = !this.state.showingOption;
      this.setState({
        showingOption: showingOption,
      }, () => {
        const overlayStyle = {
          top: py - 46.5,
          left: px,
        };
        if (showingOption) {
          Roots.add(ROOT_VIEW_KEY, (
            <TouchableWithoutFeedback
              onPress={this._toggleOption.bind(this)}>
              <View style={styles.mask}>
                <View style={[styles.overlay, overlayStyle]} >
                  {
                    this.props.options.map(item => this._renderItem(item))
                  }
                </View>
              </View>
            </TouchableWithoutFeedback>
          ));
        } else {
          Roots.remove(ROOT_VIEW_KEY);
        }
      });
    });
  }

  _onLayout({ nativeEvent }) {
    this.setState({
      width: nativeEvent.layout.width,
      height: nativeEvent.layout.height,
    });
  }

  render() {
    let options = [];
    return (
      <View
        ref={ select => { this._select = select; }}
        onLayout={this._onLayout.bind(this)}>
        <TouchableOpacity
          style={this.props.style}
          activeOpacity={0.5}
          onPress={this._toggleOption.bind(this)} >
          <View>
            { this.props.children }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0)',
  },

  overlay: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

export default Select;
