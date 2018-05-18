import Consts from '../config/consts';
import DeviceStorage from '../utils/DeviceStorage'
import {
    Alert
} from 'react-native';

export const login = (username, password, callback) => {
    fetch(`${Consts.server.BACKSTAGE}${Consts.api.LOGIN}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.datas.data.error_code === 0) {
                callback(responseData.datas.data.token);
            }
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}