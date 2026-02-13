import { useState, useCallback } from "react";
import employeeService from "../services/employeeService";

export const useEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await employeeService.getDashboardData();

      if (response.success) {
        setData(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Get dashboard data error:", error);
      setError("Failed to load dashboard data");
      return { success: false, message: "Failed to load dashboard data" };
    } finally {
      setLoading(false);
    }
  }, []);

  const markAttendance = useCallback(async (type, location, remarks) => {
    try {
      setLoading(true);
      setError(null);

      const response = await employeeService.markAttendance(
        type,
        location,
        remarks
      );

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Mark attendance error:", error);
      setError("Failed to mark attendance");
      return { success: false, message: "Failed to mark attendance" };
    } finally {
      setLoading(false);
    }
  }, []);

  const getAttendanceHistory = useCallback(
    async (month, year, startDate, endDate) => {
      try {
        setLoading(true);
        setError(null);

        const response = await employeeService.getAttendanceHistory(
          month,
          year,
          startDate,
          endDate
        );

        if (response.success) {
          return { success: true, data: response.data };
        } else {
          setError(response.message);
          return { success: false, message: response.message };
        }
      } catch (error) {
        console.error("Get attendance history error:", error);
        setError("Failed to load attendance history");
        return { success: false, message: "Failed to load attendance history" };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getTasks = useCallback(async (status, priority, sortBy, sortOrder) => {
    try {
      setLoading(true);
      setError(null);

      const response = await employeeService.getTasks(
        status,
        priority,
        sortBy,
        sortOrder
      );

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Get tasks error:", error);
      setError("Failed to load tasks");
      return { success: false, message: "Failed to load tasks" };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTaskStatus = useCallback(
    async (taskId, status, comment, actualHours) => {
      try {
        setLoading(true);
        setError(null);

        const response = await employeeService.updateTaskStatus(
          taskId,
          status,
          comment,
          actualHours
        );

        if (response.success) {
          return { success: true, data: response.data };
        } else {
          setError(response.message);
          return { success: false, message: response.message };
        }
      } catch (error) {
        console.error("Update task status error:", error);
        setError("Failed to update task status");
        return { success: false, message: "Failed to update task status" };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getPerformance = useCallback(async (period, year) => {
    try {
      setLoading(true);
      setError(null);

      const response = await employeeService.getPerformance(period, year);

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Get performance error:", error);
      setError("Failed to load performance data");
      return { success: false, message: "Failed to load performance data" };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await employeeService.updateProfile(profileData);

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Update profile error:", error);
      setError("Failed to update profile");
      return { success: false, message: "Failed to update profile" };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    data,
    getDashboardData,
    markAttendance,
    getAttendanceHistory,
    getTasks,
    updateTaskStatus,
    getPerformance,
    updateProfile,
  };
};
