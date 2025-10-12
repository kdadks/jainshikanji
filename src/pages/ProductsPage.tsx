import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, StarIcon, CheckIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const { dispatch } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const products = [
    {
      id: 'masala-shikanji',
      name: 'Masala Shikanji',
      description: 'Traditional lemon-based drink mix with authentic spices including cumin, black salt, and mint. Perfect for instant refreshment.',
      price: 299,
      originalPrice: 399,
      images: ['https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'],
      category: 'instant-mix',
      rating: 4.8,
      reviewCount: 245,
      stock: 150,
      isAvailable: true,
      productType: 'instant' as const,
      weight: '250g',
      servings: 25,
      shelfLife: '12 months',
      storageInstructions: 'Store in a cool, dry place',
      spiceLevel: 'Mild' as const,
      isVeg: true,
      isVegan: true,
      isJain: true,
      isGlutenFree: true,
      isNutFree: true,
      prepTime: '2 mins',
      tags: ['Best Seller', 'Traditional', 'Instant'],
      ingredients: ['Lemon powder', 'Black salt', 'Cumin', 'Mint', 'Sugar', 'Natural spices'],
      nutritionalInfo: {
        calories: 45,
        protein: 0.5,
        carbs: 11,
        fat: 0.1,
        fiber: 0.3,
        sodium: 180
      },
      customizations: [],
      locationAvailability: ['all'],
      features: [
        'No artificial colors or flavors',
        'Made with natural ingredients',
        'Quick preparation',
        'Refreshing taste'
      ]
    },
    {
      id: 'chai-masala',
      name: 'Premium Chai Masala',
      description: 'Aromatic blend of cardamom, ginger, cinnamon, cloves, and black pepper. Elevate your tea experience with authentic Indian flavors.',
      price: 249,
      originalPrice: 349,
      images: ['https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=800'],
      category: 'spice-mix',
      rating: 4.9,
      reviewCount: 312,
      stock: 200,
      isAvailable: true,
      productType: 'masala-mix' as const,
      weight: '200g',
      servings: 50,
      shelfLife: '18 months',
      storageInstructions: 'Store in an airtight container',
      spiceLevel: 'Medium' as const,
      isVeg: true,
      isVegan: true,
      isJain: true,
      isGlutenFree: true,
      isNutFree: true,
      prepTime: '5 mins',
      tags: ['Premium', 'Aromatic', 'Traditional'],
      ingredients: ['Cardamom', 'Ginger', 'Cinnamon', 'Cloves', 'Black pepper', 'Nutmeg'],
      nutritionalInfo: {
        calories: 15,
        protein: 0.3,
        carbs: 3.5,
        fat: 0.5,
        fiber: 1.2,
        sodium: 5
      },
      customizations: [],
      locationAvailability: ['all'],
      features: [
        'Hand-ground spices',
        'Traditional recipe',
        'Rich aroma',
        'Perfect balance of flavors'
      ]
    },
    {
      id: 'instant-shikanji',
      name: 'Instant Shikanji Powder',
      description: 'Ready-to-mix shikanji powder for quick refreshment. Just add water and enjoy authentic taste in seconds.',
      price: 199,
      originalPrice: 249,
      images: ['https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'],
      category: 'instant-mix',
      rating: 4.7,
      reviewCount: 189,
      stock: 180,
      isAvailable: true,
      productType: 'instant' as const,
      weight: '200g',
      servings: 20,
      shelfLife: '12 months',
      storageInstructions: 'Store in a cool, dry place',
      spiceLevel: 'Mild' as const,
      isVeg: true,
      isVegan: true,
      isJain: true,
      isGlutenFree: true,
      isNutFree: true,
      prepTime: '1 min',
      tags: ['Instant', 'Convenient', 'Refreshing'],
      ingredients: ['Lemon powder', 'Sugar', 'Black salt', 'Cumin powder', 'Citric acid'],
      nutritionalInfo: {
        calories: 50,
        protein: 0.3,
        carbs: 12,
        fat: 0.1,
        fiber: 0.2,
        sodium: 200
      },
      customizations: [],
      locationAvailability: ['all'],
      features: [
        'Quick & easy preparation',
        'Portable packaging',
        'Consistent taste',
        'Perfect for travel'
      ]
    },
    {
      id: 'jaggery-shikanji',
      name: 'Jaggery Shikanji Mix',
      description: 'Healthy shikanji mix sweetened with natural jaggery. A guilt-free refreshing drink with traditional flavors.',
      price: 329,
      originalPrice: 429,
      images: ['https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'],
      category: 'instant-mix',
      rating: 4.6,
      reviewCount: 156,
      stock: 120,
      isAvailable: true,
      productType: 'instant' as const,
      weight: '300g',
      servings: 30,
      shelfLife: '10 months',
      storageInstructions: 'Store in a cool, dry place away from moisture',
      spiceLevel: 'Mild' as const,
      isVeg: true,
      isVegan: true,
      isJain: true,
      isGlutenFree: true,
      isNutFree: true,
      prepTime: '2 mins',
      tags: ['Healthy', 'Natural Sweetener', 'Premium'],
      ingredients: ['Lemon powder', 'Jaggery powder', 'Black salt', 'Cumin', 'Ginger powder'],
      nutritionalInfo: {
        calories: 60,
        protein: 0.4,
        carbs: 14,
        fat: 0.1,
        fiber: 0.5,
        sodium: 150
      },
      customizations: [],
      locationAvailability: ['all'],
      features: [
        'Natural jaggery sweetener',
        'Rich in iron',
        'No refined sugar',
        'Traditional health benefits'
      ]
    },
    {
      id: 'mint-shikanji',
      name: 'Mint Shikanji Concentrate',
      description: 'Refreshing mint-infused shikanji concentrate. Dilute with water for an instant cooling drink.',
      price: 349,
      originalPrice: 449,
      images: ['https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'],
      category: 'concentrate',
      rating: 4.8,
      reviewCount: 201,
      stock: 90,
      isAvailable: true,
      productType: 'ready-to-drink' as const,
      weight: '500ml',
      servings: 15,
      shelfLife: '6 months (refrigerate after opening)',
      storageInstructions: 'Refrigerate after opening',
      spiceLevel: 'Mild' as const,
      isVeg: true,
      isVegan: true,
      isJain: true,
      isGlutenFree: true,
      isNutFree: true,
      prepTime: '1 min',
      tags: ['Concentrate', 'Mint Fresh', 'Premium'],
      ingredients: ['Fresh mint extract', 'Lemon juice', 'Sugar', 'Black salt', 'Cumin', 'Water'],
      nutritionalInfo: {
        calories: 35,
        protein: 0.2,
        carbs: 8,
        fat: 0.1,
        fiber: 0.1,
        sodium: 120
      },
      customizations: [],
      locationAvailability: ['all'],
      features: [
        'Fresh mint flavor',
        'Ready-to-use concentrate',
        'Long shelf life',
        'Cooling effect'
      ]
    },
    {
      id: 'spicy-masala',
      name: 'Spicy Shikanji Masala',
      description: 'For those who love extra heat! Special blend with extra chili and spices for a fiery shikanji experience.',
      price: 279,
      originalPrice: 379,
      images: ['https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'],
      category: 'spice-mix',
      rating: 4.5,
      reviewCount: 134,
      stock: 100,
      isAvailable: true,
      productType: 'masala-mix' as const,
      weight: '250g',
      servings: 25,
      shelfLife: '12 months',
      storageInstructions: 'Store in an airtight container',
      spiceLevel: 'Hot' as const,
      isVeg: true,
      isVegan: true,
      isJain: true,
      isGlutenFree: true,
      isNutFree: true,
      prepTime: '2 mins',
      tags: ['Spicy', 'Bold Flavor', 'Special'],
      ingredients: ['Red chili powder', 'Black salt', 'Cumin', 'Black pepper', 'Lemon powder', 'Dry mango'],
      nutritionalInfo: {
        calories: 40,
        protein: 0.6,
        carbs: 9,
        fat: 0.8,
        fiber: 1.5,
        sodium: 220
      },
      customizations: [],
      locationAvailability: ['all'],
      features: [
        'Extra spicy blend',
        'Bold flavors',
        'Metabolism booster',
        'For spice lovers'
      ]
    }
  ];

  const handleAddToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        customizations: [],
        image: product.images[0]
      }
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Our Products - Jain Shikanji | Authentic Indian Beverages & Masala Mixes</title>
        <meta name="description" content="Shop authentic Jain Shikanji products including Masala Shikanji, Chai Masala, Instant Shikanji mix, and more. 100% natural ingredients, traditional recipes, delivered to your doorstep." />
        <meta name="keywords" content="Jain Shikanji products, Masala Shikanji, Chai Masala, Instant Shikanji, Indian beverage mix, traditional masala, buy shikanji online" />
        <link rel="canonical" href="https://jainshikanji.com/products" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-6">Our Premium Products</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Authentic Indian beverages and masala mixes crafted with traditional recipes and 100% natural ingredients
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center space-x-3"
            >
              <ShieldCheckIcon className="w-10 h-10 text-orange-600" />
              <div>
                <h3 className="font-bold text-gray-900">100% Natural</h3>
                <p className="text-sm text-gray-600">No artificial additives</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center space-x-3"
            >
              <TruckIcon className="w-10 h-10 text-orange-600" />
              <div>
                <h3 className="font-bold text-gray-900">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Doorstep delivery</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center space-x-3"
            >
              <CheckIcon className="w-10 h-10 text-orange-600" />
              <div>
                <h3 className="font-bold text-gray-900">Quality Assured</h3>
                <p className="text-sm text-gray-600">Premium ingredients</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.originalPrice && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save ₹{product.originalPrice - product.price}
                  </div>
                )}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    <StarIconSolid className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviewCount})</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Product Info */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500">Weight:</span>
                    <span className="font-medium text-gray-900">{product.weight}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500">Servings:</span>
                    <span className="font-medium text-gray-900">{product.servings}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 2).map(feature => (
                      <div key={feature} className="flex items-center space-x-1 text-xs text-gray-600">
                        <CheckIcon className="w-3 h-3 text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.isAvailable || product.stock === 0}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Jain Shikanji Products?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We bring you authentic Indian flavors with a commitment to quality and tradition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Traditional Recipes', desc: 'Time-tested recipes passed down through generations' },
              { title: 'Natural Ingredients', desc: 'No artificial colors, flavors, or preservatives' },
              { title: 'Easy Preparation', desc: 'Quick and convenient for modern lifestyles' },
              { title: 'Quality Assurance', desc: 'Rigorous quality checks at every step' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckIcon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
