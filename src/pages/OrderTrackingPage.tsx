import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircleIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useOrder } from '../context/OrderContext';
import Header from '../components/Header';

const OrderTrackingPage = () => {
  const { id } = useParams();
  const { getOrder } = useOrder();
  
  const orderDetails = getOrder(id || '');
  
  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-600">The order you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Order Confirmed';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready for Pickup';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      default: return 'Processing';
    }
  };

  const getEstimatedTime = () => {
    const now = new Date();
    const estimated = new Date(orderDetails.estimatedDelivery);
    const diffMinutes = Math.max(0, Math.floor((estimated.getTime() - now.getTime()) / (1000 * 60)));
    
    if (orderDetails.status === 'delivered') return 'Completed';
    if (diffMinutes === 0) return 'Any moment now';
    return `${diffMinutes} minutes`;
  };
  const trackingSteps = [
    { 
      title: 'Order Confirmed', 
      description: 'We received your order', 
      completed: ['confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'].includes(orderDetails.status),
      time: orderDetails.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: CheckCircleIcon 
    },
    { 
      title: 'Preparing', 
      description: 'Chef is preparing your food', 
      completed: ['preparing', 'ready', 'out_for_delivery', 'delivered'].includes(orderDetails.status),
      time: ['preparing', 'ready', 'out_for_delivery', 'delivered'].includes(orderDetails.status) ? 
        new Date(orderDetails.createdAt.getTime() + 5 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      icon: ClockIcon 
    },
    { 
      title: 'Ready for Pickup', 
      description: 'Food is ready', 
      completed: ['ready', 'out_for_delivery', 'delivered'].includes(orderDetails.status),
      time: ['ready', 'out_for_delivery', 'delivered'].includes(orderDetails.status) ? 
        new Date(orderDetails.createdAt.getTime() + 15 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      icon: CheckCircleIcon 
    },
    { 
      title: 'Out for Delivery', 
      description: 'Driver is on the way', 
      completed: ['out_for_delivery', 'delivered'].includes(orderDetails.status),
      time: ['out_for_delivery', 'delivered'].includes(orderDetails.status) ? 
        new Date(orderDetails.createdAt.getTime() + 20 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      icon: TruckIcon,
      current: orderDetails.status === 'out_for_delivery'
    },
    { 
      title: 'Delivered', 
      description: 'Enjoy your meal!', 
      completed: orderDetails.status === 'delivered',
      time: orderDetails.status === 'delivered' ? 
        new Date(orderDetails.createdAt.getTime() + 30 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      icon: CheckCircleIcon 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-gray-600 mt-2">Order #{orderDetails.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Tracking */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-600">₹{orderDetails.total}</p>
                <p className="text-sm text-gray-500">ETA: {getEstimatedTime()}</p>
              </div>
            </div>

            {/* Tracking Steps */}
            <div className="relative">
              {trackingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4 pb-8 relative"
                >
                  {/* Connector Line */}
                  {index < trackingSteps.length - 1 && (
                    <div className={`absolute left-5 top-10 w-0.5 h-12 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                  
                  {/* Icon */}
                  <div className={`relative z-10 p-2 rounded-full ${
                    step.completed 
                      ? step.current 
                        ? 'bg-orange-500 animate-pulse' 
                        : 'bg-green-500'
                      : 'bg-gray-200'
                  }`}>
                    <step.icon className={`w-6 h-6 ${
                      step.completed ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${
                        step.completed ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      {step.time && (
                        <span className="text-sm text-gray-500">{step.time}</span>
                      )}
                    </div>
                    <p className={`text-sm mt-1 ${
                      step.completed ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
              <p className="text-gray-600">{orderDetails.deliveryAddress}</p>
              {orderDetails.specialInstructions && (
                <div className="mt-2">
                  <h4 className="font-medium text-gray-900 text-sm">Special Instructions:</h4>
                  <p className="text-sm text-gray-600">{orderDetails.specialInstructions}</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-orange-600">₹{orderDetails.total}</span>
              </div>
            </div>

            {/* Contact Support */}
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">Need Help?</h3>
              <p className="text-sm text-orange-700 mb-3">Contact our support team for any assistance</p>
              <a 
                href={`tel:${orderDetails.customerPhone}`}
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 block text-center"
              >
                Chat with Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;