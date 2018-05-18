import Consts from '../config/consts'
import {
    Alert
} from 'react-native'

export const getRecruitsListByCompany = (uniqueid, pageSize, pageNum) => {
    return fetch(`${Consts.server.BACKSTAGE}${Consts.api.GETRECRUITBYCOMPANY}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pagesize: pageSize || null,
            pagenum: pageNum || null,
            uniqueid: uniqueid
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

export const deleteRecruit = (uniqueid) => {
    return fetch(`${Consts.server.BACKSTAGE}${Consts.api.DELETERECRUIT}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uniqueid: uniqueid
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.datas.data.error_code === 0) {
                return 'ok';
            }
            else {
                Alert.alert('温馨提醒', '删除失败');
            }
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}

export const getApplicantList = (uniqueid, pageSize, pageNum) => {
    return fetch(`${Consts.server.BACKSTAGE}${Consts.api.GETAPPLYBYCOMPANY}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pagesize: pageSize || null,
            pagenum: pageNum || null,
            uniqueid: uniqueid
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