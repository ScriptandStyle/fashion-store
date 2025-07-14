import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f8f9fa'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  padding: 3rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0 2rem;
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
    text-decoration: none;
    
    &:hover {
      color: #ff6b6b;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  font-size: 1.5rem;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <FooterContainer theme={isDarkMode ? 'dark' : 'light'}>
      <FooterContent>
        <FooterSection theme={isDarkMode ? 'dark' : 'light'}>
          <h3>About Us</h3>
          <ul>
            <li><a href="/about">About FashionStore</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/press">Press</a></li>
          </ul>
        </FooterSection>

        <FooterSection theme={isDarkMode ? 'dark' : 'light'}>
          <h3>Customer Service</h3>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/shipping">Shipping & Returns</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </FooterSection>

        <FooterSection theme={isDarkMode ? 'dark' : 'light'}>
          <h3>Categories</h3>
          <ul>
            <li><a href="/men">Men's Fashion</a></li>
            <li><a href="/women">Women's Fashion</a></li>
            <li><a href="/accessories">Accessories</a></li>
          </ul>
        </FooterSection>

        <FooterSection theme={isDarkMode ? 'dark' : 'light'}>
          <h3>Connect With Us</h3>
          <SocialLinks>
            <SocialIcon href="#" theme={isDarkMode ? 'dark' : 'light'}>📱</SocialIcon>
            <SocialIcon href="#" theme={isDarkMode ? 'dark' : 'light'}>📘</SocialIcon>
            <SocialIcon href="#" theme={isDarkMode ? 'dark' : 'light'}>📸</SocialIcon>
            <SocialIcon href="#" theme={isDarkMode ? 'dark' : 'light'}>🐦</SocialIcon>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 