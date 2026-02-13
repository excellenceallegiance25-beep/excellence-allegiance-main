import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "./DashboardLayout";
import {
  Trophy,
  Award,
  Star,
  Medal,
  Crown,
  Gift,
  TrendingUp,
  Target,
  Users,
  Clock,
  Calendar,
  Download,
  Share2,
  Filter,
  Search,
  Plus,
  Eye,
  MessageSquare,
  ChevronRight,
  Zap,
  Bell,
  CheckCircle,
} from "lucide-react";

const EmployeeAchievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(0);
  const [filter, setFilter] = useState("all");

  // Mock achievements data
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const mockAchievements = [
        {
          id: 1,
          title: "Perfect Attendance",
          description: "No absences or late arrivals for 3 consecutive months",
          icon: "🎯",
          points: 50,
          category: "attendance",
          dateEarned: "2024-03-15",
          type: "badge",
          rarity: "common",
          unlocked: true,
        },
        {
          id: 2,
          title: "Top Performer",
          description: "Ranked #1 in team performance for Q1 2024",
          icon: "🏆",
          points: 100,
          category: "performance",
          dateEarned: "2024-04-01",
          type: "trophy",
          rarity: "rare",
          unlocked: true,
        },
        {
          id: 3,
          title: "Team Player",
          description: "Helped 5+ team members complete their tasks",
          icon: "🤝",
          points: 30,
          category: "collaboration",
          dateEarned: "2024-03-28",
          type: "badge",
          rarity: "common",
          unlocked: true,
        },
        {
          id: 4,
          title: "Skill Master",
          description: "Completed 3 advanced technical certifications",
          icon: "🎓",
          points: 75,
          category: "learning",
          dateEarned: "2024-02-20",
          type: "certificate",
          rarity: "uncommon",
          unlocked: true,
        },
        {
          id: 5,
          title: "Project Champion",
          description:
            "Successfully led a project that exceeded targets by 20%",
          icon: "🚀",
          points: 80,
          category: "leadership",
          dateEarned: "2024-01-30",
          type: "medal",
          rarity: "rare",
          unlocked: true,
        },
        {
          id: 6,
          title: "Innovator",
          description: "Proposed 3+ process improvements that were implemented",
          icon: "💡",
          points: 40,
          category: "innovation",
          dateEarned: null,
          type: "badge",
          rarity: "uncommon",
          unlocked: false,
        },
        {
          id: 7,
          title: "Client Delight",
          description: "Received 5-star feedback from 3 different clients",
          icon: "⭐",
          points: 60,
          category: "client",
          dateEarned: null,
          type: "star",
          rarity: "rare",
          unlocked: false,
        },
        {
          id: 8,
          title: "Mentor",
          description: "Successfully mentored 2 junior team members",
          icon: "🧑‍🏫",
          points: 45,
          category: "mentorship",
          dateEarned: null,
          type: "badge",
          rarity: "common",
          unlocked: false,
        },
      ];

      setAchievements(mockAchievements);
      setPoints(
        mockAchievements
          .filter((a) => a.unlocked)
          .reduce((sum, a) => sum + a.points, 0)
      );
      setLoading(false);
    }, 1000);
  }, []);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800";
      case "uncommon":
        return "bg-green-100 text-green-800";
      case "rare":
        return "bg-blue-100 text-blue-800";
      case "epic":
        return "bg-purple-100 text-purple-800";
      case "legendary":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "trophy":
        return <Trophy className="w-5 h-5" />;
      case "medal":
        return <Medal className="w-5 h-5" />;
      case "certificate":
        return <Award className="w-5 h-5" />;
      case "badge":
        return <Star className="w-5 h-5" />;
      case "star":
        return <Star className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const filteredAchievements = achievements.filter((achievement) => {
    if (filter === "all") return true;
    if (filter === "unlocked") return achievement.unlocked;
    if (filter === "locked") return !achievement.unlocked;
    return achievement.category === filter;
  });

  const categories = [
    { id: "all", name: "All Achievements", count: achievements.length },
    {
      id: "unlocked",
      name: "Unlocked",
      count: achievements.filter((a) => a.unlocked).length,
    },
    {
      id: "locked",
      name: "Locked",
      count: achievements.filter((a) => !a.unlocked).length,
    },
    {
      id: "performance",
      name: "Performance",
      count: achievements.filter((a) => a.category === "performance").length,
    },
    {
      id: "learning",
      name: "Learning",
      count: achievements.filter((a) => a.category === "learning").length,
    },
    {
      id: "collaboration",
      name: "Collaboration",
      count: achievements.filter((a) => a.category === "collaboration").length,
    },
  ];

  return (
    <DashboardLayout role="employee">
      <div className="w-full h-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Achievements & Badges
              </h1>
              <p className="text-gray-600 mt-2">
                Celebrate your accomplishments and track your progress
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Profile
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Points and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Points</p>
                  <p className="text-3xl font-bold">{points}</p>
                </div>
                <Trophy className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Achievements</p>
                  <p className="text-3xl font-bold">
                    {achievements.filter((a) => a.unlocked).length}
                  </p>
                </div>
                <Award className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Completion</p>
                  <p className="text-3xl font-bold">
                    {Math.round(
                      (achievements.filter((a) => a.unlocked).length /
                        achievements.length) *
                        100
                    )}
                    %
                  </p>
                </div>
                <CheckCircle className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Rank</p>
                  <p className="text-3xl font-bold">#3</p>
                  <p className="text-xs opacity-90 mt-1">In Company</p>
                </div>
                <Crown className="w-10 h-10 opacity-80" />
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
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  filter === category.id
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading achievements...</p>
              </div>
            </div>
          ) : filteredAchievements.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border">
              <div className="text-gray-400 mb-4">
                <Trophy className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No achievements found
              </h3>
              <p className="text-gray-600">Try different filters</p>
            </div>
          ) : (
            filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white rounded-xl border p-6 hover:shadow-md transition-shadow ${
                  !achievement.unlocked ? "opacity-75" : ""
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`text-4xl p-3 rounded-xl ${
                        !achievement.unlocked ? "bg-gray-100" : "bg-yellow-50"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                          achievement.rarity
                        )}`}
                      >
                        {achievement.rarity}
                      </span>
                      <div className="p-1 bg-gray-100 rounded">
                        {getTypeIcon(achievement.type)}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-1">
                    {achievement.description}
                  </p>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">
                          {achievement.points} points
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {achievement.category}
                      </div>
                    </div>

                    {achievement.unlocked ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Unlocked</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {achievement.dateEarned}
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="text-sm text-gray-500">
                          Complete requirements to unlock
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium">
                        View Details
                      </button>
                      {achievement.unlocked && (
                        <button className="flex-1 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium">
                          Share
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Leaderboard Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Achievement Leaderboard
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View Full Leaderboard →
            </button>
          </div>

          <div className="space-y-4">
            {[
              { rank: 1, name: "Alex Johnson", points: 1250, achievements: 18 },
              {
                rank: 2,
                name: "Sarah Williams",
                points: 1120,
                achievements: 16,
              },
              {
                rank: 3,
                name: user?.name || "You",
                points: points,
                achievements: achievements.filter((a) => a.unlocked).length,
              },
              { rank: 4, name: "Mike Chen", points: 850, achievements: 12 },
              { rank: 5, name: "Emma Davis", points: 720, achievements: 10 },
            ].map((player) => (
              <div
                key={player.rank}
                className="flex items-center justify-between p-3 bg-white rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      player.rank === 1
                        ? "bg-yellow-100 text-yellow-800"
                        : player.rank === 2
                        ? "bg-gray-100 text-gray-800"
                        : player.rank === 3
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {player.rank}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{player.name}</h4>
                    <p className="text-xs text-gray-500">
                      {player.achievements} achievements
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {player.points} points
                  </p>
                  <p className="text-xs text-gray-500">Rank #{player.rank}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Achievement Activity
          </h3>
          <div className="space-y-3">
            {achievements
              .filter((a) => a.unlocked)
              .sort((a, b) => new Date(b.dateEarned) - new Date(a.dateEarned))
              .slice(0, 3)
              .map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      You unlocked "{achievement.title}"
                    </p>
                    <p className="text-sm text-gray-600">
                      +{achievement.points} points • {achievement.dateEarned}
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Share
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeAchievements;
