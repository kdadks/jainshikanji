import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCardIcon, MapPinIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const CheckoutPage = () => {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { authState } = useAuth();
  const { createOrder } = useOrder();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [deliveryAddress, setDeliveryAddress] = useState(
    authState.user?.addresses?.[0]?.address || ''
  );
  const [customerInfo, setCustomerInfo] = useState({
    name: authState.user?.name || '',
    phone: authState.user?.phone || '',
    email: authState.user?.email || '',
    specialInstructions: ''
  });

  const deliveryFee = cartState.total >= 299 ? 0 : 40;
  const tax = cartState.total * 0.05;
  const finalTotal = cartState.total + deliveryFee + tax;

  // Handle empty cart navigation
  useEffect(() => {
    if (cartState.items.length === 0) {
      navigate('/menu');
    }
  }, [cartState.items.length, navigate]);

  const paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: '📱', description: 'Pay with Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', description: 'All major banks supported' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵', description: 'Pay when you receive' }
  ];

  const handlePlaceOrder = async () => {
    if (!authState.isAuthenticated) {
      toast.error('Please login to place order');
      return;
    }

    if (!deliveryAddress.trim()) {
      toast.error('Please enter delivery address');
      return;
    }

    if (!customerInfo.name.trim() || !customerInfo.phone.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        items: cartState.items,
        subtotal: cartState.total,
        tax: tax,
        deliveryFee: deliveryFee,
        total: finalTotal,
        paymentMethod: paymentMethod.toUpperCase(),
        deliveryAddress: deliveryAddress,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email,
        specialInstructions: customerInfo.specialInstructions
      };

      const orderId = await createOrder(orderData);
      
      // Clear cart
      cartDispatch({ type: 'CLEAR_CART' });
      
      toast.success('Order placed successfully!');
      navigate(`/order-tracking/${orderId}`);
      
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Checkout - Jain Shikanji</title>
        <meta name="description" content="Complete your order for authentic Indian food and beverages" />
      </Helmet>
      
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <UserIcon className="w-6 h-6 mr-2 text-primary-600" />
                Customer Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <MapPinIcon className="w-6 h-6 mr-2 text-primary-600" />
                Delivery Address
              </h2>
              
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                rows={3}
                placeholder="Enter your complete delivery address..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={customerInfo.specialInstructions}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, specialInstructions: e.target.value })}
                  rows={2}
                  placeholder="Any special instructions for delivery or preparation..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <CreditCardIcon className="w-6 h-6 mr-2 text-primary-600" />
                Payment Method
              </h2>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      paymentMethod === method.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {cartState.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <hr className="border-gray-200 mb-4" />
            
            {/* Price Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{cartState.total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Tax & Service Charges</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-primary-500 to-warm-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-primary-600 hover:to-warm-600 transition-all duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Place Order - ₹{finalTotal.toFixed(2)}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;