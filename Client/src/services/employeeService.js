import api from "./api";

const employeeService = {
  // Dashboard
  async getDashboardData() {
    try {
      const response = await api.get("/employee/dashboard");
      return response.data;
    } catch (error) {
      console.error("Get dashboard data error:", error);
      throw error;
    }
  },

  // Attendance
  async markAttendance(type, location = null, remarks = "") {
    try {
      const response = await api.post("/employee/attendance/mark", {
        type,
        location,
        remarks,
      });
      return response.data;
    } catch (error) {
      console.error("Mark attendance error:", error);
      throw error;
    }
  },

  async getAttendanceHistory(
    month = null,
    year = null,
    startDate = null,
    endDate = null
  ) {
    try {
      const params = {};
      if (month) params.month = month;
      if (year) params.year = year;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await api.get("/employee/attendance/history", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Get attendance history error:", error);
      throw error;
    }
  },

  // Tasks
  async getTasks(
    status = null,
    priority = null,
    sortBy = "dueDate",
    sortOrder = "asc"
  ) {
    try {
      const params = { sortBy, sortOrder };
      if (status) params.status = status;
      if (priority) params.priority = priority;

      const response = await api.get("/employee/tasks", { params });
      return response.data;
    } catch (error) {
      console.error("Get tasks error:", error);
      throw error;
    }
  },

  async updateTaskStatus(taskId, status, comment = null, actualHours = null) {
    try {
      const data = { status };
      if (comment) data.comment = comment;
      if (actualHours) data.actualHours = actualHours;

      const response = await api.put(`/employee/tasks/${taskId}/status`, data);
      return response.data;
    } catch (error) {
      console.error("Update task status error:", error);
      throw error;
    }
  },

  // Performance
  async getPerformance(period = null, year = null) {
    try {
      const params = {};
      if (period) params.period = period;
      if (year) params.year = year;

      const response = await api.get("/employee/performance", { params });
      return response.data;
    } catch (error) {
      console.error("Get performance error:", error);
      throw error;
    }
  },

  // Profile
  async updateProfile(profileData) {
    try {
      const response = await api.put("/employee/profile", profileData);
      return response.data;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  },

  // Documents (if needed)
  async uploadDocument(file, description = "") {
    try {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("description", description);

      const response = await api.post("/employee/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Upload document error:", error);
      throw error;
    }
  },

  async getDocuments() {
    try {
      const response = await api.get("/employee/documents");
      return response.data;
    } catch (error) {
      console.error("Get documents error:", error);
      throw error;
    }
  },

  // Leave requests (if needed)
  async requestLeave(leaveData) {
    try {
      const response = await api.post("/employee/leave", leaveData);
      return response.data;
    } catch (error) {
      console.error("Request leave error:", error);
      throw error;
    }
  },

  async getLeaveRequests(status = null) {
    try {
      const params = {};
      if (status) params.status = status;

      const response = await api.get("/employee/leave", { params });
      return response.data;
    } catch (error) {
      console.error("Get leave requests error:", error);
      throw error;
    }
  },
};

export default employeeService;
