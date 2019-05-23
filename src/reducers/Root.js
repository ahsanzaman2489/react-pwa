import {combineReducers} from 'redux';
import headlineReducers from './headlineReducer';
import newsReducer from './newsReducer';
import {routerReducer} from 'react-router-redux'

export default combineReducers({
    headlineReducers,
    newsReducer,
    ...routerReducer,
});