import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OurService = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedService, setExpandedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProcess, setActiveProcess] = useState(null);
  const [activePricingTab, setActivePricingTab] = useState("project");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState(null);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Skeleton Components
  const HeroSectionSkeleton = () => (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0 bg-gray-800"></div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content Skeleton */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="w-3/4 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="w-1/2 h-8 bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="w-2/3 h-6 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>

            <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-2/3 h-4 bg-gray-700 rounded animate-pulse"></div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-10 bg-gray-700 rounded-lg mx-auto mb-2 animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-700 rounded mx-auto animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <div className="w-48 h-14 bg-gray-700 rounded-xl animate-pulse"></div>
              <div className="w-40 h-14 bg-gray-700 rounded-xl animate-pulse"></div>
            </div>
          </div>

          {/* Right Content Skeleton */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border-8 border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-2">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="w-full h-[500px] bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-4 animate-pulse"></div>
                    <div className="w-32 h-6 bg-gray-600 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="w-48 h-4 bg-gray-600 rounded mx-auto animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards Skeleton */}
            <div className="absolute -top-6 -left-6">
              <div className="bg-gray-700 backdrop-blur-sm rounded-2xl p-4 border border-gray-600 shadow-xl w-32 h-16 animate-pulse"></div>
            </div>
            <div className="absolute top-1/3 -right-8">
              <div className="bg-gray-700 backdrop-blur-sm rounded-2xl p-4 border border-gray-600 shadow-xl w-32 h-16 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const ServiceCardSkeleton = () => (
    <div className="rounded-2xl shadow-lg overflow-hidden border border-gray-700 bg-gray-800/50 animate-pulse">
      <div className="p-6">
        {/* Header Skeleton */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
            <div>
              <div className="w-32 h-6 bg-gray-700 rounded mb-2"></div>
              <div className="w-48 h-4 bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="w-16 h-6 bg-gray-700 rounded"></div>
        </div>

        {/* Technologies Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="w-16 h-6 bg-gray-700 rounded-full"></div>
          <div className="w-20 h-6 bg-gray-700 rounded-full"></div>
          <div className="w-12 h-6 bg-gray-700 rounded-full"></div>
        </div>

        {/* Features Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-700 rounded mr-2"></div>
            <div className="w-40 h-4 bg-gray-700 rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-700 rounded mr-2"></div>
            <div className="w-36 h-4 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-lg p-3 bg-gray-700/30">
            <div className="w-16 h-4 bg-gray-700 rounded mb-2"></div>
            <div className="w-24 h-6 bg-gray-700 rounded"></div>
          </div>
          <div className="rounded-lg p-3 bg-gray-700/30">
            <div className="w-24 h-4 bg-gray-700 rounded mb-2"></div>
            <div className="w-20 h-6 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex space-x-3">
          <div className="flex-1 h-10 bg-gray-700 rounded-lg"></div>
          <div className="flex-1 h-10 bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  const FilterSkeleton = () => (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="w-24 h-10 bg-gray-700 rounded-lg animate-pulse"
        ></div>
      ))}
    </div>
  );

  const SearchBarSkeleton = () => (
    <div className="relative max-w-xl mx-auto mb-8">
      <div className="w-full h-14 bg-gray-700 rounded-xl animate-pulse"></div>
    </div>
  );

  const ProcessCardSkeleton = () => (
    <div className="rounded-2xl p-6 border border-gray-700 bg-gray-800/50 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
        <div className="w-20 h-6 bg-gray-700 rounded-full"></div>
      </div>

      <div className="w-40 h-6 bg-gray-700 rounded mb-3"></div>
      <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
      <div className="w-3/4 h-4 bg-gray-700 rounded mb-4"></div>

      <div className="w-20 h-6 bg-gray-700 rounded"></div>
    </div>
  );

  const TechStackCardSkeleton = () => (
    <div className="rounded-2xl p-6 border border-gray-700 bg-gray-800/50 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-32 h-6 bg-gray-700 rounded"></div>
        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="w-16 h-6 bg-gray-700 rounded-lg"></div>
        <div className="w-20 h-6 bg-gray-700 rounded-lg"></div>
        <div className="w-14 h-6 bg-gray-700 rounded-lg"></div>
        <div className="w-18 h-6 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );

  const SectionHeaderSkeleton = () => (
    <div className="text-center mb-16 animate-pulse">
      <div className="inline-block w-40 h-8 bg-gray-700 rounded-full mb-6 mx-auto"></div>
      <div className="w-3/4 h-12 bg-gray-700 rounded mx-auto mb-6"></div>
      <div className="w-1/2 h-6 bg-gray-700 rounded mx-auto"></div>
    </div>
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const openServiceModal = React.useCallback((service) => {
    setSelectedService(service);
    setModalOpen(true);
    setSelectedPaymentMethod(null);
    setActivePricingTab("project");
  }, []);

  const closeServiceModal = React.useCallback(() => {
    setModalOpen(false);
    setSelectedService(null);
  }, []);

  const openProcessModal = React.useCallback((process) => {
    setSelectedProcess(process);
    setProcessModalOpen(true);
  }, []);

  const closeProcessModal = React.useCallback(() => {
    setProcessModalOpen(false);
    setSelectedProcess(null);
  }, []);

  const paymentMethods = React.useMemo(
    () => [
      {
        id: "bkash",
        name: "bKash",
        icon: "💰",
        type: "Mobile Banking",
        account: "017XXXXXXXX",
        instructions:
          "Send money to this bKash number and send transaction ID in message",
      },
      {
        id: "nagad",
        name: "Nagad",
        icon: "💳",
        type: "Mobile Banking",
        account: "013XXXXXXXX",
        instructions: "Send money to this Nagad number and keep transaction ID",
      },
      {
        id: "rocket",
        name: "Rocket",
        icon: "🚀",
        type: "Mobile Banking",
        account: "015XXXXXXXX",
        instructions: "Send money via Rocket and note transaction ID",
      },
      {
        id: "stripe",
        name: "Stripe",
        icon: "💳",
        type: "Card Payment",
        account: "Visa/MasterCard/American Express",
        instructions: "Secure online payment with credit/debit cards",
      },
      {
        id: "paypal",
        name: "PayPal",
        icon: "🌐",
        type: "Online Payment",
        account: "paypal.me/yourusername",
        instructions: "Send payment through PayPal secure gateway",
      },
      {
        id: "bank",
        name: "Bank Transfer",
        icon: "🏦",
        type: "Bank Account",
        account: "Bank: XXXX, Account: XXXXXXX",
        instructions: "Wire transfer to our bank account",
      },
    ],
    [],
  );

  const services = React.useMemo(
    () => [
      {
        id: 1,
        title: "Custom Web Development",
        category: "development",
        icon: "💻",
        description:
          "Responsive websites & web applications with modern frameworks",
        features: [
          "React/Next.js",
          "Node.js/Python",
          "MongoDB/PostgreSQL",
          "REST/GraphQL APIs",
          "SEO Optimized",
        ],
        technologies: [
          "React",
          "Next.js",
          "Node.js",
          "TypeScript",
          "Tailwind CSS",
        ],
        details:
          "We build scalable web applications from simple landing pages to complex enterprise solutions. Our expertise includes frontend, backend, database design, and API development.",
        timeline: "4-12 weeks",
        delivery: "Source code + Documentation + Deployment",
        pricing: {
          project: "$2,000 - $25,000+",
          monthly: "Custom",
          hourly: "$25 - $50/hr",
        },
        paymentOptions: [
          "bkash",
          "nagad",
          "rocket",
          "stripe",
          "paypal",
          "bank",
        ],
        deliverables: [
          "Fully responsive design",
          "Admin panel",
          "API integration",
          "SEO setup",
          "Analytics",
        ],
        rating: 4.9,
      },
      {
        id: 2,
        title: "Mobile App Development",
        category: "mobile",
        icon: "📱",
        description: "Cross-platform mobile apps for iOS & Android",
        features: [
          "React Native/Flutter",
          "Push Notifications",
          "Offline Support",
          "App Store Deployment",
        ],
        technologies: ["React Native", "Flutter", "Firebase", "Redux"],
        details:
          "Create engaging mobile experiences that work seamlessly across devices. We handle everything from UI/UX design to app store submission.",
        timeline: "6-16 weeks",
        delivery: "APK/IPA files + App store setup",
        pricing: {
          project: "$5,000 - $50,000+",
          monthly: "Custom",
          hourly: "$30 - $60/hr",
        },
        paymentOptions: ["bkash", "nagad", "rocket", "stripe", "paypal"],
        deliverables: [
          "iOS & Android apps",
          "Admin dashboard",
          "Push notification system",
          "Analytics dashboard",
        ],
        rating: 4.8,
      },
      {
        id: 3,
        title: "E-commerce Solutions",
        category: "ecommerce",
        icon: "🛒",
        description: "Complete online store development",
        features: [
          "Payment Integration",
          "Inventory Management",
          "Order Tracking",
          "Multi-vendor Support",
        ],
        technologies: [
          "Shopify",
          "WooCommerce",
          "Magento",
          "Stripe",
          "Razorpay",
        ],
        details:
          "Build powerful e-commerce platforms with secure payment gateways, inventory management, and customer analytics.",
        timeline: "4-8 weeks",
        delivery: "Live store + Admin access",
        pricing: {
          project: "$3,000 - $20,000",
          monthly: "$199 - $999",
          hourly: "$25 - $45/hr",
        },
        paymentOptions: ["bkash", "nagad", "stripe", "paypal", "bank"],
        deliverables: [
          "Product catalog",
          "Payment gateway",
          "Order management",
          "Customer portal",
          "Analytics",
        ],
        rating: 4.7,
      },
      {
        id: 4,
        title: "Cloud & DevOps",
        category: "cloud",
        icon: "☁️",
        description: "Cloud infrastructure & deployment automation",
        features: [
          "AWS/Azure/GCP",
          "Docker/Kubernetes",
          "CI/CD Pipeline",
          "Monitoring & Scaling",
        ],
        technologies: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
        details:
          "Set up scalable cloud infrastructure with automated deployment, monitoring, and security best practices.",
        timeline: "2-4 weeks",
        delivery: "Infrastructure as Code + Documentation",
        pricing: {
          project: "$1,500 - $10,000",
          monthly: "$299 - $1,999",
          hourly: "$35 - $70/hr",
        },
        paymentOptions: ["stripe", "paypal", "bank"],
        deliverables: [
          "Cloud architecture",
          "CI/CD pipeline",
          "Monitoring setup",
          "Security configuration",
        ],
        rating: 4.9,
      },
      {
        id: 5,
        title: "AI/ML Solutions",
        category: "ai",
        icon: "🤖",
        description: "Artificial Intelligence & Machine Learning development",
        features: [
          "Predictive Analytics",
          "Chatbots",
          "Computer Vision",
          "NLP",
          "Recommendation Systems",
        ],
        technologies: ["Python", "TensorFlow", "PyTorch", "OpenCV", "FastAPI"],
        details:
          "Implement AI-powered solutions to automate processes, analyze data, and enhance user experiences.",
        timeline: "8-20 weeks",
        delivery: "Trained models + API endpoints",
        pricing: {
          project: "$10,000 - $100,000+",
          monthly: "Custom",
          hourly: "$50 - $100/hr",
        },
        paymentOptions: ["stripe", "paypal", "bank"],
        deliverables: [
          "ML models",
          "API endpoints",
          "Training dataset",
          "Documentation",
          "Deployment scripts",
        ],
        rating: 4.6,
      },
      {
        id: 6,
        title: "UI/UX Design",
        category: "design",
        icon: "🎨",
        description: "User-centered design for digital products",
        features: [
          "Wireframing",
          "Prototyping",
          "User Testing",
          "Design Systems",
          "Responsive Design",
        ],
        technologies: ["Figma", "Adobe XD", "Sketch", "Illustrator"],
        details:
          "Create intuitive and beautiful user interfaces that enhance user engagement and drive conversions.",
        timeline: "2-6 weeks",
        delivery: "Design files + Style guide",
        pricing: {
          project: "$1,000 - $15,000",
          monthly: "$499 - $2,999",
          hourly: "$20 - $50/hr",
        },
        paymentOptions: ["bkash", "nagad", "rocket", "stripe", "paypal"],
        deliverables: [
          "Wireframes",
          "Mockups",
          "Prototypes",
          "Design system",
          "Assets export",
        ],
        rating: 4.8,
      },
    ],
    [],
  );

  const developmentProcess = React.useMemo(
    () => [
      {
        step: 1,
        title: "Discovery & Planning",
        icon: "🔍",
        description:
          "Requirements gathering, project scope, and roadmap creation",
        duration: "1-2 weeks",
        deliverables: ["Project brief", "Wireframes", "Timeline"],
      },
      {
        step: 2,
        title: "Design & Prototyping",
        icon: "🎨",
        description: "UI/UX design, user flows, and interactive prototypes",
        duration: "2-3 weeks",
        deliverables: ["Design mockups", "Prototype", "Style guide"],
      },
      {
        step: 3,
        title: "Development",
        icon: "💻",
        description: "Agile development with weekly sprints and demos",
        duration: "4-12 weeks",
        deliverables: ["Weekly updates", "Testable features", "Code reviews"],
      },
      {
        step: 4,
        title: "Testing & QA",
        icon: "🧪",
        description:
          "Comprehensive testing including functional, performance, and security",
        duration: "1-3 weeks",
        deliverables: ["Test reports", "Bug fixes", "Performance metrics"],
      },
      {
        step: 5,
        title: "Deployment",
        icon: "🚀",
        description: "Production deployment and launch preparation",
        duration: "1 week",
        deliverables: ["Live deployment", "Documentation", "Training"],
      },
    ],
    [],
  );

  const techStack = React.useMemo(
    () => [
      {
        category: "Frontend",
        techs: ["React", "Next.js", "Vue.js", "Angular", "TypeScript"],
        icon: "⚡",
      },
      {
        category: "Backend",
        techs: ["Node.js", "Python", "Java", ".NET", "PHP"],
        icon: "🔧",
      },
      {
        category: "Mobile",
        techs: ["React Native", "Flutter", "iOS Swift", "Android Kotlin"],
        icon: "📱",
      },
      {
        category: "Database",
        techs: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
        icon: "🗃️",
      },
      {
        category: "Cloud",
        techs: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
        icon: "☁️",
      },
      {
        category: "AI/ML",
        techs: ["TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "FastAPI"],
        icon: "🤖",
      },
    ],
    [],
  );

  const filters = React.useMemo(
    () => [
      { key: "all", label: "All Services" },
      { key: "development", label: "Web Development" },
      { key: "mobile", label: "Mobile Apps" },
      { key: "ecommerce", label: "E-commerce" },
      { key: "cloud", label: "Cloud & DevOps" },
      { key: "ai", label: "AI/ML" },
      { key: "design", label: "UI/UX Design" },
    ],
    [],
  );

  const filteredServices = React.useMemo(() => {
    if (isLoading) return [];

    let result = services;
    if (activeFilter !== "all") {
      result = result.filter((service) => service.category === activeFilter);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.technologies.some((tech) =>
            tech.toLowerCase().includes(query),
          ),
      );
    }
    return result;
  }, [activeFilter, searchQuery, services, isLoading]);

  const getServicePaymentMethods = React.useCallback(
    (service) => {
      return paymentMethods.filter((method) =>
        service.paymentOptions.includes(method.id),
      );
    },
    [paymentMethods],
  );

  const handleFilterClick = React.useCallback((key) => {
    setActiveFilter(key);
    setSearchQuery("");
    setExpandedService(null);
  }, []);

  const handleSearchChange = React.useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleClearSearch = React.useCallback(() => {
    setSearchQuery("");
  }, []);

  const toggleProcess = React.useCallback((step) => {
    setActiveProcess((prev) => (prev === step ? null : step));
  }, []);

  const handlePaymentSelect = React.useCallback((methodId) => {
    setSelectedPaymentMethod((prev) => (prev === methodId ? null : methodId));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Dark Mode Toggle Skeleton */}
        <div className="fixed top-4 right-4 z-50">
          <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
        </div>

        {/* Hero Section Skeleton */}
        <HeroSectionSkeleton />

        {/* Main Content Container Skeleton */}
        <div className="relative -mt-20 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50">
            {/* Services Section Skeleton */}
            <section id="services" className="py-20">
              <SectionHeaderSkeleton />
              <SearchBarSkeleton />
              <FilterSkeleton />

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ServiceCardSkeleton key={i} />
                ))}
              </div>
            </section>

            {/* Process Section Skeleton */}
            <section className="py-20 border-t border-gray-700/30">
              <SectionHeaderSkeleton />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <ProcessCardSkeleton key={i} />
                ))}
              </div>
            </section>

            {/* Tech Stack Section Skeleton */}
            <section className="py-20 border-t border-gray-700/30">
              <SectionHeaderSkeleton />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <TechStackCardSkeleton key={i} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // ServiceDetailModal component
  const ServiceDetailModal = ({ service, onClose }) => {
    if (!service) return null;

    const servicePaymentMethods = getServicePaymentMethods(service);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div
          className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border animate-modalIn`}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-t-3xl">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{service.icon}</div>
              <div>
                <h2 className="text-2xl font-bold">{service.title}</h2>
                <p className="text-blue-100">{service.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-8">
            <div>
              <h3
                className={`text-xl font-bold mb-4 flex items-center ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-2 text-cyan-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Service Overview
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {service.details}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3
                  className={`text-xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`text-sm px-3 py-1.5 rounded-lg ${
                        darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3
                  className={`text-xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-center ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3
                className={`text-xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                What You Get
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.deliverables.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center rounded-xl p-3 ${
                      darkMode
                        ? "bg-gray-700/30 text-gray-300"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`rounded-2xl p-5 ${
                  darkMode ? "bg-gray-700/30" : "bg-blue-50"
                }`}
              >
                <h4
                  className={`text-lg font-bold mb-3 flex items-center ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-2 text-cyan-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Timeline & Delivery
                </h4>
                <div className="space-y-3">
                  <div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Estimated Timeline
                    </div>
                    <div className="text-lg font-bold text-cyan-500">
                      {service.timeline}
                    </div>
                  </div>
                  <div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Delivery Includes
                    </div>
                    <div
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {service.delivery}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div
                className={`rounded-2xl p-5 ${
                  darkMode ? "bg-gray-700/30" : "bg-emerald-50"
                }`}
              >
                <h4
                  className={`text-lg font-bold mb-3 flex items-center ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-2 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 2a1 1 0 10-2 0v1H8V6a1 1 0 00-2 0v1H4a1 1 0 100 2h2v1a1 1 0 102 0V9h6v1a1 1 0 102 0V9h2a1 1 0 100-2h-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Payment Methods
                </h4>
                <div className="space-y-2">
                  {servicePaymentMethods.slice(0, 3).map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-center p-2 rounded-lg ${
                        darkMode ? "bg-gray-600/30" : "bg-white"
                      }`}
                    >
                      <div className="text-2xl mr-3">{method.icon}</div>
                      <div>
                        <div className="font-medium">{method.name}</div>
                        <div
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {method.type}
                        </div>
                      </div>
                    </div>
                  ))}
                  {servicePaymentMethods.length > 3 && (
                    <div
                      className={`text-sm text-center ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      + {servicePaymentMethods.length - 3} more payment methods
                      available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div
              className={`rounded-2xl p-6 ${
                darkMode
                  ? "bg-gray-700/30"
                  : "bg-gradient-to-r from-blue-50 to-cyan-50"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-6 text-center ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Pricing Options
              </h3>

              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-xl p-1 bg-gray-200 dark:bg-gray-700">
                  {["project", "monthly", "hourly"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActivePricingTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                        activePricingTab === tab
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                          : darkMode
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab === "project" && "Project Based"}
                      {tab === "monthly" && "Monthly"}
                      {tab === "hourly" && "Hourly"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gradient bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent mb-2">
                  {service.pricing[activePricingTab]}
                </div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {activePricingTab === "project" && "One-time project price"}
                  {activePricingTab === "monthly" && "Monthly retainer package"}
                  {activePricingTab === "hourly" && "Hourly development rate"}
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div className="mb-8">
                <h4
                  className={`text-lg font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Select Payment Method
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {servicePaymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handlePaymentSelect(method.id)}
                      className={`flex items-center p-3 rounded-xl transition-all duration-300 ${
                        selectedPaymentMethod === method.id
                          ? darkMode
                            ? "bg-cyan-500/20 border-2 border-cyan-500"
                            : "bg-blue-100 border-2 border-blue-500"
                          : darkMode
                            ? "bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600"
                            : "bg-white hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <div className="text-2xl mr-3">{method.icon}</div>
                      <div className="text-left">
                        <div
                          className={`font-bold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {method.name}
                        </div>
                        <div
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {method.type}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  state={{
                    service: service.title,
                    pricing: service.pricing[activePricingTab],
                    model: activePricingTab,
                    paymentMethod: selectedPaymentMethod,
                  }}
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 text-center shadow-lg"
                >
                  Book This Service
                </Link>
                <button
                  onClick={onClose}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 border-2 ${
                    darkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ProcessDetailModal component
  const ProcessDetailModal = ({ process, onClose }) => {
    if (!process) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div
          className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border animate-modalIn`}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-t-3xl">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{process.icon}</div>
              <div>
                <h2 className="text-2xl font-bold">{process.title}</h2>
                <p className="text-purple-100">{process.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3
                className={`text-xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Duration
              </h3>
              <div
                className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                {process.duration}
              </div>
            </div>

            <div>
              <h3
                className={`text-xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Deliverables
              </h3>
              <ul className="space-y-2">
                {process.deliverables.map((d, i) => (
                  <li
                    key={i}
                    className={`flex items-center ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-right">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-900"
      }`}
    >
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full backdrop-blur-sm border ${
            darkMode
              ? "bg-gray-800/50 border-gray-700 hover:bg-gray-700/50"
              : "bg-white/50 border-gray-200 hover:bg-white/80"
          } transition-all duration-300 shadow-lg`}
        >
          {darkMode ? (
            <svg
              className="w-6 h-6 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 1020.945 13H11V3.055z" />
            </svg>
          )}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Main Background - Custom Tech Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #3b82f6 1px, transparent 1px),
                    linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px",
                }}
              ></div>
            </div>

            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <pattern
                    id="circuit"
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M0,50 L100,50 M50,0 L50,100"
                      stroke="#3b82f6"
                      strokeWidth="1"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="8"
                      fill="#3b82f6"
                      fillOpacity="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit)" />
              </svg>
            </div>

            <div className="absolute inset-0 overflow-hidden opacity-5">
              <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden">
                <div className="whitespace-nowrap text-sm font-mono text-cyan-300 animate-marquee">
                  01010100 01100101 01100011 01101000 01001110 01101111 01110110
                  01100001 01110100 01101001 01101111 01101110 00100000 01010011
                  01100101 01110010 01110110 01101001 01100011 01100101 01110011
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
                <div className="whitespace-nowrap text-sm font-mono text-purple-300 animate-marquee-reverse">
                  00100000 01000100 01101001 01100111 01101001 01110100 01100001
                  01101100 00100000 01010100 01110010 01100001 01101110 01110011
                  01100110 01101111 01110010 01101101 01100001 01110100 01101001
                  01101111 01101110
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/80 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10 z-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <h1 className="text-4xl md:text-7xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                  Next-Gen
                </span>
                <br />
                <span className="text-white">Tech Solutions</span>
                <br />
                <span className="text-3xl md:text-4xl text-cyan-200 mt-4 block">
                  For Digital Transformation
                </span>
              </h1>

              <div className="text-xl md:text-1xl text-gray-200 leading-relaxed max-w-2xl">
                Transform uncertainty into competitive advantage with EAPL's
                future-proof solutions. We equip businesses with adaptive
                technologies that evolve with market demands, ensuring you're
                always ahead of the curve.
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                    150+
                  </div>
                  <div className="text-sm text-gray-300">
                    Projects Completed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                    50+
                  </div>
                  <div className="text-sm text-gray-300">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                    10+
                  </div>
                  <div className="text-sm text-gray-300">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                    99%
                  </div>
                  <div className="text-sm text-gray-300">Satisfaction Rate</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  to="/contact"
                  className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <svg
                    className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Start Your Journey
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative rounded-3xl overflow-hidden border-8 border-white/10 backdrop-blur-sm bg-gradient-to-br from-gray-800/30 to-gray-900/50 p-2 shadow-2xl">
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                      }}
                    ></div>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden">
                    <div className="w-full h-[500px] bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">👨‍💻</div>
                        <p className="text-white text-lg">Your Image Here</p>
                        <p className="text-gray-300 text-sm">
                          Professional tech profile photo
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
                </div>

                <div className="absolute -top-6 -left-6 animate-float-slow">
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/30 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">⚡</div>
                      <div>
                        <div className="text-sm font-bold">Fast Delivery</div>
                        <div className="text-xs text-gray-300">30% Faster</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/3 -right-8 animate-float-fast">
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-4 border border-emerald-500/30 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">💰</div>
                      <div>
                        <div className="text-sm font-bold">Best Price</div>
                        <div className="text-xs text-gray-300">Guaranteed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <svg
              className="w-8 h-8 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      <div className="relative -mt-20 z-30">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
            darkMode
              ? "bg-gray-800/50 backdrop-blur-xl"
              : "bg-white/80 backdrop-blur-xl"
          } rounded-3xl shadow-2xl border ${
            darkMode ? "border-gray-700/50" : "border-white/30"
          }`}
        >
          <section id="services" className="py-20">
            <div className="text-center mb-16">
              <div
                className={`inline-flex items-center gap-2 ${
                  darkMode
                    ? "bg-gray-700/50"
                    : "bg-gradient-to-r from-cyan-50 to-blue-50"
                } px-4 py-2 rounded-full mb-6`}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gradient bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Our Expertise
                </span>
              </div>
              <h2
                className={`text-4xl md:text-5xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Comprehensive{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  IT Services
                </span>
              </h2>
              <p
                className={`text-xl ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } max-w-3xl mx-auto`}
              >
                We provide end-to-end technology solutions tailored to your
                business needs
              </p>
            </div>

            <div className="mb-12">
              <div className="relative max-w-xl mx-auto mb-8">
                <input
                  type="text"
                  placeholder="Search services (e.g., 'React', 'E-commerce', 'Mobile')..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={`w-full px-6 py-4 pl-12 rounded-xl focus:outline-none transition-all text-base shadow-sm backdrop-blur-sm ${
                    darkMode
                      ? "bg-gray-700/50 border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-400"
                      : "bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-200 text-gray-900"
                  }`}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => handleFilterClick(filter.key)}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                      darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                    } ${
                      activeFilter === filter.key
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg transform scale-105"
                        : darkMode
                          ? "bg-gray-800 text-gray-300 border border-gray-700"
                          : "bg-white text-gray-700 border border-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border ${
                    darkMode
                      ? "bg-gray-800/50 border-gray-700 hover:border-cyan-500/30"
                      : "bg-white border-gray-100 hover:border-blue-200"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>
                        <div>
                          <h3
                            className={`text-lg font-bold mb-1 group-hover:text-cyan-500 transition-colors ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {service.title}
                          </h3>
                          <p
                            className={`text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-amber-500 mr-1">
                          {service.rating}
                        </span>
                        <svg
                          className="w-4 h-4 text-amber-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className={`text-xs px-2 py-1 rounded-full ${
                            darkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 3 && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            darkMode
                              ? "bg-gray-700 text-gray-400"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          +{service.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      {service.features.slice(0, 2).map((feature, index) => (
                        <div
                          key={index}
                          className={`flex items-center text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <svg
                            className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div
                        className={`rounded-lg p-3 ${
                          darkMode ? "bg-gray-700/30" : "bg-blue-50"
                        }`}
                      >
                        <div
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          } mb-1`}
                        >
                          Timeline
                        </div>
                        <div className="text-sm font-bold text-cyan-500">
                          {service.timeline}
                        </div>
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          darkMode ? "bg-gray-700/30" : "bg-emerald-50"
                        }`}
                      >
                        <div
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          } mb-1`}
                        >
                          Starting from
                        </div>
                        <div className="text-sm font-bold text-emerald-500">
                          {service.pricing.project}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => openServiceModal(service)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 text-center"
                      >
                        View Details
                      </button>
                      <Link
                        to="/contact"
                        state={{ service: service.title }}
                        className={`flex-1 border-2 text-center py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                          darkMode
                            ? "border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
                            : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                        }`}
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-16">
                <div className="text-5xl mb-6">🔍</div>
                <h3
                  className={`text-xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  No services found
                </h3>
                <p
                  className={`text-lg mb-8 max-w-md mx-auto ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Try selecting a different category or adjusting your search
                  terms
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
                  >
                    View All Services
                  </button>
                  <button
                    onClick={handleClearSearch}
                    className={`border-2 px-6 py-2 rounded-lg font-medium transition-colors duration-300 ${
                      darkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="py-20 border-t border-gray-700/30">
            <div className="text-center mb-16">
              <div
                className={`inline-flex items-center gap-2 ${
                  darkMode
                    ? "bg-gray-700/50"
                    : "bg-gradient-to-r from-purple-50 to-pink-50"
                } px-4 py-2 rounded-full mb-6`}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span className="text-sm font-medium text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Our Methodology
                </span>
              </div>
              <h2
                className={`text-4xl md:text-5xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Development{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Process
                </span>
              </h2>
              <p
                className={`text-xl ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } max-w-3xl mx-auto`}
              >
                Transparent and collaborative approach ensuring project success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {developmentProcess.map((step) => (
                <div
                  key={step.step}
                  className={`rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border ${
                    darkMode
                      ? "bg-gray-800/50 border-gray-700 hover:border-purple-500/30"
                      : "bg-white border-gray-100 hover:border-purple-200"
                  }`}
                  onClick={() => toggleProcess(step.step)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{step.icon}</div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        darkMode
                          ? "bg-purple-900/30 text-purple-300"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {step.duration}
                    </span>
                  </div>

                  <h3
                    className={`text-lg font-bold mb-3 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {step.description}
                  </p>

                  <button
                    onClick={() => openProcessModal(step)}
                    className={`text-sm font-medium flex items-center ${
                      darkMode
                        ? "text-purple-400 hover:text-purple-300"
                        : "text-purple-600 hover:text-purple-800"
                    }`}
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {activeProcess === step.step && (
                    <div className="mt-4 pt-4 border-t border-gray-700/30 animate-slideDown">
                      <h4
                        className={`text-sm font-semibold mb-2 flex items-center ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 text-purple-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Deliverables:
                      </h4>
                      <ul className="space-y-2">
                        {step.deliverables.map((item, idx) => (
                          <li
                            key={idx}
                            className={`flex items-center text-sm rounded-lg p-2 ${
                              darkMode
                                ? "bg-gray-700/30 text-gray-300"
                                : "bg-gray-50 text-gray-700"
                            }`}
                          >
                            <svg
                              className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="py-20 border-t border-gray-700/30">
            <div className="text-center mb-16">
              <div
                className={`inline-flex items-center gap-2 ${
                  darkMode
                    ? "bg-gray-700/50"
                    : "bg-gradient-to-r from-cyan-50 to-blue-50"
                } px-4 py-2 rounded-full mb-6`}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gradient bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Our Tech Stack
                </span>
              </div>
              <h2
                className={`text-4xl md:text-5xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Technology{" "}
                <span className="bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">
                  Expertise
                </span>
              </h2>
              <p
                className={`text-xl ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } max-w-3xl mx-auto`}
              >
                We work with modern technologies to build scalable and
                future-proof solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techStack.map((stack, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${
                    darkMode
                      ? "bg-gray-800/50 border-gray-700 hover:border-cyan-500/30"
                      : "bg-white border-gray-100 hover:border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className={`text-lg font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {stack.category}
                    </h3>
                    <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {stack.icon}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stack.techs.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-3 py-1 rounded-lg ${
                          darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {modalOpen && selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={closeServiceModal}
        />
      )}
      {processModalOpen && selectedProcess && (
        <ProcessDetailModal
          process={selectedProcess}
          onClose={closeProcessModal}
        />
      )}

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

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(3deg);
          }
          50% {
            transform: translateY(-20px) rotate(3deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) rotate(-3deg);
          }
          50% {
            transform: translateY(-15px) rotate(-3deg);
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 25s linear infinite;
        }

        .animate-modalIn {
          animation: modalIn 0.3s ease-out forwards;
        }

        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default OurService;
