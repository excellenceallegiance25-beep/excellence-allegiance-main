// client/src/services/requestService.js

// API URL
const API_BASE_URL = 'http://localhost:5000/api';

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

// Create requestService object
const requestService = {
  // Create request
  async createRequest(requestData) {
    return apiRequest('/requests/create', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },

  // Get my requests
  async getMyRequests() {
    return apiRequest('/requests/my-requests');
  },

  // Get all requests (for managers/admins)
  async getAllRequests() {
    return apiRequest('/requests');
  },

  // Get request by ID
  async getRequestById(id) {
    return apiRequest(`/requests/${id}`);
  },

  // Update request
  async updateRequest(id, requestData) {
    return apiRequest(`/requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
  },

  // Delete request
  async deleteRequest(id) {
    return apiRequest(`/requests/${id}`, {
      method: 'DELETE',
    });
  },

  // Update request status (for managers)
  async updateStatus(id, status, response) {
    return apiRequest(`/requests/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, managerResponse: response }),
    });
  }
};

// Export the service
export default requestService;