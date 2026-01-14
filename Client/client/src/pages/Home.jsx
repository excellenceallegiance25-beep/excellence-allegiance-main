import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";

const Home = () => {
  const services = [
    {
      icon: "💻",
      title: "Web Development",
      description: "Modern websites and web applications"
    },
    {
      icon: "📱", 
      title: "Mobile Apps",
      description: "iOS & Android applications"
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure"
    },
    {
      icon: "🤖",
      title: "AI Solutions",
      description: "AI & Machine Learning"
    }
  ];

  const teamFeatures = [
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Cross-functional teams working seamlessly together",
      points: ["Daily Stand-ups", "Collaborative Tools", "Transparent Communication"]
    },
    {
      icon: "🔄",
      title: "Agile Methodology",
      description: "Flexible and iterative development approach",
      points: ["Sprint Planning", "Continuous Feedback", "Rapid Prototyping"]
    },
    {
      icon: "⚡",
      title: "Quick Turnaround",
      description: "Fast delivery without compromising quality",
      points: ["Efficient Workflow", "Parallel Development", "Automated Testing"]
    },
    {
      icon: "🔧",
      title: "Technical Excellence",
      description: "Best practices and modern technologies",
      points: ["Code Reviews", "Performance Optimization", "Security First"]
    }
  ];

  const whyChooseUs = [
    "Expert team with 15+ years of industry experience",
    "Agile development methodology for faster delivery",
    "24/7 technical support and maintenance",
    "Competitive pricing with flexible engagement models",
    "Proven track record across multiple industries",
    "Focus on scalability and future-proof solutions"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section 
        className="pt-32 pb-20 text-white relative overflow-hidden min-h-screen flex items-center"
        style={{
          backgroundImage: 'url("/next.avif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Excellence Allegiance
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            We build digital solutions that transform businesses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Project
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Services
            </button>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Team Collaboration Excellence
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our collaborative approach ensures seamless project execution and exceptional results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{feature.description}</p>
                
                <div className="space-y-2">
                  {feature.points.map((point, idx) => (
                    <div key={idx} className="flex items-center justify-center text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Experts Team</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Partner in Digital Transformation
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                At <span className="font-semibold text-blue-600">Excellence Allegiance</span>, we're more than just an IT service provider. We're your strategic partner committed to delivering innovative solutions that drive real business value. Our team of certified professionals brings deep technical expertise and industry knowledge to every project.
              </p>
              
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mr-4">
                  Get Started
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-5xl mb-6">🚀</div>
                <h3 className="text-2xl font-bold mb-4">Ready to Transform?</h3>
                <p className="text-blue-100 mb-6">
                  Start your digital transformation journey with us today. Let's build something amazing together!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold mr-3">1</div>
                    <span>Consultation & Planning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold mr-3">2</div>
                    <span>Design & Development</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold mr-3">3</div>
                    <span>Testing & Deployment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold mr-3">4</div>
                    <span>Support & Maintenance</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-20 animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="circuit" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 0,20 L 40,20 M 20,0 L 20,40" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <circle cx="20" cy="20" r="2" fill="currentColor"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" className="text-blue-400"/>
            </svg>
          </div>
          
          <div className="absolute top-10 left-10 w-16 h-16 border-2 border-blue-500/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 border-2 border-purple-500/20 rounded-lg animate-pulse delay-300"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-300 text-sm font-medium">WHY CHOOSE US</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                The Excellence Difference
              </span>
            </h2>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We don't just build software—we build partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="relative mb-4">
                <div className="text-3xl mb-3">⚡</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fast Delivery</h3>
              <p className="text-gray-400 text-sm">
                Projects delivered 30% faster than industry standards.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <div className="relative mb-4">
                <div className="text-3xl mb-3">🛡️</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Enterprise Security</h3>
              <p className="text-gray-400 text-sm">
                Military-grade security for your data protection.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <div className="relative mb-4">
                <div className="text-3xl mb-3">📈</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ROI Focused</h3>
              <p className="text-gray-400 text-sm">
                Solutions designed for maximum business growth.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
              <div className="relative mb-4">
                <div className="text-3xl mb-3">👥</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Dedicated Team</h3>
              <p className="text-gray-400 text-sm">
                Senior experts dedicated to your success.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-900/20 to-cyan-900/10 rounded-xl border border-blue-500/10">
              <div className="text-2xl font-bold text-cyan-300">24/7</div>
              <div className="text-gray-400 text-xs">Support</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/10 rounded-xl border border-purple-500/10">
              <div className="text-2xl font-bold text-purple-300">50+</div>
              <div className="text-gray-400 text-xs">Projects</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/10 rounded-xl border border-green-500/10">
              <div className="text-2xl font-bold text-green-300">25+</div>
              <div className="text-gray-400 text-xs">Clients</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-900/20 to-amber-900/10 rounded-xl border border-orange-500/10">
              <div className="text-2xl font-bold text-orange-300">5+</div>
              <div className="text-gray-400 text-xs">Years</div>
            </div>
          </div>
        </div>
      </section>
<section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute inset-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        ></div>
      ))}
    </div>
    
    <svg className="absolute inset-0 w-full h-full opacity-10">
      <path
        d="M0,50 Q150,20 300,50 T600,50"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-white"
      />
      <path
        d="M50,150 Q250,100 450,150"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-white"
      />
      <path
        d="M100,250 Q350,200 600,250"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-white"
      />
    </svg>
    
    <div className="absolute top-10 left-10 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-cyan-200">READY TO TRANSFORM</span>
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        Ready to Start Your <span className="bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">Digital Journey</span>?
      </h2>
      
      <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
        Let's collaborate to turn your ideas into reality. Schedule a <span className="font-semibold text-white">free consultation</span> with our experts today.
      </p>
      
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
        <button className="group relative bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/30 text-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
          <span className="relative flex items-center justify-center gap-3">
            <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Start Free Consultation
          </span>
        </button>
        
        <button className="group relative border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 text-lg">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
          <span className="relative flex items-center justify-center gap-3">
            <svg className="w-6 h-6 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            View Case Studies
          </span>
        </button>
      </div>
      
      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
          <div className="text-3xl mb-4 text-cyan-300 group-hover:scale-110 transition-transform duration-300 inline-block">📧</div>
          <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
          <a href="mailto:contact@excellenceallegiance.com" className="text-blue-200 hover:text-white transition-colors">
            contact@excellenceallegiance.com
          </a>
          <div className="mt-4 text-sm text-blue-300">Response within 24 hours</div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300 group">
          <div className="text-3xl mb-4 text-purple-300 group-hover:scale-110 transition-transform duration-300 inline-block">📞</div>
          <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
          <a href="tel:+916289534780" className="text-blue-200 hover:text-white transition-colors text-lg">
            +91 6289 534 780
          </a>
          <div className="mt-4 text-sm text-blue-300">24/7 Support Available</div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-300 group">
          <div className="text-3xl mb-4 text-green-300 group-hover:scale-110 transition-transform duration-300 inline-block">📍</div>
          <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
          <div className="text-blue-200">
            Tech Park, Sector 62<br />
            Noida, Uttar Pradesh 201309
          </div>
          <div className="mt-4 text-sm text-blue-300">Schedule a meeting</div>
        </div>
      </div>
      
      {/* Trust Badges */}
      <div className="mt-16 pt-8 border-t border-white/20">
        <p className="text-blue-200 mb-6">Trusted by 50+ Industry Leaders</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-80">
          <div className="text-2xl">🏢</div>
          <div className="text-2xl">💼</div>
          <div className="text-2xl">🏦</div>
          <div className="text-2xl">🏥</div>
          <div className="text-2xl">🎓</div>
          <div className="text-2xl">🛒</div>
        </div>
      </div>
    </div>
  </div>
</section>

<style jsx>{`
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

      {/* Extra spacing between sections */}
      <div className="h-16 bg-white"></div>

      {/* Testimonials Section */}
      <div className="bg-white">
        <Testimonials />
      </div>

      {/* Extra spacing before footer */}
      <div className="h-12 bg-white"></div>

     </div>
  );
};

export default Home;