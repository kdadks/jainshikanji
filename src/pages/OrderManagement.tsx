import React, { useState } from 'react';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  TruckIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PrinterIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Header from '../components/Header';

const OrderManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customer: {
        name: 'Arjun Patel',
        phone: '+91 9876543210',
        email: 'arjun.patel@email.com'
      },
      items: [
        { name: 'Butter Chicken', quantity: 1, price: 450 },
        { name: 'Garlic Naan', quantity: 2, price: 80 },
        { name: 'Basmati Rice', quantity: 1, price: 120 }
      ],
      total: 650,
      status: 'preparing',
      orderTime: '2024-01-15T14:30:00Z',
      estimatedTime: '25 mins',
      location: 'MG Road',
      paymentStatus: 'completed',
      deliveryAddress: '123 MG Road, Bangalore',
      specialInstructions: 'Extra spicy, no onions'
    },
    {
      id: 'ORD002',
      customer: {
        name: 'Priya Sharma',
        phone: '+91 9876543211',
        email: 'priya.sharma@email.com'
      },
      items: [
        { name: 'Paneer Tikka Masala', quantity: 1, price: 380 },
        { name: 'Roti', quantity: 3, price: 60 }
      ],
      total: 440,
      status: 'ready',
      orderTime: '2024-01-15T14:25:00Z',
      estimatedTime: '5 mins',
      location: 'MG Road',
      paymentStatus: 'completed',
      deliveryAddress: '456 Koramangala, Bangalore',
      specialInstructions: 'Mild spice level'
    },
    {
      id: 'ORD003',
      customer: {
        name: 'Raj Kumar',
        phone: '+91 9876543212',
        email: 'raj.kumar@email.com'
      },
      items: [
        { name: 'Chicken Biryani', quantity: 2, price: 420 },
        { name: 'Raita', quantity: 2, price: 80 }
      ],
      total: 840,
      status: 'out_for_delivery',
      orderTime: '2024-01-15T14:15:00Z',
      estimatedTime: '15 mins',
      location: 'Koramangala',
      paymentStatus: 'completed',
      deliveryAddress: '789 Indiranagar, Bangalore',
      specialInstructions: ''
    },
    {
      id: 'ORD004',
      customer: {
        name: 'Anita Singh',
        phone: '+91 9876543213',
        email: 'anita.singh@email.com'
      },
      items: [
        { name: 'Dal Makhani', quantity: 1, price: 280 },
        { name: 'Jeera Rice', quantity: 1, price: 150 }
      ],
      total: 430,
      status: 'delivered',
      orderTime: '2024-01-15T13:45:00Z',
      estimatedTime: 'Completed',
      location: 'MG Road',
      paymentStatus: 'completed',
      deliveryAddress: '321 Whitefield, Bangalore',
      specialInstructions: 'Call before delivery'
    }
  ]);

  const statuses = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { value: 'preparing', label: 'Preparing', count: orders.filter(o => o.status === 'preparing').length },
    { value: 'ready', label: 'Ready', count: orders.filter(o => o.status === 'ready').length },
    { value: 'out_for_delivery', label: 'Out for Delivery', count: orders.filter(o => o.status === 'out_for_delivery').length },
    { value: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
  ];

  const locations = ['all', 'MG Road', 'Koramangala'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'out_for_delivery': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <ClockIcon className="w-4 h-4" />;
      case 'preparing': return <ClockIcon className="w-4 h-4" />;
      case 'ready': return <CheckCircleIcon className="w-4 h-4" />;
      case 'out_for_delivery': return <TruckIcon className="w-4 h-4" />;
      case 'delivered': return <CheckCircleIcon className="w-4 h-4" />;
      case 'cancelled': return <XCircleIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} status updated to ${newStatus.replace('_', ' ')}`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || order.location === selectedLocation;
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">Track and manage all customer orders in real-time</p>
        </div>

        {/* Status Tabs */}
        <div className="flex overflow-x-auto pb-2 scrollbar-hide mb-8">
          <div className="flex space-x-4 min-w-max">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => setSelectedStatus(status.value)}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedStatus === status.value
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md'
                }`}
              >
                <span>{status.label}</span>
                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                  selectedStatus === status.value
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {status.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders or customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>

            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-2">
              <PrinterIcon className="w-5 h-5" />
              <span>Print Kitchen Orders</span>
            </button>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">#{order.id}</h3>
                  <p className="text-sm text-gray-500">{new Date(order.orderTime).toLocaleTimeString()}</p>
                </div>
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span>{order.status.replace('_', ' ').toUpperCase()}</span>
                </span>
              </div>

              {/* Customer Info */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900">{order.customer.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <PhoneIcon className="w-4 h-4" />
                  <span>{order.customer.phone}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{order.deliveryAddress}</p>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h5 className="font-medium text-gray-900 mb-2">Items:</h5>
                <div className="space-y-1">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                {order.specialInstructions && (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-xs text-yellow-800">
                      <strong>Special Instructions:</strong> {order.specialInstructions}
                    </p>
                  </div>
                )}
              </div>

              {/* Order Total */}
              <div className="flex justify-between items-center mb-4 pt-2 border-t border-gray-200">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-orange-600">₹{order.total}</span>
              </div>

              {/* Status Actions */}
              <div className="space-y-2">
                {order.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                  >
                    Start Preparing
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200"
                  >
                    Mark Ready
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                    className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors duration-200"
                  >
                    Out for Delivery
                  </button>
                )}
                {order.status === 'out_for_delivery' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'delivered')}
                    className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
                  >
                    Mark Delivered
                  </button>
                )}
                
                <div className="flex space-x-2">
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                    Print
                  </button>
                  <button className="flex-1 border border-orange-500 text-orange-600 py-2 px-4 rounded-lg font-medium hover:bg-orange-50 transition-colors duration-200">
                    Contact
                  </button>
                </div>
              </div>

              {/* Time Info */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  {order.status === 'delivered' ? 'Completed' : `ETA: ${order.estimatedTime}`}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('all');
                setSelectedLocation('all');
              }}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;