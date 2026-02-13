import React, { useState } from 'react';
import { Search, HelpCircle, BookOpen, MessageSquare, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';

const HelpPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your email.'
    },
    {
      id: 2,
      question: 'How can I update my profile information?',
      answer: 'Navigate to your Profile page from the dashboard sidebar. Click the "Edit Profile" button to update your personal information, then click "Save Changes".'
    },
    {
      id: 3,
      question: 'What should I do if I encounter a bug?',
      answer: 'Please report any bugs or issues to our support team using the contact form below. Include details about the problem and steps to reproduce it.'
    },
    {
      id: 4,
      question: 'How do I request time off?',
      answer: 'Go to the Attendance page and click "Request Leave". Fill out the leave request form with your dates and reason, then submit for approval.'
    },
    {
      id: 5,
      question: 'Where can I find project documentation?',
      answer: 'All project documentation is available in the Projects section. Click on any project to view its documents, tasks, and team members.'
    },
  ];

  const contactMethods = [
    { icon: Phone, title: 'Phone Support', details: '+1 (555) 123-4567', hours: 'Mon-Fri, 9AM-6PM EST' },
    { icon: Mail, title: 'Email Support', details: 'support@technexus.com', hours: '24/7 Response within 24 hours' },
    { icon: MessageSquare, title: 'Live Chat', details: 'Available on dashboard', hours: 'Mon-Fri, 9AM-5PM EST' },
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6">
            <HelpCircle className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8">Find answers to common questions or contact our support team</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for help articles..."
                className="pl-10 w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center mb-8">
                <BookOpen className="text-blue-500 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 rounded-lg"
                    >
                      <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                      {openFaq === faq.id ? (
                        <ChevronUp className="text-gray-500" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-500" size={20} />
                      )}
                    </button>
                    {openFaq === faq.id && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Support</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your issue or question..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Methods & Quick Links */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">Contact Methods</h3>
              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="bg-white/20 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Icon size={20} className="mr-3" />
                        <h4 className="font-medium">{method.title}</h4>
                      </div>
                      <p className="text-lg font-semibold">{method.details}</p>
                      <p className="text-sm opacity-90 mt-1">{method.hours}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Links</h3>
              <div className="space-y-4">
                <a href="#" className="block p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700">
                  User Documentation
                </a>
                <a href="#" className="block p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-green-700">
                  Video Tutorials
                </a>
                <a href="#" className="block p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700">
                  API Documentation
                </a>
                <a href="#" className="block p-4 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-lg text-yellow-700">
                  System Status
                </a>
              </div>
            </div>

            {/* Support Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Support Status</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="font-medium text-green-900">All Systems Operational</span>
                  </div>
                  <p className="text-sm text-green-700 mt-2">No ongoing incidents reported</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Response Time</span>
                    <span className="font-medium">2.4 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Satisfaction Rate</span>
                    <span className="font-medium">96%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Open Tickets</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;