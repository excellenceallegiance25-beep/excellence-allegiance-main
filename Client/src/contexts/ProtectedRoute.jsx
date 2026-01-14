import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles.length > 0) {
    const userRole = user?.role || '';
    if (!allowedRoles.includes(userRole)) {

      switch(userRole) {
        case 'admin':
          return <Navigate to="/admin-dashboard" replace />;
        case 'manager':
          return <Navigate to="/manager-dashboard" replace />;
        case 'employee':
          return <Navigate to="/employee-dashboard" replace />;
        default:
          return <Navigate to="/" replace />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;