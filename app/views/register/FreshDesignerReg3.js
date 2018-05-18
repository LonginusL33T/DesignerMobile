import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
    Platform,
} from 'react-native'
import FrameL from './FrameL'
import MyTextInput from './MyTextInput'
import Points from './Points';
import Upload from './Upload'
import PwdInput from "./PwdInput";
import Picker from './Picker'
import DeviceStorage from '../../utils/DeviceStorage'
import Consts from '../../config/consts'
import { NavigationActions } from 'react-navigation'
import DatePicker from './DatePicker'


export default class FreshDesignerReg3 extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state={
            fresh_name:null,
            fresh_first_name: null,
            fresh_birth_time: null,
            fresh_birth_place: null,
            fresh_country: null,
            fresh_country_code: 'cn',
            fresh_address:null,
            fresh_telephone:null,
            fresh_email:null,
            fresh_instagram:null,
            fresh_other:null,
            fresh_home_page:null,
            fresh_works: '作品',
            fresh_school:null,
            fresh_college:null,
            fresh_profession:null,
            fresh_graduate:null,
            fresh_experience:null,
            fresh_design_type:null,
            fresh_design_style:null,
            fresh_resume: '简历',
            fresh_password: null,
            fresh_type: 'graduate',
            f17: '',
            f18: '',
            f19: '',
            f21: '',
            fresh_works_token: '',
            fresh_resume_token: '',
            circlevisible: false,
        }
      this._onFreshDesignTypeChange = this._onFreshDesignTypeChange.bind(this);
    }
  _onFreshDesignTypeChange = (f18) =>{
    this.setState({f18:f18});
  };

    componentDidMount(){
        DeviceStorage.get("free_name").then(val => {
            this.setState({fresh_name: val});
        })

        DeviceStorage.get("free_first_name").then(val => {
            this.setState({fresh_first_name: val});
        })

        DeviceStorage.get("free_birth_time").then(val => {
            var timestamp = Date.parse(new Date(val));
            timestamp = timestamp / 1000;
            this.setState({fresh_birth_time: timestamp});
        })

        DeviceStorage.get("free_birth_place").then(val => {
            this.setState({fresh_birth_place: val});
        })

        DeviceStorage.get("free_country").then(val => {
            this.setState({fresh_country: val});
        })

        DeviceStorage.get("free_country_code").then(val => {
            this.setState({fresh_country_code: val});
        })

        DeviceStorage.get("free_address").then(val => {
            this.setState({fresh_address: val});
        })

        DeviceStorage.get("free_telephone").then(val => {
            this.setState({fresh_telephone: val});
        })

        DeviceStorage.get("free_email").then(val => {
            this.setState({fresh_email: val});
        })

        DeviceStorage.get("free_instagram").then(val => {
            this.setState({fresh_instagram: val});
        })

        DeviceStorage.get("free_other").then(val => {
            this.setState({fresh_other: val});
        })

        DeviceStorage.get("free_home_page").then(val => {
            this.setState({fresh_home_page: val});
        })

        DeviceStorage.get("free_school").then(val => {
            this.setState({fresh_school: val});
        })

        DeviceStorage.get("free_college").then(val => {
            this.setState({fresh_college: val});
        })

        DeviceStorage.get("free_profession").then(val => {
            this.setState({fresh_profession: val});
        })

        DeviceStorage.get("free_graduate").then(val => {
            this.setState({fresh_graduate: val});
        })

        DeviceStorage.get("fresh_works").then(val => {
            this.setState({fresh_works: val});
        })
    }

    _textInputBlur = () => {
        this.experienceInput.blur();
        this.designStyleInput._blur();
        this.passwordInput._blur();
    }

    FreshRegister = () => {
        let getTokenPromise = Promise.all([DeviceStorage.get("fresh_design_type")]);
        getTokenPromise.then(([fresh_design_type]) => {
        fetch(`${Consts.server.BACKSTAGE}${Consts.api.USERREGISTER}`, {
            method: 'POST',
            body: JSON.stringify({
                "name": this.state.fresh_name,
                "first_name": this.state.fresh_first_name,
                "birth_time": this.state.fresh_birth_time,
                "birth_place": this.state.fresh_birth_place,
                "country": this.state.fresh_country,
                "country_code": this.state.fresh_country_code,
                "address": this.state.fresh_address,
                "telephone": this.state.fresh_telephone,
                "email": this.state.fresh_email,
                "instagram": this.state.fresh_instagram || '',
                "other": this.state.fresh_other || '',
                "home_page": this.state.fresh_home_page || '',
                "works": this.state.fresh_works_token || '',
                "school": this.state.fresh_school,
                "college": this.state.fresh_college,
                "profession": this.state.fresh_profession,
                "graduate": this.state.fresh_graduate,
                "experience": this.state.fresh_experience,
                "design_type": fresh_design_type,
                "design_style": this.state.fresh_design_style,
                "resume": this.state.fresh_resume_token,
                "password": this.state.fresh_password,
                "type": this.state.fresh_type
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.datas.data.error_code === 0) {
                    this.setState({circlevisible: false}, () => {
                        //this.DeleteStorage();
                        Alert.alert('温馨提醒', '注册成功');
                        const {dispatch} = this.props.navigation;
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'Login'})
                            ]
                        });
                        dispatch(resetAction);
                    });

                } else {
                    this.setState({circlevisible: false}, () => {
                        Alert.alert('温馨提醒', responseData.datas.data.message);
                    });

                }
            })
            .catch((error_code) => {
                this.setState({circlevisible: false});
            })

    });

    };


    _FreshImageUpload = () => {
        this._textInputBlur();
        let getTokenPromise = Promise.all([DeviceStorage.get("fresh_works"),
            DeviceStorage.get("fresh_resume"),
        ]);
        getTokenPromise.then(([fresh_works,
                                  fresh_resume]) => {

            if(!fresh_resume && typeof(fresh_resume) !== "undefined" && fresh_resume !== 0||
                fresh_resume.length===0||
                this.state.f17.length===0||
                this.state.f18.length===0||
                this.state.f19.length===0||
                this.state.f21.length===0){
                Alert.alert('温馨提醒', '所有项皆为必填，请填写完整提交注册');
            }else{

            this.setState({circlevisible:true});
            let fresh_works_token = '';
            let fresh_resume_token = '';

            if(!fresh_works && typeof(fresh_works)!=="undefined" && fresh_works!==0||fresh_works===''||fresh_works.length===0){

                if(!fresh_resume && typeof(fresh_resume)!=="undefined" && fresh_resume!==0||fresh_resume===''||fresh_resume.length===0){
                    //Alert.alert('温馨提醒','用户必须上传作品才能入驻设计师工作站，可注册成功后再上传');
                            this.setState({fresh_works_token: ''});
                            this.setState({fresh_resume_token: ''});
                            this.FreshRegister();
                }else{
                    //Alert.alert('温馨提醒','用户必须上传作品才能入驻设计师工作站，可注册成功后再上传');
                    let formData = new FormData();



                    for (let i = 0; i < fresh_resume.length; i++) {
                        let uri = fresh_resume[i].path;
                        let file = {uri: uri, type: fresh_resume[i].mime, name: '123'};
                        formData.append("fresh_resume" + i, file);
                    }


                    const REQUEST_URL = `${Consts.api.UPLOADIMAGE}`;
                    fetch(REQUEST_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/json'
                        },
                        body: formData,
                    }).then((response) => response.json()).then((responseJson) => {
                        if (responseJson.code === 'OK') {
                            console.log('返回数据' + JSON.stringify(responseJson));

                            for (let i = 0; i < responseJson.files.length; i++) {
                                fresh_resume_token = fresh_resume_token + ' ,' + responseJson.files[i].token;
                            }

                            this.setState({fresh_works_token: ''});
                            this.setState({fresh_resume_token: fresh_resume_token.slice(2)});
                            this.FreshRegister();
                        } else {
                            this.setState({circlevisible:false},() => {
                                Alert.alert('温馨提醒', responseJson);
                            });

                        }
                    }).catch((error) => {

                        this.setState({circlevisible:false},() => {
                            Alert.alert('温馨提醒', error);
                        });
                    });
                }

            }else {

                if(!fresh_resume && typeof(fresh_resume)!=="undefined" && fresh_resume!==0||fresh_resume===''||fresh_resume.length===0){

                    let formData = new FormData();



                    for (let i = 0; i < fresh_works.length; i++) {
                        let uri = fresh_works[i].path;
                        let file = {uri: uri, type: fresh_works[i].mime, name: '123'};
                        formData.append("fresh_works" + i, file);
                    }


                    const REQUEST_URL = `${Consts.api.UPLOADIMAGE}`;
                    fetch(REQUEST_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/json'
                        },
                        body: formData,
                    }).then((response) => response.json()).then((responseJson) => {
                        if (responseJson.code === 'OK') {
                            console.log('返回数据' + JSON.stringify(responseJson));

                            for (let i = 0; i < responseJson.files.length; i++) {
                                fresh_works_token = fresh_works_token + ' ,' + responseJson.files[i].token;
                            }

                            this.setState({fresh_works_token: fresh_works_token.slice(2)});
                            this.setState({fresh_resume_token: ''});
                            this.FreshRegister();
                        } else {
                            this.setState({circlevisible:false},() => {
                                Alert.alert('温馨提醒', responseJson);
                            });

                        }
                    }).catch((error) => {

                        this.setState({circlevisible:false},() => {
                            Alert.alert('温馨提醒', error);
                        });
                    });
                }else{
                    let formData = new FormData();

                    for (let i = 0; i < fresh_works.length; i++) {
                        let uri = fresh_works[i].path;
                        let file = {uri: uri, type: fresh_works[i].mime, name: '123'};
                        formData.append("fresh_works" + i, file);
                    }

                    for (let i = 0; i < fresh_resume.length; i++) {
                        let uri = fresh_resume[i].path;
                        let file = {uri: uri, type: fresh_resume[i].mime, name: '123'};
                        formData.append("fresh_resume" + i, file);
                    }


                    const REQUEST_URL = `${Consts.api.UPLOADIMAGE}`;
                    fetch(REQUEST_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/json'
                        },
                        body: formData,
                    }).then((response) => response.json()).then((responseJson) => {
                        if (responseJson.code === 'OK') {


                            for (let i = 0; i < responseJson.files.length; i++) {
                                if (responseJson.files[i].fieldName.substring(0, 11) === 'fresh_works') {
                                    fresh_works_token = fresh_works_token + ' ,' + responseJson.files[i].token;
                                } else {
                                    fresh_resume_token = fresh_resume_token + ' ,' + responseJson.files[i].token;
                                }
                            }

                            this.setState({fresh_works_token: fresh_works_token.slice(2)});
                            this.setState({fresh_resume_token: fresh_resume_token.slice(2)});
                            this.FreshRegister();
                        } else {

                            this.setState({circlevisible:false},() => {
                                Alert.alert('温馨提醒', responseJson);
                            });
                        }
                    }).catch((error) => {

                        this.setState({circlevisible:false},() => {
                            Alert.alert('温馨提醒', error);
                        });
                    });
                }



            }

            }
        });



    };

    render() {
        const {goBack,navigate} = this.props.navigation;
        return (
            <FrameL title="应届设计师"
                    back={() => {
                        this._textInputBlur();
                        goBack();
                    }}>
                <View style={styles.itemContainer}>
                    <Image source={require('../../assets/designer/star.png')}
                           style={Platform.OS=='android' ? styles.starAndroid:styles.starIOS}/>
                    {this.state.circlevisible ?
                        <ActivityIndicator
                            animating={true}
                            style={[styles.centering, {height: 80}]}
                            size="large"/>:null}
                    <Text style={styles.text}>其他教育经历</Text>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        multiline={true}
                        maxLength={60}
                        ref={(ref) => this.experienceInput = ref}
                        onChangeText={(fresh_experience) => {
                            this.setState({f17:fresh_experience});
                            this.setState({fresh_experience:fresh_experience})}}
                    />
                </View>
                <DatePicker
                  onDatePickerChange={this._onFreshDesignTypeChange}
                    name="设计类别"
                    storagekey="fresh_design_type"
                    describe="请选择设计类别"/>
                <MyTextInput
                    isMust={true}
                    label="设计风格"
                    placeholder="请填写2-3个关键词"
                    ref={(ref) => this.designStyleInput = ref}
                    onChangeText={(fresh_design_style) => {
                        this.setState({f19:fresh_design_style});
                        this.setState({fresh_design_style:fresh_design_style})}}/>
                <Upload name="上传简历" tip="请上传3-5张" isMust={true} imageupload="fresh_resume"/>
                <PwdInput placeholder="请设置登录密码"
                          ref={(ref) => this.passwordInput = ref}
                          onChangeText={(fresh_password) => {
                              this.setState({f21:fresh_password});
                              this.setState({fresh_password:fresh_password})}}/>
                <Points points={[false, false, true]} topMargin={15}/>
                <TouchableOpacity
                    disabled={this.state.circlevisible}
                    activeOpacity={0.6}
                    style={styles.btnNext}
                    onPress={this._FreshImageUpload}>
                    <Text style={styles.btnInnerText}>注册</Text>
                </TouchableOpacity>
            </FrameL>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
       width: "90%",
    },
    text: {
        fontSize: 16,
        color: '#d5d5d5',
        alignSelf: 'flex-start',
        marginTop: 30,
        marginBottom: 7,
        backgroundColor:"transparent"
    },
    textInput: {
        width: "100%",
        height: 48,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
        padding: 5,
        paddingLeft:5,
        paddingRight:5,
        textAlignVertical: 'top',
        color: '#969696',
        fontSize: 12,
    },
    btnNext: {
        marginTop: 13,
        width: "90%",
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#f3bd49'
    },
    btnInnerText: {
        fontSize: 18,
        color: '#644401'
    },
    starIOS: {
        width: 10,
        height:10,
        position:"absolute",
        top:33,
        left:-12,
        justifyContent:"center",

    },
    starAndroid: {
        width: 10,
        height:10,
        position:"absolute",
        top:35,
        left:-12,
        justifyContent:"center"
    },
    centering: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 8,
        marginTop: 250,
        position: 'absolute'
    },
});