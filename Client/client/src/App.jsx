import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/AboutPage';
import Services from './pages/OurService';
import Contact from './pages/ContactPage';
import FAQ from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { OtpProvider } from './contexts/OtpContext'; 
import AdminDashboard from './pages/AdminDashboard';
import CreateProject from './pages/CreateProject';
import PaymentPage from './pages/PaymentPage';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Testimonials from './components/Testimonials';
import AIChatbot from './components/AIChatbot';
import './App.css';

const FallbackHome = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
    <div className="text-center text-white">
      <h1 className="text-5xl font-bold mb-4">Excellence Allegiance</h1>
      <p className="text-xl mb-8">Your Trusted IT Solutions Partner</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/about" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Learn More
        </a>
        <a href="/contact" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
          Contact Us
        </a>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <OtpProvider> 
        <Router>
          <div className="min-h-screen flex flex-col relative">
            <Navbar />
            <main className="flex-grow pb-32">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/projects/new" element={<CreateProject />} />
                <Route path="/payments" element={<PaymentPage />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="*" element={<FallbackHome />} />
              </Routes>
            </main>
            <Footer />
            <AIChatbot />
            
            {/* WhatsApp Button with Flaticon Icon */}
            <div className="fixed bottom-6 right-6 z-[9999] group">
              <a 
                href="https://wa.me/916289534780" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-16 h-16 bg-green-500 rounded-full shadow-xl hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-2xl flex items-center justify-center"
              >
                {/* Flaticon WhatsApp Icon */}
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
              </a>
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm shadow-lg">
                Chat on WhatsApp
                <div className="absolute top-full right-3 transform -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
              </div>
              
              {/* Ping Animation */}
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 -z-10"></div>
            </div>
            
          </div>
        </Router>
      </OtpProvider>
    </AuthProvider>
  );
}

export default App;