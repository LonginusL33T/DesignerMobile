import Consts from '../config/consts'
import {
    Alert
} from 'react-native'

export const sendApply = (job_uniqueid, x_token, callback) => {
    fetch(`${Consts.server.BACKSTAGE}${Consts.api.SENDAPPLY}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            job_uniqueid: job_uniqueid,
            x_token: x_token
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.datas.data.error_code === 0) {
                Alert.alert('温馨提醒', '发送简历成功');
            }
            else {
                Alert.alert('温馨提醒', responseData.datas.data.message);
            }
            callback();
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}

export const getApplyByDesigner = (x_token, pageSize, pageNum) => {
    return fetch(`${Consts.server.BACKSTAGE}${Consts.api.GETAPPLYBYDESIGNER}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pagesize: pageSize || null,
            pagenum: pageNum || null,
            x_token: x_token
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            return responseData.datas.data.apply;
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}