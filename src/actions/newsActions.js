import * as actionTypes from '../constants/actionTypes';
import {newsService} from '../service';
console.log(newsService)
const service = newsService();

const serviceHandler = async (endPoint, query, dispatch, actionType) => {
    dispatch({type: actionTypes.LOADING});
    const response = await service.fetch(endPoint, query);
    dispatch({type: actionType, payload: response.data});
    dispatch({type: actionTypes.LOADING_DONE});

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