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
import DeviceStorage from '../../utils/DeviceStorage'
const platform = require("Platform");

export default class DatePicker extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            time: '',
            country: '',
            designtype: '',
            amount: '',
            size: '',
            nature: '',
            registerplace: '',
        };
    }
    _createDateData = () => {
        if (this.props.name === '出生日期' || this.props.name === '品牌/公司成立时间') {
            let date = [];
            for (let i = 1971; i < 2037; i++) {
                let month = [];
                for (let j = 1; j < 13; j++) {
                    let day = [];
                    if (j === 2) {
                        for (let k = 1; k < 29; k++) {
                            day.push(k + '日');
                        }
                        if (i % 4 === 0) {
                            day.push(29 + '日');
                        }
                    }
                    else if (j in {1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1}) {
                        for (let k = 1; k < 32; k++) {
                            day.push(k + '日');
                        }
                    }
                    else {
                        for (let k = 1; k < 31; k++) {
                            day.push(k + '日');
                        }
                    }
                    let _month = {};
                    _month[j + '月'] = day;
                    month.push(_month);
                }
                let _date = {};
                _date[i + '年'] = month;
                date.push(_date);
            }
            return date;
        } else if (this.props.name === '国籍' || this.props.name === '企业注册地址') {
            let country = ['中国', '美国', '日本', '英国', '法国', '德国', '意大利', '新加坡', '韩国', '阿根廷', '澳大利亚', '新西兰', '其他'];
            return country;
        } else if (this.props.name === '设计类别') {
            let type = ['成衣', '珠宝', '家居', '配饰', '形象', '箱包', '其他'];
            return type;
        } else if (this.props.name === '每年产出设计系列量' || this.props.name === '自有品牌数量') {
            let amount = ['无', '1个', '2个', '3个及以上'];
            return amount;
        } else if (this.props.name === '企业规模') {
            let size = ['创业公司', '小微型', '中型', '大型', '超大型'];
            return size;
        } else if (this.props.name === '企业性质') {
            let nature = ['外资', '合资', '国企', '民企', '政府机关', '事业单位', '上市公司', '创业公司', '非营利机构'];
            return nature;
        }
    }
    ;

    _showDatePicker = () => {
        Picker.init({
            pickerData: this._createDateData(),
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: this.props.describe,
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [100, 68, 1, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                if (this.props.storagekey === 'free_birth_time' || this.props.storagekey === 'brand_regitration_time'){
                let year = pickedValue[0].substring(0, 4);
                let month = pickedValue[1];
                let day = pickedValue[2];
                if (month.length === 2) {
                    month = '0' + month.substring(0, 1);
                } else {
                    month = month.substring(0, 2);
                }
                if (day.length === 2) {
                    day = '0' + day.substring(0, 1);
                } else {
                    day = day.substring(0, 2);
                }
                let time = year + '/' + month + '/' + day;
                this.setState({time: time});
                this.props.onDatePickerChange(time);
                DeviceStorage.save(this.props.storagekey, time);

                } else if (this.props.storagekey === 'free_country') {
                    this.setState({country: pickedValue});
                    this.props.onDatePickerChange(pickedValue[0]);
                    switch (pickedValue[0]) {
                        case '中国':
                            DeviceStorage.save("free_country", '中国');
                            DeviceStorage.save("free_country_code", 'CN');
                            break;
                        case '美国':
                            DeviceStorage.save("free_country", '美国');
                            DeviceStorage.save("free_country_code", 'US');
                            break;
                        case '日本':
                            DeviceStorage.save("free_country", '日本');
                            DeviceStorage.save("free_country_code", 'JP');
                            break;
                        case '英国':
                            DeviceStorage.save("free_country", '英国');
                            DeviceStorage.save("free_country_code", 'UK');
                            break;
                        case '法国':
                            DeviceStorage.save("free_country", '法国');
                            DeviceStorage.save("free_country_code", 'FR');
                            break;
                        case '德国':
                            DeviceStorage.save("free_country", '德国');
                            DeviceStorage.save("free_country_code", 'DE');
                            break;
                        case '意大利':
                            DeviceStorage.save("free_country", '意大利');
                            DeviceStorage.save("free_country_code", 'IT');
                            break;
                        case '新加坡':
                            DeviceStorage.save("free_country", '新加坡');
                            DeviceStorage.save("free_country_code", 'SG');
                            break;
                        case '韩国':
                            DeviceStorage.save("free_country", '韩国');
                            DeviceStorage.save("free_country_code", 'KR');
                            break;
                        case '阿根廷':
                            DeviceStorage.save("free_country", '阿根廷');
                            DeviceStorage.save("free_country_code", 'AR');
                            break;
                        case '澳大利亚':
                            DeviceStorage.save("free_country", '澳大利亚');
                            DeviceStorage.save("free_country_code", 'AU');
                            break;
                        case '新西兰':
                            DeviceStorage.save("free_country", '新西兰');
                            DeviceStorage.save("free_country_code", 'NZ');
                            break;
                        case '其他':
                            DeviceStorage.save("free_country", '其他');
                            DeviceStorage.save("free_country_code", 'OTHER');
                            break;
                        default:
                            break;

                    }
                } else if (this.props.storagekey === 'free_design_type'){
                    this.setState({designtype: pickedValue});
                  this.props.onDatePickerChange(pickedValue[0]);
                    switch (pickedValue[0])
                    {
                        case '成衣':
                            DeviceStorage.save("free_design_type", '成衣');
                            break;
                        case '珠宝':
                            DeviceStorage.save("free_design_type", '珠宝');
                            break;
                        case '家居':
                            DeviceStorage.save("free_design_type", '家居');
                            break;
                        case '配饰':
                            DeviceStorage.save("free_design_type", '配饰');
                            break;
                        case '形象':
                            DeviceStorage.save("free_design_type", '形象');
                            break;
                        case '箱包':
                            DeviceStorage.save("free_design_type", '箱包');
                            break;
                        case '其他':
                            DeviceStorage.save("free_design_type", '其他');
                            break;
                        default:
                            break;
                    }
                } else if (this.props.storagekey === 'brand_design_type'){
                    this.setState({designtype: pickedValue});
                  this.props.onDatePickerChange(pickedValue[0]);
                    switch (pickedValue[0])
                    {
                        case '成衣':
                            DeviceStorage.save("brand_design_type", '成衣');
                            break;
                        case '珠宝':
                            DeviceStorage.save("brand_design_type", '珠宝');
                            break;
                        case '家居':
                            DeviceStorage.save("brand_design_type", '家居');
                            break;
                        case '配饰':
                            DeviceStorage.save("brand_design_type", '配饰');
                            break;
                        case '形象':
                            DeviceStorage.save("brand_design_type", '形象');
                            break;
                        case '箱包':
                            DeviceStorage.save("brand_design_type", '箱包');
                            break;
                        case '其他':
                            DeviceStorage.save("brand_design_type", '其他');
                            break;
                        default:
                            break;
                    }
                } else if (this.props.storagekey === 'brand_production'){
                    this.setState({amount: pickedValue});
                    this.props.onDatePickerChange(pickedValue);
                    DeviceStorage.save("brand_production", parseInt(pickedIndex));
                } else if (this.props.storagekey === 'fresh_design_type'){
                    this.setState({designtype: pickedValue});
                  this.props.onDatePickerChange(pickedValue[0]);
                    switch (pickedValue[0])
                    {
                        case '成衣':
                            DeviceStorage.save("fresh_design_type", '成衣');
                            break;
                        case '珠宝':
                            DeviceStorage.save("fresh_design_type", '珠宝');
                            break;
                        case '家居':
                            DeviceStorage.save("fresh_design_type", '家居');
                            break;
                        case '配饰':
                            DeviceStorage.save("fresh_design_type", '配饰');
                            break;
                        case '形象':
                            DeviceStorage.save("fresh_design_type", '形象');
                            break;
                        case '箱包':
                            DeviceStorage.save("fresh_design_type", '箱包');
                            break;
                        case '其他':
                            DeviceStorage.save("fresh_design_type", '其他');
                            break;
                        default:
                            break;
                    }
                } else if (this.props.storagekey === 'company_brand_num'){
                    this.setState({amount: pickedValue});
                  this.props.onDatePickerChange(pickedValue);
                    DeviceStorage.save("company_brand_num", parseInt(pickedIndex));
                } else if (this.props.storagekey === 'company_size'){
                    this.setState({size: pickedValue});
                  this.props.onDatePickerChange(pickedValue[0]);
                    switch(pickedValue[0])
                    {
                        case '创业公司':
                            DeviceStorage.save("company_size", '创业公司');
                            break;
                        case '小微型':
                            DeviceStorage.save("company_size", '小微型');
                            break;
                        case '中型':
                            DeviceStorage.save("company_size",'中型');
                            break;
                        case '大型':
                            DeviceStorage.save("company_size",'大型');
                            break;
                        case '超大型':
                            DeviceStorage.save("company_size",'超大型');
                            break;
                        default:
                            break;
                    }
                } else if (this.props.storagekey === 'company_enterprise_nature'){
                    this.setState({nature: pickedValue});
                  this.props.onDatePickerChange(pickedValue[0]);
                    switch(pickedValue[0])
                    {
                        case '外资':
                            DeviceStorage.save("company_enterprise_nature",'外资');
                            break;
                        case '合资':
                            DeviceStorage.save("company_enterprise_nature",'合资');
                            break;
                        case '国企':
                            DeviceStorage.save("company_enterprise_nature",'国企');
                            break;
                        case '民企':
                            DeviceStorage.save("company_enterprise_nature",'民企');
                            break;
                        case '政府机关':
                            DeviceStorage.save("company_enterprise_nature",'政府机关');
                            break;
                        case '事业单位':
                            DeviceStorage.save("company_enterprise_nature",'事业单位');
                            break;
                        case '上市公司':
                            DeviceStorage.save("company_enterprise_nature",'上市公司');
                            break;
                        case '创业公司':
                            DeviceStorage.save("company_enterprise_nature",'创业公司');
                            break;
                        case '非盈利机构':
                            DeviceStorage.save("company_enterprise_nature",'非盈利机构');
                            break;
                        default:
                            break;
                    }
                } else if (this.props.storagekey === 'company_registion_place') {
                  this.setState({registerplace: pickedValue});
                  this.props.onDatePickerChange(pickedValue[0]);
                  switch (pickedValue[0]) {
                    case '中国':
                      DeviceStorage.save("company_registion_place", '中国');
                      DeviceStorage.save("company_registion_place_code", 'CN');
                      break;
                    case '美国':
                      DeviceStorage.save("company_registion_place", '美国');
                      DeviceStorage.save("company_registion_place_code", 'US');
                      break;
                    case '日本':
                      DeviceStorage.save("company_registion_place", '日本');
                      DeviceStorage.save("company_registion_place_code", 'JP');
                      break;
                    case '英国':
                      DeviceStorage.save("company_registion_place", '英国');
                      DeviceStorage.save("company_registion_place_code", 'UK');
                      break;
                    case '法国':
                      DeviceStorage.save("company_registion_place", '法国');
                      DeviceStorage.save("company_registion_place_code", 'FR');
                      break;
                    case '德国':
                      DeviceStorage.save("company_registion_place", '德国');
                      DeviceStorage.save("company_registion_place_code", 'DE');
                      break;
                    case '意大利':
                      DeviceStorage.save("company_registion_place", '意大利');
                      DeviceStorage.save("company_registion_place_code", 'IT');
                      break;
                    case '新加坡':
                      DeviceStorage.save("company_registion_place", '新加坡');
                      DeviceStorage.save("company_registion_place_code", 'SG');
                      break;
                    case '韩国':
                      DeviceStorage.save("company_registion_place", '韩国');
                      DeviceStorage.save("company_registion_place_code", 'KR');
                      break;
                    case '阿根廷':
                      DeviceStorage.save("company_registion_place", '阿根廷');
                      DeviceStorage.save("company_registion_place_code", 'AR');
                      break;
                    case '澳大利亚':
                      DeviceStorage.save("company_registion_place", '澳大利亚');
                      DeviceStorage.save("company_registion_place_code", 'AU');
                      break;
                    case '新西兰':
                      DeviceStorage.save("company_registion_place", '新西兰');
                      DeviceStorage.save("company_registion_place_code", 'NZ');
                      break;
                    case '其他':
                      DeviceStorage.save("company_registion_place", '其他');
                      DeviceStorage.save("company_registion_place_code", 'OTHER');
                      break;
                    default:
                      break;

                  }
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
        if(this.props.name === '出生日期' || this.props.name === '品牌/公司成立时间'){
        return (
            <View style={{width:"90%"}}>
                <Image source={require('../../assets/designer/star.png')}
                       style={platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/>
                <TouchableOpacity
                    {...this.props}
                    onPress={this._showDatePicker.bind(this)}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>{this.props.name}</Text>
                        <Text style={styles.birthTime}>{this.state.time}</Text>
                        <Image source={require('../../assets/designer/icon_right.png')} style={styles.iconRight}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
        } else if (this.props.name === '国籍'){
            return (
                <View style={{width:"90%"}}>
                    <Image source={require('../../assets/designer/star.png')}
                           style={platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/>
                    <TouchableOpacity
                        {...this.props}
                        onPress={this._showDatePicker.bind(this)}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.text}>{this.props.name}</Text>
                            <Text style={styles.birthTime}>{this.state.country}</Text>
                            <Image source={require('../../assets/designer/icon_right.png')} style={styles.iconRight}/>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.props.name === '设计类别'){
            return (
                <View style={{width:"90%"}}>
                    <Image source={require('../../assets/designer/star.png')}
                           style={platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/>
                    <TouchableOpacity
                        {...this.props}
                        onPress={this._showDatePicker.bind(this)}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.text}>{this.props.name}</Text>
                            <Text style={styles.birthTime}>{this.state.designtype}</Text>
                            <Image source={require('../../assets/designer/icon_right.png')} style={styles.iconRight}/>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.props.name === '每年产出设计系列量' || this.props.name === '自有品牌数量'){
            return (
                <View style={{width:"90%"}}>
                    <Image source={require('../../assets/designer/star.png')}
                           style={platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/>
                    <TouchableOpacity
                        {...this.props}
                        onPress={this._showDatePicker.bind(this)}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.text}>{this.props.name}</Text>
                            <Text style={styles.birthTime}>{this.state.amount}</Text>
                            <Image source={require('../../assets/designer/icon_right.png')} style={styles.iconRight}/>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.props.name === '企业规模'){
            return (
                <View style={{width:"90%"}}>
                    <Image source={require('../../assets/designer/star.png')}
                           style={platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/>
                    <TouchableOpacity
                        {...this.props}
                        onPress={this._showDatePicker.bind(this)}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.text}>{this.props.name}</Text>
                            <Text style={styles.birthTime}>{this.state.size}</Text>
                            <Image source={require('../../assets/designer/icon_right.png')} style={styles.iconRight}/>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.props.name === '企业性质'){
            return (
                <View style={{width:"90%"}}>
                    <Image source={require('../../assets/designer/star.png')}
                           style={platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/>
                    <TouchableOpacity
                        {...this.props}
                        onPress={this._showDatePicker.bind(this)}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.text}>{this.props.name}</Text>
                            <Text style={styles.birthTime}>{this.state.nature}</Text>
                            <Image source={require('../../assets/designer/icon_right.png')} style={styles.iconRight}/>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.props.name === '企业注册地址'){
          return (
            <View style={{width:"90%"}}>
                <Image source={require('../../assets/designer/star.png')}
                       style={platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/>
                <TouchableOpacity
                  {...this.props}
                  onPress={this._showDatePicker.bind(this)}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>{this.props.name}</Text>
                        <Text style={styles.birthTime}>{this.state.registerplace}</Text>
                        <Image source={require('../../assets/designer/icon_right.png')} style={styles.iconRight}/>
                    </View>
                </TouchableOpacity>
            </View>
          );
        }
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        width: "100%",
        height: 54,
        borderBottomWidth: 1,
        borderBottomColor: "#5a5a5a",
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        color: '#d5d5d5',
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 11,
    },
    iconRight: {
        position: "absolute",
        right: 8,
        bottom: 11,
    },
    birthTime: {
        fontSize: 16,
        textAlign: 'right',
        color: '#d5d5d5',
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
        height:10,
        position:"absolute",
        bottom:15,
        left:-12,
        justifyContent:"center",
    },
    starAndroid: {
        width: 10,
        height:10,
        position:"absolute",
        bottom:15,
        left:-12,
        justifyContent:"center",
    },

});