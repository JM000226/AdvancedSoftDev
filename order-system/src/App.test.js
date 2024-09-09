import { render, screen } from '@testing-library/react';
import OrderCheckout from './OrderCheckout';

test('renders cart items and total price', () => {
  render(<OrderCheckout />);
  const cartItem = screen.getByText(/Pizza/i);
  expect(cartItem).toBeInTheDocument();
  const totalPrice = screen.getByText(/Total: \$32/i); 
  expect(totalPrice).toBeInTheDocument();
});
