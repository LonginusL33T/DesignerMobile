/**
 * loading
 * @param dispatch
 * @param getState
 */
const modelxMiddleware = ({dispatch, getState}) => next => action => {
  let result = next(action);
  action(dispatch, getState);
  return result;
};

export default modelxMiddleware;
