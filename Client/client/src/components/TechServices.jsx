import React from 'react';

const TechServices = () => {
  const services = [
    {
      title: "Custom Software Development",
      description: "Tailored software solutions designed specifically for your business needs",
      features: ["Web Applications", "Desktop Software", "API Development", "Database Design"]
    },
    {
      title: "E-Commerce Solutions", 
      description: "Complete online store development with secure payment integration",
      features: ["Online Store", "Payment Gateway", "Inventory Management", "Order Processing"]
    },
    {
      title: "IT Consulting",
      description: "Strategic technology consulting to optimize your business processes",
      features: ["Tech Strategy", "System Architecture", "Digital Transformation", "Process Optimization"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            End-to-end technology services to accelerate your digital journey
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechServices;