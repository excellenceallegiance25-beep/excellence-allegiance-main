import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = "916289534780";
  const message = "Hello! I'm interested in your services.";

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 hover:shadow-xl group"
        aria-label="Chat on WhatsApp"
      >
        <div className="flex items-center justify-center w-full h-full">
          <svg 
            className="w-8 h-8 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2m0 2a8 8 0 00-8 8c0 1.85.63 3.55 1.68 4.91l-1.35 4.36 4.43-1.3A7.94 7.94 0 0012 20a8 8 0 008-8 8 8 0 00-8-8m4.44 11.82c-.25.7-1.41 1.28-1.96 1.36-.46.07-.9.09-2.77-.59-2.43-.88-4-3-4.12-3.14-.12-.14-.97-1.27-.97-2.43s.6-1.77.84-2.02c.23-.25.62-.32.83-.32h.48c.18 0 .39 0 .57.6.22.72.76 2.5.82 2.68.06.18.1.4 0 .62-.1.22-.15.34-.3.53-.15.19-.32.42-.46.57-.15.16-.3.33-.13.63.17.3.75 1.26 1.61 2.04 1.1 1 2.03 1.32 2.34 1.47.3.15.48.13.66.08.18-.05.86-.35 1.1-.7.25-.35.48-.4.74-.35.26.05 1.67.79 1.96.94.29.15.49.22.56.34.07.12.07.7-.18 1.4z"/>
          </svg>
        </div>
        <div className="absolute bottom-16 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium">
          Chat with us! 👋
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white transform rotate-45"></div>
        </div>
      </a>
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
    </div>
  );
};

export default WhatsAppButton;