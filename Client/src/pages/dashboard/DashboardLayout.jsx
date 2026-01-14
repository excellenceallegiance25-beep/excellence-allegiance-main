// src/components/dashboard/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  Settings,
  Database,
  FileText,
  LogOut,
  Bell,
  User,
  Calendar,
  HelpCircle,
  Folder,
  CheckSquare,
  Clock,
  DollarSign,
  BarChart3,
  TrendingUp,
  CheckCircle,
  Menu,
  X,
  Search,
  ChevronDown,
  Home,
  Mail,
  Shield,
  Briefcase,
  Target,
  Award,
  PieChart,
  GitBranch,
  MessageSquare,
  FileBarChart,
  ClipboardCheck,
  Truck,
  Package,
  ShoppingCart,
  CreditCard,
  Building,
  Users2,
  DatabaseZap,
  ShieldCheck,
  BellRing,
  FileCheck,
  TrendingUp as TrendingUpIcon,
  Wallet,
  Target as TargetIcon,
  Trophy,
  CalendarDays,
  Mailbox,
  LifeBuoy,
  Cog,
  Sun,
  Moon,
  ChevronRight,
  Activity,
  Zap,
  Star,
  Eye,
  EyeOff,
  BellOff,
  Plus,
  Grid,
  Filter,
  Download,
  Upload,
  RefreshCw,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Info,
  AlertCircle,
  Check,
  XCircle,
  Lock,
  Unlock,
  UserPlus,
  DownloadCloud,
  UploadCloud,
  ShieldAlert,
  FileSpreadsheet,
  BarChart,
  LineChart,
  PieChart as PieChartIcon,
  Globe,
  Smartphone,
  Monitor,
  Server,
  Cpu,
  HardDrive,
  Network,
  Cloud,
  Database as DatabaseIcon,
  Key,
  QrCode,
  Fingerprint,
  Smartphone as Mobile,
  Tablet,
  Laptop,
  Headphones,
  Mic,
  Camera,
  Video,
  Music,
  Image,
  Film,
  Book,
  BookOpen,
  PenTool,
  PaintBucket,
  Code,
  Terminal,
  GitPullRequest,
  GitCommit,
  GitMerge,
  GitBranch as GitBranchIcon,
  GitPullRequest as GitPullRequestIcon,
  GitMerge as GitMergeIcon,
  GitCommit as GitCommitIcon,
  Settings2,
  Sliders,
  ToggleLeft,
  ToggleRight,
  BellDot,
} from "lucide-react";

