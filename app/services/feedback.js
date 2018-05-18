import Consts from '../config/consts'
import DeviceStorage from '../utils/DeviceStorage'
import {
    Alert
} from 'react-native'

export const feedback = (sugestion ,token, imgs, callback) => {
    fetch(`${Consts.server.BACKSTAGE}${Consts.api.FEEDBACK}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "sugestion": sugestion,
            "images": imgs || '',
            "x_token": token,
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.datas.data.error_code === 0) {
                callback();
            }
            else {
                Alert.alert('温馨提醒', '提交失败');
            }
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}