import React from 'react';
import {Card} from 'react-bootstrap';
import * as moment from "moment";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import placeholder from '../images/placeholder.png'


const CardComponent = (props) => {
    const {article} = props;

    return (
        <Card>
            <div className={'card-image-wrapper'}>
                <LazyLoadImage
                    alt={'ahsan'}
                    height={'100%'}
                    src={article.urlToImage} // use normal <img> attributes as props
                    width={'100%'}
                    placeholderSrc={placeholder}
                />
            </div>
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

                <small className="text-muted">{moment(article.publishedAt).format('D MMM YYYY  hh:mm:ss A')}</small>
            </Card.Footer>
        </Card>
    );
};

export default CardComponent;