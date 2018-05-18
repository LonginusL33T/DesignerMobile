import Consts from '../config/consts'
import {
    Alert
} from 'react-native'

export const getDesignerList = (page, perPage, type, country, designType, query) => {
    return fetch(`${Consts.server.BACKSTAGE}${Consts.api.SEARCHDESIGNER}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            page_size: perPage || null,
            page_num: page || null,
            type: type || '',
            country: country || '',
            design_type: designType || '',
            query: query || '',
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