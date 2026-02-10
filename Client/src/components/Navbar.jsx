import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    
    setIsVisible(true);
    setLastScrollY(0);
  }, [location, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isLoading]);

  // Skeleton Components
  const DesktopNavSkeleton = () => (
    <div className="hidden md:flex items-center space-x-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="relative">
          <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
      ))}
      <div className="flex items-center space-x-4 ml-4">
        <div className="w-20 h-10 bg-gray-700 rounded-xl animate-pulse"></div>
        <div className="w-24 h-10 bg-gray-700 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );

  const MobileNavSkeleton = () => (
    <div className="md:hidden flex items-center space-x-3">
      <div className="w-16 h-8 bg-gray-700 rounded-lg animate-pulse"></div>
      <div className="w-6 h-6 bg-gray-700 rounded animate-pulse"></div>
    </div>
  );

  const LogoLoading = () => (
    <div className="h-20 w-74 flex-shrink-0">
      <div className="h-full w-full bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg animate-pulse"></div>
    </div>
  );

  const MobileMenuSkeleton = () => (
    <div className="md:hidden bg-black/90 border-t border-gray-700 py-4">
      <div className="flex flex-col space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="py-2 px-4">
            <div className="w-full h-8 bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        ))}
        <div className="px-4 py-3">
          <div className="w-full h-12 bg-gray-700 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <nav className="fixed w-full top-0 z-50 bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <LogoLoading />
            </div>
            <DesktopNavSkeleton />
            <MobileNavSkeleton />
          </div>
          <MobileMenuSkeleton />
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-transparent`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-20 w-74 flex-shrink-0">
              <img
                src="/eapl.png"
                alt="Excellence Allegience Logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/96x48?text=EAPL";
                }}
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`relative font-medium transition-all duration-300 hover:scale-105 text-white ${
                location.pathname === "/" ? "text-white-600 font-semibold" : ""
              }`}
            >
              Home
              {location.pathname === "/" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5"></span>
              )}
            </Link>

            <Link
              to="/about"
              className={`relative font-medium transition-all duration-300 hover:scale-105 text-white ${
                location.pathname === "/about"
                  ? "text-white-600 font-semibold"
                  : ""
              }`}
            >
              About
              {location.pathname === "/about" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5"></span>
              )}
            </Link>

            <Link
              to="/services"
              className={`relative font-medium transition-all duration-300 hover:scale-105 text-white ${
                location.pathname === "/services"
                  ? "text-white-600 font-semibold"
                  : ""
              }`}
            >
              Our Service
              {location.pathname === "/services" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5"></span>
              )}
            </Link>

            <div className="flex items-center space-x-4 ml-4">
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-green-600 text-white hover:bg-green-700 shadow-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              >
                Register
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-lg font-semibold transition-all duration-300 text-sm bg-green-600 text-white hover:bg-green-700"
            >
              Login
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none transition-all duration-300 text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-black/90 border-t border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About" },
                { path: "/services", label: "Our Service" },
                { path: "/contact", label: "Contact" },
                { path: "/faq", label: "FAQ" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-all duration-300 py-2 px-4 rounded-lg ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-white hover:text-blue-400 hover:bg-gray-800"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/register"
                className="text-center px-4 py-3 rounded-xl font-semibold transition-all duration-300 mt-4 bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;