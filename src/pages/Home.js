import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as NewsActions from '../actions/newsActions';
import newsService from '../service/index';

// import {NO_DATA} from '../../constants/app';


class HomePage extends Component {

    componentDidMount() {
        this.props.newsList('sources');
    }

    render() {
        return (

            <div className="car-detail">
                Home
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        car: state,
    };
};

function mapDispatchToProps(dispatch) {
    return {...bindActionCreators(NewsActions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
