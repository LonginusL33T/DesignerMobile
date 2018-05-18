import consts from '../config/consts'
import DeviceStorage from "../utils/DeviceStorage";
import {
    Alert
} from 'react-native'

export const updateAvatar = (token, avatar, callback) => {
    fetch(`${consts.server.BACKSTAGE}${consts.api.AVATARUPDATE}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            x_token: token,
            avatar: avatar,
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.datas.data.error_code === 0) {
                callback();
            }else{
                Alert.alert('温馨提醒', responseData.datas.data.message);
            }
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}