import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Text,
    TextInput,
    StatusBar,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native'
import {connect} from 'react-redux'
import DeviceStorage from '../utils/DeviceStorage'
import Consts from '../config/consts'
import {NavigationActions} from 'react-navigation'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const img_arr = [require('../assets/designer/icon_eyes.png'), require('../assets/designer/eye.png')];
const background = require('../assets/designer/login_back.png');
const logo = require('../assets/designer/logo.png');
const back = require('../assets/designer/left.png');

class Login extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            pwdi: 1,
            securepwd: true
        };
        this.exchangePicPwd = this.exchangePicPwd.bind(this)
    }

    componentDidMount() {
        DeviceStorage.get(Consts.localStorage.USERNAME).then((val) => {
            this.setState({
                username: val,
            })
        })
    }

    exchangePicPwd = () => {
        if (this.state.pwdi === 1) {
            this.setState({
                pwdi: 0,
                securepwd: false,
            })
        } else {
            this.setState({
                pwdi: 1,
                securepwd: true,
            })
        }
    };

    _textInputBlur = () => {
        this.usernameInput.blur();
        this.passwordInput.blur();
    }

    Login = () => {
        this._textInputBlur();
        if (this.state.username === '' || this.state.password === '') {
            Alert.alert('温馨提醒', '请填写完整');
        } else {
            const {dispatch} = this.props.navigation;
            fetch(`${Consts.server.BACKSTAGE}${Consts.api.LOGIN}`, {
                method: 'POST',
                body: JSON.stringify({
                    "username": this.state.username,
                    "password": this.state.password,
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData.datas.data.error_code === 0) {
                        DeviceStorage.save(Consts.localStorage.ISLOGIN, true);
                        DeviceStorage.save(Consts.localStorage.X_TOKEN, responseData.datas.data.token);
                        DeviceStorage.save(Consts.localStorage.USERCATEGORY, responseData.datas.data.user.category);
                        DeviceStorage.save(Consts.localStorage.NAME, responseData.datas.data.user.detail.name);
                        DeviceStorage.save(Consts.localStorage.AVATAR, responseData.datas.data.avatar);
                        DeviceStorage.save(Consts.localStorage.UNIQUEID, responseData.datas.data.user.uniqueid);
                        DeviceStorage.save(Consts.localStorage.USERNAME, this.state.username);
                        DeviceStorage.save(Consts.localStorage.PASSWORD, this.state.password);
                        dispatch({type: 'userInfo/updateLoginState', payload: true});
                        dispatch({type: 'userInfo/updateAvatar', payload: responseData.datas.data.avatar});
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'Home'})
                            ]
                        });
                        dispatch(resetAction);
                    }
                    else {
                        Alert.alert('温馨提醒', responseData.datas.data.message);
                    }
                })
                .catch((error_code) => {
                    console.log('错误了');
                    console.log(error_code);
                })
        }
    };

    render() {
        const {navigation} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <ImageBackground
                resizeMode="stretch"
                source={background}
                style={styles.container}>
                <StatusBar translucent={true}
                           backgroundColor="transparent"/>
                <TouchableOpacity
                    style={styles.backContainer}
                    onPress={() => {
                        this._textInputBlur();
                        navigation.goBack();
                    }}>
                    <Image style={styles.backbtn}
                           source={back}/>
                </TouchableOpacity>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="always">
                    <View style={styles.container}>
                        <Image style={styles.logo}
                               source={logo}/>
                        <View style={styles.inputContainer}>
                            <TextInput underlineColorAndroid='transparent'
                                       ref={(ref) => {
                                           this.usernameInput = ref
                                       }}
                                       value={this.state.username}
                                       style={[styles.textInput, {paddingRight: 8}]}
                                       placeholder='请输入邮箱号'
                                       placeholderTextColor="#C5C5C5"
                                       onChangeText={(username) => this.setState({username: username})}/>
                            <View style={styles.visiblePwd}>
                                <TextInput underlineColorAndroid='transparent'
                                           ref={(ref) => {
                                               this.passwordInput = ref
                                           }}
                                           style={[styles.textInput, {paddingRight: 48}]}
                                           placeholder='输入登录密码'
                                           placeholderTextColor="#C5C5C5"
                                           secureTextEntry={this.state.securepwd}
                                           onChangeText={(password) => this.setState({password: password})}>
                                </TextInput>
                                <TouchableWithoutFeedback onPress={this.exchangePicPwd}>
                                    <Image style={styles.pwdIcon}
                                           source={img_arr[this.state.pwdi]}/>
                                </TouchableWithoutFeedback>
                            </View>

                        </View>
                        <View style={styles.bottomContainer}>
                            <View style={styles.bottomBtnsContainer}>
                                {/*<Text style={styles.btnForgetPassword}
                                      onPress={() => {
                                          this._textInputBlur();
                                          navigate('ForgetPassword');
                                      }}>忘记密码？</Text>*/}
                                <View style={styles.btnRightContainer}>
                                    <Text style={styles.btnUserRegistion}
                                          onPress={() => {
                                              this._textInputBlur();
                                              navigate('ChooseDesignerType');
                                          }}>个人注册</Text>
                                    <Text style={styles.btnCompanyRegistion}
                                          onPress={() => {
                                              this._textInputBlur();
                                              navigate('CompanyReg');
                                          }}>企业注册</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={this.Login} style={styles.loginButton}>
                                <Text style={styles.login}>登 录</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomblank}>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backContainer: {
        marginTop: 25,
        paddingLeft: 15,
        paddingVertical: 10,
        width: 48,
    },
    backbtn: {
        width: 10,
    },
    logo: {
        alignSelf: 'center',
        marginTop: 69,
        width: 110,
        height: 95
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    inputContainer: {
        height: 110,
        marginTop: 50,
        width: '85%',
        alignSelf: 'center',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        height: 55,
        paddingLeft: 8,
        paddingTop: 26,
        color: '#C5C5C5',
        borderBottomWidth: 1,
        borderColor: "#6E6E6E"
    },
    visiblePwd: {
        flexDirection: 'row'
    },
    pwdIcon: {
        position: "absolute",
        right: 0,
        bottom: 8,
        width: 20,
        height: 15
    },
    bottomContainer: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
        width: "85%"
    },
    loginButton: {
        backgroundColor: '#F3BD49',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30,
        width: "100%",
        height: 45
    },
    login: {
        fontSize: 18,
        color: '#644401'
    },
    bottomBtnsContainer: {
        flexDirection: 'row',
    },
    btnForgetPassword: {
        flex: 1,
        color: '#F3BD49',
        flexDirection: 'row',
        paddingLeft: 4,
        fontSize: 13,
        backgroundColor: 'transparent'
    },
    btnUserRegistion: {
        fontSize: 13,
        color: "#c5c5c5",
        backgroundColor: 'transparent',
        marginRight: 37,
        borderBottomWidth: 1,
        borderColor: "#c5c5c5",
    },
    btnCompanyRegistion: {
        fontSize: 13,
        color: '#c5c5c5',
        backgroundColor: 'transparent',
        marginRight: 4,
        borderBottomWidth: 1,
        borderColor: "#c5c5c5",
    },
    btnRightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-end",
    },
    bottomblank: {
        height: 150,
        width: '100%'
    }
});

function mapStateToProps(state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(Login)

