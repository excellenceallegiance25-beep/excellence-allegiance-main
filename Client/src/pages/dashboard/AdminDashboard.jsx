// src/pages/dashboard/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  Database, 
  Settings, 
  Shield, 
  TrendingUp, 
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    systemHealth: 100,
    storageUsed: 0,
    pendingTasks: 0,
    completedTasks: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalUsers: 1256,
        activeUsers: 894,
        systemHealth: 98,
        storageUsed: 78,
        pendingTasks: 12,
        completedTasks: 245
      });

      setRecentActivity([
        { id: 1, user: 'John Doe', action: 'Created new user account', time: '10 minutes ago', type: 'user' },
        { id: 2, user: 'System', action: 'Database backup completed', time: '1 hour ago', type: 'system' },
        { id: 3, user: 'Sarah Smith', action: 'Updated profile information', time: '2 hours ago', type: 'profile' },
        { id: 4, user: 'Admin', action: 'Changed system settings', time: '3 hours ago', type: 'settings' },
        { id: 5, user: 'System', action: 'Security audit passed', time: '5 hours ago', type: 'security' },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const statsCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      change: '+12%',
      icon: <Users className="text-blue-600" size={24} />,
      color: 'bg-gradient-to-r from-blue-50 to-blue-100',
      border: 'border-blue-200'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      change: '+5%',
      icon: <Activity className="text-green-600" size={24} />,
      color: 'bg-gradient-to-r from-green-50 to-green-100',
      border: 'border-green-200'
    },
    {
      title: 'System Health',
      value: `${stats.systemHealth}%`,
      change: '+2%',
      icon: <Shield className="text-emerald-600" size={24} />,
      color: 'bg-gradient-to-r from-emerald-50 to-emerald-100',
      border: 'border-emerald-200'
    },
    {
      title: 'Storage Used',
      value: `${stats.storageUsed}%`,
      change: '+3%',
      icon: <Database className="text-purple-600" size={24} />,
      color: 'bg-gradient-to-r from-purple-50 to-purple-100',
      border: 'border-purple-200'
    },
    {
      title: 'Pending Tasks',
      value: stats.pendingTasks,
      change: '-2',
      icon: <Clock className="text-amber-600" size={24} />,
      color: 'bg-gradient-to-r from-amber-50 to-amber-100',
      border: 'border-amber-200'
    },
    {
      title: 'Completed Tasks',
      value: stats.completedTasks,
      change: '+8%',
      icon: <CheckCircle className="text-indigo-600" size={24} />,
      color: 'bg-gradient-to-r from-indigo-50 to-indigo-100',
      border: 'border-indigo-200'
    },
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'user': return <Users size={16} className="text-blue-500" />;
      case 'system': return <Database size={16} className="text-green-500" />;
      case 'profile': return <Settings size={16} className="text-purple-500" />;
      case 'settings': return <Settings size={16} className="text-amber-500" />;
      case 'security': return <Shield size={16} className="text-red-500" />;
      default: return <Activity size={16} className="text-gray-500" />;
    }
  };

  return (
    <DashboardLayout role="admin">
      {/* Header with Admin ID */}
      <div className="w-full h-full">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-purple-100">Welcome back, {user?.name || 'Administrator'}!</p>
            </div>
            
            {/* 🔥 ADMIN ID BADGE */}
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
              <p className="text-sm text-purple-200">Admin ID</p>
              <p className="font-bold font-mono text-xl">
                {user?.userId || 'ADM-001'}
              </p>
              <p className="text-xs text-purple-300 mt-1">
                System Administrator • Full Access
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Dashboard Content */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back, Admin! Here's what's happening with your system.</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  <Settings size={18} className="inline mr-2" />
                  System Settings
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {statsCards.map((stat, index) => (
                <div 
                  key={index} 
                  className={`${stat.color} border ${stat.border} rounded-xl p-6 transition-all hover:shadow-md`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">from last month</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Charts & Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* System Overview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">System Overview</h2>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                
                <div className="space-y-6">
                  {/* CPU Usage */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm font-bold">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  
                  {/* Memory Usage */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm font-bold">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  {/* Disk Usage */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Disk Usage</span>
                      <span className="text-sm font-bold">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  {/* Network Traffic */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Network Traffic</span>
                      <span className="text-sm font-bold">1.2 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-sm">CPU</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                        <span className="text-sm">Memory</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                        <span className="text-sm">Disk</span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Detailed Report →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                  <span className="text-sm text-gray-500">{recentActivity.length} activities</span>
                </div>
                
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500 mt-1">{activity.user}</p>
                        <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t text-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View All Activity →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:shadow-md transition-all text-left">
                <Users className="text-blue-600 mb-3" size={24} />
                <h3 className="font-semibold text-gray-900">Add New User</h3>
                <p className="text-sm text-gray-600 mt-1">Create new user accounts</p>
              </button>
              
              <button className="p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl hover:shadow-md transition-all text-left">
                <Database className="text-green-600 mb-3" size={24} />
                <h3 className="font-semibold text-gray-900">Backup Database</h3>
                <p className="text-sm text-gray-600 mt-1">Create system backup</p>
              </button>
              
              <button className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:shadow-md transition-all text-left">
                <Settings className="text-purple-600 mb-3" size={24} />
                <h3 className="font-semibold text-gray-900">System Settings</h3>
                <p className="text-sm text-gray-600 mt-1">Configure system options</p>
              </button>
              
              <button className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl hover:shadow-md transition-all text-left">
                <Shield className="text-amber-600 mb-3" size={24} />
                <h3 className="font-semibold text-gray-900">Security Audit</h3>
                <p className="text-sm text-gray-600 mt-1">Run security checks</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;