const DashboardLayout = ({ children, role = "employee" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModule, setActiveModule] = useState("dashboard");

  useEffect(() => {
    // Set active module based on current route
    const path = location.pathname.split("/")[2] || "dashboard";
    setActiveModule(path);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You can add logic to persist dark mode preference
  };

  // Role-based sidebar items with better organization
  const sidebarModules = {
    admin: {
      "Core Modules": [
        {
          icon: <LayoutDashboard size={20} />,
          label: "Dashboard",
          path: "/admin/dashboard",
          badge: null,
          new: false,
        },
        {
          icon: <Users2 size={20} />,
          label: "User Management",
          path: "/admin/users",
          badge: "24",
          new: false,
        },
        {
          icon: <DatabaseZap size={20} />,
          label: "Database",
          path: "/admin/database",
          badge: null,
          new: true,
        },
        {
          icon: <FileBarChart size={20} />,
          label: "Analytics",
          path: "/admin/analytics",
          badge: "12",
          new: false,
        },
      ],
      "Security & Settings": [
        {
          icon: <ShieldCheck size={20} />,
          label: "Security",
          path: "/admin/security",
          badge: "3",
          new: false,
        },
        {
          icon: <Settings2 size={20} />,
          label: "System Settings",
          path: "/admin/settings",
          badge: null,
          new: false,
        },
        {
          icon: <FileText size={20} />,
          label: "Audit Logs",
          path: "/admin/audit",
          badge: "156",
          new: false,
        },
        {
          icon: <BellDot size={20} />,
          label: "Notifications",
          path: "/admin/notifications",
          badge: "5",
          new: false,
        },
      ],
      "Tools & Utilities": [
        {
          icon: <Terminal size={20} />,
          label: "Developer Tools",
          path: "/admin/dev-tools",
          badge: null,
          new: false,
        },
        {
          icon: <Server size={20} />,
          label: "Server Status",
          path: "/admin/server",
          badge: null,
          new: false,
        },
        {
          icon: <BarChart size={20} />,
          label: "Reports",
          path: "/admin/reports",
          badge: "8",
          new: false,
        },
      ],
    },
    manager: {
      "Team Management": [
        {
          icon: <LayoutDashboard size={20} />,
          label: "Dashboard",
          path: "/manager/dashboard",
          badge: null,
          new: false,
        },
        {
          icon: <Users2 size={20} />,
          label: "Team",
          path: "/manager/team",
          badge: "15",
          new: false,
        },
        {
          icon: <Folder size={20} />,
          label: "Projects",
          path: "/manager/projects",
          badge: "8",
          new: true,
        },
        {
          icon: <ClipboardCheck size={20} />,
          label: "Tasks",
          path: "/manager/tasks",
          badge: "42",
          new: false,
        },
      ],
      "Performance & Reports": [
        {
          icon: <CheckCircle size={20} />,
          label: "Approvals",
          path: "/manager/approvals",
          badge: "7",
          new: false,
        },
        {
          icon: <FileBarChart size={20} />,
          label: "Reports",
          path: "/manager/reports",
          badge: null,
          new: false,
        },
        {
          icon: <TrendingUpIcon size={20} />,
          label: "Performance",
          path: "/manager/performance",
          badge: null,
          new: false,
        },
        {
          icon: <Wallet size={20} />,
          label: "Budget",
          path: "/manager/budget",
          badge: "$45K",
          new: false,
        },
      ],
      "Planning & Strategy": [
        {
          icon: <TargetIcon size={20} />,
          label: "Goals",
          path: "/manager/goals",
          badge: null,
          new: false,
        },
        {
          icon: <CalendarDays size={20} />,
          label: "Calendar",
          path: "/manager/calendar",
          badge: "3",
          new: false,
        },
        {
          icon: <PieChartIcon size={20} />,
          label: "Analytics",
          path: "/manager/analytics",
          badge: null,
          new: false,
        },
      ],
    },
    employee: {
      "My Workspace": [
        {
          icon: <LayoutDashboard size={20} />,
          label: "Dashboard",
          path: "/employee/dashboard",
          badge: null,
          new: false,
        },
        {
          icon: <Clock size={20} />,
          label: "Attendance",
          path: "/employee/attendance",
          badge: "Present",
          new: false,
        },
        {
          icon: <DollarSign size={20} />,
          label: "Payroll",
          path: "/employee/payroll",
          badge: "Paid",
          new: false,
        },
        {
          icon: <TargetIcon size={20} />,
          label: "Goals",
          path: "/employee/goals",
          badge: "4/8",
          new: false,
        },
      ],
      "Performance & Growth": [
        {
          icon: <Trophy size={20} />,
          label: "Performance",
          path: "/employee/performance",
          badge: "92%",
          new: false,
        },
        {
          icon: <CalendarDays size={20} />,
          label: "Calendar",
          path: "/employee/calendar",
          badge: "3",
          new: false,
        },
        {
          icon: <FileCheck size={20} />,
          label: "Documents",
          path: "/employee/documents",
          badge: "12",
          new: false,
        },
        {
          icon: <Award size={20} />,
          label: "Achievements",
          path: "/employee/achievements",
          badge: "5",
          new: false,
        },
      ],
      "Tools & Resources": [
        {
          icon: <MessageSquare size={20} />,
          label: "Messages",
          path: "/employee/messages",
          badge: "3",
          new: false,
        },
        {
          icon: <BookOpen size={20} />,
          label: "Training",
          path: "/employee/training",
          badge: "New",
          new: true,
        },
        {
          icon: <HelpCircle size={20} />,
          label: "Help Desk",
          path: "/employee/help",
          badge: null,
          new: false,
        },
      ],
    },
  };

  // Common navigation items
  const commonItems = [
    {
      icon: <Cog size={20} />,
      label: "Account Settings",
      path: `/${role}/settings`,
    },
    {
      icon: <LifeBuoy size={20} />,
      label: "Support Center",
      path: "/support",
    },
  ];

  // Sample notifications with better organization
  const notifications = [
    {
      id: 1,
      title: "New Task Assigned",
      message: '"Website Redesign" project assigned to you',
      time: "10 min ago",
      read: false,
      type: "task",
      priority: "high",
      icon: <CheckSquare size={16} />,
      color: "blue",
    },
    {
      id: 2,
      title: "Meeting in 30 mins",
      message: "Team sync-up in Conference Room B",
      time: "30 min ago",
      read: true,
      type: "meeting",
      priority: "medium",
      icon: <Calendar size={16} />,
      color: "green",
    },
    {
      id: 3,
      title: "Salary Credited",
      message: "January salary has been deposited",
      time: "2 hours ago",
      read: true,
      type: "payroll",
      priority: "info",
      icon: <DollarSign size={16} />,
      color: "yellow",
    },
    {
      id: 4,
      title: "Project Deadline",
      message: "E-commerce project due in 3 days",
      time: "5 hours ago",
      read: false,
      type: "deadline",
      priority: "high",
      icon: <Clock size={16} />,
      color: "red",
    },
    {
      id: 5,
      title: "System Update",
      message: "Scheduled maintenance tonight at 2 AM",
      time: "1 day ago",
      read: true,
      type: "system",
      priority: "medium",
      icon: <Server size={16} />,
      color: "purple",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Quick stats based on role
  const quickStats = {
    admin: [
      { label: "Active Users", value: "247", change: "+12%", trend: "up" },
      { label: "System Health", value: "98%", change: "+2%", trend: "up" },
      { label: "Pending Tasks", value: "18", change: "-4", trend: "down" },
      { label: "Revenue", value: "$45.2K", change: "+18%", trend: "up" },
    ],
    manager: [
      { label: "Team Members", value: "15", change: "+2", trend: "up" },
      { label: "Active Projects", value: "8", change: "+1", trend: "up" },
      { label: "Tasks Due", value: "23", change: "-5", trend: "down" },
      { label: "Budget Used", value: "78%", change: "+8%", trend: "up" },
    ],
    employee: [
      { label: "Tasks Today", value: "8", change: "+2", trend: "up" },
      { label: "Hours Logged", value: "6.5", change: "+0.5", trend: "up" },
      { label: "Goals Met", value: "4/8", change: "+1", trend: "up" },
      { label: "Performance", value: "92%", change: "+5%", trend: "up" },
    ],
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex transition-colors duration-300">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Modern Glassmorphism */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            lg:translate-x-0 lg:static lg:w-80
            border-r border-gray-200/50 dark:border-gray-700/50
            shadow-2xl lg:shadow-none
          `}
        >
          {/* Logo & Brand Section */}
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ExcellencePro
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {role.charAt(0).toUpperCase() + role.slice(1)} Portal
                  </p>
                </div>
              </div>
              <button
                className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/30">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        {user?.name?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white dark:border-gray-900 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {user?.name || "John Doe"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {user?.email || "john@excellencepro.com"}
                      </p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <Edit
                        size={16}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </button>
                  </div>

                  {/* User Badge & ID */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 font-medium rounded-full border border-blue-200 dark:border-blue-700/30">
                      {user?.role?.toUpperCase() || role.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ID:
                      </span>
                      <span className="text-xs font-mono font-bold bg-gray-800 text-gray-100 px-3 py-1.5 rounded-lg">
                        {user?.userId ||
                          (role === "admin"
                            ? "ADM-001"
                            : role === "manager"
                            ? "MGR-001"
                            : "EMP-001")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {quickStats[role]?.map((stat, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30"
                >
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <div className="flex items-end justify-between">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <span
                      className={`text-xs font-medium ${
                        stat.trend === "up"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {stat.trend === "up" ? "↗" : "↘"} {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-6">
              {Object.entries(sidebarModules[role] || {}).map(
                ([section, items]) => (
                  <div key={section}>
                    <p className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      {section}
                    </p>
                    <div className="space-y-1">
                      {items.map((item, index) => {
                        const isActive =
                          activeModule === item.path.split("/")[2];
                        return (
                          <Link
                            key={index}
                            to={item.path}
                            className={`
                            group flex items-center justify-between p-3 rounded-xl transition-all duration-200
                            ${
                              isActive
                                ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-700/30 shadow-sm"
                                : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/30"
                            }
                          `}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  isActive
                                    ? "bg-blue-500/20 dark:bg-blue-500/30 text-blue-600 dark:text-blue-400"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                                }`}
                              >
                                {item.icon}
                              </div>
                              <span className="font-medium">{item.label}</span>
                              {item.new && (
                                <span className="px-1.5 py-0.5 text-xs font-medium bg-green-500 text-white rounded">
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {item.badge && (
                                <span
                                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                    isActive
                                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                              <ChevronRight
                                size={16}
                                className={`transition-transform ${
                                  isActive
                                    ? "text-blue-500 dark:text-blue-400"
                                    : "text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                                } ${isActive ? "rotate-90" : ""}`}
                              />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Common Actions */}
            <div className="mt-8 space-y-1">
              {commonItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center space-x-3 p-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Support Card */}
            <div className="mt-8 px-3">
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/30">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <LifeBuoy
                      size={20}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white mb-1">
                      Need Assistance?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Our support team is here 24/7
                    </p>
                    <div className="flex space-x-2">
                      <Link
                        to="/support"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
                      >
                        Contact Support
                      </Link>
                      <span className="text-gray-400">•</span>
                      <a
                        href="tel:+8801234567890"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                      >
                        +880 1234 567890
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Footer & Logout */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {darkMode ? (
                  <>
                    <Sun size={20} className="text-yellow-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Light Mode
                    </span>
                  </>
                ) : (
                  <>
                    <Moon size={20} className="text-indigo-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Dark Mode
                    </span>
                  </>
                )}
              </button>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                v2.1.4
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-2 w-full p-3 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 text-red-600 dark:text-red-400 font-medium transition-all duration-200 border border-red-200 dark:border-red-800/30 hover:border-red-300 dark:hover:border-red-700/50"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Sticky Header */}
          <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              {/* Left Section */}
              <div className="flex items-center space-x-4">
                <button
                  className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu
                    size={24}
                    className="text-gray-600 dark:text-gray-400"
                  />
                </button>

                {/* Breadcrumb */}
                <div className="hidden md:flex items-center space-x-2 text-sm">
                  <Link
                    to="/"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Home size={16} />
                  </Link>
                  <ChevronRight size={14} className="text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300 capitalize">
                    {role}
                  </span>
                  <ChevronRight size={14} className="text-gray-400" />
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {location.pathname.split("/").pop()?.replace("-", " ") ||
                      "Dashboard"}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="hidden md:flex items-center space-x-2">
                  <button className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-1">
                    <Plus size={14} />
                    <span>New</span>
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center space-x-1">
                    <Download size={14} />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search modules, documents, users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-72 bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-700/50 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Search Button (Mobile) */}
                <button className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Search
                    size={20}
                    className="text-gray-600 dark:text-gray-400"
                  />
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                  >
                    <Bell
                      size={20}
                      className="text-gray-600 dark:text-gray-400"
                    />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </button>

                  {notificationsOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setNotificationsOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-96 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 overflow-hidden">
                        <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              Notifications
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                                {unreadCount} new
                              </span>
                              <button className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                Mark all read
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors ${
                                !notification.read
                                  ? "bg-blue-50/50 dark:bg-blue-900/20"
                                  : ""
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div
                                  className={`p-2 rounded-lg ${
                                    notification.color === "blue"
                                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                      : notification.color === "green"
                                      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                      : notification.color === "red"
                                      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                                      : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                  }`}
                                >
                                  {notification.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                      {notification.title}
                                    </p>
                                    <span className="text-xs text-gray-500">
                                      {notification.time}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center space-x-3 mt-2">
                                    <span
                                      className={`text-xs px-2 py-1 rounded-full ${
                                        notification.priority === "high"
                                          ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                                          : notification.priority === "medium"
                                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                      }`}
                                    >
                                      {notification.priority}
                                    </span>
                                    {!notification.read && (
                                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                          <Link
                            to={`/${role}/notifications`}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center justify-center"
                          >
                            View all notifications
                            <ChevronRight size={14} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors border border-gray-200/50 dark:border-gray-700/50"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center overflow-hidden">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold text-white">
                          {user?.name?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.name?.split(" ")[0] || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.department?.split(" ")[0] || role}
                      </p>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 overflow-hidden">
                        <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center overflow-hidden">
                              {user?.avatar ? (
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-lg font-bold text-white">
                                  {user?.name?.charAt(0) || "U"}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {user?.name || "User Name"}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {user?.email || "user@excellencepro.com"}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                                  {user?.role || role}
                                </span>
                                <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
                                  {user?.userId ||
                                    (role === "admin"
                                      ? "ADM-001"
                                      : role === "manager"
                                      ? "MGR-001"
                                      : "EMP-001")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <Link
                            to={`/${role}/profile`}
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition-colors"
                            onClick={() => setProfileOpen(false)}
                          >
                            <User size={18} />
                            <span>My Profile</span>
                          </Link>
                          <Link
                            to={`/${role}/settings`}
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition-colors"
                            onClick={() => setProfileOpen(false)}
                          >
                            <Cog size={18} />
                            <span>Settings</span>
                          </Link>
                          <Link
                            to="/help"
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition-colors"
                            onClick={() => setProfileOpen(false)}
                          >
                            <HelpCircle size={18} />
                            <span>Help & Support</span>
                          </Link>
                          <div className="border-t border-gray-200/50 dark:border-gray-700/50 my-2"></div>
                          <button
                            onClick={toggleDarkMode}
                            className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition-colors"
                          >
                            {darkMode ? (
                              <>
                                <Sun size={18} />
                                <span>Light Mode</span>
                              </>
                            ) : (
                              <>
                                <Moon size={18} />
                                <span>Dark Mode</span>
                              </>
                            )}
                          </button>
                          <div className="border-t border-gray-200/50 dark:border-gray-700/50 my-2"></div>
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <LogOut size={18} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-900/50 dark:to-transparent">
            {/* Decorative elements */}
            <div className="fixed top-0 left-0 right-0 h-96 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

            {/* Content Container with subtle animations */}
            <div className="relative z-10 p-4 md:p-6 animate-fadeIn">
              <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-6 md:mb-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Here's what's happening with your account today.
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                        <CalendarDays size={16} />
                        <span>Today: {new Date().toLocaleDateString()}</span>
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <RefreshCw
                          size={18}
                          className="text-gray-600 dark:text-gray-400"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-4 md:p-6">
                  {children}
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    ExcellencePro Dashboard v2.1.4 • ©{" "}
                    {new Date().getFullYear()} Excellence Allegiance Ltd.
                  </p>
                  <p className="mt-1">
                    Last login: {new Date().toLocaleString()} • System status:{" "}
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      All systems operational
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
