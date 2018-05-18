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
import MyTextInput from './MyTextInput'
import Upload from './Upload'
import Upload2 from './Upload2'
import Upload3 from './Upload3'
import Upload4 from './Upload4'
import Upload5 from './Upload5'
import Points from "./Points";
import Picker from './Picker'
import PwdInput from "./PwdInput";
import DeviceStorage from '../../utils/DeviceStorage'
import Consts from '../../config/consts'
import { NavigationActions } from 'react-navigation'
import DatePicker from './DatePicker'


export default class CompanyReg2 extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state={
            company_name: null,
            company_registion_place: null,
            company_registion_place_code: null,
            company_brand_num: null,
            company_brand_name: null,
            company_address: null,
            company_telephone: null,
            company_contact_phone: null,
            company_email: null,
            company_size: null,
            company_enterprise_nature: null,
            company_business_licence: '1234',
            company_organization_code_certificate: '1234',
            company_business_contact_card: '1234',
            company_tax_registration_certificate: '1234',
            company_password: null,
            c8: '',
            c9: '',
            c10: '',
            c11: '',
            c12: '',
            c13: '',
            c14: '',
            c15: '',
            company_business_licence_token: '',
            company_organization_code_certificate_token: '',
            company_business_contact_card_token: '',
            company_tax_registration_certificate_token: '',
            circlevisible: false,
        };
      this._onSizeChange = this._onSizeChange.bind(this);
      this._onNatureChange = this._onNatureChange.bind(this);
    }

    componentDidMount(){
        DeviceStorage.get("company_name").then(val => {
            this.setState({company_name: val});
        });

        DeviceStorage.get("company_registion_place").then(val => {
            this.setState({company_registion_place: val});
        })

        DeviceStorage.get("company_brand_num").then(val => {
            this.setState({company_brand_num: val});
        })

        DeviceStorage.get("company_brand_name").then(val => {
            this.setState({company_brand_name: val});
        })

        DeviceStorage.get("company_address").then(val => {
            this.setState({company_address: val});
        })

        DeviceStorage.get("company_telephone").then(val => {
            this.setState({company_telephone: val});
        })

        DeviceStorage.get("company_email").then(val => {
            this.setState({company_email: val});
        })

      DeviceStorage.get("company_registion_place_code").then(val => {
        this.setState({company_registion_place_code: val});
      })

    }

    _textInputBlur = () => {
        this.contactPhoneInput._blur();
        this.passwordInput._blur();
    }

  _onSizeChange = (c9) =>{
    this.setState({c9:c9});
  };

  _onNatureChange = (c10) =>{
    this.setState({c10:c10});
  };

    CompanyRegister = () => {

        let bChk_mobilphone = (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.state.c8));
        if(bChk_mobilphone) {
            let getTokenPromise = Promise.all([DeviceStorage.get("company_size"),
                DeviceStorage.get("company_enterprise_nature"),
            ]);
            getTokenPromise.then(([company_size,
                                      company_enterprise_nature]) => {
                console.log(company_size);
                console.log(company_enterprise_nature);
            //this.DeleteStorage();
            console.log(JSON.stringify({
                "name": this.state.company_name,
                "registion_place": this.state.company_registion_place,
                "registion_place_code": this.state.company_registion_place_code,
                "brand_num": this.state.company_brand_num,
                "brand_name": this.state.company_brand_name,
                "address": this.state.company_address,
                "telephone": this.state.company_telephone,
                "contact_phone": this.state.company_contact_phone,
                "email": this.state.company_email,
                "size": company_size,
                "enterprise_nature": company_enterprise_nature,
                "business_licence": this.state.company_business_licence_token,
                "organization_code_certificate": this.state.company_organization_code_certificate_token,
                "business_contact_card": this.state.company_business_contact_card_token,
                "tax_registration_certificate": this.state.company_tax_registration_certificate_token,
                "password": this.state.company_password,
            }));
            fetch(`${Consts.server.BACKSTAGE}${Consts.api.COMPANYREGISTER}`, {
                method: 'POST',
                body: JSON.stringify({
                    "name": this.state.company_name,
                    "registion_place": this.state.company_registion_place,
                    "brand_num": this.state.company_brand_num,
                    "brand_name": this.state.company_brand_name,
                    "address": this.state.company_address,
                    "telephone": this.state.company_telephone,
                    "contact_phone": this.state.company_contact_phone,
                    "email": this.state.company_email,
                    "size": company_size,
                    "enterprise_nature": company_enterprise_nature,
                    "business_licence": this.state.company_business_licence_token,
                    "organization_code_certificate": this.state.company_organization_code_certificate_token,
                    "business_contact_card": this.state.company_business_contact_card_token,
                    "tax_registration_certificate": this.state.company_tax_registration_certificate_token,
                    "password": this.state.company_password,
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
                });
        });
        }else{

            this.setState({circlevisible:false},() => {
                Alert.alert('温馨提醒','电话格式不正确');
            });
        }
    };


    _CompanyImageUpload = () => {
        this._textInputBlur();
        let getTokenPromise = Promise.all([DeviceStorage.get("company_business_licence"),
            DeviceStorage.get("company_organization_code_certificate"),
            DeviceStorage.get("company_business_contact_card"),
            DeviceStorage.get("company_tax_registration_certificate")]);
        getTokenPromise.then(([company_business_licence,
                                  company_organization_code_certificate,
                                  company_business_contact_card,
                                  company_tax_registration_certificate]) => {
            if(!company_business_licence && typeof(company_business_licence) !== "undefined" && company_business_licence !== 0||
                !company_organization_code_certificate && typeof(company_organization_code_certificate) !== "undefined" && company_organization_code_certificate !== 0||
                !company_business_contact_card && typeof(company_business_contact_card) !== "undefined" && company_business_contact_card !== 0||
                !company_tax_registration_certificate && typeof(company_tax_registration_certificate) !== "undefined" && company_tax_registration_certificate !== 0||
                this.state.c8.length===0||
                this.state.c9.length===0||
                this.state.c10.length===0||
                this.state.c15.length===0||
                company_business_licence.length===0||
                company_organization_code_certificate.length===0||
                company_business_contact_card.length===0||
                company_tax_registration_certificate.length===0){
             Alert.alert('温馨提醒','所有“*”项皆为必填，请填写完整提交注册');
            }else{


            this.setState({circlevisible: true});
            let company_business_licence_token = '';
            let company_organization_code_certificate_token = '';
            let company_business_contact_card_token = '';
            let company_tax_registration_certificate_token = '';
                let formData = new FormData();

                for (let i = 0; i < company_business_licence.length; i++) {
                    let uri = company_business_licence[i].path;
                    let file = {uri: uri, type: company_business_licence[i].mime, name: '123'};
                    formData.append("company_business_licence" + i, file);
                }

                for (let i = 0; i < company_organization_code_certificate.length; i++) {
                    let uri = company_organization_code_certificate[i].path;
                    let file = {uri: uri, type: company_organization_code_certificate[i].mime, name: '123'};
                    formData.append("company_organization_code_certificate" + i, file);
                }

                for (let i = 0; i < company_business_contact_card.length; i++) {
                    let uri = company_business_contact_card[i].path;
                    let file = {uri: uri, type: company_business_contact_card[i].mime, name: '123'};
                    formData.append("company_business_contact_card" + i, file);
                }

                for (let i = 0; i < company_tax_registration_certificate.length; i++) {
                    let uri = company_tax_registration_certificate[i].path;
                    let file = {uri: uri, type: company_tax_registration_certificate[i].mime, name: '123'};
                    formData.append("company_tax_registration_certificate" + i, file);
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
                            if (responseJson.files[i].fieldName.substring(0, 24) === 'company_business_licence') {
                                company_business_licence_token = company_business_licence_token + ' ,' + responseJson.files[i].token;
                            } else if (responseJson.files[i].fieldName.substring(0, 37) === 'company_organization_code_certificate') {
                                company_organization_code_certificate_token = company_organization_code_certificate_token + ' ,' + responseJson.files[i].token;
                            } else if (responseJson.files[i].fieldName.substring(0, 29) === 'company_business_contact_card') {
                                company_business_contact_card_token = company_business_contact_card_token + ' ,' + responseJson.files[i].token;
                            } else if (responseJson.files[i].fieldName.substring(0, 36) === 'company_tax_registration_certificate') {
                                company_tax_registration_certificate_token = company_tax_registration_certificate_token + ' ,' + responseJson.files[i].token;
                            }
                        }

                        this.setState({company_business_licence_token: company_business_licence_token.slice(2)});
                        this.setState({company_organization_code_certificate_token: company_organization_code_certificate_token.slice(2)});
                        this.setState({company_business_contact_card_token: company_business_contact_card_token.slice(2)});
                        this.setState({company_tax_registration_certificate_token: company_tax_registration_certificate_token.slice(2)});
                        this.CompanyRegister();
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

        });

    };

    render() {
        const { goBack,navigate } = this.props.navigation;
        return (
            <FrameL back={() => {
                this._textInputBlur();
                goBack();
            }}>
                {this.state.circlevisible ?
                    <ActivityIndicator
                        animating={true}
                        style={[styles.centering, {height: 80}]}
                        size="large"/>:null}
                <MyTextInput
                    isMust={true}
                    label="联系人手机"
                    ref={(ref) => this.contactPhoneInput = ref}
                    onChangeText={(company_contact_phone) => {
                        this.setState({c8:company_contact_phone});
                        this.setState({company_contact_phone:company_contact_phone})}}/>
                <DatePicker
                  onDatePickerChange={this._onSizeChange}
                    name="企业规模"
                    storagekey="company_size"
                    describe="请选择企业规模"/>
                <DatePicker
                  onDatePickerChange={this._onNatureChange}
                    name="企业性质"
                    storagekey="company_enterprise_nature"
                    describe="请选择企业性质"/>
                <Upload2 isMust={true} name="上传营业执照" imageupload="company_business_licence"/>
                <Upload3  isMust={true} name="上传组织代码证" imageupload="company_organization_code_certificate"/>
                <Upload4 isMust={true} name="上传税务登记证" imageupload="company_tax_registration_certificate"/>
                <Upload5 isMust={true} name="上传企业联系人名片" imageupload="company_business_contact_card"/>
                <PwdInput placeholder="请设置登录密码"
                          ref={(ref) => this.passwordInput = ref}
                          onChangeText={(company_password) => {
                              this.setState({c15:company_password});
                              this.setState({company_password:company_password})}}/>
                <Points points={[false, true]} topMargin={46.5}/>
                <TouchableOpacity
                    disabled={this.state.circlevisible}
                    activeOpacity={0.6}
                    style={styles.btnNext}
                    onPress={this._CompanyImageUpload}>
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