import Consts from '../config/consts'
import DeviceStorage from "../utils/DeviceStorage";
import {updateAvatar} from '../services/updateAvatar'
import {feedback} from "./feedback"

export const uploadMultiFile = (imageSource, sugestion, callback) => {
    let formData = new FormData();
    for(let i = 0; i < imageSource.length; i++){
        let file = {uri: imageSource[i].path, type: imageSource[i].mime, name: `img${i}.jpg`};
        formData.append(`img${i}`, file);
    }
    fetch(Consts.server.UPLOAD, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    })
        .then((response) => response.json())
        .then((responseData) => {
            let tokens = '';
            for(let i = 0; i < responseData.files.length; i++){
                tokens += responseData.files[i].token;
                if(i < responseData.files.length-1)
                    tokens += ' ,';
            }
            DeviceStorage.get(Consts.localStorage.X_TOKEN).then((val) => {
                feedback(sugestion, val, tokens, callback);
            })
        })
        .catch((error) => {
            console.error('error', error)
        });
}