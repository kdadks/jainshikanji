import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const CartPage = () => {
  const { state: cartState, dispatch } = useCart();
  const { authState } = useAuth();
  const navigate = useNavigate();

  const deliveryFee = cartState.total >= 299 ? 0 : 40;
  const tax = cartState.total * 0.05; // 5% tax
  const finalTotal = cartState.total + deliveryFee + tax;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
      toast.success('Item removed from cart');
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const handleCheckout = () => {
    if (!authState.isAuthenticated) {
      toast.error('Please login to proceed with checkout');
      return;
    }
    
    if (cartState.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    navigate('/checkout');
  };

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-25">
        <Helmet>
          <title>Shopping Cart - Jain Shikanji</title>
          <meta name="description" content="Review your cart items and proceed to checkout for delicious Indian food and beverages" />
        </Helmet>
        <Header />
        
        <div className="max-w-4xl mx-auto container-padding py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBagIcon className="w-16 h-16 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Add some delicious Indian food and beverages to get started on your culinary journey
            </p>
            <Link
              to="/menu"
              className="btn btn-primary btn-xl group"
            >
              <span>Browse Menu</span>
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-25">
      <Helmet>
        <title>{`Shopping Cart (${cartState.items.length} items) - Jain Shikanji`}</title>
        <meta name="description" content="Review your cart items and proceed to checkout for delicious Indian food and beverages" />
      </Helmet>
      <Header />
      
      <div className="max-w-7xl mx-auto container-padding py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartState.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-xl shadow-md"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Spice Level: {item.spiceLevel}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg lg:text-xl font-bold text-orange-600">₹{item.price}</span>
                      <span className="text-sm text-gray-500">each</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-2 rounded-xl border border-gray-300 hover:bg-gray-50 hover:border-orange-300 transition-all duration-200"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-2 rounded-xl border border-gray-300 hover:bg-gray-50 hover:border-orange-300 transition-all duration-200"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Total and Remove */}
                  <div className="text-right">
                    <p className="text-lg lg:text-xl font-bold text-gray-900 mb-2">₹{item.price * item.quantity}</p>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-elevated p-6 lg:p-8 h-fit sticky top-24"
          >
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartState.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="font-semibold">₹{cartState.total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Tax & Service Charges</span>
                <span className="font-semibold">₹{tax.toFixed(2)}</span>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>

              {deliveryFee > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-700 font-medium">
                    💡 Add ₹{(299 - cartState.total).toFixed(2)} more for free delivery!
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleCheckout}
              disabled={cartState.items.length === 0}
              className="btn btn-primary btn-lg w-full group"
            >
              {!authState.isAuthenticated ? (
                <span>Login to Checkout</span>
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>

            {!authState.isAuthenticated && (
              <p className="text-sm text-gray-500 text-center mt-4">
                Please login using the user menu to complete your order
              </p>
            )}

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;