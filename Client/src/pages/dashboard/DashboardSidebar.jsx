// src/components/dashboard/DashboardLayout.jsx (Temporary Version)
import React from 'react';

const DashboardLayout = ({ children, role }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Simple Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <div className="space-y-2">
            <a href={`/${role}/dashboard`} className="block p-2 hover:bg-gray-700 rounded">
              📊 Dashboard
            </a>
            <a href={`/${role}/profile`} className="block p-2 hover:bg-gray-700 rounded">
              👤 Profile
            </a>
            <a href="/login" className="block p-2 bg-red-600 hover:bg-red-700 rounded mt-4">
              🚪 Logout
            </a>
          </div>
        </div>
        
        <div className="flex-1">
        
          <header className="bg-white border-b p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Welcome, {role}</h1>
              <div className="flex space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded">🔔</button>
                <button className="p-2 hover:bg-gray-100 rounded">⚙️</button>
              </div>
            </div>
          </header>
          
          
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;