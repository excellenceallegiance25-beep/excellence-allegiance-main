import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Amit Sharma",
      role: "CEO & Founder",
      description:
        "15+ years in enterprise software solutions and digital transformation",
      social: { linkedin: "#", email: "#" },
    },
    {
      name: "Priya Patel",
      role: "CTO",
      description:
        "Cloud architecture expert with AWS and Azure specializations",
      social: { linkedin: "#", email: "#" },
    },
    {
      name: "Rajesh Kumar",
      role: "Lead Architect",
      description:
        "Full-stack development specialist with microservices expertise",
      social: { linkedin: "#", email: "#" },
    },
    {
      name: "Sneha Singh",
      role: "Design Director",
      description: "UI/UX strategist with focus on enterprise applications",
      social: { linkedin: "#", email: "#" },
    },
  ];

  const companyMilestones = [
    {
      year: "2020",
      event: "Cloud Partnership",
      description: "Became AWS Advanced Consulting Partner",
    },
    {
      year: "2022",
      event: "Team Expansion",
      description: "Scaled to 25+ technology experts",
    },
    {
      year: "2023",
      event: "Award Recognition",
      description: "Best IT Service Provider 2023",
    },
    {
      year: "2024",
      event: "AI Solutions Launch",
      description: "Launched AI-powered enterprise solutions",
    },
  ];

  const clientIndustries = [
    {
      name: "Healthcare",

      count: "12+",
      color: "bg-red-500/10 text-red-600",
    },
    {
      name: "Finance",

      count: "8+",
      color: "bg-green-500/10 text-green-600",
    },
    {
      name: "E-commerce",

      count: "15+",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      name: "Education",

      count: "10+",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      name: "Manufacturing",

      count: "7+",
      color: "bg-orange-500/10 text-orange-600",
    },
    {
      name: "Startups",

      count: "20+",
      color: "bg-cyan-500/10 text-cyan-600",
    },
  ];

  const coreValues = [
    {
      title: "Innovation",
      description:
        "Driving digital transformation through cutting-edge solutions",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Excellence",
      description: "Quality-first approach in every deliverable",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Integrity",
      description: "Transparent processes and ethical practices",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Collaboration",
      description: "Partnership mindset for shared success",
      gradient: "from-orange-500/20 to-yellow-500/20",
    },
    {
      title: "Agility",
      description: "Adaptive methodologies for evolving needs",
      gradient: "from-indigo-500/20 to-blue-500/20",
    },
    {
      title: "Growth",
      description: "Continuous learning and scaling capabilities",
      gradient: "from-rose-500/20 to-red-500/20",
    },
  ];

  const technologyStack = [
    { name: "React", category: "Frontend", level: "Expert" },
    { name: "Node.js", category: "Backend", level: "Expert" },
    { name: "Python", category: "AI/ML", level: "Advanced" },
    { name: "AWS", category: "Cloud", level: "Expert" },
    { name: "MongoDB", category: "Database", level: "Advanced" },
    { name: "Kubernetes", category: "DevOps", level: "Advanced" },
    { name: "Next.js", category: "Full-stack", level: "Expert" },
    { name: "Docker", category: "Container", level: "Advanced" },
    { name: "TypeScript", category: "Language", level: "Expert" },
    { name: "GraphQL", category: "API", level: "Advanced" },
    { name: "Flutter", category: "Mobile", level: "Intermediate" },
    { name: "TensorFlow", category: "AI", level: "Advanced" },
  ];

  const developmentProcess = [
    {
      title: "Discovery & Analysis",
      description: "In-depth requirement gathering and feasibility study",
      color: "bg-blue-500",
    },
    {
      title: "Strategy & Planning",
      description: "Architecture design and project roadmap creation",
      color: "bg-purple-500",
    },
    {
      title: "Development",
      description: "Agile sprints with continuous integration",
      color: "bg-green-500",
    },
    {
      title: "Quality Assurance",
      description: "Comprehensive testing and security audits",
      color: "bg-yellow-500",
    },
    {
      title: "Deployment",
      description: "Production deployment with CI/CD pipeline",
      color: "bg-orange-500",
    },
    {
      title: "Support & Optimization",
      description: "Ongoing maintenance and performance tuning",

      color: "bg-cyan-500",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Mehta",
      position: "CTO, TechCorp Solutions",
      quote:
        "Their cloud migration strategy saved us 40% in operational costs. Exceptional technical expertise!",
      rating: 5,
      project: "Enterprise Cloud Migration",
    },
    {
      name: "Priya Sharma",
      position: "Director, HealthCare Plus",
      quote:
        "The telemedicine platform they built handles 10,000+ daily users seamlessly. Highly reliable!",
      rating: 5,
      project: "Healthcare Platform",
    },
    {
      name: "Amit Verma",
      position: "CEO, EduTech Innovations",
      quote:
        "Delivered complex LMS with AI features 2 weeks ahead of schedule. Outstanding project management!",
      rating: 5,
      project: "AI-powered Learning System",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="absolute top-1/4 left-10 w-16 h-16 border border-blue-500/30 rounded-lg animate-pulse"></div>
        <div
          className="absolute top-1/3 right-20 w-20 h-20 border border-purple-500/30 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-24 h-24 border border-cyan-500/20 rounded-lg animate-ping"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/4 w-12 h-12 border border-green-500/30 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div className="absolute top-10 left-1/4 text-xs font-mono text-blue-400/30 animate-float">
          {"<div>"}
        </div>
        <div
          className="absolute top-40 right-1/3 text-xs font-mono text-green-400/30 animate-float"
          style={{ animationDelay: "1s" }}
        >
          {"function()"}
        </div>
        <div
          className="absolute bottom-40 left-1/2 text-xs font-mono text-purple-400/30 animate-float"
          style={{ animationDelay: "2s" }}
        >
          {"const"}
        </div>
        <div
          className="absolute bottom-20 right-1/4 text-xs font-mono text-yellow-400/30 animate-float"
          style={{ animationDelay: "3s" }}
        >
          {"=>"}
        </div>
      </div>
      <Navbar />
      <section className="relative pt-32 pb-20 min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-0"></div>
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-20"></div>
          <div
            className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-500 rounded-full animate-ping opacity-20"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-cyan-500 rounded-full animate-ping opacity-20"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
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
                    d="M50,0 V100 M0,50 H100"
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle cx="50" cy="50" r="5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient">
                ABOUT US
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 mb-6 leading-relaxed font-light">
                We are a{" "}
                <span className="font-bold text-cyan-300">
                  technology powerhouse
                </span>{" "}
                dedicated to transforming businesses through innovation
              </p>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                With 5+ years of expertise in enterprise solutions, we help
                organizations navigate digital transformation with cutting-edge
                technology and strategic insights.
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
                Get in Touch
              </button>
              <button className="px-8 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-300 font-semibold rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-10 hover:border-cyan-500/30 transition-all duration-300">
              <div className="pl-6">
                <h3 className="text-3xl font-bold text-white mb-6 mt-4">
                  Our Mission
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To empower businesses with intelligent technology solutions
                  that drive innovation, enhance operational efficiency, and
                  create sustainable competitive advantages in the digital era.
                </p>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-10 hover:border-purple-500/30 transition-all duration-300">
              <div className="pl-6">
                <h3 className="text-3xl font-bold text-white mb-6 mt-4">
                  Our Vision
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To be the most trusted strategic technology partner for
                  enterprises worldwide, recognized for our innovation,
                  reliability, and exceptional value delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Core{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                Values
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that guide every decision and action we take
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 hover:scale-105 transition-all duration-500 hover:border-cyan-500/30 overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  <div className="flex items-start space-x-6 mb-6">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technology{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Cutting-edge technologies powering our solutions
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologyStack.map((tech, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-xl p-6 text-center hover:scale-110 transition-all duration-300 hover:border-blue-500/30"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {tech.name}
                </h3>
                <div className="text-sm text-blue-400 font-medium mb-1">
                  {tech.category}
                </div>
                <div
                  className={`text-xs px-3 py-1 rounded-full ${
                    tech.level === "Expert"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {tech.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Development{" "}
              <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                Process
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Structured approach for successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developmentProcess.map((process, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 hover:shadow-xl hover:border-cyan-500/30 transition-all duration-300 h-full">
                  <div
                    className={`absolute -top-4 -left-4 w-14 h-14 ${process.color} text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg`}
                  >
                    {process.step}
                  </div>
                  <div className="text-5xl mb-6 mt-4">{process.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {process.title}
                  </h3>
                  <p className="text-gray-400">{process.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap justify-center gap-4">
              {[
                "Agile Methodology",
                "CI/CD Pipeline",
                "Security First",
                "Quality Assurance",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 px-6 py-2 rounded-lg font-semibold hover:border-cyan-500/30 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Industries{" "}
              <span className="text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text">
                We Serve
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Expertise across diverse sectors with tailored solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clientIndustries.map((industry, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 hover:border-orange-500/30"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {industry.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {industry.name}
                </h3>
                <div className={`text-sm ${industry.color} font-semibold`}>
                  {industry.count} Projects
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our{" "}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                Leadership
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Visionary leaders driving innovation and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 text-center hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <div className="text-cyan-400 font-semibold mb-3">
                    {member.role}
                  </div>
                  <p className="text-gray-400 text-sm mb-6">
                    {member.description}
                  </p>

                  <div className="pt-4 border-t border-gray-700/50">
                    <div className="flex justify-center space-x-4">
                      <a
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <span className="text-sm">LinkedIn</span>
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-gray-400 hover:text-green-400 transition-colors"
                      >
                        <span className="text-sm">Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline/Milestones */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our{" "}
              <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                Journey
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Milestones in our journey of innovation and growth
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500"></div>

            <div className="space-y-12">
              {companyMilestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 absolute left-1/2 transform -translate-x-1/2 z-10 ${
                      index % 2 === 0 ? "-ml-3" : "-mr-3"
                    }`}
                  ></div>

                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? "text-right pr-12" : "text-left pl-12"
                    }`}
                  >
                    <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl">{milestone.icon}</div>
                        <div>
                          <div className="text-2xl font-bold text-cyan-400">
                            {milestone.year}
                          </div>
                          <h3 className="text-xl font-bold text-white">
                            {milestone.event}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-pink-500/10 backdrop-blur-sm border border-pink-500/20 px-6 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-pink-300">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Client{" "}
              <span className="text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              What our clients say about working with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl">{testimonial.companyLogo}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400">{testimonial.position}</p>
                  </div>
                </div>

                <p className="text-gray-300 italic mb-6">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-700/50">
                  <div className="text-cyan-400 font-semibold">
                    {testimonial.project}
                  </div>
                  <div className="flex text-yellow-400">
                    {"★".repeat(testimonial.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        
        .hover-glow {
          transition: all 0.3s ease;
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
