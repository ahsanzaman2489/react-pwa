import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";


import './style.css';


import logo from './logo.svg';

import Header from "./components/Header";
// import Footer from "./components/footer";

import HomePage from "./pages/Home";
import NewsPage from "./pages/News";


export default () => {
    return (
        <div>

            <Router>
                <Header src={logo}/>
                <Switch>
                    <Redirect exact from="/" to="/home"/>
                    <Route exact path={'/home'} component={HomePage}/>
                    <Route exact path={'/news'} component={NewsPage}/>
                    {/*<Route path={'/cars/detail/:stockNumber'} component={CarDetailContainer}/>*/}
                    {/*<Route path="*" component={NotFoundComponent}/>*/}
                </Switch>
                {/*<Footer/>*/}
            </Router>
        </div>
    );
};