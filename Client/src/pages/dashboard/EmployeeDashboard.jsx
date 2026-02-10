// src/pages/dashboard/EmployeeDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaBell, FaCalendar, FaTasks, 
  FaChartBar, FaCog, FaSignOutAlt, FaHome,
  FaUsers, FaFileAlt, FaEnvelope, FaClock
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    tasks: 0,
    attendance: '0%',
    projects: 0,
    messages: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (!token || !savedUser._id) {
        navigate('/login');
        return;
      }

      try {
        // Fetch user profile
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          // Fetch dashboard stats
          fetchDashboardStats(token);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
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

    fetchUserData();
  }, [navigate]);

  const fetchDashboardStats = async (token) => {
    try {
      // You can create separate endpoints for these stats
      const [tasksRes, attendanceRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/employee/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_BASE_URL}/employee/attendance`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setStats({
        tasks: tasksRes.data.count || 0,
        attendance: attendanceRes.data.percentage || '0%',
        projects: 5,
        messages: 3
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('Logged out successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
              <h1 className="text-xl font-semibold text-gray-900">EAPL Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <FaBell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.firstName?.[0] || 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user.position}</p>
                  </div>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FaUser className="inline mr-2" /> Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FaCog className="inline mr-2" /> Settings
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
            Welcome back, {user.firstName}!
          </h2>
          <p className="text-gray-600">Here's what's happening today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FaTasks size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Tasks</p>
                <p className="text-2xl font-bold">{stats.tasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FaClock size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Attendance</p>
                <p className="text-2xl font-bold">{stats.attendance}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <FaFileAlt size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Projects</p>
                <p className="text-2xl font-bold">{stats.projects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <FaEnvelope size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Messages</p>
                <p className="text-2xl font-bold">{stats.messages}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition">
                  <FaTasks className="text-blue-600 mb-2 mx-auto" size={24} />
                  <p className="text-sm font-medium">Submit Task</p>
                </button>
                <button className="p-4 border rounded-lg hover:border-green-500 hover:bg-green-50 transition">
                  <FaCalendar className="text-green-600 mb-2 mx-auto" size={24} />
                  <p className="text-sm font-medium">Mark Attendance</p>
                </button>
                <button className="p-4 border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition">
                  <FaFileAlt className="text-purple-600 mb-2 mx-auto" size={24} />
                  <p className="text-sm font-medium">Create Report</p>
                </button>
                <button className="p-4 border rounded-lg hover:border-red-500 hover:bg-red-50 transition">
                  <FaEnvelope className="text-red-600 mb-2 mx-auto" size={24} />
                  <p className="text-sm font-medium">Send Message</p>
                </button>
                <button className="p-4 border rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition">
                  <FaChartBar className="text-yellow-600 mb-2 mx-auto" size={24} />
                  <p className="text-sm font-medium">View Analytics</p>
                </button>
                <button className="p-4 border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition">
                  <FaUsers className="text-indigo-600 mb-2 mx-auto" size={24} />
                  <p className="text-sm font-medium">Team Chat</p>
                </button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {[
                  { action: 'Task completed', project: 'Project Alpha', time: '2 hours ago' },
                  { action: 'Attendance marked', project: 'Today', time: '4 hours ago' },
                  { action: 'Report submitted', project: 'Q4 Review', time: '1 day ago' },
                  { action: 'Message received', project: 'Team Update', time: '2 days ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.project}</p>
                    </div>
                    <span className="text-sm text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Upcoming Tasks & Profile */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Your Profile</h3>
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                  {user.firstName?.[0] || 'U'}
                </div>
                <h4 className="font-bold text-lg">{user.firstName} {user.lastName}</h4>
                <p className="text-gray-600">{user.position}</p>
                <p className="text-sm text-gray-500">{user.department}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Employee ID</span>
                  <span className="font-medium">{user.employeeId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium">{user.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Upcoming Tasks</h3>
                <span className="text-sm text-blue-600">View all</span>
              </div>
              <div className="space-y-3">
                {[
                  { task: 'Complete Q4 Report', due: 'Today', priority: 'high' },
                  { task: 'Team Meeting', due: 'Tomorrow', priority: 'medium' },
                  { task: 'Client Presentation', due: 'Dec 20', priority: 'high' },
                  { task: 'Training Session', due: 'Dec 22', priority: 'low' }
                ].map((task, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:border-blue-300 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{task.task}</p>
                        <p className="text-sm text-gray-500">Due: {task.due}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
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
              <p className="text-gray-600">Employee Assistance & Productivity Ltd.</p>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} EAPL Technologies. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeDashboard;