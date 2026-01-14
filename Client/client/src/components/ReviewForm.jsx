import React, { useState } from 'react';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    rating: 5,
    review: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

  
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    
      const existingReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      const newReview = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString(),
        status: 'pending'
      };
      
      existingReviews.push(newReview);
      localStorage.setItem('reviews', JSON.stringify(existingReviews));
      
      setIsSubmitted(true);
      setFormData({ name: '', company: '', rating: 5, review: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-600 mb-4">
          Your review has been submitted successfully. It will appear after approval.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Share Your Experience
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Your company name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({...formData, rating: star})}
                className="text-2xl focus:outline-none"
              >
                {star <= formData.rating ? '⭐' : '☆'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            name="review"
            required
            rows="4"
            value={formData.review}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience with us..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;