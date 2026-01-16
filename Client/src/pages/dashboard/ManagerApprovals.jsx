import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import {
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  DollarSign,
  Calendar,
  Filter,
  Download,
  User,
  AlertCircle,
  MoreVertical,
  Eye,
  MessageSquare,
  FileEdit,
  Trash2,
  RefreshCw,
  ChevronDown,
  Search,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagerApprovals = () => {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [approvedItems, setApprovedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [rejectReason, setRejectReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // API Base URL
  const API_URL = import.meta.env.VITE_API_URL || "http://192.168.68.109:5000/api";

  // Load data from localStorage on initial load
  useEffect(() => {
    loadApprovals();
  }, []);

  const loadApprovals = async () => {
    setLoading(true);
    try {
      // Try to fetch from API
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/approvals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const allItems = response.data.data || [];
        const pending = allItems.filter((item) => item.status === "pending");
        const approved = allItems.filter((item) => item.status === "approved");

        setPendingApprovals(pending);
        setApprovedItems(approved);

        // Save to localStorage as backup
        localStorage.setItem(
          "managerApprovals",
          JSON.stringify({
            pendingApprovals: pending,
            approvedItems: approved,
            lastUpdated: new Date().toISOString(),
          })
        );
      } else {
        // Fallback to localStorage
        loadFromLocalStorage();
      }
    } catch (error) {
      console.error("Error loading approvals:", error);
      // Fallback to localStorage
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem("managerApprovals");
    if (savedData) {
      const { pendingApprovals: savedPending, approvedItems: savedApproved } =
        JSON.parse(savedData);

      if (savedPending && savedApproved) {
        setPendingApprovals(savedPending);
        setApprovedItems(savedApproved);
        toast.info("Using cached approval data. Check your connection.");
      } else {
        // Initial demo data
        initializeDemoData();
      }
    } else {
      // Initial demo data
      initializeDemoData();
    }
  };

  const initializeDemoData = () => {
    const initialPending = [
      {
        id: 1,
        type: "Leave Request",
        user: "John Smith",
        userId: "EMP-001",
        userEmail: "john@example.com",
        details: "Sick leave - 3 days",
        description: "Feeling unwell, need rest for recovery.",
        date: "Feb 10-12, 2024",
        submittedDate: "2024-02-08",
        priority: "Medium",
        status: "pending",
        department: "Sales",
        attachments: ["medical_certificate.pdf"],
        comments: [],
      },
      {
        id: 2,
        type: "Expense Report",
        user: "Lisa Wong",
        userId: "EMP-002",
        userEmail: "lisa@example.com",
        details: "Client meeting expenses",
        description: "Lunch meeting with ABC Corp clients",
        amount: "$1,250",
        date: "Today",
        submittedDate: "2024-02-15",
        priority: "High",
        status: "pending",
        department: "Marketing",
        attachments: ["receipts.zip"],
        comments: [],
      },
      {
        id: 3,
        type: "Project Budget",
        user: "Tech Team",
        userId: "TEAM-001",
        userEmail: "tech@example.com",
        details: "Additional budget for mobile app",
        description: "Need additional budget for app store fees and hosting",
        amount: "$15,000",
        date: "Tomorrow",
        submittedDate: "2024-02-14",
        priority: "High",
        status: "pending",
        department: "Development",
        attachments: ["budget_proposal.pdf"],
        comments: [],
      },
      {
        id: 4,
        type: "Feature Request",
        user: "Product Team",
        userId: "TEAM-002",
        userEmail: "product@example.com",
        details: "New payment integration",
        description: "Integrate PayPal and Stripe for international payments",
        priority: "High",
        date: "Today",
        submittedDate: "2024-02-15",
        status: "pending",
        department: "Product",
        attachments: ["requirements.pdf"],
        comments: [],
      },
      {
        id: 5,
        type: "Hardware Request",
        user: "IT Department",
        userId: "TEAM-003",
        userEmail: "it@example.com",
        details: "New laptops for team",
        description: "Need 5 new MacBook Pros for the development team",
        amount: "$8,500",
        date: "Feb 18, 2024",
        submittedDate: "2024-02-13",
        priority: "Medium",
        status: "pending",
        department: "IT",
        attachments: ["quotation.pdf"],
        comments: [],
      },
    ];

    const initialApproved = [
      {
        id: 6,
        type: "Training Request",
        user: "Sarah Chen",
        userId: "EMP-003",
        userEmail: "sarah@example.com",
        details: "React Advanced Course",
        description:
          "Advanced React patterns and performance optimization course",
        amount: "$500",
        date: "Feb 5, 2024",
        submittedDate: "2024-02-01",
        approvedDate: "2024-02-03",
        approvedBy: "You",
        priority: "Low",
        status: "approved",
        department: "Development",
        attachments: ["course_details.pdf"],
        comments: ["Approved - Good investment in skills"],
      },
      {
        id: 7,
        type: "Software License",
        user: "Dev Team",
        userId: "TEAM-004",
        userEmail: "dev@example.com",
        details: "Figma Enterprise Plan",
        description: "Annual subscription for Figma Enterprise",
        amount: "$1,200/year",
        date: "Feb 3, 2024",
        submittedDate: "2024-01-30",
        approvedDate: "2024-02-02",
        approvedBy: "You",
        priority: "Medium",
        status: "approved",
        department: "Design",
        attachments: ["license_agreement.pdf"],
        comments: ["Approved - Essential tool for design team"],
      },
    ];

    setPendingApprovals(initialPending);
    setApprovedItems(initialApproved);

    localStorage.setItem(
      "managerApprovals",
      JSON.stringify({
        pendingApprovals: initialPending,
        approvedItems: initialApproved,
        lastUpdated: new Date().toISOString(),
      })
    );
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(
      "managerApprovals",
      JSON.stringify({
        pendingApprovals,
        approvedItems,
        lastUpdated: new Date().toISOString(),
      })
    );
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const handleApprove = async (id) => {
    const item = pendingApprovals.find((item) => item.id === id);
    if (!item) return;

    try {
      // Try to approve via API
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/approvals/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      const updatedPending = pendingApprovals.filter((item) => item.id !== id);
      const approvedItem = {
        ...item,
        status: "approved",
        approvedDate: new Date().toISOString().split("T")[0],
        approvedBy: "You",
      };

      setPendingApprovals(updatedPending);
      setApprovedItems([approvedItem, ...approvedItems]);
      saveToLocalStorage();

      toast.success(`${item.type} approved successfully!`);

      // Send notification
      await sendNotification(item, "approved");
    } catch (error) {
      console.error("Error approving item:", error);

      // Fallback to localStorage
      const updatedPending = pendingApprovals.filter((item) => item.id !== id);
      const approvedItem = {
        ...item,
        status: "approved",
        approvedDate: new Date().toISOString().split("T")[0],
        approvedBy: "You",
      };

      setPendingApprovals(updatedPending);
      setApprovedItems([approvedItem, ...approvedItems]);
      saveToLocalStorage();

      toast.success(`${item.type} approved locally!`);
    }
  };

  const handleRejectClick = (item) => {
    setSelectedItem(item);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    if (!selectedItem || !rejectReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    try {
      // Try to reject via API
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/approvals/${selectedItem.id}/reject`,
        { reason: rejectReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      const updatedPending = pendingApprovals.filter(
        (item) => item.id !== selectedItem.id
      );
      setPendingApprovals(updatedPending);
      saveToLocalStorage();

      toast.success(`${selectedItem.type} rejected successfully!`);

      // Send notification
      await sendNotification(selectedItem, "rejected", rejectReason);
    } catch (error) {
      console.error("Error rejecting item:", error);

      // Fallback to localStorage
      const updatedPending = pendingApprovals.filter(
        (item) => item.id !== selectedItem.id
      );
      setPendingApprovals(updatedPending);
      saveToLocalStorage();

      toast.success(`${selectedItem.type} rejected locally!`);
    }

    setShowRejectModal(false);
    setSelectedItem(null);
    setRejectReason("");
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleBulkApprove = async () => {
    if (selectedItems.length === 0) {
      toast.error("Please select items to approve");
      return;
    }

    try {
      // Try bulk approve via API
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/approvals/bulk-approve`,
        { ids: selectedItems },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      const itemsToApprove = pendingApprovals.filter((item) =>
        selectedItems.includes(item.id)
      );
      const updatedPending = pendingApprovals.filter(
        (item) => !selectedItems.includes(item.id)
      );

      const approvedItemsToAdd = itemsToApprove.map((item) => ({
        ...item,
        status: "approved",
        approvedDate: new Date().toISOString().split("T")[0],
        approvedBy: "You",
      }));

      setPendingApprovals(updatedPending);
      setApprovedItems([...approvedItemsToAdd, ...approvedItems]);
      setSelectedItems([]);
      saveToLocalStorage();

      toast.success(`${itemsToApprove.length} items approved successfully!`);

      // Send notifications
      itemsToApprove.forEach((item) => {
        sendNotification(item, "approved");
      });
    } catch (error) {
      console.error("Error bulk approving:", error);

      // Fallback to localStorage
      const itemsToApprove = pendingApprovals.filter((item) =>
        selectedItems.includes(item.id)
      );
      const updatedPending = pendingApprovals.filter(
        (item) => !selectedItems.includes(item.id)
      );

      const approvedItemsToAdd = itemsToApprove.map((item) => ({
        ...item,
        status: "approved",
        approvedDate: new Date().toISOString().split("T")[0],
        approvedBy: "You",
      }));

      setPendingApprovals(updatedPending);
      setApprovedItems([...approvedItemsToAdd, ...approvedItems]);
      setSelectedItems([]);
      saveToLocalStorage();

      toast.success(`${itemsToApprove.length} items approved locally!`);
    }

    setShowBulkModal(false);
  };

  const sendNotification = async (item, action, reason = "") => {
    try {
      const notification = {
        userId: item.userId,
        type: "approval",
        title: `Request ${action === "approved" ? "Approved" : "Rejected"}`,
        message: `Your ${item.type} has been ${action}${
          reason ? `: ${reason}` : ""
        }`,
        data: {
          itemId: item.id,
          type: item.type,
          action,
          reason,
        },
      };

      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/notifications`, notification, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Leave Request":
        return "bg-blue-100 text-blue-800";
      case "Expense Report":
        return "bg-green-100 text-green-800";
      case "Project Budget":
        return "bg-purple-100 text-purple-800";
      case "Feature Request":
        return "bg-yellow-100 text-yellow-800";
      case "Training Request":
        return "bg-indigo-100 text-indigo-800";
      case "Software License":
        return "bg-pink-100 text-pink-800";
      case "Hardware Request":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Leave Request":
        return <Calendar className="text-blue-500" size={20} />;
      case "Expense Report":
        return <DollarSign className="text-green-500" size={20} />;
      case "Project Budget":
        return <FileText className="text-purple-500" size={20} />;
      case "Feature Request":
        return <FileText className="text-yellow-500" size={20} />;
      default:
        return <FileText className="text-gray-500" size={20} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPendingApprovals = pendingApprovals.filter((item) => {
    const matchesSearch =
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || item.type === filterType;

    return matchesSearch && matchesType;
  });

  const filteredApprovedItems = approvedItems.filter((item) => {
    return (
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Details Modal Component
  const DetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Request Details
            </h2>
            <p className="text-gray-600">Review full request information</p>
          </div>
          <button
            onClick={() => setShowDetailsModal(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl p-2 hover:bg-gray-100 rounded-full transition"
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          {selectedItem && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Request Type</p>
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                        selectedItem.type
                      )}`}
                    >
                      {selectedItem.type}
                    </span>
                    <span
                      className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                        selectedItem.priority
                      )}`}
                    >
                      {selectedItem.priority} Priority
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Submitted By</p>
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-gray-500" />
                    <span className="font-medium">{selectedItem.user}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({selectedItem.userId})
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Details</p>
                <p className="text-lg font-medium">{selectedItem.details}</p>
                {selectedItem.description && (
                  <p className="mt-2 text-gray-700">
                    {selectedItem.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Department</p>
                  <p className="font-medium">{selectedItem.department}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Submitted Date</p>
                  <p className="font-medium">{selectedItem.submittedDate}</p>
                </div>

                {selectedItem.amount && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Amount</p>
                    <p className="text-xl font-bold text-green-600">
                      {selectedItem.amount}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 mb-1">Request Date</p>
                  <p className="font-medium">{selectedItem.date}</p>
                </div>
              </div>

              {selectedItem.attachments &&
                selectedItem.attachments.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Attachments</p>
                    <div className="space-y-2">
                      {selectedItem.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center">
                            <FileText
                              size={16}
                              className="mr-3 text-gray-500"
                            />
                            <span className="font-medium">{file}</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {selectedItem.comments && selectedItem.comments.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Comments</p>
                  <div className="space-y-3">
                    {selectedItem.comments.map((comment, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-gray-800">{comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-4 pt-6 border-t">
                {selectedItem.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleApprove(selectedItem.id);
                      }}
                      className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center"
                    >
                      <CheckCircle size={20} className="mr-2" />
                      Approve Request
                    </button>

                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleRejectClick(selectedItem);
                      }}
                      className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center justify-center"
                    >
                      <XCircle size={20} className="mr-2" />
                      Reject Request
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Reject Modal Component
  const RejectModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
            <AlertCircle className="text-red-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            Reject Request
          </h3>
          <p className="text-gray-600 text-center mb-4">
            Rejecting: <strong>{selectedItem?.type}</strong> from{" "}
            <strong>{selectedItem?.user}</strong>
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Rejection *
            </label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition resize-none"
              placeholder="Please provide a reason for rejecting this request..."
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowRejectModal(false);
                setSelectedItem(null);
                setRejectReason("");
              }}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleReject}
              disabled={!rejectReason.trim()}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                !rejectReason.trim()
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              Reject Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Bulk Approve Modal Component
  const BulkApproveModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
            <CheckCircle className="text-green-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            Bulk Approve Requests
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to approve {selectedItems.length} selected
            requests?
          </p>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Selected Requests:</p>
            <div className="max-h-48 overflow-y-auto">
              {pendingApprovals
                .filter((item) => selectedItems.includes(item.id))
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2"
                  >
                    <div>
                      <p className="font-medium">{item.type}</p>
                      <p className="text-sm text-gray-600">
                        {item.user} - {item.details}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowBulkModal(false)}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleBulkApprove}
              disabled={selectedItems.length === 0}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              Approve {selectedItems.length} Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <DashboardLayout role="manager">
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900">
              Loading Approvals
            </h3>
            <p className="text-gray-600">
              Please wait while we load your pending approvals...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="manager">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Approvals</h1>
            <p className="text-gray-600">Review and approve pending requests</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-gray-500">
                {pendingApprovals.length} pending • {approvedItems.length}{" "}
                approved
              </span>
              <button
                onClick={loadApprovals}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <RefreshCw size={14} className="mr-1" />
                Refresh
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {pendingApprovals.length} pending
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {approvedItems.length} approved
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search requests, users, or departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="all">All Types</option>
                <option value="Leave Request">Leave Requests</option>
                <option value="Expense Report">Expense Reports</option>
                <option value="Project Budget">Project Budgets</option>
                <option value="Feature Request">Feature Requests</option>
                <option value="Training Request">Training Requests</option>
                <option value="Software License">Software Licenses</option>
                <option value="Hardware Request">Hardware Requests</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>

            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
              <Filter size={18} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Pending Approvals
                </h2>
                <p className="text-sm text-gray-600">
                  Showing {filteredPendingApprovals.length} of{" "}
                  {pendingApprovals.length} requests
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {selectedItems.length > 0 && (
                  <button
                    onClick={() => setShowBulkModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center"
                  >
                    <CheckCircle size={18} className="mr-2" />
                    Approve Selected ({selectedItems.length})
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                  <Download size={18} className="mr-2" />
                  Export
                </button>
              </div>
            </div>

            {filteredPendingApprovals.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle
                  className="mx-auto mb-4 text-green-500"
                  size={48}
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No pending approvals
                </h3>
                <p className="text-gray-600">
                  All requests have been processed
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPendingApprovals.map((approval) => (
                  <div
                    key={approval.id}
                    className={`p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition ${
                      selectedItems.includes(approval.id)
                        ? "border-blue-500 bg-blue-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex items-center mt-1">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(approval.id)}
                            onChange={() => handleSelectItem(approval.id)}
                            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                          <Clock className="text-yellow-600" size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-medium text-gray-900">
                                {approval.type}
                              </h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                  approval.type
                                )}`}
                              >
                                {approval.type}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                  approval.priority
                                )}`}
                              >
                                {approval.priority}
                              </span>
                            </div>
                            <button
                              onClick={() => handleViewDetails(approval)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <MoreVertical size={20} />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div>
                              <p className="text-sm text-gray-600 flex items-center">
                                <User size={14} className="mr-2" />
                                {approval.user} • {approval.department}
                              </p>
                              <p className="text-sm font-medium text-gray-900 mt-1">
                                {approval.details}
                              </p>
                            </div>
                            <div className="text-right">
                              {approval.amount && (
                                <p className="text-lg font-bold text-green-600">
                                  {approval.amount}
                                </p>
                              )}
                              <p className="text-sm text-gray-500">
                                Due: {approval.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleViewDetails(approval)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                            >
                              <Eye size={14} className="mr-1" />
                              View Details
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center">
                              <MessageSquare size={14} className="mr-1" />
                              Add Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-4 pt-4 border-t">
                      <button
                        onClick={() => handleApprove(approval.id)}
                        className="flex-1 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg font-medium flex items-center justify-center"
                      >
                        <CheckCircle size={18} className="mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectClick(approval)}
                        className="flex-1 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-medium flex items-center justify-center"
                      >
                        <XCircle size={18} className="mr-2" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Recently Approved
            </h2>
            <div className="space-y-4">
              {filteredApprovedItems.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-green-200 bg-green-50 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <CheckCircle className="text-green-600" size={24} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">
                            {item.type}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                              item.type
                            )}`}
                          >
                            {item.type}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-gray-600">
                              From: {item.user}
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.details}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              Approved on: {item.approvedDate}
                            </p>
                            <p className="text-sm text-gray-500">
                              By: {item.approvedBy}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Approved
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-6">Approval Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Pending Requests</span>
                <span className="text-2xl font-bold">
                  {pendingApprovals.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Approved This Month</span>
                <span className="text-2xl font-bold">
                  {approvedItems.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Response Time</span>
                <span className="text-2xl font-bold">2.4h</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Approval Rate</span>
                <span className="text-2xl font-bold">
                  {pendingApprovals.length + approvedItems.length > 0
                    ? `${Math.round(
                        (approvedItems.length /
                          (pendingApprovals.length + approvedItems.length)) *
                          100
                      )}%`
                    : "0%"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  const allIds = pendingApprovals.map((item) => item.id);
                  setSelectedItems(allIds);
                  setShowBulkModal(true);
                }}
                className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700 flex items-center justify-between transition"
              >
                <span>Bulk Approve All</span>
                <CheckCircle size={18} />
              </button>
              <button className="w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-green-700 flex items-center justify-between transition">
                <span>Set Auto-approval Rules</span>
                <FileEdit size={18} />
              </button>
              <button className="w-full p-3 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-lg text-yellow-700 flex items-center justify-between transition">
                <span>View Approval History</span>
                <Clock size={18} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Approval Types
            </h3>
            <div className="space-y-3">
              {[
                "Leave Request",
                "Expense Report",
                "Project Budget",
                "Feature Request",
                "Training Request",
              ].map((type) => {
                const count = pendingApprovals.filter(
                  (item) => item.type === type
                ).length;
                if (count === 0) return null;

                return (
                  <div
                    key={type}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      {getTypeIcon(type)}
                      <span className="ml-3">{type}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(
                        type
                      )}`}
                    >
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Approval Tips
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Check Documentation
                </p>
                <p className="text-xs text-blue-700">
                  Always verify against company policies before approving
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900 mb-1">
                  Review Attachments
                </p>
                <p className="text-xs text-green-700">
                  Check all attached documents for completeness
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-900 mb-1">
                  Set Priorities
                </p>
                <p className="text-xs text-yellow-700">
                  Handle high-priority requests first
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDetailsModal && <DetailsModal />}
      {showRejectModal && <RejectModal />}
      {showBulkModal && <BulkApproveModal />}
    </DashboardLayout>
  );
};

export default ManagerApprovals;
