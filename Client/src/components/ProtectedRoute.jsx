import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  

  if (allowedRoles && !allowedRoles.includes(user.role)) {
  
    switch(user.role) {
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

  return children;
};

export default ProtectedRoute;