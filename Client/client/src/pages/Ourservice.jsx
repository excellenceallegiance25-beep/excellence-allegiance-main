import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

const OurService = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedService, setExpandedService] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeProcess, setActiveProcess] = useState(null);
  const [activePricingTab, setActivePricingTab] = useState('project');

  // ========== CORE SERVICES ==========
  const services = useMemo(() => [
    {
      id: 1,
      title: "Custom Web Development",
      category: "development",
      icon: "🌐",
      description: "Responsive websites & web applications with modern frameworks",
      features: ["React/Next.js", "Node.js/Python", "MongoDB/PostgreSQL", "REST/GraphQL APIs", "SEO Optimized"],
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
      details: "We build scalable web applications from simple landing pages to complex enterprise solutions. Our expertise includes frontend, backend, database design, and API development.",
      timeline: "4-12 weeks",
      delivery: "Source code + Documentation + Deployment",
      pricing: {
        project: "$2,000 - $25,000+",
        monthly: "Custom",
        hourly: "$25 - $50/hr"
      },
      deliverables: ["Fully responsive design", "Admin panel", "API integration", "SEO setup", "Analytics"]
    },
    {
      id: 2,
      title: "Mobile App Development",
      category: "mobile",
      icon: "📱",
      description: "Cross-platform mobile apps for iOS & Android",
      features: ["React Native/Flutter", "Push Notifications", "Offline Support", "App Store Deployment"],
      technologies: ["React Native", "Flutter", "Firebase", "Redux"],
      details: "Create engaging mobile experiences that work seamlessly across devices. We handle everything from UI/UX design to app store submission.",
      timeline: "6-16 weeks",
      delivery: "APK/IPA files + App store setup",
      pricing: {
        project: "$5,000 - $50,000+",
        monthly: "Custom",
        hourly: "$30 - $60/hr"
      },
      deliverables: ["iOS & Android apps", "Admin dashboard", "Push notification system", "Analytics dashboard"]
    },
    {
      id: 3,
      title: "E-commerce Solutions",
      category: "ecommerce",
      icon: "🛒",
      description: "Complete online store development",
      features: ["Payment Integration", "Inventory Management", "Order Tracking", "Multi-vendor Support"],
      technologies: ["Shopify", "WooCommerce", "Magento", "Stripe", "Razorpay"],
      details: "Build powerful e-commerce platforms with secure payment gateways, inventory management, and customer analytics.",
      timeline: "4-8 weeks",
      delivery: "Live store + Admin access",
      pricing: {
        project: "$3,000 - $20,000",
        monthly: "$199 - $999",
        hourly: "$25 - $45/hr"
      },
      deliverables: ["Product catalog", "Payment gateway", "Order management", "Customer portal", "Analytics"]
    },
    {
      id: 4,
      title: "Cloud & DevOps",
      category: "cloud",
      icon: "☁️",
      description: "Cloud infrastructure & deployment automation",
      features: ["AWS/Azure/GCP", "Docker/Kubernetes", "CI/CD Pipeline", "Monitoring & Scaling"],
      technologies: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
      details: "Set up scalable cloud infrastructure with automated deployment, monitoring, and security best practices.",
      timeline: "2-4 weeks",
      delivery: "Infrastructure as Code + Documentation",
      pricing: {
        project: "$1,500 - $10,000",
        monthly: "$299 - $1,999",
        hourly: "$35 - $70/hr"
      },
      deliverables: ["Cloud architecture", "CI/CD pipeline", "Monitoring setup", "Security configuration"]
    },
    {
      id: 5,
      title: "AI/ML Solutions",
      category: "ai",
      icon: "🤖",
      description: "Artificial Intelligence & Machine Learning development",
      features: ["Predictive Analytics", "Chatbots", "Computer Vision", "NLP", "Recommendation Systems"],
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenCV", "FastAPI"],
      details: "Implement AI-powered solutions to automate processes, analyze data, and enhance user experiences.",
      timeline: "8-20 weeks",
      delivery: "Trained models + API endpoints",
      pricing: {
        project: "$10,000 - $100,000+",
        monthly: "Custom",
        hourly: "$50 - $100/hr"
      },
      deliverables: ["ML models", "API endpoints", "Training dataset", "Documentation", "Deployment scripts"]
    },
    {
      id: 6,
      title: "UI/UX Design",
      category: "design",
      icon: "🎨",
      description: "User-centered design for digital products",
      features: ["Wireframing", "Prototyping", "User Testing", "Design Systems", "Responsive Design"],
      technologies: ["Figma", "Adobe XD", "Sketch", "Illustrator"],
      details: "Create intuitive and beautiful user interfaces that enhance user engagement and drive conversions.",
      timeline: "2-6 weeks",
      delivery: "Design files + Style guide",
      pricing: {
        project: "$1,000 - $15,000",
        monthly: "$499 - $2,999",
        hourly: "$20 - $50/hr"
      },
      deliverables: ["Wireframes", "Mockups", "Prototypes", "Design system", "Assets export"]
    },
    {
      id: 7,
      title: "Digital Marketing",
      category: "marketing",
      icon: "📈",
      description: "Complete digital marketing strategies",
      features: ["SEO", "PPC Campaigns", "Social Media Marketing", "Content Strategy", "Analytics"],
      technologies: ["Google Ads", "Facebook Ads", "Google Analytics", "SEMrush"],
      details: "Drive traffic, generate leads, and increase conversions with data-driven digital marketing campaigns.",
      timeline: "Ongoing",
      delivery: "Monthly reports + Campaign management",
      pricing: {
        project: "Custom",
        monthly: "$499 - $5,000",
        hourly: "$15 - $40/hr"
      },
      deliverables: ["SEO audit", "Campaign strategy", "Content calendar", "Performance reports"]
    },
    {
      id: 8,
      title: "IT Consulting",
      category: "consulting",
      icon: "💼",
      description: "Technology strategy & advisory services",
      features: ["Tech Stack Selection", "Architecture Review", "Digital Transformation", "Team Training"],
      technologies: ["Strategy", "Architecture", "Best Practices", "Training"],
      details: "Get expert advice on technology selection, architecture design, and digital transformation strategies.",
      timeline: "Flexible",
      delivery: "Strategy document + Implementation plan",
      pricing: {
        project: "Custom",
        monthly: "$999 - $10,000",
        hourly: "$50 - $150/hr"
      },
      deliverables: ["Technology roadmap", "Architecture design", "Implementation plan", "Team training"]
    }
  ], []);

  // ========== NEW SECTIONS DATA ==========

  // 1. Development Process
  const developmentProcess = useMemo(() => [
    {
      step: 1,
      title: "Discovery & Planning",
      icon: "🔍",
      description: "Requirements gathering, project scope, and roadmap creation",
      duration: "1-2 weeks",
      deliverables: ["Project brief", "Wireframes", "Timeline"]
    },
    {
      step: 2,
      title: "Design & Prototyping",
      icon: "🎨",
      description: "UI/UX design, user flows, and interactive prototypes",
      duration: "2-3 weeks",
      deliverables: ["Design mockups", "Prototype", "Style guide"]
    },
    {
      step: 3,
      title: "Development",
      icon: "💻",
      description: "Agile development with weekly sprints and demos",
      duration: "4-12 weeks",
      deliverables: ["Weekly updates", "Testable features", "Code reviews"]
    },
    {
      step: 4,
      title: "Testing & QA",
      icon: "🧪",
      description: "Comprehensive testing including functional, performance, and security",
      duration: "1-3 weeks",
      deliverables: ["Test reports", "Bug fixes", "Performance metrics"]
    },
    {
      step: 5,
      title: "Deployment",
      icon: "🚀",
      description: "Production deployment and launch preparation",
      duration: "1 week",
      deliverables: ["Live deployment", "Documentation", "Training"]
    },
    {
      step: 6,
      title: "Support & Maintenance",
      icon: "🔧",
      description: "Ongoing support, updates, and scaling",
      duration: "Ongoing",
      deliverables: ["Monitoring", "Updates", "Technical support"]
    }
  ], []);

  // 2. Industries We Serve
  const industries = useMemo(() => [
    { name: "Healthcare", icon: "🏥", services: ["EMR Systems", "Telemedicine", "Patient Portals"] },
    { name: "Education", icon: "🎓", services: ["LMS Platforms", "E-learning Apps", "Student Management"] },
    { name: "E-commerce", icon: "🛒", services: ["Online Stores", "Marketplaces", "Payment Solutions"] },
    { name: "Finance", icon: "🏦", services: ["FinTech Apps", "Banking Solutions", "Payment Gateways"] },
    { name: "Manufacturing", icon: "🏭", services: ["ERP Systems", "Inventory Management", "Supply Chain"] },
    { name: "Startups", icon: "🚀", services: ["MVP Development", "Scale-up Solutions", "Investor Demos"] },
    { name: "Real Estate", icon: "🏠", services: ["Property Portals", "CRM Systems", "Virtual Tours"] },
    { name: "Travel", icon: "✈️", services: ["Booking Platforms", "Travel Apps", "Reservation Systems"] }
  ], []);

  // 3. Technology Stack
  const techStack = useMemo(() => [
    { category: "Frontend", techs: ["React", "Next.js", "Vue.js", "Angular", "TypeScript"] },
    { category: "Backend", techs: ["Node.js", "Python", "Java", ".NET", "PHP"] },
    { category: "Mobile", techs: ["React Native", "Flutter", "iOS Swift", "Android Kotlin"] },
    { category: "Database", techs: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"] },
    { category: "Cloud", techs: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"] },
    { category: "AI/ML", techs: ["TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "FastAPI"] }
  ], []);

  // 4. Case Studies
  const caseStudies = useMemo(() => [
    {
      client: "HealthCare Plus",
      service: "Telemedicine Platform",
      results: ["40% faster appointments", "300% user growth", "95% patient satisfaction"],
      duration: "4 months"
    },
    {
      client: "EduTech Solutions",
      service: "Learning Management System",
      results: ["5000+ active users", "200+ courses launched", "98% uptime"],
      duration: "3 months"
    },
    {
      client: "Retail Chain",
      service: "E-commerce Platform",
      results: ["300% sales increase", "50% faster checkout", "24/7 availability"],
      duration: "5 months"
    }
  ], []);

  // 5. FAQ
  const faqs = useMemo(() => [
    {
      question: "What's your typical project timeline?",
      answer: "Timelines vary: MVP (4-8 weeks), Medium projects (2-4 months), Enterprise solutions (3-6 months). We provide detailed timelines after requirement analysis."
    },
    {
      question: "Do you provide post-launch support?",
      answer: "Yes! We offer 3 months free support post-launch, followed by flexible maintenance plans. Emergency support is available 24/7."
    },
    {
      question: "What's your development methodology?",
      answer: "We follow Agile methodology with 2-week sprints, regular demos, and continuous client collaboration for transparency."
    },
    {
      question: "Can you work with our existing team?",
      answer: "Absolutely! We excel at collaborating with in-house teams, providing expertise where needed and ensuring smooth integration."
    },
    {
      question: "How do you ensure code quality?",
      answer: "Through code reviews, automated testing, CI/CD pipelines, and following best practices like SOLID principles and clean architecture."
    }
  ], []);

  // 6. Pricing Models
  const pricingModels = useMemo(() => [
    {
      model: "Fixed Price",
      description: "Clear scope, fixed budget, predictable costs",
      bestFor: ["Well-defined projects", "Limited budgets", "Short timelines"],
      price: "$5,000 - $100,000+"
    },
    {
      model: "Time & Material",
      description: "Flexible scope, pay for actual work",
      bestFor: ["Evolving requirements", "Long-term projects", "Agile development"],
      price: "$25 - $150/hour"
    },
    {
      model: "Dedicated Team",
      description: "Exclusive team working on your project",
      bestFor: ["Large projects", "Ongoing development", "Complex requirements"],
      price: "$3,000 - $15,000/month"
    }
  ], []);

  // ========== EXISTING LOGIC ==========
  const filters = useMemo(() => [
    { key: 'all', label: 'All Services' },
    { key: 'development', label: 'Web Development' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'ecommerce', label: 'E-commerce' },
    { key: 'cloud', label: 'Cloud & DevOps' },
    { key: 'ai', label: 'AI/ML' },
    { key: 'design', label: 'UI/UX Design' },
    { key: 'marketing', label: 'Digital Marketing' },
    { key: 'consulting', label: 'IT Consulting' }
  ], []);

  const filteredServices = useMemo(() => {
    let result = services;
    if (activeFilter !== 'all') {
      result = result.filter(service => service.category === activeFilter);
    }
    if (searchQuery) {
      result = result.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return result;
  }, [activeFilter, searchQuery, services]);

  // Existing handlers
  const toggleService = useCallback((id) => {
    setExpandedService(prev => prev === id ? null : id);
  }, []);

  const handleFilterClick = useCallback((key) => {
    setActiveFilter(key);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // New handlers
  const toggleProcess = useCallback((step) => {
    setActiveProcess(prev => prev === step ? null : step);
  }, []);

  const toggleFAQ = useCallback((index) => {
    setActiveFAQ(prev => prev === index ? null : index);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              IT Services & Solutions
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            End-to-end technology solutions for digital transformation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-lg flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Start Your Project
            </Link>
            <a 
              href="#process" 
              className="border-2 border-white/30 hover:border-cyan-400 hover:bg-white/5 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 text-lg flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Our Process
            </a>
          </div>
        </div>
      </section>

      {/* ========== NEW: Stats Section ========== */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-sm md:text-base text-gray-700 font-medium">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">25+</div>
              <div className="text-sm md:text-base text-gray-700 font-medium">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-sm md:text-base text-gray-700 font-medium">Team Experts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-sm md:text-base text-gray-700 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEW: Technology Stack Section ========== */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technology Stack
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We work with modern technologies to build scalable and future-proof solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((stack, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">{stack.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {stack.techs.map((tech, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEW: Development Process Section ========== */}
      <section id="process" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Development Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transparent and collaborative approach ensuring project success
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>
            
            <div className="space-y-12">
              {developmentProcess.map((step, index) => (
                <div key={step.step} className={`relative flex ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
                  {/* Step number */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none lg:flex-1 lg:flex lg:justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`lg:w-5/12 mt-8 lg:mt-0 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'}`}>
                    <div 
                      className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => toggleProcess(step.step)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl">{step.icon}</div>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {step.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                        {activeProcess === step.step ? 'Show Less' : 'Learn More'}
                        <svg className={`w-4 h-4 ml-1 transform transition-transform ${activeProcess === step.step ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {activeProcess === step.step && (
                        <div className="mt-4 pt-4 border-t border-gray-100 animate-slideDown">
                          <h4 className="font-semibold text-gray-900 mb-2">Deliverables:</h4>
                          <ul className="space-y-1">
                            {step.deliverables.map((item, idx) => (
                              <li key={idx} className="flex items-center text-gray-600">
                                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Empty space for alignment */}
                  <div className="hidden lg:block lg:flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Filter Section (Existing - Modified) */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions tailored to your business needs
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-12">
            <div className="relative max-w-xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search services (e.g., 'React', 'E-commerce', 'Mobile')..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-6 py-4 pl-12 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 focus:outline-none transition-all text-base shadow-sm"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleFilterClick(filter.key)}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    activeFilter === filter.key
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.technologies.slice(0, 4).map((tech, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 4 && (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        +{service.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing & Timeline */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Timeline</div>
                        <div className="text-lg font-bold text-blue-600">{service.timeline}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Starting from</div>
                        <div className="text-lg font-bold text-green-600">{service.pricing.project}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => toggleService(service.id)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      {expandedService === service.id ? 'Show Less' : 'View Details'}
                    </button>
                    <Link
                      to="/contact"
                      state={{ service: service.title }}
                      className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 text-center"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedService === service.id && (
                  <div className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white animate-slideDown">
                    <div className="p-8">
                      <div className="space-y-8">
                        {/* Overview */}
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3">Service Overview</h4>
                          <p className="text-gray-700">{service.details}</p>
                        </div>
                        
                        {/* Deliverables */}
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3">What You Get</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {service.deliverables.map((item, index) => (
                              <div key={index} className="flex items-center bg-white rounded-lg p-3 border border-gray-100">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Pricing Tabs */}
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-4">Pricing Options</h4>
                          <div className="flex border-b border-gray-200 mb-6">
                            {['project', 'monthly', 'hourly'].map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setActivePricingTab(tab)}
                                className={`px-6 py-3 font-medium capitalize ${
                                  activePricingTab === tab
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                              >
                                {tab} Based
                              </button>
                            ))}
                          </div>
                          
                          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                            <div className="text-center mb-4">
                              <div className="text-3xl font-bold text-gray-900 mb-2">
                                {service.pricing[activePricingTab]}
                              </div>
                              <div className="text-gray-600">
                                {activePricingTab === 'project' && 'Fixed project price'}
                                {activePricingTab === 'monthly' && 'Monthly retainer'}
                                {activePricingTab === 'hourly' && 'Hourly rate'}
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <Link
                                to="/contact"
                                state={{ 
                                  service: service.title,
                                  pricing: service.pricing[activePricingTab],
                                  model: activePricingTab
                                }}
                                className="inline-block bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                              >
                                Choose This Plan
                              </Link>
                            </div>
                          </div>
                        </div>
                        
                        {/* Next Steps */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                          <h4 className="text-lg font-bold text-gray-900 mb-4">Ready to Get Started?</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link
                              to="/contact"
                              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 text-center"
                            >
                              Schedule Call
                            </Link>
                            <a
                              href="tel:+916289534780"
                              className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 text-center"
                            >
                              Call Now
                            </a>
                            <Link
                              to="/portfolio"
                              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg font-semibold transition-colors duration-300 text-center"
                            >
                              View Portfolio
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <div className="text-7xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No services found</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Try selecting a different category or adjusting your search terms
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setActiveFilter('all')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  View All Services
                </button>
                <button
                  onClick={handleClearSearch}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========== NEW: Industries Section ========== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Expertise across various sectors with tailored solutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-blue-100 group">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {industry.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{industry.name}</h3>
                <ul className="space-y-2">
                  {industry.services.map((service, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <svg className="w-3 h-3 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEW: Pricing Models Section ========== */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Flexible Pricing Models
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the engagement model that works best for your project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingModels.map((model, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{model.model}</h3>
                <p className="text-gray-600 mb-6">{model.description}</p>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{model.price}</div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3">Best For:</h4>
                  <ul className="space-y-2">
                    {model.bestFor.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  to="/contact"
                  state={{ pricingModel: model.model }}
                  className="block w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-center"
                >
                  Get Custom Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEW: Case Studies Section ========== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real results from our satisfied clients across industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{study.client}</h3>
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {study.service}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Completed in {study.duration}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{result}</span>
                    </div>
                  ))}
                </div>
                
                <Link
                  to="/case-studies"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                >
                  View Case Study
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View Full Portfolio
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== NEW: FAQ Section ========== */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our services
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">{faq.question}</h3>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                      activeFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeFAQ === index && (
                  <div className="px-6 pb-6 animate-slideDown">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg mb-6">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+916289534780"
                className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us: +91 6289 534 780
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Message
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEW: Final CTA Section ========== */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Let's discuss your project and create a custom solution that drives growth
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-bold mb-2">Quick Start</h3>
              <p className="text-blue-200 text-sm">Share requirements, get a quote in 24 hours</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-lg font-bold mb-2">Free Consultation</h3>
              <p className="text-blue-200 text-sm">30-minute strategy session with our experts</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-lg font-bold mb-2">Detailed Proposal</h3>
              <p className="text-blue-200 text-sm">Comprehensive project plan and timeline</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-cyan-400 to-blue-300 hover:from-cyan-500 hover:to-blue-400 text-blue-900 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Start Your Project Today
            </Link>
            <a
              href="tel:+916289534780"
              className="border-2 border-white hover:bg-white hover:text-blue-900 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Schedule Call Now
            </a>
          </div>
          
          <p className="mt-10 text-blue-200">
            Email: contact@excellenceallegiance.com | Phone: +91 6289 534 780
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        .bg-grid {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </div>
  );
};

export default OurService;