import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("General Questions");
  const [openItems, setOpenItems] = useState([]);

  const faqData = [
    {
      id: "general",
      category: "General Questions",
      icon: "🌐",
      gradient: "from-cyan-500 to-blue-500",
      questions: [
        {
          question: "What services do you offer?",
          answer: "We offer web development, mobile app development, e-commerce solutions, cloud services, AI/ML solutions, and IT consulting services.",
          tags: ["services", "overview"]
        },
        {
          question: "Where is your company located?",
          answer: "We are based in Kolkata, West Bengal, India, but we serve clients worldwide.",
          tags: ["location", "global"]
        },
        {
          question: "Do you work with international clients?",
          answer: "Yes, we have experience working with clients from USA, UK, Canada, Australia, and Middle Eastern countries.",
          tags: ["international", "clients"]
        }
      ]
    },
    {
      id: "project",
      category: "Project & Development",
      icon: "🚀",
      gradient: "from-purple-500 to-pink-500",
      questions: [
        {
          question: "What is your development process?",
          answer: "Our process includes: 1) Requirement Analysis, 2) Planning & Design, 3) Development, 4) Testing, 5) Deployment, and 6) Support.",
          tags: ["process", "methodology"]
        },
        {
          question: "Do you provide project timelines?",
          answer: "Yes, we provide detailed project timelines and regular progress updates throughout the development process.",
          tags: ["timeline", "progress"]
        },
        {
          question: "Can you work with our existing team?",
          answer: "Absolutely! We can collaborate with your in-house team and work as an extension of your development department.",
          tags: ["collaboration", "team"]
        }
      ]
    },
    {
      id: "pricing",
      category: "Pricing & Payment",
      icon: "💰",
      gradient: "from-amber-500 to-orange-500",
      questions: [
        {
          question: "What are your payment terms?",
          answer: "We require 50% advance and 50% on delivery. For larger projects, we offer flexible payment plans with milestones.",
          tags: ["payment", "terms"]
        },
        {
          question: "Do you offer maintenance packages?",
          answer: "Yes, we offer monthly and yearly maintenance packages that include updates, security patches, and technical support.",
          tags: ["maintenance", "support"]
        },
        {
          question: "Are there any hidden costs?",
          answer: "No, we provide transparent pricing with no hidden costs. All charges are discussed and approved before starting.",
          tags: ["transparency", "costs"]
        }
      ]
    },
    {
      id: "support",
      category: "Support & Maintenance",
      icon: "🔧",
      gradient: "from-emerald-500 to-teal-500",
      questions: [
        {
          question: "What support do you provide after launch?",
          answer: "We provide 6 months of free support, including bug fixes and minor updates. After that, we offer affordable maintenance packages.",
          tags: ["support", "post-launch"]
        },
        {
          question: "Do you provide training for our team?",
          answer: "Yes, we provide comprehensive training and documentation to help your team manage the system effectively.",
          tags: ["training", "documentation"]
        }
      ]
    }
  ];

  const toggleItem = (category, index) => {
    const itemId = `${category}-${index}`;
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <Navbar />
      
      <section className="pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 font-semibold animate-bounce">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <span>Frequently Asked Questions</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Your Questions
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Answered
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            Everything you need to know about Excellence Allegiance services
          </p>
        </div>
      </section>

      <section className="pb-32 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {faqData.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.category)}
                className={`
                  group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-500
                  ${activeCategory === category.category 
                    ? 'scale-105 shadow-2xl' 
                    : 'shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  }
                `}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    activeCategory === category.category 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700'
                      : 'text-gray-800'
                  }`}>
                    {category.category}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.questions.length} questions
                  </p>
                </div>
                
                {activeCategory === category.category && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData
                .find(c => c.category === activeCategory)
                ?.questions.map((faq, index) => {
                  const itemId = `${activeCategory}-${index}`;
                  const isOpen = openItems.includes(itemId);
                  const categoryGradient = faqData.find(c => c.category === activeCategory)?.gradient;
                  
                  return (
                    <div
                      key={index}
                      className={`
                        group relative overflow-hidden rounded-2xl shadow-lg border border-gray-200/50
                        transition-all duration-500 hover:shadow-xl
                        ${isOpen ? 'scale-[1.02]' : ''}
                      `}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${categoryGradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                      
                      <button
                        onClick={() => toggleItem(activeCategory, index)}
                        className="w-full px-8 py-6 text-left flex justify-between items-center gap-6 bg-white/80 backdrop-blur-sm"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${categoryGradient} text-white font-medium`}>
                              {faq.tags[0]}
                            </span>
                          </div>
                          <span className="text-lg font-semibold text-gray-900 group-hover:text-gray-800">
                            {faq.question}
                          </span>
                        </div>
                        
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isOpen 
                            ? 'bg-gradient-to-r from-gray-100 to-gray-200 rotate-180' 
                            : 'bg-gradient-to-r from-gray-50 to-gray-100'
                        }`}>
                          <span className={`text-xl font-bold transition-all duration-500 ${
                            isOpen 
                              ? 'text-cyan-600 scale-110' 
                              : 'text-gray-400 group-hover:text-gray-600'
                          }`}>
                            {isOpen ? '−' : '+'}
                          </span>
                        </div>
                      </button>

                      <div className={`
                        overflow-hidden transition-all duration-500
                        ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                      `}>
                        <div className="px-8 pb-8">
                          <div className="pl-6 border-l-4 border-gradient-to-b from-cyan-400 to-blue-400">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-6">
                            {faq.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="mt-20 text-center">
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              
              <div className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-3xl">🤖</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Still have questions?
                </h3>
                
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Our AI Assistant is available 24/7 to answer your questions instantly. 
                  Get personalized responses based on your specific needs.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-medium text-gray-700">Online • 24/7 Support</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Click the</span>
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                      🤖
                    </span>
                    <span>button below!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .border-gradient-to-b {
          background: linear-gradient(to bottom, #22d3ee, #3b82f6);
          background-clip: border-box;
        }
      `}</style>
    </div>
  );
};

export default FAQPage;