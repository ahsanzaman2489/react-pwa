import React, {Component, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as NewsActions from '../actions/newsActions';
import {CardColumns, Container} from 'react-bootstrap';


// import {NO_DATA} from '../../constants/app';

const CardComponent = lazy(() => import("../components/CardComponent"));

class HomePage extends Component {

    componentDidMount() {
        this.props.fetchHeadLines('top-headlines', 'country=us');
    }

    render() {
        const {headlines} = this.props;
        const renderHeadLines = (data) => {

            return data.articles.map((article, index) => {
                return (
                    <Suspense fallback={<div>Loading...</div>} key={index}>
                        <CardComponent article={article}/>
                    </Suspense>
                )
            })
        };

        return (
            <Container>
                <CardColumns>
                    {headlines.articles && renderHeadLines(headlines)}
                </CardColumns>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        headlines: state.headlineReducers,
    };
};

function mapDispatchToProps(dispatch) {
    return {...bindActionCreators(NewsActions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
