import api from './api';

export const contactService = {
  // Submit contact form
  submit: async (contactData) => {
    return api.post('/contact', contactData);
  },
  
  // Get all contacts (admin)
  getAll: async () => {
    return api.get('/admin/contacts');
  },
  
  // Get contact by ID (admin)
  getById: async (id) => {
    return api.get(`/admin/contacts/${id}`);
  },
  
  // Update contact status (admin)
  updateStatus: async (id, status) => {
    return api.patch(`/admin/contacts/${id}`, { status });
  }
};