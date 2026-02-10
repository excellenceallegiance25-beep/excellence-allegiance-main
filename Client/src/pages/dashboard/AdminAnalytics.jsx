// src/pages/dashboard/AdminAnalytics.jsx (Simple Version)
import React from 'react';
import { Link } from 'react-router-dom';

const AdminAnalytics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Analytics</span>
            </div>
            <Link
              to="/admin/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
          <p className="text-gray-600">Analytics features are under development.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900">Coming Soon</h3>
              <p className="text-blue-700 mt-2">User growth charts</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900">Coming Soon</h3>
              <p className="text-green-700 mt-2">Engagement metrics</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-900">Coming Soon</h3>
              <p className="text-purple-700 mt-2">Performance reports</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;