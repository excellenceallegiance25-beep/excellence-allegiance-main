import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Excellence Allegiance
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Excellence Allegiance provides end-to-end technology services including full-stack development, 
              DevOps, cybersecurity, and IT consulting to build robust digital ecosystems.
            </p>
            <div className="flex space-x-4">
              {/* Facebook Link */}
              <a 
                href="https://www.facebook.com/profile.php?id=100067161553265" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* LinkedIn Link */}
              <a 
                href="https://www.facebook.com/share/1GsJ42mGLn/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors duration-300">
                Home
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors duration-300">
                About Us
              </Link>
              <Link to="/projects" className="block text-gray-300 hover:text-white transition-colors duration-300">
                Our Projects
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors duration-300">
                Contact Us
              </Link>
              <Link to="/faq" className="block text-gray-300 hover:text-white transition-colors duration-300">
                FAQs
              </Link>
              <Link to="/faq" className="block text-gray-300 hover:text-white transition-colors duration-300">
                Careers
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-300">
                Web Development
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-300">
                Mobile Apps
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-300">
                Cloud Solutions
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-300">
                AI & ML
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">📍</span>
                <div>
                  <p className="text-gray-300">1/16, Netai nagar, Singhabari road, Mukundapur, Kolkata-700099, West Bengal, India</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-cyan-400 mr-3">📞</span>
                <a href="tel:6289534780" className="text-gray-300 hover:text-white transition-colors duration-300">
                  6289534780
                </a>
              </div>
              <div className="flex items-center">
                <span className="text-cyan-400 mr-3">✉️</span>
                <a href="mailto:contact@myeapi.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                  contact@myeapi.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Excellence Allegiance Private Limited. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
  Terms of Service
</Link>
          
<Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
  Cookie Policy
</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;