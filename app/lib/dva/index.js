import React from 'react';
import { Provider } from 'react-redux';
import * as core from 'dva-core';

export default function(opts = {}) {
  const app = core.create(opts);
  const oldAppStart = app.start;
  app.start = (container) => {
    oldAppStart.call(app);
    const store = app._store;
    return () => (
      <Provider store={store}>
        { container }
      </Provider>
    );
  };
  app.getStore = () => app._store;
  return app;
}
