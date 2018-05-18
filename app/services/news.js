import Consts from '../config/consts'
import {
    Alert
} from 'react-native'

export const getNewsList = (page, perPage) => {
    let url = perPage ? `${Consts.server.MESH}${Consts.api.SEARCHMESH}&page=${page}&perPage=${perPage}` :
        `${Consts.server.MESH}${Consts.api.SEARCHMESH}`;
    return fetch(url, {
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
                                "schema.name": "news"
                            }
                        }
                    ]
                }
            },
            "sort": [
                {
                    "created": "desc"
                }
            ]
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            return responseData.data;
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}