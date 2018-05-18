import { getUserInfo } from '../services/user';

export default {
  namespace: 'user',
  state: {
    userid: '',
    uesrtype: 'stu',
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    * getUser(action, { call, put, select }) {
      const { userid, token } = yield select(state => state.app);
      try {
        const data = yield call(getUserInfo, { userid, token });
        yield put({ type: 'save', payload: data });
      } catch (e) {
        // e
      }
    },
  },
};
