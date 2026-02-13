import React, { useState, useEffect } from "react";

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Skeleton Components
  const HeroSectionSkeleton = () => (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gray-800"></div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-3/4 h-12 bg-gray-700 rounded-lg mx-auto mb-6 animate-pulse"></div>
          <div className="w-1/2 h-8 bg-gray-700 rounded-lg mx-auto mb-8 animate-pulse"></div>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="w-48 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-48 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-48 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );

  const FormInputSkeleton = () => (
    <div>
      <div className="w-24 h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
      <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );

  const TextareaSkeleton = () => (
    <div>
      <div className="w-20 h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
      <div className="w-full h-36 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );

  const ButtonSkeleton = () => (
    <div className="w-full h-14 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg animate-pulse"></div>
  );

  const ContactCardSkeleton = () => (
    <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg">
      <div className="w-12 h-12 bg-gray-200 rounded-xl mr-4 animate-pulse"></div>
      <div className="flex-1">
        <div className="w-32 h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
        <div className="w-48 h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
        <div className="w-64 h-3 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );

  const MapSkeleton = () => (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-20 h-6 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );

  const EmergencyCardSkeleton = () => (
    <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl p-6">
      <div className="w-48 h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
      <div className="w-40 h-4 bg-gray-300 rounded mb-4 animate-pulse"></div>
      <div className="w-48 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
    </div>
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: "✉️",
      title: "Email Us",
      details: "contact@myeapi.com",
      link: "mailto:contact@myeapi.com",
      description: "Send us an email anytime",
    },
    {
      icon: "📞",
      title: "Call Us",
      details: "+91 6289534780",
      link: "tel:+91 6289534780",
      description: "Mon-sat, 11:00AM-7:30PM",
    },
    {
      icon: "📍",
      title: "Our Address",
      details: "1/16, Netai Nagar, Singhabari Road",
      subdetails: "Mukundapur, Kolkata-700099, West Bengal, India",
      link: "#",
    },
    {
      icon: "🕒",
      title: "Business Hours",
      details: "Monday - Friday:- 11:00 AM",
      subdetails: "Saturday:- 7:30 PM",
      link: "#",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <HeroSectionSkeleton />
        
        <section className="pt-24 pb-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Contact Form Skeleton */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-48 h-8 bg-gray-300 rounded mb-2 animate-pulse"></div>
                <div className="w-64 h-4 bg-gray-300 rounded mb-6 animate-pulse"></div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInputSkeleton />
                    <FormInputSkeleton />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInputSkeleton />
                    <FormInputSkeleton />
                  </div>
                  
                  <TextareaSkeleton />
                  <ButtonSkeleton />
                </div>
              </div>

              {/* Right Column - Contact Info Skeleton */}
              <div className="space-y-8">
                <div>
                  <div className="w-64 h-8 bg-gray-300 rounded mb-6 animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>

                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <ContactCardSkeleton key={i} />
                  ))}
                </div>

                <MapSkeleton />
                <EmergencyCardSkeleton />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/80 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            alt="Contact Us Hero"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto mb-8 drop-shadow-lg">
              Ready to start your project? Let's discuss how we can help
              transform your business.
            </p>
            <div className="inline-flex flex-wrap gap-4 justify-center">
           
             
             
            </div>
          </div>
        </div>
      </section>

      <section className="pt-24 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="+91 1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Tell us about your project requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Column - Contact Info and Map */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  Get in touch with us through any of the following channels.
                  We're always happy to help!
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-start p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-blue-100"
                  >
                    <div className="text-3xl mr-4 bg-blue-50 p-3 rounded-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-800 font-medium">
                        {item.details}
                      </p>
                      {item.subdetails && (
                        <p className="text-gray-600 text-sm mt-1">
                          {item.subdetails}
                        </p>
                      )}
                      {item.description && (
                        <p className="text-gray-500 text-sm mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>

              {/* Map Section - Updated with Google Maps iframe */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Our Location
                  </h3>
                  <a
                    href="https://maps.app.goo.gl/LNYEjyuNkf27f3rQA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    <span>Directions</span>
                    <span>↗</span>
                  </a>
                </div>
                <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
                  {/* Google Maps iframe - No API Key Needed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.205676209377!2d88.4010063!3d22.4960165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02715f79d94ef5%3A0xcafbe77440297087!2s1%2F16%2C%20Netai%20Nagar%2C%20Singhabari%20Road%2C%20Mukundapur%2C%20Kolkata%2C%20West%20Bengal%20700099!5e0!3m2!1sen!2sin!4v1641892345678"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Excellence Allegiance Office Location"
                  ></iframe>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">Full Address:</span> 1/16,
                    Netai Nagar, Singhabari Road, Mukundapur, Kolkata-700099,
                    West Bengal, India
                  </p>
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;