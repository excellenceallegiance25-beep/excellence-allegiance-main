import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Users, UserPlus, Mail, Shield, CheckCircle, XCircle, MoreVertical } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alex Johnson', email: 'alex@technexus.com', role: 'admin', status: 'active', joinDate: '2022-01-15' },
    { id: 2, name: 'Maria Garcia', email: 'maria@technexus.com', role: 'manager', status: 'active', joinDate: '2022-03-22' },
    { id: 3, name: 'David Kim', email: 'david@technexus.com', role: 'employee', status: 'pending', joinDate: '2024-01-10' },
    { id: 4, name: 'Sarah Miller', email: 'sarah@technexus.com', role: 'employee', status: 'active', joinDate: '2023-06-18' },
    { id: 5, name: 'Robert Chen', email: 'robert@technexus.com', role: 'manager', status: 'inactive', joinDate: '2023-08-05' },
    { id: 6, name: 'Lisa Wang', email: 'lisa@technexus.com', role: 'employee', status: 'active', joinDate: '2023-11-30' },
    { id: 7, name: 'Mike Brown', email: 'mike@technexus.com', role: 'employee', status: 'active', joinDate: '2024-01-15' },
    { id: 8, name: 'Emma Wilson', email: 'emma@technexus.com', role: 'employee', status: 'pending', joinDate: '2024-02-01' },
  ]);

  const handleActivate = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'active' } : user
    ));
  };

  const handleDeactivate = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'inactive' } : user
    ));
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'employee': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage all system users and their permissions</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <UserPlus size={18} className="mr-2" />
            Add New User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
              <div className="flex space-x-3">
                <input
                  type="search"
                  placeholder="Search users..."
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
                    <th className="text-left py-3 text-sm font-medium text-gray-600">User</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Role</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Joined</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Mail size={14} className="mr-1" /> {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                          <Shield size={14} className="inline mr-1" />
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 text-gray-600">{user.joinDate}</td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          {user.status === 'pending' && (
                            <button
                              onClick={() => handleActivate(user.id)}
                              className="px-3 py-1 text-sm bg-green-100 text-green-700 hover:bg-green-200 rounded flex items-center"
                            >
                              <CheckCircle size={14} className="mr-1" />
                              Approve
                            </button>
                          )}
                          {user.status === 'active' && (
                            <button
                              onClick={() => handleDeactivate(user.id)}
                              className="px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded flex items-center"
                            >
                              <XCircle size={14} className="mr-1" />
                              Deactivate
                            </button>
                          )}
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">User Statistics</h3>
              <Users size={24} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Users</span>
                <span className="text-2xl font-bold">{users.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Active Users</span>
                <span className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Pending Approval</span>
                <span className="text-2xl font-bold">{users.filter(u => u.status === 'pending').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Inactive</span>
                <span className="text-2xl font-bold">{users.filter(u => u.status === 'inactive').length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span>Admins</span>
                </div>
                <span className="font-medium">{users.filter(u => u.role === 'admin').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span>Managers</span>
                </div>
                <span className="font-medium">{users.filter(u => u.role === 'manager').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span>Employees</span>
                </div>
                <span className="font-medium">{users.filter(u => u.role === 'employee').length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700">
                Invite New Users
              </button>
              <button className="w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-green-700">
                Bulk Import Users
              </button>
              <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700">
                Manage Permissions
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;