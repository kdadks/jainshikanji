import React, { useState, useMemo } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import Header from '../components/Header';

const MenuPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietaryFilter, setSelectedDietaryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Items', count: 8 },
    { id: 'beverages', name: 'Beverages', count: 5 },
    { id: 'appetizers', name: 'Snacks', count: 3 }
  ];

  const dietaryFilters = [
    { id: 'all', name: 'All' },
    { id: 'veg', name: 'Vegetarian' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'jain', name: 'Jain' },
    { id: 'gluten-free', name: 'Gluten Free' }
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  const products = [
    {
      id: '1',
      name: 'Traditional Shikanji',
      description: 'Refreshing lemon-based drink with mint, cumin, and traditional spices',
      price: 80,
      image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'beverages',
      rating: 4.8,
      reviewCount: 245,
      spiceLevel: 'Mild',
      isVeg: true,
      isVegan: true,
      isJain: true,
      isGlutenFree: false,
      prepTime: '5-8 mins',
      tags: ['Popular', 'Traditional', 'Refreshing']
    },
    {
      id: '2',
      name: 'Masala Chaas',
      description: 'Spiced buttermilk with roasted cumin, mint, and traditional Indian spices',
      price: 60,
      image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'beverages',
      rating: 4.7,
      reviewCount: 189,
      spiceLevel: 'Mild',
      isVeg: true,
      isVegan: false,
      isJain: true,
      isGlutenFree: true,
      prepTime: '6-10 mins',
      tags: ['Traditional', 'Digestive', 'Cooling']
    },
    {
      id: '3',
      name: 'Sweet Lassi',
      description: 'Creamy yogurt-based sweet drink with cardamom and rose water',
      price: 90,
      image: 'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'beverages',
      rating: 4.9,
      reviewCount: 312,
      spiceLevel: 'Sweet',
      isVeg: true,
      isVegan: false,
      isJain: true,
      isGlutenFree: true,
      prepTime: '5-8 mins',
      tags: ['Best Seller', 'Creamy', 'Sweet']
    },
    {
      id: '4',
      name: 'Mango Lassi',
      description: 'Rich and creamy mango yogurt drink made with fresh mango pulp',
      price: 110,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'beverages',
      rating: 4.6,
      reviewCount: 156,
      spiceLevel: 'Sweet',
      isVeg: true,
      isVegan: false,
      isJain: true,
      isGlutenFree: true,
      prepTime: '6-10 mins',
      tags: ['Seasonal', 'Fruity', 'Premium']
    },
    {
      id: '5',
      name: 'Samosa (2 pcs)',
      description: 'Crispy fried pastries filled with spiced potatoes and green peas',
      price: 80,
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'appetizers',
      rating: 4.5,
      reviewCount: 98,
      spiceLevel: 'Mild',
      isVeg: true,
      isVegan: true,
      isJain: true,
      isGlutenFree: false,
      prepTime: '8-10 mins',
      tags: ['Street Food', 'Crispy']
    },
    {
      id: '6',
      name: 'Masala Chai',
      description: 'Traditional Indian spiced tea with cardamom, ginger, and aromatic spices',
      price: 30,
      image: 'https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'beverages',
      rating: 4.8,
      reviewCount: 167,
      spiceLevel: 'Mild',
      isVeg: true,
      isVegan: false,
      isJain: true,
      isGlutenFree: false,
      prepTime: '8-12 mins',
      tags: ['Traditional', 'Hot', 'Spiced']
    },
    {
      id: '7',
      name: 'Dhokla (4 pcs)',
      description: 'Steamed gram flour cake, light and fluffy, garnished with mustard seeds',
      price: 70,
      image: 'https://images.pexels.com/photos/5560525/pexels-photo-5560525.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'appetizers',
      rating: 4.6,
      reviewCount: 134,
      spiceLevel: 'Mild',
      isVeg: true,
      isVegan: false,
      isJain: true,
      isGlutenFree: true,
      prepTime: '15-20 mins',
      tags: ['Gujarati', 'Steamed', 'Healthy']
    },
    {
      id: '8',
      name: 'Kachori (2 pcs)',
      description: 'Deep-fried bread stuffed with spiced lentil filling, served with chutney',
      price: 50,
      image: 'https://images.pexels.com/photos/5560762/pexels-photo-5560762.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'appetizers',
      rating: 4.4,
      reviewCount: 98,
      spiceLevel: 'Medium',
      isVeg: true,
      isVegan: true,
      isJain: true,
      isGlutenFree: false,
      prepTime: '12-15 mins',
      tags: ['Rajasthani', 'Stuffed', 'Spicy']
    }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesDietary = selectedDietaryFilter === 'all' ||
                            (selectedDietaryFilter === 'veg' && product.isVeg) ||
                            (selectedDietaryFilter === 'vegan' && product.isVegan) ||
                            (selectedDietaryFilter === 'jain' && product.isJain) ||
                            (selectedDietaryFilter === 'gluten-free' && product.isGlutenFree);
      
      return matchesSearch && matchesCategory && matchesDietary;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // popular
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedDietaryFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-25">
      <Helmet>
        <title>Menu - Indian Food & North Indian Cuisine | Jain Shikanji Veg Restaurant</title>
        <meta name="description" content="Explore our extensive menu of authentic Indian food and North Indian cuisine. 100% vegetarian dishes, traditional Indian beverages, and Jain-friendly options. Order online for delivery in Bangalore." />
        <meta name="keywords" content="Indian food menu, North Indian cuisine menu, veg food menu, vegetarian restaurant menu, Indian dishes, traditional food, Jain food menu, Indian beverages menu, authentic Indian cuisine" />
        <link rel="canonical" href="https://jainshikanji.com/menu" />
      </Helmet>
      
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto container-padding py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Indian Food Menu
            </h1>
            <p className="text-lg lg:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Discover authentic Indian food and North Indian cuisine crafted with traditional recipes and premium ingredients
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto container-padding py-8 lg:py-12">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card-elevated p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search dishes, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-12"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn btn-secondary btn-md"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-4">
              <select
                value={selectedDietaryFilter}
                onChange={(e) => setSelectedDietaryFilter(e.target.value)}
                className="input w-40"
              >
                {dietaryFilters.map(filter => (
                  <option key={filter.id} value={filter.id}>{filter.name}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-48"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <select
                value={selectedDietaryFilter}
                onChange={(e) => setSelectedDietaryFilter(e.target.value)}
                className="input"
              >
                {dietaryFilters.map(filter => (
                  <option key={filter.id} value={filter.id}>{filter.name}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </motion.div>
          )}
        </motion.div>

        {/* Category Navigation */}
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 font-medium"
          >
            Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'dish' : 'dishes'}
          </motion.p>
          
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSearchQuery('')}
              className="btn btn-ghost btn-sm"
            >
              Clear search
            </motion.button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FunnelIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No dishes found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any dishes matching your criteria. Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDietaryFilter('all');
                setSortBy('popular');
              }}
              className="btn btn-primary btn-lg"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;