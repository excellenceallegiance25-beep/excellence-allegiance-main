import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Folder, Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const ManagerProjects = () => {
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', budget: '$25,000', spent: '$18,500', team: 5, deadline: 'Feb 20', progress: 75 },
    { id: 2, name: 'Mobile App', status: 'Active', budget: '$45,000', spent: '$22,000', team: 8, deadline: 'Mar 10', progress: 45 },
    { id: 3, name: 'E-commerce Platform', status: 'Active', budget: '$60,000', spent: '$54,000', team: 12, deadline: 'Feb 25', progress: 90 },
    { id: 4, name: 'Admin Dashboard', status: 'Planning', budget: '$15,000', spent: '$4,500', team: 3, deadline: 'Mar 15', progress: 30 },
    { id: 5, name: 'CRM System', status: 'Completed', budget: '$35,000', spent: '$32,000', team: 6, deadline: 'Jan 30', progress: 100 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Active': return 'bg-yellow-100 text-yellow-800';
      case 'Planning': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="manager">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600">Manage all team projects and track progress</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Projects</h2>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Filter
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Export
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Folder className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Users size={14} className="mr-1" /> {project.team} members
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar size={14} className="mr-1" /> {project.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="space-y-2">
                        <div className="flex items-center justify-end space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">Budget</p>
                            <p className="font-medium">{project.budget}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Spent</p>
                            <p className="font-medium">{project.spent}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-full rounded-full bg-green-500"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-6">Project Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Projects</span>
                <span className="text-2xl font-bold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Active</span>
                <span className="text-2xl font-bold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Completed</span>
                <span className="text-2xl font-bold">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Budget</span>
                <span className="text-2xl font-bold">$180K</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Budget</span>
                <span className="font-bold">$180,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Spent</span>
                <span className="font-bold">$131,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Remaining</span>
                <span className="font-bold text-green-600">$49,000</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Utilization</span>
                  <span className="font-bold">73%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium text-red-900">Website Redesign</p>
                <p className="text-sm text-red-700">Due: Feb 20 (2 days)</p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium text-yellow-900">E-commerce Platform</p>
                <p className="text-sm text-yellow-700">Due: Feb 25 (7 days)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerProjects;