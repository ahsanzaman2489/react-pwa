import React from 'react';
import {Card} from 'react-bootstrap';
import * as moment from "moment";


const CardComponent = (props) => {
    const {article} = props;
    return (
        <Card>
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
    );
};

export default CardComponent;