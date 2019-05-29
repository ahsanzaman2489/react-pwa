import React, {Component, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as NewsActions from '../actions/newsActions';
import * as qs from 'query-string';
import {NO_DATA} from '../constants/app'
import {CardColumns, Container, Form, Row, Col, FormControl, Button} from "react-bootstrap";

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
        if (a.length !== b.length) return false;

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
        const parsed = qs.parse(nextLocation.search);
        delete parsed.category;
        parsed.sources = sources;
        fetchNews('everything', qs.stringify(parsed, {arrayFormat: 'comma'}));
    };

    formSubmitHandler = (e) => {
        e.preventDefault();
        const {history} = this.props;
        const searchValue = e.target.search.value;
        const parsed = qs.parse(history.location.search);

        parsed.sortBy = e.target.sort.value;
        if (searchValue.length > 0) {
            parsed.q = searchValue
        } else {
            delete parsed.q;
        }

        history.push({
            pathname: '/news',
            search: '?' + qs.stringify(parsed),
        });

    };


    render() {
        const {news, location, history} = this.props;
        const sortingType = [
            {name: "Newest", val: "publishedAt"},
            {name: 'Relevant ', val: 'relevancy'},
            {name: 'Most popular', val: 'popularity'}
        ];
        const renderNews = (data) => {

            return data.map((article, index) => {
                return (
                    <Suspense fallback={<div>Loading...</div>} key={index}>
                        <CardComponent article={article}/>
                    </Suspense>
                )
            })
        };

        const isNews = (news.data && news.data.totalResults !== 0);
        const parsed = qs.parse(location.search);

        return (
            <div className="news-detail">
                <Container>
                    <h1 className={'text-center'}>News in {qs.parse(this.props.location.search).category}</h1>
                    {isNews && parsed.q &&
                    <p className={'text-center'}>showing results in "{parsed.q}"</p>
                    }
                    {
                        (news.data && news.data.totalResults === 0) &&
                        <p className={'text-center'}>{NO_DATA} in "{parsed.q}"</p>
                    }
                    <Row>
                        <Col sm={2}>
                            <Form onSubmit={this.formSubmitHandler}>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Search</Form.Label>
                                    <FormControl type="text" placeholder="Search" name="search" className="mr-sm-2"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Sort</Form.Label>
                                    <Form.Control as="select" name="sort">
                                        {sortingType.map((item, index) => <option value={item.val}
                                                                                  key={index}>{item.name}</option>)}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Button variant="primary" type="submit">submit</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col sm={10}>
                            <CardColumns>
                                {news.data && renderNews(news.data.articles)}
                            </CardColumns>
                            {isNews && <Suspense fallback={<div>Loading...</div>}>
                                <PagingComponent location={location} url={'/news'}
                                                 totalItemsCount={news.data.totalResults}
                                                 itemsCountPerPage={20}
                                                 history={history}
                                                 currentItemLenght={news.data.articles.length}
                                />
                            </Suspense>}


                        </Col>
                    </Row>


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