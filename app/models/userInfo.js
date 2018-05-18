import DeviceStorage from '../utils/DeviceStorage'
import {uploadFile} from "../services/uploadFile";
import {updateAvatar} from "../services/updateAvatar";
import Consts from "../config/consts";

export default {
    namespace: 'userInfo',
    state: {
        avatar: 'noresouce',
        isLogin: false,
    },
    reducers: {
        updateLoginState(state, { payload }){
            return {
                ...state,
                isLogin: payload,
            }
        },
        updateAvatar(state, { payload }) {
            return {
                ...state,
                avatar: payload==null?"noresouce":payload,
            };
        },
    },
    effects: {
        *updateAvatarImage({ uri, imgType, token, callback}, { call, put}) {
            try{
                const {avatarToken, origin} = yield call(uploadFile, uri, imgType);
                yield call(updateAvatar, token, avatarToken, callback);
                yield put({type: 'updateAvatar', payload: origin});
                yield DeviceStorage.save(Consts.localStorage.AVATAR, origin);
                return Promise.resolve();
            } catch (e) {
                return Promise.reject('服务器开小差了，请重试');
            }
        }
    },
};