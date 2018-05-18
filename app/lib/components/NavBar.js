import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import TouchableView from './TouchableView';

class NavBar extends Component {

  static propTypes = {
    renderLeftComponent: PropTypes.func,
    renderTitle: PropTypes.func,
    renderRightComponent: PropTypes.func,
    leftTitle: PropTypes.string,
    onLeft: PropTypes.func,
  };

  static defaultProps = {
    renderLeftComponent: () => null,
    onLeft: () => null,
    renderTitle: () => null,
    renderRightComponent: () => null,
  };

  render() {
    const { style, renderLeftComponent, leftTitle, onLeft, renderTitle, title, titleStyle } = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.navBarLeft}>
          {renderLeftComponent() || (
            leftTitle ?
              onLeft ?
                <TouchableView underlayColor="#f5f5f5" style={styles.navBarBtn} onPress={onLeft}><Text style={titleStyle}>{leftTitle}</Text></TouchableView>
                : <Text style={titleStyle}>{leftTitle}</Text>
              : null
          )}
        </View>
        {renderTitle() || <Text style={titleStyle}>{title}</Text>}
        <View style={styles.navBarRight}>
          {this.props.renderRightComponent()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 20,
        height: 64,
      },
      android: {
        height: 44,
      },
    }),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#999',
  },
  navBarLeft: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  navBarBtn: {
    height: 44,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarRight: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
});

export default NavBar;
