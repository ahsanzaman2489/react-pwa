import React from 'react';
import queryString from "query-string";
import Pagination from "react-js-pagination";


/**
 * Paging component renders pagination of list.
 * @constructor
 *
 * @param {Number} totalPageCount - total number of pages we have in list.
 * @param {Object} location - browser location object.
 */


const PagingComponent = (props) => {

    const handlePageChange = (pageNumber, history, url) => {
        const parsed = queryString.parse(history.location.search);

        parsed.page = pageNumber;
        const stringify = queryString.stringify(parsed);

        history.push(url + '?' + stringify);
        window.scrollTo(0, 0);
    };

    const {location, url, totalItemsCount, itemsCountPerPage, history, currentItemLenght} = props;
    const currentParams = queryString.parse(location.search);
    const currentPage = parseInt(currentParams.page, 10) || 1;
    return (
        <div className={'text-center'}>
            {currentItemLenght * currentPage} out of {totalItemsCount}
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