// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/AboutPage";
import Services from "./pages/Ourservice";
import Contact from "./pages/ContactPage";
import FAQ from "./pages/FAQPage";
import TestPage from "./pages/TestPage";
import CookiePolicy from "./pages/CookiePolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Components
import Testimonials from "./components/Testimonials";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";
import WhatsAppButton from "./components/WhatsAppButton";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterEmployee from "./pages/auth/RegisterEmployee";
import RegisterManager from "./pages/auth/RegisterManager";
import RegisterAdmin from "./pages/auth/RegisterAdmin";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Profile Pages
import CreateProfile from "./pages/profile/CreateProfile";
import ProfileSetupPage from "./pages/profile/ProfileSetupPage";

// Dashboard Main Pages
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import ManagerDashboard from "./pages/dashboard/ManagerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

// Dashboard Sub Pages - Employee
import EmployeeProjects from "./pages/dashboard/EmployeeProjects";
import EmployeeTasks from "./pages/dashboard/EmployeeTasks";
import EmployeeAttendance from "./pages/dashboard/EmployeeAttendance";
import EmployeePayroll from "./pages/dashboard/EmployeePayroll";
import EmployeeGoals from "./pages/dashboard/EmployeeGoals";
import EmployeePerformance from "./pages/dashboard/EmployeePerformance";
import EmployeeDocuments from "./pages/dashboard/EmployeeDocuments";
import EmployeeAchievements from "./pages/dashboard/EmployeeAchievements";
import EmployeeMessages from "./pages/dashboard/EmployeeMessages";
import EmployeeTraining from "./pages/dashboard/EmployeeTraining";

// Dashboard Sub Pages - Manager
import ManagerTeam from "./pages/dashboard/ManagerTeam";
import ManagerProjects from "./pages/dashboard/ManagerProjects";
import ManagerReports from "./pages/dashboard/ManagerReports";
import ManagerApprovals from "./pages/dashboard/ManagerApprovals";
import ManagerPerformance from "./pages/dashboard/ManagerPerformance";

// Dashboard Sub Pages - Admin
import AdminUsers from "./pages/dashboard/AdminUsers";
import AdminAnalytics from "./pages/dashboard/AdminAnalytics";
import AdminSettings from "./pages/dashboard/AdminSettings";
import AdminDatabase from "./pages/dashboard/AdminDatabase";
import AdminAudit from "./pages/dashboard/AdminAudit";

// Common Dashboard Pages
import ProfilePage from "./pages/profile/ProfilePage";
import NotificationsPage from "./pages/profile/NotificationsPage";
import CalendarPage from "./pages/profile/CalendarPage";
import HelpPage from "./pages/profile/HelpPage";
import SecurityPage from "./pages/profile/SecurityPage";

// Request Pages
import CreateProject from "./pages/CreateProject";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-700">Loading...</h3>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if profile is completed (only for employees)
  if (
    user.role === "employee" &&
    !user.profileCompleted &&
    !window.location.pathname.includes("/profile/setup")
  ) {
    return <Navigate to="/profile/setup" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Dynamic Profile Route
const ProfileRoute = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return <Navigate to={`/${user.role}/profile`} replace />;
};

// Dashboard Router to redirect based on role
const DashboardRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check profile completion for employees
  if (user.role === "employee" && !user.profileCompleted) {
    return <Navigate to="/profile/setup" replace />;
  }

  // Redirect to role-specific dashboard
  switch (user.role) {
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    case "manager":
      return <Navigate to="/manager/dashboard" replace />;
    case "employee":
    case "user":
      return <Navigate to="/employee/dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

// Register Selection Page
const RegisterSelection = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Choose Registration Type
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select your role to register
        </p>
      </div>
      <div className="space-y-4">
        <a
          href="/register/employee"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Register as Employee
        </a>
        <a
          href="/register/manager"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Register as Manager
        </a>
        <a
          href="/register/admin"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Register as Admin
        </a>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </a>
        </p>
        <div className="mt-4">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  </div>
);

// Unauthorized Page
const UnauthorizedPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 pt-20">
    <div className="text-center max-w-md mx-auto p-8">
      <div className="text-6xl mb-4">🚫</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
      <p className="text-gray-600 mb-8">
        You don't have permission to access this page.
      </p>
      <a
        href="/dashboard"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
      >
        Go to My Dashboard
      </a>
    </div>
  </div>
);

// 404 Page
const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 pt-20">
    <div className="text-center max-w-md mx-auto p-8">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
      >
        Go to Homepage
      </a>
    </div>
  </div>
);

// Main App Layout that conditionally shows Navbar
const AppLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Don't show Navbar on auth pages
  const hideNavbar =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/verify-email") ||
    location.pathname.startsWith("/forgot-password") ||
    location.pathname.startsWith("/employee/") ||
    location.pathname.startsWith("/manager/") ||
    location.pathname.startsWith("/admin/");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Only show Navbar if not on auth or dashboard pages */}
      {!hideNavbar && <Navbar />}

      <main className="flex-grow">{children}</main>

      {/* Show Footer only on public pages */}
      {!hideNavbar && <Footer />}

      {/* Chatbot and WhatsApp */}
      <AIChatbot />
      <WhatsAppButton />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />

            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/help" element={<HelpPage />} />

            {/* Auth Routes - No Navbar on these */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterSelection />} />
            <Route path="/register/employee" element={<RegisterEmployee />} />
            <Route path="/register/manager" element={<RegisterManager />} />
            <Route path="/register/admin" element={<RegisterAdmin />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Profile Routes */}
            <Route path="/profile" element={<ProfileRoute />} />
            <Route
              path="/profile/setup"
              element={
                <ProtectedRoute>
                  <ProfileSetupPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/create"
              element={
                <ProtectedRoute>
                  <CreateProfile />
                </ProtectedRoute>
              }
            />
            <Route path="/test" element={<TestPage />} />
            {/* Dashboard Main Routes */}
            <Route path="/dashboard" element={<DashboardRouter />} />

            {/* Employee Routes */}
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/projects"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <EmployeeProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/tasks"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <EmployeeTasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/attendance"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <EmployeeAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/payroll"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <EmployeePayroll />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/goals"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <EmployeeGoals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/performance"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <EmployeePerformance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/documents"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <EmployeeDocuments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/achievements"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <EmployeeAchievements />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/messages"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <EmployeeMessages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/training"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <EmployeeTraining />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/profile"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <ProfilePage role="employee" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/notifications"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <NotificationsPage role="employee" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/calendar"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <CalendarPage role="employee" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/security"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <SecurityPage role="employee" />
                </ProtectedRoute>
              }
            />

            {/* Manager Routes */}
            <Route
              path="/manager/dashboard"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/team"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <ManagerTeam />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/projects"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <ManagerProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/reports"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <ManagerReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/approvals"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <ManagerApprovals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/performance"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <ManagerPerformance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/profile"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <ProfilePage role="manager" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/notifications"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <NotificationsPage role="manager" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/calendar"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <CalendarPage role="manager" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/security"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <SecurityPage role="manager" />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/database"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDatabase />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/audit"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminAudit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ProfilePage role="admin" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <NotificationsPage role="admin" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/calendar"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CalendarPage role="admin" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/security"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SecurityPage role="admin" />
                </ProtectedRoute>
              }
            />

            {/* Project/Request Routes */}
            <Route
              path="/projects/new"
              element={
                <ProtectedRoute allowedRoles={["employee", "user"]}>
                  <CreateProject />
                </ProtectedRoute>
              }
            />

            {/* Other Routes */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
