import {getApplyByDesigner} from "../services/apply";

export default {
    namespace: 'applyList',
    state: {
        applys: [],//应聘记录列表
        isLoading: false,
        isRefreshing: true,
        pageNum: 0,
    },
    reducers: {
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
        refreshApplys(state, { payload, pageNum }) {
            return {
                ...state,
                applys: payload,
                pageNum: pageNum,
            };
        },
    },
    effects: {
        *refreshList({ x_token, pageSize }, { call, put}) {
            try{
                yield put({ type: 'updateRefreshState', isRefreshing: true});
                const list = yield call(getApplyByDesigner, x_token, pageSize, 0);
                if(list.length > 0){
                    yield put({ type: 'refreshApplys', payload: list || [], pageNum: 1});
                }
                else{
                    yield put({ type: 'refreshApplys', payload: [], pageNum: 0});
                }
                yield put({ type: 'updateRefreshState', isRefreshing: false});
                return Promise.resolve();
            } catch (e) {
                return Promise.reject('服务器开小差了，请重试');
            }
        },
    },
};