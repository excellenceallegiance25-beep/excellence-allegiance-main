// server/utils/constants.js
module.exports = {
  // User Roles
  USER_ROLES: {
    ADMIN: 'admin',
    MANAGER: 'manager',
    EMPLOYEE: 'employee',
    CLIENT: 'client'
  },

  // Request Status
  REQUEST_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed'
  },

  // Request Types
  REQUEST_TYPES: {
    LEAVE: 'leave',
    RESOURCE: 'resource',
    SUPPORT: 'support',
    OTHER: 'other'
  },

  // Priority Levels
  PRIORITY_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent'
  },

  // OTP Settings
  OTP: {
    LENGTH: 6,
    EXPIRY_MINUTES: 10,
    RESEND_COOLDOWN: 60 // seconds
  },

  // JWT Settings
  JWT: {
    EXPIRY: '7d',
    REFRESH_EXPIRY: '30d'
  },

  // Email Templates
  EMAIL_TEMPLATES: {
    VERIFICATION: 'verification',
    WELCOME: 'welcome',
    PASSWORD_RESET: 'password_reset',
    REQUEST_UPDATE: 'request_update'
  },

  // Departments
  DEPARTMENTS: [
    'IT',
    'HR',
    'Finance',
    'Marketing',
    'Sales',
    'Operations',
    'Support',
    'Engineering'
  ],

  // Designations
  DESIGNATIONS: [
    'Software Engineer',
    'Senior Software Engineer',
    'Team Lead',
    'Project Manager',
    'HR Manager',
    'Finance Analyst',
    'Marketing Executive',
    'Sales Executive',
    'Support Executive',
    'Operations Manager'
  ]
};