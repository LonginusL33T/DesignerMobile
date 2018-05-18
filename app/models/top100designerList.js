import { getTop100DesignerList } from '../services/top100designer';

export default {
    namespace: 'top100designerList',
    state: {
        designers: [],//top100设计师列表
        pageNum: 0,
        isLoadFinish: true,
        isHaveData: true,
        isRefreshing: true,
    },
    reducers: {
        refreshDesigners(state, { payload, pageNum }) {
            return {
                ...state,
                designers: payload,
                pageNum: pageNum,
            };
        },
        saveDesigners(state, { payload }) {
            return {
                ...state,
                designers: state.designers.concat(payload),
                pageNum: state.pageNum + 1,
            };
        },
        updateLoadState(state, { isLoadFinish }){
            return {
                ...state,
                isLoadFinish: isLoadFinish,
            };
        },
        updateDataState(state, { isHaveData }){
            return {
                ...state,
                isHaveData: isHaveData,
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
        *getList({ payload }, { call, put, select}) {
            const {pageNum} = yield select(state => state.top100designerList);
            try{
                yield put({ type: 'updateLoadState', isLoadFinish: false});
                const list = yield call(getTop100DesignerList, pageNum);
                if(list.length > 0) {
                    yield put({type: 'saveDesigners', payload: list});
                }
                if(list.length < 6) {
                    yield put({type: 'updateDataState', isHaveData: false});
                }
                yield put({ type: 'updateLoadState', isLoadFinish: true});
                return Promise.resolve();
            } catch (e) {
                return Promise.reject('服务器开小差了，请重试');
            }
        },
        *refreshList({ payload }, { call, put}) {
            try{
                yield put({ type: 'updateRefreshState', isRefreshing: true});
                yield put({type: 'updateDataState', isHaveData: true});
                const list = yield call(getTop100DesignerList, 0);
                if(list.length > 0) {
                    yield put({type: 'refreshDesigners', payload: list, pageNum: 1});
                }
                else{
                    yield put({type: 'refreshDesigners', payload: [], pageNum: 0});
                }
                if(list.length < 6) {
                    yield put({type: 'updateDataState', isHaveData: false});
                }
                yield put({ type: 'updateRefreshState', isRefreshing: false});
                return Promise.resolve();
            } catch (e) {
                return Promise.reject('服务器开小差了，请重试');
            }
        }
    },
};