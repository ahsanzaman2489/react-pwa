import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as NewsActions from '../actions/newsActions';

// import {NO_DATA} from '../../constants/app';


export class NewsPage extends Component {
    state = {

    };

    componentDidMount() {

    }


    render() {

        return (

            <div className="car-detail">
                News
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
    return {...bindActionCreators({NewsActions}, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
