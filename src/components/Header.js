import React from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import * as qs from 'query-string';
import LoadingBar from 'react-top-loading-bar';
import {connect} from "react-redux";


const HeaderComponent = (props) => {
    const {src, pageLoading} = props;
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
                    <Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="outline-light">Search</Button>
                        </Form>
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

export default connect(mapStateToProps)(HeaderComponent);