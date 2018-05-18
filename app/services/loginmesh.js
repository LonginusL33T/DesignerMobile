import Consts from '../config/consts'
import DeviceStorage from '../utils/DeviceStorage'
import {
    Alert
} from 'react-native'

export const loginMesh = () => {
    fetch(`${Consts.server.MESH}${Consts.api.LOGINMESH}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username : "admin",
            password : "admin"
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.token)
                DeviceStorage.save('token', responseData.token);
            else
                Alert.alert('温馨提醒', '登录mesh失败');
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}