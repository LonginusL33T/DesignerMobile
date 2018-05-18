/**
 * Created by Jeepeng on 2017/3/18.
 */

import React from 'react';
import { AsyncStorage } from 'react-native';

import './app/utils/bugReporter'; // app never crash
import dva from './app/lib/dva';
import models from './app/models';
import AppNavigatorContainer from './app/AppNavigatorContainer';

const middlewares = [
  //loadingMiddleware,
];
if (__DEV__) {
  const { logger } = require('redux-logger');
  // logger 必须是最后一个middleware（放到最后）
  middlewares.push(logger);
}

const app = dva({
  initialState: {},
  onAction: middlewares,
  onError(e) {

  },
});

// 初始化
for (let m of models) {
  app.model(m);
}

const App = app.start(<AppNavigatorContainer />);

export default App;
