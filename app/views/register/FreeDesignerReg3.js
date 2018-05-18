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
    Platform
} from 'react-native'
import FrameL from './FrameL'
import MyTextInput from './MyTextInput'
import Points from './Points';
import Upload from './Upload'
import Upload2 from './Upload2'
import PwdInput from "./PwdInput";
import Picker from './Picker'
import DeviceStorage from '../../utils/DeviceStorage'
import Consts from '../../config/consts'
import { NavigationActions } from 'react-navigation'
import DatePicker from './DatePicker'

export default class FreeDesignerReg3 extends Component {
    static navigationOptions = {
        header: null,
    };

    _textInputBlur = () => {
        this.experienceInput.blur();
        this.designStyleInput._blur();
        this.agentInput._blur();
        this.regitrationPlaceInput._blur();
        this.brandNameInput._blur();
        this.passwordInput._blur();
    }

    constructor(props) {
        super(props);
        this.state = {
            free_name: null,
            free_first_name: null,
            free_birth_time: 123,
            free_birth_place: null,
            free_country: null,
            free_country_code: 'cn',
            free_address: null,
            free_telephone: null,
            free_email: null,
            free_instagram: null,
            free_other: null,
            free_home_page: null,
            free_works: '作品',
            free_school: null,
            free_college: null,
            free_profession: null,
            free_graduate: null,
            free_experience: null,
            free_design_type: null,
            free_design_style: null,
            free_agent: null,
            free_regitration_place: null,
            free_brand_name: null,
            free_resume: '简历',
            free_password: null,
            free_category: 'free',
            full17: '',
            full18: '',
            full19: '',
            full20: '',
            full21: '',
            full22: '',
            full24: '',
            free_works_token: '',
            free_resume_token: '',
            circlevisible: false,
        }
      this._onFreeDesignTypeChange = this._onFreeDesignTypeChange.bind(this);

    }

  _onFreeDesignTypeChange = (full18) =>{
    this.setState({full18:full18});
  };

    componentDidMount() {
        DeviceStorage.get("free_name").then(val => {
            this.setState({free_name: val});
        })

        DeviceStorage.get("free_first_name").then(val => {
            this.setState({free_first_name: val});
        })

        DeviceStorage.get("free_birth_time").then(val => {
            var timestamp = Date.parse(new Date(val));
            timestamp = timestamp / 1000;
            this.setState({free_birth_time: timestamp});
        })

        DeviceStorage.get("free_birth_place").then(val => {
            this.setState({free_birth_place: val});
        })

        DeviceStorage.get("free_country").then(val => {
            this.setState({free_country: val});
        })

        DeviceStorage.get("free_country_code").then(val => {
            this.setState({free_country_code: val});
        })

        DeviceStorage.get("free_address").then(val => {
            this.setState({free_address: val});
        })

        DeviceStorage.get("free_telephone").then(val => {
            this.setState({free_telephone: val});
        })

        DeviceStorage.get("free_email").then(val => {
            this.setState({free_email: val});
        })

        DeviceStorage.get("free_instagram").then(val => {
            this.setState({free_instagram: val});
        })

        DeviceStorage.get("free_other").then(val => {
            this.setState({free_other: val});
        })

        DeviceStorage.get("free_home_page").then(val => {
            this.setState({free_home_page: val});
        })

        DeviceStorage.get("free_school").then(val => {
            this.setState({free_school: val});
        })

        DeviceStorage.get("free_college").then(val => {
            this.setState({free_college: val});
        })

        DeviceStorage.get("free_profession").then(val => {
            this.setState({free_profession: val});
        })

        DeviceStorage.get("free_graduate").then(val => {
            this.setState({free_graduate: val});
        })

        DeviceStorage.get("free_works").then(val => {
            this.setState({free_works: val});
        })

    }



