import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Terms & Conditions - Jain Shikanji | Indian Food Delivery Service</title>
        <meta name="description" content="Terms and conditions for ordering Indian food and North Indian cuisine from Jain Shikanji. Read our service terms for veg food delivery." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jainshikanji.com/terms-conditions" />
      </Helmet>
      
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last Updated:</strong> January 15, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using Jain Shikanji's website and services, you accept and agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use our Indian food delivery service or order our North Indian cuisine.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700 mb-4">
                Jain Shikanji provides:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Online ordering platform for authentic Indian food and North Indian cuisine</li>
                <li>100% vegetarian and Jain-friendly veg food delivery services</li>
                <li>Dine-in and takeaway services at our restaurant locations</li>
                <li>Catering services for events and special occasions</li>
                <li>Customer loyalty program and rewards system</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration</h2>
              <p className="text-gray-700 mb-4">
                To place orders for our Indian food, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Be at least 18 years old or have parental consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Ordering and Payment</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Order Placement</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>All orders are subject to availability of Indian food items</li>
                <li>We reserve the right to refuse or cancel orders at our discretion</li>
                <li>Order confirmation does not guarantee acceptance</li>
                <li>Prices are subject to change without notice</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Terms</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Payment is required at the time of order placement</li>
                <li>We accept UPI, credit/debit cards, net banking, and cash on delivery</li>
                <li>All prices are in Indian Rupees (₹) and include applicable taxes</li>
                <li>Delivery charges apply as per our current rate card</li>
                <li>Free delivery available on orders above ₹299</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Delivery Terms</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Delivery Areas:</strong> We deliver within 10km radius of our store locations</li>
                <li><strong>Delivery Time:</strong> Estimated 30-45 minutes, may vary during peak hours</li>
                <li><strong>Delivery Address:</strong> Must be accurate and accessible to our delivery partners</li>
                <li><strong>Availability:</strong> Someone must be available to receive the Indian food order</li>
                <li><strong>Failed Delivery:</strong> Additional charges may apply for re-delivery attempts</li>
                <li><strong>Weather Conditions:</strong> Delivery may be delayed due to adverse weather</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Food Quality and Safety</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All our Indian food items are 100% vegetarian and Jain-friendly</li>
                <li>We follow strict food safety and hygiene standards</li>
                <li>Fresh ingredients are sourced daily for authentic North Indian cuisine</li>
                <li>We maintain FSSAI compliance and food safety certifications</li>
                <li>Special dietary requirements should be mentioned during ordering</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cancellation and Refunds</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Orders can be cancelled within 5 minutes of placement</li>
                <li>Refunds will be processed within 5-7 business days</li>
                <li>Quality issues will be addressed with replacement or full refund</li>
                <li>Cancellation after food preparation may incur charges</li>
                <li>Weather-related delivery delays do not qualify for automatic refunds</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Loyalty Program</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Loyalty points are earned on successful order completion</li>
                <li>Points have no cash value and cannot be transferred</li>
                <li>Tier benefits are subject to change with prior notice</li>
                <li>Points expire after 12 months of account inactivity</li>
                <li>Program terms may be modified at our discretion</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
              <p className="text-gray-700">
                All content on our website, including recipes, images, logos, and text related to our Indian food and North Indian cuisine, 
                is protected by intellectual property rights. You may not reproduce, distribute, or use our content without written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700">
                Jain Shikanji's liability is limited to the value of your order. We are not responsible for indirect, incidental, 
                or consequential damages. Our maximum liability for any claim related to our Indian food service shall not exceed 
                the amount paid for the specific order in question.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
              <p className="text-gray-700">
                These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in Bangalore, Karnataka. 
                We encourage resolving disputes through direct communication before pursuing legal action.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about these terms or our Indian food services, contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> legal@jainshikanji.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +91 9876543210</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 MG Road, Bangalore, Karnataka 560001</p>
                <p className="text-gray-700"><strong>Business Hours:</strong> 11:00 AM - 11:00 PM (Daily)</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;