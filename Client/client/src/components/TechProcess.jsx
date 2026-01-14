import React from 'react';

const TechProcess = () => {
  const processSteps = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We understand your requirements and create a detailed project plan",
      icon: "🔍"
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Create wireframes, mockups and interactive prototypes",
      icon: "🎨"
    },
    {
      step: "03", 
      title: "Development",
      description: "Agile development with regular updates and feedback sessions",
      icon: "💻"
    },
    {
      step: "04",
      title: "Testing & Quality",
      description: "Comprehensive testing to ensure bug-free delivery",
      icon: "🧪"
    },
    {
      step: "05",
      title: "Deployment",
      description: "Smooth deployment with proper documentation and training",
      icon: "🚀"
    },
    {
      step: "06",
      title: "Support & Maintenance",
      description: "Ongoing support and maintenance for optimal performance",
      icon: "🔧"
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Development Process
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A structured approach to deliver high-quality solutions on time
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-cyan-400 transition-all duration-300">
              <div className="text-3xl mb-4">{step.icon}</div>
              <div className="text-cyan-400 text-lg font-bold mb-2">Step {step.step}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechProcess;