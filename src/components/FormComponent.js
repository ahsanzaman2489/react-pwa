import React from 'react';
import {Button, Col, Form, FormControl} from "react-bootstrap";


/**
 * Paging component renders pagination of list.
 * @constructor
 *
 * @param {Number} totalPageCount - total number of pages we have in list.
 * @param {Object} location - browser location object.
 */


const FormComponent = (props) => {
    const {formSubmitHandler, sortingType} = props;

    return (
        <Form onSubmit={formSubmitHandler}>
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
    );
};


export default FormComponent;