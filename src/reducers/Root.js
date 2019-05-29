import {combineReducers} from 'redux';
import LoadingReducer from './LoadingReducer';
import headlineReducers from './headlineReducer';
import newsReducer from './newsReducer';
import sourceReducer from './sourceReducer';
import {routerReducer} from 'react-router-redux'

export default combineReducers({
    LoadingReducer,
    headlineReducers,
    newsReducer,
    sourceReducer,
    ...routerReducer,
});