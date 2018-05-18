import Consts from '../config/consts'
import {
    Alert
} from 'react-native'

export const getMatches = (pageSize, pageNum, category) => {
    return fetch(`${Consts.server.BACKSTAGE}${Consts.api.GETMATCHES}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pagesize: pageSize || null,
            pagenum: pageNum || null,
            category: category || null
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            return responseData.datas.data.recruits;
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}