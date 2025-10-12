import React from 'react';
import { Helmet } from 'react-helmet-async';
import { TruckIcon, ClockIcon, MapPinIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Shipping & Delivery Policy - Jain Shikanji | Indian Food Delivery</title>
        <meta name="description" content="Learn about our Indian food delivery policy, shipping areas, delivery times, and charges for North Indian cuisine and veg food orders." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jainshikanji.com/shipping-policy" />
      </Helmet>
      
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping & Delivery Policy</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <TruckIcon className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Free Delivery</h3>
              <p className="text-sm text-gray-600">On orders above ₹299</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <ClockIcon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">30-45 Minutes</h3>
              <p className="text-sm text-gray-600">Average delivery time</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <MapPinIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">10 KM Radius</h3>
              <p className="text-sm text-gray-600">Delivery coverage area</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <CurrencyRupeeIcon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">₹40 Charge</h3>
              <p className="text-sm text-gray-600">For orders below ₹299</p>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Delivery Areas</h2>
              <p className="text-gray-700 mb-4">
                We deliver fresh Indian food and North Indian cuisine to the following areas in Bangalore:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">From MG Road Store</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• MG Road & Brigade Road</li>
                    <li>• Cubbon Park Area</li>
                    <li>• UB City Mall vicinity</li>
                    <li>• Commercial Street</li>
                    <li>• Shivaji Nagar</li>
                    <li>• Richmond Town</li>
                    <li>• Ashok Nagar</li>
                    <li>• Seshadripuram</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">From Koramangala Store</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Koramangala (All Blocks)</li>
                    <li>• BTM Layout</li>
                    <li>• HSR Layout</li>
                    <li>• Indiranagar</li>
                    <li>• Ejipura</li>
                    <li>• Adugodi</li>
                    <li>• Wilson Garden</li>
                    <li>• Jayanagar (Parts)</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-gray-700">
                <strong>Note:</strong> Delivery availability may vary based on distance and local conditions. 
                Please check during checkout if your area is covered for Indian food delivery.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Delivery Charges</h2>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Delivery Rates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700"><strong>Orders ₹299 and above:</strong> FREE Delivery</p>
                    <p className="text-gray-700"><strong>Orders below ₹299:</strong> ₹40 delivery charge</p>
                  </div>
                  <div>
                    <p className="text-gray-700"><strong>Peak Hours (7-9 PM):</strong> Standard rates apply</p>
                    <p className="text-gray-700"><strong>Late Night (after 10 PM):</strong> Additional ₹20</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                Delivery charges are calculated automatically during checkout based on your order value and delivery location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Delivery Timeframes</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Standard Delivery</h3>
                  <p className="text-gray-700">30-45 minutes for most areas within our delivery radius</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Peak Hours (12-2 PM, 7-9 PM)</h3>
                  <p className="text-gray-700">45-60 minutes due to high demand for Indian food</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Off-Peak Hours</h3>
                  <p className="text-gray-700">25-35 minutes for faster North Indian cuisine delivery</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Scheduled Delivery</h3>
                  <p className="text-gray-700">Available for orders placed 2+ hours in advance</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Order Tracking</h2>
              <p className="text-gray-700 mb-4">
                Track your Indian food order in real-time:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Order Confirmed:</strong> Payment processed and order sent to kitchen</li>
                <li><strong>Preparing:</strong> Our chefs are preparing your North Indian cuisine</li>
                <li><strong>Ready:</strong> Food is prepared and ready for pickup</li>
                <li><strong>Out for Delivery:</strong> Driver is on the way to your location</li>
                <li><strong>Delivered:</strong> Order successfully delivered - enjoy your meal!</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Delivery Guidelines</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Responsibilities</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Provide accurate delivery address and contact information</li>
                <li>Be available to receive the Indian food order at specified time</li>
                <li>Ensure delivery location is accessible to our delivery partners</li>
                <li>Check order contents upon delivery before accepting</li>
                <li>Report any issues immediately to customer service</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Delivery Partner Guidelines</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Contactless delivery available upon request</li>
                <li>Delivery partners carry insulated bags for food quality</li>
                <li>Photo confirmation for contactless deliveries</li>
                <li>Professional and courteous service standards</li>
                <li>Adherence to food safety and hygiene protocols</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Special Circumstances</h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Weather Delays</h3>
                  <p className="text-yellow-700 text-sm">
                    Heavy rain, storms, or extreme weather may cause delivery delays. We prioritize safety of our delivery partners.
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Festival Rush</h3>
                  <p className="text-red-700 text-sm">
                    During festivals and special occasions, delivery times may be extended due to high demand for Indian food.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Technical Issues</h3>
                  <p className="text-blue-700 text-sm">
                    In case of technical difficulties, please call our stores directly to place orders.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact for Delivery Issues</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  For any delivery-related concerns or to track your Indian food order:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700"><strong>Customer Service:</strong> +91 9876543210</p>
                    <p className="text-gray-700"><strong>Email:</strong> delivery@jainshikanji.com</p>
                  </div>
                  <div>
                    <p className="text-gray-700"><strong>MG Road Store:</strong> +91 9876543210</p>
                    <p className="text-gray-700"><strong>Koramangala Store:</strong> +91 9876543211</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-4">
                  <strong>Available:</strong> 11:00 AM - 11:00 PM (Daily)
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;