import axios from 'axios';

const API_URL = 'http://192.168.68.106:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || { message: 'Network Error' });
  }
);

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  verifyOTP: (email, otp) => api.post('/auth/verify-otp', { email, otp }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
  logout: () => api.post('/auth/logout'),
  verifyToken: () => api.get('/auth/verify-token'),
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  completeProfile: (profileData) => api.post('/users/complete-profile', profileData),
  changePassword: (currentPassword, newPassword) => api.post('/users/change-password', { currentPassword, newPassword }),
  uploadAvatar: (formData) => api.post('/users/upload-avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const dashboardAPI = {
  getStats: (role) => api.get(`/${role}/dashboard/stats`),
  getRecentActivity: (role) => api.get(`/${role}/dashboard/activity`),
  getNotifications: () => api.get('/notifications'),
  markNotificationRead: (id) => api.put(`/notifications/${id}/read`),
};

export const adminAPI = {
  getUsers: (params) => api.get('/admin/users', { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  createUser: (userData) => api.post('/admin/users', userData),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getSystemStats: () => api.get('/admin/system-stats'),
  getAuditLogs: (params) => api.get('/admin/audit-logs', { params }),
  backupDatabase: () => api.post('/admin/database/backup'),
  restoreDatabase: (backupId) => api.post('/admin/database/restore', { backupId }),
};

export const managerAPI = {
  getTeam: () => api.get('/manager/team'),
  getProjects: () => api.get('/manager/projects'),
  getPendingApprovals: () => api.get('/manager/approvals/pending'),
  approveRequest: (id, data) => api.put(`/manager/approvals/${id}/approve`, data),
  rejectRequest: (id, reason) => api.put(`/manager/approvals/${id}/reject`, { reason }),
  getPerformanceReports: () => api.get('/manager/performance/reports'),
  generateReport: (params) => api.post('/manager/reports/generate', params),
};

export const employeeAPI = {
  getTasks: () => api.get('/employee/tasks'),
  updateTaskStatus: (id, status) => api.put(`/employee/tasks/${id}/status`, { status }),
  getProjects: () => api.get('/employee/projects'),
  getAttendance: (month, year) => api.get('/employee/attendance', { params: { month, year } }),
  markAttendance: (data) => api.post('/employee/attendance/mark', data),
  getPayroll: () => api.get('/employee/payroll'),
  getPaySlip: (month, year) => api.get('/employee/payroll/slip', { params: { month, year } }),
  requestLeave: (data) => api.post('/employee/leave/request', data),
  getLeaveBalance: () => api.get('/employee/leave/balance'),
};

export default api;