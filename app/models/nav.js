import { delay } from '../utils';
import { NavigationActions } from 'react-navigation';

import AppNavigator from '../AppNavigator';

let initialNavState = AppNavigator.router.getStateForAction(
  NavigationActions.init()
);

const actions = [
  NavigationActions.BACK,
  NavigationActions.INIT,
  NavigationActions.NAVIGATE,
  NavigationActions.RESET,
  NavigationActions.SET_PARAMS,
  NavigationActions.URI,
];

export default {
  namespace: 'nav',
  state: initialNavState,
  reducers: {
    apply(state, { payload: action }) {
      return AppNavigator.router.getStateForAction(action, state);
    },
  },
  effects: {
    watch: [
      function* watch({ take, call, put }) {
        const loop = true;
        while (loop) {
          const payload = yield take(actions);
          yield put({
            type: 'apply',
            payload,
          });
          // debounce, see https://github.com/react-community/react-navigation/issues/271
          // if (payload.type === 'Navigation/NAVIGATE') {
          //   yield call(delay, 200);
          // }
        }
      },
      { type: 'watcher' },
    ],
  },
};
