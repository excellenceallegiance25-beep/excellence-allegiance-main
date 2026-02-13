import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "./DashboardLayout";
import {
  TrendingUp,
  BarChart3,
  Target,
  Award,
  Star,
  Trophy,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Zap,
  Bell,
  Download,
  Filter,
  Calendar,
  Eye,
  MessageSquare,
  Share2,
  RefreshCw,
  ChevronRight,
  PieChart,
  LineChart,
  BarChart,
} from "lucide-react";

const EmployeePerformance = () => {
  const { user } = useAuth();
  const [performanceData, setPerformanceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("overall");

  // Mock performance data
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const mockData = {
        overallScore: 87,
        lastMonthScore: 82,
        trend: "up",

        metrics: {
          productivity: {
            score: 92,
            trend: "up",
            description: "Tasks completed on time with high quality",
            details: [
              { label: "Tasks Completed", value: "45/48", status: "excellent" },
              { label: "On Time Delivery", value: "94%", status: "good" },
              { label: "Quality Score", value: "4.8/5", status: "excellent" },
            ],
          },
          quality: {
            score: 85,
            trend: "stable",
            description: "Work accuracy and attention to detail",
            details: [
              { label: "Error Rate", value: "2%", status: "good" },
              { label: "Client Satisfaction", value: "4.5/5", status: "good" },
              { label: "Peer Reviews", value: "4.7/5", status: "excellent" },
            ],
          },
          collaboration: {
            score: 90,
            trend: "up",
            description: "Teamwork and communication effectiveness",
            details: [
              { label: "Team Feedback", value: "4.9/5", status: "excellent" },
              {
                label: "Knowledge Sharing",
                value: "8 sessions",
                status: "good",
              },
              { label: "Support Provided", value: "15 tasks", status: "good" },
            ],
          },
          learning: {
            score: 80,
            trend: "up",
            description: "Skill development and knowledge acquisition",
            details: [
              { label: "Skills Learned", value: "3 new", status: "good" },
              { label: "Certifications", value: "2", status: "good" },
              { label: "Training Hours", value: "24h", status: "average" },
            ],
          },
          leadership: {
            score: 75,
            trend: "stable",
            description: "Initiative and mentorship abilities",
            details: [
              { label: "Projects Led", value: "2", status: "good" },
              { label: "Mentees", value: "1", status: "average" },
              { label: "Initiatives", value: "3", status: "good" },
            ],
          },
        },

        monthlyTrend: [
          { month: "Jan", score: 78 },
          { month: "Feb", score: 82 },
          { month: "Mar", score: 85 },
          { month: "Apr", score: 80 },
          { month: "May", score: 87 },
          { month: "Jun", score: 85 },
        ],

        achievements: [
          {
            id: 1,
            title: "Top Performer of the Month",
            date: "2024-06-15",
            description: "Recognized for exceptional performance in Q2",
            type: "award",
            points: 100,
          },
          {
            id: 2,
            title: "Client Appreciation Award",
            date: "2024-05-20",
            description: "Received positive feedback from major client",
            type: "recognition",
            points: 50,
          },
          {
            id: 3,
            title: "Skill Mastery - React",
            date: "2024-04-10",
            description: "Completed advanced React certification",
            type: "learning",
            points: 75,
          },
        ],

        feedback: [
          {
            id: 1,
            from: "Sarah Johnson",
            role: "Team Lead",
            rating: 5,
            comment:
              "Exceptional work on the e-commerce project. Great attention to detail!",
            date: "2024-06-10",
          },
          {
            id: 2,
            from: "Mike Chen",
            role: "Project Manager",
            rating: 4,
            comment: "Good collaboration skills and always meets deadlines.",
            date: "2024-05-25",
          },
        ],

        goals: [
          {
            id: 1,
            title: "Improve code review score",
            current: 75,
            target: 90,
          },
          { id: 2, title: "Lead one major project", current: 0, target: 1 },
          {
            id: 3,
            title: "Complete AWS certification",
            current: 30,
            target: 100,
          },
        ],
      };

      setPerformanceData(mockData);
      setLoading(false);
    }, 1500);
  }, [timeRange]);

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 80) return "bg-blue-100";
    if (score >= 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case "down":
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <BarChart3 className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <DashboardLayout role="employee">
      <div className="w-full h-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Performance Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Track your performance metrics, achievements, and growth
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setTimeRange("week")}
                  className={`px-3 py-1 rounded ${
                    timeRange === "week" ? "bg-white shadow" : ""
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeRange("month")}
                  className={`px-3 py-1 rounded ${
                    timeRange === "month" ? "bg-white shadow" : ""
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setTimeRange("quarter")}
                  className={`px-3 py-1 rounded ${
                    timeRange === "quarter" ? "bg-white shadow" : ""
                  }`}
                >
                  Quarter
                </button>
              </div>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Overall Performance Card */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-sm opacity-90 mb-2">
                  Overall Performance Score
                </p>
                <div className="flex items-end gap-4">
                  <div
                    className={`text-5xl font-bold ${getScoreColor(
                      performanceData.overallScore || 0
                    )}`}
                  >
                    {performanceData.overallScore || 0}
                    <span className="text-2xl opacity-80">/100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(performanceData.trend || "stable")}
                    <span className="text-lg">
                      {performanceData.trend === "up"
                        ? "↑"
                        : performanceData.trend === "down"
                        ? "↓"
                        : "→"}
                      {performanceData.overallScore -
                        performanceData.lastMonthScore || 0}{" "}
                      points
                    </span>
                  </div>
                </div>
                <p className="text-sm opacity-90 mt-4">
                  You're performing better than{" "}
                  {performanceData.overallScore || 0}% of your peers
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8" />
                  <div>
                    <p className="text-sm">Rank in Team</p>
                    <p className="text-xl font-bold">#3 / 24</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(performanceData.metrics || {}).map(
            ([key, metric]) => (
              <div
                key={key}
                className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {metric.description}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${getScoreBgColor(
                      metric.score
                    )}`}
                  >
                    <span
                      className={`text-xl font-bold ${getScoreColor(
                        metric.score
                      )}`}
                    >
                      {metric.score}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {metric.details?.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-gray-600">
                        {detail.label}
                      </span>
                      <span
                        className={`font-medium ${
                          detail.status === "excellent"
                            ? "text-green-600"
                            : detail.status === "good"
                            ? "text-blue-600"
                            : detail.status === "average"
                            ? "text-yellow-600"
                            : "text-gray-600"
                        }`}
                      >
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(metric.trend)}
                      <span className="text-sm text-gray-600">
                        {metric.trend === "up"
                          ? "Improving"
                          : metric.trend === "down"
                          ? "Needs attention"
                          : "Stable"}
                      </span>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Charts and Graphs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trend Chart */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Performance Trend
              </h3>
              <select className="text-sm border rounded-lg px-3 py-1">
                <option>Last 6 Months</option>
                <option>Last Year</option>
                <option>Last 2 Years</option>
              </select>
            </div>

            <div className="h-64">
              {/* Simple bar chart visualization */}
              <div className="flex items-end h-48 gap-2 mt-4">
                {performanceData.monthlyTrend?.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t"
                      style={{ height: `${item.score * 0.6}%` }}
                    ></div>
                    <div className="text-xs text-gray-600 mt-2">
                      {item.month}
                    </div>
                    <div className="text-sm font-semibold">{item.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Goals Progress */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Performance Goals
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Set New Goals
              </button>
            </div>

            <div className="space-y-4">
              {performanceData.goals?.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {goal.title}
                    </span>
                    <span className="text-sm text-gray-600">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${(goal.current / goal.target) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements and Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Achievements
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {performanceData.achievements?.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {achievement.date}
                      </span>
                      <span className="text-sm font-medium text-yellow-600">
                        +{achievement.points} points
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Feedback
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Request Feedback
              </button>
            </div>

            <div className="space-y-4">
              {performanceData.feedback?.map((feedback) => (
                <div
                  key={feedback.id}
                  className="p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {feedback.from}
                      </h4>
                      <p className="text-xs text-gray-500">{feedback.role}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < feedback.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{feedback.comment}</p>
                  <div className="text-xs text-gray-500 mt-2">
                    {feedback.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Improvement Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">
                Focus on Quality
              </h4>
              <p className="text-sm text-gray-600">
                Your quality score is good. Continue paying attention to details
                in your work.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">
                Enhance Collaboration
              </h4>
              <p className="text-sm text-gray-600">
                Great teamwork! Consider mentoring junior team members to boost
                leadership.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">
                Skill Development
              </h4>
              <p className="text-sm text-gray-600">
                Focus on completing your AWS certification to boost technical
                skills score.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeePerformance;
