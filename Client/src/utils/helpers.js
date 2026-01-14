// Utility helper functions
export const helpers = {
  // Format date
  formatDate(date, format = 'dd-MM-yyyy') {
    const d = new Date(date);
    
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');

    switch (format) {
      case 'dd-MM-yyyy':
        return `${day}-${month}-${year}`;
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      case 'dd/MM/yyyy':
        return `${day}/${month}/${year}`;
      case 'dd-MM-yyyy HH:mm':
        return `${day}-${month}-${year} ${hours}:${minutes}`;
      case 'full':
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      default:
        return d.toLocaleDateString();
    }
  },

  // Format currency
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },

  // Truncate text
  truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },

  // Generate random ID
  generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Deep clone object
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  // Check if object is empty
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  },

  // Get query parameter
  getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  // Set query parameter
  setQueryParam(params) {
    const url = new URL(window.location);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    window.history.pushState({}, '', url);
  },

  // Validate email
  validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  },

  // Validate phone
  validatePhone(phone) {
    const pattern = /^\+?[1-9]\d{1,14}$/;
    return pattern.test(phone);
  },

  // Capitalize first letter
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
};