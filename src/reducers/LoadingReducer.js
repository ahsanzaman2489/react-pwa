import * as actionTypes from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case actionTypes.LOADING:
            return state = {...state, loading: true, };
        case actionTypes.LOADING_DONE:
            return state = {...state, loading: false,};
        default:
            return state
    }
}
