import React, { useState, useRef, useEffect } from "react";
import authService from "../../services/authService";
import DashboardLayout from "../dashboard/DashboardLayout";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Edit2,
  Save,
  Camera,
  Upload,
  Shield,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Download,
  CheckCircle,
  XCircle,
  Image,
  Trash2,
  Loader2,
} from "lucide-react";

// Debounce utility function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const ProfilePage = ({ role }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Initial empty profile structure
  const initialProfile = {
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    position: "",
    joinDate: "",
    employeeId: "",
    manager: "",
    skills: [],
    certifications: [],
    education: "",
    experience: "",
    bio: "",
    linkedin: "",
    github: "",
    twitter: "",
    portfolio: "",
    stackoverflow: "",
    profileImage: "",
    gender: "",
    nationality: "",
    dob: "",
    workType: "",
    addressLine1: "",
    city: "",
    zipCode: "",
    country: "",
    emergencyContact: {
      name: "",
      phone: "",
      relationship: "",
    },
    languages: [],
    proficiency: [],
  };

  const [profile, setProfile] = useState(initialProfile);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  // Get default avatar color class based on role
  const getDefaultAvatarColor = () => {
    switch (role) {
      case "admin":
        return "bg-gradient-to-br from-red-500 to-pink-600";
      case "manager":
        return "bg-gradient-to-br from-purple-500 to-indigo-600";
      case "employee":
        return "bg-gradient-to-br from-blue-500 to-cyan-600";
      default:
        return "bg-gradient-to-br from-gray-500 to-blue-600";
    }
  };

  // Load profile data on component mount
  useEffect(() => {
    loadProfileData();
  }, []);

  // Auto-save to localStorage when profile changes (with debouncing)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!loadingProfile && Object.keys(profile).length > 0) {
        try {
          localStorage.setItem("profile", JSON.stringify(profile));
        } catch (e) {
          console.warn("Auto-save failed", e);
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [profile, loadingProfile]);

  // Load profile from server and localStorage
  const loadProfileData = async () => {
    setLoadingProfile(true);
    try {
      // First, check localStorage
      const localData = localStorage.getItem("profile");
      let finalProfile = { ...initialProfile };

      if (localData) {
        try {
          const localProfile = JSON.parse(localData);
          finalProfile = { ...finalProfile, ...localProfile };
          console.log("Loaded from localStorage:", localProfile);
        } catch (e) {
          console.error("Error parsing localStorage data:", e);
        }
      }

      // Try to get from server (but handle 404 gracefully)
      try {
        const serverResponse = await authService.getProfile();
        console.log("Server response:", serverResponse);

        if (
          serverResponse &&
          serverResponse.success &&
          serverResponse.data?.user
        ) {
          // Merge server data with local data
          finalProfile = { ...finalProfile, ...serverResponse.data.user };
        }
      } catch (serverError) {
        console.log(
          "Server fetch failed (this is okay for demo):",
          serverError.message
        );
        // Server might not have the endpoint yet, that's fine
      }

      // If still empty, use demo data
      if (!finalProfile.name && !finalProfile.email) {
        finalProfile = getDemoProfileData();
      }

      setProfile(finalProfile);

      // Set profile image
      if (finalProfile.profileImage) {
        if (
          finalProfile.profileImage.startsWith("data:") ||
          finalProfile.profileImage.startsWith("http") ||
          finalProfile.profileImage.startsWith("blob:")
        ) {
          setProfileImage(finalProfile.profileImage);
        } else {
          setProfileImage(
            `${window.location.origin}${finalProfile.profileImage}`
          );
        }
      }

      // Save to localStorage for future use
      localStorage.setItem("profile", JSON.stringify(finalProfile));
    } catch (error) {
      console.error("Error loading profile:", error);

      // Fallback: load from localStorage
      try {
        const localData = localStorage.getItem("profile");
        if (localData) {
          const localProfile = JSON.parse(localData);
          setProfile(localProfile);

          if (localProfile.profileImage) {
            setProfileImage(localProfile.profileImage);
          }
        } else {
          // Use demo data
          const demoData = getDemoProfileData();
          setProfile(demoData);
          localStorage.setItem("profile", JSON.stringify(demoData));
        }
      } catch (e) {
        console.error("Failed to load from localStorage:", e);
        // Last resort: set demo data
        const demoData = getDemoProfileData();
        setProfile(demoData);
        localStorage.setItem("profile", JSON.stringify(demoData));
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  // Demo data for testing
  const getDemoProfileData = () => {
    return {
      name: "John Doe",
      email: "john.doe@company.com",
      phone: "+880 1712 345678",
      address: "123 Main Street, Dhaka",
      department: "Software Development",
      position: "Senior Developer",
      joinDate: "2022-06-15",
      employeeId: "EMP-2022-0015",
      manager: "Sarah Johnson",
      skills: ["React", "Node.js", "MongoDB", "TypeScript", "AWS", "Docker"],
      certifications: [
        "AWS Certified Developer",
        "React Professional",
        "Scrum Master",
      ],
      education: "BSc in Computer Science, University of Dhaka",
      experience: "5+ years of experience in full-stack web development",
      bio: "Passionate software developer with expertise in modern web technologies. Enjoys solving complex problems and building scalable applications. Always eager to learn new technologies and contribute to team success.",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      portfolio: "https://johndoe.dev",
      stackoverflow: "https://stackoverflow.com/users/johndoe",
      gender: "Male",
      nationality: "Bangladeshi",
      dob: "1990-05-20",
      workType: "Full Time",
      addressLine1: "123 Main Street",
      city: "Dhaka",
      zipCode: "1212",
      country: "Bangladesh",
      emergencyContact: {
        name: "Rahim Ahmed",
        phone: "+880 1712 000000",
        relationship: "Father",
      },
      languages: [
        { language: "English", level: "Fluent", proficiency: 90 },
        { language: "Bangla", level: "Native", proficiency: 100 },
        { language: "Hindi", level: "Intermediate", proficiency: 60 },
      ],
      proficiency: [
        { skill: "React", level: 90, color: "bg-blue-500" },
        { skill: "Node.js", level: 85, color: "bg-green-500" },
        { skill: "MongoDB", level: 80, color: "bg-green-600" },
        { skill: "AWS", level: 75, color: "bg-orange-500" },
      ],
      profileImage: "",
    };
  };

  // Handle save profile
  const handleSave = async () => {
    setSaving(true);
    try {
      // Prepare data for API
      const payload = {
        ...profile,
        // Ensure arrays are properly formatted
        skills: Array.isArray(profile.skills) ? profile.skills : [],
        certifications: Array.isArray(profile.certifications)
          ? profile.certifications
          : [],
        languages: Array.isArray(profile.languages) ? profile.languages : [],
        proficiency: Array.isArray(profile.proficiency)
          ? profile.proficiency
          : [],
      };

      // Try to send to server
      try {
        const response = await authService.updateProfile(payload);

        if (response && response.success) {
          // Update with server response
          const updatedData = response.data?.user || response.data || {};
          setProfile((prev) => ({ ...prev, ...updatedData }));

          // Update localStorage
          localStorage.setItem(
            "profile",
            JSON.stringify({ ...profile, ...updatedData })
          );

          alert("Profile updated successfully!");
        } else {
          throw new Error(response?.message || "Server update failed");
        }
      } catch (serverError) {
        console.log(
          "Server update failed, saving locally:",
          serverError.message
        );
        // Server might not have the endpoint yet, save locally
        localStorage.setItem("profile", JSON.stringify(profile));
        alert("Profile saved locally!");
      }

      // Exit edit mode
      setIsEditing(false);
    } catch (error) {
      console.error("Save error:", error);

      // Fallback: save to localStorage
      localStorage.setItem("profile", JSON.stringify(profile));
      alert("Profile saved locally!");

      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Selected file:", file.name, file.type, file.size);

    // Validation
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Please select a valid image file (JPEG, PNG, GIF, WebP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result;
      setImagePreview(imageDataUrl);
      setProfileImage(imageDataUrl);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      // Show upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Try to upload to server
      try {
        const response = await authService.uploadAvatar(formData);

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (response && response.success) {
          const avatarUrl =
            response.data?.avatarUrl ||
            response.data?.user?.profileImage ||
            response.data?.profileImage;

          if (avatarUrl) {
            // Update profile with image URL
            const updatedProfile = {
              ...profile,
              profileImage: avatarUrl,
            };
            setProfile(updatedProfile);

            // Save to localStorage
            localStorage.setItem("profile", JSON.stringify(updatedProfile));

            alert("Profile picture updated successfully!");
          } else {
            // If no URL in response, save locally
            const localUrl = reader.result;
            const updatedProfile = {
              ...profile,
              profileImage: localUrl,
            };
            setProfile(updatedProfile);
            localStorage.setItem("profile", JSON.stringify(updatedProfile));
            alert("Profile picture saved locally!");
          }
        } else {
          throw new Error(response?.message || "Upload failed");
        }
      } catch (uploadError) {
        console.log(
          "Server upload failed, saving locally:",
          uploadError.message
        );
        // Save locally
        const localUrl = reader.result;
        const updatedProfile = {
          ...profile,
          profileImage: localUrl,
        };
        setProfile(updatedProfile);
        localStorage.setItem("profile", JSON.stringify(updatedProfile));
        alert("Profile picture saved locally!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      // Still save locally
      const localUrl = reader.result;
      const updatedProfile = {
        ...profile,
        profileImage: localUrl,
      };
      setProfile(updatedProfile);
      localStorage.setItem("profile", JSON.stringify(updatedProfile));
      alert("Image saved locally!");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Remove profile image
  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview(null);

    const updatedProfile = {
      ...profile,
      profileImage: "",
    };
    setProfile(updatedProfile);

    // Save to localStorage
    localStorage.setItem("profile", JSON.stringify(updatedProfile));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    alert("Profile picture removed!");
  };

  // Camera capture (simulated)
  const handleCameraCapture = () => {
    alert(
      "Camera feature would be implemented here. For now, please use file upload."
    );
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const event = { target: { files: [file] } };
      handleImageUpload(event);
    }
  };

  // Skill management
  const handleAddSkill = (skill) => {
    if (skill && !profile.skills.includes(skill)) {
      const updatedSkills = [...profile.skills, skill];
      const updatedProfile = {
        ...profile,
        skills: updatedSkills,
      };
      setProfile(updatedProfile);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = profile.skills.filter(
      (skill) => skill !== skillToRemove
    );
    const updatedProfile = {
      ...profile,
      skills: updatedSkills,
    };
    setProfile(updatedProfile);
  };

  const handleAddSkillPrompt = () => {
    const skill = prompt("Enter a new skill:");
    if (skill) handleAddSkill(skill.trim());
  };

  // Certification management
  const handleAddCertification = (cert) => {
    if (cert && !profile.certifications.includes(cert)) {
      const updatedCertifications = [...(profile.certifications || []), cert];
      const updatedProfile = {
        ...profile,
        certifications: updatedCertifications,
      };
      setProfile(updatedProfile);
    }
  };

  const handleAddCertificationPrompt = () => {
    const cert = prompt("Enter certification name:");
    if (cert) handleAddCertification(cert.trim());
  };

  // Language management
  const handleAddLanguagePrompt = () => {
    const language = prompt("Enter language name:");
    const level = prompt(
      "Enter proficiency level (Beginner/Intermediate/Fluent/Native):"
    );
    if (language && level) {
      const proficiency =
        level === "Native"
          ? 100
          : level === "Fluent"
          ? 80
          : level === "Intermediate"
          ? 60
          : 40;

      const updatedLanguages = [
        ...(profile.languages || []),
        {
          language,
          level,
          proficiency,
        },
      ];

      const updatedProfile = {
        ...profile,
        languages: updatedLanguages,
      };
      setProfile(updatedProfile);
    }
  };

  // Remove language
  const handleRemoveLanguage = (index) => {
    const updatedLanguages = (profile.languages || []).filter(
      (_, i) => i !== index
    );
    const updatedProfile = {
      ...profile,
      languages: updatedLanguages,
    };
    setProfile(updatedProfile);
  };

  // Remove certification
  const handleRemoveCertification = (index) => {
    const updatedCertifications = (profile.certifications || []).filter(
      (_, i) => i !== index
    );
    const updatedProfile = {
      ...profile,
      certifications: updatedCertifications,
    };
    setProfile(updatedProfile);
  };

  // Tabs configuration
  const tabs = [
    { id: "personal", label: "Personal Info", icon: <User size={18} /> },
    {
      id: "professional",
      label: "Professional",
      icon: <Briefcase size={18} />,
    },
    { id: "skills", label: "Skills", icon: <Shield size={18} /> },
    { id: "social", label: "Social Links", icon: <Globe size={18} /> },
  ];

  // Loading state
  if (loadingProfile) {
    return (
      <DashboardLayout role={role}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={role}>
      <div className="max-w-6xl mx-auto">
        {/* Header with tabs */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600">
                Manage your personal and professional information
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
                onClick={() => {
                  const dataStr = JSON.stringify(profile, null, 2);
                  const dataBlob = new Blob([dataStr], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "profile-data.json";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
              >
                <Download size={18} className="mr-2" />
                Export Profile
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
              >
                {isEditing ? (
                  <>
                    <XCircle size={18} className="mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 size={18} className="mr-2" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card with Image Upload */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              {/* Profile Image Section */}
              <div className="relative mb-6">
                <div
                  className={`w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 ${
                    profileImage || profile.profileImage
                      ? ""
                      : getDefaultAvatarColor()
                  }`}
                  onClick={() => isEditing && fileInputRef.current?.click()}
                  style={{ cursor: isEditing ? "pointer" : "default" }}
                >
                  {profileImage || profile.profileImage ? (
                    <img
                      src={profileImage || profile.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error("Image failed to load");
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-5xl font-bold">
                      {profile.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>

                {/* Upload Progress Bar */}
                {isUploading && (
                  <div className="absolute -bottom-2 left-0 right-0 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}

                {/* Upload Controls */}
                {isEditing && (
                  <div className="mt-4 space-y-3">
                    {/* Drag and Drop Area */}
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Image size={24} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {isUploading
                          ? "Uploading..."
                          : "Drag & drop or click to upload"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPEG, PNG, GIF, WebP (Max 5MB)
                      </p>
                    </div>

                    {/* Upload Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center justify-center"
                        disabled={isUploading}
                      >
                        <Upload size={16} className="mr-2" />
                        Upload Photo
                      </button>
                      <button
                        onClick={handleCameraCapture}
                        className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 flex items-center justify-center"
                        title="Take Photo"
                      >
                        <Camera size={16} />
                      </button>
                      {(profileImage || profile.profileImage) && (
                        <button
                          onClick={handleRemoveImage}
                          className="px-3 py-2 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200 flex items-center justify-center"
                          title="Remove Photo"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* Image Preview (if available) */}
                    {imagePreview && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Preview:
                        </p>
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-center mb-2">
                  {profile.name || "Not Set"}
                </h2>
                <p className="text-gray-600 text-center mb-4">
                  {profile.position || "No Position"}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <span className="text-gray-600">Employee ID</span>
                    <span className="font-medium">
                      {profile.employeeId || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <span className="text-gray-600">Department</span>
                    <span className="font-medium">
                      {profile.department || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <span className="text-gray-600">Joined</span>
                    <span className="font-medium">
                      {profile.joinDate
                        ? new Date(profile.joinDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <span className="text-gray-600">Reports To</span>
                    <span className="font-medium">
                      {profile.manager || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="border-t pt-6">
                <h3 className="font-medium mb-4 flex items-center">
                  <Globe size={18} className="mr-2" />
                  Connect
                </h3>
                <div className="flex space-x-3 justify-center">
                  {profile.linkedin ? (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    >
                      <Linkedin size={20} />
                    </a>
                  ) : (
                    <div className="p-2 bg-gray-100 text-gray-400 rounded-lg">
                      <Linkedin size={20} />
                    </div>
                  )}

                  {profile.github ? (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      <Github size={20} />
                    </a>
                  ) : (
                    <div className="p-2 bg-gray-100 text-gray-400 rounded-lg">
                      <Github size={20} />
                    </div>
                  )}

                  {profile.twitter ? (
                    <a
                      href={profile.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200"
                    >
                      <Twitter size={20} />
                    </a>
                  ) : (
                    <div className="p-2 bg-gray-100 text-gray-400 rounded-lg">
                      <Twitter size={20} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Personal Information Tab */}
              {activeTab === "personal" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.name || ""}
                            onChange={(e) =>
                              setProfile({ ...profile, name: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your full name"
                            required
                          />
                        ) : (
                          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <User size={20} className="text-gray-400 mr-3" />
                            <span className="font-medium">
                              {profile.name || "Not Set"}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={profile.email || ""}
                            onChange={(e) =>
                              setProfile({ ...profile, email: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="you@example.com"
                            required
                          />
                        ) : (
                          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <Mail size={20} className="text-gray-400 mr-3" />
                            <span>{profile.email || "Not Set"}</span>
                          </div>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profile.phone || ""}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="+880 1712 345678"
                          />
                        ) : (
                          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <Phone size={20} className="text-gray-400 mr-3" />
                            <span>{profile.phone || "Not Set"}</span>
                          </div>
                        )}
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        {isEditing ? (
                          <input
                            type="date"
                            value={profile.dob || ""}
                            onChange={(e) =>
                              setProfile({ ...profile, dob: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <Calendar
                              size={20}
                              className="text-gray-400 mr-3"
                            />
                            <span>
                              {profile.dob
                                ? new Date(profile.dob).toLocaleDateString()
                                : "Not Set"}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender
                        </label>
                        {isEditing ? (
                          <select
                            value={profile.gender || ""}
                            onChange={(e) =>
                              setProfile({ ...profile, gender: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">
                              Prefer not to say
                            </option>
                          </select>
                        ) : (
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <span>{profile.gender || "Not Set"}</span>
                          </div>
                        )}
                      </div>

                      {/* Nationality */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nationality
                        </label>
                        {isEditing ? (
                          <select
                            value={profile.nationality || ""}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                nationality: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Nationality</option>
                            <option value="Bangladeshi">Bangladeshi</option>
                            <option value="American">American</option>
                            <option value="British">British</option>
                            <option value="Canadian">Canadian</option>
                            <option value="Indian">Indian</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <span>{profile.nationality || "Not Set"}</span>
                          </div>
                        )}
                      </div>

                      {/* Full Address - Span 2 columns */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        {isEditing ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={profile.addressLine1 || ""}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  addressLine1: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Street Address"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={profile.city || ""}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    city: e.target.value,
                                  })
                                }
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="City"
                              />
                              <input
                                type="text"
                                value={profile.zipCode || ""}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    zipCode: e.target.value,
                                  })
                                }
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="ZIP/Postal Code"
                              />
                            </div>
                            <select
                              value={profile.country || ""}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  country: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select Country</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="United States">
                                United States
                              </option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
                              <option value="Canada">Canada</option>
                              <option value="India">India</option>
                            </select>
                          </div>
                        ) : (
                          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                            <MapPin
                              size={20}
                              className="text-gray-400 mr-3 mt-1 flex-shrink-0"
                            />
                            <div>
                              {profile.addressLine1 ||
                              profile.city ||
                              profile.country ? (
                                <>
                                  <p>{profile.addressLine1}</p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {profile.city && `${profile.city}, `}
                                    {profile.zipCode && `${profile.zipCode}, `}
                                    {profile.country}
                                  </p>
                                </>
                              ) : (
                                <p className="text-gray-500">Not Set</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="border-t pt-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        About Me
                      </h4>
                      {isEditing && (
                        <span className="text-sm text-gray-500">
                          {profile.bio?.length || 0}/500 characters
                        </span>
                      )}
                    </div>
                    {isEditing ? (
                      <textarea
                        value={profile.bio || ""}
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            setProfile({ ...profile, bio: e.target.value });
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                        placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                        maxLength="500"
                      />
                    ) : (
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl border border-gray-200">
                        <p className="text-gray-700 leading-relaxed">
                          {profile.bio || "No bio added yet."}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Emergency Contact */}
                  <div className="border-t pt-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-6">
                      Emergency Contact
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Emergency Contact Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.emergencyContact?.name || ""}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                emergencyContact: {
                                  ...profile.emergencyContact,
                                  name: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Contact name"
                          />
                        ) : (
                          <p className="p-4 bg-gray-50 rounded-lg">
                            {profile.emergencyContact?.name || "Not Set"}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Emergency Contact Phone
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profile.emergencyContact?.phone || ""}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                emergencyContact: {
                                  ...profile.emergencyContact,
                                  phone: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Contact phone number"
                          />
                        ) : (
                          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <Phone size={20} className="text-gray-400 mr-3" />
                            <span>
                              {profile.emergencyContact?.phone || "Not Set"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Relationship
                        </label>
                        {isEditing ? (
                          <select
                            value={profile.emergencyContact?.relationship || ""}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                emergencyContact: {
                                  ...profile.emergencyContact,
                                  relationship: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Relationship</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Friend">Friend</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          <p className="p-4 bg-gray-50 rounded-lg">
                            {profile.emergencyContact?.relationship ||
                              "Not Set"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Stats */}
                  <div className="border-t pt-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-6">
                      Personal Statistics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                        <div className="text-2xl font-bold text-blue-700 mb-1">
                          {profile.experience?.match(/\d+/)?.[0] || "5+"}
                        </div>
                        <div className="text-sm text-blue-600">
                          Years Experience
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                        <div className="text-2xl font-bold text-green-700 mb-1">
                          {Math.min(
                            100,
                            (
                              (Object.keys(profile).filter(
                                (key) =>
                                  profile[key] &&
                                  profile[key] !== "" &&
                                  !Array.isArray(profile[key]) &&
                                  typeof profile[key] === "string"
                              ).length /
                                20) *
                              100
                            ).toFixed(0)
                          )}
                          %
                        </div>
                        <div className="text-sm text-green-600">
                          Profile Complete
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
                        <div className="text-2xl font-bold text-purple-700 mb-1">
                          {profile.skills?.length || 0}
                        </div>
                        <div className="text-sm text-purple-600">Skills</div>
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
                        <div className="text-2xl font-bold text-amber-700 mb-1">
                          4.8
                        </div>
                        <div className="text-sm text-amber-600">
                          Rating Score
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Professional Information Tab */}
              {activeTab === "professional" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Professional Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.position || ""}
                          onChange={(e) =>
                            setProfile({ ...profile, position: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Senior Developer"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg">
                          {profile.position || "Not Set"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      {isEditing ? (
                        <select
                          value={profile.department || ""}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              department: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Department</option>
                          <option value="Software Development">
                            Software Development
                          </option>
                          <option value="Marketing">Marketing</option>
                          <option value="Sales">Sales</option>
                          <option value="Human Resources">
                            Human Resources
                          </option>
                          <option value="Finance">Finance</option>
                          <option value="Operations">Operations</option>
                          <option value="Customer Support">
                            Customer Support
                          </option>
                          <option value="Design">Design</option>
                          <option value="Product Management">
                            Product Management
                          </option>
                        </select>
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg">
                          {profile.department || "Not Set"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employee ID
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.employeeId || ""}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              employeeId: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="EMP-XXXX-XXXX"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg">
                          {profile.employeeId || "Not Set"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Manager
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.manager || ""}
                          onChange={(e) =>
                            setProfile({ ...profile, manager: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Sarah Johnson"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg">
                          {profile.manager || "Not Set"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Join Date
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={profile.joinDate || ""}
                          onChange={(e) =>
                            setProfile({ ...profile, joinDate: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg">
                          {profile.joinDate
                            ? new Date(profile.joinDate).toLocaleDateString()
                            : "Not Set"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Type
                      </label>
                      {isEditing ? (
                        <select
                          value={profile.workType || ""}
                          onChange={(e) =>
                            setProfile({ ...profile, workType: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Work Type</option>
                          <option value="Full Time">Full Time</option>
                          <option value="Part Time">Part Time</option>
                          <option value="Contract">Contract</option>
                          <option value="Remote">Remote</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg">
                          {profile.workType || "Not Set"}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Education
                      </label>
                      {isEditing ? (
                        <textarea
                          value={profile.education || ""}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              education: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows="3"
                          placeholder="e.g., BSc in Computer Science, University of Dhaka"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg">
                          {profile.education || "Not Set"}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Experience
                      </label>
                      {isEditing ? (
                        <textarea
                          value={profile.experience || ""}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              experience: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows="4"
                          placeholder="Describe your work experience"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg">
                          {profile.experience || "Not Set"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Certifications Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Certifications
                      </label>
                      {isEditing && (
                        <button
                          onClick={handleAddCertificationPrompt}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          + Add Certification
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {(profile.certifications || []).length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No certifications added.
                        </p>
                      ) : (
                        (profile.certifications || []).map((cert, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center">
                              <CheckCircle
                                size={16}
                                className="text-green-500 mr-2"
                              />
                              <span>{cert}</span>
                            </div>
                            {isEditing && (
                              <button
                                onClick={() => handleRemoveCertification(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <XCircle size={16} />
                              </button>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Languages Section */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-700">Languages</h4>
                      {isEditing && (
                        <button
                          onClick={handleAddLanguagePrompt}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          + Add Language
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      {(profile.languages || []).length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No languages added.
                        </p>
                      ) : (
                        (profile.languages || []).map((lang, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center">
                              <span className="font-medium text-gray-800">
                                {lang.language}
                              </span>
                              <span className="ml-3 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                                {lang.level}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${lang.proficiency}%` }}
                                ></div>
                              </div>
                              {isEditing && (
                                <button
                                  onClick={() => handleRemoveLanguage(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <XCircle size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Skills & Expertise
                      </h3>
                      {isEditing && (
                        <button
                          onClick={handleAddSkillPrompt}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                        >
                          + Add Skill
                        </button>
                      )}
                    </div>

                    <div className="mb-8">
                      <h4 className="font-medium text-gray-700 mb-4">
                        Technical Skills
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {profile.skills.length === 0 ? (
                          <p className="text-gray-500">No skills added yet.</p>
                        ) : (
                          profile.skills.map((skill, index) => (
                            <div key={index} className="relative group">
                              <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                                <span className="font-medium">{skill}</span>
                                {isEditing && (
                                  <button
                                    onClick={() => handleRemoveSkill(skill)}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                  >
                                    <XCircle size={16} />
                                  </button>
                                )}
                              </div>
                              {/* Skill level indicator */}
                              {!isEditing && (
                                <div className="absolute bottom-0 left-0 right-0 bg-blue-200 rounded-full h-1">
                                  <div
                                    className="bg-blue-600 h-1 rounded-full"
                                    style={{
                                      width: `${Math.min(
                                        (index + 1) * 20,
                                        100
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Proficiency Levels */}
                    {(profile.proficiency || []).length > 0 && (
                      <div className="mb-8">
                        <h4 className="font-medium text-gray-700 mb-4">
                          Proficiency Levels
                        </h4>
                        <div className="space-y-6">
                          {(profile.proficiency || []).map((item, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                  {item.skill}
                                </span>
                                <span className="text-sm font-medium">
                                  {item.level}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.color}`}
                                  style={{ width: `${item.level}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Soft Skills */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-4">
                        Soft Skills
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          "Communication",
                          "Teamwork",
                          "Leadership",
                          "Problem Solving",
                          "Time Management",
                          "Adaptability",
                          "Creativity",
                          "Critical Thinking",
                        ].map((skill) => (
                          <div
                            key={skill}
                            className="bg-green-50 border border-green-100 rounded-lg p-3 text-center"
                          >
                            <span className="text-sm font-medium text-green-800">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Links Tab */}
              {activeTab === "social" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Social Links & Networks
                    </h3>

                    <div className="space-y-6">
                      {/* LinkedIn */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-200 hover:bg-blue-50 transition">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                              <Linkedin size={24} className="text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                LinkedIn
                              </h4>
                              <p className="text-sm text-gray-600">
                                Professional network
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                profile.linkedin
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {profile.linkedin ? "Connected" : "Not Connected"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile URL
                          </label>
                          {isEditing ? (
                            <div className="flex space-x-2">
                              <input
                                type="url"
                                value={profile.linkedin || ""}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    linkedin: e.target.value,
                                  })
                                }
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://linkedin.com/in/username"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-blue-600">
                                {profile.linkedin || "Not connected"}
                              </span>
                              {profile.linkedin && (
                                <a
                                  href={profile.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                  Visit →
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* GitHub */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:bg-gray-50 transition">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                              <Github size={24} className="text-gray-700" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                GitHub
                              </h4>
                              <p className="text-sm text-gray-600">
                                Code repository
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                profile.github
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {profile.github ? "Connected" : "Not Connected"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile URL
                          </label>
                          {isEditing ? (
                            <div className="flex space-x-2">
                              <input
                                type="url"
                                value={profile.github || ""}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    github: e.target.value,
                                  })
                                }
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://github.com/username"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-gray-700">
                                {profile.github || "Not connected"}
                              </span>
                              {profile.github && (
                                <a
                                  href={profile.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-gray-700 hover:text-gray-900"
                                >
                                  Visit →
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Twitter */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-sky-200 hover:bg-sky-50 transition">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mr-4">
                              <Twitter size={24} className="text-sky-500" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                Twitter
                              </h4>
                              <p className="text-sm text-gray-600">
                                Social media
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                profile.twitter
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {profile.twitter ? "Connected" : "Not Connected"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile URL
                          </label>
                          {isEditing ? (
                            <div className="flex space-x-2">
                              <input
                                type="url"
                                value={profile.twitter || ""}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    twitter: e.target.value,
                                  })
                                }
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://twitter.com/username"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-sky-600">
                                {profile.twitter || "Not connected"}
                              </span>
                              {profile.twitter && (
                                <a
                                  href={profile.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-sky-600 hover:text-sky-800"
                                >
                                  Visit →
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Additional Social Links */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Additional Profiles
                        </h4>
                        <div className="space-y-4">
                          {/* Portfolio Website */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Portfolio Website
                            </label>
                            {isEditing ? (
                              <input
                                type="url"
                                value={profile.portfolio || ""}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    portfolio: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://yourportfolio.com"
                              />
                            ) : (
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span>
                                  {profile.portfolio ||
                                    "No portfolio website added"}
                                </span>
                                {profile.portfolio && (
                                  <a
                                    href={profile.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                  >
                                    Visit →
                                  </a>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Stack Overflow */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Stack Overflow
                            </label>
                            {isEditing ? (
                              <input
                                type="url"
                                value={profile.stackoverflow || ""}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    stackoverflow: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://stackoverflow.com/users/username"
                              />
                            ) : (
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span>
                                  {profile.stackoverflow || "Not connected"}
                                </span>
                                {profile.stackoverflow && (
                                  <a
                                    href={profile.stackoverflow}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                  >
                                    Visit →
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Stats */}
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
                    <h4 className="text-lg font-semibold mb-6">
                      Social Statistics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-white/20 rounded-lg">
                        <div className="text-2xl font-bold">1,250</div>
                        <div className="text-sm opacity-90">
                          LinkedIn Connections
                        </div>
                      </div>
                      <div className="text-center p-4 bg-white/20 rounded-lg">
                        <div className="text-2xl font-bold">
                          {profile.skills?.length || 0}
                        </div>
                        <div className="text-sm opacity-90">
                          GitHub Repositories
                        </div>
                      </div>
                      <div className="text-center p-4 bg-white/20 rounded-lg">
                        <div className="text-2xl font-bold">2.5K</div>
                        <div className="text-sm opacity-90">
                          Twitter Followers
                        </div>
                      </div>
                      <div className="text-center p-4 bg-white/20 rounded-lg">
                        <div className="text-2xl font-bold">95%</div>
                        <div className="text-sm opacity-90">
                          Profile Completeness
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              {isEditing && (
                <div className="mt-8 pt-6 border-t flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      // Reload original data
                      loadProfileData();
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
