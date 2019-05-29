import * as actionTypes from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case actionTypes.NEWS_LOADING:
            return state = {...state, loading: action.isLoading};
        case actionTypes.NEWS_LIST:
            return state = {...state, data: action.payload, loading: false};
        default:
            return state
    }
}