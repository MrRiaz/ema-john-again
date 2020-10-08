import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggingUser, setLoggingUser] = useContext(UserContext);
  const [paymentData, setPaymentData] = useState(null);

  const onSubmit = data => {
    setPaymentData(data);
  };

  const handlePaymentSuccess = (paymentId) => {
    const savedCart = getDatabaseCart();
    const orderDetails = { ...loggingUser, 
      products: savedCart, 
      paymentId, 
      shipment: paymentData, 
      orderTime: new Date() 
    };

    fetch('https://enigmatic-tundra-18940.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('Your order placed successfully');
        }
      })
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div style={{display: paymentData ? 'none' : 'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={loggingUser.name} ref={register({ required: true })} placeholder="Your Name" />
          {errors.name && <span className="error">name is required</span>}

          <input name="email" defaultValue={loggingUser.email} ref={register({ required: true })} placeholder="Your Email" />
          {errors.name && <span className="error">email is required</span>}

          <input name="address" ref={register({ required: true })} placeholder="Your Address" />
          {errors.name && <span className="error">Address is required</span>}

          <input name="phone" type="number" ref={register({ required: true })} placeholder="Your Phone Number" />
          {errors.name && <span className="error">Phone Number is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{display: paymentData ? 'block' : 'none'}} className="col-md-6">
        <h2>Please Pay for Buy</h2>
        <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;