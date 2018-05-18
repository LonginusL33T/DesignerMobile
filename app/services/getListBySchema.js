import Consts from '../config/consts'
import {
    Alert
} from 'react-native'

export const getListBySchema = (schema, callback, page, perPage) => {
    let url = page ? `${Consts.server.MESH}${Consts.api.SEARCHMESH}&page=${page}&perPage=${perPage}` :
        `${Consts.server.MESH}${Consts.api.SEARCHMESH}`;
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "filter": {
                "bool": {
                    "must": [
                        {
                            "match_phrase": {
                                "schema.name": schema,
                            }
                        },
                    ]
                }
            },
            "sort": [
                {
                    "created": "asc"
                }
            ]
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            callback(responseData.data);
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}