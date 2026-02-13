import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "./DashboardLayout";
import {
  BookOpen,
  Video,
  Award,
  Clock,
  TrendingUp,
  CheckCircle,
  PlayCircle,
  Download,
  Share2,
  Filter,
  Search,
  Star,
  Users,
  Calendar,
  Target,
  BarChart3,
  ChevronRight,
  Plus,
  Eye,
  MessageSquare,
  Zap,
  Book,
  GraduationCap,
  Code,
  Database,
  Globe,
  Smartphone,
  Cloud,
  Shield,
  DollarSign,
} from "lucide-react";

const EmployeeTraining = () => {
  const { user } = useAuth();
  const [trainings, setTrainings] = useState([]);
  const [enrolledTrainings, setEnrolledTrainings] = useState([]);
  const [completedTrainings, setCompletedTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);

  // Mock data
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const mockTrainings = [
        {
          id: 1,
          title: "Advanced React Development",
          description:
            "Master advanced React patterns, hooks, and performance optimization",
          category: "technical",
          level: "advanced",
          duration: "8 hours",
          format: "video",
          instructor: "Alex Johnson",
          rating: 4.8,
          students: 1245,
          price: 0,
          featured: true,
          skills: ["React", "JavaScript", "Performance"],
          progress: 0,
          enrolled: false,
        },
        {
          id: 2,
          title: "Leadership Skills for Managers",
          description:
            "Develop essential leadership skills for effective team management",
          category: "leadership",
          level: "intermediate",
          duration: "6 hours",
          format: "interactive",
          instructor: "Sarah Williams",
          rating: 4.9,
          students: 892,
          price: 0,
          featured: true,
          skills: ["Leadership", "Management", "Communication"],
          progress: 0,
          enrolled: false,
        },
        {
          id: 3,
          title: "AWS Cloud Practitioner",
          description: "Learn AWS fundamentals and prepare for certification",
          category: "cloud",
          level: "beginner",
          duration: "10 hours",
          format: "video",
          instructor: "Mike Chen",
          rating: 4.7,
          students: 2156,
          price: 99,
          featured: false,
          skills: ["AWS", "Cloud", "DevOps"],
          progress: 0,
          enrolled: false,
        },
        {
          id: 4,
          title: "Data Analysis with Python",
          description: "Learn data analysis techniques using Python and pandas",
          category: "data",
          level: "intermediate",
          duration: "12 hours",
          format: "hands-on",
          instructor: "Emma Davis",
          rating: 4.6,
          students: 1567,
          price: 0,
          featured: false,
          skills: ["Python", "Pandas", "Data Analysis"],
          progress: 0,
          enrolled: false,
        },
        {
          id: 5,
          title: "Effective Communication",
          description:
            "Improve workplace communication and presentation skills",
          category: "soft-skills",
          level: "beginner",
          duration: "4 hours",
          format: "interactive",
          instructor: "Robert Wilson",
          rating: 4.5,
          students: 987,
          price: 0,
          featured: false,
          skills: ["Communication", "Presentation", "Soft Skills"],
          progress: 0,
          enrolled: false,
        },
        {
          id: 6,
          title: "Cybersecurity Fundamentals",
          description:
            "Understand basic cybersecurity principles and best practices",
          category: "security",
          level: "beginner",
          duration: "5 hours",
          format: "video",
          instructor: "Lisa Brown",
          rating: 4.4,
          students: 745,
          price: 149,
          featured: false,
          skills: ["Security", "Cybersecurity", "Best Practices"],
          progress: 0,
          enrolled: false,
        },
      ];

      const mockEnrolled = [
        {
          ...mockTrainings[0],
          enrolled: true,
          progress: 65,
          startDate: "2024-03-01",
          dueDate: "2024-04-01",
          modules: [
            {
              id: 1,
              title: "Introduction to React",
              completed: true,
              duration: "45 min",
            },
            {
              id: 2,
              title: "Advanced Hooks",
              completed: true,
              duration: "60 min",
            },
            {
              id: 3,
              title: "Performance Optimization",
              completed: false,
              duration: "75 min",
            },
            {
              id: 4,
              title: "State Management",
              completed: false,
              duration: "90 min",
            },
          ],
        },
        {
          ...mockTrainings[3],
          enrolled: true,
          progress: 30,
          startDate: "2024-03-15",
          dueDate: "2024-05-15",
          modules: [
            {
              id: 1,
              title: "Python Basics",
              completed: true,
              duration: "60 min",
            },
            {
              id: 2,
              title: "Pandas Introduction",
              completed: true,
              duration: "90 min",
            },
            {
              id: 3,
              title: "Data Visualization",
              completed: false,
              duration: "120 min",
            },
            {
              id: 4,
              title: "Advanced Analysis",
              completed: false,
              duration: "150 min",
            },
          ],
        },
      ];

      const mockCompleted = [
        {
          id: 7,
          title: "Project Management Fundamentals",
          description: "Learn basic project management principles and tools",
          category: "management",
          level: "beginner",
          duration: "6 hours",
          format: "video",
          instructor: "David Miller",
          rating: 4.3,
          students: 1123,
          price: 0,
          progress: 100,
          completedDate: "2024-02-28",
          certificate: true,
        },
      ];

      setTrainings(mockTrainings.filter((t) => !t.enrolled));
      setEnrolledTrainings(mockEnrolled);
      setCompletedTrainings(mockCompleted);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = [
    {
      id: "all",
      name: "All Courses",
      icon: <BookOpen />,
      count: trainings.length + enrolledTrainings.length,
    },
    {
      id: "technical",
      name: "Technical",
      icon: <Code />,
      count: trainings.filter((t) => t.category === "technical").length,
    },
    {
      id: "leadership",
      name: "Leadership",
      icon: <Users />,
      count: trainings.filter((t) => t.category === "leadership").length,
    },
    {
      id: "cloud",
      name: "Cloud",
      icon: <Cloud />,
      count: trainings.filter((t) => t.category === "cloud").length,
    },
    {
      id: "data",
      name: "Data",
      icon: <Database />,
      count: trainings.filter((t) => t.category === "data").length,
    },
    {
      id: "soft-skills",
      name: "Soft Skills",
      icon: <MessageSquare />,
      count: trainings.filter((t) => t.category === "soft-skills").length,
    },
  ];

  const handleEnroll = (training) => {
    setSelectedTraining(training);
    setShowEnrollModal(true);
  };

  const confirmEnroll = () => {
    if (!selectedTraining) return;

    const enrolledTraining = {
      ...selectedTraining,
      enrolled: true,
      progress: 0,
      startDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      modules: [
        { id: 1, title: "Introduction", completed: false, duration: "30 min" },
        { id: 2, title: "Module 1", completed: false, duration: "60 min" },
        { id: 3, title: "Module 2", completed: false, duration: "60 min" },
        {
          id: 4,
          title: "Final Assessment",
          completed: false,
          duration: "30 min",
        },
      ],
    };

    setEnrolledTrainings([...enrolledTrainings, enrolledTraining]);
    setTrainings(trainings.filter((t) => t.id !== selectedTraining.id));
    setShowEnrollModal(false);
    setSelectedTraining(null);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "technical":
        return <Code className="w-5 h-5" />;
      case "leadership":
        return <Users className="w-5 h-5" />;
      case "cloud":
        return <Cloud className="w-5 h-5" />;
      case "data":
        return <Database className="w-5 h-5" />;
      case "soft-skills":
        return <MessageSquare className="w-5 h-5" />;
      case "security":
        return <Shield className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const filteredTrainings = trainings.filter((training) => {
    if (filter !== "all" && training.category !== filter) return false;
    if (
      searchQuery &&
      !training.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const stats = {
    totalCourses:
      trainings.length + enrolledTrainings.length + completedTrainings.length,
    enrolled: enrolledTrainings.length,
    completed: completedTrainings.length,
    avgProgress:
      enrolledTrainings.length > 0
        ? enrolledTrainings.reduce((sum, t) => sum + t.progress, 0) /
          enrolledTrainings.length
        : 0,
    learningHours: enrolledTrainings.reduce((sum, t) => {
      const hours = parseInt(t.duration.split(" ")[0]);
      return sum + (hours * t.progress) / 100;
    }, 0),
  };

  return (
    <DashboardLayout role="employee">
      <div className="w-full h-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Training & Development
              </h1>
              <p className="text-gray-600 mt-2">
                Enhance your skills with professional training courses
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                Transcript
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Request Course
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Enrolled Courses</p>
                  <p className="text-3xl font-bold">{stats.enrolled}</p>
                </div>
                <BookOpen className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Completed</p>
                  <p className="text-3xl font-bold">{stats.completed}</p>
                </div>
                <CheckCircle className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Avg Progress</p>
                  <p className="text-3xl font-bold">
                    {stats.avgProgress.toFixed(0)}%
                  </p>
                </div>
                <TrendingUp className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Learning Hours</p>
                  <p className="text-3xl font-bold">
                    {stats.learningHours.toFixed(1)}h
                  </p>
                </div>
                <Clock className="w-10 h-10 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-6">
          <div className="flex overflow-x-auto gap-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap ${
                  filter === category.id
                    ? "bg-blue-100 text-blue-700"
                    : "bg-white border hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    filter === category.id ? "bg-blue-200" : "bg-gray-100"
                  }`}
                >
                  {category.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium">{category.name}</div>
                  <div className="text-xs">{category.count} courses</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border p-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Available Courses
                  </h2>
                  <p className="text-gray-600">
                    Browse and enroll in new training courses
                  </p>
                </div>

                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading courses...</p>
                </div>
              </div>
            ) : filteredTrainings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border">
                <div className="text-gray-400 mb-4">
                  <BookOpen className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-600">
                  Try different search terms or categories
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTrainings.map((training) => (
                  <div
                    key={training.id}
                    className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          {getCategoryIcon(training.category)}
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                              training.level
                            )}`}
                          >
                            {training.level}
                          </span>
                          {training.featured && (
                            <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      {training.price > 0 ? (
                        <div className="text-lg font-bold text-gray-900">
                          ${training.price}
                        </div>
                      ) : (
                        <div className="text-lg font-bold text-green-600">
                          Free
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {training.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{training.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{training.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {training.students.toLocaleString()} students
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span>{training.rating}</span>
                        </div>
                      </div>

                      {training.skills && (
                        <div className="flex flex-wrap gap-1">
                          {training.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEnroll(training)}
                        className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                      >
                        Enroll Now
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enrolled Courses Sidebar */}
          <div className="space-y-6">
            {/* Enrolled Courses */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                My Courses
              </h3>
              <div className="space-y-4">
                {enrolledTrainings.map((training) => (
                  <div
                    key={training.id}
                    className="p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getCategoryIcon(training.category)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {training.title}
                        </h4>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-sm text-gray-600">
                            {training.progress}% complete
                          </div>
                          <div className="text-xs text-gray-500">
                            Due: {training.dueDate}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${training.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {enrolledTrainings.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-gray-500">No enrolled courses</p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                    Browse Courses
                  </button>
                </div>
              )}
            </div>

            {/* Recommended Courses */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommended For You
              </h3>
              <div className="space-y-3">
                {trainings
                  .filter((t) => t.featured)
                  .slice(0, 2)
                  .map((training) => (
                    <div
                      key={training.id}
                      className="bg-white p-3 rounded-lg border"
                    >
                      <h4 className="font-medium text-gray-900 mb-1">
                        {training.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {training.duration}
                        </span>
                        <button
                          onClick={() => handleEnroll(training)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Enroll →
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Learning Stats */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Learning Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Courses Completed</span>
                  <span className="font-medium">{stats.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Completion Time</span>
                  <span className="font-medium">15 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificates Earned</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Skill Points</span>
                  <span className="font-medium">1,250</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enroll Modal */}
        {showEnrollModal && selectedTraining && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Enroll in Course
                </h3>
                <button
                  onClick={() => {
                    setShowEnrollModal(false);
                    setSelectedTraining(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ✕
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🎓</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedTraining.title}
                </h4>
                <p className="text-gray-600">
                  Are you sure you want to enroll in this course?
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {selectedTraining.duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                      selectedTraining.level
                    )}`}
                  >
                    {selectedTraining.level}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format</span>
                  <span className="font-medium">{selectedTraining.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Instructor</span>
                  <span className="font-medium">
                    {selectedTraining.instructor}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowEnrollModal(false);
                    setSelectedTraining(null);
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmEnroll}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Confirm Enrollment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmployeeTraining;
