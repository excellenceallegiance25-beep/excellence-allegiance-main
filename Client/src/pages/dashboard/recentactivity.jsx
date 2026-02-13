// src/components/dashboard/RecentActivity.jsx
import React from 'react';

const RecentActivity = ({ role }) => {
  const activities = {
    admin: [
      { id: 1, text: 'System updated to v2.4.1', time: '1 hour ago' },
      { id: 2, text: 'New user registered', time: '2 hours ago' },
      { id: 3, text: 'Security audit completed', time: '3 hours ago' },
      { id: 4, text: 'Database backup successful', time: '6 hours ago' },
    ],
    manager: [
      { id: 1, text: 'Project approved', time: '2 hours ago' },
      { id: 2, text: 'Team meeting scheduled', time: '3 hours ago' },
      { id: 3, text: 'Budget updated', time: '5 hours ago' },
      { id: 4, text: 'Report generated', time: '1 day ago' },
    ],
    employee: [
      { id: 1, text: 'Task completed', time: '2 min ago' },
      { id: 2, text: 'New task assigned', time: '1 hour ago' },
      { id: 3, text: 'Meeting reminder', time: '2 hours ago' },
      { id: 4, text: 'Message received', time: '3 hours ago' },
    ],
  };

  const activityItems = activities[role] || activities.admin;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activityItems.map((activity) => (
          <div key={activity.id} className="border-l-4 border-blue-500 pl-3 py-1">
            <p className="text-sm">{activity.text}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;