import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "./DashboardLayout";
import {
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  Award,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  BarChart3,
  Users,
  Star,
  Trophy,
  Zap,
  Flag,
  CalendarDays,
  Filter,
  Search,
  Download,
  MoreVertical,
  Eye,
  MessageSquare,
  Share2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const EmployeeGoals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "professional",
    priority: "medium",
    targetDate: "",
    targetValue: "",
    currentValue: "0",
    unit: "units",
  });
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock goals data
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const mockGoals = [
        {
          id: 1,
          title: "Complete React Certification",
          description:
            "Finish advanced React course and pass certification exam",
          category: "learning",
          priority: "high",
          status: "in_progress",
          progress: 75,
          targetDate: "2024-03-15",
          targetValue: "100",
          currentValue: "75",
          unit: "%",
          createdAt: "2024-01-01",
          milestones: [
            { id: 1, title: "Complete course modules", completed: true },
            { id: 2, title: "Finish all exercises", completed: true },
            { id: 3, title: "Take practice tests", completed: false },
            { id: 4, title: "Pass final exam", completed: false },
          ],
          kpis: ["Certification Score", "Completion Time"],
        },
        {
          id: 2,
          title: "Increase Sales by 20%",
          description:
            "Achieve 20% growth in Q1 sales compared to previous quarter",
          category: "professional",
          priority: "high",
          status: "on_track",
          progress: 60,
          targetDate: "2024-03-31",
          targetValue: "20",
          currentValue: "12",
          unit: "%",
          createdAt: "2024-01-05",
          milestones: [
            { id: 1, title: "Identify new leads", completed: true },
            { id: 2, title: "Contact 50 prospects", completed: true },
            { id: 3, title: "Close 15 deals", completed: false },
            { id: 4, title: "Achieve $100K revenue", completed: false },
          ],
          kpis: ["Revenue Growth", "Customer Acquisition"],
        },
        {
          id: 3,
          title: "Improve Code Quality",
          description: "Reduce bugs and improve code maintainability",
          category: "technical",
          priority: "medium",
          status: "at_risk",
          progress: 40,
          targetDate: "2024-02-28",
          targetValue: "90",
          currentValue: "72",
          unit: "score",
          createdAt: "2024-01-10",
          milestones: [
            { id: 1, title: "Implement code review process", completed: true },
            { id: 2, title: "Reduce bug count by 30%", completed: false },
            { id: 3, title: "Improve test coverage", completed: false },
          ],
          kpis: ["Bug Count", "Code Review Score"],
        },
        {
          id: 4,
          title: "Complete Leadership Training",
          description: "Attend and complete leadership development program",
          category: "personal",
          priority: "low",
          status: "completed",
          progress: 100,
          targetDate: "2024-01-31",
          targetValue: "1",
          currentValue: "1",
          unit: "program",
          createdAt: "2024-01-15",
          milestones: [
            { id: 1, title: "Register for program", completed: true },
            { id: 2, title: "Attend all sessions", completed: true },
            { id: 3, title: "Submit final project", completed: true },
          ],
          kpis: ["Completion Certificate", "Feedback Score"],
        },
        {
          id: 5,
          title: "Learn TypeScript",
          description: "Master TypeScript for better code quality",
          category: "learning",
          priority: "medium",
          status: "not_started",
          progress: 0,
          targetDate: "2024-04-30",
          targetValue: "100",
          currentValue: "0",
          unit: "%",
          createdAt: "2024-01-20",
          milestones: [
            { id: 1, title: "Study basics", completed: false },
            { id: 2, title: "Practice with projects", completed: false },
            { id: 3, title: "Build real application", completed: false },
          ],
          kpis: ["Project Completion", "Code Quality"],
        },
      ];

      setGoals(mockGoals);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddGoal = () => {
    if (!newGoal.title.trim()) {
      alert("Please enter a goal title");
      return;
    }

    const newGoalObj = {
      id: goals.length + 1,
      ...newGoal,
      status: "not_started",
      progress: 0,
      createdAt: new Date().toISOString().split("T")[0],
      milestones: [],
      kpis: [],
    };

    setGoals([...goals, newGoalObj]);
    setNewGoal({
      title: "",
      description: "",
      category: "professional",
      priority: "medium",
      targetDate: "",
      targetValue: "",
      currentValue: "0",
      unit: "units",
    });
    setShowGoalForm(false);
  };

  const handleUpdateProgress = (goalId, progress) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, progress: Math.min(100, Math.max(0, progress)) }
          : goal
      )
    );
  };

  const handleDeleteGoal = (goalId) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      setGoals(goals.filter((goal) => goal.id !== goalId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "on_track":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "at_risk":
        return "bg-orange-100 text-orange-800";
      case "not_started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "professional":
        return <TrendingUp className="w-5 h-5" />;
      case "learning":
        return <Award className="w-5 h-5" />;
      case "technical":
        return <Zap className="w-5 h-5" />;
      case "personal":
        return <Users className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const filteredGoals = goals.filter((goal) => {
    if (filter !== "all" && goal.status !== filter) return false;
    if (
      searchQuery &&
      !goal.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const stats = {
    total: goals.length,
    completed: goals.filter((g) => g.status === "completed").length,
    inProgress: goals.filter((g) => g.status === "in_progress").length,
    onTrack: goals.filter((g) => g.status === "on_track").length,
    avgProgress:
      goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length || 0,
  };

  return (
    <DashboardLayout role="employee">
      <div className="w-full h-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Goals & Objectives
              </h1>
              <p className="text-gray-600 mt-2">
                Set, track, and achieve your professional and personal goals
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => setShowGoalForm(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Goal
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Goals</p>
                  <p className="text-2xl font-bold mt-2">{stats.total}</p>
                </div>
                <Target className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Completed</p>
                  <p className="text-2xl font-bold mt-2">{stats.completed}</p>
                </div>
                <CheckCircle className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">In Progress</p>
                  <p className="text-2xl font-bold mt-2">{stats.inProgress}</p>
                </div>
                <Clock className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Avg Progress</p>
                  <p className="text-2xl font-bold mt-2">
                    {stats.avgProgress.toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="w-10 h-10 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search goals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg ${
                  filter === "all"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                All Goals
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-2 rounded-lg ${
                  filter === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter("in_progress")}
                className={`px-4 py-2 rounded-lg ${
                  filter === "in_progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setFilter("on_track")}
                className={`px-4 py-2 rounded-lg ${
                  filter === "on_track"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                On Track
              </button>
              <button
                onClick={() => setFilter("at_risk")}
                className={`px-4 py-2 rounded-lg ${
                  filter === "at_risk"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                At Risk
              </button>
            </div>
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading goals...</p>
              </div>
            </div>
          ) : filteredGoals.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border">
              <div className="text-gray-400 mb-4">
                <Target className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No goals found
              </h3>
              <p className="text-gray-600 mb-6">
                Try creating a new goal or adjust your filters
              </p>
              <button
                onClick={() => setShowGoalForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Your First Goal
              </button>
            </div>
          ) : (
            filteredGoals.map((goal) => (
              <div
                key={goal.id}
                className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getCategoryIcon(goal.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {goal.title}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              goal.status
                            )}`}
                          >
                            {goal.status.replace("_", " ")}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                              goal.priority
                            )}`}
                          >
                            {goal.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{goal.description}</p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              Progress: {goal.progress}%
                            </span>
                            <span className="text-sm text-gray-500">
                              {goal.currentValue}/{goal.targetValue} {goal.unit}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                goal.progress < 30
                                  ? "bg-red-500"
                                  : goal.progress < 70
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">
                              Target: {goal.targetDate}
                            </span>
                            <span className="text-xs text-gray-500">
                              Created: {goal.createdAt}
                            </span>
                          </div>
                        </div>

                        {/* Milestones */}
                        {goal.milestones && goal.milestones.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Milestones
                            </h4>
                            <div className="space-y-2">
                              {goal.milestones.map((milestone) => (
                                <div
                                  key={milestone.id}
                                  className="flex items-center gap-2"
                                >
                                  <div
                                    className={`w-3 h-3 rounded-full ${
                                      milestone.completed
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <span
                                    className={`text-sm ${
                                      milestone.completed
                                        ? "text-gray-500 line-through"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {milestone.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        const newProgress = parseInt(
                          prompt(
                            "Enter progress percentage (0-100):",
                            goal.progress
                          )
                        );
                        if (!isNaN(newProgress)) {
                          handleUpdateProgress(goal.id, newProgress);
                        }
                      }}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                    >
                      Update Progress
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      View Details
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* New Goal Form Modal */}
        {showGoalForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Create New Goal
                </h3>
                <button
                  onClick={() => setShowGoalForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Title *
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, title: e.target.value })
                    }
                    placeholder="What do you want to achieve?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, description: e.target.value })
                    }
                    placeholder="Describe your goal in detail..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows="3"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newGoal.category}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, category: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="professional">Professional</option>
                      <option value="learning">Learning & Development</option>
                      <option value="technical">Technical Skills</option>
                      <option value="personal">Personal Growth</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={newGoal.priority}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, priority: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Date
                    </label>
                    <input
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, targetDate: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Value
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newGoal.targetValue}
                        onChange={(e) =>
                          setNewGoal({
                            ...newGoal,
                            targetValue: e.target.value,
                          })
                        }
                        placeholder="100"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        value={newGoal.unit}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, unit: e.target.value })
                        }
                        placeholder="units"
                        className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowGoalForm(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddGoal}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                  >
                    Create Goal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmployeeGoals;
