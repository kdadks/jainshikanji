import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CurrencyRupeeIcon, 
  ShoppingBagIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  ClockIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const AdminDashboard = () => {
  const stats = [
    { 
      title: 'Today\'s Revenue', 
      value: '₹45,230', 
      change: '+12%', 
      icon: CurrencyRupeeIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      title: 'Active Orders', 
      value: '23', 
      change: '+5', 
      icon: ShoppingBagIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      title: 'New Customers', 
      value: '18', 
      change: '+8%', 
      icon: UserGroupIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      title: 'Avg Order Value', 
      value: '₹385', 
      change: '+15%', 
      icon: ChartBarIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentOrders = [
    { id: 'ORD001', customer: 'Arjun Patel', amount: 580, status: 'Preparing', time: '2 mins ago' },
    { id: 'ORD002', customer: 'Priya Sharma', amount: 340, status: 'Ready', time: '5 mins ago' },
    { id: 'ORD003', customer: 'Raj Kumar', amount: 720, status: 'Out for Delivery', time: '8 mins ago' },
    { id: 'ORD004', customer: 'Anita Singh', amount: 450, status: 'Delivered', time: '12 mins ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Preparing': return 'bg-yellow-100 text-yellow-800';
      case 'Ready': return 'bg-blue-100 text-blue-800';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Store Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <Link
                to="/admin/orders"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-semibold text-sm">{order.id.slice(-2)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{order.customer}</h4>
                      <p className="text-sm text-gray-500">{order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{order.amount}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="space-y-4">
              <Link
                to="/admin/products"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-3"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>Manage Products</span>
              </Link>
              
              <Link
                to="/admin/orders"
                className="w-full border-2 border-orange-500 text-orange-600 p-4 rounded-lg font-medium hover:bg-orange-50 transition-all duration-200 flex items-center space-x-3"
              >
                <ClockIcon className="w-5 h-5" />
                <span>Order Management</span>
              </Link>
              
              <Link
                to="/admin/customers"
                className="w-full border-2 border-gray-300 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center space-x-3"
              >
                <UserGroupIcon className="w-5 h-5" />
                <span>Customer Management</span>
              </Link>
              
              <Link
                to="/admin/inventory"
                className="w-full border-2 border-gray-300 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center space-x-3"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>Inventory Management</span>
              </Link>
              
              <Link
                to="/admin/staff"
                className="w-full border-2 border-gray-300 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center space-x-3"
              >
                <UserGroupIcon className="w-5 h-5" />
                <span>Staff Management</span>
              </Link>
              
              <Link
                to="/admin/marketing"
                className="w-full border-2 border-gray-300 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center space-x-3"
              >
                <ChartBarIcon className="w-5 h-5" />
                <span>Marketing Campaigns</span>
              </Link>
              
              <Link
                to="/admin/reports"
                className="w-full border-2 border-gray-300 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center space-x-3"
              >
                <ChartBarIcon className="w-5 h-5" />
                <span>Reports & Analytics</span>
              </Link>
              
              <Link
                to="/admin/settings"
                className="w-full border-2 border-gray-300 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center space-x-3"
              >
                <ChartBarIcon className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </div>

            {/* Kitchen Status */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Kitchen Status</h3>
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">Avg prep time: 18 mins</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <TruckIcon className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">5 deliveries in progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;