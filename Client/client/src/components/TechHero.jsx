import React from 'react';

const TechHero = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center text-center text-white relative"
      style={{
        backgroundImage: 'url("/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Excellence Allegiance</h1>
        <p className="text-xl md:text-2xl mb-8">Technology Solutions</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default TechHero;