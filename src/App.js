import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";



import './style.scss';
import logo from './logo.svg';

import Header from "./components/Header";
// import Footer from "./components/footer";

import HomePage from "./pages/Home";
import NewsPage from "./pages/News";
import {connect} from "react-redux";
import * as NewsActions from "./actions/News";


export class AppComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationPathName: window.location.pathname,
            LocationSearch: window.location.search,
        };

    }

    handleLocation = (pathname, search) => {
        this.setState({
            locationPathName: pathname,
            LocationSearch: search,
        })
    };

    render() {
        console.log(this.props);
        return (
            <div>
                <Router>
                    <Header src={logo} locationPathName={this.state.locationPathName}
                            LocationSearch={this.state.LocationSearch} handleLocation={this.handleLocation}/>
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
        )
    };
};

const mapStateToProps = (state) => {
    return {
        car: state,
    };
};

function mapDispatchToProps(dispatch) {

    return {...NewsActions}
}

export default connect(mapStateToProps,mapDispatchToProps)(AppComponent);