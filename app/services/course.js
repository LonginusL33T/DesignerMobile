import http from '../utils/http';

/**
 * 获取课程列表
 * @param status 课程状态
 */
export const getCourseList = ({ status = 'open', usertype, userid, token }) => {
  const postParams = {
    x_token: token,
    userid: userid,
    clazzState: status,
    usertype: usertype,
  };
  return http.requestService('CellCourseList', postParams);
};
