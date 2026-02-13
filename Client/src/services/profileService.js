// client/src/services/profileService.js

// API URL
const API_BASE_URL = 'http://192.168.68.106:5000/api';

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Create profileService object
const profileService = {
  // Get profile
  async getProfile() {
    return apiRequest('/profile');
  },

  // Create/update profile
  async createProfile(profileData) {
    return apiRequest('/profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  },

  // Update profile
  async updateProfile(profileData) {
    return apiRequest('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Upload profile image
  async uploadProfileImage(formData) {
    const url = `${API_BASE_URL}/profile/upload`;
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      return data;
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  },

  // Change password
  async changePassword(passwordData) {
    return apiRequest('/profile/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }
};

// Export the service
export default profileService;