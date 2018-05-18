/**
 * App版本管理器
 */

import {
  Platform,
  Linking,
  Alert,
} from 'react-native';

import http from './http';
import config from '../config/config';

export default {

  api: {
    upgrade: 'http://'
  },


  /**
   * 检查bundle更新
   */
  update() {

  },

  /**
   * 检查App是否有更新
   */
  upgrade() {
    const platform = Platform.OS;
    http.requestService('upgrade', {platform: platform})
      .then(results => {
        let result = results[0][platform];
        // 判断是否需要更新
        if (result.versionCode > config.app[platform].versionCode) {
          let changelog = (result.changelog || '').replace('\\n', '\n');
          Linking.canOpenURL(result.url).then(supported => {
            if (supported) {
              Alert.alert(
                '版本更新',
                changelog,
                [
                  {
                    text: '稍后再说', onPress: () => {
                  }, style: 'cancel'
                  },
                  {text: '去更新', onPress: () => Linking.openURL(result.url)},
                ]
              );
            }
          }).catch(err => console.log(err));
        }
      })
      .catch(err => {
        console.log(err)
      });
  }
};
