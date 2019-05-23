import axios from 'axios';
import * as config from '../constants/app';

const newsService = () => {

    const fetch = (endPoint, query = "", method = "get") => {
        return axios(config.HOST + config.HOST_PORT + endPoint + "?apiKey=" + config.API_KEY + query, {
            method: method,
            mode: 'cors'
        });
    };

    return {fetch}
};

export default newsService;