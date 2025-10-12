import React from 'react';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  UsersIcon, 
  ShoppingBagIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const AnalyticsDashboard = () => {
  const kpis = [
    {
      title: 'Revenue Today',
      value: '₹45,230',
      change: '+12%',
      changeType: 'increase',
      icon: ArrowTrendingUpIcon
    },
    {
      title: 'Orders Today',
      value: '89',
      change: '+8%',
      changeType: 'increase',
      icon: ShoppingBagIcon
    },
    {
      title: 'Active Customers',
      value: '1,247',
      change: '+5%',
      changeType: 'increase',
      icon: UsersIcon
    },
    {
      title: 'Avg Order Value',
      value: '₹385',
      change: '+15%',
      changeType: 'increase',
      icon: ChartBarIcon
    }
  ];

  const topDishes = [
    { name: 'Butter Chicken', orders: 45, revenue: 20250, rating: 4.8 },
    { name: 'Chicken Biryani', orders: 38, revenue: 15960, rating: 4.9 },
    { name: 'Paneer Tikka Masala', orders: 32, revenue: 12160, rating: 4.7 },
    { name: 'Dal Makhani', orders: 28, revenue: 7840, rating: 4.6 },
    { name: 'Garlic Naan', orders: 56, revenue: 4480, rating: 4.5 }
  ];

  const recentActivity = [
    { time: '2 mins ago', event: 'New order #ORD001 - ₹580', type: 'order' },
    { time: '5 mins ago', event: 'Customer review - 5 stars for Butter Chicken', type: 'review' },
    { time: '8 mins ago', event: 'Order #ORD002 delivered successfully', type: 'delivery' },
    { time: '12 mins ago', event: 'New customer registration - Amit Singh', type: 'customer' },
    { time: '15 mins ago', event: 'Inventory alert - Samosa stock low', type: 'alert' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingBagIcon className="w-4 h-4 text-blue-600" />;
      case 'review': return <StarIcon className="w-4 h-4 text-yellow-600" />;
      case 'delivery': return <TruckIcon className="w-4 h-4 text-green-600" />;
      case 'customer': return <UsersIcon className="w-4 h-4 text-purple-600" />;
      case 'alert': return <ClockIcon className="w-4 h-4 text-red-600" />;
      default: return <ChartBarIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into your restaurant performance</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <kpi.icon className="w-6 h-6 text-orange-600" />
                </div>
                <span className={`text-sm font-medium ${
                  kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <p className="text-gray-600 text-sm">{kpi.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performing Dishes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Performing Dishes</h2>
            <div className="space-y-4">
              {topDishes.map((dish, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{dish.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{dish.orders} orders</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-3 h-3 text-yellow-400" />
                          <span>{dish.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{dish.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Revenue</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="p-2 bg-gray-100 rounded-full">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.event}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales Chart Placeholder */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sales Overview</h2>
          <div className="h-64 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Sales chart visualization would be implemented here</p>
              <p className="text-sm text-gray-500 mt-2">Integration with Chart.js or D3.js for production</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;