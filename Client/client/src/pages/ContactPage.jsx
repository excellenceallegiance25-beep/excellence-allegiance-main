import React, { useState, useEffect } from 'react';
import Popup from '../components/Popup';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [popupState, setPopupState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: null,
    showCancel: false,
    confirmText: 'OK',
    cancelText: 'Cancel'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setPopupState({
      isOpen: true,
      title: 'Message Sent',
      message: 'Thank you for your message! We will get back to you soon.',
      type: 'success',
      showCancel: false,
      confirmText: 'Close',
      onConfirm: () => setPopupState(prev => ({ ...prev, isOpen: false }))
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
  };

  const closePopup = () => {
    setPopupState(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.app.goo.gl/LNYEjyuNkf27f3rQA`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        
        script.onload = initializeMap;
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      const mapOptions = {
        zoom: 15,
        center: { lat: 22.499320, lng: 88.363450 }, 
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{"weight": "2.00"}]
          },
          {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#9c9c9c"}]
          },
          {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [{"color": "#7c7c7c"}]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{"color": "#f2f2f2"}]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#ffffff"}]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"lightness": 45}]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#eeeeee"}]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#7b7b7b"}]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#ffffff"}]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]
          }
        ]
      };

      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
      
      const marker = new window.google.maps.Marker({
        position: { lat: 22.499320, lng: 88.363450 },
        map: map,
        title: 'Excellence Allegiance',
        animation: window.google.maps.Animation.DROP
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 8px 0; color: #2563eb;">Excellence Allegiance</h3>
            <p style="margin: 0; color: #4b5563;">1/16, Netai Nagar, Singhabari Road<br>Mukundapur, Kolkata-700099</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    };

    loadGoogleMaps();
  }, []);

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      details: "contact@myeapi.com",
      link: "contact@myeapi.com"
    },
    {
      icon: "📞",
      title: "Call Us",
      details: "+91 6289534780",
      link: "tel:+916289534780"
    },
    {
      icon: "📍",
      title: "Visit Us",
      details: "1/14, 1/16, Nitai Nagar, Mukundapur, Kolkata, West Bengal 700099",
      link: "https://maps.app.goo.gl/SmaYgQN9CFhRcps27"
    },
    {
      icon: "🕒",
      title: "Business Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto">
              Ready to start your project? Let's discuss how we can help transform your business.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your project requirements..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

           
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  Get in touch with us through any of the following channels. We're always happy to help!
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-start p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="text-3xl mr-4">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.details}</p>
                    </div>
                  </a>
                ))}
              </div>

              
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Location</h3>
                <div 
                  id="map" 
                  className="h-64 rounded-lg overflow-hidden border border-gray-200"
                  style={{ minHeight: '256px' }}
                >
                
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🗺️</div>
                      <p>Loading Map...</p>
                      <p className="text-sm">1/14, 1/16, Nitai Nagar, Mukundapur, Kolkata, West Bengal 700099</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <a 
                    href="https://maps.app.goo.gl/LNYEjyuNkf27f3rQA"
                    target="thumbnail.jpg_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Popup
        isOpen={popupState.isOpen}
        title={popupState.title}
        message={popupState.message}
        type={popupState.type}
        onClose={closePopup}
        onConfirm={popupState.onConfirm}
        showCancel={popupState.showCancel}
        confirmText={popupState.confirmText}
        cancelText={popupState.cancelText}
      />
    </div>
  );
};

export default ContactPage;