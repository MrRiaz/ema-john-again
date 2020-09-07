import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Cart from '../Cart/Cart';
import Shop from '../Shop/Shop';
import fakeData from '../../fakeData';
import './Home.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Home = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);


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

    // useEffect(() => {
    //     const savedCart = getDatabaseCart();
    //     const productKeys = Object.keys[savedCart];
    //     const previousCart = productKeys.map(key => {
    //         const product = fakeData.find(pd => pd.key === key);
    //         product.quantity = savedCart[key];
    //         return product;
    //     });
    //         setCart(previousCart);
    // }, [])

    const handleAddtoCart = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart=[...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col className="product-container" xs={12} sm={10} md={9}>
                        {
                            products.map(pd => <Shop 
                                key = {pd.key}
                                showAddtoCart = {true}
                                handleAddtoCart={handleAddtoCart}
                                product={pd}
                                ></Shop> )
                        }
                    </Col>
                    <Col xs={12} sm={10} md={3}>
                        <Cart cart={cart}>
                            <Link to={"/review"}>
                                <Button>Review Order</Button>
                            </Link>
                        </Cart>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;