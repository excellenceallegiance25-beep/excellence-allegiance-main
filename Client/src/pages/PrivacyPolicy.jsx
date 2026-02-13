import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
     
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-300">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </section>

     
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
             
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to Excellence Allegiance. We are committed to protecting 
                  your personal information and your right to privacy. If you have any questions or concerns 
                  about this privacy policy or our practices with regard to your personal information, 
                  please contact us at contact@myeapi.com.
                </p>
                <p className="text-gray-600">
                  This Privacy Policy applies to all information collected through our website and any 
                  related services, sales, marketing, or events.
                </p>
              </div>

             
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Information We Collect</h2>
                
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h3>
                <p className="text-gray-600 mb-4">
                  We collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Register on our website</li>
                  <li>Express interest in obtaining information about us or our products and services</li>
                  <li>Participate in activities on our website</li>
                  <li>Contact us for customer support</li>
                </ul>

                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Automatically Collected Information</h3>
                <p className="text-gray-600 mb-4">
                  We automatically collect certain information when you visit our website:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>IP address and browser type</li>
                  <li>Operating system and device information</li>
                  <li>Pages you view and links you click</li>
                  <li>Dates and times of access</li>
                </ul>
              </div>

    
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">3. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect for various purposes:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>To provide and maintain our services</li>
                  <li>To notify you about changes to our services</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our services</li>
                  <li>To monitor the usage of our services</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </div>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Data Sharing and Disclosure</h2>
                <p className="text-gray-600 mb-4">
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>With Service Providers:</strong> We may share your data with third-party vendors who perform services for us.</li>
                  <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with a merger or sale.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information where required by law.</li>
                </ul>
              </div>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational security measures designed to protect 
                  the security of any personal information we process. However, please also remember that we 
                  cannot guarantee that the internet itself is 100% secure.
                </p>
              </div>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Your Privacy Rights</h2>
                <p className="text-gray-600 mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify or update your personal data</li>
                  <li>Delete your personal data</li>
                  <li>Restrict the processing of your data</li>
                  <li>Data portability</li>
                  <li>Object to the processing of your data</li>
                </ul>
              </div>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Cookies and Tracking Technologies</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and 
                  store certain information. You can instruct your browser to refuse all cookies or to 
                  indicate when a cookie is being sent.
                </p>
              </div>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Updates to This Policy</h2>
                <p className="text-gray-600 mb-4">
                  We may update this Privacy Policy from time to time. The updated version will be indicated 
                  by an updated "Last updated" date and the updated version will be effective as soon as it is accessible.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have questions or comments about this policy, you may contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 font-semibold">Excellence Allegiance Pvt Ltd</p>
                  <p className="text-gray-600">Email: contact@myeapi.com</p>
                  <p className="text-gray-600">Phone:6289534780</p>
                  <p className="text-gray-600">Address: 1/16, Netai nagar, Singhabari road, Mukundapur, Kolkata-700099, West Bengal, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy; 