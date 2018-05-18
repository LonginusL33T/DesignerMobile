import { getCourseList } from '../services/course';

export default {
  namespace: 'courseList',
  state: {
    current: [], // 当前课程列表
    history: [], // 历史课程列表
  },
  reducers: {
    saveCurrent(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },
    saveHistory(state, { payload }) {
      return {
        ...state,
        history: payload,
      };
    },
  },
  effects: {
    * fetch({ payload }, { call, put, select }) {
      const status = payload.status || 'open';
      const { usertype, userid, token } = yield select(state => state.app);
      try {
        const data = yield call(getCourseList, { userid, usertype, token, ...payload });
        if (status === 'open') {
          yield put({ type: 'saveCurrent', payload: data.clazzList || [] });
        } else {
          yield put({ type: 'saveHistory', payload: data.clazzList || [] });
        }
        return Promise.resolve();
      } catch (e) {
        return Promise.reject('服务器开小差了，请重试');
      }
    },
  },
};
