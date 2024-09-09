import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderCheckout from './pages/OrderCheckout';
import OrderHistory from './pages/OrderHistory';
import Confirm from './pages/Confirm';

function App() {
  return (
    <Routes>
      <Route path="/checkout" element={<OrderCheckout />} />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="/history" element={<OrderHistory />} />
    </Routes>
  );
}

export default App;

