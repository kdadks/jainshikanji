import React, { useState } from 'react';
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  ClockIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Header from '../components/Header';

const InventoryManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [inventory, setInventory] = useState([
    {
      id: '1',
      productName: 'Basmati Rice',
      sku: 'RICE001',
      category: 'Grains',
      currentStock: 25,
      minStock: 10,
      maxStock: 100,
      unit: 'kg',
      costPerUnit: 120,
      totalValue: 3000,
      location: 'MG Road',
      lastUpdated: '2024-01-15',
      expiryDate: '2024-06-15',
      supplier: 'Premium Grains Co.',
      status: 'in_stock'
    },
    {
      id: '2',
      productName: 'Chicken (Fresh)',
      sku: 'MEAT001',
      category: 'Meat',
      currentStock: 5,
      minStock: 8,
      maxStock: 50,
      unit: 'kg',
      costPerUnit: 280,
      totalValue: 1400,
      location: 'MG Road',
      lastUpdated: '2024-01-15',
      expiryDate: '2024-01-17',
      supplier: 'Fresh Meat Suppliers',
      status: 'low_stock'
    },
    {
      id: '3',
      productName: 'Paneer',
      sku: 'DAIRY001',
      category: 'Dairy',
      currentStock: 0,
      minStock: 5,
      maxStock: 30,
      unit: 'kg',
      costPerUnit: 350,
      totalValue: 0,
      location: 'Koramangala',
      lastUpdated: '2024-01-14',
      expiryDate: null,
      supplier: 'Local Dairy Farm',
      status: 'out_of_stock'
    },
    {
      id: '4',
      productName: 'Tomatoes',
      sku: 'VEG001',
      category: 'Vegetables',
      currentStock: 15,
      minStock: 10,
      maxStock: 40,
      unit: 'kg',
      costPerUnit: 45,
      totalValue: 675,
      location: 'MG Road',
      lastUpdated: '2024-01-15',
      expiryDate: '2024-01-18',
      supplier: 'Fresh Vegetables Ltd.',
      status: 'expiring_soon'
    }
  ]);

  const locations = ['all', 'MG Road', 'Koramangala'];
  const statuses = ['all', 'in_stock', 'low_stock', 'out_of_stock', 'expiring_soon'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'expiring_soon': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock': return <CheckCircleIcon className="w-4 h-4" />;
      case 'low_stock': return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'out_of_stock': return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'expiring_soon': return <ClockIcon className="w-4 h-4" />;
      default: return <CheckCircleIcon className="w-4 h-4" />;
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesLocation && matchesStatus;
  });

  const updateStock = (id: string, newStock: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        let status = 'in_stock';
        if (newStock === 0) status = 'out_of_stock';
        else if (newStock <= item.minStock) status = 'low_stock';
        
        return {
          ...item,
          currentStock: newStock,
          totalValue: newStock * item.costPerUnit,
          status,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
    toast.success('Stock updated successfully');
  };

  const getInventoryStats = () => {
    const total = inventory.length;
    const inStock = inventory.filter(item => item.status === 'in_stock').length;
    const lowStock = inventory.filter(item => item.status === 'low_stock').length;
    const outOfStock = inventory.filter(item => item.status === 'out_of_stock').length;
    const expiringSoon = inventory.filter(item => item.status === 'expiring_soon').length;
    const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);

    return { total, inStock, lowStock, outOfStock, expiringSoon, totalValue };
  };

  const stats = getInventoryStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600 mt-2">Track stock levels and manage inventory across locations</p>
          </div>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-2">
            <PlusIcon className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
                <p className="text-sm text-gray-600">Total Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.inStock}</h3>
                <p className="text-sm text-gray-600">In Stock</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.lowStock}</h3>
                <p className="text-sm text-gray-600">Low Stock</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.outOfStock}</h3>
                <p className="text-sm text-gray-600">Out of Stock</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <ClockIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.expiringSoon}</h3>
                <p className="text-sm text-gray-600">Expiring Soon</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">₹{stats.totalValue.toLocaleString()}</h3>
                <p className="text-sm text-gray-600">Total Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
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

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Current Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Min/Max</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Value</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInventory.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.productName}</h4>
                        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{item.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={item.currentStock}
                          onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <span className="text-sm text-gray-500">{item.unit}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {item.minStock} / {item.maxStock} {item.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-semibold text-gray-900">₹{item.totalValue.toLocaleString()}</span>
                        <p className="text-sm text-gray-500">₹{item.costPerUnit}/{item.unit}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{item.location}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span>{item.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredInventory.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('all');
                setSelectedStatus('all');
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

export default InventoryManagement;