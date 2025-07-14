import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useSearchParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { products } from '../../data/products';

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
`;

const FilterSection = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const FilterTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  font-size: 1.2rem;
  border-bottom: 2px solid #ff6b6b;
  padding-bottom: 0.5rem;
`;

const FilterGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  font-weight: 500;
`;

const FilterCheckbox = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  margin-bottom: 0.5rem;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const PriceRangeContainer = styled.div`
  padding: 1rem;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--shadow-color);
`;

const PriceRangeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PriceRangeTitle = styled.h4`
  color: var(--text-color);
  margin: 0;
  font-size: 1rem;
`;

const PriceRangeInputs = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const PriceInput = styled.input`
  width: 80px;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--card-background);
  color: var(--text-color);
  font-size: 0.9rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
  }
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const PriceRangeLabel = styled.span`
  color: var(--text-color);
  font-size: 0.9rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const ProductCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: var(--card-background);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--shadow-color);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-color);
`;

const ProductPrice = styled.p`
  margin: 0.5rem 0;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.2rem;
`;

const ProductCategory = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: var(--text-color);
  font-size: 1.2rem;
`;

const SortSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--card-background);
  color: var(--text-color);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const ClearFilters = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-dark-color);
  }
`;

const Products = () => {
  const { isDarkMode } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: [],
    subcategory: [],
    priceRange: { min: 0, max: 50000 },
    brand: [],
    sort: 'featured'
  });

  const categories = {
    "Men's Wear": ['Shirts', 'Pants', 'T-Shirts', 'Formal Wear', 'Winterwear'],
    "Women's Wear": ['Kurtis', 'Dresses', 'Tops', 'Western Wear', 'Winterwear'],
    "Kids' Wear": ['Boys', 'Girls', 'Infants', 'Teens', 'School Wear', 'Party Wear'],
    "Footwear": ['Casual', 'Formal', 'Sports', 'Sandals', 'Boots', 'Ethnic'],
    "Bags": ['Handbags', 'Backpacks', 'Laptop Bags', 'Travel Bags', 'Sports Bags'],
    "Accessories": ['Jewelry', 'Belts', 'Sunglasses', 'Wallets', 'Scarves', 'Storage']
  };

  // Load filters from URL params
  useEffect(() => {
    const category = searchParams.getAll('category');
    const subcategory = searchParams.getAll('subcategory');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const brand = searchParams.getAll('brand');
    const sort = searchParams.get('sort') || 'featured';

    setFilters({
      category,
      subcategory,
      priceRange: {
        min: minPrice ? Number(minPrice) : 0,
        max: maxPrice ? Number(maxPrice) : 50000
      },
      brand,
      sort
    });
  }, [searchParams]);

  const handleFilterChange = (type, value) => {
    const newFilters = {
      ...filters,
      [type]: value
    };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    newFilters.category.forEach(cat => params.append('category', cat));
    newFilters.subcategory.forEach(sub => params.append('subcategory', sub));
    newFilters.brand.forEach(b => params.append('brand', b));
    if (newFilters.priceRange.min > 0) params.set('minPrice', newFilters.priceRange.min);
    if (newFilters.priceRange.max < 50000) params.set('maxPrice', newFilters.priceRange.max);
    if (newFilters.sort !== 'featured') params.set('sort', newFilters.sort);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      subcategory: [],
      priceRange: { min: 0, max: 50000 },
      brand: [],
      sort: 'featured'
    });
    setSearchParams({});
  };

  const filteredProducts = products.filter(product => {
    if (filters.category.length && !filters.category.includes(product.category)) return false;
    if (filters.subcategory.length && !filters.subcategory.includes(product.subcategory)) return false;
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;
    if (filters.brand.length && !filters.brand.includes(product.brand)) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <ProductsContainer>
      <FilterSection>
        <SortSelect
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </SortSelect>

        <FilterTitle>Categories</FilterTitle>
        {Object.entries(categories).map(([category, subcategories]) => (
          <FilterGroup key={category}>
            <FilterCheckbox
              type="checkbox"
              id={category}
              checked={filters.category.includes(category)}
              onChange={(e) => {
                const newCategories = e.target.checked
                  ? [...filters.category, category]
                  : filters.category.filter(c => c !== category);
                handleFilterChange('category', newCategories);
              }}
            />
            <FilterLabel htmlFor={category}>{category}</FilterLabel>
            {filters.category.includes(category) && (
              <div style={{ marginLeft: '1.5rem' }}>
                {subcategories.map(subcategory => (
                  <CheckboxLabel key={subcategory}>
                    <FilterCheckbox
                      type="checkbox"
                      checked={filters.subcategory.includes(subcategory)}
                      onChange={(e) => {
                        const newSubcategories = e.target.checked
                          ? [...filters.subcategory, subcategory]
                          : filters.subcategory.filter(sc => sc !== subcategory);
                        handleFilterChange('subcategory', newSubcategories);
                      }}
                    />
                    {subcategory}
                  </CheckboxLabel>
                ))}
              </div>
            )}
          </FilterGroup>
        ))}

        <FilterTitle>Price Range</FilterTitle>
        <PriceRangeContainer>
          <PriceRangeInputs>
            <PriceInput
              type="number"
              value={filters.priceRange.min}
              onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, min: Number(e.target.value) })}
              placeholder="Min"
              min="0"
              max={filters.priceRange.max}
            />
            <PriceRangeLabel>to</PriceRangeLabel>
            <PriceInput
              type="number"
              value={filters.priceRange.max}
              onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, max: Number(e.target.value) })}
              placeholder="Max"
              min={filters.priceRange.min}
              max="50000"
            />
          </PriceRangeInputs>
        </PriceRangeContainer>

        <FilterTitle>Brands</FilterTitle>
        <FilterGroup>
          {['Fashion Brand', 'Denim Co', 'Traditional', 'Time Master', 'Luxury Bags', 'Glamour'].map(brand => (
            <CheckboxLabel key={brand}>
              <FilterCheckbox
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={(e) => {
                  const newBrands = e.target.checked
                    ? [...filters.brand, brand]
                    : filters.brand.filter(b => b !== brand);
                  handleFilterChange('brand', newBrands);
                }}
              />
              {brand}
            </CheckboxLabel>
          ))}
        </FilterGroup>

        <ClearFilters onClick={clearFilters}>
          Clear All Filters
        </ClearFilters>
      </FilterSection>

      <ProductGrid>
        {sortedProducts.length > 0 ? (
          sortedProducts.map(product => (
            <ProductCard key={product.id} to={`/product/${product.id}`}>
              <ProductImage src={product.image} alt={product.title} />
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>₹{product.price.toLocaleString('en-IN')}</ProductPrice>
                <ProductCategory>{product.category} - {product.subcategory}</ProductCategory>
              </ProductInfo>
            </ProductCard>
          ))
        ) : (
          <NoResults>No products found matching your filters</NoResults>
        )}
      </ProductGrid>
    </ProductsContainer>
  );
};

export default Products;