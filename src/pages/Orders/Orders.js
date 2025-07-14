import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import OrderStatusComponent from '../../components/OrderStatus';

const OrdersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const OrderCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow: hidden;
`;

const OrderHeader = styled.div`
  background: var(--primary-color);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderNumber = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const OrderDate = styled.span`
  font-size: 0.9rem;
`;

const OrderStatusBadge = styled.span`
  background: ${props => {
    switch (props.$status) {
      case 'pending':
        return 'var(--warning-color)';
      case 'processing':
        return 'var(--info-color)';
      case 'shipped':
        return 'var(--primary-color)';
      case 'delivered':
        return 'var(--success-color)';
      case 'cancelled':
        return 'var(--error-color)';
      default:
        return 'var(--text-secondary)';
    }
  }};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  text-transform: capitalize;
`;

const OrderContent = styled.div`
  padding: 1.5rem;
`;

const OrderItems = styled.div`
  margin-bottom: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
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

const ItemName = styled.h4`
  margin: 0;
  color: var(--text-primary);
`;

const ItemInfo = styled.p`
  margin: 0.25rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const OrderSummary = styled.div`
  background: var(--bg-primary);
  padding: 1rem;
  border-radius: 4px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border-color);
    font-weight: bold;
  }
`;

const ShippingAddress = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
`;

const AddressTitle = styled.h4`
  margin: 0 0 1rem 0;
  color: var(--text-primary);
`;

const AddressDetails = styled.p`
  margin: 0.25rem 0;
  color: var(--text-secondary);
`;

const Message = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: ${props => props.$error ? 'var(--error-color)' : 'var(--success-color)'};
  color: white;
  text-align: center;
`;

const AdminControls = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
`;

const AdminTitle = styled.h4`
  margin: 0 0 1rem 0;
  color: var(--text-primary);
`;

const Orders = () => {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handleStatusUpdate = (updatedOrder) => {
    setOrders(orders.map(order => 
      order._id === updatedOrder._id ? updatedOrder : order
    ));
  };

  if (loading) {
    return <OrdersContainer>Loading...</OrdersContainer>;
  }

  if (error) {
    return (
      <OrdersContainer>
        <Message $error>{error}</Message>
      </OrdersContainer>
    );
  }

  if (orders.length === 0) {
    return (
      <OrdersContainer>
        <h1>My Orders</h1>
        <Message>You haven't placed any orders yet.</Message>
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <h1>My Orders</h1>
      {orders.map((order) => (
        <OrderCard key={order._id}>
          <OrderHeader>
            <OrderNumber>Order #{order._id.slice(-6).toUpperCase()}</OrderNumber>
            <OrderDate>
              {new Date(order.createdAt).toLocaleDateString()}
            </OrderDate>
            <OrderStatusBadge $status={order.status}>{order.status}</OrderStatusBadge>
          </OrderHeader>
          <OrderContent>
            <OrderItems>
              {order.items.map((item, index) => (
                <OrderItem key={index}>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemInfo>Size: {item.size}</ItemInfo>
                    <ItemInfo>Quantity: {item.quantity}</ItemInfo>
                    <ItemInfo>Price: ${item.price}</ItemInfo>
                  </ItemDetails>
                </OrderItem>
              ))}
            </OrderItems>
            <OrderSummary>
              <SummaryRow>
                <span>Payment Method:</span>
                <span>{order.paymentMethod.replace('_', ' ').toUpperCase()}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </SummaryRow>
            </OrderSummary>
            <ShippingAddress>
              <AddressTitle>Shipping Address</AddressTitle>
              <AddressDetails>{order.shippingAddress.street}</AddressDetails>
              <AddressDetails>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </AddressDetails>
              <AddressDetails>{order.shippingAddress.country}</AddressDetails>
            </ShippingAddress>
            {user?.role === 'admin' && (
              <AdminControls>
                <AdminTitle>Admin Controls</AdminTitle>
                <OrderStatusComponent
                  orderId={order._id}
                  currentStatus={order.status}
                  onStatusUpdate={handleStatusUpdate}
                />
              </AdminControls>
            )}
          </OrderContent>
        </OrderCard>
      ))}
    </OrdersContainer>
  );
};

export default Orders; 