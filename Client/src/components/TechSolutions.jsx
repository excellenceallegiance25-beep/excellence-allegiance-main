import React from 'react';

const TechSolutions = () => {
  const solutions = [
    {
      icon: "💻",
      title: "Web Development",
      description: "Modern, responsive websites built with React, Next.js and latest technologies"
    },
    {
      icon: "📱", 
      title: "Mobile Apps",
      description: "Cross-platform mobile applications for iOS and Android using React Native"
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure on AWS, Azure and Google Cloud Platform"
    },
    {
      icon: "🤖",
      title: "AI & ML",
      description: "Artificial Intelligence and Machine Learning solutions for smart automation"
    },
    {
      icon: "🔒",
      title: "Cyber Security",
      description: "Complete security solutions to protect your digital assets and data"
    },
    {
      icon: "📊",
      title: "Data Analytics",
      description: "Data-driven insights and analytics for informed business decisions"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Technology Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver comprehensive digital solutions that drive growth and innovation for your business
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-4xl mb-4">{solution.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{solution.title}</h3>
              <p className="text-gray-600 leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSolutions;