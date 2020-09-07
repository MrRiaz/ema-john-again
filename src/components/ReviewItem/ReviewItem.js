import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ReviewItem = (props) => {
    // console.log(props)
    const {img, name, quantity, key, price} = props.product;
    
    return (
        <div className="products">
            <Row className="align-items-center">
                <Col xs={3}>
                    <img style={{margin: '5px 0'}} src={img} alt=""/>
                </Col>
                <Col xs={9}>
                    <h6> <Link to={`/product/${key}`}> {name}</Link></h6>
                    <p>Quantity: {quantity}</p>
                    <p><small>Price: $ {price}</small></p>
                    <Button onClick={() =>props.handleRemoveItems(key)}>Remove</Button>
                </Col>
            </Row>
        </div>
    );
};

export default ReviewItem;