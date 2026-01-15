// Example: src/pages/dashboard/EmployeeProjects.jsx
import React from "react";
import DashboardLayout from "./DashboardLayout";

const EmployeeProjects = () => {
  return (
    <DashboardLayout role="employee" title="My Projects">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <p className="text-gray-600">Your projects will appear here.</p>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProjects;
