import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../contexts/CartContext';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CartHeader = styled.div`
  margin-bottom: 2rem;
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const ItemInfo = styled.p`
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const QuantityButton = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-color-dark);
  }

  &:disabled {
    background-color: var(--text-secondary);
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  padding: 0.25rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
`;

const RemoveButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--error-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--error-color-dark);
  }
`;

const CartSummary = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-color-dark);
  }

  &:disabled {
    background-color: var(--text-secondary);
    cursor: not-allowed;
  }
`;

const ViewOrdersButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-color-dark);
  }

  &:disabled {
    background-color: var(--text-secondary);
    cursor: not-allowed;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const ContinueShopping = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-color-dark);
  }
`;

function Cart() {
  const navigate = useNavigate();
  const { cart, loading, error, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <CartContainer>
        <EmptyCart>
          <EmptyMessage>Your cart is empty</EmptyMessage>
          <ContinueShopping onClick={() => navigate('/products')}>
            Continue Shopping
          </ContinueShopping>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartHeader>
        <CartTitle>Shopping Cart</CartTitle>
      </CartHeader>

      <CartItems>
        {cart.items.map((item) => (
          <CartItem key={item._id}>
            <ItemImage src={item.image} alt={item.name} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemInfo>Size: {item.size}</ItemInfo>
              <ItemInfo>Price: ${item.price}</ItemInfo>
              <QuantityControl>
                <QuantityButton
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </QuantityButton>
                <QuantityInput
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                  min="1"
                />
                <QuantityButton
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                >
                  +
                </QuantityButton>
              </QuantityControl>
            </ItemDetails>
            <RemoveButton onClick={() => handleRemoveItem(item._id)}>
              Remove
            </RemoveButton>
          </CartItem>
        ))}
      </CartItems>

      <CartSummary>
        <Total>
          <span>Total:</span>
          <span>${cart.total.toFixed(2)}</span>
        </Total>
        <CheckoutButton onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </CheckoutButton>
        <ViewOrdersButton onClick={() => navigate('/orders')}>
          View Order History
        </ViewOrdersButton>
      </CartSummary>
    </CartContainer>
  );
}

export default Cart; 