import api from './api';

export const projectService = {
  // Get all projects
  getAll: async () => {
    return api.get('/projects');
  },
  
  // Get single project
  getById: async (id) => {
    return api.get(`/projects/${id}`);
  },
  
  // Create project
  create: async (projectData) => {
    return api.post('/projects', projectData);
  },
  
  // Update project
  update: async (id, projectData) => {
    return api.put(`/projects/${id}`, projectData);
  },
  
  // Delete project
  delete: async (id) => {
    return api.delete(`/projects/${id}`);
  },
  
  // Get user's projects
  getUserProjects: async () => {
    return api.get('/projects/my-projects');
  }
};