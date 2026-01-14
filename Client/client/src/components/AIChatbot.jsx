// src/components/AIChatbot.jsx
import React, { useState, useEffect, useRef } from 'react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! 👋 I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const responses = [
        "I understand you're asking about our services. We offer web development, mobile apps, and AI solutions.",
        "For pricing details, it depends on your project requirements. Would you like a free consultation?",
        "Our team uses React, Node.js, Python, and modern technologies to build scalable solutions.",
        "You can contact us via email or WhatsApp for immediate assistance.",
        "We typically complete projects within 2-4 weeks depending on complexity."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-[9998] w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center justify-center group"
      >
        <span className="text-white text-2xl">🤖</span>
        <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          AI Assistant
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-32 right-6 z-[10000] w-80 md:w-96 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">🤖</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Assistant</h3>
              <p className="text-sm text-blue-200">Online • 24/7 Support</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 text-xl p-1"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-80 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-3 ${message.sender === 'user' ? 'text-right' : ''}`}
          >
            <div
              className={`inline-block max-w-[80%] p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm border'
              }`}
            >
              {message.text}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {message.sender === 'bot' ? 'AI Assistant' : 'You'}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="mb-3">
            <div className="inline-block bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-2 bg-gray-100 border-t">
        <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Services?",
            "Pricing?",
            "Technologies?",
            "Contact?",
            "Timeline?"
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-xs bg-white border border-blue-200 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              inputText.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI responses are simulated for demonstration
        </p>
      </div>
    </div>
  );
};

export default AIChatbot;