import * as actionTypes from '../constants/actionTypes';
import newsService from '../service';

const service = newsService();

const serviceHandler = (endPoint, query, dispatch, actionType) => {
    return service.fetch(endPoint, query).then((payload) => {
        dispatch({type: actionType, payload: payload.data});
    });
};

export const fetchHeadLines = (endPoint, query) => (dispatch) => {
    dispatch({type: actionTypes.HEADLINE_LOADING, isLoading: true});
    serviceHandler(endPoint, query, dispatch, actionTypes.HEADLINE_LIST);
};

export const fetchNewsSources = (endPoint, query) => (dispatch) => {
    dispatch({type: actionTypes.SOURCE_LOADING, isLoading: true});
    serviceHandler(endPoint, query, dispatch, actionTypes.SOURCES_LIST);
};

export const fetchNews = (endPoint, query) => (dispatch) => {
    dispatch({type: actionTypes.NEWS_LOADING, isLoading: true});
    serviceHandler(endPoint, query, dispatch, actionTypes.NEWS_LIST);
};