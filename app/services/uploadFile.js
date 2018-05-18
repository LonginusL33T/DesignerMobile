import consts from '../config/consts'
import DeviceStorage from "../utils/DeviceStorage";
import {updateAvatar} from '../services/updateAvatar'

export const uploadFile = (uri, type) => {
    let formData = new FormData();
    let file = {uri: uri, type: type, name: 'avatar.jpg'};
    formData.append("image", file);
    return fetch(consts.server.UPLOAD, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    })
        .then((response) => response.json())
        .then((responseData) => {
            return {
                avatarToken: responseData.files[0].token,
                origin: responseData.files[0].origin,
            }
        })
        .catch((error) => {
            console.error('error', error)
        });
}