    FreeRegister = () => {

        if (this.state.full17.length > 0 &&
            this.state.full18.length > 0 &&
            this.state.full19.length > 0 &&
            this.state.full20.length > 0 &&
            this.state.full21.length > 0 &&
            this.state.full22.length > 0 &&
            this.state.full24.length > 0) {
            let getTokenPromise = Promise.all([DeviceStorage.get("free_design_type")]);
            getTokenPromise.then(([free_design_type]) => {

            fetch(`${Consts.server.BACKSTAGE}${Consts.api.USERREGISTER}`, {
                method: 'POST',
                body: JSON.stringify({
                    "name": this.state.free_name,
                    "first_name": this.state.free_first_name,
                    "birth_time": this.state.free_birth_time,
                    "birth_place": this.state.free_birth_place,
                    "country": this.state.free_country,
                    "country_code": this.state.free_country_code,
                    "address": this.state.free_address,
                    "telephone": this.state.free_telephone,
                    "email": this.state.free_email,
                    "instagram": this.state.free_instagram || '',
                    "other": this.state.free_other || '',
                    "home_page": this.state.free_home_page || '',
                    "works": this.state.free_works_token,
                    "school": this.state.free_school,
                    "college": this.state.free_college,
                    "profession": this.state.free_profession,
                    "graduate": this.state.free_graduate,
                    "experience": this.state.free_experience,
                    "design_type": free_design_type,
                    "design_style": this.state.free_design_style,
                    "agent": this.state.free_agent,
                    "regitration_place": this.state.free_regitration_place,
                    "brand_name": this.state.free_brand_name,
                    "resume": this.state.free_resume_token || '',
                    "password": this.state.free_password,
                    "type": this.state.free_category
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

                    this.setState({circlevisible: false}, () => {
                        console.log('错误了');
                        console.log(error_code);
                    });
                });
        });
        } else {

            this.setState({circlevisible:false},() =>{
                Alert.alert('温馨提醒','所有“*”项皆为必填，请填写完整提交注册');
            });
        }



    };


    _FreeImageUpload = () => {
        this._textInputBlur();
        this.setState({circlevisible:true});
        let free_works_token = '';
        let free_resume_token = '';

        let getTokenPromise = Promise.all([DeviceStorage.get("free_works"),
            DeviceStorage.get("free_resume"),
        ]);
        getTokenPromise.then(([free_works,
                                  free_resume]) => {


            if(!free_resume && typeof(free_resume)!=="undefined" && free_resume!==0||free_resume===''||free_resume.length===0){

                let formData = new FormData();

                for (let i = 0; i < free_works.length; i++) {
                    let uri = free_works[i].path;
                    let file = {uri: uri, type: free_works[i].mime, name: '123'};
                    formData.append("free_works" + i, file);
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
                                free_works_token = free_works_token + ' ,' + responseJson.files[i].token;
                        }

                        this.setState({free_works_token:free_works_token.slice(2)});
                        this.setState({free_resume_token: ''});
                        this.FreeRegister();
                    } else {

                        this.setState({circlevisible:false},() =>{
                            Alert.alert('温馨提醒', responseJson);
                        });
                    }
                }).catch((error) => {

                    this.setState({circlevisible:false},() =>{
                        Alert.alert('温馨提醒', error);
                    });
                });
            }else{
        let formData = new FormData();

            for (let i = 0; i < free_works.length; i++) {
                let uri = free_works[i].path;
                let file = {uri: uri, type: free_works[i].mime, name: '123'};
                formData.append("free_works" + i, file);
            }

            for (let i = 0; i < free_resume.length; i++) {
                let uri = free_resume[i].path;
                let file = {uri: uri, type: free_resume[i].mime, name: '123'};
                formData.append("free_resume" + i, file);
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
                console.log('返回数据'+JSON.stringify(responseJson));

                for (let i = 0; i < responseJson.files.length; i++) {
                    if(responseJson.files[i].fieldName.substring(0,10) === 'free_works'){
                        free_works_token = free_works_token + ' ,' + responseJson.files[i].token;
                    }else{
                        free_resume_token = free_resume_token + ' ,' + responseJson.files[i].token;
                    }
                }

                this.setState({free_works_token:free_works_token.slice(2)});
                this.setState({free_resume_token:free_resume_token.slice(2)});
                this.FreeRegister();
            } else {

                this.setState({circlevisible:false},() =>{
                    Alert.alert('温馨提醒', responseJson);
                });
            }
        }).catch((error) => {

            this.setState({circlevisible:false},() =>{
                Alert.alert('温馨提醒', error);
            });
        });
            }
        });

    };


    render() {
        const {goBack} = this.props.navigation;
        return (
            <FrameL title="自由设计师"
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
                        onChangeText={(free_experience) => {
                            this.setState({full17: free_experience});
                            this.setState({free_experience:free_experience})}}/>
                </View>
                <DatePicker
                  onDatePickerChange={this._onFreeDesignTypeChange}
                    name="设计类别"
                    storagekey="free_design_type"
                    describe="请选择设计类别"/>
                <MyTextInput
                    isMust={true}
                    label="设计风格"
                    placeholder="请填写2-3个关键词"
                    ref={(ref) => this.designStyleInput = ref}
                    onChangeText={(free_design_style) => {
                        this.setState({full19: free_design_style});
                        this.setState({free_design_style:free_design_style})}}/>
                <MyTextInput
                    isMust={true}
                    label="当前代理人"
                    ref={(ref) => this.agentInput = ref}
                    onChangeText={(free_agent) => {
                        this.setState({full20: free_agent});
                        this.setState({free_agent:free_agent})}}/>
                <MyTextInput
                    isMust={true}
                    label="品牌注册地"
                    ref={(ref) => this.regitrationPlaceInput = ref}
                    onChangeText={(free_regitration_place) => {
                        this.setState({full21: free_regitration_place});
                        this.setState({free_regitration_place:free_regitration_place})}}/>
                <MyTextInput
                    isMust={true}
                    label="品牌名称"
                    ref={(ref) => this.brandNameInput = ref}
                    onChangeText={(free_brand_name) => {
                        this.setState({full22: free_brand_name});
                        this.setState({free_brand_name:free_brand_name})}}/>
                <Upload name="上传简历"
                        tip="请上传3-5张"
                        imageupload="free_resume"/>
                <PwdInput placeholder="请设置登录密码"
                          ref={(ref) => this.passwordInput = ref}
                          onChangeText={(free_password) => {
                              this.setState({full24: free_password});
                              this.setState({free_password:free_password})}}/>
                <Points points={[false, false, true]} topMargin={15}/>
                <TouchableOpacity
                    disabled={this.state.circlevisible}
                    activeOpacity={0.6}
                    style={styles.btnNext}
                    onPress={this._FreeImageUpload}>
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
        padding: 0,
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