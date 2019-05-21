import * as actionTypes from '../constants/actionTypes';
import newsService from '../service';

const service = newsService();

export const newsList = (endPoint, query) => (dispatch) => {
    dispatch({type: actionTypes.LOADING_CARS, isLoading: true});
    return service.fetch(endPoint, query).then((payload) => {
        dispatch({type: actionTypes.CARS_LIST, payload});
    });
};