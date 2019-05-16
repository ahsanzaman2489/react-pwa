import React from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, Form, FormControl, Button, NavDropdown} from 'react-bootstrap'


const HeaderComponent = (props) => {
    const {src} = props;
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand><NavLink to={'/'}><img src={src} alt="" width="60"/></NavLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><NavLink to={'/'}>Home</NavLink></Nav.Link>
                    <NavDropdown title="Categories" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        {/*<NavDropdown.Divider/>*/}
                        {/*<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-light">Search</Button>
                    </Form>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};


export default HeaderComponent;

