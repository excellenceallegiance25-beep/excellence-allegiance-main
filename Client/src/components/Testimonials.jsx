import React, { useEffect, useState } from "react";

const Testimonials = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const testimonialsData = [
    [
      {
        id: 1,
        name: "Emma Wilson",
        role: "Product Manager",
        content:
          "work above and beyond our expectations. Would highly recommend to anyone working for top-notch quality.",
        color: "from-blue-600 to-cyan-500",
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Software Engineer",
        content:
          "The innovative solutions provided helped us reach our goals faster than expected. The attention to detail and technical expertise was impressive.",
        color: "from-green-600 to-emerald-500",
      },
      {
        id: 3,
        name: "James Rodriguez",
        role: "Creative Director",
        content:
          "Game-changing results for our business. Outstanding creativity and professionalism. They truly understand how to deliver exceptional results.",
        color: "from-purple-600 to-pink-500",
      },
      {
        id: 4,
        name: "Ema Wilson",
        role: "Product Manager",
        content:
          "The innovative solutions provided helped us reach our goals faster than expected while maintaining clear communication.",
        color: "from-orange-600 to-amber-500",
      },
      {
        id: 5,
        name: "David Park",
        role: "CEO",
        content:
          "significantly impacted our business growth. Their strategic approach is game-changing for our industry.",
        color: "from-red-600 to-rose-500",
      },
    ],

    [
      {
        id: 6,
        name: "Sarah Johnson",
        role: "Marketing Director",
        content:
          "Their strategic marketing solutions boosted our online presence by 300% in just 3 months.",
        color: "from-indigo-600 to-blue-500",
      },
      {
        id: 7,
        name: "Alex Thompson",
        role: "CTO",
        content:
          "Technical excellence combined with business acumen. They delivered exactly what we needed.",
        color: "from-teal-600 to-green-500",
      },
      {
        id: 8,
        name: "Lisa Wang",
        role: "Operations Manager",
        content:
          "Streamlined our entire workflow. The efficiency gains have been absolutely remarkable.",
        color: "from-violet-600 to-purple-500",
      },
      {
        id: 9,
        name: "Robert Kim",
        role: "Product Lead",
        content:
          "Quality-focused approach with timely delivery. Exceeded all our expectations.",
        color: "from-amber-600 to-orange-500",
      },
      {
        id: 10,
        name: "Maria Garcia",
        role: "UX Designer",
        content:
          "Creative solutions that perfectly aligned with our user experience goals.",
        color: "from-rose-600 to-pink-500",
      },
    ],

    [
      {
        id: 11,
        name: "Tom Wilson",
        role: "Project Manager",
        content:
          "Seamless collaboration and excellent communication throughout the entire project lifecycle.",
        color: "from-sky-600 to-blue-500",
      },
      {
        id: 12,
        name: "Sophie Chen",
        role: "Data Analyst",
        content:
          "Data-driven insights that transformed our decision-making process completely.",
        color: "from-emerald-600 to-green-500",
      },
      {
        id: 13,
        name: "Kevin Lee",
        role: "DevOps Engineer",
        content:
          "Infrastructure improvements that increased our system reliability dramatically.",
        color: "from-fuchsia-600 to-purple-500",
      },
      {
        id: 14,
        name: "Priya Sharma",
        role: "HR Director",
        content:
          "Exceptional team that truly understands and delivers on client expectations.",
        color: "from-yellow-600 to-orange-500",
      },
      {
        id: 15,
        name: "Ahmed Hassan",
        role: "Business Analyst",
        content:
          "Strategic thinking combined with technical excellence. A perfect partnership indeed.",
        color: "from-pink-600 to-rose-500",
      },
    ],
  ];
  const getDuplicatedTestimonials = (testimonials) => {
    return [...testimonials, ...testimonials];
  };
  const companies = [
    {
      logo: "/logos/microsoft.png",
      name: "Microsoft",
      category: "Technology",
      type: "MNC",
    },
    {
      logo: "/logos/google.png",
      name: "Google",
      category: "Tech Giant",
      type: "MNC",
    },
    {
      logo: "/logos/apple.png",
      name: "Apple",
      category: "Consumer Tech",
      type: "MNC",
    },
    {
      logo: "/logos/amazon.png",
      name: "Amazon",
      category: "E-commerce & Cloud",
      type: "MNC",
    },
    {
      logo: "/logos/ibm.png",
      name: "IBM",
      category: "Enterprise Solutions",
      type: "MNC",
    },
    {
      logo: "/logos/tesla.png",
      name: "Tesla",
      category: "Automotive",
      type: "Tech Leader",
    },
    {
      logo: "/logos/samsung.png",
      name: "Samsung",
      category: "Electronics",
      type: "MNC",
    },
    {
      logo: "/logos/meta.png",
      name: "Meta",
      category: "Social Media",
      type: "Tech Giant",
    },
    {
      logo: "/logos/netflix.png",
      name: "Netflix",
      category: "Entertainment",
      type: "Tech Giant",
    },
    {
      logo: "/logos/spotify.png",
      name: "Spotify",
      category: "Streaming",
      type: "Tech Unicorn",
    },
    {
      logo: "/logos/airbnb.png",
      name: "Airbnb",
      category: "Travel Tech",
      type: "Unicorn",
    },
    {
      logo: "/logos/uber.png",
      name: "Uber",
      category: "Ride Sharing",
      type: "Tech Unicorn",
    },
  ];
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 font-sans py-16 relative overflow-hidden">
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

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        {Array.from({ length: 15 }).map((_, i) => {
          const duration = 3 + Math.random() * 2;
          const delay = i * 0.5;
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${duration}s ease-in-out ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        <h5 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Client Success Stories
          </span>
        </h5>

        <div className="flex flex-wrap justify-center gap-8 mt-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 h-[600px] md:h-[500px] relative">
          <div className="flex-1 h-full overflow-hidden relative group">
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            />
            <div
              className={`testimonial-scroll absolute w-full ${
                isClient ? "animate-scrollUp1" : ""
              }`}
              onMouseEnter={(e) =>
                (e.currentTarget.style.animationPlayState = "paused")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.animationPlayState = "running")
              }
            >
              {getDuplicatedTestimonials(testimonialsData[0]).map(
                (testimonial, index) => (
                  <div key={`col1-${testimonial.id}-${index}`} className="mb-6">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`relative w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}
                        >
                          {testimonial.name.charAt(0)}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div>
                          <div className="font-bold text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-300 leading-relaxed">
                        {testimonial.content}
                      </div>
                      <div className="flex items-center gap-1 mt-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-500 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex-1 h-full overflow-hidden relative group hidden md:block">
            {/* Mask Gradient Overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            />

            {/* Scrolling Content */}
            <div
              className={`testimonial-scroll absolute w-full ${
                isClient ? "animate-scrollDown" : ""
              }`}
              onMouseEnter={(e) =>
                (e.currentTarget.style.animationPlayState = "paused")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.animationPlayState = "running")
              }
            >
              {getDuplicatedTestimonials(testimonialsData[1]).map(
                (testimonial, index) => (
                  <div key={`col2-${testimonial.id}-${index}`} className="mb-6">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/10">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`relative w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}
                        >
                          {testimonial.name.charAt(0)}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div>
                          <div className="font-bold text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-300 leading-relaxed">
                        {testimonial.content}
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mt-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-500 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex-1 h-full overflow-hidden relative group hidden lg:block">
            {/* Mask Gradient Overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            />

            {/* Scrolling Content */}
            <div
              className={`testimonial-scroll absolute w-full ${
                isClient ? "animate-scrollUp2" : ""
              }`}
              onMouseEnter={(e) =>
                (e.currentTarget.style.animationPlayState = "paused")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.animationPlayState = "running")
              }
            >
              {getDuplicatedTestimonials(testimonialsData[2]).map(
                (testimonial, index) => (
                  <div key={`col3-${testimonial.id}-${index}`} className="mb-6">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-500/10">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`relative w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}
                        >
                          {testimonial.name.charAt(0)}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div>
                          <div className="font-bold text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-300 leading-relaxed">
                        {testimonial.content}
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mt-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-500 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Trusted By Section with Infinite Slider */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-gray-900/20 backdrop-blur-sm rounded-full mb-6 border border-gray-700/50">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-cyan-300 tracking-wider">
                TRUSTED BY INDUSTRY LEADERS
              </span>
            </div>
          </div>

          {/* Infinite Slider Container */}
          <div className="relative overflow-hidden py-10">
            {/* Fade gradients on sides */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

            {/* First sliding track */}
            <div className="flex animate-infinite-scroll">
              {/* Company logos - duplicate for seamless loop */}
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={`company-${index}`}
                  className="group mx-8 flex flex-col items-center"
                >
                  <div className="text-5xl mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    {company.icon}
                  </div>
                  <div className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">
                    {company.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 group-hover:text-gray-400">
                    {company.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }
        
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
        
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
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
        
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
          display: flex;
          width: max-content;
        }
        
        .testimonial-scroll:hover,
        .animate-infinite-scroll:hover {
          animation-play-state: paused !important;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .testimonial-scroll {
            animation-duration: 20s !important;
          }
          .animate-infinite-scroll {
            animation-duration: 30s !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
