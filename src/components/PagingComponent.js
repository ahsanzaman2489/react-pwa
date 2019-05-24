import React from 'react';
import {NavLink} from 'react-router-dom';
import queryString, {stringify} from "query-string";

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

    const {totalPageCount, location, url} = props;
    const currentParams = queryString.parse(location.search);
    const currentPage = parseInt(currentParams.page, 10) || 1;
    return (
        <div className="pagination">
            <ul>
                <li><NavLink to={renderPaginationLink(url, currentParams, 1)}
                             className={currentPage === 1 ? 'disabled' : ''}>first</NavLink></li>
                <li><NavLink
                    to={renderPaginationLink(url, currentParams, currentPage - 1)}
                    className={currentPage === 1 ? 'disabled' : ''}>previous</NavLink>
                </li>
                <li><span>page {currentPage} of {totalPageCount}</span></li>
                <li><NavLink to={renderPaginationLink(url, currentParams, currentPage + 1)}
                             className={currentPage === totalPageCount ? 'disabled' : ''}>next</NavLink>
                </li>
                <li><NavLink to={renderPaginationLink(url, currentParams, totalPageCount)}
                             className={currentPage === totalPageCount ? 'disabled' : ''}>last</NavLink>
                </li>
            </ul>
        </div>
    );
};


export default PagingComponent;