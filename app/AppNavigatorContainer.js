import React, { Component } from 'react';
import {
    Platform,
    BackHandler,
    ToastAndroid,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    addNavigationHelpers,
    NavigationActions,
    StackNavigator,
    TabNavigator,
} from 'react-navigation';
import AppNavigator from './AppNavigator';
import Consts from './config/consts'

@connect(state => ({nav: state.nav}))
class AppWithNavigationState extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    };

    constructor() {
        super();
        this._handleBack = this._handleBack.bind(this);
        this._canExitApp = false;
    }

    _handleBack() {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            if (this._canExitApp) {
                BackHandler.exitApp();
            }
            this._canExitApp = true;
            ToastAndroid.show('再按一次退出App', ToastAndroid.SHORT);
            setTimeout(() => this._canExitApp = false, 2000);
            return true;
        }
        dispatch(NavigationActions.back());
        return true;
    }

    componentWillMount() {
        if (Platform.OS === 'ios') {
            StatusBar.setBarStyle('light-content');
        } else {
            //StatusBar.setBackgroundColor(theme.primaryColor);
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack);
    }

    render() {
        const { dispatch, nav } = this.props;
        // TODO 动态更换主题

        return (
            <AppNavigator
                screenProps={{theme: Consts.theme}}
                navigation={addNavigationHelpers({ dispatch, state: nav })}
            />
        );
    }
}

export default AppWithNavigationState;
