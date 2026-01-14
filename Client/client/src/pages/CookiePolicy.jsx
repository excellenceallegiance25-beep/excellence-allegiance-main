import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-20 right-16 w-20 h-20 bg-purple-300 rounded-full opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-pink-300 rounded-full opacity-25 animate-pulse" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-cyan-300 rounded-full opacity-35 animate-bounce" style={{animationDuration: '5s'}}></div>
        
        <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-yellow-300 rounded-lg opacity-30 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-green-300 rounded-lg opacity-25 animate-pulse" style={{animationDuration: '3s'}}></div>
      </div>

      <Navbar />
      
      <div className="pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
         
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
            
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Cookie Policy
              </h1>
              <p className="text-gray-600 text-lg">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

          
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. What Are Cookies</h2>
                  <p className="text-gray-700 mb-4">
                    Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                    They help us provide you with a better experience and understand how you use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Cookies</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Essential Cookies</h3>
                      <p className="text-gray-700">
                        These cookies are necessary for the website to function properly. They enable core functionality such as security, 
                        network management, and account access.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Analytics Cookies</h3>
                      <p className="text-gray-700">
                        We use these cookies to understand how visitors interact with our website. They help us improve our services 
                        by collecting and reporting information anonymously.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Preference Cookies</h3>
                      <p className="text-gray-700">
                        These cookies allow our website to remember choices you make and provide enhanced, more personal features.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Marketing Cookies</h3>
                      <p className="text-gray-700">
                        These cookies are used to track visitors across websites. The intention is to display ads that are relevant 
                        and engaging for individual users.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Types of Cookies We Use</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Cookie Type</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Purpose</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">Session Cookies</td>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">Maintain your session state</td>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">Until browser closed</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">Authentication Cookies</td>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">Keep you logged in</td>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">30 days</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">Preference Cookies</td>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">Remember your settings</td>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">1 year</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">Analytics Cookies</td>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">Website usage statistics</td>
                          <td className="px-4 py-3 text-sm text-gray-700 border-b">2 years</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Managing Cookies</h2>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer 
                      and you can set most browsers to prevent them from being placed.
                    </p>
                    <p className="text-gray-700">
                      To manage your cookie preferences, you can:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                      <li>Adjust your browser settings to refuse cookies</li>
                      <li>Delete existing cookies from your browser</li>
                      <li>Use our cookie preference center (if available)</li>
                      <li>Use browser extensions to manage cookies</li>
                    </ul>
                    <p className="text-gray-700">
                      Please note that if you disable cookies, some features of our website may not function properly.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Third-Party Cookies</h2>
                  <p className="text-gray-700">
                    We may also use various third-party cookies to report usage statistics of the service, deliver advertisements 
                    on and through the service, and so on. These third parties may set cookies to help us track user behavior.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Updates to This Policy</h2>
                  <p className="text-gray-700">
                    We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new 
                    Cookie Policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions about our use of cookies, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mt-3">
                    <p className="text-gray-700">
                      <strong>Email:</strong> privacy@excellenceallegiance.com<br/>
                      <strong>Address:</strong> 123 Business Street, City, State 12345<br/>
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                  </div>
                </section>
              </div>

              <div className="mt-12 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h3>
                <p className="text-yellow-700">
                  By continuing to use our website without changing your settings, you consent to our use of cookies 
                  as described in this policy.
                </p>
              </div>

             
              <div className="mt-8 text-center">
                <Link 
                  to="/" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default CookiePolicy;