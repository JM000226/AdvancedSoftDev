import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirm = () => {
  const { state } = useLocation();
  const { cart, totalPrice, paymentMethod } = state;
  const navigate = useNavigate();

  return (
    <div>
      <h1>Order Confirmation</h1>
      <div>
        <h2>Your Order</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
        <p>Total: ${totalPrice}</p>
        <p>Payment Method: {paymentMethod}</p>
      </div>
      <button onClick={() => navigate('/orderhistory')}>Go to Order History</button>
    </div>
  );
};

export default Confirm;
