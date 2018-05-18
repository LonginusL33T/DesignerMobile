import { getNewsList } from '../services/news';
import {getAdvert} from "../services/getAdvert"

export default {
    namespace: 'newsList',
    state: {
        news: [],//新闻列表
        pageNum: 1,
        isRefreshing: true,
        isLoading: false,
        isHaveData: true,
        advert: '',
        hash: '',
    },
    reducers: {
        updateHash(state, { hash }){
            return {
                ...state,
                hash: hash,
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
        updateDataState(state, { isHaveData }){
            return {
                ...state,
                isHaveData: isHaveData,
            };
        },
        refreshNews(state, { payload, pageNum }) {
            return {
                ...state,
                news: payload,
                pageNum: pageNum,
            };
        },
        updateAdvert(state, {payload}){
            return {
                ...state,
                advert: payload,
            }
        },
        loadNews(state, { payload }) {
            return {
                ...state,
                news: state.news.concat(payload),
                pageNum: state.pageNum + 1,
            };
        }
    },
    effects: {
        *getList({ perPage }, { call, put, select }) {
            const {pageNum} = yield select(state => state.newsList);
            try{
                yield put({ type: 'updateLoadState', isLoading: true});
                const list = yield call(getNewsList, pageNum, perPage);
                if(list.length > 0){
                    yield put({ type: 'loadNews', payload: list });
                }
                if(list.length < perPage){
                    yield put({ type: 'updateDataState', isHaveData: false});
                }
                yield put({ type: 'updateLoadState', isLoading: false});
                return Promise.resolve();
            } catch (e) {
                return Promise.reject('服务器开小差了，请重试');
            }
        },
        *refreshList({ perPage }, { call, put}) {
            try{
                yield put({ type: 'updateRefreshState', isRefreshing: true});
                yield put({ type: 'updateDataState', isHaveData: true});
                const list = yield call(getNewsList, 1, perPage);
                if(list.length > 0){
                    yield put({ type: 'refreshNews', payload: list, pageNum: 2});
                }
                else{
                    yield put({ type: 'refreshNews', payload: [], pageNum: 1});
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
        *getAdvertisement({payload}, {call, put}) {
            try{
                const advert = yield call(getAdvert);
                yield put({ type: 'updateAdvert', payload: advert});
                return Promise.resolve();
            } catch (e) {
                return Promise.reject('服务器开小差了，请重试');
            }
        },
    },
};