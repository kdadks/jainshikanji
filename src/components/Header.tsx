import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: cartState } = useCart();
  const { authState, logout, loginAsAdmin } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isAdmin = location.pathname.startsWith('/admin');
  const cartItemCount = cartState.items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdminToggle = () => {
    if (authState.isAdmin) {
      logout();
      navigate('/');
    } else {
      loginAsAdmin();
      navigate('/admin');
    }
    setShowUserMenu(false);
  };

  const navLinks = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Menu', href: '/menu', current: location.pathname === '/menu' },
    { name: 'Loyalty', href: '/loyalty', current: location.pathname === '/loyalty' },
    { name: 'About', href: '/', current: false, scrollTo: 'about' },
    { name: 'Contact', href: '/', current: false, scrollTo: 'contact' },
  ];

  const adminNavLinks = [
    { name: 'Dashboard', href: '/admin', current: location.pathname === '/admin' },
    { name: 'Products', href: '/admin/products', current: location.pathname === '/admin/products' },
    { name: 'Orders', href: '/admin/orders', current: location.pathname === '/admin/orders' },
    { name: 'Customers', href: '/admin/customers', current: location.pathname === '/admin/customers' },
    { name: 'Analytics', href: '/admin/analytics', current: location.pathname === '/admin/analytics' },
    { name: 'Settings', href: '/admin/settings', current: location.pathname === '/admin/settings' },
  ];

  const handleNavClick = (link: any) => {
    if (link.scrollTo) {
      // If we're not on the home page, navigate there first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.getElementById(link.scrollTo);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        const element = document.getElementById(link.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      navigate(link.href);
    }
    setShowMobileMenu(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-blur-strong shadow-medium border-b border-gray-200/50' 
            : 'bg-white/95 backdrop-blur-md shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link 
              to={isAdmin ? "/admin" : "/"} 
              className="flex items-center space-x-3 group"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300"
              >
                <span className="text-white font-bold text-lg lg:text-xl">जै</span>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Jain Shikanji
                </h1>
                <p className="text-xs lg:text-sm text-gray-500 -mt-1 font-medium">Authentic Indian Beverages</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {(isAdmin ? adminNavLinks : navLinks).map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`relative px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                    link.current
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {link.name}
                  {link.current && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-orange-500 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* Cart Button */}
              {!isAdmin && (
                <motion.div className="relative">
                  <Link
                    to="/cart"
                    data-cart-button
                    className="relative p-2.5 lg:p-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 group"
                  >
                    <ShoppingCartIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                    {cartItemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center font-bold shadow-md"
                      >
                        {cartItemCount}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              )}

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 lg:p-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                    <UserIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  {authState.user && (
                    <span className="hidden lg:block text-sm font-medium text-gray-700 max-w-24 truncate">
                      {authState.user.name}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-strong py-2 border border-gray-200/60"
                    >
                      {authState.isAuthenticated ? (
                        <>
                          {!isAdmin && (
                            <Link 
                              to="/dashboard" 
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 rounded-lg mx-2"
                              onClick={() => setShowUserMenu(false)}
                            >
                              My Dashboard
                            </Link>
                          )}
                          <button
                            onClick={handleAdminToggle}
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 rounded-lg mx-2"
                          >
                            {authState.isAdmin ? 'Exit Admin' : 'Admin Panel'}
                          </button>
                          <hr className="my-2 border-gray-200" />
                          <button
                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-lg mx-2"
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                              navigate('/');
                            }}
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 rounded-lg mx-2"
                            onClick={() => {
                              setShowLoginModal(true);
                              setShowUserMenu(false);
                            }}
                          >
                            Login
                          </button>
                          <button
                            className="w-full text-left px-4 py-3 text-sm text-orange-600 hover:bg-orange-50 transition-colors duration-200 rounded-lg mx-2"
                            onClick={() => {
                              loginAsAdmin();
                              setShowUserMenu(false);
                              navigate('/admin');
                            }}
                          >
                            Admin Demo
                          </button>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
              >
                {showMobileMenu ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200/60 bg-white/95 backdrop-blur-xl"
            >
              <div className="container-padding py-4 space-y-1">
                {(isAdmin ? adminNavLinks : navLinks).map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      link.current
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
                
                {!isAdmin && cartItemCount > 0 && (
                  <Link
                    to="/cart"
                    className="block px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium text-center shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    View Cart ({cartItemCount})
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20"></div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default Header;