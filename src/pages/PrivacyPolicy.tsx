import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Privacy Policy - Jain Shikanji | Indian Food & North Indian Cuisine</title>
        <meta name="description" content="Privacy policy for Jain Shikanji - Learn how we protect your personal information when ordering Indian food and North Indian cuisine online." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jainshikanji.com/privacy-policy" />
      </Helmet>
      
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last Updated:</strong> January 15, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                At Jain Shikanji, we collect information to provide you with the best Indian food and North Indian cuisine experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and delivery addresses when you create an account or place orders</li>
                <li><strong>Order Information:</strong> Details about your Indian food orders, payment information, and delivery preferences</li>
                <li><strong>Usage Data:</strong> How you interact with our website, menu browsing patterns, and favorite veg food items</li>
                <li><strong>Location Data:</strong> Delivery addresses and location information for accurate food delivery</li>
                <li><strong>Communication Data:</strong> Customer service interactions, feedback, and reviews about our North Indian cuisine</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use your information to enhance your Indian food ordering experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Process and deliver your Indian food and North Indian cuisine orders</li>
                <li>Manage your account and loyalty program benefits</li>
                <li>Send order confirmations, delivery updates, and important notifications</li>
                <li>Personalize your veg food recommendations based on preferences</li>
                <li>Improve our menu, services, and overall customer experience</li>
                <li>Comply with legal obligations and prevent fraudulent activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We respect your privacy and only share information when necessary:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Delivery Partners:</strong> Share delivery address and contact information for order fulfillment</li>
                <li><strong>Payment Processors:</strong> Secure payment information for transaction processing</li>
                <li><strong>Service Providers:</strong> Trusted partners who help us operate our Indian food delivery service</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of business assets</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>We never sell your personal information to third parties for marketing purposes.</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement robust security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>SSL encryption for all data transmission</li>
                <li>Secure payment processing through certified providers</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and employee training on data protection</li>
                <li>Secure storage of customer data with backup systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Limit how we process your information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to improve your experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Essential Cookies:</strong> Required for website functionality and order processing</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our Indian food website</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and favorite veg food items</li>
                <li><strong>Marketing Cookies:</strong> Show relevant offers for Indian cuisine (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Updates to Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date. Your continued use of our Indian food delivery service constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this privacy policy or how we handle your information, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> privacy@jainshikanji.com</p>
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

export default PrivacyPolicy;