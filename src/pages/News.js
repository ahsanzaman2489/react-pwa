import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as NewsActions from '../actions/newsActions';
import * as qs from 'query-string';

// import {NO_DATA} from '../../constants/app';


export class NewsPage extends Component {
    state = {
        query: this.props.location.search
    };

    componentDidMount() {
        const {location, fetchNewsSources} = this.props;
        const query = qs.parse(location.search);
        fetchNewsSources('sources', '&category=' + query.category);
    }

    componentWillReceiveProps(nextProps) {
        const {location, fetchNewsSources} = nextProps;
        const query = qs.parse(location.search);


        if (this.state.query !== location.search) {
            fetchNewsSources('sources', '&category=' + query.category);
            this.setState({query: location.search})
        }
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
    console.log(state)
    return {
        sources: state.headlineReducers,
    };
};

function mapDispatchToProps(dispatch) {
    return {...bindActionCreators(NewsActions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
