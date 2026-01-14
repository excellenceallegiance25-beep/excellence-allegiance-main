import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Shield, User, Calendar, Search, Filter, Download } from 'lucide-react';

const AdminAudit = () => {
  const auditLogs = [
    { id: 1, user: 'admin@technexus.com', action: 'User created', target: 'maria@technexus.com', ip: '192.168.1.100', timestamp: '2024-02-15 14:30:25', status: 'success' },
    { id: 2, user: 'manager@technexus.com', action: 'Project updated', target: 'Mobile App Project', ip: '192.168.1.101', timestamp: '2024-02-15 13:15:42', status: 'success' },
    { id: 3, user: 'employee@technexus.com', action: 'Failed login attempt', target: 'N/A', ip: '203.0.113.25', timestamp: '2024-02-15 12:05:18', status: 'failed' },
    { id: 4, user: 'admin@technexus.com', action: 'System settings updated', target: 'Security Settings', ip: '192.168.1.100', timestamp: '2024-02-15 11:45:33', status: 'success' },
    { id: 5, user: 'sarah@technexus.com', action: 'File uploaded', target: 'project_docs.zip', ip: '192.168.1.102', timestamp: '2024-02-15 10:20:15', status: 'success' },
    { id: 6, user: 'unknown', action: 'Suspicious activity', target: 'Multiple login attempts', ip: '198.51.100.23', timestamp: '2024-02-15 09:15:42', status: 'blocked' },
    { id: 7, user: 'manager@technexus.com', action: 'Team member added', target: 'david@technexus.com', ip: '192.168.1.101', timestamp: '2024-02-15 08:30:55', status: 'success' },
    { id: 8, user: 'admin@technexus.com', action: 'Database backup', target: 'Full system backup', ip: '192.168.1.100', timestamp: '2024-02-15 02:00:00', status: 'success' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'blocked': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (action) => {
    if (action.includes('login')) return <User size={16} className="mr-2" />;
    if (action.includes('user')) return <User size={16} className="mr-2" />;
    if (action.includes('settings')) return <Shield size={16} className="mr-2" />;
    return <Calendar size={16} className="mr-2" />;
  };

  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
            <p className="text-gray-600">Track all system activities and changes</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Download size={18} className="mr-2" />
            Export Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="search"
                    placeholder="Search logs..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                  <Filter size={18} className="mr-2" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">User</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Action</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Target</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">IP Address</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Timestamp</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                            {log.user.split('@')[0].charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium">{log.user}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          {getActionIcon(log.action)}
                          <span>{log.action}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">{log.target}</td>
                      <td className="py-4">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{log.ip}</code>
                      </td>
                      <td className="py-4 text-gray-600">{log.timestamp}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">Showing 8 of 1,245 total logs</p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm">Previous</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm">Next</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Audit Statistics</h3>
              <Shield size={24} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Logs Today</span>
                <span className="text-2xl font-bold">142</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Successful Actions</span>
                <span className="text-2xl font-bold">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Failed Attempts</span>
                <span className="text-2xl font-bold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Blocked IPs</span>
                <span className="text-2xl font-bold">3</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Types</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">User Management</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">System Changes</span>
                <span className="font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">File Operations</span>
                <span className="font-medium">18%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Security Events</span>
                <span className="font-medium">12%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Alerts</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium text-red-900">Multiple failed logins</p>
                <p className="text-sm text-red-700">IP: 198.51.100.23</p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium text-yellow-900">Unusual file download</p>
                <p className="text-sm text-yellow-700">User: sarah@technexus.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700">
                Clear Old Logs
              </button>
              <button className="w-full p-3 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-700">
                Block Suspicious IP
              </button>
              <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAudit;