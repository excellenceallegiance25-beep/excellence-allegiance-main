// src/pages/profile/ProfileSetupPage.jsx - Education Select Version
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Upload,
  X,
  Check,
  Plus,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileSetupPage = () => {
  const navigate = useNavigate(); 
  const { completeProfile, user } = useAuth();
  
  console.log('👤 Current user in ProfileSetup:', user);
  
  // ✅ নাম user থেকে নিবে না, user নিজে ইনপুট দেবে
  const [formData, setFormData] = useState({
    fullName: '', // ✅ শূন্য থেকে শুরু করছি
    jobTitle: '',
    department: '',
    skills: [],
    educationLevel: '',
    degree: '',
    institution: '',
    graduationYear: '',
    additionalEducation: [],
    location: '',
    bio: '',
    avatar: null,
    profileCompleted: true,
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [newEducation, setNewEducation] = useState({
    level: '',
    degree: '',
    institution: '',
    year: ''
  });
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const departments = [
    'Engineering',
    'Design',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'IT Support',
    'Product Management',
    'Quality Assurance'
  ];

  const educationLevels = [
    'High School',
    'Diploma',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Post Doctorate',
    'Certification',
    'Other'
  ];

  const degreeTypes = [
    'Computer Science',
    'Information Technology',
    'Software Engineering',
    'Business Administration',
    'Marketing',
    'Finance',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Data Science',
    'Artificial Intelligence',
    'Cybersecurity',
    'Graphic Design',
    'Human Resources',
    'Project Management',
    'Medicine',
    'Law',
    'Architecture',
    'Other'
  ];

  const skillSuggestions = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
    'UI/UX Design', 'Project Management', 'DevOps', 'AWS',
    'MongoDB', 'SQL', 'Agile Methodologies', 'Communication',
    'Leadership', 'Problem Solving', 'Teamwork', 'Analytical Skills'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, currentSkill.trim()],
      });
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const addSuggestedSkill = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  };

  const handleEducationChange = (e) => {
    setNewEducation({
      ...newEducation,
      [e.target.name]: e.target.value
    });
  };

  const addEducation = () => {
    if (newEducation.level && newEducation.degree && newEducation.institution) {
      const educationEntry = {
        level: newEducation.level,
        degree: newEducation.degree,
        institution: newEducation.institution,
        year: newEducation.year || 'Present'
      };

      setFormData({
        ...formData,
        additionalEducation: [...formData.additionalEducation, educationEntry]
      });

      // Reset form
      setNewEducation({
        level: '',
        degree: '',
        institution: '',
        year: ''
      });
      setShowAddEducation(false);
    }
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.additionalEducation.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      additionalEducation: updatedEducation
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) {
      alert('Please enter your name');
      return;
    }
    
    if (!formData.educationLevel && formData.additionalEducation.length === 0) {
      alert('Please add at least one education entry');
      return;
    }
    
    setLoading(true);

    console.log('🔄 Submitting profile data:', formData);

    try {
      // ✅ Combine education data
      const educationData = {
        primary: {
          level: formData.educationLevel,
          degree: formData.degree,
          institution: formData.institution,
          graduationYear: formData.graduationYear
        },
        additional: formData.additionalEducation
      };

      // ✅ সঠিক format-এ data পাঠানো
      const profileData = {
        name: formData.fullName.trim(),
        jobTitle: formData.jobTitle,
        department: formData.department,
        skills: formData.skills,
        education: educationData,
        location: formData.location,
        bio: formData.bio,
        avatar: formData.avatar,
        profileCompleted: true,
      };

      const result = await completeProfile(profileData);
      
      console.log('📤 Complete profile result:', result);
      console.log('✅ Result success:', result.success);
      console.log('👤 Result user:', result.user);
      
      if (result.success) {
        console.log('✅ Profile setup successful!');
        
        // Show success message
        alert(`Profile completed successfully! Welcome, ${formData.fullName}!`);
        
        // DIRECT REDIRECT
        const updatedUser = result.user || user;
        const userRole = updatedUser?.role || 'employee';
        console.log('🎯 User role:', userRole);
        console.log('👤 User name after update:', updatedUser?.name);
        
        // Redirect based on role
        setTimeout(() => {
          if (userRole === 'admin') {
            window.location.href = '/admin/dashboard';
          } else if (userRole === 'manager') {
            window.location.href = '/manager/dashboard';
          } else {
            window.location.href = '/employee/dashboard';
          }
        }, 1000);
        
      } else {
        console.error('❌ Profile setup failed:', result.message);
        alert(result.message || 'Profile setup failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Profile setup error:', error);
      alert('Profile setup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      // Skip profile setup with user-provided name
      const skipData = {
        name: formData.fullName.trim() || user?.name || 'User',
        jobTitle: 'Employee',
        department: 'General',
        profileCompleted: true,
      };
      
      const result = await completeProfile(skipData);
      
      if (result.success) {
        const userRole = result.user?.role || user?.role;
        setTimeout(() => {
          if (userRole === 'admin') {
            window.location.href = '/admin/dashboard';
          } else if (userRole === 'manager') {
            window.location.href = '/manager/dashboard';
          } else {
            window.location.href = '/employee/dashboard';
          }
        }, 500);
      }
    } catch (error) {
      console.error('Skip failed:', error);
    }
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1970; year--) {
      years.push(year);
    }
    return years;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="text-gray-600 mt-2">
            Tell us about yourself to personalize your experience
          </p>
          
          {/* User ID Display */}
          {user?.userId && (
            <div className="mt-4 inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
              <p className="text-sm font-medium">Your ID: <span className="font-mono font-bold">{user.userId}</span></p>
            </div>
          )}
          
          {/* Progress Steps */}
          <div className="mt-8 flex justify-center items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="w-24 h-1 bg-blue-600 mx-2"></div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="w-24 h-1 bg-blue-600 mx-2"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 text-sm text-gray-600">
            <span className="w-24 text-center">Account</span>
            <span className="w-24 text-center mx-8">Profile</span>
            <span className="w-24 text-center">Complete</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {/* Avatar Upload */}
              <div className="mb-10 text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <User size={48} className="text-white" />
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg"
                  >
                    <Upload size={20} />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Upload a professional photo (optional)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Enter your name"
                      required
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This name will appear on your profile
                  </p>
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Software Engineer"
                      required
                    />
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Dhaka, Bangladesh"
                    />
                  </div>
                </div>

                {/* 🔥 Education - Select Version */}
                <div className="md:col-span-2">
                  <div className="border-t pt-6 mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        <GraduationCap className="inline-block mr-2" size={20} />
                        Education Details
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowAddEducation(!showAddEducation)}
                        className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <Plus size={16} className="mr-1" />
                        {showAddEducation ? 'Cancel' : 'Add Education'}
                      </button>
                    </div>

                    {/* Primary Education */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Highest Education Level *
                        </label>
                        <select
                          name="educationLevel"
                          value={formData.educationLevel}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        >
                          <option value="">Select Level</option>
                          {educationLevels.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Degree/Field *
                        </label>
                        <select
                          name="degree"
                          value={formData.degree}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        >
                          <option value="">Select Degree</option>
                          {degreeTypes.map((degree) => (
                            <option key={degree} value={degree}>
                              {degree}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution *
                        </label>
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          placeholder="University/College Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Graduation Year
                        </label>
                        <select
                          name="graduationYear"
                          value={formData.graduationYear}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        >
                          <option value="">Select Year</option>
                          <option value="Present">Present</option>
                          {generateYearOptions().map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Add Education Form */}
                    {showAddEducation && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="text-md font-medium text-gray-900 mb-3">Add Another Education</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Education Level
                            </label>
                            <select
                              name="level"
                              value={newEducation.level}
                              onChange={handleEducationChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                              <option value="">Select Level</option>
                              {educationLevels.map((level) => (
                                <option key={level} value={level}>
                                  {level}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Degree/Field
                            </label>
                            <select
                              name="degree"
                              value={newEducation.degree}
                              onChange={handleEducationChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                              <option value="">Select Degree</option>
                              {degreeTypes.map((degree) => (
                                <option key={degree} value={degree}>
                                  {degree}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Institution
                            </label>
                            <input
                              type="text"
                              name="institution"
                              value={newEducation.institution}
                              onChange={handleEducationChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="Institution Name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Year
                            </label>
                            <select
                              name="year"
                              value={newEducation.year}
                              onChange={handleEducationChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                              <option value="">Select Year</option>
                              <option value="Present">Present</option>
                              {generateYearOptions().map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button
                            type="button"
                            onClick={addEducation}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            disabled={!newEducation.level || !newEducation.degree || !newEducation.institution}
                          >
                            Add Education
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Added Education List */}
                    {formData.additionalEducation.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-md font-medium text-gray-900 mb-2">Additional Education</h4>
                        <div className="space-y-3">
                          {formData.additionalEducation.map((edu, index) => (
                            <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                              <div>
                                <span className="font-medium text-gray-900">{edu.degree}</span>
                                <p className="text-sm text-gray-600">
                                  {edu.level} - {edu.institution} ({edu.year})
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeEducation(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div className="md:col-span-2">
                  <div className="border-t pt-6 mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Add a skill"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>

                    {/* Skill Suggestions */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        {skillSuggestions.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => addSuggestedSkill(skill)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                              formData.skills.includes(skill)
                                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {skill}
                            {formData.skills.includes(skill) && (
                              <Check size={12} className="inline ml-1" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Skills */}
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="hover:text-blue-200"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <div className="border-t pt-6 mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio/About Me
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Tell us about your experience, interests, and goals..."
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">
                      Write a brief introduction about yourself (max 500 characters)
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Skip for Now
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.fullName.trim() || !formData.jobTitle || !formData.department || (!formData.educationLevel && formData.additionalEducation.length === 0)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Completing Profile...
                    </span>
                  ) : (
                    'Complete Profile'
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                You can update this information later in your profile settings.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;