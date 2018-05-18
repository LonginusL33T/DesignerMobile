import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Touchable from './Touchable';

class Item extends Component {

  static defaultProps = {
    arrowD: <Icon name="keyboard-arrow-right" style={{fontSize: 24, color: '#ccc',}} />,
  };

  render() {
    const { style, thumb, extra, arrow, onPress, children, _rightStyle } = this.props;
    return (
      <Touchable onPress={onPress} >
        <View style={[styles.item, style]}>
          { thumb }
          <View style={[styles.itemRight, _rightStyle]}>
            { typeof children === 'string' ?
              <Text style={styles.rightContentText}>{children}</Text>
              : <View style={styles.rightContent}>{children}</View>
            }
            { extra ?
              <View style={styles.rightRight}>
                { typeof extra === 'string' ?
                  <Text style={styles.rightExtraText}>{extra}</Text>
                  : <View style={styles.rightExtra}>{extra}</View>
                }
              </View> : null
            }
            { arrow }
          </View>
        </View>
      </Touchable>
    );
  }
}

class List extends Component {

  static Item = Item;
  
  constructor() {
    super();
    this._renderChildren = this._renderChildren.bind(this);
  }
  
  _renderChildren() {
    const { children } = this.props;
    if (!children) {
      return null;
    }
    // 过滤不渲染的元素
    let elements = [];
    React.Children.map(children, child => {
      if(!!child) {
        elements.push(child);
      }
    });
    return React.Children.map(elements, (element, index) => {
      const extraRightStyle = elements.length - 1 === index
        ? styles.itemRightWithoutBorder : {};
      return React.cloneElement(element, {
        _rightStyle: extraRightStyle,
      });
    });
  }

  render() {
    const { renderHeader, renderFooter, style } = this.props;
    return (
      <View style={[styles.list, style]}>
        {renderHeader && renderHeader()}
        <View style={styles.listWrapper}>
          { this._renderChildren() }
        </View>
        {renderFooter && renderFooter()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {

  },
  listWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRight: {
    flexGrow: 1,
    minHeight: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e4ecf0',
  },
  itemRightWithoutBorder: {
    borderBottomWidth: 0,
  },
  rightContentText: {
    fontSize: 15,
    color: '#2b3d54'
  },
  rightContent: {
    flex: 1,
    alignSelf: 'stretch',
  },
  rightRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  rightExtraText: {
    color: '#888',
    fontSize: 14,
  },
  rightExtra: {},

});

export default List;
