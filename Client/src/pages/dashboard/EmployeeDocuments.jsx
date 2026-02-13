import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "./DashboardLayout";

import {
  FileText,
  Folder,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Share2,
  Search,
  Filter,
  Calendar,
  User,
  Lock,
  Globe,
  MoreVertical,
  Plus,
  FolderPlus,
  CheckCircle,
  Clock,
  AlertCircle,
  File,
  FileImage,
  FileSpreadsheet,
  FileCode,
  FileArchive,
  FileVideo,
  FileAudio,
  ChevronRight,
} from "lucide-react";

const EmployeeDocuments = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [newDocument, setNewDocument] = useState({
    name: "",
    description: "",
    category: "personal",
    privacy: "private",
    file: null,
  });

  // Firebase collection reference
  const documentsCollection = firestoreHelper.collection(db, "documents");

  // Fetch documents from Firebase
  const fetchDocuments = async () => {
    try {
      setLoading(true);

      // Create query based on user role
      let q;
      if (user?.role === "admin") {
        q = firestoreHelper.query(
          documentsCollection,
          firestoreHelper.orderBy("uploadDate", "desc")
        );
      } else {
        q = firestoreHelper.query(
          documentsCollection,
          firestoreHelper.where("userId", "==", user?.uid),
          firestoreHelper.orderBy("uploadDate", "desc")
        );
      }

      const querySnapshot = await firestoreHelper.getDocs(q);
      const documentsList = [];

      querySnapshot.forEach((doc) => {
        documentsList.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setDocuments(documentsList);
    } catch (error) {
      console.error("Error fetching documents:", error);
      alert("Failed to fetch documents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  // Upload document to Firebase
  const handleUploadDocument = async () => {
    if (!newDocument.name.trim() || !newDocument.file) {
      alert("Please provide document name and select a file");
      return;
    }

    if (!user) {
      alert("You must be logged in to upload documents");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // 1. Upload file to Firebase Storage
      const storageRef = storageHelper.ref(
        storage,
        `documents/${user.uid}/${Date.now()}_${newDocument.file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, newDocument.file);

      // Track upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          alert("File upload failed. Please try again.");
          setIsUploading(false);
        },
        async () => {
          try {
            // 2. Get download URL
            const downloadURL = await storageHelper.getDownloadURL(
              uploadTask.snapshot.ref
            );

            // 3. Save document metadata to Firestore
            const documentData = {
              name: newDocument.name,
              description: newDocument.description,
              type: newDocument.file.name.split(".").pop().toLowerCase(),
              size: newDocument.file.size,
              fileSizeFormatted: `${(
                newDocument.file.size /
                (1024 * 1024)
              ).toFixed(1)} MB`,
              uploadDate: new Date().toISOString(),
              modifiedDate: new Date().toISOString(),
              category: newDocument.category,
              privacy: newDocument.privacy,
              userId: user.uid,
              uploadedBy: user?.name || user?.email || "Unknown",
              status: "pending",
              tags: [],
              downloadURL: downloadURL,
              storagePath: uploadTask.snapshot.ref.fullPath,
              fileType: newDocument.file.type,
              fileName: newDocument.file.name,
            };

            const docRef = await firestoreHelper.addDoc(
              documentsCollection,
              documentData
            );

            // 4. Update local state
            const newDoc = {
              id: docRef.id,
              ...documentData,
            };

            setDocuments((prev) => [newDoc, ...prev]);

            // 5. Reset form and close modal
            setNewDocument({
              name: "",
              description: "",
              category: "personal",
              privacy: "private",
              file: null,
            });
            setShowUploadModal(false);
            setUploadProgress(0);

            alert("Document uploaded successfully!");
          } catch (error) {
            console.error("Error saving document:", error);
            alert("Failed to save document metadata. Please try again.");
          } finally {
            setIsUploading(false);
          }
        }
      );
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  // Delete document from Firebase
  const handleDeleteDocument = async (document) => {
    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      // 1. Delete from Storage
      if (document.storagePath) {
        const fileRef = storageHelper.ref(storage, document.storagePath);
        await storageHelper.deleteObject(fileRef);
      }

      // 2. Delete from Firestore
      const docRef = firestoreHelper.doc(db, "documents", document.id);
      await firestoreHelper.deleteDoc(docRef);

      // 3. Update local state
      setDocuments((prev) => prev.filter((doc) => doc.id !== document.id));

      alert("Document deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete document. Please try again.");
    }
  };

  // Download document
  const handleDownloadDocument = async (document) => {
    try {
      if (!document.downloadURL) {
        alert("Download URL not available");
        return;
      }

      // Create a temporary link to trigger download
      const link = document.createElement("a");
      link.href = document.downloadURL;
      link.download = document.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download document. Please try again.");
    }
  };

  // Update document status or metadata
  const handleUpdateDocument = async (documentId, updates) => {
    try {
      const docRef = firestoreHelper.doc(db, "documents", documentId);
      await firestoreHelper.updateDoc(docRef, {
        ...updates,
        modifiedDate: new Date().toISOString(),
      });

      // Update local state
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === documentId ? { ...doc, ...updates } : doc
        )
      );

      return true;
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update document. Please try again.");
      return false;
    }
  };

  // Share document
  const handleShareDocument = async (document) => {
    const shareUrl = document.downloadURL;

    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.name,
          text: document.description || "Check out this document",
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      }
    } else {
      // Fallback to clipboard copy
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const folders = [
    {
      id: "all",
      name: "All Documents",
      count: documents.length,
      icon: <Folder />,
    },
    {
      id: "personal",
      name: "Personal",
      count: documents.filter((d) => d.privacy === "private").length,
      icon: <Lock />,
    },
    {
      id: "shared",
      name: "Shared",
      count: documents.filter((d) => d.privacy === "team").length,
      icon: <Share2 />,
    },
    {
      id: "public",
      name: "Public",
      count: documents.filter((d) => d.privacy === "public").length,
      icon: <Globe />,
    },
    {
      id: "recent",
      name: "Recently Added",
      count: documents.filter((d) => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(d.uploadDate) > weekAgo;
      }).length,
      icon: <Clock />,
    },
    {
      id: "favorites",
      name: "Favorites",
      count: documents.filter((d) => d.isFavorite).length,
      icon: <CheckCircle />,
    },
  ];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "employment", name: "Employment" },
    { id: "performance", name: "Performance" },
    { id: "project", name: "Projects" },
    { id: "finance", name: "Finance" },
    { id: "company", name: "Company" },
    { id: "training", name: "Training" },
    { id: "technical", name: "Technical" },
  ];

  const getFileIcon = (type) => {
    const fileType = type?.toLowerCase();
    switch (fileType) {
      case "pdf":
        return <FileText className="w-6 h-6 text-red-500" />;
      case "doc":
      case "docx":
        return <FileText className="w-6 h-6 text-blue-500" />;
      case "ppt":
      case "pptx":
        return <FileText className="w-6 h-6 text-orange-500" />;
      case "xlsx":
      case "xls":
      case "csv":
        return <FileSpreadsheet className="w-6 h-6 text-green-500" />;
      case "zip":
      case "rar":
      case "7z":
      case "tar":
      case "gz":
        return <FileArchive className="w-6 h-6 text-yellow-500" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "svg":
      case "webp":
        return <FileImage className="w-6 h-6 text-purple-500" />;
      case "md":
      case "txt":
      case "json":
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
      case "html":
      case "css":
        return <FileCode className="w-6 h-6 text-gray-500" />;
      case "mp4":
      case "avi":
      case "mov":
      case "wmv":
        return <FileVideo className="w-6 h-6 text-pink-500" />;
      case "mp3":
      case "wav":
      case "ogg":
      case "flac":
        return <FileAudio className="w-6 h-6 text-indigo-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPrivacyIcon = (privacy) => {
    switch (privacy) {
      case "private":
        return <Lock className="w-4 h-4" />;
      case "team":
        return <User className="w-4 h-4" />;
      case "public":
        return <Globe className="w-4 h-4" />;
      default:
        return <Lock className="w-4 h-4" />;
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert("File size must be less than 50MB");
        return;
      }

      // Auto-fill name if empty
      const fileName =
        newDocument.name || file.name.split(".").slice(0, -1).join(".");

      setNewDocument({
        ...newDocument,
        file,
        name: fileName,
      });
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    // Filter by selected folder
    if (selectedFolder !== "all") {
      if (selectedFolder === "personal" && doc.privacy !== "private")
        return false;
      if (selectedFolder === "shared" && doc.privacy !== "team") return false;
      if (selectedFolder === "public" && doc.privacy !== "public") return false;
      if (selectedFolder === "recent") {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(doc.uploadDate) > weekAgo;
      }
      if (selectedFolder === "favorites" && !doc.isFavorite) return false;
    }

    // Filter by category
    if (filter !== "all" && doc.category !== filter) return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(query) ||
        (doc.description && doc.description.toLowerCase().includes(query)) ||
        (doc.tags && doc.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    return true;
  });

  // Calculate storage usage
  const calculateStorageUsage = () => {
    const totalSize = documents.reduce((sum, doc) => sum + (doc.size || 0), 0);
    const totalGB = totalSize / (1024 * 1024 * 1024);
    const maxStorage = 50; // 50GB limit
    const usedPercentage = (totalGB / maxStorage) * 100;

    return {
      used: totalGB.toFixed(1),
      total: maxStorage,
      percentage: usedPercentage.toFixed(1),
    };
  };

  const storageStats = calculateStorageUsage();

  return (
    <DashboardLayout role="employee">
      <div className="w-full h-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Documents Library
              </h1>
              <p className="text-gray-600 mt-2">
                Store, manage, and share your important documents
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2">
                <FolderPlus className="w-4 h-4" />
                New Folder
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload File
              </button>
            </div>
          </div>

          {/* Storage Stats */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-sm opacity-90 mb-2">Storage Usage</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">
                    {storageStats.used} GB
                  </span>
                  <span className="text-lg opacity-80">
                    / {storageStats.total} GB
                  </span>
                </div>
                <div className="w-full bg-blue-700 rounded-full h-2 mt-4">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${storageStats.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm opacity-90 mt-2">
                  {storageStats.percentage}% of storage used
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                  <p className="text-sm">Total Files</p>
                  <p className="text-2xl font-bold">{documents.length}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                  <p className="text-sm">Shared Files</p>
                  <p className="text-2xl font-bold">
                    {documents.filter((d) => d.privacy === "team").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Folders */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Folders</h3>
              <div className="space-y-1">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg ${
                      selectedFolder === folder.id
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedFolder === folder.id
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        {folder.icon}
                      </div>
                      <span className="font-medium">{folder.name}</span>
                    </div>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        selectedFolder === folder.id
                          ? "bg-blue-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {folder.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div className="bg-white rounded-xl border p-4 mt-4">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`w-full text-left p-2 rounded-lg ${
                      filter === category.id
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl border p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search documents by name, description, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => fetchDocuments()}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
              </div>
            </div>

            {/* Documents Grid/List */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading documents...</p>
                </div>
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border">
                <div className="text-gray-400 mb-4">
                  <FileText className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No documents found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || filter !== "all" || selectedFolder !== "all"
                    ? "Try adjusting your search or filters"
                    : "Upload your first document to get started"}
                </p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Upload First Document
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {getFileIcon(doc.type)}
                        <div>
                          <h4 className="font-medium text-gray-900 truncate max-w-[180px]">
                            {doc.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {doc.fileSizeFormatted || "Unknown size"} •{" "}
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() =>
                            handleUpdateDocument(doc.id, {
                              isFavorite: !doc.isFavorite,
                            })
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <CheckCircle
                            className={`w-4 h-4 ${
                              doc.isFavorite
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getPrivacyIcon(doc.privacy)}
                          <span className="text-xs text-gray-600 capitalize">
                            {doc.privacy} • {doc.category}
                          </span>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                            doc.status
                          )}`}
                        >
                          {doc.status}
                        </span>
                      </div>

                      {doc.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {doc.description}
                        </p>
                      )}

                      {doc.tags && doc.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              window.open(doc.downloadURL, "_blank")
                            }
                            className="p-2 hover:bg-gray-100 rounded"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDownloadDocument(doc)}
                            className="p-2 hover:bg-gray-100 rounded"
                            title="Download"
                          >
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleShareDocument(doc)}
                            className="p-2 hover:bg-gray-100 rounded"
                            title="Share"
                          >
                            <Share2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteDocument(doc)}
                          className="p-2 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">PDF Files</p>
                    <p className="text-xl font-bold">
                      {documents.filter((d) => d.type === "pdf").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileSpreadsheet className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Spreadsheets</p>
                    <p className="text-xl font-bold">
                      {
                        documents.filter(
                          (d) => d.type?.includes("xls") || d.type === "csv"
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileImage className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Images</p>
                    <p className="text-xl font-bold">
                      {
                        documents.filter((d) =>
                          [
                            "jpg",
                            "jpeg",
                            "png",
                            "gif",
                            "bmp",
                            "svg",
                            "webp",
                          ].includes(d.type)
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FileArchive className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Archives</p>
                    <p className="text-xl font-bold">
                      {
                        documents.filter((d) =>
                          ["zip", "rar", "7z", "tar", "gz"].includes(d.type)
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Upload Document
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  disabled={isUploading}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Name *
                  </label>
                  <input
                    type="text"
                    value={newDocument.name}
                    onChange={(e) =>
                      setNewDocument({ ...newDocument, name: e.target.value })
                    }
                    placeholder="Enter document name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    disabled={isUploading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newDocument.description}
                    onChange={(e) =>
                      setNewDocument({
                        ...newDocument,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of the document..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows="3"
                    disabled={isUploading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newDocument.category}
                      onChange={(e) =>
                        setNewDocument({
                          ...newDocument,
                          category: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={isUploading}
                    >
                      <option value="personal">Personal</option>
                      <option value="employment">Employment</option>
                      <option value="performance">Performance</option>
                      <option value="project">Project</option>
                      <option value="finance">Finance</option>
                      <option value="technical">Technical</option>
                      <option value="company">Company</option>
                      <option value="training">Training</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Privacy
                    </label>
                    <select
                      value={newDocument.privacy}
                      onChange={(e) =>
                        setNewDocument({
                          ...newDocument,
                          privacy: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      disabled={isUploading}
                    >
                      <option value="private">Private</option>
                      <option value="team">Team Only</option>
                      <option value="public">Public</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select File *
                  </label>
                  <div
                    className={`border-2 border-dashed ${
                      newDocument.file
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300"
                    } rounded-lg p-8 text-center`}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      {newDocument.file
                        ? `Selected: ${newDocument.file.name} (${(
                            newDocument.file.size /
                            (1024 * 1024)
                          ).toFixed(2)} MB)`
                        : "Drag & drop or click to browse"}
                    </p>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      disabled={isUploading}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span
                        className={`inline-block px-4 py-2 ${
                          isUploading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        } text-white rounded-lg`}
                      >
                        {isUploading ? "Uploading..." : "Browse Files"}
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 mt-4">
                      Max file size: 50MB
                    </p>
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Uploading...</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUploadDocument}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      isUploading ||
                      !newDocument.file ||
                      !newDocument.name.trim()
                    }
                  >
                    {isUploading ? "Uploading..." : "Upload Document"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

// Helper function for resumable uploads
const uploadBytesResumable = (ref, file) => {
  return {
    on: (event, next, error, complete) => {
      // Simulate upload progress for now
      // In real implementation, use Firebase's uploadBytesResumable
      const interval = setInterval(() => {
        if (next) {
          const snapshot = {
            bytesTransferred: file.size * 0.1,
            totalBytes: file.size,
          };
          next(snapshot);
        }
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        if (complete) {
          complete();
        }
      }, 2000);

      return {
        snapshot: {
          ref: ref,
        },
      };
    },
  };
};

export default EmployeeDocuments;
