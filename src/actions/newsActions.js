import * as actionTypes from '../constants/actionTypes';
import newsService from '../service';

const service = newsService();

const serviceHandler = (endPoint, query, dispatch, actionType) => {
    return service.fetch(endPoint, query).then((payload) => {
        dispatch({type: actionType, payload: payload.data});
    });
};

export const fetchHeadLines = (endPoint, query) => (dispatch) => {
    dispatch({type: actionTypes.ACTION_LOADING, isLoading: true});
    serviceHandler(endPoint, query, dispatch, actionTypes.HEADLINE_LIST);
};

export const fetchNewsSources = (endPoint, query) => (dispatch) => {
    dispatch({type: actionTypes.ACTION_LOADING, isLoading: true});
    serviceHandler(endPoint, query, dispatch, actionTypes.SOURCES_LIST);
};