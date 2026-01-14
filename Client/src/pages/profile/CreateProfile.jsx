import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  profileService  from '../../services/profileService';

const CreateProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const [formData, setFormData] = useState({
    employeeId: '',
    department: '',
    designation: '',
    joiningDate: '',
    address: '',
    skills: '',
    experience: '',
    education: '',
    profileImage: null
  });

  // Get user data on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    setUserData(user);
    setFormData(prev => ({
      ...prev,
      employeeId: user.employeeId || ''
    }));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          if (key === 'skills') {
            // Convert skills string to array
            const skillsArray = formData[key].split(',').map(skill => skill.trim());
            formDataToSend.append(key, JSON.stringify(skillsArray));
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      const response = await profileService.createProfile(formDataToSend);
      
      if (response.success) {
        // Update user in local storage
        const updatedUser = { ...userData, profileCompleted: true };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Redirect to dashboard
        navigate(`/${userData.role}/dashboard`);
      }
    } catch (error) {
      console.error('Profile creation error:', error);
      alert('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
          <p className="text-gray-600 mb-8">Please provide additional information to complete your profile</p>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Designation *</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter your designation"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Joining Date *</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter your full address"
                rows="3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Skills (comma separated) *</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g., JavaScript, React, Node.js"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Experience (years) *</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  min="0"
                  max="50"
                  placeholder="Years of experience"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Education *</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="e.g., B.Tech Computer Science"
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">Profile Image</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                accept="image/*"
              />
              <p className="text-gray-500 text-sm mt-1">Upload a professional photo (optional)</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Complete Profile'}
              </button>
              
              <button 
                type="button" 
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition"
                onClick={() => navigate(`/${userData.role}/dashboard`)}
              >
                Skip for Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;