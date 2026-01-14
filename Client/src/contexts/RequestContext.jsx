import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import requestService from "../services/requestService";

const RequestContext = createContext(null);

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const normalizeList = (res) => {
    // Accept multiple possible response shapes
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (res.requests) return res.requests;
    if (res.data && Array.isArray(res.data)) return res.data;
    return [];
  };

  const fetchMyRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await requestService.getMyRequests();
      setRequests(normalizeList(res));
    } catch (err) {
      setError(err.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await requestService.getAllRequests();
      setRequests(normalizeList(res));
    } catch (err) {
      setError(err.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  }, []);

  const createRequest = async (payload) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await requestService.createRequest(payload);
      const created = res.request || res.data || res;
      setRequests((prev) => [created, ...prev]);
      setSuccess(res.message || "Request created");
      return res;
    } catch (err) {
      setError(err.message || "Failed to create request");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRequest = async (id, payload) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await requestService.updateRequest(id, payload);
      const updated = res.request || res.data || res;
      setRequests((prev) =>
        prev.map((r) =>
          r._id === id || r.id === id ? { ...r, ...updated } : r
        )
      );
      setSuccess(res.message || "Request updated");
      return res;
    } catch (err) {
      setError(err.message || "Failed to update request");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await requestService.deleteRequest(id);
      setRequests((prev) => prev.filter((r) => r._id !== id && r.id !== id));
      setSuccess(res.message || "Request deleted");
      return res;
    } catch (err) {
      setError(err.message || "Failed to delete request");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status, managerResponse) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await requestService.updateStatus(
        id,
        status,
        managerResponse
      );
      const updated = res.request || res.data || res;
      setRequests((prev) =>
        prev.map((r) =>
          r._id === id || r.id === id ? { ...r, ...updated } : r
        )
      );
      setSuccess(res.message || "Status updated");
      return res;
    } catch (err) {
      setError(err.message || "Failed to update status");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load user's requests on mount by default
    fetchMyRequests();
  }, [fetchMyRequests]);

  return (
    <RequestContext.Provider
      value={{
        requests,
        loading,
        error,
        success,
        fetchMyRequests,
        fetchAllRequests,
        createRequest,
        updateRequest,
        deleteRequest,
        updateStatus,
        setError,
        setSuccess,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequests = () => {
  const ctx = useContext(RequestContext);
  if (!ctx)
    throw new Error("useRequests must be used within a RequestProvider");
  return ctx;
};

export default RequestContext;
