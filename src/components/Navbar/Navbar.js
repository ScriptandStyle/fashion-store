import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: var(--card-background);
  box-shadow: 0 2px 8px var(--shadow-color);
  z-index: 1000;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const CartIcon = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const CartCount = styled.span`
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 18px;
  text-align: center;
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--shadow-color);
  padding: 0.5rem;
  min-width: 150px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  animation: fadeIn 0.3s ease;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--hover-color);
    color: white;
    border-radius: 4px;
  }
`;

const LogoutButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  color: var(--text-color);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--hover-color);
    color: white;
    border-radius: 4px;
  }
`;

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <NavbarContainer>
      <NavContent>
        <Logo to="/">Fashion Store</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <CartIcon to="/cart">
            🛒
            {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
          </CartIcon>
          {isAuthenticated ? (
            <>
              <UserMenu>
                <UserButton onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                  {user?.name || 'User'} ▼
                </UserButton>
                <UserDropdown $isOpen={isUserMenuOpen}>
                  <DropdownItem to="/profile">Profile</DropdownItem>
                  <DropdownItem to="/orders">Orders</DropdownItem>
                  <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                </UserDropdown>
              </UserMenu>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
          <ThemeToggle onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
          </ThemeToggle>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar; 