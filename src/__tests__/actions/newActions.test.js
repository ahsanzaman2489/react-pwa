import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/newsActions'
import * as types from '../../constants/actionTypes'
import * as config from "../../constants/app";

jest.mock('../../service/index.js', () => {
        return new Promise(resolve => {
            resolve({});
        })
    }
);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {

    it('creates CAR_DETAIL when fetching cars has been done', () => {

        const expectedActions = [
            {type: types.HEADLINE_LIST, payload: {}},
            {type: types.SOURCES_LIST, payload: {}},
            {type: types.NEWS_LIST, payload: {}},
        ];
        const store = mockStore({cars: []});

        // return store.dispatch(actions.fetchCar()).then(() => {
        //     // return of async actions
        //     expect(store.getActions()).toEqual(expectedActions)
        // })
    })
});