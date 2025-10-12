import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Menu', href: '/menu' },
    { name: 'About Us', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Loyalty Program', href: '/loyalty' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-conditions' },
    { name: 'Shipping Policy', href: '/shipping-policy' },
    { name: 'Return Policy', href: '/return-policy' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">जै</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Jain Shikanji</h3>
                <p className="text-gray-400 text-sm">Authentic Indian Beverages</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Serving authentic Indian food and North Indian cuisine since 1995. 
              100% vegetarian and Jain-friendly with traditional recipes.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-4 h-4" />
                <span>FSSAI Licensed</span>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span>4.8★ Rated</span>
              </div>
              <div className="flex items-center space-x-2">
                <TruckIcon className="w-4 h-4" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">MG Road, Bangalore</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">hello@jainshikanji.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">11 AM - 11 PM Daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} Jain Shikanji. All rights reserved.
              </p>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;