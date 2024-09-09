import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderCheckout = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Pizza", quantity: 2, price: 15 },
    { id: 2, name: "Soda", quantity: 1, price: 2 },
  ]);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/payment', { cart, paymentMethod });
      navigate('/confirm', { state: { cart, totalPrice, paymentMethod } });
    } catch (error) {
      setError("Payment failed. Please try again.");
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCart([]);
    navigate('/'); 
  };

  return (
    <div>
      <h1>Order Checkout</h1>
      <div>
        <h2>Your Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
        <p>Total: ${totalPrice}</p>
      </div>

      <div>
        <h2>Payment Method</h2>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bitcoin">Bitcoin</option>
        </select>
      </div>

      <button onClick={handleConfirm} disabled={loading}>
        {loading ? 'Processing...' : 'Confirm Order'}
      </button>
      <button onClick={handleCancel}>Cancel</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default OrderCheckout;
