import Consts from '../config/consts';
import {
    Alert
} from 'react-native';

export const getNode = (uuid, callback) => {
    fetch(`${Consts.server.MESH}designer/nodes/${uuid}?version=published`, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((responseData) => {
            callback(responseData.fields.name);
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        });
}