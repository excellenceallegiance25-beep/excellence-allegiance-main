import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const paymentService = {
  // পেমেন্ট শুরু
  createPayment: async (paymentData) => {
    try {
      const response = await axios.post(`${API_URL}/payments/create`, paymentData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // স্ট্রাইপ পেমেন্ট
  createStripePayment: async (amount, currency = 'usd') => {
    try {
      const response = await axios.post(`${API_URL}/payments/stripe/create`, {
        amount,
        currency
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // বিকাশ পেমেন্ট
  createBkashPayment: async (paymentData) => {
    try {
      const response = await axios.post(`${API_URL}/payments/bkash/create`, paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // পেমেন্ট ভেরিফাই
  verifyPayment: async (paymentId) => {
    try {
      const response = await axios.get(`${API_URL}/payments/verify/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // পেমেন্ট হিস্ট্রি
  getPaymentHistory: async () => {
    try {
      const response = await axios.get(`${API_URL}/payments/history`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ইনভয়েস জেনারেট
  generateInvoice: async (paymentId) => {
    try {
      const response = await axios.get(`${API_URL}/payments/invoice/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default paymentService;