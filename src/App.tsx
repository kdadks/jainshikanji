import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/AdminDashboard';
import ProductManagement from './pages/ProductManagement';
import AdminProducts from './pages/AdminProducts';
import OrderManagement from './pages/OrderManagement';
import CustomerManagement from './pages/CustomerManagement';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import ReportsAnalytics from './pages/ReportsAnalytics';
import LoyaltyProgram from './pages/LoyaltyProgram';
import InventoryManagement from './pages/InventoryManagement';
import StaffManagement from './pages/StaffManagement';
import MarketingCampaigns from './pages/MarketingCampaigns';
import Settings from './pages/Settings';
import CustomerDashboard from './pages/CustomerDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import Header from './components/Header';
import AIChat from './components/AIChat';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { LocationProvider } from './context/LocationContext';
import Footer from './components/Footer';
import SEOBlogContent from './components/SEOBlogContent';
import BacklinkStrategy from './components/BacklinkStrategy';
import SitemapGenerator from './components/SitemapGenerator';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <OrderProvider>
          <LocationProvider>
            <CartProvider>
              <Router>
                <div className="min-h-screen bg-gray-50">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/loyalty" element={<LoyaltyProgram />} />
                    <Route path="/dashboard" element={<CustomerDashboard />} />
                    <Route path="/order-tracking/:id" element={<OrderTrackingPage />} />

                    {/* Legal Pages */}
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-conditions" element={<TermsConditions />} />
                    <Route path="/shipping-policy" element={<ShippingPolicy />} />
                    <Route path="/return-policy" element={<ReturnPolicy />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/menu" element={<ProductManagement />} />
                    <Route path="/admin/orders" element={<OrderManagement />} />
                    <Route path="/admin/customers" element={<CustomerManagement />} />
                    <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
                    <Route path="/admin/reports" element={<ReportsAnalytics />} />
                    <Route path="/admin/inventory" element={<InventoryManagement />} />
                    <Route path="/admin/staff" element={<StaffManagement />} />
                    <Route path="/admin/marketing" element={<MarketingCampaigns />} />
                    <Route path="/admin/settings" element={<Settings />} />
                  </Routes>
                  <Footer />
                  <AIChat />
                  <SEOBlogContent />
                  <BacklinkStrategy />
                  <SitemapGenerator />
                  <Toaster position="top-right" />
                </div>
              </Router>
            </CartProvider>
          </LocationProvider>
        </OrderProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;