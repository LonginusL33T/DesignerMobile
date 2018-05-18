import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native'
import FrameL from './FrameL'
import Upload from './Upload'
import Points from "./Points";
import PwdInput from "./PwdInput";
import DeviceStorage from '../../utils/DeviceStorage'
import Consts from '../../config/consts'
import {NavigationActions} from 'react-navigation'

export default class BrandDesignerReg4 extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            brand_name: null,
            brand_first_name: null,
            brand_birth_time: null,
            brand_birth_place: null,
            brand_country: null,
            brand_country_code: 'cn',
            brand_address: null,
            brand_telephone: null,
            brand_email: null,
            brand_instagram: null,
            brand_other: null,
            brand_home_page: null,
            brand_works: '作品',
            brand_school: null,
            brand_college: null,
            brand_profession: null,
            brand_graduate: null,
            brand_experience: null,
            brand_design_type: null,
            brand_design_style: null,
            brand_brand_name: null,
            brand_regitration_time: null,
            brand_regitration_place: null,
            brand_production: null,
            brand_resume: '简历',
            brand_password: null,
            brand_type: 'production',
            b25: '',
            brand_works_token: '',
            brand_resume_token: '',
            circlevisible: false,
        }
    }

    componentDidMount() {
        DeviceStorage.get("free_name").then(val => {
            this.setState({brand_name: val});
        })

        DeviceStorage.get("free_first_name").then(val => {
            this.setState({brand_first_name: val});
        })

        DeviceStorage.get("free_birth_time").then(val => {
            var timestamp = Date.parse(new Date(val));
            timestamp = timestamp / 1000;
            this.setState({brand_birth_time: timestamp});
        })

        DeviceStorage.get("free_birth_place").then(val => {
            this.setState({brand_birth_place: val});
        })

        DeviceStorage.get("free_country").then(val => {
            this.setState({brand_country: val});
        })

        DeviceStorage.get("free_country_code").then(val => {
            this.setState({brand_country_code: val});
        })

        DeviceStorage.get("free_address").then(val => {
            this.setState({brand_address: val});
        })

        DeviceStorage.get("free_telephone").then(val => {
            this.setState({brand_telephone: val});
        })

        DeviceStorage.get("free_email").then(val => {
            this.setState({brand_email: val});
        })

        DeviceStorage.get("free_instagram").then(val => {
            this.setState({brand_instagram: val});
        })

        DeviceStorage.get("free_other").then(val => {
            this.setState({brand_other: val});
        })

        DeviceStorage.get("free_home_page").then(val => {
            this.setState({brand_home_page: val});
        })

        DeviceStorage.get("free_school").then(val => {
            this.setState({brand_school: val});
        })

        DeviceStorage.get("free_college").then(val => {
            this.setState({brand_college: val});
        })

        DeviceStorage.get("free_profession").then(val => {
            this.setState({brand_profession: val});
        })

        DeviceStorage.get("free_graduate").then(val => {
            this.setState({brand_graduate: val});
        })

        DeviceStorage.get("brand_experience").then(val => {
            this.setState({brand_experience: val});
        })

        DeviceStorage.get("brand_design_type").then(val => {
            this.setState({brand_design_type: val});
        })

        DeviceStorage.get("brand_design_style").then(val => {
            this.setState({brand_design_style: val});
        })

        DeviceStorage.get("brand_brand_name").then(val => {
            this.setState({brand_brand_name: val});
        })

        DeviceStorage.get("brand_regitration_time").then(val => {
            var timestamp = Date.parse(new Date(val));
            timestamp = timestamp / 1000;
            this.setState({brand_regitration_time: timestamp});
        })

        DeviceStorage.get("brand_regitration_place").then(val => {
            this.setState({brand_regitration_place: val});
        })

        DeviceStorage.get("brand_production").then(val => {
            this.setState({brand_production: val});
        })

        DeviceStorage.get("brand_works").then(val => {
            this.setState({brand_works: val});
        })
    }


    _textInputBlur = () => {
        this.passwordInput._blur();
    }

    BrandRegister = () => {
        //this.DeleteStorage();
        fetch(`${Consts.server.BACKSTAGE}${Consts.api.USERREGISTER}`, {
            method: 'POST',
            body: JSON.stringify({
                "name": this.state.brand_name,
                "first_name": this.state.brand_first_name,
                "birth_time": this.state.brand_birth_time,
                "birth_place": this.state.brand_birth_place,
                "country": this.state.brand_country,
                "country_code": this.state.brand_country_code,
                "address": this.state.brand_address,
                "telephone": this.state.brand_telephone,
                "email": this.state.brand_email,
                "instagram": this.state.brand_instagram || '',
                "other": this.state.brand_other || '',
                "home_page": this.state.brand_home_page || '',
                "works": this.state.brand_works_token || '',
                "school": this.state.brand_school,
                "college": this.state.brand_college,
                "profession": this.state.brand_profession,
                "graduate": this.state.brand_graduate,
                "experience": this.state.brand_experience,
                "design_type": this.state.brand_design_type,
                "design_style": this.state.brand_design_style,
                "brand_name": this.state.brand_brand_name,
                "regitration_time": this.state.brand_regitration_time,
                "regitration_place": this.state.brand_regitration_place,
                "production": this.state.brand_production,
                "resume": this.state.brand_resume_token,
                "password": this.state.brand_password,
                "type": this.state.brand_type
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.datas.data.error_code === 0) {
                    this.setState({circlevisible: false}, () => {
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

            })


    };


    _BrandImageUpload = () => {
        this._textInputBlur();
        let getTokenPromise = Promise.all([DeviceStorage.get("brand_works"),
            DeviceStorage.get("brand_resume"),
        ]);
        getTokenPromise.then(([brand_works,
                                  brand_resume]) => {

            if(!brand_resume && typeof(brand_resume) !== "undefined" && brand_resume !== 0||
                this.state.b25.length === 0||
                brand_resume.length===0){
                Alert.alert('温馨提醒', '所有项皆为必填，请填写完整提交注册');
            }else{


        this.setState({circlevisible: true});
        let brand_works_token = '';
        let brand_resume_token = '';


            if (!brand_works && typeof(brand_works) !== "undefined" && brand_works !== 0||brand_works===''||brand_works.length===0) {

                if (!brand_resume && typeof(brand_resume) !== "undefined" && brand_resume !== 0||brand_resume===''||brand_resume.length===0) {
                    //Alert.alert('温馨提醒', '用户必须上传作品才能入驻设计师工作站，可注册成功后再上传');
                    this.setState({brand_works_token: ''});
                    this.setState({brand_resume_token: ''});
                    this.BrandRegister();
                } else {
                    //Alert.alert('温馨提醒', '用户必须上传作品才能入驻设计师工作站，可注册成功后再上传');
                    let formData = new FormData();


                    for (let i = 0; i < brand_resume.length; i++) {
                        let uri = brand_resume[i].path;
                        let file = {uri: uri, type: brand_resume[i].mime, name: '123'};
                        formData.append("brand_resume" + i, file);
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
                                brand_resume_token = brand_resume_token + ' ,' + responseJson.files[i].token;
                            }

                            this.setState({brand_works_token: ''});
                            this.setState({brand_resume_token: brand_resume_token.slice(2)});
                            this.BrandRegister();
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

            } else {

                if (!brand_resume && typeof(brand_resume) !== "undefined" && brand_resume !== 0||brand_resume===''||brand_resume.length===0) {

                    let formData = new FormData();


                    for (let i = 0; i < brand_works.length; i++) {
                        let uri = brand_works[i].path;
                        let file = {uri: uri, type: brand_works[i].mime, name: '123'};
                        formData.append("brand_works" + i, file);
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
                                brand_works_token = brand_works_token + ' ,' + responseJson.files[i].token;
                            }

                            this.setState({brand_works_token: brand_works_token.slice(2)});
                            this.setState({brand_resume_token: ''});
                            this.BrandRegister();
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
                } else {
                    let formData = new FormData();

                    for (let i = 0; i < brand_works.length; i++) {
                        let uri = brand_works[i].path;
                        let file = {uri: uri, type: brand_works[i].mime, name: '123'};
                        formData.append("brand_works" + i, file);
                    }

                    for (let i = 0; i < brand_resume.length; i++) {
                        let uri = brand_resume[i].path;
                        let file = {uri: uri, type: brand_resume[i].mime, name: '123'};
                        formData.append("brand_resume" + i, file);
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
                                if (responseJson.files[i].fieldName.substring(0, 11) === 'brand_works') {
                                    brand_works_token = brand_works_token + ' ,' + responseJson.files[i].token;
                                } else {
                                    brand_resume_token = brand_resume_token + ' ,' + responseJson.files[i].token;
                                }
                            }

                            this.setState({brand_works_token: brand_works_token.slice(2)});
                            this.setState({brand_resume_token: brand_resume_token.slice(2)});
                            this.BrandRegister();
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
        const {goBack, navigate} = this.props.navigation;
        return (
            <FrameL title="自有品牌设计师"
                    back={() => {
                        this._textInputBlur();
                        goBack();
                    }}
            >
                {this.state.circlevisible ?
                    <ActivityIndicator
                        animating={true}
                        style={[styles.centering, {height: 80}]}
                        size="large"/> : null}
                <Upload isMust={true}
                        name="上传简历"
                        imageupload="brand_resume"/>
                <PwdInput placeholder="请设置登录密码"
                          ref={(ref) => this.passwordInput = ref}
                          onChangeText={(brand_password) => {
                              this.setState({b25: brand_password});
                              this.setState({brand_password: brand_password})
                          }}/>
                <Points points={[false, false, false, true]} topMargin={138}/>
                <TouchableOpacity
                    disabled={this.state.circlevisible}
                    activeOpacity={0.6}
                    style={styles.btnNext}
                    onPress={this._BrandImageUpload}>
                    <Text style={styles.btnInnerText}>注册</Text>
                </TouchableOpacity>
            </FrameL>
        );
    }
}

const styles = StyleSheet.create({
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
    centering: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 8,
        marginTop: 250,
        position: 'absolute'
    },
});