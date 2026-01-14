// client/src/pages/CreateProject.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'project',
    priority: 'medium',
    deadline: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Project request submitted successfully!');
      setLoading(false);
      navigate('/employee/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Project Request</h1>
            <p className="text-gray-600">Submit a new project request for manager approval</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter project title"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Project Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="project">New Project</option>
                  <option value="enhancement">Enhancement</option>
                  <option value="bugfix">Bug Fix</option>
                  <option value="research">Research</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Priority *
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Deadline *
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Describe your project in detail..."
                rows="6"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/employee/dashboard')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;