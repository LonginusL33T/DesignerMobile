/**
 * 基础数据接口
 */

import http from '../utils/http';

/**
 * 获取学校列表
 */
export const getSchoolList = () => {
  return http.requestService('CellSchoolList');
};
