import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    PermissionsAndroid,
    Alert
} from 'react-native'
import Picker from 'react-native-picker';
import DeviceStorage from '../../../utils/DeviceStorage'
const platform = require("Platform");

export default class DatePicker extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            time: '薪资',
            discussText:styles.discussText,
            moneyText:styles.moneyText,
            discussBtn:styles.discussBtn,
            moneyBtn:styles.moneyBtn,
            require: '',
        };
        this._onDiscussBtn = this._onDiscussBtn.bind(this);
    }
    _onDiscussBtn = () => {
        this.setState({
            moneyText:styles.moneyText,
            discussText:styles.discussTextElect,
            discussBtn:styles.discussBtnElect,
            moneyBtn:styles.moneyBtn,
        });
        this.props.onMoneyChange('面议');
    };
    _createDateData = () => {
        if (this.props.name === '薪酬范围') {
        let date = [];
        for (let i = 1; i < 49; i++) {
            let month = [];
            for (let j = 1; j < 2; j++) {
                let day = [];
                for (let k = i + 1; k < 50; k++) {
                    day.push(k + 'K');
                }
                let _month = {};
                _month['至'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i + 'K'] = month;
            date.push(_date);
        }
        return date;
    } else if (this.props.name === '招聘类别'){
            let require = ['成衣', '珠宝', '家居', '配饰', '形象', '箱包', '其它'];
            return require;
        } else if (this.props.name === '学历要求'){
            let level = ['大专', '本科', '硕士', '博士'];
            return level;
        } else if (this.props.name === '工作经验'){
            let exp = ['应届毕业生', '1-2年', '3-5年', '6-10年', '11-20年', '20年以上'];
            return exp;
        }
    };

    _showDatePicker = () => {
        Picker.init({
            pickerData: this._createDateData(),
            pickerConfirmBtnText: "确认",
            pickerCancelBtnText: "取消",
            pickerTitleText: "请选择日期",
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [100, 68, 1, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                if (this.props.name === '薪酬范围') {
                let time = pickedValue;
                this.setState({
                    time: time,
                    moneyText: styles.moneyTextElect,
                    discussText: styles.discussText,
                    discussBtn: styles.discussBtn,
                    moneyBtn: styles.moneyBtnElect
                });
                let money1 = pickedValue[0] + '-'+ pickedValue[2];
                this.props.onMoneyChange(money1);
                //DeviceStorage.save(this.props.storagekey, time);
            } else {
                    this.setState({require:pickedValue});
                    this.props.onMoneyChange(pickedValue[0]);
                }
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                //console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                //console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    };

    render() {
        if (this.props.name === '薪酬范围') {
        return (
            <View style={{width: "90%"}}>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>
                        {this.props.name}
                    </Text>
                    <TouchableOpacity
                        onPress={this._onDiscussBtn}
                        style={this.state.discussBtn}
                    >
                        <Text style={this.state.discussText}>面议</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.moneyBtn}
                        {...this.props}
                        onPress={this._showDatePicker.bind(this)}
                    >
                        <Text style={this.state.moneyText}>{this.state.time}</Text>
                    </TouchableOpacity>
                    <Image source={require('../../../assets/designer/icon_right2.png')} style={styles.iconRight}/>
                </View>
            </View>
        );
    } else {
            return (
                <View style={{width: "90%"}}>
                    <TouchableOpacity
                       onPress={this._showDatePicker.bind(this)}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>
                            {this.props.name}
                        </Text>
                            <Text style={styles.OtherText}>{this.state.require}</Text>
                        <Image source={require('../../../assets/designer/icon_right2.png')} style={styles.iconRight}/>
                    </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    discussText: {
        color:'#ccc',
    },
    discussTextElect: {
        color:'#c6871b',
    },
    moneyText: {
        color:'#ccc',
    },
    moneyTextElect: {
        color:'#c6871b',
    },
    discussBtn: {
        paddingRight:10,
        paddingLeft:10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#ccc',
        bottom:7,
        left:150,
        position: "absolute",
    },
    discussBtnElect: {
        paddingRight:10,
        paddingLeft:10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#c6871b',
        bottom:7,
        left:150,
        position: "absolute",
    },
    moneyBtn: {
        paddingRight:10,
        paddingLeft:10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#ccc',
        bottom:7,
        left:210,
        position: "absolute",
    },
    moneyBtnElect: {
        paddingRight:10,
        paddingLeft:10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#c6871b',
        bottom:7,
        left:210,
        position: "absolute",
    },
    itemContainer: {
        alignItems: 'center',
        width: "100%",
        height: 54,
        borderBottomWidth: 1,
        borderBottomColor: "#e9e9e9",
        flexDirection: 'row'
    },
    text: {
        fontSize: 14,
        color: '#3c3c3c',
        paddingLeft:8,
        backgroundColor:"transparent",
        position:"absolute",
        top: 27,
    },
    iconRight: {
        position: "absolute",
        right: 8,
        top: 27,
    },
    birthTime: {
        fontSize: 14,
        textAlign: 'right',
        color: '#c6871b',
        alignSelf: 'flex-end',
        position: "absolute",
        bottom: 11,
        right: 28,
        backgroundColor: 'transparent'
    },
    star: {
        width: 20,
        height: 20,
        position: 'absolute'
    },
    starIOS: {
        width: 10,
        height: 10,
        justifyContent: "center"
    },
    starAndroid: {
        width: 20,
        height: 20,
        justifyContent: "center"
    },
    OtherText: {
        fontSize: 14,
        textAlign: 'right',
        color: '#c6871b',
        alignSelf: 'flex-end',
        position: "absolute",
        top: 27,
        right: 28,
        backgroundColor: 'transparent'
    }

});