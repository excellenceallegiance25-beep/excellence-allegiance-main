import React, { useState } from 'react';
import DashboardLayout from '../dashboard/DashboardSidebar';
import { Bell, CheckCircle, XCircle, Clock, Settings } from 'lucide-react';

const NotificationsPage = ({ role }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New task assigned', message: 'You have been assigned to "Project Documentation"', time: '2 minutes ago', read: false, type: 'task' },
    { id: 2, title: 'Team meeting reminder', message: 'Team meeting scheduled for tomorrow at 2:00 PM', time: '1 hour ago', read: false, type: 'meeting' },
    { id: 3, title: 'Project deadline approaching', message: 'Website Redesign project deadline in 2 days', time: '3 hours ago', read: true, type: 'deadline' },
    { id: 4, title: 'System maintenance', message: 'Scheduled maintenance on Sunday, 2:00 AM - 4:00 AM', time: '1 day ago', read: true, type: 'system' },
    { id: 5, title: 'New team member', message: 'David Kim has joined the Engineering team', time: '2 days ago', read: true, type: 'team' },
    { id: 6, title: 'Performance review', message: 'Your quarterly performance review is scheduled', time: '3 days ago', read: true, type: 'review' },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'task': return 'bg-blue-100 text-blue-800';
      case 'meeting': return 'bg-green-100 text-green-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'system': return 'bg-purple-100 text-purple-800';
      case 'team': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout role={role}>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Stay updated with system alerts and messages</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {unreadCount} unread
            </span>
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Mark All as Read
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Notifications</h2>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                <Settings size={18} className="mr-2" />
                Settings
              </button>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg ${notification.read ? 'border-gray-200' : 'border-blue-200 bg-blue-50'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                        <Bell className={notification.read ? 'text-gray-600' : 'text-blue-600'} size={20} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">{notification.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(notification.type)}`}>
                            {notification.type}
                          </span>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-2 flex items-center">
                          <Clock size={14} className="mr-1" />
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-green-600 hover:text-green-800"
                          title="Mark as read"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Notification Stats</h3>
              <Bell size={24} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Notifications</span>
                <span className="text-2xl font-bold">{notifications.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Unread</span>
                <span className="text-2xl font-bold">{unreadCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Today</span>
                <span className="text-2xl font-bold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span>This Week</span>
                <span className="text-2xl font-bold">12</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Types</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span>Task Assignments</span>
                </div>
                <span className="font-medium">{notifications.filter(n => n.type === 'task').length}</span>
              </div>
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span>Meetings</span>
                </div>
                <span className="font-medium">{notifications.filter(n => n.type === 'meeting').length}</span>
              </div>
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span>Deadlines</span>
                </div>
                <span className="font-medium">{notifications.filter(n => n.type === 'deadline').length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700">
                Configure Alerts
              </button>
              <button className="w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-green-700">
                Set Do Not Disturb
              </button>
              <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700">
                Email Digest
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;