import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-20 right-16 w-20 h-20 bg-purple-300 rounded-full opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-pink-300 rounded-full opacity-25 animate-pulse" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-cyan-300 rounded-full opacity-35 animate-bounce" style={{animationDuration: '5s'}}></div>
        
        <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-yellow-300 rounded-lg opacity-30 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-green-300 rounded-lg opacity-25 animate-pulse" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-10 h-10 bg-red-300 rounded-full opacity-40 animate-bounce" style={{animationDuration: '6s'}}></div>
        
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-200 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-200 opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <Navbar />
      
      <div className="pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
            
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Terms of Service
              </h1>
              <p className="text-gray-600 text-lg">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Excellence Allegiance</h2>
              <p className="text-gray-700 mb-4">
                These Terms of Service govern your use of Excellence Allegiance and provide information about our services. 
                Please read these terms carefully before using our platform.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h3>
                <p className="text-gray-700 mb-2">
                  By accessing or using Excellence Allegiance, you agree to be bound by these Terms of Service and our Privacy Policy. 
                  If you disagree with any part of these terms, you may not access our services.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">2. User Accounts</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>2.1 Account Creation:</strong> You must provide accurate and complete information when creating an account.
                  </p>
                  <p className="text-gray-700">
                    <strong>2.2 Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.
                  </p>
                  <p className="text-gray-700">
                    <strong>2.3 Account Usage:</strong> You may not share your account with others or use others' accounts.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Services</h3>
                <p className="text-gray-700 mb-2">
                  Excellence Allegiance provides business management tools, analytics, and collaboration features. 
                  We reserve the right to modify, suspend, or discontinue any part of our services at any time.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">4. User Responsibilities</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>4.1 Compliance:</strong> You agree to use our services in compliance with all applicable laws and regulations.
                  </p>
                  <p className="text-gray-700">
                    <strong>4.2 Prohibited Activities:</strong> You may not:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                    <li>Use our services for any illegal purpose</li>
                    <li>Upload or share malicious software</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Violate intellectual property rights</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">5. Intellectual Property</h3>
                <p className="text-gray-700 mb-2">
                  All content, features, and functionality of Excellence Allegiance are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">6. Payments and Billing</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>6.1 Subscription Fees:</strong> Some features may require payment of subscription fees.
                  </p>
                  <p className="text-gray-700">
                    <strong>6.2 Billing Cycle:</strong> Fees are billed in advance on a recurring basis.
                  </p>
                  <p className="text-gray-700">
                    <strong>6.3 Cancellation:</strong> You may cancel your subscription at any time.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">7. Termination</h3>
                <p className="text-gray-700 mb-2">
                  We may suspend or terminate your account if you violate these Terms of Service. 
                  You may also terminate your account at any time by contacting us.
                </p>
              </section>

             
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">8. Disclaimer of Warranties</h3>
                <p className="text-gray-700 mb-2">
                  Our services are provided "as is" without warranties of any kind, either express or implied. 
                  We do not guarantee that our services will be uninterrupted or error-free.
                </p>
              </section>

             
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">9. Limitation of Liability</h3>
                <p className="text-gray-700 mb-2">
                  To the fullest extent permitted by law, Excellence Allegiance shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                </p>
              </section>
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">10. Changes to Terms</h3>
                <p className="text-gray-700 mb-2">
                  We reserve the right to modify these Terms of Service at any time. 
                  We will notify users of significant changes through our platform or via email.
                </p>
              </section>
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">11. Governing Law</h3>
                <p className="text-gray-700 mb-2">
                  These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
                </p>
              </section>
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">12. Contact Information</h3>
                <p className="text-gray-700 mb-2">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@excellenceallegiance.com<br/>
                    <strong>Address:</strong> [Your Company Address]<br/>
                    <strong>Phone:</strong> [Your Contact Number]
                  </p>
                </div>
              </section>
              // TermsOfService.js e contact section er por
<section>
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Related Policies</h2>
  <p className="text-gray-700">
    Please also visit our other policy pages:
  </p>
  <div className="mt-3 space-x-4">
    <Link to="/cookie-policy" className="text-blue-600 hover:text-blue-800 font-medium">
      Cookie Policy
    </Link>
    
  </div>
</section>
            </div>
            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Agreement</h3>
              <p className="text-blue-700">
                By using Excellence Allegiance, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>

          
            <div className="mt-8 text-center">
              <Link 
                to="/register" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Registration
              </Link>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default TermsOfService;