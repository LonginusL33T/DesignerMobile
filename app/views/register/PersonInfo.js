import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native'
import FrameL from './FrameL'
import MyTextInput from './MyTextInput'
import Points from './Points';
import Picker from './Picker'
import DeviceStorage from '../../utils/DeviceStorage'
import DatePicker from './DatePicker'
import Consts from '../../config/consts'

//用于进行复用
export default class PersonInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full1: '',
            full2: '',
            full3: '',
            full4: '',
            full5: '',
            full6: '',
            full7: '',
            full8: '',
            checkEmail: true
        };
      this._onBirthChange = this._onBirthChange.bind(this);
      this._onCountChange = this._onCountChange.bind(this);
    }

  _onBirthChange = (full3) =>{
    this.setState({full3:full3});
  };

  _onCountChange = (full5) =>{
    this.setState({full5:full5});
  };

    _textInputBlur = () => {
        this.nameInput._blur();
        this.firstNameInput._blur();
        this.birthPlaceInput._blur();
        this.addressInput._blur();
        this.telephoneInput._blur();
        this.emailInput._blur();
    }

    CheckEmail = () => {
        const {navigate} = this.props.navigation;
        //检查邮件是否正确
        console.log(JSON.stringify({
            "email": this.state.full8
        }));
        fetch(`${Consts.server.BACKSTAGE}${Consts.api.CHECKEMAIL}`, {
            method: 'POST',
            body: JSON.stringify({
                "email": this.state.full8
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.datas.data.error_code === 0) {
                    this.setState({checkEmail:true},()=>{

                        if (this.state.checkEmail) {

                            let bChk_mobilphone = (/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(this.state.full7));
                            let szReg_email = /^[^@]+@[^@]+$/;
                            let bChk_email = szReg_email.test(this.state.full8);
                            if (bChk_email && bChk_mobilphone) {
                                navigate(this.props.to

                                )
                            } else {
                                Alert.alert('温馨提醒','手机号或邮箱格式不正确');
                            }
                        }else{
                            Alert.alert('温馨提醒','该邮箱已被使用');
                        }
                    });
                } else {
                    this.setState({checkEmail:false},()=>{

                        if (this.state.checkEmail) {

                            let bChk_mobilphone = (/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(this.state.full7));
                            let szReg_email = /^[^@]+@[^@]+$/;
                            let bChk_email = szReg_email.test(this.state.full8);
                            if (bChk_email && bChk_mobilphone) {
                                navigate(this.props.to

                                )
                            } else {
                                Alert.alert('温馨提醒','手机号或邮箱格式不正确');
                            }
                        }else{
                            Alert.alert('温馨提醒','该邮箱已被使用');
                        }
                    });
                }
            })
            .catch((error_code) => {
                console.log('错误了');
                console.log(error_code);
            })
    };

    DeleteStorage = () => {
        DeviceStorage.save("free_resume", '');
        DeviceStorage.save("free_works", '');
        DeviceStorage.save("brand_works", '');
        DeviceStorage.save("fresh_works", '');
        DeviceStorage.save("brand_resume", '');
        DeviceStorage.save("fresh_resume", '');
    };


    render() {
        const {navigate, goBack} = this.props.navigation;
        return (
            <FrameL title={this.props.title}
                    back={() => {
                        this._textInputBlur();
                        goBack();
                    }}>

                <MyTextInput label="名字"
                             isMust={true}
                             ref={(ref) => this.nameInput = ref}
                             onChangeText={(free_name) => {
                                 this.setState({full1: free_name});
                                 DeviceStorage.save("free_name", free_name);
                             }
                             }/>
                <MyTextInput label="姓氏"
                             isMust={true}
                             ref={(ref) => this.firstNameInput = ref}
                             onChangeText={(free_first_name) => {
                                 this.setState({full2: free_first_name});
                                 DeviceStorage.save("free_first_name", free_first_name);
                             }
                             }/>

                <DatePicker
                  onDatePickerChange={this._onBirthChange}
                    name="出生日期"
                    storagekey="free_birth_time"
                    describe="请选择日期"/>
                <MyTextInput
                    isMust={true}
                    label="出生地"
                    placeholder="国家-城市"
                    ref={(ref) => this.birthPlaceInput = ref}
                    onChangeText={(free_birth_place) => {
                        this.setState({full4: free_birth_place});
                        DeviceStorage.save("free_birth_place", free_birth_place);
                    }
                    }/>
                <DatePicker
                  onDatePickerChange={this._onCountChange}
                    name="国籍"
                    storagekey="free_country"
                    describe="请选择国籍"/>
                <MyTextInput
                    isMust={true}
                    label="住址"
                    placeholder="城市-街道-小区"
                    ref={(ref) => this.addressInput = ref}
                    onChangeText={(free_address) => {
                        this.setState({full6: free_address});
                        DeviceStorage.save("free_address", free_address);
                    }}/>
                <MyTextInput
                    isMust={true}
                    label="联系电话"
                    placeholder="手机号码"
                    ref={(ref) => this.telephoneInput = ref}
                    onChangeText={(free_telephone) => {
                        this.setState({full7: free_telephone});
                        DeviceStorage.save("free_telephone", free_telephone);
                    }}/>
                <MyTextInput
                    isMust={true}
                    label="邮箱"
                    ref={(ref) => this.emailInput = ref}
                    onChangeText={(free_email) => {
                        this.setState({full8: free_email});
                        DeviceStorage.save("free_email", free_email);
                    }}/>
                <Points points={this.props.points} topMargin={46.5}/>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                        this._textInputBlur();
                        let getTokenPromise = Promise.all([DeviceStorage.get("free_birth_time")]);
                        getTokenPromise.then(([free_birth_time]) => {
                        if (this.state.full1.length > 0 &&
                            this.state.full2.length > 0 &&
                            this.state.full3.length > 0 &&
                            this.state.full4.length > 0 &&
                            this.state.full5.length > 0 &&
                            this.state.full6.length > 0 &&
                            this.state.full7.length > 0 &&
                            this.state.full8.length > 0 &&
                            free_birth_time !== null &&
                            free_birth_time !== '') {
                            this.DeleteStorage();
                            this.CheckEmail();
                        } else {
                            Alert.alert('温馨提醒', '所有“*”项皆为必填，请填写完整提交注册')
                        }
                        });
                    }}
                    style={styles.btnNext}>
                    <Text style={styles.btnInnerText}>下一步</Text>
                </TouchableOpacity>
            </FrameL>
        );
    }
}

const styles = StyleSheet.create({
    btnNext: {
        marginTop: 13,
        width: "90%",
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#d1a850',
        borderWidth: 1,
        backgroundColor: "transparent"
    },
    btnInnerText: {
        fontSize: 18,
        color: '#d1a850'
    },
});