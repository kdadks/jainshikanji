import React, { useState } from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      if (result.isAdmin) {
        toast.success('Welcome to Admin Dashboard!', {
          style: {
            background: '#10b981',
            color: 'white',
            borderRadius: '12px',
            padding: '12px 16px',
            fontWeight: '500'
          }
        });
        navigate('/admin');
      } else {
        toast.success('Welcome back!', {
          style: {
            background: '#10b981',
            color: 'white',
            borderRadius: '12px',
            padding: '12px 16px',
            fontWeight: '500'
          }
        });
      }
      onClose();
      
      // Navigate after modal closes
      setTimeout(() => {
        if (result.isAdmin) {
          navigate('/admin');
        }
      }, 100);
    } catch (error) {
      toast.error('Login failed. Please try again.', {
        style: {
          background: '#ef4444',
          color: 'white',
          borderRadius: '12px',
          padding: '12px 16px',
          fontWeight: '500'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { type: 'Customer', email: 'customer@demo.com', password: 'demo123' },
    { type: 'Admin', email: 'admin@jainshikanji.com', password: 'admin123' }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-gray-200"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
            <span className="text-white font-bold text-lg sm:text-2xl">जै</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-sm sm:text-base text-gray-600">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary btn-lg w-full"
          >
            {isLoading ? (
              <>
                <div className="loading-spinner mr-2"></div>
                <span>Signing In...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Accounts */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-2xl">
          <h4 className="text-sm font-bold text-gray-900 mb-3 sm:mb-4 text-center">Demo Accounts</h4>
          <div className="space-y-2 sm:space-y-3">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                }}
                className="w-full p-2 sm:p-3 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 text-xs sm:text-sm">{account.type}</div>
                    <div className="text-xs text-gray-600">{account.email}</div>
                  </div>
                  <div className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                    {account.password}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-2 sm:mt-3">
            Click any demo account to auto-fill credentials
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;