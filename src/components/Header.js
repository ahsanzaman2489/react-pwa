import React from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';


const HeaderComponent = (props) => {

    const {src} = props;
    const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

    const isActive = (match, location, path, query) => {
        return path === location.pathname && query === location.search;
    };

    const renderCategories = (categories) => {
        return categories.map((category, index) => <li key={index}>
            <NavLink to={'/news?category=' + category}
                     isActive={(match, location) => isActive(match, location, '/news', '?category=' + category)}
                     className={'nav-link'}>{category}</NavLink>
        </li>)
    };

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand><NavLink to={'/'}><img src={src} alt="" width="60"/></NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
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

export default HeaderComponent;