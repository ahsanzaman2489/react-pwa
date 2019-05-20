import {combineReducers} from 'redux';
import NewsReducer from './News';
import {routerReducer} from 'react-router-redux'

export default combineReducers({
    NewsReducer,
    ...routerReducer,
});