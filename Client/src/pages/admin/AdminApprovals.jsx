// src/pages/admin/AdminApprovals.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../App';

const AdminApprovals = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState('approve');
  const [notes, setNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get(`${API_URL}/admin/pending-approvals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setPendingUsers(response.data.data || []);
      } else {
        setError('Failed to fetch pending approvals');
      }
    } catch (error) {
      console.error('Error fetching approvals:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      } else {
        setError('Failed to load pending approvals. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setModalOpen(true);
    setNotes('');
    setRejectionReason('');
  };

  const handleApprove = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await axios.post(
        `${API_URL}/admin/approve-user/${selectedUser._id}`,
        { notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess(`User ${selectedUser.firstName} ${selectedUser.lastName} approved successfully!`);
        setModalOpen(false);
        fetchPendingApprovals();
      } else {
        setError(response.data.message || 'Failed to approve user');
      }
    } catch (error) {
      console.error('Approve error:', error);
      setError(error.response?.data?.message || 'Failed to approve user');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedUser || !rejectionReason.trim()) {
      setError('Please provide a rejection reason');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await axios.post(
        `${API_URL}/admin/reject-user/${selectedUser._id}`,
        { reason: rejectionReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess(`User ${selectedUser.firstName} ${selectedUser.lastName} rejected successfully!`);
        setModalOpen(false);
        fetchPendingApprovals();
      } else {
        setError(response.data.message || 'Failed to reject user');
      }
    } catch (error) {
      console.error('Reject error:', error);
      setError(error.response?.data?.message || 'Failed to reject user');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { color: 'bg-purple-100 text-purple-800', label: 'Admin' },
      manager: { color: 'bg-blue-100 text-blue-800', label: 'Manager' },
      employee: { color: 'bg-gray-100 text-gray-800', label: 'Employee' },
      user: { color: 'bg-gray-100 text-gray-800', label: 'User' },
    };

    const config = roleConfig[role] || roleConfig.employee;
    return (
      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-900">Admin Panel</span>
              </div>
              
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link to="/admin/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/admin/users" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Users
                </Link>
                <Link to="/admin/approvals" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Approvals
                </Link>
                <Link to="/admin/settings" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Settings
                </Link>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin/dashboard"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Back to Dashboard
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminUser');
                    navigate('/admin/login');
                  }}
                  className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Pending Approvals</h1>
            <p className="text-blue-100">
              Review and manage user registration requests awaiting approval
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="bg-blue-400 bg-opacity-30 px-4 py-2 rounded-lg">
                <span className="font-bold">{pendingUsers.length}</span> pending requests
              </div>
              <button
                onClick={fetchPendingApprovals}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition duration-200"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mt-4 mx-4 sm:mx-0">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mt-4 mx-4 sm:mx-0">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pending Approvals List */}
        <div className="mt-8 mx-4 sm:mx-0">
          {loading ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading pending approvals...</p>
            </div>
          ) : pendingUsers.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pending approvals</h3>
              <p className="text-gray-600">All registration requests have been processed.</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {pendingUsers.map((user) => (
                  <li key={user._id} className="hover:bg-gray-50 transition duration-150">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-lg">
                                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <h4 className="text-lg font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </h4>
                              <div className="ml-3">
                                {getStatusBadge(user.status)}
                              </div>
                              <div className="ml-2">
                                {getRoleBadge(user.role)}
                              </div>
                            </div>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className="text-sm">
                                <span className="text-gray-500">Email: </span>
                                <span className="text-gray-900 font-medium">{user.email}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">Phone: </span>
                                <span className="text-gray-900 font-medium">{user.phone}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">Employee ID: </span>
                                <span className="text-gray-900 font-medium">{user.employeeId}</span>
                              </div>
                            </div>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className="text-sm">
                                <span className="text-gray-500">Department: </span>
                                <span className="text-gray-900 font-medium">{user.department}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">Position: </span>
                                <span className="text-gray-900 font-medium">{user.position}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">Registered: </span>
                                <span className="text-gray-900 font-medium">{formatDate(user.createdAt)}</span>
                              </div>
                            </div>
                            {user.skills && user.skills.length > 0 && (
                              <div className="mt-2">
                                <span className="text-gray-500 text-sm">Skills: </span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {user.skills.map((skill, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <button
                            onClick={() => handleActionClick(user, 'approve')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                          </button>
                          <button
                            onClick={() => handleActionClick(user, 'reject')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                          </button>
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Action Modal */}
      {modalOpen && selectedUser && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  {actionType === 'approve' ? (
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {actionType === 'approve' ? 'Approve User' : 'Reject User'}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {actionType === 'approve' 
                        ? `Are you sure you want to approve ${selectedUser.firstName} ${selectedUser.lastName}?`
                        : `Are you sure you want to reject ${selectedUser.firstName} ${selectedUser.lastName}?`
                      }
                    </p>
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-700">
                        <div className="grid grid-cols-2 gap-2">
                          <div>Name:</div>
                          <div className="font-medium">{selectedUser.firstName} {selectedUser.lastName}</div>
                          <div>Email:</div>
                          <div className="font-medium">{selectedUser.email}</div>
                          <div>Role:</div>
                          <div className="font-medium capitalize">{selectedUser.role}</div>
                        </div>
                      </div>
                    </div>
                    
                    {actionType === 'approve' ? (
                      <div className="mt-4">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 text-left">
                          Approval Notes (Optional)
                        </label>
                        <textarea
                          id="notes"
                          rows="3"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Add any notes or instructions for the user..."
                        />
                      </div>
                    ) : (
                      <div className="mt-4">
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 text-left">
                          Rejection Reason *
                        </label>
                        <textarea
                          id="reason"
                          rows="3"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="Please provide a reason for rejection..."
                          required
                        />
                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                {actionType === 'approve' ? (
                  <button
                    type="button"
                    onClick={handleApprove}
                    disabled={loading}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : 'Approve User'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleReject}
                    disabled={loading || !rejectionReason.trim()}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : 'Reject User'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View User Details Modal */}
      {selectedUser && !modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Details
                  </h3>
                  <div className="mt-4 text-left">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="font-medium text-gray-500">Full Name:</div>
                        <div className="font-medium">{selectedUser.firstName} {selectedUser.lastName}</div>
                        
                        <div className="font-medium text-gray-500">Email:</div>
                        <div className="font-medium">{selectedUser.email}</div>
                        
                        <div className="font-medium text-gray-500">Phone:</div>
                        <div className="font-medium">{selectedUser.phone}</div>
                        
                        <div className="font-medium text-gray-500">Employee ID:</div>
                        <div className="font-medium">{selectedUser.employeeId}</div>
                        
                        <div className="font-medium text-gray-500">Department:</div>
                        <div className="font-medium">{selectedUser.department}</div>
                        
                        <div className="font-medium text-gray-500">Position:</div>
                        <div className="font-medium">{selectedUser.position}</div>
                        
                        <div className="font-medium text-gray-500">Role:</div>
                        <div className="font-medium capitalize">{selectedUser.role}</div>
                        
                        <div className="font-medium text-gray-500">Status:</div>
                        <div className="font-medium">{getStatusBadge(selectedUser.status)}</div>
                        
                        <div className="font-medium text-gray-500">Registration Date:</div>
                        <div className="font-medium">{formatDate(selectedUser.createdAt)}</div>
                        
                        {selectedUser.experience && (
                          <>
                            <div className="font-medium text-gray-500">Experience:</div>
                            <div className="font-medium">{selectedUser.experience} years</div>
                          </>
                        )}
                      </div>
                      
                      {selectedUser.skills && selectedUser.skills.length > 0 && (
                        <div className="mt-4">
                          <div className="font-medium text-gray-500 text-sm mb-2">Skills:</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedUser.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApprovals;