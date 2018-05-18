import React from 'react';
import { AsyncStorage } from 'react-native';

import './utils/bugReporter'; // app never crash
import dva from './lib/dva';
import models from './models';
import AppNavigatorContainer from './AppNavigatorContainer';

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
    //extraEnhancers: [ autoRehydrate() ],
    onAction: middlewares,
    onError(e) {
        console.log('onError', e);
    },
});

// 初始化
for (let m of models) {
    app.model(m);
}

const App = app.start(<AppNavigatorContainer />);
//persistStore(app.getStore(), { storage: AsyncStorage });

export default App;
