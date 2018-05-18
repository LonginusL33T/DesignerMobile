import http from '../utils/http';

/**
 * 获取用户信息
 */
export const getUserInfo = ({ userid, token }) => {
  const postParams = {
    x_token: token,
    userid: userid,
  };
  return http.requestService('CellGetUserInfo', postParams);
};
