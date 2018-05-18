import {deleteRecruit, getRecruitsListByCompany} from "../services/recruitRecord";

export default {
    namespace: 'recruitList',
    state: {
        recruits: [],//发布招聘列表
        isRefreshing: true,
        isLoading: false,
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
        refreshRecruits(state, { payload, pageNum }) {
            return {
                ...state,
                recruits: payload,
                pageNum: pageNum || state.pageNum,
            };
        },
    },
    effects: {
        *refreshList({ uniqueid, pageSize }, { call, put}) {
            try{
                yield put({ type: 'updateRefreshState', isRefreshing: true});
                const list = yield call(getRecruitsListByCompany, uniqueid, pageSize, 0);
                if(list.length > 0){
                    yield put({ type: 'refreshRecruits', payload: list || [], pageNum: 1});
                }
                else{
                    yield put({ type: 'refreshRecruits', payload: [], pageNum: 0});
                }
                yield put({ type: 'updateRefreshState', isRefreshing: false});
                return Promise.resolve();
            } catch (e) {
                return Promise.reject('服务器开小差了，请重试');
            }
        },
        *deleteRecruit({ uniqueid }, { call, put, select }){
            try{
                yield put({ type: 'updateRefreshState', isRefreshing: true});
                const result = yield call(deleteRecruit, uniqueid);
                if(result === 'ok'){
                    const list = yield select(state => state.recruitList.recruits);
                    const newList = list.filter((item) => {
                        return item.uniqueid != uniqueid
                    });
                    yield put({ type: 'refreshRecruits', payload: newList || []});
                }
                yield put({ type: 'updateRefreshState', isRefreshing: false});
                return Promise.resolve();
            } catch (e) {
                return Promise.reject('服务器开小差了，请重试');
            }
        }
    },
};