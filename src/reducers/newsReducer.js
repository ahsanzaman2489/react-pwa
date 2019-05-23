import * as actionTypes from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ACTION_LOADING:
            return state = {...state, loading: action.isLoading};
        case actionTypes.SOURCES_LIST:
            const sourcesOnly = action.payload.sources.map(function (item) {
                return item.id;
            });
            return state = {...state, sources: sourcesOnly, loading: false};
        default:
            return state
    }
}