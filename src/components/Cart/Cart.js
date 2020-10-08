import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
        console.log(product.price, product.quantity);
    }

    const tax = total/10;
    let shipping = 0;

    if(total> 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    const grandTotal = total + tax + shipping;
    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    
    return (
        <div className="cart">
            <h2>Order Summary</h2>
            <p>Items Order: {cart.length} </p>
            <p>Product Price: $ {formatNumber(total)}</p>
            <p><small>Shipping: $ {formatNumber(shipping)} </small></p>
            <p>Tax/Vat: $ {formatNumber(tax)} </p>
            <p>Total Price: $ {formatNumber(grandTotal)} </p>
            <hr></hr>
            {/* <Link to="/review"><Button> Rerview Order</Button></Link> */}
            {
                props.children
            }
        </div>
    );
};

export default Cart;