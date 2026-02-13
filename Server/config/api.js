const API_CONFIG = {
  // Development
  development: {
    BASE_URL: "http://localhost:5000",
  },
  // Production
  production: {
    BASE_URL: "http://localhost:5000", // Production URL দিবে পরে
  },
};

const environment = process.env.NODE_ENV || "development";
const currentConfig = API_CONFIG[environment];

export const API_BASE = `${currentConfig.BASE_URL}/api`;
export const AUTH_API = `${API_BASE}/auth`;
export const DAILY_UPDATES_API = `${API_BASE}/daily-updates`;
export const EMPLOYEES_API = `${API_BASE}/employees`;

export default {
  API_BASE,
  AUTH_API,
  DAILY_UPDATES_API,
  EMPLOYEES_API,
};
