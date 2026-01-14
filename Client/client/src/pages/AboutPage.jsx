import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  // Your existing team members
  const teamMembers = [
    {
      name: "Amit Sharma",
      role: "CEO & Founder",
      description: "15+ years in software architecture and business transformation",
      image: "👨‍💼"
    },
    {
      name: "Priya Patel",
      role: "CTO",
      description: "Expert in cloud technologies and scalable system design",
      image: "👩‍💻"
    },
    {
      name: "Rajesh Kumar",
      role: "Lead Developer",
      description: "Full-stack development specialist with 10+ years experience",
      image: "👨‍🔧"
    },
    {
      name: "Sneha Singh",
      role: "UI/UX Designer",
      description: "Creative designer focused on user experience and modern interfaces",
      image: "👩‍🎨"
    }
  ];

  // Your existing milestones
  const companyMilestones = [
    { year: "2019", event: "Company Founded", description: "Started with a vision to revolutionize IT solutions" },
    { year: "2020", event: "First Major Project", description: "Delivered enterprise solution for TechCorp" },
    { year: "2021", event: "Team Expansion", description: "Grew team to 10+ experts" },
    { year: "2022", event: "International Clients", description: "Started serving clients globally" },
    { year: "2023", event: "Award Recognition", description: "Received Best IT Service Provider award" },
    { year: "2024", event: "AI Integration", description: "Launched AI-powered solutions division" }
  ];

  // Your existing industries
  const clientIndustries = [
    { name: "Healthcare", icon: "🏥", count: "12" },
    { name: "Finance", icon: "🏦", count: "8" },
    { name: "E-commerce", icon: "🛒", count: "15" },
    { name: "Education", icon: "🎓", count: "10" },
    { name: "Manufacturing", icon: "🏭", count: "7" },
    { name: "Startups", icon: "🚀", count: "20" }
  ];

  // NEW: Core Values Detailed
  const coreValues = [
    { 
      title: "Excellence", 
      description: "We pursue mastery in every project, ensuring quality that exceeds expectations",
      icon: "🏆"
    },
    { 
      title: "Integrity", 
      description: "Honest, transparent, and ethical in all our dealings with clients and team",
      icon: "⚖️"
    },
    { 
      title: "Innovation", 
      description: "Continuously exploring new technologies and creative solutions",
      icon: "🚀"
    },
    { 
      title: "Collaboration", 
      description: "Teamwork makes the dream work - internally and with our clients",
      icon: "🤝"
    },
    { 
      title: "Customer-Centric", 
      description: "Your success is our success - we're partners in your journey",
      icon: "❤️"
    },
    { 
      title: "Growth Mindset", 
      description: "Always learning, always improving, always evolving",
      icon: "🌱"
    }
  ];

  // NEW: Certifications & Awards
  const certifications = [
    { name: "ISO 9001:2015", issuer: "Quality Management", icon: "🏅" },
    { name: "Microsoft Gold Partner", issuer: "Cloud Solutions", icon: "☁️" },
    { name: "AWS Advanced Partner", issuer: "Amazon Web Services", icon: "⚡" },
    { name: "Google Cloud Partner", issuer: "Google Cloud Platform", icon: "🔗" },
    { name: "ISO 27001 Certified", issuer: "Information Security", icon: "🔒" },
    { name: "Best IT Service Provider 2023", issuer: "Tech Awards", icon: "🏆" }
  ];

  // NEW: Office Locations
  const officeLocations = [
    { 
      city: "Mumbai", 
      country: "India", 
      address: "123 Tech Park, Andheri East, Mumbai - 400069",
      phone: "+91 22 1234 5678",
      email: "mumbai@excellenceallegiance.com"
    },
    { 
      city: "Bangalore", 
      country: "India", 
      address: "456 Innovation Hub, Whitefield, Bangalore - 560066",
      phone: "+91 80 8765 4321",
      email: "bangalore@excellenceallegiance.com"
    },
    { 
      city: "Delhi", 
      country: "India", 
      address: "789 Digital Plaza, Connaught Place, Delhi - 110001",
      phone: "+91 11 2345 6789",
      email: "delhi@excellenceallegiance.com"
    }
  ];

  // NEW: Company Culture Highlights
  const cultureHighlights = [
    {
      title: "Flexible Work Environment",
      description: "Hybrid work model with modern office spaces",
      icon: "🏢"
    },
    {
      title: "Learning & Development",
      description: "Annual training budget and certification support",
      icon: "📚"
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs",
      icon: "❤️"
    },
    {
      title: "Team Activities",
      description: "Regular team outings, hackathons, and celebrations",
      icon: "🎉"
    }
  ];

  // NEW: CSR Initiatives
  const csrInitiatives = [
    {
      title: "Digital Literacy Program",
      description: "Teaching coding to underprivileged students",
      icon: "👨‍🏫"
    },
    {
      title: "Green Initiative",
      description: "Carbon-neutral operations and tree plantation drives",
      icon: "🌳"
    },
    {
      title: "Pro Bono Projects",
      description: "Free tech solutions for non-profit organizations",
      icon: "🤲"
    }
  ];

  // ========== NEW SECTION 1: Technology Stack ==========
  const technologyStack = [
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "Python", icon: "🐍", category: "AI/ML" },
    { name: "AWS", icon: "☁️", category: "Cloud" },
    { name: "MongoDB", icon: "🍃", category: "Database" },
    { name: "Flutter", icon: "🎯", category: "Mobile" },
    { name: "Next.js", icon: "▲", category: "Full-stack" },
    { name: "Docker", icon: "🐳", category: "DevOps" },
    { name: "TypeScript", icon: "📘", category: "Language" },
    { name: "GraphQL", icon: "📊", category: "API" },
    { name: "Firebase", icon: "🔥", category: "Backend" },
    { name: "TensorFlow", icon: "🧠", category: "AI" }
  ];

  // ========== NEW SECTION 2: Development Process ==========
  const developmentProcess = [
    {
      step: "01",
      title: "Discovery",
      description: "Understanding your business needs and project goals",
      icon: "🔍"
    },
    {
      step: "02",
      title: "Planning",
      description: "Creating wireframes, architecture, and project roadmap",
      icon: "📐"
    },
    {
      step: "03",
      title: "Development",
      description: "Agile sprints with regular demos and feedback",
      icon: "💻"
    },
    {
      step: "04",
      title: "Testing",
      description: "Comprehensive testing including automated and manual",
      icon: "🧪"
    },
    {
      step: "05",
      title: "Deployment",
      description: "CI/CD pipeline setup and production launch",
      icon: "🚀"
    },
    {
      step: "06",
      title: "Support",
      description: "Ongoing support, updates, and scaling",
      icon: "🔧"
    }
  ];

  // ========== NEW SECTION 3: Client Testimonials ==========
  const testimonials = [
    {
      name: "Rajesh Mehta",
      position: "CEO, TechCorp Solutions",
      companyLogo: "🏢",
      quote: "Excellence Allegiance transformed our legacy system into a modern cloud platform. Exceptional work!",
      rating: 5,
      project: "E-commerce Platform"
    },
    {
      name: "Priya Sharma",
      position: "CTO, HealthCare Plus",
      companyLogo: "🏥",
      quote: "The mobile app they developed increased our patient engagement by 40%. Highly recommended!",
      rating: 5,
      project: "Healthcare App"
    },
    {
      name: "Amit Verma",
      position: "Director, EduTech Innovations",
      companyLogo: "🎓",
      quote: "Outstanding work on our LMS platform. Delivered beyond expectations.",
      rating: 5,
      project: "Learning System"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
      
      {/* Background animation elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-20 right-16 w-20 h-20 bg-purple-300 rounded-full opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-pink-300 rounded-full opacity-25 animate-pulse" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-cyan-300 rounded-full opacity-35 animate-bounce" style={{animationDuration: '5s'}}></div>
        
        <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-yellow-300 rounded-lg opacity-30 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-green-300 rounded-lg opacity-25 animate-pulse" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-10 h-10 bg-red-300 rounded-full opacity-40 animate-bounce" style={{animationDuration: '6s'}}></div>
        
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-200 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-200 opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">About Us</h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto">
              We are a passionate team of technology experts dedicated to transforming businesses through innovative digital solutions.
            </p>
            
            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50+</div>
                <div className="text-gray-600">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">25+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  Our Achievements
                </h2>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50+</div>
                    <div className="text-gray-600 font-medium">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">25+</div>
                    <div className="text-gray-600 font-medium">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">5+</div>
                    <div className="text-gray-600 font-medium">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">15+</div>
                    <div className="text-gray-600 font-medium">Team Members</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-md">
                  <img 
                    src="/achiv.avif" 
                    alt="Our Team Achievements"
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Company Timeline */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 text-lg">Milestones that shaped our growth</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-400"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {companyMilestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full"></div>
                  
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/30">
                      <div className="text-sm text-blue-600 font-bold mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.event}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/30">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To empower businesses with cutting-edge technology solutions that drive growth, 
                enhance efficiency, and create sustainable competitive advantages in the digital era.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/30">
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be the most trusted technology partner for businesses worldwide, 
                known for innovation, reliability, and exceptional value delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Detailed Core Values Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The principles that guide every decision and action we take
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEW SECTION 1: Technology Stack ========== */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Technology Stack</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Cutting-edge technologies we excel in
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologyStack.map((tech, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-xl p-5 text-center hover:shadow-xl transition-all duration-300 border border-white/30 group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{tech.name}</h3>
                <div className="text-sm text-blue-600 font-medium">{tech.category}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-700 max-w-2xl mx-auto">
              We stay updated with the latest technologies to deliver modern, scalable, 
              and high-performance solutions for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-gray-600 text-lg">Expert solutions across diverse sectors</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clientIndustries.map((industry, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-white/30 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {industry.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{industry.name}</h3>
                <div className="text-sm text-gray-600">{industry.count}+ Projects</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEW SECTION 2: Development Process ========== */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-white/50 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Structured approach for successful project delivery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developmentProcess.map((process, index) => (
              <div key={index} className="relative">
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {process.step}
                  </div>
                  <div className="text-5xl mb-6 mt-2">{process.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{process.title}</h3>
                  <p className="text-gray-700">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-4">
              <div className="bg-blue-100 text-blue-700 px-6 py-2 rounded-lg font-semibold">Agile Methodology</div>
              <div className="bg-green-100 text-green-700 px-6 py-2 rounded-lg font-semibold">Weekly Sprints</div>
              <div className="bg-purple-100 text-purple-700 px-6 py-2 rounded-lg font-semibold">CI/CD Pipeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Passionate professionals dedicated to delivering exceptional results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-white/30 group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-cyan-600 font-semibold mb-3">{member.role}</div>
                <p className="text-gray-700 text-sm">{member.description}</p>
                
                {/* Social/Connect */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-center space-x-4">
                    <span className="text-gray-500 hover:text-blue-500 cursor-pointer">LinkedIn</span>
                    <span className="text-gray-500 hover:text-green-500 cursor-pointer">Email</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEW SECTION 3: Client Testimonials ========== */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-white/50 to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Trusted by businesses across industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.companyLogo}</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <span className="text-sm text-blue-600 font-semibold">Project: {testimonial.project}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">25+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Certifications & Awards Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Certifications & Awards</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Recognized for excellence and industry compliance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-6 text-center">{cert.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{cert.name}</h3>
                <p className="text-gray-600 text-center">{cert.issuer}</p>
                <div className="mt-4 text-center">
                  <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    Certified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Office Locations Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Serving clients across India with strategic presence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="text-3xl mr-4">📍</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{office.city}</h3>
                    <p className="text-gray-600">{office.country}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700 flex items-start">
                    <span className="mr-2">🏢</span>
                    {office.address}
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <span className="mr-2">📞</span>
                    {office.phone}
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <span className="mr-2">✉️</span>
                    {office.email}
                  </p>
                </div>
                <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Directions
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your existing Values Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">Guiding principles that define our work culture</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-lg text-center p-6 rounded-2xl shadow-lg border border-white/30 group hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-700">We constantly explore new technologies and approaches to deliver cutting-edge solutions.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg text-center p-6 rounded-2xl shadow-lg border border-white/30 group hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Collaboration</h3>
              <p className="text-gray-700">We work closely with our clients as partners in their success journey.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg text-center p-6 rounded-2xl shadow-lg border border-white/30 group hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⭐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-700">We strive for perfection in every project, ensuring the highest quality standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Company Culture Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Culture</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Where talent thrives and innovation happens
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureHighlights.map((highlight, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-2xl shadow-lg border border-purple-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-4">{highlight.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{highlight.title}</h3>
                <p className="text-gray-700 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
          
          {/* Employee Testimonial */}
          <div className="mt-16 max-w-3xl mx-auto bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/30">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">👨‍💼</div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">Rohan Mehta</h4>
                <p className="text-gray-600">Senior Developer, 3 years with us</p>
              </div>
            </div>
            <p className="text-gray-700 text-lg italic">
              "What makes this place special is the balance of challenging work and supportive environment. 
              We're encouraged to innovate, learn, and grow together as a team."
            </p>
          </div>
        </div>
      </section>

      {/* NEW: Social Responsibility Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Social Responsibility</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Making a positive impact beyond business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {csrInitiatives.map((initiative, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-lg border border-green-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-6">{initiative.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{initiative.title}</h3>
                <p className="text-gray-700 mb-6">{initiative.description}</p>
                <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Active Program
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-700 max-w-2xl mx-auto">
              We believe in giving back to the community and contributing to a sustainable future. 
              Each year, we dedicate 2% of our profits and 1% of employee time to social initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 shadow-lg">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Let's discuss how we can help you achieve your digital goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule a Call
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                View Portfolio
              </button>
            </div>
            <p className="mt-6 text-blue-200">
              Contact us at: contact@excellenceallegiance.com | +91 6289 534 780
            </p>
          </div>
        </div>
      </section>
 
    </div>
  );
};

export default AboutPage;