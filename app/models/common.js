/**
 * 保存app基础数据
 */

import { getSchoolList } from '../services/common';

export default {
  namespace: 'common',
  state: {
    schools: [{
      'schoolName':'浙江大学城市学院','sid':1
    },{
      'schoolName':'杭州开发者学院','sid':2
    },{
      'schoolName':'缔安大学','sid':3
    },{
      'schoolName':'天津大学仁爱学院','sid':4
    },{
      'schoolName':'西安科技大学','sid':5
    },{
      'schoolName':'武汉科技大学','sid':6
    },{
      'schoolName':'浙江大学','sid':7
    }],
    colleges: [],
  },
  reducers: {
    saveSchools(state, { payload }) {
      return {
        ...state,
        schools: payload,
      };
    },
    saveColleges(state, { payload }) {
      return {
        ...state,
        colleges: payload,
      };
    },
  },
  effects: {
    * getSchools({ payload }, { call, put, select }) {
      try {
        const data = yield call(getSchoolList, {});
        yield put({ type: 'saveSchools', payload: data || [] });
        return Promise.resolve();
      } catch (e) {
        return Promise.reject('服务器开小差了，请重试');
      }
    },
  },
};
