import React, {Component, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as NewsActions from '../actions/newsActions';
import * as qs from 'query-string';
import {CardColumns, Container} from "react-bootstrap";

// import {NO_DATA} from '../../constants/app';

const CardComponent = lazy(() => import("../components/CardComponent"));
const PagingComponent = lazy(() => import("../components/PagingComponent"));

export class NewsPage extends Component {
    state = {
        category: qs.parse(this.props.location.search).category,
        query: this.props.location.search,
        samePage: false,
    };

    componentDidMount() {
        const {location, fetchNewsSources} = this.props;
        const query = qs.parse(location.search);
        fetchNewsSources('sources', 'category=' + query.category);
    }

    arraysEqual = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {sources} = this.props;

        if ((sources.data && sources.data.length > 0 && !this.arraysEqual(prevProps.sources.data, sources.data)) && !this.state.samePage) {
            this.getNewPerSource(this.props.sources.data, this.props.location);
        }

    }

    componentWillReceiveProps(nextProps) {
        const {location, fetchNewsSources, sources} = nextProps;
        const query = qs.parse(location.search);

        if (this.state.category !== query.category) {
            fetchNewsSources('sources', 'category=' + query.category);
            this.setState({category: query.category, query: location.search, samePage: false})
        } else if (this.state.query !== location.search && (this.state.category === query.category)) {
            this.getNewPerSource(sources.data, location);
            this.setState({query: location.search, samePage: true})
        }
    }


    getNewPerSource = (sources, nextLocation) => {
        const {fetchNews} = this.props;
        fetchNews('everything', nextLocation.search + '&sources=' + sources.join());
    };


    render() {

        const {news, location} = this.props;
        const renderNews = (data) => {

            return data.map((article, index) => {
                return (
                    <Suspense fallback={<div>Loading...</div>} key={index}>
                        <CardComponent article={article}/>
                    </Suspense>
                )
            })
        };
        return (

            <div className="car-detail">
                <Container>
                    <CardColumns>
                        {news.data && renderNews(news.data.articles)}
                    </CardColumns>
                    <Suspense fallback={<div>Loading...</div>}>
                        <PagingComponent location={location} url={'/news'}/>
                    </Suspense>

                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sources: {...state.sourceReducer},
        news: {...state.newsReducer}
    };
};

function mapDispatchToProps(dispatch) {
    return {...bindActionCreators(NewsActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
