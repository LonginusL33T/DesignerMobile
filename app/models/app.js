import { login } from '../services/auth';

export default {
  namespace: 'app',
  state: {
    token: '',
    userid: '',
    usertype: '',
    school: {}, // 当前学校，登录用
  },
  reducers: {
    saveAuth(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeSchool(state, action) {
      return {
        ...state,
        school: action.payload,
      };
    },
  },
  effects: {
    * login({ payload }, { call, put, select }) {
      const { school } = yield select(store => store.app);
      // TODO 服务端修改count => account,需要兼容count
      const loginType = payload.loginType === 'account' ? 'count' : payload.loginType;
      const params = {
        schoolSid: `${school.sid}`,
        ...payload,
        loginType,
      };
      try {
        const data = yield call(login, params);
        if (data.token) {
          yield put({ type: 'saveAuth', payload: data });
          return Promise.resolve();
        } else {
          return Promise.reject('账号或密码错误');
        }
      } catch (e) {
        return Promise.reject('服务器开小差了，请重试');
      }
    },
  },
};
