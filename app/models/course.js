import { createAction } from 'redux-actions';

import http from '../utils/http';

export default {
  name: 'course',
  state: {
    list: [], // 课程列表
    score: {},  // 成绩（学生端）
    gradebook: {}, // 成绩册(教师端)，每次考试情况
    gradebookDetail: {}, // 某次考试所有学生成绩(教师端)
    bulletin: {},
    info: {}, // 课程信息
  },
  reducers: {
    saveCourseList(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
  },
  asyncActions: {},
};

/**
 * 课程信息
 * @param courseSid 课程id
 */
export const getCourse = (courseSid) => (dispatch, getState) => {
  let postParams = {
    courseid: courseSid,
  };
  return http.requestService('CellGetCourseInfo', postParams).then(result => {
      if (result.errorCode === 0) {
        dispatch(createAction(actionTypes.GET_COURSE_SUCCESS)({
          dataIndex: courseSid,
          data: result.courseInfo,
        }));
      } else {
        dispatch(createAction(actionTypes.GET_COURSE_FAIL)('fail'));
      }
    })
    .catch(err => {
      dispatch(createAction(actionTypes.GET_GRADEBOOK_FAIL)(err));
    });
};
