import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    Platform,
} from 'react-native'
import FrameL from './FrameL'
import MyTextInput from './MyTextInput'
import Points from './Points';
import Upload from './Upload'
import PwdInput from "./PwdInput";
import Picker from './Picker'
import DeviceStorage from '../../utils/DeviceStorage'
import DatePicker from './DatePicker'

export default class BrandDesignerReg3 extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            b17: '',
            b18: '',
            b19: '',
            b20: '',
            b21: '',
            b22: '',
            b23: '',
        };
      this._onDesignTypeChange = this._onDesignTypeChange.bind(this);
      this._onCompanyTimeChange = this._onCompanyTimeChange.bind(this);
      this._onProductCountChange = this._onProductCountChange.bind(this);
    }

  _onDesignTypeChange = (b18) =>{
    this.setState({b18:b18});
  };

  _onCompanyTimeChange = (b21) =>{
    this.setState({b21:b21});
  };

  _onProductCountChange = (b23) =>{
    this.setState({b23:b23});
  };

    _textInputBlur = () => {
        this.experienceInput.blur();
        this.designStyleInput._blur();
        this.brandNameInput._blur();
        this.regitrationPlaceInput._blur();
    }

    render() {
        const {goBack, navigate} = this.props.navigation;
        return (
            <FrameL title="自有品牌设计师"
                    back={() => {
                        this._textInputBlur();
                        goBack();
                    }}
            >
                <View style={styles.itemContainer}>
                    <Image source={require('../../assets/designer/star.png')}
                           style={Platform.OS=='android' ? styles.starAndroid:styles.starIOS}/>
                    <Text style={styles.text}>其他教育经历</Text>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        multiline={true}
                        maxLength={60}
                        ref={(ref) => {
                            this.experienceInput = ref
                        }}
                        onChangeText={(brand_experience) => {
                            this.setState({b17: brand_experience});
                            DeviceStorage.save("brand_experience", brand_experience)
                        }}/>
                </View>
                <DatePicker
                  onDatePickerChange={this._onDesignTypeChange}
                    name="设计类别"
                    storagekey="brand_design_type"
                    describe="请选择设计类别"/>
                <MyTextInput
                    isMust={true}
                    label="设计风格"
                    placeholder="请填写2-3个关键词"
                    ref={(ref) => {
                        this.designStyleInput = ref
                    }}
                    onChangeText={(brand_design_style) => {
                        this.setState({b19: brand_design_style});
                        DeviceStorage.save("brand_design_style", brand_design_style)
                    }}/>
                <MyTextInput
                    isMust={true}
                    label="品牌名称"
                    ref={(ref) => {
                        this.brandNameInput = ref
                    }}
                    onChangeText={(brand_brand_name) => {
                        this.setState({b20: brand_brand_name});
                        DeviceStorage.save("brand_brand_name", brand_brand_name)
                    }}/>

                <DatePicker
                  onDatePickerChange={this._onCompanyTimeChange}
                    name="品牌/公司成立时间"
                    storagekey="brand_regitration_time"
                    describe="请选择成立时间"/>
                <MyTextInput
                    isMust={true}
                    label="品牌/公司注册地"
                    ref={(ref) => {
                        this.regitrationPlaceInput = ref
                    }}
                    onChangeText={(brand_regitration_place) => {
                        this.setState({b22: brand_regitration_place});
                        DeviceStorage.save("brand_regitration_place", brand_regitration_place)
                    }}/>
                <DatePicker
                  onDatePickerChange={this._onProductCountChange}
                    name="每年产出设计系列量"
                    storagekey="brand_production"
                    describe="请选择设计量"/>
                <Points points={[false, false, true, false]} topMargin={46.5}/>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                        this._textInputBlur();
                        let getTokenPromise = Promise.all([DeviceStorage.get("brand_regitration_time")]);
                        getTokenPromise.then(([brand_regitration_time]) => {
                        if (this.state.b17.length > 0 &&
                            this.state.b18.length > 0 &&
                            this.state.b19.length > 0 &&
                            this.state.b20.length > 0 &&
                            this.state.b21.length > 0 &&
                            this.state.b22.length > 0 &&
                            this.state.b23.length > 0 &&
                            brand_regitration_time !== null &&
                            brand_regitration_time !== '') {
                            navigate('BrandDesignerReg4')
                        } else {
                            Alert.alert('温馨提醒', '所有“*”项皆为必填，请填写完整提交注册');
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
    itemContainer: {
        width: "90%",
    },
    text: {
        fontSize: 16,
        color: '#d5d5d5',
        alignSelf: 'flex-start',
        marginTop: 30,
        marginBottom: 7,
        backgroundColor: "transparent"
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
        borderColor: '#d1a850',
        borderWidth: 1,
        backgroundColor: 'transparent'
    },
    btnInnerText: {
        fontSize: 18,
        color: '#d1a850'
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
});