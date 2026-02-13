// Form validation functions
export const validators = {
  // Required field
  required(value, fieldName = 'This field') {
    if (!value || value.toString().trim() === '') {
      return `${fieldName} is required`;
    }
    return '';
  },

  // Email validation
  email(value) {
    if (!value) return '';
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  },

  // Phone validation
  phone(value) {
    if (!value) return '';
    const pattern = /^\+?[1-9]\d{1,14}$/;
    if (!pattern.test(value)) {
      return 'Please enter a valid phone number';
    }
    return '';
  },

  // Password validation
  password(value) {
    if (!value) return '';
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!pattern.test(value)) {
      return 'Password must be at least 8 characters with uppercase, lowercase, number and special character';
    }
    return '';
  },

  // Confirm password
  confirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  },

  // Minimum length
  minLength(value, min) {
    if (value && value.length < min) {
      return `Minimum ${min} characters required`;
    }
    return '';
  },

  // Maximum length
  maxLength(value, max) {
    if (value && value.length > max) {
      return `Maximum ${max} characters allowed`;
    }
    return '';
  },

  // Number range
  numberRange(value, min, max) {
    const num = Number(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (num < min || num > max) {
      return `Value must be between ${min} and ${max}`;
    }
    return '';
  },

  // URL validation
  url(value) {
    if (!value) return '';
    try {
      new URL(value);
      return '';
    } catch {
      return 'Please enter a valid URL';
    }
  },

  // Date validation
  date(value) {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'Please enter a valid date';
    }
    return '';
  },

  // File validation
  file(file, options = {}) {
    if (!file) return '';
    
    const { maxSize = 5 * 1024 * 1024, allowedTypes = [] } = options;
    
    if (file.size > maxSize) {
      return `File size must be less than ${maxSize / (1024 * 1024)}MB`;
    }
    
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return `File type must be one of: ${allowedTypes.join(', ')}`;
    }
    
    return '';
  },

  // Validate form
  validateForm(formData, rules) {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const value = formData[field];
      const fieldRules = rules[field];
      
      for (const rule of fieldRules) {
        let error = '';
        
        if (typeof rule === 'string') {
          error = this[rule](value, field);
        } else if (typeof rule === 'function') {
          error = rule(value, formData);
        } else if (typeof rule === 'object') {
          error = this[rule.type](value, ...rule.params);
        }
        
        if (error) {
          errors[field] = error;
          break;
        }
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};