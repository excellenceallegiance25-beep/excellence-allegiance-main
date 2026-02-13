import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "./DashboardLayout";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Download,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  UserCheck,
  BarChart3,
  Clock4,
  FileText,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Printer,
  Share2,
  Mail,
  MessageSquare,
  Bell,
  Home,
  Users,
  Target,
  Award,
} from "lucide-react";

const EmployeeAttendance = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [stats, setStats] = useState({
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
    lateDays: 0,
    leaveDays: 0,
    attendancePercentage: 0,
    overtimeHours: 0,
    earlyDepartures: 0,
  });
  const [filter, setFilter] = useState("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [attendanceNote, setAttendanceNote] = useState("");

  // Mock attendance data
  useEffect(() => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          date: "2024-01-01",
          day: "Monday",
          checkIn: "09:00 AM",
          checkOut: "06:00 PM",
          status: "present",
          hours: "9.0",
          overtime: "0.0",
          lateBy: "0 min",
          earlyBy: "0 min",
          note: "Regular work day",
        },
        {
          id: 2,
          date: "2024-01-02",
          day: "Tuesday",
          checkIn: "09:15 AM",
          checkOut: "06:30 PM",
          status: "present",
          hours: "9.25",
          overtime: "0.5",
          lateBy: "15 min",
          earlyBy: "0 min",
          note: "Team meeting",
        },
        {
          id: 3,
          date: "2024-01-03",
          day: "Wednesday",
          checkIn: "08:45 AM",
          checkOut: "05:45 PM",
          status: "present",
          hours: "9.0",
          overtime: "0.0",
          lateBy: "0 min",
          earlyBy: "15 min",
          note: "Left early for appointment",
        },
        {
          id: 4,
          date: "2024-01-04",
          day: "Thursday",
          checkIn: "09:30 AM",
          checkOut: "07:00 PM",
          status: "late",
          hours: "9.5",
          overtime: "1.0",
          lateBy: "30 min",
          earlyBy: "0 min",
          note: "Traffic delay",
        },
        {
          id: 5,
          date: "2024-01-05",
          day: "Friday",
          checkIn: "09:00 AM",
          checkOut: "06:00 PM",
          status: "present",
          hours: "9.0",
          overtime: "0.0",
          lateBy: "0 min",
          earlyBy: "0 min",
          note: "Weekly review",
        },
        {
          id: 6,
          date: "2024-01-08",
          day: "Monday",
          status: "absent",
          checkIn: "-",
          checkOut: "-",
          hours: "0.0",
          overtime: "0.0",
          lateBy: "-",
          earlyBy: "-",
          note: "Sick leave",
        },
        {
          id: 7,
          date: "2024-01-09",
          day: "Tuesday",
          checkIn: "09:00 AM",
          checkOut: "06:00 PM",
          status: "present",
          hours: "9.0",
          overtime: "0.0",
          lateBy: "0 min",
          earlyBy: "0 min",
          note: "Regular work day",
        },
        {
          id: 8,
          date: "2024-01-10",
          day: "Wednesday",
          checkIn: "08:30 AM",
          checkOut: "07:30 PM",
          status: "present",
          hours: "11.0",
          overtime: "2.0",
          lateBy: "0 min",
          earlyBy: "0 min",
          note: "Project deadline",
        },
      ];

      const mockStats = {
        totalDays: 20,
        presentDays: 16,
        absentDays: 2,
        lateDays: 1,
        leaveDays: 1,
        attendancePercentage: 80,
        overtimeHours: 12.5,
        earlyDepartures: 1,
      };

      setAttendanceData(mockData);
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, [filter]);

  const handleCheckIn = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // In real app, this would be an API call
    alert(`Checked in at ${time}`);
    setShowAttendanceForm(true);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // In real app, this would be an API call
    alert(`Checked out at ${time}`);
  };

  const handleSubmitAttendanceNote = () => {
    if (attendanceNote.trim()) {
      // In real app, this would be an API call
      alert(`Note submitted: ${attendanceNote}`);
      setAttendanceNote("");
      setShowAttendanceForm(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "leave":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-4 h-4" />;
      case "absent":
        return <XCircle className="w-4 h-4" />;
      case "late":
        return <AlertCircle className="w-4 h-4" />;
      case "leave":
        return <CalendarDays className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredData = attendanceData.filter(
    (item) =>
      item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="employee">
      <div className="w-full h-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Attendance Management
              </h1>
              <p className="text-gray-600 mt-2">
                Track your attendance, check-in/out times, and view attendance
                history
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Print Report
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Today's Status</p>
                  <p className="text-2xl font-bold mt-2">Not Checked In</p>
                  <p className="text-sm opacity-90 mt-1">
                    {new Date().toDateString()}
                  </p>
                </div>
                <Clock className="w-12 h-12 opacity-80" />
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleCheckIn}
                  className="flex-1 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Check In
                </button>
                <button
                  onClick={handleCheckOut}
                  disabled
                  className="flex-1 py-3 bg-blue-700 text-white rounded-lg font-semibold opacity-50 cursor-not-allowed"
                >
                  Check Out
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Attendance Rate</p>
                  <p className="text-2xl font-bold mt-2">
                    {stats.attendancePercentage}%
                  </p>
                  <p className="text-sm opacity-90 mt-1">This Month</p>
                </div>
                <TrendingUp className="w-12 h-12 opacity-80" />
              </div>
              <div className="mt-4">
                <div className="w-full bg-green-700 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: `${stats.attendancePercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-2 opacity-90">
                  {stats.presentDays} of {stats.totalDays} days present
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Overtime Hours</p>
                  <p className="text-2xl font-bold mt-2">
                    {stats.overtimeHours}h
                  </p>
                  <p className="text-sm opacity-90 mt-1">This Month</p>
                </div>
                <Clock4 className="w-12 h-12 opacity-80" />
              </div>
              <div className="mt-6">
                <button className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-semibold transition-colors">
                  Request Overtime
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Present Days</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.presentDays}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Absent Days</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.absentDays}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Late Days</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.lateDays}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Leave Days</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.leaveDays}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <CalendarDays className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Attendance History
              </h2>
              <p className="text-gray-600">Your daily attendance records</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search attendance..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading attendance data...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Day
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Check In
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Check Out
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Hours
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Overtime
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Note
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium">{record.date}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-600">{record.day}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{record.checkIn}</div>
                        {record.lateBy !== "-" && record.lateBy !== "0 min" && (
                          <div className="text-xs text-yellow-600">
                            Late: {record.lateBy}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{record.checkOut}</div>
                        {record.earlyBy !== "-" &&
                          record.earlyBy !== "0 min" && (
                            <div className="text-xs text-blue-600">
                              Early: {record.earlyBy}
                            </div>
                          )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            record.status
                          )}`}
                        >
                          {getStatusIcon(record.status)}
                          {record.status.charAt(0).toUpperCase() +
                            record.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{record.hours}h</div>
                      </td>
                      <td className="py-3 px-4">
                        <div
                          className={`font-medium ${
                            record.overtime !== "0.0"
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          {record.overtime}h
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          {record.note}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredData.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Calendar className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No attendance records found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredData.length} of {attendanceData.length} records
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Note Form Modal */}
        {showAttendanceForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Add Attendance Note
              </h3>
              <p className="text-gray-600 mb-6">
                Add a note about today's attendance (optional)
              </p>

              <textarea
                value={attendanceNote}
                onChange={(e) => setAttendanceNote(e.target.value)}
                placeholder="Enter any notes about your attendance today..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-6"
                rows="4"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAttendanceForm(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitAttendanceNote}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Submit Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmployeeAttendance;
