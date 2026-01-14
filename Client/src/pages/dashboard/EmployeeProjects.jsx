// src/pages/dashboard/EmployeeProjects.jsx
import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import {
  Folder,
  Users,
  Calendar,
  TrendingUp,
  X,
  Clock,
  Target,
  DollarSign,
  FileText,
  Link,
  Settings,
  Edit,
  Trash2,
  Plus,
  Upload,
} from "lucide-react";

const EmployeeProjects = () => {
  const [showNewProject, setShowNewProject] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      description: "Complete redesign of company website with modern UI/UX",
      status: "In Progress",
      priority: "High",
      progress: 75,
      team: 5,
      budget: 15000,
      startDate: "2024-01-15",
      deadline: "2024-02-20",
      client: "Internal",
      category: "Design",
      tags: ["UI/UX", "Frontend", "Responsive"],
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Cross-platform mobile app for customer engagement",
      status: "Active",
      priority: "High",
      progress: 45,
      team: 8,
      budget: 25000,
      startDate: "2024-02-01",
      deadline: "2024-03-10",
      client: "TechCorp Inc.",
      category: "Development",
      tags: ["React Native", "Backend", "API"],
    },
    {
      id: 3,
      name: "E-commerce Platform",
      description: "Full-featured e-commerce platform with payment integration",
      status: "Active",
      priority: "Medium",
      progress: 90,
      team: 12,
      budget: 35000,
      startDate: "2024-01-10",
      deadline: "2024-02-25",
      client: "Retail Solutions",
      category: "Development",
      tags: ["E-commerce", "Payment", "Database"],
    },
    {
      id: 4,
      name: "Admin Dashboard",
      description: "Admin dashboard for internal operations management",
      status: "Planning",
      priority: "Low",
      progress: 30,
      team: 3,
      budget: 8000,
      startDate: "2024-02-15",
      deadline: "2024-03-15",
      client: "Internal",
      category: "Development",
      tags: ["Dashboard", "Analytics", "Admin"],
    },
    {
      id: 5,
      name: "API Integration",
      description: "Third-party API integration for payment and shipping",
      status: "Completed",
      priority: "Medium",
      progress: 100,
      team: 4,
      budget: 12000,
      startDate: "2024-01-05",
      deadline: "2024-02-10",
      client: "Logistics Co.",
      category: "Integration",
      tags: ["API", "Integration", "Payment"],
    },
  ]);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    category: "development",
    priority: "medium",
    budget: "",
    startDate: "",
    deadline: "",
    client: "",
    teamSize: "",
    tags: [],
  });

  const [currentTag, setCurrentTag] = useState("");

  const categories = [
    { value: "development", label: "Development" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "research", label: "Research" },
    { value: "support", label: "Support" },
    { value: "infrastructure", label: "Infrastructure" },
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-gray-100 text-gray-800" },
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
    { value: "planning", label: "Planning" },
    { value: "active", label: "Active" },
    { value: "in-progress", label: "In Progress" },
    { value: "review", label: "Review" },
    { value: "completed", label: "Completed" },
    { value: "on-hold", label: "On Hold" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Active":
        return "bg-yellow-100 text-yellow-800";
      case "Planning":
        return "bg-gray-100 text-gray-800";
      case "Review":
        return "bg-purple-100 text-purple-800";
      case "On Hold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find(
      (p) => p.label.toLowerCase() === priority.toLowerCase()
    );
    return priorityObj ? priorityObj.color : "bg-gray-100 text-gray-800";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !newProject.tags.includes(currentTag.trim())) {
      setNewProject((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setNewProject((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();

    const projectData = {
      id: editingProject ? editingProject.id : Date.now(),
      name: newProject.name,
      description: newProject.description,
      category: newProject.category,
      priority: newProject.priority,
      budget: parseFloat(newProject.budget),
      startDate: newProject.startDate,
      deadline: newProject.deadline,
      client: newProject.client,
      teamSize: parseInt(newProject.teamSize),
      tags: newProject.tags,
      status: "Planning",
      progress: 0,
      team: parseInt(newProject.teamSize),
    };

    if (editingProject) {
      // Update existing project
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id ? { ...p, ...projectData } : p
        )
      );
    } else {
      // Add new project
      setProjects((prev) => [projectData, ...prev]);
    }

    // Reset form
    setNewProject({
      name: "",
      description: "",
      category: "development",
      priority: "medium",
      budget: "",
      startDate: "",
      deadline: "",
      client: "",
      teamSize: "",
      tags: [],
    });
    setEditingProject(null);
    setShowNewProject(false);

    alert(
      editingProject
        ? "Project updated successfully!"
        : "Project created successfully!"
    );
  };

  const handleEditProject = (project) => {
    setNewProject({
      name: project.name,
      description: project.description,
      category: project.category.toLowerCase(),
      priority: project.priority.toLowerCase(),
      budget: project.budget,
      startDate: project.startDate,
      deadline: project.deadline,
      client: project.client,
      teamSize: project.team,
      tags: project.tags || [],
    });
    setEditingProject(project);
    setShowNewProject(true);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const NewProjectPopup = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProject ? "Edit Project" : "Create New Project"}
              </h2>
              <p className="text-gray-600">
                {editingProject
                  ? "Update project details"
                  : "Fill in the details to create a new project"}
              </p>
            </div>
            <button
              onClick={() => {
                setShowNewProject(false);
                setEditingProject(null);
                setNewProject({
                  name: "",
                  description: "",
                  category: "development",
                  priority: "medium",
                  budget: "",
                  startDate: "",
                  deadline: "",
                  client: "",
                  teamSize: "",
                  tags: [],
                });
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmitProject} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newProject.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter project name"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={newProject.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {priorities.map((priority) => (
                      <label
                        key={priority.value}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          newProject.priority === priority.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={priority.value}
                          checked={newProject.priority === priority.value}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <span>{priority.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="budget"
                      value={newProject.budget}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Enter budget amount"
                    />
                  </div>
                </div>

                {/* Team Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Size *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="teamSize"
                      value={newProject.teamSize}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Number of team members"
                      required
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Describe the project objectives and scope..."
                    required
                  ></textarea>
                </div>

                {/* Client */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client/Stakeholder
                  </label>
                  <input
                    type="text"
                    name="client"
                    value={newProject.client}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Client name or department"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="startDate"
                        value={newProject.startDate}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="deadline"
                        value={newProject.deadline}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Tags */}
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

                  {/* Selected Tags */}
                  <div className="flex flex-wrap gap-2">
                    {newProject.tags.map((tag) => (
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

                {/* Attachments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachments (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                    <Upload className="mx-auto text-gray-400" size={24} />
                    <p className="mt-2 text-sm text-gray-600">
                      Upload project documents
                    </p>
                    <input
                      type="file"
                      className="mt-2 text-sm"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Max file size: 10MB each
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Requirements */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="mr-2 text-blue-600" size={20} />
                Additional Requirements
              </h3>
              <textarea
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Any specific requirements, dependencies, or constraints..."
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowNewProject(false);
                  setEditingProject(null);
                  setNewProject({
                    name: "",
                    description: "",
                    category: "development",
                    priority: "medium",
                    budget: "",
                    startDate: "",
                    deadline: "",
                    client: "",
                    teamSize: "",
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
                <Folder size={18} className="mr-2" />
                {editingProject ? "Update Project" : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout role="employee">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
        <p className="text-gray-600">Track and manage your assigned projects</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Project List
              </h2>
              <button
                onClick={() => setShowNewProject(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors"
              >
                <Plus size={18} className="mr-2" />
                New Project
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((project) => {
                const daysLeft = calculateDaysLeft(project.deadline);

                return (
                  <div
                    key={project.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Folder className="text-blue-600" size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">
                              {project.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditProject(project)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mt-1">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                project.status
                              )}`}
                            >
                              {project.status}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                project.priority
                              )}`}
                            >
                              {project.priority}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Users size={12} className="mr-1" />{" "}
                              {project.team} members
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Calendar size={12} className="mr-1" />{" "}
                              {project.deadline}
                            </span>
                            <span className="text-xs text-gray-500">
                              Budget: ${project.budget.toLocaleString()}
                            </span>
                          </div>

                          {/* Tags */}
                          {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.tags.map((tag) => (
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
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <Target size={14} className="text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Progress
                          </span>
                        </div>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>

                      {/* Deadline Warning */}
                      {daysLeft <= 7 && daysLeft > 0 && (
                        <div
                          className={`mt-2 px-3 py-1 rounded text-xs font-medium ${
                            daysLeft <= 3
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          ⏰ {daysLeft} day{daysLeft > 1 ? "s" : ""} until
                          deadline
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Project Stats */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Project Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Active Projects</span>
                <span className="text-xl font-bold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Completed</span>
                <span className="text-xl font-bold">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Tasks</span>
                <span className="text-xl font-bold">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Team Members</span>
                <span className="text-xl font-bold">8</span>
              </div>
              <div className="pt-4 border-t border-blue-500/30">
                <div className="flex justify-between items-center">
                  <span>Total Budget</span>
                  <span className="text-xl font-bold">$95,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upcoming Deadlines
            </h3>
            <div className="space-y-3">
              {projects
                .filter((p) => p.status !== "Completed")
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .slice(0, 3)
                .map((project) => {
                  const daysLeft = calculateDaysLeft(project.deadline);
                  return (
                    <div
                      key={project.id}
                      className={`p-3 border rounded-lg ${
                        daysLeft <= 3
                          ? "bg-red-50 border-red-200"
                          : daysLeft <= 7
                          ? "bg-yellow-50 border-yellow-200"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <p className="font-medium text-gray-900">
                        {project.name}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <p
                          className={`text-sm ${
                            daysLeft <= 3
                              ? "text-red-700"
                              : daysLeft <= 7
                              ? "text-yellow-700"
                              : "text-blue-700"
                          }`}
                        >
                          Due: {project.deadline} ({daysLeft} day
                          {daysLeft > 1 ? "s" : ""} left)
                        </p>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            daysLeft <= 3
                              ? "bg-red-100 text-red-800"
                              : daysLeft <= 7
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {project.priority}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition-colors">
                <div className="flex items-center">
                  <FileText size={18} className="mr-3 text-blue-600" />
                  <span>Generate Project Report</span>
                </div>
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition-colors">
                <div className="flex items-center">
                  <Link size={18} className="mr-3 text-green-600" />
                  <span>Share Project Status</span>
                </div>
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition-colors">
                <div className="flex items-center">
                  <Settings size={18} className="mr-3 text-purple-600" />
                  <span>Project Settings</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Project Popup */}
      {showNewProject && <NewProjectPopup />}
    </DashboardLayout>
  );
};

export default EmployeeProjects;
