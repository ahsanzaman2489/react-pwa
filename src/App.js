import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import './style.scss';
import logo from './logo.svg';

import Header from "./components/Header";
// import Footer from "./components/footer";

import HomePage from "./pages/Home";
import NewsPage from "./pages/News";


const App = () => {

    return (
        <div>
            <Router>
                <Header src={logo}/>
                <Switch>
                    <Redirect exact from="/" to="/home"/>
                    <Route exact path={'/home'} component={HomePage}/>
                    <Route exact path={'/news'} component={NewsPage}/>
                    <Route path="*" render={() => <h1>not found</h1>}/>
                </Switch>
            </Router>
        </div>
    )

};
export default App;