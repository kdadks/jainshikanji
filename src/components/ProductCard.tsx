import React, { useState } from 'react';
import { StarIcon, PlusIcon, HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  spiceLevel: string;
  isVeg: boolean;
  isVegan: boolean;
  isJain: boolean;
  isGlutenFree: boolean;
  prepTime: string;
  tags: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        spiceLevel: product.spiceLevel,
        customizations: [],
        image: product.image
      }
    });

    toast.success(`${product.name} added to cart!`, {
      duration: 3000,
      style: {
        background: '#f97316',
        color: 'white',
        borderRadius: '12px',
        padding: '12px 16px',
        fontWeight: '500'
      }
    });
    
    // Animate cart button
    setTimeout(() => {
      const cartButton = document.querySelector('[data-cart-button]');
      if (cartButton) {
        cartButton.classList.add('animate-bounce');
        setTimeout(() => cartButton.classList.remove('animate-bounce'), 1000);
      }
    }, 100);
    
    setIsAdding(false);
  };

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case 'Mild': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hot': return 'bg-red-100 text-red-800 border-red-200';
      case 'Sweet': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDietaryBadges = () => {
    const badges = [];
    if (product.isVeg) badges.push({ text: 'VEG', color: 'bg-green-100 text-green-800 border-green-200' });
    if (product.isVegan) badges.push({ text: 'VEGAN', color: 'bg-green-100 text-green-800 border-green-200' });
    if (product.isJain) badges.push({ text: 'JAIN', color: 'bg-blue-100 text-blue-800 border-blue-200' });
    if (product.isGlutenFree) badges.push({ text: 'GLUTEN FREE', color: 'bg-purple-100 text-purple-800 border-purple-200' });
    return badges;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="card-elevated overflow-hidden hover-lift group-hover:border-orange-200">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {isFavorite ? (
              <HeartIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartOutline className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.tags.slice(0, 1).map((tag, index) => (
              <span
                key={index}
                className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
            <div className="flex items-center space-x-1">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold text-gray-900">{product.rating}</span>
              <span className="text-xs text-gray-600">({product.reviewCount})</span>
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200 line-clamp-1">
                {product.name}
              </h3>
              <div className="flex items-center space-x-2 mb-3">
                <span className={`badge border ${getSpiceLevelColor(product.spiceLevel)}`}>
                  {product.spiceLevel}
                </span>
                <span className="text-xs text-gray-500 font-medium">{product.prepTime}</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Dietary Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {getDietaryBadges().slice(0, 3).map((badge, index) => (
              <span
                key={index}
                className={`badge border text-xs font-semibold ${badge.color}`}
              >
                {badge.text}
              </span>
            ))}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="btn btn-primary btn-md w-full group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? (
              <>
                <div className="loading-spinner mr-2"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4 mr-2" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;