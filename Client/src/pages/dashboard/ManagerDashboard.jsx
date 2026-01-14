// src/pages/dashboard/ManagerDashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log('📊 ManagerDashboard loaded');
    console.log('👨‍💼 Current manager:', user);
  }, [user]);

  return (
    <DashboardLayout role="manager">
      <div className="w-full h-full">
        {/* Welcome Section with Manager ID */}
        <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Manager Dashboard</h1>
              <p className="text-emerald-100">Welcome back, {user?.name || 'Manager'}!</p>
            </div>
            
            {/* 🔥 MANAGER ID BADGE */}
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
              <p className="text-sm text-emerald-200">Manager ID</p>
              <p className="font-bold font-mono text-xl">
                {user?.userId || 'MGR-001'}
              </p>
              <p className="text-xs text-emerald-300 mt-1">
                Team Lead • {user?.department || 'Management'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
            <p className="text-gray-600">Team overview and management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-700">Team Members</h3>
              <p className="text-3xl font-bold text-blue-600">24</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-700">Active Projects</h3>
              <p className="text-3xl font-bold text-green-600">12</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-700">Pending Approvals</h3>
              <p className="text-3xl font-bold text-yellow-600">4</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-700">Budget Used</h3>
              <p className="text-3xl font-bold text-purple-600">78%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">Team Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Active Team Members</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Projects in Progress</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pending Approvals</span>
                    <span className="font-bold text-red-600">4</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>John completed task #123</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Sarah started new project</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span>Mike requested approval</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;