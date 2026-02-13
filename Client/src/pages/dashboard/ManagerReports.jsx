import React from "react";
import DashboardLayout from "./DashboardLayout";
import {
  BarChart,
  TrendingUp,
  Download,
  FileText,
  Users,
  DollarSign,
} from "lucide-react";

const ManagerReports = () => {
  const reports = [
    {
      id: 1,
      name: "Monthly Performance Report",
      type: "Performance",
      date: "Feb 15, 2024",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Q1 2024 Financial Summary",
      type: "Financial",
      date: "Feb 10, 2024",
      size: "3.1 MB",
    },
    {
      id: 3,
      name: "Team Productivity Analysis",
      type: "Productivity",
      date: "Feb 5, 2024",
      size: "1.8 MB",
    },
    {
      id: 4,
      name: "Project Status Report",
      type: "Project",
      date: "Feb 1, 2024",
      size: "2.7 MB",
    },
    {
      id: 5,
      name: "Client Satisfaction Survey",
      type: "Client",
      date: "Jan 28, 2024",
      size: "1.5 MB",
    },
  ];

  const performanceData = [
    { month: "Jan", productivity: 85, revenue: 42000 },
    { month: "Feb", productivity: 92, revenue: 48000 },
    { month: "Mar", productivity: 88, revenue: 45000 },
    { month: "Apr", productivity: 95, revenue: 52000 },
    { month: "May", productivity: 90, revenue: 49000 },
    { month: "Jun", productivity: 93, revenue: 51000 },
  ];

  return (
    <DashboardLayout role="manager">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">Analytics and performance reports</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <BarChart size={18} className="mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Reports
              </h2>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-lg ${
                          report.type === "Performance"
                            ? "bg-blue-100"
                            : report.type === "Financial"
                            ? "bg-green-100"
                            : report.type === "Productivity"
                            ? "bg-yellow-100"
                            : "bg-purple-100"
                        }`}
                      >
                        <FileText
                          className={
                            report.type === "Performance"
                              ? "text-blue-600"
                              : report.type === "Financial"
                              ? "text-green-600"
                              : report.type === "Productivity"
                              ? "text-yellow-600"
                              : "text-purple-600"
                          }
                          size={24}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {report.name}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500">
                            Type: {report.type}
                          </span>
                          <span className="text-sm text-gray-500">
                            Date: {report.date}
                          </span>
                          <span className="text-sm text-gray-500">
                            Size: {report.size}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg flex items-center">
                        <Download size={16} className="mr-2" />
                        Download
                      </button>
                      <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Performance Trends
            </h2>
            <div className="h-64 flex items-end space-x-4">
              {performanceData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex space-x-1 mb-2">
                    <div
                      className="flex-1 bg-blue-500 rounded-t-lg"
                      style={{ height: `${data.productivity}%` }}
                    ></div>
                    <div
                      className="flex-1 bg-green-500 rounded-t-lg"
                      style={{ height: `${data.revenue / 1000}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{data.month}</span>
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    <div>Prod: {data.productivity}%</div>
                    <div>Rev: ${(data.revenue / 1000).toFixed(0)}K</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Productivity (%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Revenue ($)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Key Metrics</h3>
              <TrendingUp size={24} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users size={20} className="mr-3" />
                  <span>Team Productivity</span>
                </div>
                <span className="text-2xl font-bold">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <DollarSign size={20} className="mr-3" />
                  <span>Revenue Growth</span>
                </div>
                <span className="text-2xl font-bold">+15%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileText size={20} className="mr-3" />
                  <span>Project Completion</span>
                </div>
                <span className="text-2xl font-bold">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BarChart size={20} className="mr-3" />
                  <span>Client Satisfaction</span>
                </div>
                <span className="text-2xl font-bold">94%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Report Types
            </h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700">
                Performance Reports
              </button>
              <button className="w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-green-700">
                Financial Reports
              </button>
              <button className="w-full p-3 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-lg text-yellow-700">
                Productivity Reports
              </button>
              <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700">
                Project Reports
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg">
                Generate Weekly Report
              </button>
              <button className="w-full p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg">
                Schedule Monthly Review
              </button>
              <button className="w-full p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg">
                Export All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerReports;
