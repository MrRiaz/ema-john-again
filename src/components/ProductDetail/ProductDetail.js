import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Shop from '../Shop/Shop';
import gif from '../../images/loading spinner.gif';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    document.title = "Product Detail";
    useEffect(() => {
        fetch('https://enigmatic-tundra-18940.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
            setLoading(false);
        })
    }, [productKey]);
    return (
        <div>
            <h3>Product detail of {productKey} </h3>
            {
                loading ? <div> <img src={gif} alt=""/> </div> : <Shop 
                ShowAddtoCart = {false}
                product = {product}>
    
                </Shop>
            }
        </div>
    );
}

export default ProductDetail;