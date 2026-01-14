import React from 'react';
import DashboardLayout from './DashboardLayout';
import { TrendingUp, Target, Award, BarChart, Users, Calendar } from 'lucide-react';

const ManagerPerformance = () => {
  const teamPerformance = [
    { id: 1, name: 'Sarah Chen', role: 'Senior Developer', productivity: 95, quality: 98, attendance: 100, overall: 97 },
    { id: 2, name: 'Mike Johnson', role: 'UI/UX Designer', productivity: 88, quality: 92, attendance: 95, overall: 91 },
    { id: 3, name: 'Emma Wilson', role: 'QA Engineer', productivity: 92, quality: 96, attendance: 98, overall: 95 },
    { id: 4, name: 'Alex Brown', role: 'DevOps Engineer', productivity: 85, quality: 90, attendance: 92, overall: 89 },
    { id: 5, name: 'Lisa Wong', role: 'Project Manager', productivity: 96, quality: 94, attendance: 100, overall: 96 },
    { id: 6, name: 'David Kim', role: 'Frontend Developer', productivity: 78, quality: 85, attendance: 88, overall: 83 },
  ];

  const performanceMetrics = [
    { metric: 'Team Productivity', value: 92, change: '+5%', target: 90 },
    { metric: 'Project Completion', value: 85, change: '+8%', target: 80 },
    { metric: 'Quality Score', value: 94, change: '+3%', target: 92 },
    { metric: 'Client Satisfaction', value: 96, change: '+2%', target: 95 },
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <DashboardLayout role="manager">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Performance</h1>
            <p className="text-gray-600">Track team and individual performance metrics</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Schedule Reviews
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Team Performance</h2>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Export Report
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Team Member</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Productivity</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Quality</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Attendance</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Overall</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teamPerformance.map((member) => (
                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-full rounded-full ${getScoreColor(member.productivity).replace('text-', 'bg-')}`}
                              style={{ width: `${member.productivity}%` }}
                            ></div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreBgColor(member.productivity)} ${getScoreColor(member.productivity)}`}>
                            {member.productivity}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-full rounded-full ${getScoreColor(member.quality).replace('text-', 'bg-')}`}
                              style={{ width: `${member.quality}%` }}
                            ></div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreBgColor(member.quality)} ${getScoreColor(member.quality)}`}>
                            {member.quality}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-full rounded-full ${getScoreColor(member.attendance).replace('text-', 'bg-')}`}
                              style={{ width: `${member.attendance}%` }}
                            ></div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreBgColor(member.attendance)} ${getScoreColor(member.attendance)}`}>
                            {member.attendance}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(member.overall)} ${getScoreColor(member.overall)}`}>
                          {member.overall}%
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Performance Metrics</h3>
              <TrendingUp size={24} />
            </div>
            <div className="space-y-4">
              {performanceMetrics.map((item) => (
                <div key={item.metric} className="bg-white/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>{item.metric}</span>
                    <span className="text-lg font-bold">{item.value}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Target: {item.target}%</span>
                    <span className="text-green-300">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
            <div className="space-y-3">
              {teamPerformance
                .sort((a, b) => b.overall - a.overall)
                .slice(0, 3)
                .map((member, index) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        'bg-amber-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <span className="font-bold">{member.overall}%</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700">
                Schedule 1:1 Meetings
              </button>
              <button className="w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-green-700">
                Set Performance Goals
              </button>
              <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700">
                Generate Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerPerformance;