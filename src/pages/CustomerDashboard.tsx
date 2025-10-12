import React, { useState } from 'react';
import { 
  UserIcon, 
  ShoppingBagIcon, 
  MapPinIcon, 
  CreditCardIcon,
  BellIcon,
  HeartIcon,
  GiftIcon,
  ClockIcon,
  StarIcon,
  PencilIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const CustomerDashboard = () => {
  const { authState } = useAuth();
  const { getUserOrders } = useOrder();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);

  const user = authState.user;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: UserIcon },
    { id: 'orders', label: 'My Orders', icon: ShoppingBagIcon },
    { id: 'addresses', label: 'Addresses', icon: MapPinIcon },
    { id: 'favorites', label: 'Favorites', icon: HeartIcon },
    { id: 'loyalty', label: 'Loyalty Points', icon: GiftIcon },
    { id: 'profile', label: 'Profile Settings', icon: UserIcon }
  ];

  const userOrders = user ? getUserOrders(user.email) : [];
  const recentOrders = userOrders.slice(0, 3);

  const favoriteItems = [
    {
      id: '1',
      name: 'Traditional Shikanji',
      price: 80,
      image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=300',
      orderCount: 8
    },
    {
      id: '2',
      name: 'Sweet Lassi',
      price: 90,
      image: 'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=300',
      orderCount: 5
    },
    {
      id: '3',
      name: 'Masala Chaas',
      price: 60,
      image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=300',
      orderCount: 6
    }
  ];

  const addresses = user?.addresses || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'out_for_delivery': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-purple-100 text-purple-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'text-purple-600 bg-purple-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      default: return 'text-amber-600 bg-amber-100';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-warm-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h2>
            <p className="text-primary-100">Ready to order some delicious Indian food?</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🥤</div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getTierColor(user?.tier || 'Bronze')}`}>
              {user?.tier} Member
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <ShoppingBagIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{recentOrders.length}</h3>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <GiftIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{user?.loyaltyPoints || 0}</h3>
              <p className="text-sm text-gray-600">Loyalty Points</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <StarIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
              <p className="text-sm text-gray-600">Avg Rating Given</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <HeartIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{favoriteItems.length}</h3>
              <p className="text-sm text-gray-600">Favorite Items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Orders</h3>
          <button 
            onClick={() => setActiveTab('orders')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentOrders.slice(0, 3).map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div>
                <h4 className="font-medium text-gray-900">#{order.id}</h4>
                <p className="text-sm text-gray-600">{order.items.join(', ')}</p>
                <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₹{order.total}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900">Order History</h3>
      <div className="space-y-4">
        {userOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Order #{order.id}</h4>
                <p className="text-sm text-gray-600">{order.createdAt.toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              {order.items.map((item, itemIndex) => (
                <p key={itemIndex} className="text-gray-700">• {item.name} (x{item.quantity})</p>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">(5/5)</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">₹{order.total}</p>
                <div className="flex space-x-2 mt-2">
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Reorder
                  </button>
                  <a 
                    href={`/order-tracking/${order.id}`}
                    className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    Track Order
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-900">Saved Addresses</h3>
        <button className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2">
          <PlusIcon className="w-4 h-4" />
          <span>Add Address</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address, index) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="w-5 h-5 text-primary-600" />
                <span className="font-semibold text-gray-900 capitalize">{address.type}</span>
                {address.isDefault && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Default</span>
                )}
              </div>
              <button className="text-gray-600 hover:text-primary-600">
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-700">{address.address}</p>
            {address.landmark && (
              <p className="text-sm text-gray-600 mt-1">Near: {address.landmark}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900">Favorite Items</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h4>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-primary-600">₹{item.price}</span>
                <span className="text-sm text-gray-600">Ordered {item.orderCount} times</span>
              </div>
              <button className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderLoyalty = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-500 to-warm-500 rounded-2xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Loyalty Program</h2>
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold mb-2">{user?.tier} Member</h3>
          <p className="text-primary-100 mb-6">You have {user?.loyaltyPoints} points</p>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-sm mb-2">Progress to next tier</p>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
              <div className="bg-white h-3 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs mt-2">350 more points to Platinum</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Rewards</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Free Gulab Jamun</p>
                <p className="text-sm text-gray-600">100 points</p>
              </div>
              <button className="bg-primary-500 text-white px-3 py-1 rounded text-sm hover:bg-primary-600">
                Redeem
              </button>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">₹50 Off</p>
                <p className="text-sm text-gray-600">200 points</p>
              </div>
              <button className="bg-primary-500 text-white px-3 py-1 rounded text-sm hover:bg-primary-600">
                Redeem
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">Earned 45 points</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">Redeemed 100 points</p>
              <p className="text-xs text-gray-500">1 week ago</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">Earned 32 points</p>
              <p className="text-xs text-gray-500">2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-900">Profile Settings</h3>
        <button
          onClick={() => setEditingProfile(!editingProfile)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2"
        >
          <PencilIcon className="w-4 h-4" />
          <span>{editingProfile ? 'Save Changes' : 'Edit Profile'}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={user?.name || ''}
              disabled={!editingProfile}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled={!editingProfile}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={user?.phone || ''}
              disabled={!editingProfile}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loyalty Tier</label>
            <input
              type="text"
              value={user?.tier || 'Bronze'}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Spice Level</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option>Mild</option>
              <option>Medium</option>
              <option>Hot</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
            <div className="flex flex-wrap gap-2">
              {['Jain', 'Vegan', 'Gluten-Free', 'Nut-Free'].map(restriction => (
                <label key={restriction} className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
                  <span className="text-sm text-gray-700">{restriction}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'orders': return renderOrders();
      case 'addresses': return renderAddresses();
      case 'favorites': return renderFavorites();
      case 'loyalty': return renderLoyalty();
      case 'profile': return renderProfile();
      default: return renderOverview();
    }
  };

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <UserIcon className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Please Login</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to access your dashboard</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>My Dashboard - Jain Shikanji Customer Portal</title>
        <meta name="description" content="Manage your orders, addresses, favorites, and loyalty points at Jain Shikanji customer dashboard." />
      </Helmet>
      
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-warm-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;