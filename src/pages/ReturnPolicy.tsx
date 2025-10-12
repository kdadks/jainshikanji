import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowPathIcon, ShieldCheckIcon, ClockIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Return & Refund Policy - Jain Shikanji | Indian Food Quality Guarantee</title>
        <meta name="description" content="Our return and refund policy for Indian food orders. Quality guarantee for North Indian cuisine and veg food delivery from Jain Shikanji." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jainshikanji.com/return-policy" />
      </Helmet>
      
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Return & Refund Policy</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <ShieldCheckIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Quality Guarantee</h3>
              <p className="text-sm text-gray-600">100% satisfaction promise</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <ClockIcon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Quick Resolution</h3>
              <p className="text-sm text-gray-600">Issues resolved within 24 hours</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <CurrencyRupeeIcon className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Fast Refunds</h3>
              <p className="text-sm text-gray-600">5-7 business days</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <ArrowPathIcon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Easy Process</h3>
              <p className="text-sm text-gray-600">Simple return procedure</p>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Our Quality Commitment</h2>
              <p className="text-gray-700 mb-4">
                At Jain Shikanji, we are committed to delivering the highest quality Indian food and North Indian cuisine. 
                We stand behind every dish we prepare and every veg food item we deliver.
              </p>
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-3">100% Satisfaction Guarantee</h3>
                <p className="text-green-700">
                  If you're not completely satisfied with your Indian food order, we'll make it right. 
                  Your happiness with our North Indian cuisine is our top priority.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligible Return Scenarios</h2>
              <p className="text-gray-700 mb-4">
                We accept returns and provide refunds for the following situations:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Quality Issues</h3>
                  <ul className="text-gray-700 text-sm mt-2 space-y-1">
                    <li>• Food not meeting our quality standards</li>
                    <li>• Incorrect spice level or preparation</li>
                    <li>• Cold or improperly heated Indian food</li>
                    <li>• Missing ingredients or garnishes</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Order Errors</h3>
                  <ul className="text-gray-700 text-sm mt-2 space-y-1">
                    <li>• Wrong items delivered</li>
                    <li>• Missing items from your North Indian cuisine order</li>
                    <li>• Incorrect quantity delivered</li>
                    <li>• Dietary restrictions not followed (non-Jain items sent)</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Delivery Issues</h3>
                  <ul className="text-gray-700 text-sm mt-2 space-y-1">
                    <li>• Significantly delayed delivery (over 90 minutes)</li>
                    <li>• Food delivered to wrong address</li>
                    <li>• Damaged packaging affecting food quality</li>
                    <li>• Delivery partner misconduct</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Return Process</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Return Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Contact Us Immediately</h4>
                      <p className="text-gray-700 text-sm">Call +91 9876543210 or use our chat support within 30 minutes of delivery</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Describe the Issue</h4>
                      <p className="text-gray-700 text-sm">Provide order details and explain the problem with your Indian food order</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Photo Evidence (if applicable)</h4>
                      <p className="text-gray-700 text-sm">Share photos of the issue to help us resolve it quickly</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Resolution</h4>
                      <p className="text-gray-700 text-sm">We'll offer replacement, refund, or store credit based on the situation</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Refund Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <ArrowPathIcon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Replacement Order</h3>
                  <p className="text-gray-700 text-sm">Fresh preparation of your Indian food order at no extra cost</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <CurrencyRupeeIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Full Refund</h3>
                  <p className="text-gray-700 text-sm">Complete refund to original payment method within 5-7 days</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <ShieldCheckIcon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Store Credit</h3>
                  <p className="text-gray-700 text-sm">Credit to your account for future North Indian cuisine orders</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Refund Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <ClockIcon className="w-8 h-8 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">UPI/Digital Wallets</h3>
                    <p className="text-gray-700 text-sm">Instant to 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <ClockIcon className="w-8 h-8 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Credit/Debit Cards</h3>
                    <p className="text-gray-700 text-sm">3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <ClockIcon className="w-8 h-8 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Net Banking</h3>
                    <p className="text-gray-700 text-sm">5-7 business days</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Non-Returnable Items</h2>
              <p className="text-gray-700 mb-4">
                The following situations are not eligible for returns or refunds:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Change of mind after successful delivery</li>
                <li>Dislike of taste (unless significantly different from description)</li>
                <li>Orders cancelled after food preparation has begun</li>
                <li>Delivery delays due to incorrect address provided by customer</li>
                <li>Customer unavailability during delivery window</li>
                <li>Orders consumed partially before reporting issues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Quality Assurance</h2>
              <p className="text-gray-700 mb-4">
                We maintain strict quality standards for all our Indian food:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Fresh ingredients sourced daily from trusted suppliers</li>
                <li>Traditional recipes and authentic North Indian cuisine preparation</li>
                <li>Regular quality checks by our experienced chefs</li>
                <li>Temperature-controlled delivery to maintain food quality</li>
                <li>Hygiene protocols following FSSAI guidelines</li>
                <li>Customer feedback integration for continuous improvement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact for Returns</h2>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Help Immediately</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Customer Service</h4>
                    <p className="text-gray-700"><strong>Phone:</strong> +91 9876543210</p>
                    <p className="text-gray-700"><strong>Email:</strong> support@jainshikanji.com</p>
                    <p className="text-gray-700"><strong>Chat:</strong> Available on website</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Store Locations</h4>
                    <p className="text-gray-700"><strong>MG Road:</strong> +91 9876543210</p>
                    <p className="text-gray-700"><strong>Koramangala:</strong> +91 9876543211</p>
                    <p className="text-gray-700"><strong>Hours:</strong> 11:00 AM - 11:00 PM</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">💡 Pro Tip</h4>
                  <p className="text-orange-700 text-sm">
                    For fastest resolution, call us immediately upon delivery if there are any issues with your Indian food order. 
                    Our team is trained to resolve problems quickly and ensure your satisfaction.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Prevention is Better</h2>
              <p className="text-gray-700 mb-4">
                To ensure the best experience with our Indian food and North Indian cuisine:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Double-check your order details before confirming</li>
                <li>Specify dietary restrictions and spice preferences clearly</li>
                <li>Provide accurate delivery address and contact information</li>
                <li>Be available during the estimated delivery window</li>
                <li>Inspect your order upon delivery before accepting</li>
                <li>Contact us immediately if anything seems incorrect</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Loyalty Program Impact</h2>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Points and Refunds</h3>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li>• Loyalty points earned on refunded orders will be deducted</li>
                  <li>• Points used for discounts will be restored upon refund</li>
                  <li>• Tier status may be adjusted if multiple refunds affect total spending</li>
                  <li>• Replacement orders earn points normally</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                If you're not satisfied with our initial resolution:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Escalate to our Restaurant Manager</li>
                <li>Request a callback from our Quality Assurance team</li>
                <li>Submit a formal complaint via email with order details</li>
                <li>We'll investigate and respond within 48 hours</li>
                <li>Final resolution will be communicated with clear next steps</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Policy Updates</h2>
              <p className="text-gray-700">
                This return policy may be updated periodically to reflect changes in our Indian food service or legal requirements. 
                We will notify customers of significant changes via email or website announcements. Continued use of our 
                North Indian cuisine delivery service constitutes acceptance of updated terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;