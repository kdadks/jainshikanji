import React, { useState } from 'react';
import { 
  MegaphoneIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  PlayIcon,
  PauseIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Header from '../components/Header';

const MarketingCampaigns = () => {
  const [selectedTab, setSelectedTab] = useState('campaigns');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [campaigns, setCampaigns] = useState([
    {
      id: '1',
      name: 'Weekend Special - 20% Off',
      type: 'discount',
      description: '20% discount on all orders above ₹500 during weekends',
      discountType: 'percentage',
      discountValue: 20,
      minOrderValue: 500,
      startDate: '2024-01-15',
      endDate: '2024-01-31',
      isActive: true,
      usageLimit: 1000,
      usageCount: 245,
      code: 'WEEKEND20',
      targetAudience: 'All Customers',
      channels: ['Email', 'SMS', 'Push'],
      performance: {
        impressions: 15420,
        clicks: 1234,
        conversions: 245,
        revenue: 98000
      }
    },
    {
      id: '2',
      name: 'New Customer Welcome',
      type: 'discount',
      description: 'First order discount for new customers',
      discountType: 'fixed',
      discountValue: 100,
      minOrderValue: 300,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true,
      usageLimit: null,
      usageCount: 89,
      code: 'WELCOME100',
      targetAudience: 'New Customers',
      channels: ['Email', 'In-App'],
      performance: {
        impressions: 8950,
        clicks: 567,
        conversions: 89,
        revenue: 26700
      }
    },
    {
      id: '3',
      name: 'Free Delivery Friday',
      type: 'free_delivery',
      description: 'Free delivery on all orders every Friday',
      discountType: 'free_delivery',
      discountValue: 0,
      minOrderValue: 0,
      startDate: '2024-01-05',
      endDate: '2024-03-31',
      isActive: false,
      usageLimit: null,
      usageCount: 156,
      code: 'FREEDEL',
      targetAudience: 'All Customers',
      channels: ['Social Media', 'Push'],
      performance: {
        impressions: 12300,
        clicks: 890,
        conversions: 156,
        revenue: 46800
      }
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'discount',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    minOrderValue: 0,
    startDate: '',
    endDate: '',
    code: '',
    targetAudience: 'All Customers',
    channels: []
  });

  const campaignTypes = [
    { value: 'discount', label: 'Discount Campaign' },
    { value: 'bogo', label: 'Buy One Get One' },
    { value: 'free_delivery', label: 'Free Delivery' },
    { value: 'loyalty_bonus', label: 'Loyalty Bonus' }
  ];

  const targetAudiences = [
    'All Customers',
    'New Customers',
    'VIP Customers',
    'Inactive Customers',
    'High Value Customers'
  ];

  const channels = [
    { id: 'email', name: 'Email' },
    { id: 'sms', name: 'SMS' },
    { id: 'push', name: 'Push Notifications' },
    { id: 'social', name: 'Social Media' },
    { id: 'inapp', name: 'In-App' }
  ];

  const toggleCampaign = (id: string) => {
    setCampaigns(prev => prev.map(campaign =>
      campaign.id === id ? { ...campaign, isActive: !campaign.isActive } : campaign
    ));
    toast.success('Campaign status updated!');
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
    toast.success('Campaign deleted!');
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCampaign.name || !newCampaign.startDate || !newCampaign.endDate) {
      toast.error('Please fill in required fields');
      return;
    }

    const campaign = {
      id: Date.now().toString(),
      ...newCampaign,
      isActive: true,
      usageCount: 0,
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0
      }
    };

    setCampaigns(prev => [...prev, campaign]);
    setNewCampaign({
      name: '',
      type: 'discount',
      description: '',
      discountType: 'percentage',
      discountValue: 0,
      minOrderValue: 0,
      startDate: '',
      endDate: '',
      code: '',
      targetAudience: 'All Customers',
      channels: []
    });
    setShowCreateModal(false);
    toast.success('Campaign created successfully!');
  };

  const getCampaignStats = () => {
    const total = campaigns.length;
    const active = campaigns.filter(c => c.isActive).length;
    const totalRevenue = campaigns.reduce((sum, c) => sum + c.performance.revenue, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.performance.conversions, 0);

    return { total, active, totalRevenue, totalConversions };
  };

  const stats = getCampaignStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketing Campaigns</h1>
            <p className="text-gray-600 mt-2">Create and manage promotional campaigns</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Create Campaign</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <MegaphoneIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
                <p className="text-sm text-gray-600">Total Campaigns</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <PlayIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.active}</h3>
                <p className="text-sm text-gray-600">Active Campaigns</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <ChartBarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalConversions}</h3>
                <p className="text-sm text-gray-600">Total Conversions</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <ChartBarIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</h3>
                <p className="text-sm text-gray-600">Campaign Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Active Campaigns</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${campaign.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      <p className="text-sm text-gray-600">{campaign.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {campaign.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Campaign Type</p>
                    <p className="font-medium text-gray-900 capitalize">{campaign.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Discount</p>
                    <p className="font-medium text-gray-900">
                      {campaign.discountType === 'percentage' ? `${campaign.discountValue}%` : 
                       campaign.discountType === 'fixed' ? `₹${campaign.discountValue}` : 'Free Delivery'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Usage</p>
                    <p className="font-medium text-gray-900">
                      {campaign.usageCount} {campaign.usageLimit ? `/ ${campaign.usageLimit}` : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="font-medium text-gray-900">₹{campaign.performance.revenue.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Impressions</p>
                    <p className="font-medium text-gray-900">{campaign.performance.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Clicks</p>
                    <p className="font-medium text-gray-900">{campaign.performance.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Conversions</p>
                    <p className="font-medium text-gray-900">{campaign.performance.conversions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="font-medium text-gray-900">
                      {((campaign.performance.conversions / campaign.performance.clicks) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium text-gray-900">
                        {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Channels</p>
                      <div className="flex space-x-1">
                        {campaign.channels.map(channel => (
                          <span key={channel} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => toggleCampaign(campaign.id)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        campaign.isActive
                          ? 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {campaign.isActive ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => deleteCampaign(campaign.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Create Campaign Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Campaign</h2>
              
              <form onSubmit={handleCreateCampaign} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Name *
                    </label>
                    <input
                      type="text"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Type
                    </label>
                    <select
                      value={newCampaign.type}
                      onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    >
                      {campaignTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newCampaign.description}
                    onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Type
                    </label>
                    <select
                      value={newCampaign.discountType}
                      onChange={(e) => setNewCampaign({ ...newCampaign, discountType: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                      <option value="free_delivery">Free Delivery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Value
                    </label>
                    <input
                      type="number"
                      value={newCampaign.discountValue}
                      onChange={(e) => setNewCampaign({ ...newCampaign, discountValue: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Order Value
                    </label>
                    <input
                      type="number"
                      value={newCampaign.minOrderValue}
                      onChange={(e) => setNewCampaign({ ...newCampaign, minOrderValue: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={newCampaign.startDate}
                      onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={newCampaign.endDate}
                      onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Promo Code
                    </label>
                    <input
                      type="text"
                      value={newCampaign.code}
                      onChange={(e) => setNewCampaign({ ...newCampaign, code: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Audience
                    </label>
                    <select
                      value={newCampaign.targetAudience}
                      onChange={(e) => setNewCampaign({ ...newCampaign, targetAudience: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    >
                      {targetAudiences.map(audience => (
                        <option key={audience} value={audience}>{audience}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marketing Channels
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {channels.map(channel => (
                      <label key={channel.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newCampaign.channels.includes(channel.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewCampaign({
                                ...newCampaign,
                                channels: [...newCampaign.channels, channel.name]
                              });
                            } else {
                              setNewCampaign({
                                ...newCampaign,
                                channels: newCampaign.channels.filter(c => c !== channel.name)
                              });
                            }
                          }}
                          className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">{channel.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                  >
                    Create Campaign
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingCampaigns;