import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CheckoutForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--text-primary);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const OrderSummary = styled.div`
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  margin: 0;
  color: var(--text-primary);
`;

const ItemInfo = styled.p`
  margin: 0.25rem 0;
  color: var(--text-secondary);
`;

const Total = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: var(--text-primary);
`;

const PlaceOrderButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background: var(--primary-color-dark);
  }
  
  &:disabled {
    background: var(--text-secondary);
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: ${props => props.$error ? 'var(--error-color)' : 'var(--success-color)'};
  color: white;
  text-align: center;
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, loading: cartLoading } = useCart();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    paymentMethod: 'credit_card'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validate form data
    const { shippingAddress, paymentMethod } = formData;
    const requiredFields = ['street', 'city', 'state', 'zipCode', 'country'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field]);

    if (missingFields.length > 0) {
      setMessage({
        type: 'error',
        text: `Please fill in all required fields: ${missingFields.join(', ')}`
      });
      setLoading(false);
      return;
    }

    if (!paymentMethod) {
      setMessage({
        type: 'error',
        text: 'Please select a payment method'
      });
      setLoading(false);
      return;
    }

    try {
      console.log('Submitting order with data:', formData);
      console.log('Auth token:', token);
      console.log('Cart data:', cart);

      if (!token) {
        throw new Error('Authentication token is missing');
      }

      if (!cart || !cart.items || cart.items.length === 0) {
        throw new Error('Cart is empty or invalid');
      }

      // Log the complete request data
      const requestData = {
        shippingAddress: formData.shippingAddress,
        paymentMethod: formData.paymentMethod
      };
      console.log('Request data being sent:', JSON.stringify(requestData, null, 2));
      console.log('Request headers:', {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      const response = await axios.post('/api/orders', requestData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Order created successfully:', response.data);
      setMessage({ type: 'success', text: 'Order placed successfully!' });
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (error) {
      console.error('Order creation error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      console.error('Request config:', error.config);
      console.error('Request data that failed:', formData);
      console.error('Cart data at time of error:', cart);
      
      let errorMessage = 'Error placing order';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
        if (error.response.data.details) {
          const details = Object.entries(error.response.data.details)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          errorMessage += ` (${details})`;
        }
      } else if (error.message === 'Authentication token is missing') {
        errorMessage = 'Please log in to place an order';
      } else if (error.message === 'Cart is empty or invalid') {
        errorMessage = 'Your cart is empty or invalid';
      }

      setMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) {
    return <div>Loading...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <CheckoutContainer>
        <Message $error>Your cart is empty</Message>
        <PlaceOrderButton onClick={() => navigate('/products')}>
          Continue Shopping
        </PlaceOrderButton>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <h1>Checkout</h1>
      {message.text && (
        <Message $error={message.type === 'error'}>
          {message.text}
        </Message>
      )}
      <CheckoutForm onSubmit={handleSubmit}>
        <div>
          <FormSection>
            <SectionTitle>Shipping Information</SectionTitle>
            <FormGroup>
              <Label htmlFor="street">Street Address</Label>
              <Input
                type="text"
                id="street"
                name="shippingAddress.street"
                value={formData.shippingAddress.street}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="city">City</Label>
              <Input
                type="text"
                id="city"
                name="shippingAddress.city"
                value={formData.shippingAddress.city}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="state">State</Label>
              <Input
                type="text"
                id="state"
                name="shippingAddress.state"
                value={formData.shippingAddress.state}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                type="text"
                id="zipCode"
                name="shippingAddress.zipCode"
                value={formData.shippingAddress.zipCode}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="country">Country</Label>
              <Input
                type="text"
                id="country"
                name="shippingAddress.country"
                value={formData.shippingAddress.country}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>Payment Method</SectionTitle>
            <FormGroup>
              <Label htmlFor="paymentMethod">Select Payment Method</Label>
              <Select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required
              >
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="upi">UPI</option>
                <option value="net_banking">Net Banking</option>
              </Select>
            </FormGroup>
          </FormSection>
        </div>

        <OrderSummary>
          <SectionTitle>Order Summary</SectionTitle>
          {cart.items.map((item) => (
            <OrderItem key={item._id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemInfo>Size: {item.size}</ItemInfo>
                <ItemInfo>Quantity: {item.quantity}</ItemInfo>
                <ItemInfo>Price: ${item.price}</ItemInfo>
              </ItemDetails>
            </OrderItem>
          ))}
          <Total>
            <span>Total:</span>
            <span>${cart.total.toFixed(2)}</span>
          </Total>
          <PlaceOrderButton type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </PlaceOrderButton>
        </OrderSummary>
      </CheckoutForm>
    </CheckoutContainer>
  );
};

export default Checkout; 