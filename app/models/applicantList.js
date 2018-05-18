import {getApplicantList} from "../services/recruitRecord";

export default {
    namespace: 'applicantList',
    state: {
        applicants: [],//应聘人员列表
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
        refreshApplicants(state, { payload, pageNum }) {
            return {
                ...state,
                applicants: payload,
                pageNum: pageNum
            };
        },
    },
    effects: {
        *refreshList({ uniqueid, pageSize }, { call, put}) {
            try{
                yield put({ type: 'updateRefreshState', isRefreshing: true});
                const list = yield call(getApplicantList, uniqueid, pageSize, 0);
                if(list.length > 0){
                    yield put({ type: 'refreshApplicants', payload: list || [], pageNum: 1});
                }
                else{
                    yield put({ type: 'refreshApplicants', payload: [], pageNum: 0});
                }
                yield put({ type: 'updateRefreshState', isRefreshing: false});
                return Promise.resolve();
            } catch (e) {
                return Promise.reject('服务器开小差了，请重试');
            }
        },
    },
};