import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Your Order History</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3>Order {order.id}</h3>
              <p>Date: {order.date}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} - {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
              <p>Total: ${order.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
