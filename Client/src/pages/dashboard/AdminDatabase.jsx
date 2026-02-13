import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Database, RefreshCw, Download, Trash2, Activity, HardDrive } from 'lucide-react';

const AdminDatabase = () => {
  const [databaseSize, setDatabaseSize] = useState({
    total: '2.4 GB',
    used: '1.8 GB',
    free: '0.6 GB',
  });

  const [tables, setTables] = useState([
    { name: 'users', rows: '2,845', size: '245 MB', lastBackup: '2 hours ago' },
    { name: 'projects', rows: '1,256', size: '189 MB', lastBackup: '2 hours ago' },
    { name: 'tasks', rows: '15,842', size: '542 MB', lastBackup: '1 hour ago' },
    { name: 'attendance', rows: '42,158', size: '612 MB', lastBackup: '3 hours ago' },
    { name: 'payroll', rows: '8,452', size: '156 MB', lastBackup: '4 hours ago' },
    { name: 'audit_logs', rows: '125,842', size: '856 MB', lastBackup: '30 minutes ago' },
  ]);

  const [queries, setQueries] = useState([
    { id: 1, query: 'SELECT * FROM users WHERE status="active"', time: '142ms', status: 'normal' },
    { id: 2, query: 'UPDATE projects SET status="completed"', time: '245ms', status: 'normal' },
    { id: 3, query: 'DELETE FROM temp_logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 7 DAY)', time: '1.2s', status: 'slow' },
    { id: 4, query: 'JOIN users, projects, tasks ON...', time: '845ms', status: 'warning' },
  ]);

  const handleOptimize = (tableName) => {
    alert(`Optimizing table: ${tableName}`);
    // In real app, this would call an API
  };

  const handleBackup = () => {
    alert('Starting database backup...');
    // In real app, this would call an API
  };

  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Database Management</h1>
            <p className="text-gray-600">Monitor and manage database operations</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleBackup}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Download size={18} className="mr-2" />
              Backup Now
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
              <RefreshCw size={18} className="mr-2" />
              Optimize All
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Database Tables */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Database Tables</h2>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Refresh
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Table Name</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Rows</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Size</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Last Backup</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tables.map((table, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center">
                          <Database size={16} className="mr-3 text-blue-500" />
                          <span className="font-medium text-gray-900">{table.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">{table.rows}</td>
                      <td className="py-4">
                        <span className="font-medium">{table.size}</span>
                      </td>
                      <td className="py-4 text-gray-600">{table.lastBackup}</td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleOptimize(table.name)}
                            className="px-3 py-1 text-sm bg-green-100 text-green-700 hover:bg-green-200 rounded"
                          >
                            Optimize
                          </button>
                          <button className="px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Running Queries */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Active Queries</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {queries.length} active
              </span>
            </div>

            <div className="space-y-4">
              {queries.map((query) => (
                <div key={query.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      {query.query.length > 50 ? query.query.substring(0, 50) + '...' : query.query}
                    </code>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      query.status === 'normal' ? 'bg-green-100 text-green-800' :
                      query.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {query.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Execution Time: {query.time}</span>
                    <button className="text-red-600 hover:text-red-800">
                      Kill Query
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Storage Overview */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Storage Overview</h3>
              <HardDrive size={24} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Database Size</span>
                <span className="text-2xl font-bold">{databaseSize.total}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span>{databaseSize.used}</span>
                </div>
                <div className="w-full bg-blue-800/50 rounded-full h-2">
                  <div 
                    className="h-full rounded-full bg-white"
                    style={{ width: `${(parseFloat(databaseSize.used) / parseFloat(databaseSize.total)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-blue-500/30">
                <span>Free Space</span>
                <span className="text-xl font-bold">{databaseSize.free}</span>
              </div>
            </div>
          </div>

          {/* Database Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Tables</span>
                <span className="font-medium">{tables.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Rows</span>
                <span className="font-medium">~195k</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Backup Size</span>
                <span className="font-medium">1.9 GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Daily Growth</span>
                <span className="font-medium">~45 MB</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700">
                Run Maintenance
              </button>
              <button className="w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-green-700">
                Check Integrity
              </button>
              <button className="w-full p-3 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-700">
                Purge Old Logs
              </button>
              <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700">
                Export Schema
              </button>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
              <Activity className="text-green-500" size={24} />
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-medium text-green-900">Database Healthy</p>
              <p className="text-sm text-green-700">All systems operational</p>
              <p className="text-sm text-green-700 mt-1">Response Time: 142ms</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDatabase;