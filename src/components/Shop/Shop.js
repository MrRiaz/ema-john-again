import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = (props) => {
    const {img, name, price, seller, key} = props.product;
    // console.log(props);
    return (
        <div className="products">
            <Row className="align-items-center">
                <Col xs={12} md={3}>
                    <img style={{margin: '5px 0'}} src={img} alt=""/>
                </Col>
                <Col xs={12} md={9}>
                    <h6> <Link to={`/product/${key}`}> {name}</Link></h6>
                    <p>Seller: {seller}</p>
                    <p>Price: $ {price} </p>
                    {props.showAddtoCart && <Button 
                        onClick={()=> props.handleAddtoCart(props.product)}>
                        Add to Cart
                        </Button>}
                </Col>
            </Row>
        </div>
    );
};

export default Shop;