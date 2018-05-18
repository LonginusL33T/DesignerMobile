import { Alert } from 'react-native';

const ErrorUtils = global.ErrorUtils;
if (!__DEV__ && ErrorUtils) {
  ErrorUtils.setGlobalHandler((err, isFatal) => {
    if (isFatal) {
        /*Alert.alert('捕捉到一个野生异常', '程序发生不为人知的异常，已经向程序员GG报告了，请重新启动App');*/
    }
  });
}
