import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const HomeContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--background-color) 0%,
    var(--secondary-color) 100%
  );
`;

const HeroSection = styled.div`
  height: 600px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  animation: ${slideIn} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  span {
    color: var(--primary-color);
    display: block;
    font-size: 5rem;
    margin-top: 0.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1.2rem 3rem;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background-color: #ff5252;
  }
`;

const FeaturedSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 4rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: var(--primary-color);
    border-radius: 2px;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  padding: 1rem;
`;

const CategoryCard = styled(Link)`
  background-color: var(--card-background);
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 4px 15px var(--shadow-color);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  animation-fill-mode: both;
  position: relative;
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 8px 25px var(--shadow-color);
  }
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  &:nth-child(4) {
    animation-delay: 0.6s;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${CategoryCard}:hover & {
    transform: scale(1.1);
  }
`;

const CategoryInfo = styled.div`
  padding: 2rem;
  text-align: center;
  background: linear-gradient(
    to top,
    var(--card-background) 0%,
    transparent 100%
  );
`;

const CategoryTitle = styled.h3`
  color: var(--text-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const CategoryDescription = styled.p`
  color: var(--text-color);
  opacity: 0.8;
  font-size: 1rem;
  line-height: 1.6;
`;

const Home = () => {
  const { isDarkMode } = useTheme();

  const categories = [
    {
      title: "Men's Collection",
      description: "Discover our latest men's fashion with premium quality and style",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Women's Collection",
      description: "Explore trendy women's wear with elegant designs and comfort",
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Accessories",
      description: "Complete your look with our stunning collection of accessories",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "New Arrivals",
      description: "Be the first to explore our latest fashion additions",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Luxury Watches",
      description: "Timeless elegance with our premium watch collection",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Designer Bags",
      description: "Carry style with our exclusive designer bag collection",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Welcome to
            <span>Fashion Store</span>
          </HeroTitle>
          <HeroSubtitle>
            Discover the latest trends in fashion and accessories
          </HeroSubtitle>
          <CTAButton to="/products">Shop Now</CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturedSection>
        <SectionTitle>Featured Categories</SectionTitle>
        <CategoryGrid>
          {categories.map((category, index) => (
            <CategoryCard key={index} to="/products">
              <CategoryImage src={category.image} alt={category.title} />
              <CategoryInfo>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
              </CategoryInfo>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </FeaturedSection>
    </HomeContainer>
  );
};

export default Home; 