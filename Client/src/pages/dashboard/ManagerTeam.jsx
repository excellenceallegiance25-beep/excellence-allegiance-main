// src/pages/dashboard/ManagerTeam.jsx
import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Users, Mail, Phone, Calendar, TrendingUp, MoreVertical } from 'lucide-react';

const ManagerTeam = () => {
  const teamMembers = [
    { id: 1, name: 'Sarah Chen', role: 'Senior Developer', email: 'sarah@technexus.com', phone: '+1 (555) 123-4567', joinDate: '2022-03-15', performance: 95, status: 'active' },
    { id: 2, name: 'Mike Johnson', role: 'UI/UX Designer', email: 'mike@technexus.com', phone: '+1 (555) 234-5678', joinDate: '2022-06-22', performance: 88, status: 'active' },
    { id: 3, name: 'Emma Wilson', role: 'QA Engineer', email: 'emma@technexus.com', phone: '+1 (555) 345-6789', joinDate: '2023-01-10', performance: 92, status: 'active' },
    { id: 4, name: 'Alex Brown', role: 'DevOps Engineer', email: 'alex@technexus.com', phone: '+1 (555) 456-7890', joinDate: '2023-03-05', performance: 85, status: 'active' },
    { id: 5, name: 'Lisa Wong', role: 'Project Manager', email: 'lisa@technexus.com', phone: '+1 (555) 567-8901', joinDate: '2023-08-18', performance: 96, status: 'active' },
    { id: 6, name: 'David Kim', role: 'Frontend Developer', email: 'david@technexus.com', phone: '+1 (555) 678-9012', joinDate: '2024-01-15', performance: 78, status: 'probation' },
  ];

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'probation': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="manager">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600">Manage your team members and their performance</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + Add Team Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
              <div className="flex space-x-3">
                <input
                  type="search"
                  placeholder="Search team members..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Name</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Role</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Contact</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Performance</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">Joined: {member.joinDate}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {member.role}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="space-y-1">
                          <p className="text-sm flex items-center">
                            <Mail size={14} className="mr-2 text-gray-500" />
                            {member.email}
                          </p>
                          <p className="text-sm flex items-center">
                            <Phone size={14} className="mr-2 text-gray-500" />
                            {member.phone}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-full rounded-full ${member.performance >= 90 ? 'bg-green-500' : member.performance >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${member.performance}%` }}
                            ></div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPerformanceColor(member.performance)}`}>
                            {member.performance}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded">
                            View
                          </button>
                          <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-6">Team Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Members</span>
                <span className="text-2xl font-bold">6</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Active</span>
                <span className="text-2xl font-bold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>On Probation</span>
                <span className="text-2xl font-bold">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Avg Performance</span>
                <span className="text-2xl font-bold">89%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700">
                Schedule Team Meeting
              </button>
              <button className="w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-green-700">
                Performance Review
              </button>
              <button className="w-full p-3 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-lg text-yellow-700">
                Assign New Project
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Hires</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">David Kim</p>
                  <p className="text-sm text-gray-500">Frontend Developer</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  Probation
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Lisa Wong</p>
                  <p className="text-sm text-gray-500">Project Manager</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerTeam;