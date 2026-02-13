import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import {
  X,
  ChevronRight,
  Sparkles,
  Zap,
  Target,
  Users,
  Rocket,
  Clock,
  Shield,
  TrendingUp,
} from "lucide-react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const duration = 2000;
    const steps = 60;
    const increment = 150 / steps;
    const interval = duration / steps;

    let current = { projects: 0, clients: 0, experience: 0, satisfaction: 0 };
    const target = {
      projects: 150,
      clients: 50,
      experience: 10,
      satisfaction: 99,
    };

    const timer = setInterval(() => {
      current.projects = Math.min(
        current.projects + increment,
        target.projects,
      );
      current.clients = Math.min(
        current.clients + target.clients / steps,
        target.clients,
      );
      current.experience = Math.min(
        current.experience + target.experience / steps,
        target.experience,
      );
      current.satisfaction = Math.min(
        current.satisfaction + target.satisfaction / steps,
        target.satisfaction,
      );

      setAnimatedStats({
        projects: Math.round(current.projects),
        clients: Math.round(current.clients),
        experience: Math.round(current.experience * 10) / 10,
        satisfaction: Math.round(current.satisfaction),
      });

      if (
        current.projects >= target.projects &&
        current.clients >= target.clients &&
        current.experience >= target.experience &&
        current.satisfaction >= target.satisfaction
      ) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isLoading]);

  // Skeleton Components
  const HeroSkeleton = () => (
    <div className="pt-32 pb-20 relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gray-800"></div>
      <div className="absolute inset-0 backdrop-blur-3xl opacity-30"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
        <div className="w-3/4 h-16 bg-gray-700 rounded-lg mx-auto mb-6 animate-pulse"></div>
        <div className="w-1/2 h-8 bg-gray-700 rounded-lg mx-auto mb-8 animate-pulse"></div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="w-48 h-14 bg-gray-700 rounded-xl animate-pulse mx-auto"></div>
        </div>
      </div>
    </div>
  );

  const ServiceCardSkeleton = () => (
    <div className="group relative bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50">
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-gray-700 rounded-full"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="w-16 h-16 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="w-3/4 h-8 bg-gray-700 rounded mb-4 animate-pulse"></div>
        <div className="w-full h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
        <div className="w-2/3 h-4 bg-gray-700 rounded mb-6 animate-pulse"></div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="w-16 h-6 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-20 h-6 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-12 h-6 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
        <div className="w-1/2 h-4 bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  );

  const StatsSkeleton = () => (
    <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 text-center border border-gray-700/50">
      <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
      <div className="w-20 h-10 bg-gray-700 rounded mx-auto mb-2 animate-pulse"></div>
      <div className="w-32 h-4 bg-gray-700 rounded mx-auto animate-pulse"></div>
    </div>
  );

  const ProcessCardSkeleton = () => (
    <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
      <div className="relative">
        <div className="w-12 h-12 bg-gray-700 rounded-xl mb-6 animate-pulse"></div>
        <div className="w-3/4 h-6 bg-gray-700 rounded mb-4 animate-pulse"></div>
        <div className="w-full h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
        <div className="w-2/3 h-4 bg-gray-700 rounded mb-6 animate-pulse"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className="w-2 h-2 bg-gray-700 rounded-full mr-3 animate-pulse"></div>
              <div className="w-32 h-3 bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const WhyChooseItemSkeleton = () => (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-xl mr-4 animate-pulse"></div>
      <div className="flex-1">
        <div className="w-full h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
        <div className="w-2/3 h-4 bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  );

  const TechCardSkeleton = () => (
    <div className="group relative bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="relative z-10 text-center">
        <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto mb-3 animate-pulse"></div>
        <div className="w-16 h-4 bg-gray-700 rounded mx-auto animate-pulse"></div>
      </div>
    </div>
  );

  const ContactCardSkeleton = () => (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
      <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-6 animate-pulse"></div>
      <div className="w-24 h-6 bg-gray-700 rounded mx-auto mb-4 animate-pulse"></div>
      <div className="w-full h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
      <div className="w-3/4 h-3 bg-gray-700 rounded mx-auto animate-pulse"></div>
    </div>
  );

  const WorkCardSkeleton = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="mb-4">
        <div className="w-16 h-16 bg-gray-700 rounded-xl mb-4 animate-pulse"></div>
        <div className="w-3/4 h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
        <div className="w-full h-4 bg-gray-700 rounded mb-4 animate-pulse"></div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="w-24 h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="flex flex-wrap gap-2">
            <div className="w-12 h-6 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-16 h-6 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const companyWorks = [
    {
      id: 1,
      title: "Website Development",
      description:
        "Modern, responsive websites that are user-friendly and SEO optimized.",
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
     
      color: "from-blue-500 to-cyan-500",
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
     
      color: "from-purple-500 to-pink-500",
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
      
      color: "from-green-500 to-emerald-500",
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
      icon: "⚙️",
      color: "from-orange-500 to-yellow-500",
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
      icon: "📈",
      color: "from-red-500 to-pink-500",
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
      icon: "☁️",
      color: "from-indigo-500 to-blue-500",
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
      icon: <Rocket className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
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
      icon: <Target className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
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
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const successStories = [
    {
      client: "Retail Chain",
      project: "E-commerce Platform",
      result: "Increased sales by 300%",
      description:
        "Custom e-commerce solution with AI-powered recommendations.",
      icon: "🏬",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      client: "Healthcare Provider",
      project: "Patient Management System",
      result: "Reduced processing time by 70%",
      description: "Healthcare management system with telemedicine features.",
      icon: "🏥",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    {
      client: "Fintech Startup",
      project: "Mobile Banking App",
      result: "50,000+ users in 3 months",
      description: "Secure mobile banking with biometric authentication.",
      icon: "💰",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      client: "Education Institute",
      project: "Learning Management System",
      result: "Improved engagement by 200%",
      description: "Interactive LMS with video lectures and quizzes.",
      icon: "🎓",
      color: "bg-gradient-to-r from-orange-500 to-yellow-500",
    },
  ];

  const services = [
    {
      title: "Web Development",
      description: "Modern websites and web applications",
      details: {
        overview:
          "Full-stack web development services using latest technologies.",
        features: [
          "Responsive Web Design",
          "E-commerce Solutions",
          "Progressive Web Apps",
          "CMS Development",
          "API Integration",
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
        timeline: "2-8 weeks",
        process: [
          "Requirement Analysis",
          "UI/UX Design",
          "Development",
          "Testing",
          "Deployment",
          "Maintenance",
        ],
      },
      color: "from-blue-500 to-cyan-500",
    },
    {
      
      title: "Mobile Apps",
      description: "iOS & Android applications",
      details: {
        overview: "Cross-platform and native mobile app development.",
        features: [
          "iOS & Android Development",
          "Cross-Platform Solutions",
          "App Store Submission",
          "Push Notifications",
          "Offline Functionality",
          "Payment Integration",
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
        timeline: "3-12 weeks",
        process: [
          "Wireframing",
          "Prototyping",
          "UI/UX Design",
          "Development",
          "Testing",
          "Store Submission",
        ],
      },
      color: "from-purple-500 to-pink-500",
    },
    {
      
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure",
      details: {
        overview: "Cloud migration, deployment, and management services.",
        features: [
          "AWS/Azure/GCP Setup",
          "Serverless Architecture",
          "Microservices",
          "Database Migration",
          "CI/CD Pipeline",
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
        timeline: "2-6 weeks",
        process: [
          "Assessment",
          "Planning",
          "Migration",
          "Optimization",
          "Security",
          "Maintenance",
        ],
      },
      color: "from-indigo-500 to-blue-500",
    },
    {
      
      title: "AI Solutions",
      description: "AI & Machine Learning",
      details: {
        overview:
          "AI and Machine Learning solutions for business transformation.",
        features: [
          "Custom AI Models",
          "Machine Learning",
          "Natural Language Processing",
          "Computer Vision",
          "Predictive Analytics",
          "Chatbot Development",
          "Recommendation Systems",
          "Data Analysis",
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
        timeline: "4-16 weeks",
        process: [
          "Data Collection",
          "Model Selection",
          "Training & Validation",
          "Integration",
          "Testing",
          "Deployment",
        ],
      },
      color: "from-green-500 to-emerald-500",
    },
  ];

  const teamFeatures = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Cross-functional teams working seamlessly together",
      points: [
        "Daily Stand-ups",
        "Collaborative Tools",
        "Transparent Communication",
        "Knowledge Sharing",
        "Cross-team Coordination",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Agile Methodology",
      description: "Flexible and iterative development approach",
      points: [
        "Sprint Planning",
        "Continuous Feedback",
        "Rapid Prototyping",
        "Regular Demos",
        "Retrospectives",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Turnaround",
      description: "Fast delivery without compromising quality",
      points: [
        "Efficient Workflow",
        "Parallel Development",
        "Automated Testing",
        "Continuous Deployment",
        "Performance Monitoring",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Technical Excellence",
      description: "Best practices and modern technologies",
      points: [
        "Code Reviews",
        "Performance Optimization",
        "Security First",
        "Documentation",
        "Code Quality",
      ],
      color: "from-orange-500 to-yellow-500",
    },
  ];

  const whyChooseUs = [
    { text: "Expert team with 10+ years of industry experience" },
    { text: "Agile development methodology for faster delivery" },
    { text: "24/7 technical support and maintenance" },
    { text: "Competitive pricing with flexible engagement models" },
    { text: "Proven track record across multiple industries"},
    { text: "Focus on scalability and future-proof solutions" },
    { text: "Dedicated project managers for seamless communication"},
    { text: "Regular progress updates and transparency" },
  ];

  const technologies = [
    { name: "React", color: "from-cyan-500 to-blue-500" },
    { name: "Next.js", color: "from-gray-600 to-black" },
    { name: "Node.js", color: "from-green-500 to-emerald-500" },
    { name: "Python", color: "from-yellow-500 to-blue-500"},
    { name: "AWS", color: "from-orange-500 to-yellow-500" },
    { name: "Docker", color: "from-blue-400 to-cyan-400" },
    { name: "Kubernetes", color: "from-blue-600 to-indigo-600" },
    { name: "React Native", color: "from-blue-400 to-purple-400"},
    { name: "TensorFlow", color: "from-orange-600 to-red-600" },
    { name: "MongoDB", color: "from-green-600 to-emerald-600"},
    { name: "PostgreSQL", color: "from-blue-300 to-indigo-400"},
    { name: "GraphQL", color: "from-pink-500 to-purple-600"},
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedService(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 overflow-hidden">
        <Navbar />

        {/* Hero Section Skeleton */}
        <HeroSkeleton />

        {/* Services Section Skeleton */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-800"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20">
              <div className="w-32 h-8 bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
              <div className="w-3/4 h-12 bg-gray-700 rounded mx-auto mb-6 animate-pulse"></div>
              <div className="w-1/2 h-6 bg-gray-700 rounded mx-auto animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {[1, 2, 3, 4].map((i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </div>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <StatsSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section Skeleton */}
        <section className="py-24 bg-gray-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20">
              <div className="w-32 h-8 bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
              <div className="w-3/4 h-12 bg-gray-700 rounded mx-auto mb-6 animate-pulse"></div>
              <div className="w-1/2 h-6 bg-gray-700 rounded mx-auto animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <ProcessCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section Skeleton */}
        <section className="py-24 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-32 h-8 bg-gray-700 rounded-full mb-6 animate-pulse"></div>
                <div className="w-3/4 h-12 bg-gray-700 rounded mb-8 animate-pulse"></div>
                <div className="space-y-6 mb-12">
                  {[1, 2, 3, 4].map((i) => (
                    <WhyChooseItemSkeleton key={i} />
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-gray-800 rounded-3xl p-10 border border-gray-700">
                  <div className="flex items-center mb-10">
                    <div className="w-20 h-20 bg-gray-700 rounded-2xl animate-pulse"></div>
                    <div className="ml-8">
                      <div className="w-48 h-8 bg-gray-700 rounded mb-2 animate-pulse"></div>
                      <div className="w-32 h-4 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack Section Skeleton */}
        <section className="py-24 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20">
              <div className="w-40 h-8 bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
              <div className="w-3/4 h-12 bg-gray-700 rounded mx-auto mb-6 animate-pulse"></div>
              <div className="w-1/2 h-6 bg-gray-700 rounded mx-auto animate-pulse"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <TechCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section Skeleton */}
        <section className="py-24 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="w-48 h-12 bg-gray-700 rounded-full mx-auto mb-8 animate-pulse"></div>
              <div className="w-3/4 h-12 bg-gray-700 rounded mx-auto mb-6 animate-pulse"></div>
              <div className="w-2/3 h-8 bg-gray-700 rounded mx-auto mb-12 animate-pulse"></div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <div className="w-64 h-16 bg-gray-700 rounded-2xl animate-pulse"></div>
                <div className="w-64 h-16 bg-gray-700 rounded-2xl animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
                {[1, 2, 3].map((i) => (
                  <ContactCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden">
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Excellence Allegiance 
          </h1>

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
          <div className="absolute inset-0 bg-black/80"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-cyan-500/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-500/5 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
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
                <div
                  className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${service.color} rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      {service.icon}
                    </div>
                    <ChevronRight className="w-6 h-6 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

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

                  <div className="text-sm text-cyan-400 font-semibold">
                    Starting from {service.details.pricing.basic}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
            
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 text-center border border-gray-700/50 hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-200 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-7 justify-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105">
              Start Your Project
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%, rgba(139, 92, 246, 0.1) 100%)`,
              backgroundSize: "400% 400%",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            
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
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                ></div>
                <div className="relative">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm">
                    {feature.description}
                  </p>

                  <div className="space-y-3">
                    {feature.points.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-gray-300 group-hover:text-white transition-colors"
                      >
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full mr-3`}
                        ></div>
                        <span className="text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
             
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
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="group-hover:translate-x-2 transition-transform duration-300">
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {item.text}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 border border-gray-800 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
                <div className="flex items-center mb-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center overflow-hidden">
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
                  {[
                    {
                      label: "Project Success Rate",
                      value: "99.5%",
                      color: "from-green-400 to-emerald-300",
                    },
                    {
                      label: "Average Delivery Time",
                      value: "-30%",
                      color: "from-cyan-400 to-blue-300",
                    },
                    {
                      label: "Cost Efficiency",
                      value: "40%",
                      color: "from-yellow-400 to-orange-300",
                    },
                    {
                      label: "Client Retention",
                      value: "95%",
                      color: "from-purple-400 to-pink-300",
                    },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-6 border-b border-gray-800"
                    >
                      <div>
                        <div className="text-gray-300">{stat.label}</div>
                        <div className="text-sm text-gray-500">
                          Industry leading performance
                        </div>
                      </div>
                      <span
                        className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-12 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-5 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-105">
                  Request Custom Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            
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
                  <div className="text-3xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r  via-black from-gray-900 to-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
           

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
                  <Sparkles className="w-6 h-6" />
                  Start Free Consultation
                </span>
              </button>

              <button className="group relative border-2 border-gray-600 text-gray-300 px-12 py-5 rounded-2xl font-bold hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 text-lg">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <TrendingUp className="w-6 h-6" />
                  View Case Studies
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              {[
                {
                  title: "Email Us",
                  text: "contact@myeapl.com",
                  subtext: "Response within 24 hours",
                  color: "cyan",
                },
                {
                  title: "Call Us",
                  text: "+91 6289 534 780",
                  subtext: "24/7 Support Available",
                  color: "blue",
                },
                {
                  title: "Visit Us",
                  text: "Mukundapur, Kolkata-700099",
                  subtext: "Schedule a meeting",
                  color: "green",
                },
              ].map((contact, idx) => (
                <div
                  key={idx}
                  className={`bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group`}
                >
                  <div className="text-4xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {contact.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {contact.title}
                  </h3>
                  <div
                    className={`text-cyan-300 hover:text-cyan-200 transition-colors block mb-2`}
                  >
                    {contact.text}
                  </div>
                  <div className="text-sm text-gray-400">{contact.subtext}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
              
              
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-900 py-20">
        <Testimonials />
      </div>

      {isPopupOpen && selectedService && (
        <ServicePopup
          service={selectedService}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      )}

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
                    className="p-2 text-gray-400 hover:text-white bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 transition-all hover:rotate-90 duration-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8">
                  <div className="mb-10 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      Our Work & Services
                    </h2>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                      Discover what we build, how we help businesses grow, and
                      how we can assist you
                    </p>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      What We Build
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {companyWorks.map((work, index) => (
                        <div
                          key={work.id}
                          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
                        >
                          <div className="mb-4">
                            <div
                              className={`w-16 h-16 bg-gradient-to-br ${work.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                            >
                              {work.icon}
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
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
                                    className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
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
                                    className="flex items-center text-gray-300 text-sm group-hover:text-white transition-colors"
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
                                    className="flex items-center text-gray-300 text-sm group-hover:text-white transition-colors"
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

                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      How We Help Businesses
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {whatWeBuild.map((section, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:scale-105 transition-all duration-300"
                        >
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center mb-4`}
                          >
                            <div className="text-white">{section.icon}</div>
                          </div>
                          <h4 className="text-xl font-bold text-white mb-4">
                            {section.category}
                          </h4>
                          <div className="space-y-3">
                            {section.items.map((item, itemIdx) => (
                              <div
                                key={itemIdx}
                                className="flex items-center text-gray-300"
                              >
                                <div
                                  className={`w-2 h-2 bg-gradient-to-r ${section.color} rounded-full mr-3`}
                                ></div>
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      Success Stories
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {successStories.map((story, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/30 transition-all hover:scale-105 duration-300"
                        >
                          <div className="flex items-start mb-4">
                            <div
                              className={`w-12 h-12 ${story.color} rounded-xl flex items-center justify-center text-xl mr-4`}
                            >
                              {story.icon}
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

                  <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/30 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Ready to Transform Your Business?
                    </h3>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                      Let's discuss how we can help you achieve your digital
                      goals and build something amazing together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all hover:scale-105">
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
    </div>
  );
};

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
                className="p-2 text-gray-400 hover:text-white bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 transition-all hover:rotate-90 duration-300"
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
                        className="flex items-center text-gray-300 hover:text-white transition-colors"
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
                        className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-sm font-medium rounded-full border border-cyan-500/20 hover:scale-105 transition-transform"
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
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-105">
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
                      <div className="text-sm text-gray-300 group-hover:text-cyan-300 transition-colors">
                        {step}
                      </div>
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
