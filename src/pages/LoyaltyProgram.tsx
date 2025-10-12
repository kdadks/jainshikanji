import React, { useState } from 'react';
import { StarIcon, GiftIcon, TrophyIcon, FireIcon } from '@heroicons/react/24/solid';
import { ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const LoyaltyProgram = () => {
  const { authState } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  const user = authState.user;
  const currentPoints = user?.loyaltyPoints || 0;
  const currentTier = user?.tier || 'Bronze';

  const tiers = [
    {
      name: 'Bronze',
      minPoints: 0,
      maxPoints: 499,
      benefits: ['5% cashback on orders', 'Birthday special offer', 'Free delivery on orders above ₹500'],
      color: 'from-amber-600 to-amber-800',
      icon: '🥉'
    },
    {
      name: 'Silver',
      minPoints: 500,
      maxPoints: 1499,
      benefits: ['8% cashback on orders', 'Priority customer support', 'Free delivery on orders above ₹300', 'Early access to new menu items'],
      color: 'from-gray-400 to-gray-600',
      icon: '🥈'
    },
    {
      name: 'Gold',
      minPoints: 1500,
      maxPoints: 2999,
      benefits: ['12% cashback on orders', 'Complimentary dessert monthly', 'Free delivery on all orders', 'Exclusive chef specials'],
      color: 'from-yellow-400 to-yellow-600',
      icon: '🥇'
    },
    {
      name: 'Platinum',
      minPoints: 3000,
      maxPoints: Infinity,
      benefits: ['15% cashback on orders', 'Personal chef consultation', 'VIP customer service', 'Exclusive events invitation', 'Custom menu creation'],
      color: 'from-purple-400 to-purple-600',
      icon: '💎'
    }
  ];

  const rewards = [
    {
      id: '1',
      name: 'Free Gulab Jamun',
      description: 'Complimentary dessert with your next order',
      points: 100,
      category: 'Food',
      image: 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?auto=compress&cs=tinysrgb&w=300',
      validUntil: '2024-12-31'
    },
    {
      id: '2',
      name: '₹50 Off Next Order',
      description: 'Instant discount on orders above ₹300',
      points: 200,
      category: 'Discount',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
      validUntil: '2024-12-31'
    },
    {
      id: '3',
      name: 'Free Delivery for a Month',
      description: 'Unlimited free delivery for 30 days',
      points: 500,
      category: 'Service',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=300',
      validUntil: '2024-12-31'
    },
    {
      id: '4',
      name: 'Chef\'s Special Tasting',
      description: 'Exclusive 5-course tasting menu',
      points: 1000,
      category: 'Experience',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
      validUntil: '2024-12-31'
    }
  ];

  const recentActivity = [
    { date: '2024-01-15', action: 'Earned 45 points', description: 'Order #ORD001 - Butter Chicken Combo' },
    { date: '2024-01-12', action: 'Redeemed 100 points', description: 'Free Gulab Jamun' },
    { date: '2024-01-10', action: 'Earned 32 points', description: 'Order #ORD002 - Biryani Special' },
    { date: '2024-01-08', action: 'Tier Upgrade', description: 'Congratulations! You\'re now Gold tier' },
  ];

  const getCurrentTierInfo = () => {
    return tiers.find(tier => tier.name === currentTier) || tiers[0];
  };

  const getNextTierInfo = () => {
    const currentIndex = tiers.findIndex(tier => tier.name === currentTier);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const getProgressToNextTier = () => {
    const nextTier = getNextTierInfo();
    if (!nextTier) return 100;
    
    const currentTierInfo = getCurrentTierInfo();
    const progress = ((currentPoints - currentTierInfo.minPoints) / (nextTier.minPoints - currentTierInfo.minPoints)) * 100;
    return Math.min(progress, 100);
  };

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <TrophyIcon className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Join Our Loyalty Program</h2>
            <p className="text-gray-600 mb-6">Sign in to start earning points and unlock exclusive rewards</p>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Loyalty Program</h1>
          <p className="text-xl text-gray-600">Earn points, unlock rewards, and enjoy exclusive benefits</p>
        </div>

        {/* Current Status Card */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-2">{getCurrentTierInfo().icon}</div>
              <h3 className="text-2xl font-bold mb-1">{currentTier} Member</h3>
              <p className="text-orange-100">Current Tier</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{currentPoints.toLocaleString()}</div>
              <p className="text-orange-100">Total Points</p>
            </div>
            
            <div className="text-center">
              {getNextTierInfo() ? (
                <>
                  <div className="text-2xl font-bold mb-2">
                    {getNextTierInfo()!.minPoints - currentPoints} points to {getNextTierInfo()!.name}
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-2">
                    <div 
                      className="bg-white h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressToNextTier()}%` }}
                    ></div>
                  </div>
                  <p className="text-orange-100">Next Tier Progress</p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold mb-2">🎉 Highest Tier!</div>
                  <p className="text-orange-100">You've reached the top</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 mb-8 shadow-lg">
          {[
            { id: 'overview', label: 'Overview', icon: TrophyIcon },
            { id: 'rewards', label: 'Rewards', icon: GiftIcon },
            { id: 'activity', label: 'Activity', icon: ClockIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                selectedTab === tab.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Tier Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your {currentTier} Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getCurrentTierInfo().benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* All Tiers */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tier Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tiers.map((tier, index) => (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative p-6 rounded-xl border-2 ${
                      tier.name === currentTier 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {tier.name === currentTier && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Current
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{tier.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                      <p className="text-sm text-gray-600">
                        {tier.minPoints === 0 ? '0' : tier.minPoints.toLocaleString()} - {' '}
                        {tier.maxPoints === Infinity ? '∞' : tier.maxPoints.toLocaleString()} points
                      </p>
                    </div>
                    
                    <ul className="space-y-2">
                      {tier.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'rewards' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                        {reward.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold">{reward.points}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{reward.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                    <button
                      disabled={currentPoints < reward.points}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                        currentPoints >= reward.points
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {currentPoints >= reward.points ? 'Redeem' : `Need ${reward.points - currentPoints} more points`}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'activity' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    {activity.action.includes('Earned') ? (
                      <StarIcon className="w-5 h-5 text-orange-600" />
                    ) : activity.action.includes('Redeemed') ? (
                      <GiftIcon className="w-5 h-5 text-orange-600" />
                    ) : (
                      <TrophyIcon className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{activity.action}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyProgram;