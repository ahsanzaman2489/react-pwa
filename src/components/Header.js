import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import * as qs from 'query-string';
import LoadingBar from 'react-top-loading-bar';
import {connect} from "react-redux";


export const HeaderComponent = (props) => {
    const {src, pageLoading, history} = props;

    let loadingProgress = 0;
    const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

    const isActive = (match, location, path, category) => {
        const parsed = qs.parse(location.search);
        return path === location.pathname && category === parsed.category;
    };

    const renderCategories = (categories) => {
        return categories.map((category, index) => <li key={index}>
            <NavLink to={'/news?category=' + category}
                     isActive={(match, location) => isActive(match, location, '/news', category)}
                     className={'nav-link'}>{category}</NavLink>
        </li>)
    };

    const onLoaderFinished = () => {
        loadingProgress = 0;
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;
        const parsed = qs.parse(history.location.search);

        if (searchValue.length > 0) parsed.q = searchValue;

        history.push({
            pathname: '/news',
            search: '?' + qs.stringify(parsed),
        });

    };

    if (pageLoading) loadingProgress = loadingProgress + 35;
    else loadingProgress = 100;


    return (
        <header>
            <div className={'loading-bar-wrapper'}><LoadingBar
                progress={loadingProgress}
                height={3}
                color="red"
                className={'loading-bar'}
                onLoaderFinished={() => onLoaderFinished()}
            /></div>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand><NavLink to={'/'}><img src={src} alt="" width="60"/></NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink exact={true} activeClassName='active' to={'/home'}
                                 className={'nav-link'}>home</NavLink>
                        {renderCategories(categories)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

const mapStateToProps = (state) => {
    return {
        pageLoading: state.LoadingReducer.loading,
    };
};

export default withRouter(connect(mapStateToProps)(HeaderComponent));