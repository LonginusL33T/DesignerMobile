/**
 * Http
 */
import config from '../config/config';

/**
 * 检查状态码
 * @param response
 * @returns {*}
 */
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText || `statusCode: ${response.status}`);
  error.response = response;
  throw error;
};

const parseJSON = response => response.json()
    .then(json => json)
    .catch((err) => {
      throw err;
    });

/**
 * object转成url后的查询字符串
 * @param obj
 * @returns {string}
 */
const toQueryString = (obj = {}) => {
  const items = [];
  Object.keys(obj).forEach((key) => {
    items.push(`${key}=${encodeURIComponent(obj[key])}`);
  });
  return items.length > 0 ? `?${items.join('&')}` : '';
};

export default {

  _request(url, options) {
    __DEV__ && console.log(url, options);
    return fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        __DEV__ && console.log(data);
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  request(url, options = {}) {
    const opt = {
      timeout: 20000,
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };
    return this._request(url, opt);
  },

  get(url = '', data = {}, options = {}) {
    data = {
      ...data,
      x_version: config.app.js.version
    };
    const getUrl = url + toQueryString(data);
    const opt = {
      ...options,
      method: 'GET',
    };
    return this.request(getUrl, opt);
  },

  post(url = '', data = {}, options = {}) {
    data = {
      ...data,
      x_version: config.app.js.version
    };
    const opt = {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    };
    return this.request(url, opt);
  },

  requestService(serviceName, data = {}) {
    // TODO 兼容老代码，待删除
    data = {
      x_token: global.token,
      x_version: config.app.js.version,
      ...data,
    };
    return this.post(`${config.webapi.service}${serviceName}/`, data)
      .then(json => {
        if (json instanceof Error){
          return Promise.reject(json);
        } else if (json.code === 'OK'){
          return Promise.resolve(json.datas.data);
        } else {
          return Promise.reject(json.msg);
        }
      })
      .catch(err => Promise.reject(err));
  }
};
