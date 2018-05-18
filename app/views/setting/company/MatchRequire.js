import React, {Component} from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    Alert,
    StatusBar,
    ActivityIndicator,
    Dimensions,
    Platform,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Select from '../component/Select'
import DeviceStorage from "../../../utils/DeviceStorage";
import Consts from "../../../config/consts";
import MoneyPicker from "./MoneyPicker"
import {createRecruit} from "../../../services/createRecruit";

const images = {
    back: require("../../../assets/designer/left.png"),
}

const options = {
    types: ['成衣', '珠宝', '家居', '配饰', '形象', '箱包', '其它'],
    educations: ['大专', '本科', '硕士', '博士'],
    experiences: ['应届毕业生', '1-2年', '3-5年', '6-10年', '11-20年', '20年以上']
}

class MatchRequire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            address: '',
            education: '',
            experience: '',
            positionDetail: '',
            skill: '',
            salary: '',
            focus: '',
            money:'',
        };
        this._onMoneyChange = this._onMoneyChange.bind(this);
        this._onRequireChange = this._onRequireChange.bind(this);
        this._onLevelChange = this._onLevelChange.bind(this);
        this._onExperienceChange = this._onExperienceChange.bind(this);
    }

    static navigationOptions = ({navigation: {goBack, state}}) => ({
        title: '招聘需求',
        headerLeft: (<View>
            <TouchableOpacity
                style={styles.navBarLeft}
                onPress={() => goBack()}>
                <Image source={images.back}/>
            </TouchableOpacity>
        </View>),
        headerRight: (
            <View></View>
        ),
        headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 17,
        }
    });

    /**
     * 薪酬发生变化时调用
     */
    _onMoneyChange = (money) =>{
        this.setState({money:money});
    };

    _onRequireChange = (require) =>{
        this.setState({
            type: require
        });
    };

    _onLevelChange = (level) =>{
        this.setState({
            education: level
        });
    };

    _onExperienceChange = (exp) =>{
        this.setState({
            experience: exp
        });
    };

    /*
    * 成功发布的回调
    * */
    _callback = () => {
        const {goBack} = this.props.navigation;
        goBack();
    }

    /*
    * 发布招聘需求
    * */
    _createRecruit = () => {
        if (this.state.type.length > 0 && this.state.address.length > 0 &&
            this.state.education.length > 0 && this.state.experience.length > 0 &&
            this.state.positionDetail.length > 0 && this.state.skill.length > 0 &&
            this.state.salary.length > 0 && this.state.money.length > 0) {
            DeviceStorage.get(Consts.localStorage.X_TOKEN).then((val) => {
                createRecruit(this.state.type, this.state.address, this.state.education, this.state.experience,
                    this.state.money, this.state.positionDetail, this.state.skill, this.state.salary, val, this._callback);
            })
        }
        else {
            Alert.alert('温馨提醒', '请填写完整再发布');
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always">
                <View style={{flex: 1, alignItems: 'center'}}>
                    <StatusBar translucent={false}
                               backgroundColor='#000'/>
                    <MoneyPicker
                        onMoneyChange={this._onRequireChange}
                        name="招聘类别"
                        storagekey="free_birth_time"/>
                    <View style={{width: '100%'}}>
                        <View style={styles.itemContainer}>
                            <TextInput
                                style={styles.textInput}
                                maxLength={20}
                                onChangeText={(address) => {
                                    this.setState({
                                        address: address
                                    })
                                }}
                                placeholder='省-市-区-街道(少于20字)'
                                placeholderTextColor="#ccc"
                                underlineColorAndroid="transparent"/>
                        </View>
                        <Text style={styles.label}>工作地址</Text>
                    </View>
                    <MoneyPicker
                        onMoneyChange={this._onLevelChange}
                        name="学历要求"
                        storagekey="free_birth_time"/>
                    <MoneyPicker
                        onMoneyChange={this._onExperienceChange}
                        name="工作经验"
                        storagekey="free_birth_time"/>
                    <MoneyPicker
                        onMoneyChange={this._onMoneyChange}
                        name="薪酬范围"
                        storagekey="free_birth_time"/>
                    <View style={{width: '100%'}}>
                        <Text style={styles.titleText}>职位详情</Text>
                        <TextInput style={[styles.multilineTextInput, {height: 95},
                            this.state.positionDetail.length > 0 || this.state.focus === '1' ? styles.textInputAlign1 : styles.textInputAlign2]}
                                   multiline={true}
                                   maxLength={200}
                                   blurOnSubmit={false}
                                   value={this.state.positionDetail}
                                   placeholder={this.state.focus === '1' ? '' : '请添加少于200字的详情介绍'}
                                   placeholderTextColor="#ccc"
                                   underlineColorAndroid="transparent"
                                   onFocus={() => {
                                       this.setState({
                                           focus: '1',
                                       })
                                   }}
                                   onChangeText={(positionDetail) => {
                                       this.setState({
                                           positionDetail: positionDetail
                                       })
                                   }}/>
                    </View>
                    <View style={{width: '100%'}}>
                        <Text style={styles.titleText}>技能要求</Text>
                        <TextInput style={[styles.multilineTextInput, {height: 52.5},
                            this.state.skill.length > 0 || this.state.focus === '2' ? styles.textInputAlign1 : styles.textInputAlign2]}
                                   multiline={true}
                                   maxLength={40}
                                   blurOnSubmit={false}
                                   value={this.state.skill}
                                   placeholder={this.state.focus === '2' ? '' : '请添加少于40字的要求'}
                                   placeholderTextColor="#ccc"
                                   underlineColorAndroid="transparent"
                                   onFocus={() => {
                                       this.setState({
                                           focus: '2',
                                       })
                                   }}
                                   onChangeText={(skill) => {
                                       this.setState({
                                           skill: skill
                                       })
                                   }}/>
                    </View>
                    <View style={{width: '100%'}}>
                        <Text style={styles.titleText}>薪酬福利</Text>
                        <TextInput style={[styles.multilineTextInput, {height: 60, marginBottom: 54},
                            this.state.salary.length > 0 || this.state.focus === '3' ? styles.textInputAlign1 : styles.textInputAlign2]}
                                   multiline={true}
                                   maxLength={40}
                                   blurOnSubmit={false}
                                   value={this.state.salary}
                                   placeholder={this.state.focus === '3' ? '' : '请添加少于40字的福利介绍'}
                                   placeholderTextColor="#ccc"
                                   underlineColorAndroid="transparent"
                                   onFocus={() => {
                                       this.setState({
                                           focus: '3',
                                       })
                                   }}
                                   onChangeText={(salary) => {
                                       this.setState({
                                           salary: salary
                                       })
                                   }}/>
                    </View>
                    <TouchableOpacity
                        style={styles.btnSend}
                        activeOpacity={0.8}
                        onPress={this._createRecruit}>
                        <Image source={require('../../../assets/designer/icon_send.png')}/>
                        <Text style={styles.textSend}>发布</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    navBarLeft: {
        paddingVertical: 5,
        paddingLeft: 15,
        paddingRight: 30,
    },
    itemContainer: {
        width: '90%',
        height: 54,
        borderBottomWidth: 1,
        borderColor: "#e9e9e9",
        alignSelf: 'center',
    },
    textInput: {
        width: "100%",
        fontSize: 14,
        padding: 0,
        paddingRight: 8,
        paddingLeft: 100,
        marginTop: 22,
        color: '#c6871b',
        textAlign: 'right',
    },
    label: {
        fontSize: 14,
        color: '#3c3c3c',
        position: 'absolute',
        left: Dimensions.get('window').width * 0.05 + 8,
        top: 27,
        backgroundColor: "transparent"
    },
    titleText: {
        fontSize: 14,
        color: '#3c3c3c',
        backgroundColor: "transparent",
        marginLeft: Dimensions.get('window').width * 0.05 + 8,
        marginTop: 21,
        marginBottom: 7.5,
    },
    multilineTextInput: {
        width: Dimensions.get('window').width * 0.9 - 16,
        borderWidth: 1,
        borderColor: '#d2d2d2',
        borderRadius: 5,
        alignSelf: 'center',
        padding: 4,
        fontSize: 12,
    },
    textInputAlign1: {
        textAlignVertical: 'top',
    },
    textInputAlign2: {
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    btnSend: {
        flexDirection: 'row',
        width: 135,
        height: 40,
        backgroundColor: '#d6982e',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 7,
        left: Dimensions.get('window').width / 2,
        marginLeft: -67.5,
        zIndex: Platform.OS === 'android' ? 0 : 1,
        shadowColor: 'rgb(60, 65, 93)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.7,
        shadowRadius: 2,
    },
    textSend: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 10,
    }
});

export default MatchRequire;