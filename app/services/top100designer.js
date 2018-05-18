import Consts from '../config/consts'
import {
    Alert
} from 'react-native'

export const getTop100DesignerList = (pageNum) => {
    return fetch(`${Consts.server.BACKSTAGE}${Consts.api.GETTOP100}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            page_size: 6,
            page_num: pageNum
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            return responseData.datas.data.user;
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}