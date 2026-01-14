// client/src/pages/Home.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import { X } from "lucide-react";

const Home = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);

  const companyWorks = [
    {
      id: 1,
      title: "Website Development",
      description:
        "We create modern, responsive websites that are user-friendly and SEO optimized.",
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
      features: [
        "Responsive Design",
        "Fast Loading",
        "SEO Friendly",
        "Security",
      ],
      benefits: [
        "Increased online presence",
        "Better user engagement",
        "Higher conversion rates",
      ],
      image: "/website-dev.jpg",
    },
    {
      id: 2,
      title: "Mobile Applications",
      description:
        "High-performance mobile applications for iOS and Android platforms.",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      features: [
        "Cross-platform",
        "Native Performance",
        "Push Notifications",
        "Offline Support",
      ],
      benefits: [
        "Mobile accessibility",
        "Better customer reach",
        "Enhanced user experience",
      ],
      image: "/mobile-app.jpg",
    },
    {
      id: 3,
      title: "E-commerce Solutions",
      description:
        "Fully customized e-commerce platforms with payment gateway integration.",
      technologies: [
        "Shopify",
        "WooCommerce",
        "Magento",
        "Custom PHP",
        "React",
      ],
      features: [
        "Payment Integration",
        "Inventory Management",
        "Order Tracking",
        "Multi-vendor",
      ],
      benefits: [
        "Increased sales",
        "Automated operations",
        "Better customer management",
      ],
      image: "/ecommerce.jpg",
    },
    {
      id: 4,
      title: "Software Solutions",
      description: "Business process automation and custom software solutions.",
      technologies: ["Python", "Django", ".NET", "Java", "PostgreSQL"],
      features: [
        "CRM Systems",
        "ERP Solutions",
        "Accounting Software",
        "Inventory Systems",
      ],
      benefits: ["Process automation", "Improved efficiency", "Cost reduction"],
      image: "/software.jpg",
    },
    {
      id: 5,
      title: "Digital Marketing",
      description:
        "Social media marketing, SEO, and content marketing services.",
      technologies: ["SEO Tools", "Google Ads", "Facebook Ads", "Analytics"],
      features: [
        "SEO Optimization",
        "Social Media Management",
        "Content Creation",
        "Analytics",
      ],
      benefits: [
        "Increased visibility",
        "More leads",
        "Better brand awareness",
      ],
      image: "/digital-marketing.jpg",
    },
    {
      id: 6,
      title: "Cloud & DevOps",
      description:
        "Cloud migration, server management, and DevOps implementation.",
      technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
      features: [
        "Cloud Migration",
        "CI/CD Pipeline",
        "Auto-scaling",
        "Monitoring",
      ],
      benefits: [
        "Scalability",
        "Cost efficiency",
        "Better performance",
        "Reliability",
      ],
      image: "/devops.jpg",
    },
  ];

  const whatWeBuild = [
    {
      category: "What We Build",
      items: [
        "Custom Software Applications",
        "E-commerce Platforms",
        "Mobile Apps",
        "Web Portals",
        "CRM Systems",
        "ERP Solutions",
        "Content Management Systems",
        "Business Intelligence Tools",
      ],
    },
    {
      category: "How We Help",
      items: [
        "Business Process Automation",
        "Digital Transformation",
        "Technical Consulting",
        "24/7 Support & Maintenance",
        "Scalable Solutions",
        "Performance Optimization",
        "Security Implementation",
        "Cloud Migration",
      ],
    },
    {
      category: "Our Process",
      items: [
        "Requirement Analysis",
        "Planning & Design",
        "Development",
        "Testing & Quality Check",
        "Deployment",
        "Maintenance & Updates",
      ],
    },
  ];

  const successStories = [
    {
      client: "Retail Chain",
      project: "E-commerce Platform",
      result: "Increased sales by 300% in 6 months",
      description:
        "Built a custom e-commerce solution with inventory management and AI-powered recommendations.",
    },
    {
      client: "Healthcare Provider",
      project: "Patient Management System",
      result: "Reduced processing time by 70%",
      description:
        "Developed a comprehensive healthcare management system with appointment scheduling and telemedicine features.",
    },
    {
      client: "Fintech Startup",
      project: "Mobile Banking App",
      result: "Gained 50,000+ users in 3 months",
      description:
        "Created a secure mobile banking application with biometric authentication and real-time transactions.",
    },
    {
      client: "Education Institute",
      project: "Learning Management System",
      result: "Improved student engagement by 200%",
      description:
        "Built an interactive LMS with video lectures, quizzes, and progress tracking.",
    },
  ];

  const services = [
    {
      icon: "💻",
      title: "Web Development",
      description: "Modern websites and web applications",
      details: {
        overview:
          "Full-stack web development services using the latest technologies to build scalable, high-performance web applications.",
        features: [
          "Responsive Web Design",
          "E-commerce Solutions",
          "Progressive Web Apps (PWA)",
          "CMS Development",
          "API Integration & Development",
          "Performance Optimization",
          "SEO Optimization",
          "Security Implementation",
        ],
        technologies: [
          "React",
          "Next.js",
          "Node.js",
          "TypeScript",
          "MongoDB",
          "Express",
          "Tailwind CSS",
          "GraphQL",
        ],
        pricing: {
          basic: "$1,500 - $5,000",
          standard: "$5,000 - $15,000",
          premium: "$15,000 - $50,000+",
        },
        timeline: "2-8 weeks depending on complexity",
        projects: [
          "E-commerce Platform",
          "Business Website",
          "SaaS Application",
          "Portfolio Site",
          "Custom Dashboard",
          "Blog Platform",
          "Social Media Platform",
          "Learning Management System",
        ],
        process: [
          "Requirement Analysis",
          "UI/UX Design",
          "Development",
          "Testing",
          "Deployment",
          "Maintenance",
        ],
      },
    },
    {
      icon: "📱",
      title: "Mobile Apps",
      description: "iOS & Android applications",
      details: {
        overview:
          "Cross-platform and native mobile app development with seamless user experience and robust backend integration.",
        features: [
          "iOS & Android Development",
          "Cross-Platform (React Native/Flutter)",
          "App Store & Play Store Submission",
          "Push Notifications",
          "Offline Functionality",
          "Payment Gateway Integration",
          "Social Media Integration",
          "Analytics Integration",
        ],
        technologies: [
          "React Native",
          "Flutter",
          "Swift",
          "Kotlin",
          "Firebase",
          "Redux",
          "GraphQL",
          "App Center",
        ],
        pricing: {
          basic: "$5,000 - $15,000",
          standard: "$15,000 - $30,000",
          premium: "$30,000 - $100,000+",
        },
        timeline: "3-12 weeks depending on features",
        projects: [
          "Social Media App",
          "E-commerce Mobile App",
          "Fitness Tracking App",
          "Food Delivery App",
          "Business Productivity App",
          "Healthcare App",
          "Educational App",
          "Travel & Booking App",
        ],
        process: [
          "Wireframing",
          "Prototyping",
          "UI/UX Design",
          "Development",
          "Testing",
          "Store Submission",
        ],
      },
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure",
      details: {
        overview:
          "Comprehensive cloud migration, deployment, and management services with focus on scalability and security.",
        features: [
          "AWS/Azure/GCP Setup & Migration",
          "Serverless Architecture",
          "Microservices Implementation",
          "Database Migration & Optimization",
          "CI/CD Pipeline Setup",
          "Monitoring & Analytics",
          "Security & Compliance",
          "Disaster Recovery",
        ],
        technologies: [
          "AWS",
          "Azure",
          "Google Cloud",
          "Docker",
          "Kubernetes",
          "Terraform",
          "Jenkins",
          "Prometheus",
        ],
        pricing: {
          basic: "$2,000 - $8,000",
          standard: "$8,000 - $20,000",
          premium: "$20,000 - $50,000+",
        },
        timeline: "2-6 weeks depending on complexity",
        projects: [
          "Cloud Migration Strategy",
          "Microservices Architecture",
          "DevOps Implementation",
          "Database Optimization",
          "Scalable Infrastructure",
          "Disaster Recovery Setup",
          "Cost Optimization",
          "Security Audit & Implementation",
        ],
        process: [
          "Assessment",
          "Planning",
          "Migration",
          "Optimization",
          "Security",
          "Maintenance",
        ],
      },
    },
    {
      icon: "🤖",
      title: "AI Solutions",
      description: "AI & Machine Learning",
      details: {
        overview:
          "Advanced Artificial Intelligence and Machine Learning solutions to transform business operations and decision-making.",
        features: [
          "Custom AI Model Development",
          "Machine Learning Integration",
          "Natural Language Processing (NLP)",
          "Computer Vision Solutions",
          "Predictive Analytics",
          "Chatbot & Virtual Assistant Development",
          "Recommendation Systems",
          "Data Analysis & Insights",
        ],
        technologies: [
          "Python",
          "TensorFlow",
          "PyTorch",
          "OpenAI API",
          "LangChain",
          "Scikit-learn",
          "Pandas",
          "NumPy",
        ],
        pricing: {
          basic: "$10,000 - $25,000",
          standard: "$25,000 - $50,000",
          premium: "$50,000 - $150,000+",
        },
        timeline: "4-16 weeks depending on model complexity",
        projects: [
          "AI Chatbot Implementation",
          "Image Recognition System",
          "Predictive Analytics Dashboard",
          "Automated Data Processing",
          "Recommendation Engine",
          "Fraud Detection System",
          "Sentiment Analysis Tool",
          "Process Automation",
        ],
        process: [
          "Data Collection",
          "Model Selection",
          "Training & Validation",
          "Integration",
          "Testing",
          "Deployment",
        ],
      },
    },
  ];

  const teamFeatures = [
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Cross-functional teams working seamlessly together",
      points: [
        "Daily Stand-ups",
        "Collaborative Tools",
        "Transparent Communication",
        "Knowledge Sharing Sessions",
        "Cross-team Coordination",
      ],
    },
    {
      icon: "🔄",
      title: "Agile Methodology",
      description: "Flexible and iterative development approach",
      points: [
        "Sprint Planning",
        "Continuous Feedback",
        "Rapid Prototyping",
        "Regular Demos",
        "Retrospectives",
      ],
    },
    {
      icon: "⚡",
      title: "Quick Turnaround",
      description: "Fast delivery without compromising quality",
      points: [
        "Efficient Workflow",
        "Parallel Development",
        "Automated Testing",
        "Continuous Deployment",
        "Performance Monitoring",
      ],
    },
    {
      icon: "🔧",
      title: "Technical Excellence",
      description: "Best practices and modern technologies",
      points: [
        "Code Reviews",
        "Performance Optimization",
        "Security First",
        "Documentation",
        "Code Quality",
      ],
    },
  ];

  const whyChooseUs = [
    "Expert team with 10+ years of industry experience",
    "Agile development methodology for faster delivery",
    "24/7 technical support and maintenance",
    "Competitive pricing with flexible engagement models",
    "Proven track record across multiple industries",
    "Focus on scalability and future-proof solutions",
    "Dedicated project managers for seamless communication",
    "Regular progress updates and transparency",
  ];

  const technologies = [
    { name: "React", color: "from-cyan-500 to-blue-500", icon: "⚛️" },
    { name: "Next.js", color: "from-gray-600 to-black", icon: "▲" },
    { name: "Node.js", color: "from-green-500 to-emerald-500", icon: "🟢" },
    { name: "Python", color: "from-yellow-500 to-blue-500", icon: "🐍" },
    { name: "AWS", color: "from-orange-500 to-yellow-500", icon: "☁️" },
    { name: "Docker", color: "from-blue-400 to-cyan-400", icon: "🐳" },
    { name: "Kubernetes", color: "from-blue-600 to-indigo-600", icon: "⎈" },
    { name: "React Native", color: "from-blue-400 to-purple-400", icon: "📱" },
    { name: "TensorFlow", color: "from-orange-600 to-red-600", icon: "🧠" },
    { name: "MongoDB", color: "from-green-600 to-emerald-600", icon: "🍃" },
    { name: "PostgreSQL", color: "from-blue-300 to-indigo-400", icon: "🐘" },
    { name: "GraphQL", color: "from-pink-500 to-purple-600", icon: "📊" },
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section
        className="pt-32 pb-20 text-white relative overflow-hidden min-h-screen flex items-center"
        style={{
          backgroundImage: 'url("/ig.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 backdrop-blur-3xl opacity-30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-pink-500/15 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h3 className="text-5xl md:text-6xl font-bold mb-6">
            Excellence Allegiance
          </h3>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Digital Transformation & Technology Solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsWorkModalOpen(true)}
              className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-gray-600 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
            >
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative overflow-hidden min-h-screen">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/i.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-cyan-500/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-500/5 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-4 border border-cyan-500/30">
              OUR SERVICES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Digital Solutions
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              We deliver innovative solutions that drive business growth and
              digital transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleServiceClick(service)}
                className="group relative bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 hover:bg-gray-900/60 transition-all duration-500 hover:-translate-y-2 border border-gray-700/50 cursor-pointer"
              >
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      {service.icon}
                    </div>
                    <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Technology Preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.details.technologies
                      .slice(0, 3)
                      .map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs font-medium rounded-full border border-cyan-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    {service.details.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-800/50 text-gray-400 text-xs font-medium rounded-full">
                        +{service.details.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Pricing Preview */}
                  <div className="text-sm text-cyan-400 font-semibold">
                    Starting from {service.details.pricing.basic}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 text-center border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
                10+
              </div>
              <div className="text-gray-200 font-semibold">
                Years Experience
              </div>
            </div>
            <div className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 text-center border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-2">
                150+
              </div>
              <div className="text-gray-200 font-semibold">
                Projects Delivered
              </div>
            </div>
            <div className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 text-center border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-2">
                24/7
              </div>
              <div className="text-gray-200 font-semibold">Support</div>
            </div>
            <div className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 text-center border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-2">
                99%
              </div>
              <div className="text-gray-200 font-semibold">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-7 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105">
            Start Your Project
          </button>
        </div>
      </section>

      {/* Team Features Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm font-semibold mb-4 border border-purple-500/30">
              OUR PROCESS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Collaborative{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Development
              </span>{" "}
              Approach
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Our collaborative approach ensures seamless project execution and
              exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-6 text-sm">
                  {feature.description}
                </p>

                <div className="space-y-3">
                  {feature.points.map((point, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3"></div>
                      <span className="text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-semibold mb-6 border border-purple-700/50">
                WHY CHOOSE US
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Your Success is{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Our Priority
                </span>
              </h2>

              <div className="space-y-6 mb-12">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {item.split(" with ")[0]}
                      </h4>
                      <p className="text-gray-400">
                        {item.split(" with ")[1] || item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 border border-gray-800 shadow-2xl">
                <div className="flex items-center mb-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img
                      src="/eapl.png"
                      alt="Premium Partnership"
                      className="w-full h-full object-cover"
                      
                    />
                  </div>
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold text-white">
                      Premium Partnership
                    </h3>
                    <p className="text-gray-400 mt-2">
                      For enterprise solutions
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between py-6 border-b border-gray-800">
                    <div>
                      <div className="text-gray-300">Project Success Rate</div>
                      <div className="text-sm text-gray-500">
                        Industry standard: 85%
                      </div>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                      99.5%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-6 border-b border-gray-800">
                    <div>
                      <div className="text-gray-300">Average Delivery Time</div>
                      <div className="text-sm text-gray-500">
                        Compared to competitors
                      </div>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                      -30%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-6 border-b border-gray-800">
                    <div>
                      <div className="text-gray-300">Cost Efficiency</div>
                      <div className="text-sm text-gray-500">
                        Average client savings
                      </div>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
                      40%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-6">
                    <div>
                      <div className="text-gray-300">Client Retention</div>
                      <div className="text-sm text-gray-500">
                        Annual retention rate
                      </div>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                      95%
                    </span>
                  </div>
                </div>

                <button className="w-full mt-12 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-5 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-105">
                  Request Custom Quote
                </button>
              </div>

              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl rotate-12 animate-pulse opacity-20"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full">
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
              <rect
                width="100%"
                height="100%"
                fill="url(#grid)"
                className="text-blue-500"
              />
            </svg>
          </div>

          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-4 border border-cyan-500/30">
              TECHNOLOGY STACK
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Modern{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Technologies
              </span>{" "}
              We Use
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Leveraging cutting-edge technologies to build scalable and robust
              solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                ></div>
                <div className="relative z-10 text-center">
                  <div className="text-3xl mb-3">{tech.icon}</div>
                  <h3 className="font-bold text-white text-sm">{tech.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => {
              const duration = 3 + Math.random() * 2;
              const delay = i * 0.5;
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${duration}s ease-in-out ${delay}s infinite`,
                  }}
                ></div>
              );
            })}
          </div>

          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full border border-cyan-500/30">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-300 font-semibold">
                READY TO START?
              </span>
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Schedule a{" "}
              <span className="font-bold text-white">
                free strategy session
              </span>{" "}
              with our experts and get a customized roadmap for your digital
              transformation.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-5 rounded-2xl font-bold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 text-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <svg
                    className="w-6 h-6 group-hover:animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Start Free Consultation
                </span>
              </button>

              <button className="group relative border-2 border-gray-600 text-gray-300 px-12 py-5 rounded-2xl font-bold hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 text-lg">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <svg
                    className="w-6 h-6 group-hover:animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  View Case Studies
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group">
                <div className="text-4xl mb-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300 inline-block">
                  📧
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Email Us</h3>
                <a
                  href="mailto:contact@myeapl.com"
                  className="text-cyan-300 hover:text-cyan-200 transition-colors block mb-2"
                >
                  contact@myeapl.com
                </a>
                <div className="text-sm text-gray-400">
                  Response within 24 hours
                </div>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="text-4xl mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300 inline-block">
                  📞
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Call Us</h3>
                <a
                  href="tel:+916289534780"
                  className="text-blue-300 hover:text-blue-200 transition-colors text-lg block mb-2"
                >
                  +91 6289 534 780
                </a>
                <div className="text-sm text-gray-400">
                  24/7 Support Available
                </div>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
                <div className="text-4xl mb-6 text-green-400 group-hover:scale-110 transition-transform duration-300 inline-block">
                  📍
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Visit Us</h3>
                <div className="text-gray-300 mb-2">
                  1/16, Netai nagar, Singhabari road,
                  <br />
                  Mukundapur, Kolkata-700099, West Bengal, India
                </div>
                <div className="text-sm text-gray-400">Schedule a meeting</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  150+
                </div>
                <div className="text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  98%
                </div>
                <div className="text-gray-400">Client Retention</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  4.9/5
                </div>
                <div className="text-gray-400">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                  10+
                </div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="bg-gray-900 py-20">
        <Testimonials />
      </div>

      {/* Service Popup */}
      {isPopupOpen && selectedService && (
        <ServicePopup
          service={selectedService}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      )}

      {/* Company Works Modal */}
      {isWorkModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-black/70 backdrop-blur-sm"
              onClick={() => setIsWorkModalOpen(false)}
            ></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-2xl rounded-2xl border border-gray-700">
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setIsWorkModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-white bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8">
                  {/* Header */}
                  <div className="mb-10 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      Our Work & Services
                    </h2>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                      Discover what we build, how we help businesses grow, and
                      how we can assist you
                    </p>
                  </div>

                  {/* Company Works Grid */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      What We Build
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {companyWorks.map((work) => (
                        <div
                          key={work.id}
                          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
                        >
                          <div className="mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                              {work.icon || "💻"}
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">
                              {work.title}
                            </h4>
                            <p className="text-gray-300 text-sm mb-4">
                              {work.description}
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h5 className="text-sm font-semibold text-cyan-300 mb-2">
                                Technologies
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {work.technologies.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h5 className="text-sm font-semibold text-green-300 mb-2">
                                Features
                              </h5>
                              <div className="space-y-1">
                                {work.features.map((feature, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center text-gray-300 text-sm"
                                  >
                                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></div>
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h5 className="text-sm font-semibold text-purple-300 mb-2">
                                Benefits
                              </h5>
                              <div className="space-y-1">
                                {work.benefits.map((benefit, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center text-gray-300 text-sm"
                                  >
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                                    {benefit}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* How We Help Section */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      How We Help Businesses
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {whatWeBuild.map((section, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                        >
                          <h4 className="text-xl font-bold text-white mb-4">
                            {section.category}
                          </h4>
                          <div className="space-y-3">
                            {section.items.map((item, itemIdx) => (
                              <div
                                key={itemIdx}
                                className="flex items-center text-gray-300"
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-3"></div>
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Success Stories */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      Success Stories
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {successStories.map((story, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/30 transition-all"
                        >
                          <div className="flex items-start mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-xl mr-4">
                              {idx + 1}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-white">
                                {story.client}
                              </h4>
                              <p className="text-cyan-300 text-sm">
                                {story.project}
                              </p>
                            </div>
                          </div>
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 bg-green-900/30 text-green-300 text-sm font-semibold rounded-full">
                              {story.result}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {story.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/30 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Ready to Transform Your Business?
                    </h3>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                      Let's discuss how we can help you achieve your digital
                      goals and build something amazing together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all">
                        Schedule a Free Consultation
                      </button>
                      <button
                        onClick={() => setIsWorkModalOpen(false)}
                        className="px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-cyan-500 hover:text-cyan-400 transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
      <Footer />
    </div>
  );
};

// Service Popup Component
const ServicePopup = ({ service, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-2xl rounded-2xl border border-gray-700">
          <div className="relative">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-start mb-8">
                <div className="text-5xl mr-6">{service.icon}</div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {service.title}
                  </h2>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Overview
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {service.details.overview}
                  </p>

                  <h3 className="text-xl font-bold text-white mb-4">
                    Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {service.details.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-gray-300"
                      >
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.details.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-sm font-medium rounded-full border border-cyan-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">Pricing</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Basic</span>
                      <span className="text-green-400 font-semibold">
                        {service.details.pricing.basic}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Standard</span>
                      <span className="text-blue-400 font-semibold">
                        {service.details.pricing.standard}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Premium</span>
                      <span className="text-purple-400 font-semibold">
                        {service.details.pricing.premium}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">Timeline</h4>
                      <span className="text-cyan-300 font-semibold">
                        {service.details.timeline}
                      </span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">
                  Development Process
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {service.details.process.map((step, idx) => (
                    <div key={idx} className="text-center group cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <span className="text-cyan-300 font-bold">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
