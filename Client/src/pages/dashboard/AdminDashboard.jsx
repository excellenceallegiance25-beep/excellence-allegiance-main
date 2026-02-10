// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, FaUserCheck, FaUserTimes, FaChartLine,
  FaMoneyBillWave, FaCalendarCheck, FaCog, FaSignOutAlt,
  FaBell, FaHome, FaUserCog
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingApprovals: 0,
    activeUsers: 0,
    revenue: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('authToken');
      const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (!token || !savedUser._id || savedUser.role !== 'admin') {
        navigate('/dashboard');
        return;
      }

      try {
        // Fetch user profile
        const userRes = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (userRes.data.success) {
          setUser(userRes.data.user);
          
          // Fetch admin stats
          const [statsRes, usersRes] = await Promise.all([
            axios.get(`${API_BASE_URL}/admin/stats`, {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`${API_BASE_URL}/admin/users?limit=5`, {
              headers: { Authorization: `Bearer ${token}` }
            })
          ]);

          if (statsRes.data.success) {
            setStats(statsRes.data.stats);
          }

          if (usersRes.data.success) {
            setRecentUsers(usersRes.data.users);
          }
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          navigate('/login');
          toast.error('Session expired. Please login again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('Logged out successfully!');
  };

  const handleApproveUser = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(`${API_BASE_URL}/admin/approve-user/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('User approved successfully!');
      // Refresh data
      window.location.reload();
    } catch (error) {
      toast.error('Error approving user');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src="/eapl.png"
                alt="EAPL Logo"
                className="h-8 w-auto mr-3"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">System Administration</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaHome className="mr-2" /> Employee View
              </button>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <FaBell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.firstName?.[0] || 'A'}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FaUserCog className="inline mr-2" /> Admin Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <FaSignOutAlt className="inline mr-2" /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome, Administrator {user.firstName}!
          </h2>
          <p className="text-gray-600">System Overview & Management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FaUsers size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <FaUserCheck size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Approvals</p>
                <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FaUserTimes size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <FaMoneyBillWave size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2">
            {/* Pending Approvals */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Pending Approvals</h3>
                <button 
                  onClick={() => navigate('/admin/approvals')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View all
                </button>
              </div>
              
              {stats.pendingApprovals > 0 ? (
                <div className="space-y-4">
                  {recentUsers
                    .filter(u => u.status === 'pending')
                    .map((user) => (
                      <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-gray-500">{user.email} • {user.department}</p>
                          <p className="text-xs text-yellow-600">Requested role: {user.role}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveUser(user._id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                          >
                            Approve
                          </button>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No pending approvals</p>
              )}
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">System Status</h3>
              <div className="space-y-4">
                {[
                  { service: 'Authentication API', status: 'online', uptime: '99.9%' },
                  { service: 'Database Server', status: 'online', uptime: '99.8%' },
                  { service: 'File Storage', status: 'online', uptime: '99.7%' },
                  { service: 'Email Service', status: 'online', uptime: '99.5%' }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        service.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-medium">{service.service}</p>
                        <p className="text-sm text-gray-500">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm ${
                      service.status === 'online' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Admin Tools */}
          <div className="space-y-6">
            {/* Admin Tools */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Admin Tools</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/admin/users')}
                  className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <FaUsers className="text-blue-600 mb-2 mx-auto" size={24} />
                  <p className="text-sm font-medium text-center">User Management</p>
                </button>
                <button className="p-4 border rounded-lg hover:border-green-500 hover:bg-green-50 transition">
                  <FaChartLine className="text-green-600 mb-2 mx-auto" size={24} />
                  <p className="text-sm font-medium text-center">Analytics</p>
                </button>
                <button className="p-4 border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition">
                  <FaCalendarCheck className="text-purple-600 mb-2 mx-auto" size={24} />
                  <p className="text-sm font-medium text-center">Reports</p>
                </button>
                <button 
                  onClick={() => navigate('/admin/settings')}
                  className="p-4 border rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition"
                >
                  <FaCog className="text-yellow-600 mb-2 mx-auto" size={24} />
                  <p className="text-sm font-medium text-center">Settings</p>
                </button>
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <span className="text-sm text-blue-600">View log</span>
              </div>
              <div className="space-y-3">
                {[
                  { action: 'New user registered', time: '2 mins ago', user: 'John Doe' },
                  { action: 'User approved', time: '15 mins ago', user: 'Jane Smith' },
                  { action: 'System backup', time: '1 hour ago', user: 'System' },
                  { action: 'Settings updated', time: '2 hours ago', user: 'Admin' }
                ].map((activity, index) => (
                  <div key={index} className="text-sm p-2 hover:bg-gray-50 rounded">
                    <p className="font-medium">{activity.action}</p>
                    <div className="flex justify-between text-gray-500">
                      <span>by {activity.user}</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src="/eapl.png" alt="EAPL" className="h-6 w-auto mr-2" />
              <p className="text-gray-600">Administrator Control Panel v1.0</p>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()} | 
              Users online: {stats.activeUsers}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;