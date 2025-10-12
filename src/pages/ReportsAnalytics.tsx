import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const ReportsAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedReport, setSelectedReport] = useState('sales');

  const periods = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const reportTypes = [
    { value: 'sales', label: 'Sales Report' },
    { value: 'customers', label: 'Customer Analytics' },
    { value: 'products', label: 'Product Performance' },
    { value: 'operations', label: 'Operations Report' },
    { value: 'financial', label: 'Financial Summary' }
  ];

  const salesData = {
    totalRevenue: 245680,
    totalOrders: 1247,
    averageOrderValue: 385,
    growthRate: 12.5,
    topProducts: [
      { name: 'Butter Chicken', sales: 45230, orders: 156, growth: 15.2 },
      { name: 'Chicken Biryani', sales: 38940, orders: 134, growth: 8.7 },
      { name: 'Paneer Tikka Masala', sales: 32150, orders: 118, growth: 22.1 },
      { name: 'Dal Makhani', sales: 28760, orders: 142, growth: -3.2 },
      { name: 'Garlic Naan', sales: 15680, orders: 298, growth: 18.9 }
    ],
    hourlyData: [
      { hour: '9 AM', orders: 12, revenue: 4560 },
      { hour: '10 AM', orders: 18, revenue: 6840 },
      { hour: '11 AM', orders: 25, revenue: 9625 },
      { hour: '12 PM', orders: 45, revenue: 17325 },
      { hour: '1 PM', orders: 52, revenue: 20020 },
      { hour: '2 PM', orders: 38, revenue: 14630 },
      { hour: '3 PM', orders: 22, revenue: 8470 },
      { hour: '4 PM', orders: 15, revenue: 5775 },
      { hour: '5 PM', orders: 28, revenue: 10780 },
      { hour: '6 PM', orders: 41, revenue: 15785 },
      { hour: '7 PM', orders: 58, revenue: 22330 },
      { hour: '8 PM', orders: 62, revenue: 23870 },
      { hour: '9 PM', orders: 48, revenue: 18480 },
      { hour: '10 PM', orders: 35, revenue: 13475 }
    ]
  };

  const customerData = {
    totalCustomers: 8945,
    newCustomers: 234,
    returningCustomers: 1013,
    retentionRate: 68.5,
    segments: [
      { name: 'VIP Customers', count: 156, percentage: 1.7, revenue: 89450 },
      { name: 'Regular Customers', count: 2341, percentage: 26.2, revenue: 156780 },
      { name: 'Occasional Customers', count: 4567, percentage: 51.1, revenue: 98340 },
      { name: 'New Customers', count: 1881, percentage: 21.0, revenue: 45230 }
    ],
    demographics: [
      { ageGroup: '18-25', count: 1789, percentage: 20.0 },
      { ageGroup: '26-35', count: 3578, percentage: 40.0 },
      { ageGroup: '36-45', count: 2236, percentage: 25.0 },
      { ageGroup: '46-55', count: 894, percentage: 10.0 },
      { ageGroup: '55+', count: 448, percentage: 5.0 }
    ]
  };

  const operationalData = {
    averagePreparationTime: 18.5,
    averageDeliveryTime: 32.4,
    orderAccuracy: 96.8,
    customerSatisfaction: 4.6,
    peakHours: [
      { time: '12:00-13:00', orders: 156, efficiency: 92 },
      { time: '13:00-14:00', orders: 189, efficiency: 88 },
      { time: '19:00-20:00', orders: 234, efficiency: 85 },
      { time: '20:00-21:00', orders: 267, efficiency: 82 }
    ],
    staffPerformance: [
      { name: 'Kitchen Team A', orders: 456, avgTime: 16.2, accuracy: 98.1 },
      { name: 'Kitchen Team B', orders: 423, avgTime: 18.7, accuracy: 96.5 },
      { name: 'Delivery Team', deliveries: 789, avgTime: 28.3, rating: 4.7 }
    ]
  };

  const renderSalesReport = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">+{salesData.growthRate}%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">₹{salesData.totalRevenue.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Total Revenue</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center space-x-1 text-blue-600">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">+8.2%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{salesData.totalOrders.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Total Orders</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center space-x-1 text-purple-600">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">+4.1%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">₹{salesData.averageOrderValue}</h3>
          <p className="text-gray-600 text-sm">Average Order Value</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex items-center space-x-1 text-orange-600">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">+{salesData.growthRate}%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{salesData.growthRate}%</h3>
          <p className="text-gray-600 text-sm">Growth Rate</p>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Performing Products</h2>
        <div className="space-y-4">
          {salesData.topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.orders} orders</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₹{product.sales.toLocaleString()}</p>
                <div className={`flex items-center space-x-1 ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.growth >= 0 ? (
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(product.growth)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Sales Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Hourly Sales Distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {salesData.hourlyData.map((data, index) => (
            <div key={index} className="text-center">
              <div className="bg-orange-100 rounded-lg p-3 mb-2">
                <div 
                  className="bg-gradient-to-t from-orange-500 to-orange-300 rounded"
                  style={{ 
                    height: `${(data.orders / Math.max(...salesData.hourlyData.map(d => d.orders))) * 60}px`,
                    minHeight: '10px'
                  }}
                ></div>
              </div>
              <p className="text-xs font-medium text-gray-900">{data.hour}</p>
              <p className="text-xs text-gray-600">{data.orders} orders</p>
              <p className="text-xs text-gray-600">₹{data.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCustomerReport = () => (
    <div className="space-y-8">
      {/* Customer Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900">{customerData.totalCustomers.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Total Customers</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900">{customerData.newCustomers}</h3>
          <p className="text-gray-600 text-sm">New Customers</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900">{customerData.returningCustomers}</h3>
          <p className="text-gray-600 text-sm">Returning Customers</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900">{customerData.retentionRate}%</h3>
          <p className="text-gray-600 text-sm">Retention Rate</p>
        </div>
      </div>

      {/* Customer Segments */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Segments</h2>
        <div className="space-y-4">
          {customerData.segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{segment.name}</h4>
                <p className="text-sm text-gray-600">{segment.count} customers ({segment.percentage}%)</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₹{segment.revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demographics */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Demographics</h2>
        <div className="space-y-4">
          {customerData.demographics.map((demo, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-700">{demo.ageGroup}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                    style={{ width: `${demo.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12">{demo.percentage}%</span>
                <span className="text-sm text-gray-600 w-16">{demo.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOperationsReport = () => (
    <div className="space-y-8">
      {/* Operational Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900">{operationalData.averagePreparationTime} min</h3>
          <p className="text-gray-600 text-sm">Avg Preparation Time</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900">{operationalData.averageDeliveryTime} min</h3>
          <p className="text-gray-600 text-sm">Avg Delivery Time</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900">{operationalData.orderAccuracy}%</h3>
          <p className="text-gray-600 text-sm">Order Accuracy</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900">{operationalData.customerSatisfaction}/5</h3>
          <p className="text-gray-600 text-sm">Customer Satisfaction</p>
        </div>
      </div>

      {/* Peak Hours */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Peak Hours Performance</h2>
        <div className="space-y-4">
          {operationalData.peakHours.map((hour, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{hour.time}</h4>
                <p className="text-sm text-gray-600">{hour.orders} orders</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{hour.efficiency}%</p>
                <p className="text-sm text-gray-600">Efficiency</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Staff Performance</h2>
        <div className="space-y-4">
          {operationalData.staffPerformance.map((staff, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{staff.name}</h4>
                <p className="text-sm text-gray-600">
                  {staff.orders ? `${staff.orders} orders` : `${staff.deliveries} deliveries`}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{staff.avgTime} min</p>
                <p className="text-sm text-gray-600">
                  {staff.accuracy ? `${staff.accuracy}% accuracy` : `${staff.rating}/5 rating`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'sales':
        return renderSalesReport();
      case 'customers':
        return renderCustomerReport();
      case 'operations':
        return renderOperationsReport();
      default:
        return renderSalesReport();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-2">Comprehensive business insights and performance metrics</p>
          </div>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-2">
            <DocumentArrowDownIcon className="w-5 h-5" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                {reportTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>{period.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center space-x-2">
                <FunnelIcon className="w-5 h-5" />
                <span>Apply Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <motion.div
          key={selectedReport}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderReportContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;