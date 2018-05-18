import React, {Component} from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    Alert,
    Dimensions
} from 'react-native'

import MyTextInput from './MyTextInput'
import Consts from "../../config/consts";
import Icon from 'react-native-vector-icons/Ionicons'
import DeviceStorage from '../../utils/DeviceStorage'
import { NavigationActions } from 'react-navigation'

const images = {
    back: require("../../assets/designer/left.png"),
}
class ModifyPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            old_password: '',
            new_password: '',
            same_password: ''
        };
        this.SavePassword = this.SavePassword.bind(this)

    }

    static navigationOptions = ({navigation: {goBack, state}}) => ({
        title: '修改密码',
        headerLeft: (<View>
            <TouchableOpacity
                style={styles.navBarLeft}
                onPress={() => goBack()}>
                <Image source={images.back}/>
            </TouchableOpacity>
        </View>),
        headerRight: (
            <View>
                <TouchableOpacity
                    onPress={() => state.params.headerRight()}>
                    <Text style={styles.headerRight}>保存</Text>
                </TouchableOpacity>
            </View>
        ),
        headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 17,
        }
    });

    componentDidMount() {
        let {navigation} = this.props;
        navigation.setParams({headerRight: this.SavePassword});

        DeviceStorage.get(Consts.localStorage.X_TOKEN).then(val => {
            this.setState({token: val});
        });
    }

    SavePassword = () => {
        const {dispatch} = this.props.navigation;
        if(this.state.same_password === this.state.new_password) {
            const {navigate} = this.props.navigation;
            fetch(`${Consts.server.BACKSTAGE}${Consts.api.MODIFYPASSWORD}`, {
                method: 'POST',
                body: JSON.stringify({
                    "x_token": this.state.token,
                    "old_password": this.state.old_password,
                    "new_password": this.state.new_password
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData.datas.data.error_code === 0) {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Login'})
                            ]
                        });
                        dispatch(resetAction);
                    }
                    else {
                        Alert.alert(responseData.datas.data.message);
                    }
                })
                .catch((error_code) => {
                    //console.log('错误了');
                    console.log(error_code);
                })
        }else{
            Alert.alert('温馨提示','两次输入的密码不一致');
        }
    };


    render() {
        return (
            <View>
                {/*<View style={styles.container}>
                    <MyTextInput
                        placeholder='旧密码'
                        onChangeText={(old_password) =>
                        {this.setState({old_password:old_password})}}/>
                </View>*/}
                <View style={styles.itemContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(old_password) => {
                            this.setState({old_password:old_password})
                        }}
                        placeholder='请输入旧密码'
                        placeholderTextColor="#c4c2c2"
                        underlineColorAndroid="transparent"/>
                    <Text style={styles.label}>旧密码</Text>
                </View>
                <View style={styles.itemContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(new_password) => {
                            this.setState({new_password:new_password})
                        }}
                        placeholder='字母数字组合至少八位数'
                        placeholderTextColor="#c4c2c2"
                        underlineColorAndroid="transparent"/>
                    <Text style={styles.label}>新密码</Text>
                </View>
                <View style={styles.itemContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(same_password) => {
                            this.setState({same_password:same_password})
                        }}
                        placeholder='请再输入一次新密码'
                        placeholderTextColor="#c4c2c2"
                        underlineColorAndroid="transparent"/>
                    <Text style={styles.label}>重复密码</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navBarLeft: {
        paddingVertical: 5,
        paddingLeft: 15,
        paddingRight: 30,
    },
    container: {
        paddingTop: 24,
        paddingHorizontal: 24,
        alignItems: 'center'
    },
    headerRight: {
        color: '#fff',
        fontSize: 17,
        paddingRight: 15,
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 15
    },
    itemContainer: {
        width: Dimensions.get('window').width,
        height: 50,
    },
    textInput: {
        width: "90%",
        fontSize: 14,
        padding: 0,
        paddingLeft: 77,
        position:'absolute',
        bottom:0,
        paddingBottom:5,
        borderBottomWidth: 1,
        borderColor: "#e9e9e9",
        alignSelf: 'center',
        color: '#3c3c3c',
    },
    label: {
        fontSize: 14,
        color: '#3c3c3c',
        position: 'absolute',
        left: Dimensions.get('window').width*0.05+8,
        bottom: 8,
        backgroundColor:"transparent"
    },
});

export default ModifyPassword;