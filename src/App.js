import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import './App.css';
import logo from './logo.svg';

// import Header from "./components/header";
// import Footer from "./components/footer";

import HomePage from "./pages/Home";


export default () => {
    return (
        <div>
            {/*<Header src={logo}/>*/}
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/Home"/>
                    <Route exact path={'/Home'} component={HomePage}/>
                    {/*<Route path={'/cars/detail/:stockNumber'} component={CarDetailContainer}/>*/}
                    {/*<Route path="*" component={NotFoundComponent}/>*/}
                </Switch>
                {/*<Footer/>*/}
            </Router>
        </div>
    );
};