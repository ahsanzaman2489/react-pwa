import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as NewsActions from '../actions/newsActions';
import {CardColumns, Card, Container} from 'react-bootstrap';
import * as moment from 'moment';

// import {NO_DATA} from '../../constants/app';


class HomePage extends Component {

    componentDidMount() {
        this.props.fetchHeadLines('top-headlines', '&country=us');
    }

    render() {
        const {headlines} = this.props;
        console.log(this.props)
        const renderHeadLines = (data) => {

            return data.articles.map((article, index) => {
                return (
                    <Card key={index}>
                        <Card.Img variant="top" src={article.urlToImage}/>
                        <Card.Body>
                            <Card.Link href={article.url}>
                                <Card.Title>{article.title}</Card.Title>
                            </Card.Link>
                            {article.author && <footer className="blockquote-footer">
                                <cite title="Source Title"> {article.author} </cite>
                            </footer>}
                            <Card.Text>
                                {article.description}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>

                            <small
                                className="text-muted">{moment(article.publishedAt).format('D MMM YYYY  hh:mm:ss A')}</small>
                        </Card.Footer>
                    </Card>

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
    console.log(state)
    return {
        headlines: state.headlineReducers,
    };
};

function mapDispatchToProps(dispatch) {
    return {...bindActionCreators(NewsActions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
