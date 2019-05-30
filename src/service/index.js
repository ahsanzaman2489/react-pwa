import localforage from "localforage";
import {setup} from 'axios-cache-adapter';

import * as config from '../constants/app';

const localStorageStore = localforage.createInstance({
    driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
    name: "api-cache"
});

let configObj = {};
configObj.cache = {
    maxAge: 24 * 60 * 60 * 1000,
    store: localStorageStore,
    debug: false,
    exclude: {
        query: false
    },

};
const api = setup(configObj);

export const newsService = () => {

    const fetch = async (endPoint, query = "", method = "get") => {
        const options = {
            method: method,
            url: config.HOST + config.HOST_PORT + endPoint + "?" + query + "&apiKey=" + config.API_KEY,
            crossDomain: true,
            mode: 'cors',
        };

        return api(options)
    };
    return {fetch}
};
