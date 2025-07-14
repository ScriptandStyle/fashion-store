import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatusSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const UpdateButton = styled.button`
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
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
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  background-color: ${props => props.$error ? 'var(--error-color)' : 'var(--success-color)'};
  color: white;
  text-align: center;
`;

const OrderStatus = ({ orderId, currentStatus, onStatusUpdate }) => {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { token } = useAuth();

  const handleStatusChange = async () => {
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });

      const response = await axios.patch(
        `/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage({ type: 'success', text: 'Order status updated successfully' });
      if (onStatusUpdate) {
        onStatusUpdate(response.data);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error updating order status'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <StatusContainer>
        <StatusSelect
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={loading}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </StatusSelect>
        <UpdateButton
          onClick={handleStatusChange}
          disabled={loading || status === currentStatus}
        >
          {loading ? 'Updating...' : 'Update Status'}
        </UpdateButton>
      </StatusContainer>
      {message.text && (
        <Message $error={message.type === 'error'}>
          {message.text}
        </Message>
      )}
    </div>
  );
};

export default OrderStatus; 