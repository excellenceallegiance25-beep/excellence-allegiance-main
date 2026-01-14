import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info with Logo */}
          <div className="space-y-4">
            <div className="flex items-left space-x-2">
              <div className=" h-70 w-20 flex-shrink">
                <img
                  src="/eapl.png"
                  alt="Excellence Allegience Logo"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/48x48?text=EA";
                  }}
                />
              </div>

              {/* Company Name */}
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Excellence Allegiance
                </h3>
                <p className="text-sm text-gray-400 mt-1">.PVT LTD</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed pt-2">
              Excellence Allegiance provides end-to-end technology services
              including full-stack development, DevOps, cybersecurity, and IT
              consulting to build robust digital ecosystems.
            </p>

            <div className="flex space-x-4 pt-2">
              {/* Facebook Link */}
              <a
                href="https://www.facebook.com/profile.php?id=100067161553265"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram Link */}
              <a
                href="https://instagram.com/excellenceallegiance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600 transition-colors duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://www.linkedin.com/company/excellence-allegiance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-700 transition-colors duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                About Us
              </Link>
              <Link
                to="/projects"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                Our Projects
              </Link>
              <Link
                to="/contact"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                Contact Us
              </Link>
              <Link
                to="/faq"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                FAQs
              </Link>
              <Link
                to="/careers"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                Careers
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Our Services
            </h4>
            <div className="space-y-2">
              <Link
                to="/services/web-development"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                Web Development
              </Link>
              <Link
                to="/services/mobile-apps"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                Mobile Apps
              </Link>
              <Link
                to="/services/cloud-solutions"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                Cloud Solutions
              </Link>
              <Link
                to="/services/ai-ml"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                AI & ML
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">📍</span>
                <div>
                  <p className="text-gray-300">
                    1/16, Netai nagar, Singhabari road, Mukundapur,
                    Kolkata-700099, West Bengal, India
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-cyan-400 mr-3">📞</span>
                <a
                  href="tel:+916289534780"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  +91 62895 34780
                </a>
              </div>
              <div className="flex items-center">
                <span className="text-cyan-400 mr-3">✉️</span>
                <a
                  href="mailto:contact@myeapi.com"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  contact@myeapl.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              {/* Small logo in copyright section */}
              <div className="h-18 w-8">
                <img
                  src="/eapl.png"
                  alt="EA Logo"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                   
                  }}
                />
              </div>
              <div className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Excellence Allegiance Private
                Limited. All rights reserved.
              </div>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookie-policy"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
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
