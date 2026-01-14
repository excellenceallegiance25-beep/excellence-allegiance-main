import React from 'react';
import DashboardLayout from './DashboardLayout';
import { BarChart, PieChart, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const AdminAnalytics = () => {
  const analyticsData = [
    { metric: 'Total Revenue', value: '$152,450', change: '+18%', icon: DollarSign, color: 'text-green-500 bg-green-100' },
    { metric: 'Active Users', value: '2,845', change: '+12%', icon: Users, color: 'text-blue-500 bg-blue-100' },
    { metric: 'System Uptime', value: '99.9%', change: '+0.1%', icon: Activity, color: 'text-purple-500 bg-purple-100' },
    { metric: 'Total Projects', value: '156', change: '+8%', icon: BarChart, color: 'text-orange-500 bg-orange-100' },
  ];

  const userGrowth = [
    { month: 'Jan', users: 1800 },
    { month: 'Feb', users: 2100 },
    { month: 'Mar', users: 1950 },
    { month: 'Apr', users: 2400 },
    { month: 'May', users: 2600 },
    { month: 'Jun', users: 2845 },
  ];

  const revenueBySource = [
    { source: 'Subscriptions', amount: 85400, percentage: 56 },
    { source: 'Services', amount: 42500, percentage: 28 },
    { source: 'Products', amount: 24550, percentage: 16 },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">System-wide analytics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{item.metric}</p>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <h3 className="text-2xl font-bold text-gray-900">{item.value}</h3>
                    <span className="text-sm font-medium text-green-600 flex items-center">
                      <TrendingUp size={16} className="mr-1" />
                      {item.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${item.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Growth Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">User Growth</h2>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Last 6 Months
              </button>
            </div>
            <div className="h-64 flex items-end space-x-4">
              {userGrowth.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg"
                    style={{ height: `${(data.users / 3000) * 100}%` }}
                  ></div>
                  <span className="text-sm text-gray-600 mt-2">{data.month}</span>
                  <span className="text-xs text-gray-500">{data.users.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue by Source */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Revenue by Source</h2>
            <div className="space-y-4">
              {revenueBySource.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-900">{item.source}</span>
                    <span className="text-gray-600">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-full rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        'bg-purple-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{item.percentage}% of total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">System Performance</h2>
          <div className="space-y-4">
            {[
              { metric: 'Response Time', value: '142ms', target: '200ms', status: 'good' },
              { metric: 'Error Rate', value: '0.12%', target: '0.5%', status: 'good' },
              { metric: 'Server Load', value: '68%', target: '80%', status: 'warning' },
              { metric: 'Database Queries', value: '1,245/sec', target: '2,000/sec', status: 'good' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.metric}</p>
                  <p className="text-sm text-gray-500">Target: {item.target}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{item.value}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.status === 'good' ? 'bg-green-100 text-green-800' :
                    item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status === 'good' ? 'Within Target' : 'Needs Attention'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium text-blue-900">Peak Usage Time</p>
              <p className="text-sm text-blue-700">10:00 AM - 2:00 PM</p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-medium text-green-900">Most Active Department</p>
              <p className="text-sm text-green-700">Engineering (42% of total activity)</p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="font-medium text-yellow-900">Growth Opportunity</p>
              <p className="text-sm text-yellow-700">Mobile app usage increased by 35% this month</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;