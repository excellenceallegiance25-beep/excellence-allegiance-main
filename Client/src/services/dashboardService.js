import api from "./api";

const dashboardService = {
  // Admin dashboard
  async getAdminDashboardData() {
    try {
      const response = await api.get("/admin/dashboard");
      return response.data;
    } catch (error) {
      console.error("Get admin dashboard error:", error);
      throw error;
    }
  },

  // Manager dashboard
  async getManagerDashboardData() {
    try {
      const response = await api.get("/manager/dashboard");
      return response.data;
    } catch (error) {
      console.error("Get manager dashboard error:", error);
      throw error;
    }
  },

  // Analytics data
  async getAnalyticsData(timeRange = "monthly", filters = {}) {
    try {
      const params = { timeRange, ...filters };
      const response = await api.get("/admin/analytics", { params });
      return response.data;
    } catch (error) {
      console.error("Get analytics error:", error);
      throw error;
    }
  },

  // User statistics
  async getUserStats() {
    try {
      const response = await api.get("/admin/users/stats");
      return response.data;
    } catch (error) {
      console.error("Get user stats error:", error);
      throw error;
    }
  },

  // System metrics
  async getSystemMetrics() {
    try {
      const response = await api.get("/admin/system/metrics");
      return response.data;
    } catch (error) {
      console.error("Get system metrics error:", error);
      throw error;
    }
  },

  // Recent activities
  async getRecentActivities(limit = 10) {
    try {
      const response = await api.get("/admin/activities", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Get recent activities error:", error);
      throw error;
    }
  },

  // Export dashboard data
  async exportDashboardData(format = "csv", filters = {}) {
    try {
      const response = await api.get("/admin/export", {
        params: { format, ...filters },
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      console.error("Export dashboard error:", error);
      throw error;
    }
  },
};

export default dashboardService;
