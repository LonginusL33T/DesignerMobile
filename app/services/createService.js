import http from '../utils/http';

export default (serviceName) => {
  return (params = {}) => {
    return http.requestService(serviceName, params);
  };
};
