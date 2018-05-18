/**
 * 配置
 */

export const server = 'https://www.doctorz.online';  // 非80端口请配置在url后面
//const server = 'http://192.168.30.222:8080';
const appCode = 'drz';

export default {
  apiRoot: `${server}/smartx/webapi/adapterx`,
  localLoginIdKey: 'username',//用于加载本地存储的用户名,需要服务器端配合设置save action并且命名一致
  localLoginPassword: 'password',//用于加载本地存储的登录密码,需要服务器端配合设置save action并且命名一致
  webapi: {
    log: `${server}/smartx/webapi/adapterx/log`,
    upload: `${server}/smartx/webapi/adapterx/resource/upload`,

    // 服务,纯接口
    service: `${server}/smartx/webapi/service/${appCode}/`
  },

  app: {
    // 和打包的版本号对应起来,用于比较是否需要更新(upgrade)
    android: {
      versionCode: 200021,        // 服务下发的比这个大则需要更新
      versionName: '2.3.1'
    },
    ios: {
      versionCode: 20,
      versionName: '2.3.0'
    },
    js: {
      version: '5' // js打包的版本
    }
  }
};
