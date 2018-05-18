import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView,
  Animated,
  Dimensions,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;

class InAppBrowser extends Component {
  static navigationOptions = ({ navigation: { goBack, state } }) => ({
    title: state.params.title || '',
    headerStyle: {
      backgroundColor: '#40c0cb',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff',
    },
  });

  constructor() {
    super();
    this.state = {
      hideProgress: false,
      progressWidth: new Animated.Value(0),
      web: {},
    };
    this._renderLoading = this._renderLoading.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);
    this._onLoadStart = this._onLoadStart.bind(this);
  }

  static defaultProps = {
    url: ''
  };

  _onLoadStart() {
    Animated.sequence([
      Animated.timing(
        this.state.progressWidth,
        {
          toValue: WIDTH - 80,
          duration: 5000,
        }
      ),
      Animated.timing(
        this.state.progressWidth,
        {
          toValue: WIDTH - 3,
          duration: 10000,
        }
      )]
    ).start();
  }

  _onLoadEnd(event) {
    this.state.progressWidth.setValue(WIDTH);
    setTimeout(() => this.setState({ hideProgress: true }), 250);
  }

  _renderLoading() {
    return null;
  }

  _renderError(errorDomain, errorCode, errorDesc) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTextTitle}>
          加载失败
        </Text>
        <Text style={styles.errorText}>
          {errorDesc}
        </Text>
        <Text style={styles.errorText}>
          {`${errorCode} ${errorDomain}`}
        </Text>
      </View>
    );
  }

  render() {
    const source = { uri: this.props.url };
    return (
      <View style={styles.container}>
        {
          this.state.hideProgress ? null :
            <Animated.View style={[styles.progressBar, { width: this.state.progressWidth }]} />
        }
        <WebView
          style={styles.webView}
          source={source}
          scalesPageToFit
          startInLoadingState
          domStorageEnabled
          javaScriptEnabled
          onLoadEnd={this._onLoadEnd}
          onLoadStart={this._onLoadStart}
          renderLoading={this._renderLoading}
          renderError={this._renderError}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  webView: {
    flex: 1,
  },
  errorContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 2,
  },
  errorTextTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
  },
  progressBar: {
    zIndex: 999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    shadowColor: '#04b00f',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: '#04b00f'
  },
});

export default InAppBrowser;
