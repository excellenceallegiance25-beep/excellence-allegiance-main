import React, { useEffect, useState } from 'react';

const Testimonials = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const testimonialsData = [
    // Column 1 - Scroll Up
    [
      {
        id: 1,
        name: "Emma Wilson",
        role: "Product Manager",
        content: "work above and beyond our expectations. Would highly recommend to anyone working for top-notch quality.",
        color: "from-blue-500 to-cyan-500"
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Software Engineer",
        content: "The innovative solutions provided helped us reach our goals faster than expected. The attention to detail and technical expertise was impressive.",
        color: "from-green-500 to-emerald-500"
      },
      {
        id: 3,
        name: "James Rodriguez",
        role: "Creative Director",
        content: "Game-changing results for our business. Outstanding creativity and professionalism. They truly understand how to deliver exceptional results.",
        color: "from-purple-500 to-pink-500"
      },
      {
        id: 4,
        name: "Ema Wilson",
        role: "Product Manager",
        content: "The innovative solutions provided helped us reach our goals faster than expected while maintaining clear communication.",
        color: "from-orange-500 to-amber-500"
      },
      {
        id: 5,
        name: "David Park",
        role: "CEO",
        content: "significantly impacted our business growth. Their strategic approach is game-changing for our industry.",
        color: "from-red-500 to-rose-500"
      }
    ],
    // Column 2 - Scroll Down
    [
      {
        id: 6,
        name: "Sarah Johnson",
        role: "Marketing Director",
        content: "Their strategic marketing solutions boosted our online presence by 300% in just 3 months.",
        color: "from-indigo-500 to-blue-500"
      },
      {
        id: 7,
        name: "Alex Thompson",
        role: "CTO",
        content: "Technical excellence combined with business acumen. They delivered exactly what we needed.",
        color: "from-teal-500 to-green-500"
      },
      {
        id: 8,
        name: "Lisa Wang",
        role: "Operations Manager",
        content: "Streamlined our entire workflow. The efficiency gains have been absolutely remarkable.",
        color: "from-violet-500 to-purple-500"
      },
      {
        id: 9,
        name: "Robert Kim",
        role: "Product Lead",
        content: "Quality-focused approach with timely delivery. Exceeded all our expectations.",
        color: "from-amber-500 to-orange-500"
      },
      {
        id: 10,
        name: "Maria Garcia",
        role: "UX Designer",
        content: "Creative solutions that perfectly aligned with our user experience goals.",
        color: "from-rose-500 to-pink-500"
      }
    ],
    // Column 3 - Scroll Up
    [
      {
        id: 11,
        name: "Tom Wilson",
        role: "Project Manager",
        content: "Seamless collaboration and excellent communication throughout the entire project lifecycle.",
        color: "from-sky-500 to-blue-500"
      },
      {
        id: 12,
        name: "Sophie Chen",
        role: "Data Analyst",
        content: "Data-driven insights that transformed our decision-making process completely.",
        color: "from-emerald-500 to-green-500"
      },
      {
        id: 13,
        name: "Kevin Lee",
        role: "DevOps Engineer",
        content: "Infrastructure improvements that increased our system reliability dramatically.",
        color: "from-fuchsia-500 to-purple-500"
      },
      {
        id: 14,
        name: "Priya Sharma",
        role: "HR Director",
        content: "Exceptional team that truly understands and delivers on client expectations.",
        color: "from-yellow-500 to-orange-500"
      },
      {
        id: 15,
        name: "Ahmed Hassan",
        role: "Business Analyst",
        content: "Strategic thinking combined with technical excellence. A perfect partnership indeed.",
        color: "from-pink-500 to-rose-500"
      }
    ]
  ];

  // Duplicate testimonials for seamless animation
  const getDuplicatedTestimonials = (testimonials) => {
    return [...testimonials, ...testimonials];
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white font-sans py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-gray-900 mb-4 relative inline-block">
          OUR CUSTOMERS SAY 
          <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
        </h2>
        
        {/* Love icon with EALP */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="text-3xl text-red-500 animate-pulse">❤️</div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              EALP
            </span>
          </div>
          <div className="text-3xl text-red-500 animate-pulse delay-300">❤️</div>
        </div>
        
        {/* Optional subtitle */}
        <p className="text-gray-600 mt-4 text-lg">
          Excellence Allegiance Love from People
        </p>
      </div>

      {/* Testimonials Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 h-[600px] md:h-[500px] relative">
          
          {/* Column 1 */}
          <div className="flex-1 h-full overflow-hidden relative group">
            {/* Mask Gradient Overlay */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
              }}
            />
            
            {/* Scrolling Content */}
            <div 
              className={`testimonial-scroll absolute w-full ${
                isClient ? 'animate-scrollUp1' : ''
              }`}
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              {getDuplicatedTestimonials(testimonialsData[0]).map((testimonial, index) => (
                <div key={`col1-${testimonial.id}-${index}`} className="mb-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="text-gray-700 leading-relaxed">
                      {testimonial.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex-1 h-full overflow-hidden relative group hidden md:block">
            {/* Mask Gradient Overlay */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
              }}
            />
            
            {/* Scrolling Content */}
            <div 
              className={`testimonial-scroll absolute w-full ${
                isClient ? 'animate-scrollDown' : ''
              }`}
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              {getDuplicatedTestimonials(testimonialsData[1]).map((testimonial, index) => (
                <div key={`col2-${testimonial.id}-${index}`} className="mb-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="text-gray-700 leading-relaxed">
                      {testimonial.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex-1 h-full overflow-hidden relative group hidden lg:block">
            {/* Mask Gradient Overlay */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
              }}
            />
            
            {/* Scrolling Content */}
            <div 
              className={`testimonial-scroll absolute w-full ${
                isClient ? 'animate-scrollUp2' : ''
              }`}
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              {getDuplicatedTestimonials(testimonialsData[2]).map((testimonial, index) => (
                <div key={`col3-${testimonial.id}-${index}`} className="mb-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="text-gray-700 leading-relaxed">
                      {testimonial.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scrollUp1 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        @keyframes scrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0%);
          }
        }
        
        @keyframes scrollUp2 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        .animate-scrollUp1 {
          animation: scrollUp1 25s linear infinite;
        }
        
        .animate-scrollDown {
          animation: scrollDown 35s linear infinite;
        }
        
        .animate-scrollUp2 {
          animation: scrollUp2 30s linear infinite;
        }
        
        .testimonial-scroll:hover {
          animation-play-state: paused !important;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .testimonial-scroll {
            animation-duration: 20s !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;