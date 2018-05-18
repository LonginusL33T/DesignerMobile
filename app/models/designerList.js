import { getDesignerList } from '../services/searchDesigner';
import DeviceStorage from '../utils/DeviceStorage'

export default {
    namespace: 'designerList',
    state: {
        designers: [],//设计师列表
        pageNum: 0,
        isLoading: false,
        isRefreshing: true,
        isHaveData: true,
    },
    reducers: {
        refreshDesigners(state, { payload, pageNum }) {
            return {
                ...state,
                designers: payload,
                pageNum: pageNum,
            };
        },
        loadDesigners(state, { payload }) {
            return {
                ...state,
                designers: state.designers.concat(payload),
                pageNum: state.pageNum + 1,
            };
        },
        updateLoadState(state, {isLoading }) {
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
        updateDataState(state, { isHaveData }){
            return {
                ...state,
                isHaveData: isHaveData,
            };
        },
    },
    effects: {
        *refreshList({ perPage, designer, country, designType, query }, { call, put, select}) {
            try{
                yield put({ type: 'updateRefreshState', isRefreshing: true});
                yield put({ type: 'updateDataState', isHaveData: true});
                const list = yield call(getDesignerList, 0, perPage, designer, country, designType, query);
                console.log(list);
                if(list.length > 0){
                    yield put({ type: 'refreshDesigners', payload: list, pageNum: 1});
                }
                else{
                    yield put({ type: 'refreshDesigners', payload: [], pageNum: 0});
                }
                if(list.length < perPage){
                    yield put({ type: 'updateDataState', isHaveData: false});
                }
                yield put({ type: 'updateRefreshState', isRefreshing: false});
                return Promise.resolve();
            } catch (e) {
                return Promise.reject('服务器开小差了，请重试');
            }
        },
        *getList({ perPage, designer, country, designType, query }, { call, put, select }) {
            const {pageNum} = yield select(state => state.designerList);
            try{
                yield put({ type: 'updateLoadState', isLoading: true});
                const list = yield call(getDesignerList, pageNum, perPage, designer, country, designType, query);
                if(list.length > 0){
                    yield put({ type: 'loadDesigners', payload: list });
                }
                if(list.length < perPage){
                    yield put({ type: 'updateDataState', isHaveData: false});
                }
                yield put({ type: 'updateLoadState', isLoading: false});
                return Promise.resolve();
            } catch (e) {
                return Promise.reject('服务器开小差了，请重试');
            }
        }
    },
};