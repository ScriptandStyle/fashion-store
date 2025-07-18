// Product data
export const products = [
  // Men's Wear
  {
    id: 1,
    title: "Classic White Shirt",
    price: 2499,
    description: "A timeless white shirt crafted from premium cotton. Perfect for both casual and formal occasions. Features a comfortable fit and elegant design.",
    category: "Men's Wear",
    subcategory: "Shirts",
    brand: "Fashion Brand",
    material: "100% Premium Cotton",
    care: "Machine wash cold, tumble dry low",
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    title: "Slim Fit Jeans",
    price: 3499,
    description: "Modern slim-fit jeans with perfect stretch and comfort. Made with premium denim for durability and style.",
    category: "Men's Wear",
    subcategory: "Pants",
    brand: "Denim Co",
    material: "98% Cotton, 2% Elastane",
    care: "Machine wash cold, tumble dry medium",
    sizes: ['28', '30', '32', '34', '36', '38'],
    availableSizes: ['30', '32', '34', '36'],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    title: "Premium Cotton T-Shirt",
    price: 1499,
    description: "Ultra-soft cotton t-shirt with a modern fit. Perfect for everyday wear with excellent breathability and comfort.",
    category: "Men's Wear",
    subcategory: "T-Shirts",
    brand: "Fashion Brand",
    material: "100% Premium Cotton",
    care: "Machine wash cold, tumble dry low",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  // Women's Wear
  {
    id: 4,
    title: "Floral Print Kurti",
    price: 1999,
    description: "Beautiful floral print kurti made from soft cotton fabric. Features a contemporary design with traditional elements.",
    category: "Women's Wear",
    subcategory: "Kurtis",
    brand: "Ethnic Wear",
    material: "100% Cotton",
    care: "Machine wash cold, gentle cycle",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L'],
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 5,
    title: "Designer Silk Saree",
    price: 9999,
    description: "Exquisite silk saree with intricate traditional designs. Perfect for special occasions and celebrations.",
    category: "Women's Wear",
    subcategory: "Sarees",
    brand: "Traditional",
    material: "Pure Silk",
    care: "Dry clean only",
    sizes: ['Free Size'],
    availableSizes: ['Free Size'],
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 6,
    title: "Embroidered Lehenga",
    price: 12999,
    description: "Stunning embroidered lehenga with contemporary design. Perfect for weddings and festive occasions.",
    category: "Women's Wear",
    subcategory: "Lehengas",
    brand: "Ethnic Wear",
    material: "Art Silk with Embroidery",
    care: "Dry clean only",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L'],
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  // Watches
  {
    id: 7,
    title: "Luxury Analog Watch",
    price: 14999,
    description: "Premium analog watch with genuine leather strap. Features precise Japanese movement and sapphire crystal glass.",
    category: "Watches",
    subcategory: "Analog",
    brand: "Time Master",
    material: "Stainless Steel, Leather",
    care: "Keep away from water and extreme temperatures",
    sizes: ['One Size'],
    availableSizes: ['One Size'],
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 8,
    title: "Smart Watch Pro",
    price: 9999,
    description: "Advanced smartwatch with health tracking, notifications, and GPS. Features a bright AMOLED display and long battery life.",
    category: "Watches",
    subcategory: "Smart Watches",
    brand: "Tech Time",
    material: "Aluminum, Silicone",
    care: "Clean regularly with soft cloth",
    sizes: ['One Size'],
    availableSizes: ['One Size'],
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  // Bags
  {
    id: 9,
    title: "Designer Handbag",
    price: 4999,
    description: "Elegant designer handbag with premium faux leather. Features multiple compartments and a stylish design.",
    category: "Bags",
    subcategory: "Handbags",
    brand: "Fashion Brand",
    material: "Premium Faux Leather",
    care: "Wipe clean with damp cloth",
    sizes: ['One Size'],
    availableSizes: ['One Size'],
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 10,
    title: "Travel Backpack",
    price: 3499,
    description: "Spacious travel backpack with laptop compartment and USB charging port. Perfect for travel and daily use.",
    category: "Bags",
    subcategory: "Backpacks",
    brand: "Travel Gear",
    material: "Water-resistant Polyester",
    care: "Machine wash cold",
    sizes: ['One Size'],
    availableSizes: ['One Size'],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 11,
    title: "Professional Laptop Bag",
    price: 3499,
    description: "Sleek and professional laptop bag with multiple compartments. Perfect for business professionals.",
    category: "Bags",
    subcategory: "Laptop Bags",
    brand: "Tech Gear",
    material: "Premium Leather and Nylon",
    care: "Wipe clean with damp cloth",
    sizes: ['One Size'],
    availableSizes: ['One Size'],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 12,
    title: "Gold Plated Necklace",
    price: 4499,
    description: "Elegant gold plated necklace with intricate design. Perfect for special occasions.",
    category: "Accessories",
    subcategory: "Jewelry",
    brand: "Glamour",
    material: "Gold Plated Metal",
    care: "Store in jewelry box, avoid water contact",
    sizes: ['One Size'],
    availableSizes: ['One Size'],
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 13,
    title: "Leather Belt",
    price: 1999,
    description: "Premium leather belt with classic buckle. Versatile accessory for any outfit.",
    category: "Accessories",
    subcategory: "Belts",
    brand: "Fashion Brand",
    material: "Genuine Leather",
    care: "Clean with leather conditioner",
    sizes: ['28', '30', '32', '34', '36', '38'],
    availableSizes: ['30', '32', '34', '36'],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 14,
    title: "Designer Sunglasses",
    price: 6499,
    description: "Stylish designer sunglasses with UV protection. Perfect blend of style and functionality.",
    category: "Accessories",
    subcategory: "Sunglasses",
    brand: "Luxury Fashion",
    material: "Metal Frame, Polarized Lenses",
    care: "Clean with microfiber cloth",
    sizes: ['One Size'],
    availableSizes: ['One Size'],
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 15,
    title: "Premium Denim Jacket",
    price: 5999,
    description: "Stylish denim jacket with modern fit. Perfect for casual outings and layering.",
    category: "Men's Wear",
    subcategory: "Jackets",
    brand: "Denim Co",
    material: "100% Cotton Denim",
    care: "Machine wash cold, tumble dry low",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 16,
    title: "Woolen Sweater",
    price: 3999,
    description: "Warm and comfortable woolen sweater. Perfect for winter weather.",
    category: "Men's Wear",
    subcategory: "Sweaters",
    brand: "Winter Wear",
    material: "100% Wool",
    care: "Dry clean only",
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['M', 'L', 'XL'],
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

// Get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};
