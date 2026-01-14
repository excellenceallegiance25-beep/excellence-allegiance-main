import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';

const CreateProject = () => {
  const [form, setForm] = useState({
    name: '',
    client: '',
    type: 'Web Development',
    deadline: '',
    budget: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupState, setPopupState] = useState({ isOpen: false, title: '', message: '', type: 'success', onConfirm: null, showCancel: false, confirmText: 'OK' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setPopupState({
        isOpen: true,
        title: 'Project Created',
        message: `Project "${form.name}" has been created successfully.`,
        type: 'success',
        showCancel: false,
        confirmText: 'Go to Dashboard',
        onConfirm: () => {
          setPopupState(prev => ({ ...prev, isOpen: false }));
          navigate('/admin-dashboard');
        }
      });
    }, 700);
  };

  const closePopup = () => setPopupState(prev => ({ ...prev, isOpen: false }));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Client</label>
              <input name="client" value={form.client} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm">
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>Web Application</option>
                <option>Custom Software</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Budget (USD)</label>
              <input name="budget" value={form.budget} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" rows={4}></textarea>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={() => navigate('/admin-dashboard')} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{isSubmitting ? 'Creating...' : 'Create Project'}</button>
          </div>
        </form>
      </div>

      <Popup
        isOpen={popupState.isOpen}
        title={popupState.title}
        message={popupState.message}
        type={popupState.type}
        onClose={closePopup}
        onConfirm={popupState.onConfirm}
        showCancel={popupState.showCancel}
        confirmText={popupState.confirmText}
        cancelText={popupState.cancelText}
      />
    </div>
  );
};

export default CreateProject;
