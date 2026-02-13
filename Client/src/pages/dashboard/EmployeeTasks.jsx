// src/pages/dashboard/EmployeeTasks.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  X,
  Plus,
  Filter,
  Edit,
  Trash2,
  Users,
  FileText,
  Bell,
  Target,
  Award,
  ChevronDown,
  ChevronUp,
  Eye,
  Share2,
} from "lucide-react";

const EmployeeTasks = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("employeeTasks");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore parse errors and fall back to defaults
    }

    return [
      {
        id: 1,
        title: "Complete project documentation",
        description:
          "Write comprehensive documentation for the website redesign project including API endpoints, setup instructions, and deployment guide.",
        project: "Website Redesign",
        priority: "high",
        dueDate: "2024-02-15",
        dueDisplay: "Today",
        status: "pending",
        assignedBy: "Sarah Johnson",
        timeEstimate: "4h",
        tags: ["documentation", "writing", "project"],
        subtasks: [
          { id: 1, text: "Outline document structure", completed: true },
          { id: 2, text: "Write API documentation", completed: true },
          { id: 3, text: "Create deployment guide", completed: false },
          { id: 4, text: "Add screenshots", completed: false },
        ],
      },
      {
        id: 2,
        title: "Code review for feature X",
        description:
          "Review pull request #45 for the new authentication feature. Check for security vulnerabilities and code quality.",
        project: "Mobile App",
        priority: "medium",
        dueDate: "2024-02-16",
        dueDisplay: "Tomorrow",
        status: "in-progress",
        assignedBy: "Michael Chen",
        timeEstimate: "2h",
        tags: ["code-review", "security", "backend"],
        subtasks: [
          { id: 1, text: "Review authentication logic", completed: true },
          { id: 2, text: "Check security implementation", completed: false },
          { id: 3, text: "Test edge cases", completed: false },
        ],
      },
      {
        id: 3,
        title: "Team meeting preparation",
        description:
          "Prepare agenda and presentation slides for the weekly team meeting. Include project updates and blockers.",
        project: "General",
        priority: "low",
        dueDate: "2024-02-15",
        dueDisplay: "Today",
        status: "completed",
        assignedBy: "David Wilson",
        timeEstimate: "1.5h",
        tags: ["meeting", "presentation", "planning"],
        subtasks: [],
      },
      {
        id: 4,
        title: "Client presentation slides",
        description:
          "Create presentation slides for client meeting showcasing project progress and next milestones.",
        project: "E-commerce",
        priority: "high",
        dueDate: "2024-02-18",
        dueDisplay: "Feb 18",
        status: "pending",
        assignedBy: "Emma Davis",
        timeEstimate: "3h",
        tags: ["presentation", "client", "design"],
        subtasks: [
          { id: 1, text: "Gather project metrics", completed: false },
          { id: 2, text: "Create slide template", completed: false },
          { id: 3, text: "Add visualizations", completed: false },
        ],
      },
      {
        id: 5,
        title: "API integration testing",
        description:
          "Test the integration with third-party payment API and document any issues or improvements needed.",
        project: "Admin Dashboard",
        priority: "medium",
        dueDate: "2024-02-20",
        dueDisplay: "Feb 20",
        status: "in-progress",
        assignedBy: "Robert Brown",
        timeEstimate: "5h",
        tags: ["testing", "api", "integration"],
        subtasks: [
          { id: 1, text: "Setup test environment", completed: true },
          { id: 2, text: "Test payment flow", completed: true },
          { id: 3, text: "Test error scenarios", completed: false },
          { id: 4, text: "Document findings", completed: false },
        ],
      },
    ];
  });

  const [showNewTask, setShowNewTask] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [expandedTask, setExpandedTask] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    project: "all",
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    project: "general",
    priority: "medium",
    dueDate: "",
    assignedTo: "",
    timeEstimate: "",
    tags: [],
  });

  const [currentTag, setCurrentTag] = useState("");

  // persist tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("employeeTasks", JSON.stringify(tasks));
    } catch (e) {
      // ignore storage errors
    }
  }, [tasks]);

  const projects = [
    { id: "website", name: "Website Redesign" },
    { id: "mobile", name: "Mobile App" },
    { id: "ecommerce", name: "E-commerce" },
    { id: "admin", name: "Admin Dashboard" },
    { id: "general", name: "General" },
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "high", label: "High", color: "bg-red-100 text-red-800" },
    {
      value: "critical",
      label: "Critical",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "on-hold", label: "On Hold" },
  ];

  const teamMembers = [
    { id: 1, name: "John Doe", role: "Frontend Developer" },
    { id: 2, name: "Jane Smith", role: "Backend Developer" },
    { id: 3, name: "Mike Johnson", role: "UI/UX Designer" },
    { id: 4, name: "Sarah Wilson", role: "Project Manager" },
  ];

  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find((p) => p.value === priority);
    return priorityObj ? priorityObj.color : "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" size={20} />;
      case "in-progress":
        return <Clock className="text-blue-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-500" size={20} />;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !newTask.tags.includes(currentTag.trim())) {
      setNewTask((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setNewTask((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();

    const base = {
      title: newTask.title,
      description: newTask.description,
      project:
        projects.find((p) => p.id === newTask.project)?.name || newTask.project,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      dueDisplay: formatDueDate(newTask.dueDate),
      timeEstimate: newTask.timeEstimate,
      tags: newTask.tags,
    };

    if (selectedTask) {
      // update existing task
      setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask.id ? { ...task, ...base } : task
        )
      );
      setSelectedTask(null);
      alert("Task updated successfully!");
    } else {
      const taskData = {
        id: Date.now(),
        ...base,
        status: "pending",
        assignedBy: "Self",
        subtasks: [],
      };
      setTasks((prev) => [taskData, ...prev]);
      alert("Task created successfully!");
    }

    // Reset form
    setNewTask({
      title: "",
      description: "",
      project: "general",
      priority: "medium",
      dueDate: "",
      assignedTo: "",
      timeEstimate: "",
      tags: [],
    });

    setShowNewTask(false);
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return "";
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const taskDate = new Date(dateString);

    if (taskDate.toDateString() === today.toDateString()) return "Today";
    if (taskDate.toDateString() === tomorrow.toDateString()) return "Tomorrow";

    return taskDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleStartTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "in-progress" } : task
      )
    );
    alert("Task marked as In Progress!");
  };

  const handleCompleteTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task
      )
    );
    alert("Task marked as Completed!");
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      project: projects.find((p) => p.name === task.project)?.id || "general",
      priority: task.priority,
      dueDate: task.dueDate,
      assignedTo: "",
      timeEstimate: task.timeEstimate,
      tags: task.tags || [],
    });
    setShowNewTask(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  const handleViewTaskDetails = (task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const handleToggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            ),
          };
        }
        return task;
      })
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filters.status !== "all" && task.status !== filters.status)
      return false;
    if (filters.priority !== "all" && task.priority !== filters.priority)
      return false;
    if (filters.project !== "all" && task.project !== filters.project)
      return false;
    return true;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  // New Task Popup
  const NewTaskPopup = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create New Task
              </h2>
              <p className="text-gray-600">Add details for your new task</p>
            </div>
            <button
              onClick={() => {
                setShowNewTask(false);
                setNewTask({
                  title: "",
                  description: "",
                  project: "general",
                  priority: "medium",
                  dueDate: "",
                  assignedTo: "",
                  timeEstimate: "",
                  tags: [],
                });
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmitTask} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title *
              </label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter task title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Describe the task..."
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project *
                </label>
                <select
                  name="project"
                  value={newTask.project}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                >
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority *
                </label>
                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                >
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date *
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Estimate
                </label>
                <select
                  name="timeEstimate"
                  value={newTask.timeEstimate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="">Select estimate</option>
                  <option value="30m">30 minutes</option>
                  <option value="1h">1 hour</option>
                  <option value="2h">2 hours</option>
                  <option value="3h">3 hours</option>
                  <option value="4h">4 hours</option>
                  <option value="5h+">5+ hours</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {newTask.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-blue-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowNewTask(false);
                  setNewTask({
                    title: "",
                    description: "",
                    project: "general",
                    priority: "medium",
                    dueDate: "",
                    assignedTo: "",
                    timeEstimate: "",
                    tags: [],
                  });
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors font-medium"
              >
                <Plus size={18} className="mr-2" />
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Filter Popup
  const FilterPopup = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Filter Tasks</h2>
              <p className="text-gray-600">
                Filter tasks by different criteria
              </p>
            </div>
            <button
              onClick={() => setShowFilter(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="all">All Status</option>
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, priority: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="all">All Priorities</option>
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project
              </label>
              <select
                value={filters.project}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, project: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="all">All Projects</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setFilters({
                    status: "all",
                    priority: "all",
                    project: "all",
                  });
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => setShowFilter(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Task Details Popup
  const TaskDetailsPopup = () => {
    if (!selectedTask) return null;

    const completedSubtasks = selectedTask.subtasks.filter(
      (st) => st.completed
    ).length;
    const totalSubtasks = selectedTask.subtasks.length;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getStatusIcon(selectedTask.status)}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedTask.title}
                </h2>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-sm text-gray-500">
                    {selectedTask.project}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      selectedTask.priority
                    )}`}
                  >
                    {selectedTask.priority} priority
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowTaskDetails(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="p-8 space-y-8">
            {/* Task Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Assigned By
                  </h4>
                  <p className="font-medium">{selectedTask.assignedBy}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Time Estimate
                  </h4>
                  <p className="font-medium">{selectedTask.timeEstimate}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Due Date
                  </h4>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <p className="font-medium">
                      {selectedTask.dueDate} ({selectedTask.dueDisplay})
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Status
                  </h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedTask.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : selectedTask.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedTask.status.replace("-", " ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-700">{selectedTask.description}</p>
            </div>

            {/* Subtasks */}
            {selectedTask.subtasks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Subtasks ({completedSubtasks}/{totalSubtasks})
                </h3>
                <div className="space-y-2">
                  {selectedTask.subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className="flex items-center p-3 border border-gray-200 rounded-lg"
                    >
                      <button
                        onClick={() =>
                          handleToggleSubtask(selectedTask.id, subtask.id)
                        }
                        className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                          subtask.completed
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        {subtask.completed && (
                          <CheckCircle size={14} className="text-white" />
                        )}
                      </button>
                      <span
                        className={`flex-1 ${
                          subtask.completed
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {subtask.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {selectedTask.tags && selectedTask.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-200 flex justify-end space-x-4">
              {selectedTask.status === "pending" && (
                <button
                  onClick={() => {
                    handleStartTask(selectedTask.id);
                    setShowTaskDetails(false);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Task
                </button>
              )}
              {selectedTask.status === "in-progress" && (
                <button
                  onClick={() => {
                    handleCompleteTask(selectedTask.id);
                    setShowTaskDetails(false);
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Mark Complete
                </button>
              )}
              <button
                onClick={() => {
                  handleEditTask(selectedTask);
                  setShowTaskDetails(false);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Edit Task
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout role="employee">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-600">Manage your daily tasks and assignments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Task List</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowFilter(true)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center transition-colors"
                >
                  <Filter size={18} className="mr-2" />
                  Filter
                </button>
                <button
                  onClick={() => setShowNewTask(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  New Task
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => handleViewTaskDetails(task)}
                        className="flex items-center space-x-4 flex-1 text-left"
                      >
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {task.title}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500">
                              {task.project}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                task.priority
                              )}`}
                            >
                              {task.priority} priority
                            </span>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar size={14} className="mr-1" /> Due:{" "}
                              {task.dueDisplay}
                            </span>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      {task.status === "pending" && (
                        <button
                          onClick={() => handleStartTask(task.id)}
                          className="px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors"
                        >
                          Start
                        </button>
                      )}
                      {task.status === "in-progress" && (
                        <button
                          onClick={() => handleCompleteTask(task.id)}
                          className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => handleEditTask(task)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={() =>
                          setExpandedTask(
                            expandedTask === task.id ? null : task.id
                          )
                        }
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {expandedTask === task.id ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedTask === task.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-700 mb-3">{task.description}</p>

                      {task.subtasks.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Subtasks:
                          </h4>
                          <div className="space-y-2">
                            {task.subtasks.map((subtask) => (
                              <div
                                key={subtask.id}
                                className="flex items-center"
                              >
                                <button
                                  onClick={() =>
                                    handleToggleSubtask(task.id, subtask.id)
                                  }
                                  className={`w-4 h-4 rounded border mr-2 flex items-center justify-center ${
                                    subtask.completed
                                      ? "bg-green-500 border-green-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {subtask.completed && (
                                    <CheckCircle
                                      size={10}
                                      className="text-white"
                                    />
                                  )}
                                </button>
                                <span
                                  className={`text-sm ${
                                    subtask.completed
                                      ? "line-through text-gray-500"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {subtask.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {task.tags && task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Task Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Task Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Tasks</span>
                <span className="font-bold">{taskStats.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed</span>
                <span className="font-bold text-green-600">
                  {taskStats.completed}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">In Progress</span>
                <span className="font-bold text-blue-600">
                  {taskStats.inProgress}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending</span>
                <span className="font-bold text-red-600">
                  {taskStats.pending}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  const todayTasks = tasks.filter(
                    (t) => t.dueDisplay === "Today"
                  );
                  alert(`You have ${todayTasks.length} tasks due today!`);
                }}
                className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-lg text-left transition-colors"
              >
                View Today's Tasks
              </button>
              <button
                onClick={() => alert("Set your daily goals in the popup")}
                className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-lg text-left transition-colors"
              >
                Set Daily Goals
              </button>
              <button
                onClick={() =>
                  alert("Request deadline extension popup will open")
                }
                className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-lg text-left transition-colors"
              >
                Request Deadline Extension
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="text-sm">
                    Completed "Team meeting preparation"
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="text-sm">Started "Code review for feature X"</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="text-sm">
                    Created new task "Client presentation"
                  </p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      {showNewTask && <NewTaskPopup />}
      {showFilter && <FilterPopup />}
      {showTaskDetails && <TaskDetailsPopup />}
    </DashboardLayout>
  );
};

export default EmployeeTasks;
