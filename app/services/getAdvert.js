import Consts from '../config/consts'
import {
    Alert
} from 'react-native'

export const getAdvert = () => {
    return fetch(`${Consts.server.BACKSTAGE}${Consts.api.GETADVERT}`, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((responseData) => {
            return responseData.datas.data.advert.source;
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}