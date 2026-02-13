import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PendingApprovals = () => {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(null);

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/pending-approvals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setApprovals(response.data.data.approvals);
      }
    } catch (error) {
      console.error('Error fetching approvals:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to load pending approvals');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId, role) => {
    try {
      setProcessing(userId);
      setError('');
      setSuccess('');

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/admin/approve-user/${userId}`,
        { role, notes: `Approved as ${role} by admin` },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess(`User approved successfully as ${role}`);
        // Remove from list
        setApprovals(approvals.filter(a => a._id !== userId));
        // Auto hide success message
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Approve error:', error);
      setError(error.response?.data?.message || 'Failed to approve user');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (userId) => {
    if (!rejectReason.trim()) {
      setError('Please provide a rejection reason');
      return;
    }

    try {
      setProcessing(userId);
      setError('');
      setSuccess('');

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/admin/reject-user/${userId}`,
        { reason: rejectReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess('User registration rejected');
        // Remove from list
        setApprovals(approvals.filter(a => a._id !== userId));
        setShowRejectModal(null);
        setRejectReason('');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Reject error:', error);
      setError(error.response?.data?.message || 'Failed to reject user');
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pending approvals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Pending Approvals</h1>
              <p className="text-gray-600 mt-2">Review and approve new user registrations</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="text-green-700">{success}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Approvals List */}
        {approvals.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Approvals</h3>
            <p className="text-gray-600">All user registrations have been processed.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {approvals.map((approval) => (
              <div key={approval._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  {/* User Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {approval.firstName?.charAt(0)}{approval.lastName?.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {approval.firstName} {approval.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">{approval.email}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      {approval.approvalRequest?.timeElapsed || 'Just now'}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Department</p>
                      <p className="font-medium text-gray-800">{approval.department}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Position</p>
                      <p className="font-medium text-gray-800">{approval.position}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Requested Role</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                        approval.approvalRequest?.requestedRole === 'manager' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {approval.approvalRequest?.requestedRole || 'employee'}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Phone</p>
                      <p className="font-medium text-gray-800">{approval.phone || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Registered</p>
                      <p className="font-medium text-gray-800">
                        {new Date(approval.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowRejectModal(approval._id)}
                      disabled={processing === approval._id}
                      className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
                    >
                      Reject
                    </button>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleApprove(approval._id, 'employee')}
                        disabled={processing === approval._id}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                      >
                        {processing === approval._id ? 'Processing...' : 'Approve as Employee'}
                      </button>
                      <button
                        onClick={() => handleApprove(approval._id, 'manager')}
                        disabled={processing === approval._id}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                      >
                        {processing === approval._id ? 'Processing...' : 'Approve as Manager'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Reject Registration</h3>
              <p className="text-gray-600 mb-4">
                Please provide a reason for rejecting this registration.
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition mb-4"
                rows="3"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowRejectModal(null);
                    setRejectReason('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReject(showRejectModal)}
                  disabled={!rejectReason.trim() || processing === showRejectModal}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {processing === showRejectModal ? 'Processing...' : 'Confirm Reject'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingApprovals;