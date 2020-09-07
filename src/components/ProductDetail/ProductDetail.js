import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Shop from '../Shop/Shop';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey)
    return (
        <div>
            <h3>Product detail of {productKey} </h3>
            <Shop 
            ShowAddtoCart = {false}
            product = {product}>

            </Shop>
        </div>
    );
};

export default ProductDetail;