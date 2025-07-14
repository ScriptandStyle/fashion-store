import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { getProductById } from '../../data/products';

const ProductContainer = styled.div`
  padding: 120px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: var(--background-color);
`;

const ProductContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  color: var(--text-color);
  margin: 0;
`;

const ProductPrice = styled.div`
  font-size: 1.8rem;
  color: var(--primary-color);
  font-weight: bold;
`;

const ProductDescription = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  font-size: 1.1rem;
`;

const SizeSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SizeLabel = styled.label`
  font-weight: 500;
  color: var(--text-color);
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SizeOption = styled.button`
  padding: 0.8rem 1.5rem;
  border: 2px solid var(--border-color);
  background: ${props => props.selected ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.selected ? 'white' : 'var(--text-color)'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    border-color: var(--primary-color);
    background: ${props => props.selected ? 'var(--primary-color)' : 'var(--hover-color)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: 2px solid var(--border-color);
  background: transparent;
  color: var(--text-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  
  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: var(--primary-dark-color);
  }
`;

const Quantity = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  min-width: 2rem;
  text-align: center;
  color: var(--text-color);
`;

const AddToCartButton = styled.button`
  padding: 1rem 2rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ff5252;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProductMeta = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--text-color);
  padding: 0.5rem 0;
  
  span:first-child {
    font-weight: 500;
  }
  
  span:last-child {
    color: var(--text-secondary-color);
  }
`;

const Message = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background-color: ${props => props.$error ? 'var(--error-color)' : 'var(--success-color)'};
  color: white;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setError(null);
      } else {
        setError('Product not found');
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setMessage({ type: '', text: '' });
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedSize) {
      setMessage({ type: 'error', text: 'Please select a size' });
      return;
    }

    try {
      const result = await addToCart({
        productId: product.id,
        name: product.title,
        price: product.price,
        quantity,
        image: product.image,
        size: selectedSize
      });

      if (result.success) {
        setMessage({ type: 'success', text: 'Item added to cart!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error adding item to cart' });
    }
  };

  if (loading) {
    return <ProductContainer>Loading...</ProductContainer>;
  }

  if (error || !product) {
    return <ProductContainer>{error || 'Product not found'}</ProductContainer>;
  }

  return (
    <ProductContainer>
      <ProductContent>
        <ProductImage src={product.image} alt={product.title} />
        
        <ProductInfo>
          <ProductName>{product.title}</ProductName>
          <ProductPrice>₹{product.price.toLocaleString('en-IN')}</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>
          
          {message.text && (
            <Message $error={message.type === 'error'}>
              {message.text}
            </Message>
          )}
          
          <SizeSelector>
            <SizeLabel>Select Size</SizeLabel>
            <SizeOptions>
              {product.sizes.map((size) => (
                <SizeOption
                  key={size}
                  selected={selectedSize === size}
                  onClick={() => handleSizeSelect(size)}
                  disabled={!product.availableSizes.includes(size)}
                >
                  {size}
                </SizeOption>
              ))}
            </SizeOptions>
          </SizeSelector>
          
          <QuantitySelector>
            <QuantityButton
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </QuantityButton>
            <Quantity>{quantity}</Quantity>
            <QuantityButton
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
            >
              +
            </QuantityButton>
          </QuantitySelector>
          
          <AddToCartButton onClick={handleAddToCart}>
            Add to Cart
          </AddToCartButton>
          
          <ProductMeta>
            <MetaItem>
              <span>Brand:</span>
              <span>{product.brand}</span>
            </MetaItem>
            <MetaItem>
              <span>Category:</span>
              <span>{product.category}</span>
            </MetaItem>
            <MetaItem>
              <span>Material:</span>
              <span>{product.material}</span>
            </MetaItem>
            <MetaItem>
              <span>Care Instructions:</span>
              <span>{product.care}</span>
            </MetaItem>
          </ProductMeta>
        </ProductInfo>
      </ProductContent>
    </ProductContainer>
  );
};

export default ProductDetail; 