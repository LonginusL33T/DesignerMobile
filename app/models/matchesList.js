import {getMatches} from "../services/getMatches";

export default {
    namespace: 'matchesList',
    state: {
        matches: [],//招聘列表
        isLoading: false,
        isRefreshing: true,
        pageNum: 0,
    },
    reducers: {
        refreshMatches(state, { payload, pageNum }) {
            return {
                ...state,
                matches: payload,
                pageNum: pageNum,
            };
        },
        updateLoadState(state, { isLoading }){
            return {
                ...state,
                isLoading: isLoading,
            };
        },
        updateRefreshState(state, { isRefreshing }){
            return {
                ...state,
                isRefreshing: isRefreshing,
            };
        },
    },
    effects: {
        *refreshList({ pageSize, category }, { call, put}) {
            try{
                yield put({ type: 'updateRefreshState', isRefreshing: true});
                const list = yield call(getMatches, pageSize, 0, category);
                if(list.length > 0){
                    yield put({ type: 'refreshMatches', payload: list || [], pageNum: 1});
                }
                else{
                    yield put({ type: 'refreshMatches', payload: [], pageNum: 0});
                }
                yield put({ type: 'updateRefreshState', isRefreshing: false});
                return Promise.resolve();
            } catch (e) {
                return Promise.reject('服务器开小差了，请重试');
            }
        },
    },
};