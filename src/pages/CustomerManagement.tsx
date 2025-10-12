import React, { useState } from 'react';
import { MagnifyingGlassIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { StarIcon, TrophyIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');

  const customers = [
    {
      id: '1',
      name: 'Arjun Patel',
      email: 'arjun.patel@email.com',
      phone: '+91 9876543210',
      totalOrders: 24,
      totalSpent: 12450,
      loyaltyPoints: 450,
      tier: 'Gold',
      lastOrder: '2 days ago',
      averageRating: 4.8,
      status: 'Active'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      totalOrders: 18,
      totalSpent: 8900,
      loyaltyPoints: 320,
      tier: 'Silver',
      lastOrder: '5 days ago',
      averageRating: 4.6,
      status: 'Active'
    },
    {
      id: '3',
      name: 'Raj Kumar',
      email: 'raj.kumar@email.com',
      phone: '+91 9876543212',
      totalOrders: 45,
      totalSpent: 23400,
      loyaltyPoints: 890,
      tier: 'Platinum',
      lastOrder: '1 day ago',
      averageRating: 4.9,
      status: 'VIP'
    }
  ];

  const segments = [
    { value: 'all', label: 'All Customers', count: customers.length },
    { value: 'vip', label: 'VIP', count: customers.filter(c => c.status === 'VIP').length },
    { value: 'active', label: 'Active', count: customers.filter(c => c.status === 'Active').length },
    { value: 'platinum', label: 'Platinum', count: customers.filter(c => c.tier === 'Platinum').length }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'text-purple-600 bg-purple-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      default: return 'text-bronze-600 bg-bronze-100';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = selectedSegment === 'all' || 
                          customer.status.toLowerCase() === selectedSegment ||
                          customer.tier.toLowerCase() === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-2">Manage customer relationships and loyalty programs</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <TrophyIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{customers.length}</h3>
                <p className="text-sm text-gray-600">Total Customers</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <StarIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <TrophyIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => c.status === 'VIP').length}
                </h3>
                <p className="text-sm text-gray-600">VIP Members</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <StarIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">₹14.9k</h3>
                <p className="text-sm text-gray-600">Avg Lifetime Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="flex space-x-2">
              {segments.map(segment => (
                <button
                  key={segment.value}
                  onClick={() => setSelectedSegment(segment.value)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    selectedSegment === segment.value
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  {segment.label} ({segment.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  {customer.name.charAt(0)}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColor(customer.tier)}`}>
                  {customer.tier}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">{customer.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Last order: {customer.lastOrder}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-semibold">{customer.totalOrders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-semibold text-green-600">₹{customer.totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Loyalty Points</span>
                  <span className="font-semibold text-orange-600">{customer.loyaltyPoints}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Avg Rating</span>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold">{customer.averageRating}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <button className="flex-1 flex items-center justify-center space-x-2 bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span>Email</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  <PhoneIcon className="w-4 h-4" />
                  <span>Call</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;