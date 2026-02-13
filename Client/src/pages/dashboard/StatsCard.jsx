// src/components/dashboard/StatsCard.jsx
import React from 'react';

const StatsCard = ({ title, value, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`${colorClasses[color]} p-3 rounded-lg`}>
          <span className="text-white">📊</span>
        </div>
      </div>
    </div>
  );
};

export const DashboardStats = ({ role }) => {
  const stats = {
    admin: [
      { title: 'Total Users', value: '156', color: 'blue' },
      { title: 'Revenue', value: '$45,200', color: 'green' },
      { title: 'Projects', value: '24', color: 'purple' },
      { title: 'Active', value: '89', color: 'orange' },
    ],
    manager: [
      { title: 'Team Members', value: '24', color: 'blue' },
      { title: 'Active Projects', value: '12', color: 'green' },
      { title: 'Budget', value: '$42,580', color: 'purple' },
      { title: 'Pending', value: '4', color: 'orange' },
    ],
    employee: [
      { title: 'Completed Tasks', value: '42', color: 'blue' },
      { title: 'Active Projects', value: '5', color: 'green' },
      { title: 'Hours', value: '38', color: 'purple' },
      { title: 'Rating', value: '4.8/5', color: 'orange' },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats[role]?.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCard;