import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Text,
    TextInput,
    StatusBar,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Consts from '../config/consts'
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const img_arr = [require('../assets/designer/icon_eyes.png'), require('../assets/designer/eye.png')];
let timetext = '';
const background = require('../assets/designer/login_back.png');
const logo = require('../assets/designer/logo.png');
const back = require('../assets/designer/left.png');
class ForgetPassword extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            identi: 1,
            pwdi: 1,
            secureident: true,
            securepwd: true,
            identview: styles.stroke,
            identtext: styles.codetext,
            identcontent: '发送验证码',
            identtime: null,
            identtimeleft: null,
            identtimeright: null,
            isDisable: false,
            forget_email: '',
            forget_token: '',
            forget_validate_code: '',
            forget_password: '',
        };
        this.exchangePicIdent = this.exchangePicIdent.bind(this);
        this.exchangePicPwd = this.exchangePicPwd.bind(this);
        this.exchangeIdentForm = this.exchangeIdentForm.bind(this);
    }

    _textInputBlur = () => {
        this.emailInput.blur();
        this.identInput.blur();
        this.passwordInput.blur();
    }

    exchangePicIdent = () => {
        if (this.state.identi === 1) {
            this.setState({
                identi: 0,
                secureident: false,
            });
        } else {
            this.setState({
                identi: 1,
                secureident: true,
            });
        }

    };
    exchangePicPwd = () => {
        if (this.state.pwdi === 1) {
            this.setState({
                pwdi: 0,
                securepwd: false,
            });
        } else {
            this.setState({
                pwdi: 1,
                securepwd: true,
            });
        }
    };
    exchangeIdentForm = () => {
        this._textInputBlur();
        let szReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        let bChk = szReg.test(this.state.forget_email);
        if (bChk&&this.state.forget_email!=='') {
            //send
            console.log(JSON.stringify({
                "loginname": this.state.forget_email,
            }));
            fetch(`${Consts.server.BACKSTAGE}${Consts.api.SENDCODE}`, {
                method: 'POST',
                body: JSON.stringify({
                    "loginname": this.state.forget_email,
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData.datas.data.error_code === 0) {
                        this.setState({forget_token: responseData.datas.data.token});
                        Alert.alert('温馨提醒', '邮箱验证码已发送');
                        //send
                        this.setState({
                            identview: styles.stroke_after,
                            identtext: styles.codetext_after,
                            identcontent: '重新发送',
                            identtime: 60,
                            identtimeleft: '(',
                            identtimeright: 's)',
                            isDisable: true
                        });
                        this.interval = setInterval(() => {
                            this.setState({
                                identime: this.state.identtime--
                            });
                            if (this.state.identime <= 1) {
                                clearInterval(this.interval);
                                this.setState({
                                    identtime: null,
                                    identtimeleft: null,
                                    identtimeright: null,
                                    isDisable: false,
                                    identview: styles.stroke_middle,
                                    identtext: styles.codetext_middle
                                })
                            }
                        }, 1000);
                    } else {
                        Alert.alert(responseData.datas.data.message);
                    }

                })
                .catch((error_code) => {
                    console.log('错误了');
                    console.log(error_code);
                });
            //send
        } else {
            Alert.alert('温馨提醒',"请输入正确的邮箱格式！");
        }

    };
    //重置密码
    ResetPassword = () => {
        this._textInputBlur();
        if(this.state.forget_email===''||this.state.forget_validate_code===''||this.state.forget_password===''){
             Alert.alert('温馨提醒','请填写完整');
        }else{
        console.log(JSON.stringify({
            "email_token": this.state.forget_token,
            "email": this.state.forget_email,
            "code": this.state.forget_validate_code,
            "password": this.state.forget_password
        }));
        fetch(`${Consts.server.BACKSTAGE}${Consts.api.RESETPASSWORD}`, {
            method: 'POST',
            body: JSON.stringify({
                "email_token": this.state.forget_token,
                "email": this.state.forget_email,
                "code": this.state.forget_validate_code,
                "password": this.state.forget_password
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.datas.data.error_code === 0) {
                    Alert.alert('温馨提醒','重置成功！');
                    const {dispatch} = this.props.navigation;
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Login'})
                        ]
                    });
                    dispatch(resetAction);
                } else {
                    Alert.alert(responseData.datas.data.message);
                }
            })
            .catch((error_code) => {
                console.log('错误了');
                console.log(error_code);
            });
        }
    };


    render() {
        const {navigation} = this.props;
        return (
            <ImageBackground
                source={background}
                blurRadius={10}
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
                    <View style={styles.inputview}>
                        <View style={styles.identicode}>
                            <TextInput underlineColorAndroid='transparent'
                                       ref={(ref) => this.emailInput = ref}
                                       style={styles.textinput}
                                       placeholder='请输入已注册邮箱'
                                       placeholderTextColor="#C5C5C5"
                                       onChangeText={(forget_email) => this.setState({forget_email: forget_email})}/>
                            <TouchableOpacity style={styles.sendidenticode}
                                              backgroundColor="transparent"
                                              onPress={this.exchangeIdentForm}
                                              disabled={this.state.isDisable}>
                                <View style={this.state.identview}>
                                    <Text
                                        style={this.state.identtext}>{this.state.identcontent}{this.state.identtimeleft}{this.state.identtime}{this.state.identtimeright}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.dividerview}>
                            <Text style={styles.divider}></Text>
                        </View>
                        <View style={styles.visiblepwd}>
                            <TextInput underlineColorAndroid='transparent'
                                       ref={(ref) => this.identInput = ref}
                                       style={styles.textinput}
                                       placeholder='输入验证码'
                                       secureTextEntry={this.state.secureident}
                                       placeholderTextColor="#C5C5C5"
                                       onChangeText={(forget_validate_code) => this.setState({forget_validate_code: forget_validate_code})}/>

                            <TouchableWithoutFeedback onPress={this.exchangePicIdent}>
                                <Image style={styles.pwdicon}
                                       source={img_arr[this.state.identi]}/>
                            </TouchableWithoutFeedback>

                        </View>
                        <View style={styles.dividerview}>
                            <Text style={styles.divider}></Text>
                        </View>
                        <View style={styles.visiblepwd}>
                            <TextInput underlineColorAndroid='transparent'
                                       ref={(ref) => this.passwordInput = ref}
                                       style={styles.textinput}
                                       placeholder='输入新密码'
                                       secureTextEntry={this.state.securepwd}
                                       placeholderTextColor="#C5C5C5"
                                       onChangeText={(forget_password) => this.setState({forget_password: forget_password})}/>

                            <TouchableWithoutFeedback onPress={this.exchangePicPwd}>
                                <Image style={styles.pwdicon}
                                       source={img_arr[this.state.pwdi]}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.dividerview}>
                            <Text style={styles.divider}></Text>
                        </View>
                    </View>
                        <TouchableOpacity
                            onPress={this.ResetPassword}>
                    <View style={styles.buttonview}>

                            <Text style={styles.logintext}>重置密码</Text>

                    </View>
                        </TouchableOpacity>
                        <View style={styles.bottomblank}>
                        </View>
                </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backContainer:{
        marginTop: 22,
        paddingLeft:15,
        paddingVertical:10,
        width: 48,
    },
    backbtn: {
        width: 10,
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    headtitle: {
        alignSelf: 'center',
        marginTop: 125,
        height: 65,
        width: 65
    },
    avatarview: {
        height: 150,
        justifyContent: 'center',
    },
    avatarimage: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    inputview: {
        height: 162,
        marginTop: 50,
        width: "90%",
        alignSelf: 'center',
    },
    textinput: {
        flex: 1,
        fontSize: 14,
        height: 53,
        paddingLeft: 8,
        paddingTop: 26,
        color: '#C5C5C5'
    },
    bottomview: {
        flex: 1,
        marginTop: 20
    },
    buttonview: {
        backgroundColor: '#F3BD49',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30,
        width: "90%",
        height: 45
    },
    logintext: {
        fontSize: 18,
        color: '#644401',
        marginTop: 10,
        marginBottom: 10,
    },
    emptyview: {
        flex: 1,
    },
    bottombtnsview: {
        flexDirection: 'row',
    },
    bottombtn: {
        color: '#F3BD49',
        marginLeft: 42,
        fontSize: 12,
    },
    bottomleftbtnview: {
        flex: 1,
        height: 50,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    bottomrightbtnview: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    bottombtnleft: {
        marginLeft: 130,
        fontSize: 12,
        color: '#C5C5C5',
        textDecorationLine: 'underline'
    },
    bottombtnright: {
        marginLeft: 37,
        fontSize: 12,
        color: '#C5C5C5',
        textDecorationLine: 'underline'
    },
    dividerview: {
        flexDirection: 'row',
        width: "100%"
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#6E6E6E'
    },
    visiblepwd: {
        flexDirection: 'row'
    },
    pwdicon: {
        marginTop: 25
    },
    identicode: {
        flexDirection: 'row'
    },
    sendidenticode: {
        height: 25,
        width: 86,
        borderRadius: 2,
        backgroundColor: '#00000000',
        marginTop: 25,
    },
    codetext: {
        fontSize: 11,
        color: '#F3BD49',
        marginLeft: 3,
    },
    codetext_after: {
        fontSize: 11,
        color: '#DDDDDD',
        marginLeft: 10,
    },
    codetext_middle:{
        fontSize: 11,
        color: '#DDDDDD',
        marginLeft: 5,
    },
    stroke: {
        borderWidth: 1,
        borderColor: '#F2BE48',
        justifyContent: 'center',
        height: 22,
        width: 65,
        borderRadius: 2,
        marginLeft:21
    },
    stroke_after: {
        borderWidth: 1,
        borderColor: '#C2C2C2',
        justifyContent: 'center',
        height: 25,
        width: 86,
        borderRadius: 2,
    },
    stroke_middle:{
        borderWidth: 1,
        borderColor: '#C2C2C2',
        justifyContent: 'center',
        height: 25,
        width: 60,
        borderRadius: 2,
        marginLeft: 26
    },
    logo: {
        alignSelf: 'center',
        marginTop: 69,
        width: 110,
        height:95
    },
    bottomblank: {
        height: 150,
        width: '100%'
    }
});

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

export default connect(mapStateToProps)(ForgetPassword);