import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'
import FrameL from './FrameL'
import MyTextInput from './MyTextInput'
import Points from './Points';
import Picker from './Picker';
import DeviceStorage from '../../utils/DeviceStorage'
import Consts from '../../config/consts'
import DatePicker from './DatePicker'

const options = [{value: "1", name: "无"}, {value: "2", name: "1个"}, {value: "3", name: "2个"}, {
    value: "4",
    name: "3个及以上"
}];

export default class CompanyReg extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            c1: '',
            c2: '',
            c3: '',
            c4: '',
            c5: '',
            c6: '',
            c7: '',
            checkCompanyEmail: true,
        };
      this._onAddressChange = this._onAddressChange.bind(this);
      this._onProductChange = this._onProductChange.bind(this);
    }

  _onAddressChange = (c2) =>{
    this.setState({c2:c2});
  };

  _onProductChange = (c3) =>{
    this.setState({c3:c3});
  };

    _textInputBlur = () => {
        this.nameInput._blur();
        //this.registionPlaceInput._blur();
        this.brandNameInput._blur();
        this.addressInput._blur();
        this.telephoneInput._blur();
        this.emailInput._blur();
    };

    CompanyCheckEmail = () => {
        const {goBack, navigate} = this.props.navigation;
        fetch(`${Consts.server.BACKSTAGE}${Consts.api.CHECKEMAIL}`, {
            method: 'POST',
            body: JSON.stringify({
                "email": this.state.c7
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.datas.data.error_code === 0) {
                    this.setState({checkCompanyEmail: true},() => {
                        if (this.state.checkCompanyEmail) {
                            let regPhone = /^[^-]+-[^-]+$/;
                            let tel = regPhone.test(this.state.c6);
                            let szReg_email = /^[^@]+@[^@]+$/;
                            let bChk_email = szReg_email.test(this.state.c7);
                            if (tel && bChk_email) {
                                navigate('CompanyReg2')
                            } else {
                                Alert.alert('温馨提醒', '固定电话或邮箱格式不正确');
                            }
                        } else {
                            Alert.alert('温馨提醒', '该邮箱已被使用');
                        }
                    });
                } else {
                    this.setState({checkCompanyEmail: false},() => {
                        if (this.state.checkCompanyEmail) {
                            let regPhone = /^[^-]+-[^-]+$/;
                            let tel = regPhone.test(this.state.c6);
                            let szReg_email = /^[^@]+@[^@]+$/;
                            let bChk_email = szReg_email.test(this.state.c7);
                            if (tel && bChk_email) {
                                navigate('CompanyReg2')
                            } else {
                                Alert.alert('温馨提醒', '固定电话或邮箱格式不正确');
                            }
                        } else {
                            Alert.alert('温馨提醒', '该邮箱已被使用');
                        }
                    });
                }
            })
            .catch((error_code) => {
                //console.log('错误了');
                console.log(error_code);
            });
    };

    DeleteStorage = () => {
        DeviceStorage.save("company_business_licence", '');
        DeviceStorage.save("company_organization_code_certificate", '');
        DeviceStorage.save("company_business_contact_card", '');
        DeviceStorage.save("company_tax_registration_certificate", '');
    };

    render() {
        const {goBack, navigate} = this.props.navigation;
        return (
            <FrameL back={() => {
                this._textInputBlur();
                goBack();
            }}>
                <MyTextInput isMust={true}
                             label="请输入公司名称"
                             ref={(ref) => this.nameInput = ref}
                             onChangeText={(company_name) => {
                                 this.setState({c1: company_name});
                                 DeviceStorage.save("company_name", company_name)
                             }}/>
                <DatePicker
                  onDatePickerChange={this._onAddressChange}
                  name="企业注册地址"
                  storagekey="company_registion_place"
                  describe="请输入注册地址"/>
                <DatePicker
                  onDatePickerChange={this._onProductChange}
                    name="自有品牌数量"
                    storagekey="company_brand_num"
                    describe="请选择品牌数量"/>
                <MyTextInput
                    isMust={true}
                    label="自有品牌名称"
                    placeholder="选其一填写"
                    ref={(ref) => this.brandNameInput = ref}
                    onChangeText={(company_brand_name) => {
                        this.setState({c4: company_brand_name});
                        DeviceStorage.save("company_brand_name", company_brand_name);
                    }}/>
                <MyTextInput
                    isMust={true}
                    label="联系地址"
                    placeholder="请填写办公地址"
                    ref={(ref) => this.addressInput = ref}
                    onChangeText={(company_address) => {
                        this.setState({c5: company_address});
                        DeviceStorage.save("company_address", company_address);
                    }}/>
                <MyTextInput
                    isMust={true}
                    label="固定电话"
                    placeholder="区号 - 电话"
                    ref={(ref) => this.telephoneInput = ref}
                    onChangeText={(company_telephone) => {
                        this.setState({c6: company_telephone});
                        DeviceStorage.save("company_telephone", company_telephone);
                    }}/>
                <MyTextInput
                    isMust={true}
                    label="电子邮箱"
                    ref={(ref) => this.emailInput = ref}
                    onChangeText={(company_email) => {
                        this.setState({c7: company_email});
                        DeviceStorage.save("company_email", company_email);
                    }}/>
                <Points points={[true, false]} topMargin={103}/>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                        this._textInputBlur();
                        if (this.state.c1.length > 0 &&
                            this.state.c2.length > 0 &&
                            this.state.c3.length > 0 &&
                            this.state.c4.length > 0 &&
                            this.state.c5.length > 0 &&
                            this.state.c6.length > 0 &&
                            this.state.c7.length > 0) {
                            this.DeleteStorage();
                            this.CompanyCheckEmail();

                        } else {
                            Alert.alert('温馨提醒', '所有“*”项皆为必填，请填写完整提交注册');
                        }
                    }}
                    style={styles.btnNext}>
                    <Text style={styles.btnInnerText}>下一步</Text>
                </TouchableOpacity>
            </FrameL>
        );
    }
}
// this.state.c1.length>0&&
// this.state.c2.length>0&&
// this.state.c3.length>0&&
// this.state.c4.length>0&&
// this.state.c5.length>0&&
// this.state.c6.length>0&&
// this.state.c7.length>0

const styles = StyleSheet.create({
    btnNext: {
        marginTop: 13,
        width: "90%",
        height: 45,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#d1a850',
        borderWidth: 1,
    },
    btnInnerText: {
        fontSize: 18,
        color: '#d1a850'
    },
});