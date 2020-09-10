import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import { removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory();

    const handleOrderPlace = () => {
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder()
        history.push('/shipment')
    }

    const handleRemoveItems = (productkey) => {
        const newCart = cart.filter(pd => pd.key !== productkey);
        setCart(newCart);
        removeFromDatabaseCart(productkey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key]
            return product;
        })
        setCart(cartProduct);
    }, []);

        let thankYou;
        if(orderPlaced){
            thankYou = <img src={happyImage} alt=""/>
        }

    return (
        <div>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col className="product-container" xs={12} sm={10} md={9}>
                        <h4>Cart Items: {cart.length}</h4>
                        {
                            cart.map(pd => <ReviewItem 
                                handleRemoveItems={handleRemoveItems}
                                key={pd.key}
                                product={pd}></ReviewItem>)
                        }
                        { thankYou }
                    </Col>
                    <Col xs={12} sm={10} md={3}>
                        <Cart cart={cart}>
                            <Button onClick={() => handleOrderPlace()}>Process Order</Button>
                        </Cart>
                    </Col>
                </Row>
            </Container>
            
            
        </div>
    );
};

export default Review;