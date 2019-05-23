import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers/Root';

import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'react-router-redux';

export const history = createBrowserHistory();

const configureStore = (initialState = {}) => {

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, routerMiddleware(history))
    );
};

export default configureStore;