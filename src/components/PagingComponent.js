import React from 'react';
import {NavLink} from 'react-router-dom';
import queryString, {stringify} from "query-string";
import Pagination from "react-js-pagination";


/**
 * Paging component renders pagination of list.
 * @constructor
 *
 * @param {Number} totalPageCount - total number of pages we have in list.
 * @param {Object} location - browser location object.
 */


const PagingComponent = (props) => {

    const renderPaginationLink = (url, currentParams, page) => {
        if (page === 0) page = 1;
        currentParams.page = page;
        const newQuery = stringify(currentParams, {encode: false});
        return (url + "?" + newQuery);
    };

    const handlePageChange = (pageNumber, history, url) => {
        const parsed = queryString.parse(history.location.search);

        parsed.page = pageNumber;
        const stringify = queryString.stringify(parsed);

        history.push(url + '?' + stringify);
    };

    const {location, url, totalItemsCount, itemsCountPerPage, history} = props;
    const currentParams = queryString.parse(location.search);
    const currentPage = parseInt(currentParams.page, 10) || 1;

    return (
        <div className={'text-center'}>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={15}
                onChange={page => handlePageChange(page, history, url)}
                linkClass={'page-link'}
                itemClass={'page-item'}
            /></div>
    );
};


export default PagingComponent;