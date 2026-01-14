// pages/employee/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Activity,
  CalendarDays,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  Award,
  Target,
  BarChart3,
  Bell,
  Download,
  RefreshCw,
} from "lucide-react";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    attendance: 0,
    performance: 0,
    upcomingMeetings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/employee/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-blue-100">
              Here's your performance overview for today
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg font-bold">
                    {user?.registrationId}
                  </span>
                </div>
                <div>
                  <p className="text-sm opacity-90">Employee ID</p>
                  <p className="font-semibold">{user?.registrationId}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-sm opacity-90">Department</p>
                  <p className="font-semibold">{user?.department}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              View Full Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tasks Completed
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.tasksCompleted}/15
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                <TrendingUp size={14} className="inline mr-1" />
                12% from last week
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CheckCircle
                className="text-blue-600 dark:text-blue-400"
                size={24}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Attendance
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.attendance}%
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                <Clock size={14} className="inline mr-1" />
                Perfect this month
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Clock className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Performance
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.performance}%
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                <TrendingUp size={14} className="inline mr-1" />
                Excellent rating
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Activity
                className="text-purple-600 dark:text-purple-400"
                size={24}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upcoming Meetings
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.upcomingMeetings}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                <CalendarDays size={14} className="inline mr-1" />
                Next: Today 2 PM
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <CalendarDays
                className="text-orange-600 dark:text-orange-400"
                size={24}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/employee/attendance"
              className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <Clock
                className="text-blue-600 dark:text-blue-400 mb-2"
                size={24}
              />
              <p className="font-medium text-gray-900 dark:text-white">
                Mark Attendance
              </p>
            </Link>
            <Link
              to="/employee/tasks"
              className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <CheckCircle
                className="text-green-600 dark:text-green-400 mb-2"
                size={24}
              />
              <p className="font-medium text-gray-900 dark:text-white">
                View Tasks
              </p>
            </Link>
            <Link
              to="/employee/payroll"
              className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <DollarSign
                className="text-purple-600 dark:text-purple-400 mb-2"
                size={24}
              />
              <p className="font-medium text-gray-900 dark:text-white">
                Payroll
              </p>
            </Link>
            <Link
              to="/employee/documents"
              className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
            >
              <FileText
                className="text-orange-600 dark:text-orange-400 mb-2"
                size={24}
              />
              <p className="font-medium text-gray-900 dark:text-white">
                Documents
              </p>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {[
              {
                title: "Task Completed",
                desc: "Website redesign task",
                time: "2 hours ago",
                color: "green",
              },
              {
                title: "Attendance Marked",
                desc: "Check-in at 9:00 AM",
                time: "Today",
                color: "blue",
              },
              {
                title: "Document Uploaded",
                desc: "Monthly report.pdf",
                time: "Yesterday",
                color: "purple",
              },
              {
                title: "Meeting Scheduled",
                desc: "Team sync-up at 3 PM",
                time: "Tomorrow",
                color: "orange",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full bg-${activity.color}-500 mr-3`}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.desc}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
