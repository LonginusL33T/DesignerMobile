import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen'

import {
  Platform,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import DeviceInfo from 'react-native-device-info';

import {Button, Input} from '../lib/components';
import {login} from '../models/app';

/*const background = require('../assets/designer/launchimage.png');*/

class Splash extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      username: 'drz1003',
      password: '123456',
      anim: new Animated.Value(1),
    };
    this._toPage = this._toPage.bind(this);
    this._autoLogin = this._autoLogin.bind(this);
  }

  componentWillMount() {
    this._autoLogin();
    //this._toPage('Home');
  }
  componentDidMount(){
    SplashScreen.hide();
  }

  getDeviceInfo() {
    return {
      UniqueID: DeviceInfo.getUniqueID(),
      Manufacturer: DeviceInfo.getManufacturer(),
      Brand: DeviceInfo.getBrand(),
      Model: DeviceInfo.getModel(),
      DeviceId: DeviceInfo.getDeviceId(),
      SystemName: DeviceInfo.getSystemName(),
      SystemVersion: DeviceInfo.getSystemVersion(),
      BundleId: DeviceInfo.getBundleId(),
      BuildNumber: DeviceInfo.getBuildNumber(),
      Version: DeviceInfo.getVersion(),
      ReadableVersion: DeviceInfo.getReadableVersion(),
      DeviceName: DeviceInfo.getDeviceName(),
      UserAgent: DeviceInfo.getUserAgent(),
      DeviceLocale: DeviceInfo.getDeviceLocale(),
      DeviceCountry: DeviceInfo.getDeviceCountry(),
      Timezone: DeviceInfo.getTimezone(),
      InstanceID: DeviceInfo.getInstanceID(),
    };
  }

  _toPage(page = 'Home') {
    Animated.timing(
      this.state.anim,
      {
        toValue: 0,
        duration: 200,
      }
    ).start(() => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: page})
        ]
      });
      this.props.navigation.dispatch(resetAction);
    });
  }

  async _autoLogin() {
    this._toPage('Home');
    // try {
    //   const result = await this.props.dispatch(login(this.state.username, this.state.password));
    //   result.token &&
    // } catch (e) {
    //   this._toPage('Login');
    // }
  }

  render() {
    return (
        <ImageBackground
            //source={background}
            blurRadius={Platform.OS === 'ios' ? 10 : 2}
            style={[styles.container]}
        >
          <View style={styles.contentContainer}>
            <ActivityIndicator
                style={styles.loading}
                animating={true}
                color="#fff"
                size="large"/>
          </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    store: state
  };
}

export default connect(mapStateToProps)(Splash);
