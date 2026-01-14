import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What services do you offer?",
          answer: "We offer web development, mobile app development, e-commerce solutions, cloud services, AI/ML solutions, and IT consulting services."
        },
        {
          question: "Where is your company located?",
          answer: "We are based in Kolkata, West Bengal, India, but we serve clients worldwide."
        },
        {
          question: "Do you work with international clients?",
          answer: "Yes, we have experience working with clients from various countries including USA, UK, Canada, Australia, and Middle Eastern countries."
        }
      ]
    },
    {
      category: "Project & Development",
      questions: [
        {
          question: "What is your development process?",
          answer: "Our process includes: 1) Requirement Analysis, 2) Planning & Design, 3) Development, 4) Testing, 5) Deployment, and 6) Support & Maintenance."
        },
        {
          question: "Do you provide project timelines?",
          answer: "Yes, we provide detailed project timelines and regular progress updates throughout the development process."
        },
        {
          question: "Can you work with our existing team?",
          answer: "Absolutely! We can collaborate with your in-house team and work as an extension of your development department."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          question: "What are your payment terms?",
          answer: "We require 50% advance and 50% on delivery. For larger projects, we offer flexible payment plans with milestones."
        },
        {
          question: "Do you offer maintenance packages?",
          answer: "Yes, we offer monthly and yearly maintenance packages that include updates, security patches, and technical support."
        },
        {
          question: "Are there any hidden costs?",
          answer: "No, we provide transparent pricing with no hidden costs. All charges are discussed and approved before starting the project."
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
    
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">FAQ</h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto">
              Frequently Asked Questions - Everything you need to know about our services
            </p>
          </div>
        </div>
      </section>

    
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => {
                    const globalIndex = categoryIndex * 10 + index;
                    return (
                      <div
                        key={globalIndex}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <span className="text-lg font-semibold text-gray-800 flex-1">
                            {faq.question}
                          </span>
                          <span className={`text-xl font-bold text-blue-600 transition-transform duration-300 ${
                            activeIndex === globalIndex ? 'rotate-180' : ''
                          }`}>
                            {activeIndex === globalIndex ? '−' : '+'}
                          </span>
                        </button>

                        <div
                          className={`transition-all duration-300 ${
                            activeIndex === globalIndex
                              ? 'max-h-48 opacity-100'
                              : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Still have questions?</h3>
              <p className="text-xl mb-8 text-blue-100">
                Can't find the answer you're looking for? Please contact our friendly team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  Contact Us
                </a>
                <a
                  href="tel:+916289534780"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default FAQPage;