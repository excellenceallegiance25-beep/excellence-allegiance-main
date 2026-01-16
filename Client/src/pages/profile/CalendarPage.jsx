import React, { useState, useEffect } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Users,
  MapPin,
  X,
  Edit,
  Trash2,
  Video,
  Phone,
  Building,
  CalendarDays,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageCircle,
  ExternalLink,
  Camera,
  Mic,
  UserPlus,
  ScreenShare,
  Link as LinkIcon,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CalendarPage = ({ role }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showVideoCallModal, setShowVideoCallModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [videoMeetingPlatform, setVideoMeetingPlatform] = useState("zoom");
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "meeting",
    participants: "",
    location: "",
    description: "",
    organizer: "",
    zoomLink: "",
    teamsLink: "",
    googleMeetLink: "",
    videoCallEnabled: false,
    videoPlatform: "zoom",
    status: "scheduled",
  });

  const today = new Date().toISOString().split("T")[0];
  const todayEvents = events.filter((event) => event.date === today);

  // API Base URL
  const API_URL = import.meta.env.VITE_API_URL || "http://192.168.68.109:5000/api";

  // Load events from localStorage on initial load
  useEffect(() => {
    loadEvents();
  }, []);

  // Load events from API or localStorage
  const loadEvents = async () => {
    setLoading(true);
    try {
      // Try to fetch from API first
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setEvents(response.data.data);
        localStorage.setItem(
          "calendarEvents",
          JSON.stringify(response.data.data)
        );
      } else {
        // Fallback to localStorage if API fails
        const savedEvents = localStorage.getItem("calendarEvents");
        if (savedEvents) {
          setEvents(JSON.parse(savedEvents));
        } else {
          // Initial demo data with video call options
          const initialEvents = [
            {
              id: 1,
              title: "Team Standup",
              date: "2024-02-15",
              startTime: "09:00",
              endTime: "10:00",
              type: "meeting",
              participants: 8,
              location: "Conference Room A",
              description: "Daily team standup meeting",
              organizer: "John Doe",
              zoomLink: "https://zoom.us/j/123456789?pwd=abcd1234",
              teamsLink: "https://teams.microsoft.com/l/meetup-join/abc123",
              googleMeetLink: "https://meet.google.com/abc-defg-hij",
              videoCallEnabled: true,
              videoPlatform: "zoom",
              status: "scheduled",
              createdAt: new Date().toISOString(),
            },
            {
              id: 2,
              title: "Client Presentation",
              date: "2024-02-15",
              startTime: "14:00",
              endTime: "15:30",
              type: "client",
              participants: 5,
              location: "Zoom Meeting",
              description: "Quarterly review with ABC Corp",
              organizer: "Sarah Smith",
              zoomLink: "https://zoom.us/j/987654321?pwd=wxyz9876",
              teamsLink: "",
              googleMeetLink: "",
              videoCallEnabled: true,
              videoPlatform: "zoom",
              status: "scheduled",
              createdAt: new Date().toISOString(),
            },
            {
              id: 3,
              title: "Project Review",
              date: "2024-02-16",
              startTime: "11:00",
              endTime: "12:00",
              type: "review",
              participants: 6,
              location: "Meeting Room 2",
              description: "Project Alpha milestone review",
              organizer: "Mike Johnson",
              zoomLink: "",
              teamsLink: "https://teams.microsoft.com/l/meetup-join/xyz789",
              googleMeetLink: "",
              videoCallEnabled: true,
              videoPlatform: "teams",
              status: "scheduled",
              createdAt: new Date().toISOString(),
            },
          ];
          setEvents(initialEvents);
          localStorage.setItem("calendarEvents", JSON.stringify(initialEvents));
        }
      }
    } catch (error) {
      console.error("Error loading events:", error);

      // Fallback to localStorage
      const savedEvents = localStorage.getItem("calendarEvents");
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
        toast.info("Using cached events. Check your connection.");
      } else {
        // Initial demo data with video call options
        const initialEvents = [
          {
            id: 1,
            title: "Team Standup",
            date: "2024-02-15",
            startTime: "09:00",
            endTime: "10:00",
            type: "meeting",
            participants: 8,
            location: "Conference Room A",
            description: "Daily team standup meeting",
            organizer: "John Doe",
            zoomLink: "https://zoom.us/j/123456789?pwd=abcd1234",
            teamsLink: "https://teams.microsoft.com/l/meetup-join/abc123",
            googleMeetLink: "https://meet.google.com/abc-defg-hij",
            videoCallEnabled: true,
            videoPlatform: "zoom",
            status: "scheduled",
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            title: "Client Presentation",
            date: "2024-02-15",
            startTime: "14:00",
            endTime: "15:30",
            type: "client",
            participants: 5,
            location: "Zoom Meeting",
            description: "Quarterly review with ABC Corp",
            organizer: "Sarah Smith",
            zoomLink: "https://zoom.us/j/987654321?pwd=wxyz9876",
            teamsLink: "",
            googleMeetLink: "",
            videoCallEnabled: true,
            videoPlatform: "zoom",
            status: "scheduled",
            createdAt: new Date().toISOString(),
          },
          {
            id: 3,
            title: "Project Review",
            date: "2024-02-16",
            startTime: "11:00",
            endTime: "12:00",
            type: "review",
            participants: 6,
            location: "Meeting Room 2",
            description: "Project Alpha milestone review",
            organizer: "Mike Johnson",
            zoomLink: "",
            teamsLink: "https://teams.microsoft.com/l/meetup-join/xyz789",
            googleMeetLink: "",
            videoCallEnabled: true,
            videoPlatform: "teams",
            status: "scheduled",
            createdAt: new Date().toISOString(),
          },
        ];
        setEvents(initialEvents);
        localStorage.setItem("calendarEvents", JSON.stringify(initialEvents));
      }
    } finally {
      setLoading(false);
    }
  };

  // Initialize form with today's date
  useEffect(() => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const endTime = `${(now.getHours() + 1).toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    setEventForm((prev) => ({
      ...prev,
      date: today,
      startTime: currentTime,
      endTime: endTime,
      organizer:
        role === "admin" ? "Admin" : role === "manager" ? "Manager" : "User",
      videoCallEnabled: true,
      videoPlatform: "zoom",
    }));
  }, [today, role]);

  const getTypeColor = (type) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800";
      case "client":
        return "bg-green-100 text-green-800";
      case "review":
        return "bg-purple-100 text-purple-800";
      case "training":
        return "bg-yellow-100 text-yellow-800";
      case "planning":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "meeting":
        return "👥";
      case "client":
        return "🤝";
      case "review":
        return "📋";
      case "training":
        return "🎓";
      case "planning":
        return "📅";
      default:
        return "📌";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimeRange = (startTime, endTime) => {
    const formatTime = (time) => {
      if (!time) return "";
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  const getVideoLink = (event) => {
    if (!event?.videoCallEnabled) return null;

    switch (event.videoPlatform) {
      case "zoom":
        return event.zoomLink;
      case "teams":
        return event.teamsLink;
      case "google-meet":
        return event.googleMeetLink;
      default:
        return event.zoomLink;
    }
  };

  const getVideoPlatformName = (platform) => {
    switch (platform) {
      case "zoom":
        return "Zoom Meeting";
      case "teams":
        return "Microsoft Teams";
      case "google-meet":
        return "Google Meet";
      default:
        return "Video Call";
    }
  };

  const getVideoPlatformIcon = (platform) => {
    switch (platform) {
      case "zoom":
        return "🔵";
      case "teams":
        return "🟣";
      case "google-meet":
        return "🟢";
      default:
        return "🎥";
    }
  };

  const generateMeetingLink = (platform) => {
    const meetingId = Math.random().toString(36).substring(7);
    const passcode = Math.floor(100000 + Math.random() * 900000);

    switch (platform) {
      case "zoom":
        return `https://zoom.us/j/${meetingId}?pwd=${passcode}`;
      case "teams":
        return `https://teams.microsoft.com/l/meetup-join/${meetingId}`;
      case "google-meet":
        return `https://meet.google.com/${meetingId}`;
      default:
        return `https://zoom.us/j/${meetingId}`;
    }
  };

  const handleOpenEventModal = (event = null) => {
    if (event) {
      setSelectedEvent(event);
      setEventForm({
        title: event.title,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        type: event.type,
        participants: event.participants,
        location: event.location,
        description: event.description || "",
        organizer: event.organizer || "",
        zoomLink: event.zoomLink || "",
        teamsLink: event.teamsLink || "",
        googleMeetLink: event.googleMeetLink || "",
        videoCallEnabled: event.videoCallEnabled || false,
        videoPlatform: event.videoPlatform || "zoom",
        status: event.status || "scheduled",
      });
      setIsEditMode(true);
    } else {
      setSelectedEvent(null);
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      const endTime = `${(now.getHours() + 1).toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      setEventForm({
        title: "",
        date: today,
        startTime: currentTime,
        endTime: endTime,
        type: "meeting",
        participants: "",
        location: "",
        description: "",
        organizer:
          role === "admin" ? "Admin" : role === "manager" ? "Manager" : "User",
        zoomLink: "",
        teamsLink: "",
        googleMeetLink: "",
        videoCallEnabled: true,
        videoPlatform: "zoom",
        status: "scheduled",
      });
      setIsEditMode(false);
    }
    setShowEventModal(true);
  };

  const handleViewEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleOpenVideoCallModal = (event) => {
    setSelectedEvent(event);
    setVideoMeetingPlatform(event?.videoPlatform || "zoom");
    setShowVideoCallModal(true);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    try {
      // Try to delete from API
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/events/${selectedEvent.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local state
      const updatedEvents = events.filter(
        (event) => event.id !== selectedEvent.id
      );
      setEvents(updatedEvents);
      localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));

      toast.success("Event deleted successfully!");
      setShowDeleteModal(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error deleting event:", error);

      // Fallback to localStorage
      const updatedEvents = events.filter(
        (event) => event.id !== selectedEvent.id
      );
      setEvents(updatedEvents);
      localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));

      toast.success("Event deleted from local storage!");
      setShowDeleteModal(false);
      setSelectedEvent(null);
    }
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Generate video call links if video call is enabled
      let videoLinks = {};
      if (eventForm.videoCallEnabled) {
        if (!eventForm.zoomLink && eventForm.videoPlatform === "zoom") {
          videoLinks.zoomLink = generateMeetingLink("zoom");
        } else {
          videoLinks.zoomLink = eventForm.zoomLink;
        }

        if (!eventForm.teamsLink && eventForm.videoPlatform === "teams") {
          videoLinks.teamsLink = generateMeetingLink("teams");
        } else {
          videoLinks.teamsLink = eventForm.teamsLink;
        }

        if (
          !eventForm.googleMeetLink &&
          eventForm.videoPlatform === "google-meet"
        ) {
          videoLinks.googleMeetLink = generateMeetingLink("google-meet");
        } else {
          videoLinks.googleMeetLink = eventForm.googleMeetLink;
        }
      }

      const eventData = {
        ...eventForm,
        ...videoLinks,
        participants: parseInt(eventForm.participants) || 1,
        createdBy: role,
      };

      if (isEditMode && selectedEvent) {
        // Update existing event
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${API_URL}/events/${selectedEvent.id}`,
          eventData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const updatedEvents = events.map((event) =>
            event.id === selectedEvent.id
              ? { ...event, ...response.data.data }
              : event
          );
          setEvents(updatedEvents);
          localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
          toast.success("Event updated successfully!");
        }
      } else {
        // Create new event
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${API_URL}/events`,
          {
            ...eventData,
            id: Date.now(), // Temporary ID for local storage
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const newEvent = {
            ...eventData,
            id: response.data.data.id || Date.now(),
          };
          const updatedEvents = [...events, newEvent];
          setEvents(updatedEvents);
          localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
          toast.success("Event created successfully!");
        }
      }

      setShowEventModal(false);
      setSelectedEvent(null);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error saving event:", error);

      // Fallback to localStorage
      if (isEditMode && selectedEvent) {
        const updatedEvents = events.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                ...eventForm,
                participants: parseInt(eventForm.participants),
              }
            : event
        );
        setEvents(updatedEvents);
        localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
        toast.success("Event updated in local storage!");
      } else {
        const newEvent = {
          ...eventForm,
          id: Date.now(),
          participants: parseInt(eventForm.participants),
          createdAt: new Date().toISOString(),
          // Generate video links if not provided
          zoomLink:
            eventForm.videoCallEnabled &&
            !eventForm.zoomLink &&
            eventForm.videoPlatform === "zoom"
              ? generateMeetingLink("zoom")
              : eventForm.zoomLink,
          teamsLink:
            eventForm.videoCallEnabled &&
            !eventForm.teamsLink &&
            eventForm.videoPlatform === "teams"
              ? generateMeetingLink("teams")
              : eventForm.teamsLink,
          googleMeetLink:
            eventForm.videoCallEnabled &&
            !eventForm.googleMeetLink &&
            eventForm.videoPlatform === "google-meet"
              ? generateMeetingLink("google-meet")
              : eventForm.googleMeetLink,
        };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
        toast.success("Event saved to local storage!");
      }

      setShowEventModal(false);
      setSelectedEvent(null);
      setIsEditMode(false);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleVideoPlatformChange = (platform) => {
    setEventForm((prev) => ({ ...prev, videoPlatform: platform }));

    // Auto-generate link if not already set
    if (!eventForm[`${platform}Link`]) {
      const generatedLink = generateMeetingLink(platform);
      setEventForm((prev) => ({
        ...prev,
        [`${platform}Link`]: generatedLink,
        zoomLink: platform === "zoom" ? generatedLink : prev.zoomLink,
        teamsLink: platform === "teams" ? generatedLink : prev.teamsLink,
        googleMeetLink:
          platform === "google-meet" ? generatedLink : prev.googleMeetLink,
      }));
    }
  };

  const confirmDelete = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const markEventAsComplete = async (event) => {
    try {
      const updatedEvent = { ...event, status: "completed" };
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/events/${event.id}`,
        { status: "completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedEvents = events.map((e) =>
        e.id === event.id ? updatedEvent : e
      );
      setEvents(updatedEvents);
      localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
      toast.success("Event marked as completed!");
    } catch (error) {
      console.error("Error marking event as complete:", error);

      // Fallback to localStorage
      const updatedEvent = { ...event, status: "completed" };
      const updatedEvents = events.map((e) =>
        e.id === event.id ? updatedEvent : e
      );
      setEvents(updatedEvents);
      localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
      toast.success("Event marked as completed in local storage!");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  // Video Call Modal Component
  const VideoCallModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        <div className="sticky top-0 bg-white border-b px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Video className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Video Conference
              </h2>
              <p className="text-gray-600">
                Join your meeting on{" "}
                {getVideoPlatformName(videoMeetingPlatform)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowVideoCallModal(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Meeting Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Meeting Details
                </h3>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${getTypeColor(
                          selectedEvent?.type
                        )}`}
                      >
                        <span className="text-xl">
                          {getTypeIcon(selectedEvent?.type)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {selectedEvent?.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {selectedEvent?.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                        selectedEvent?.type
                      )}`}
                    >
                      {selectedEvent?.type?.charAt(0).toUpperCase() +
                        selectedEvent?.type?.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 flex items-center">
                        <CalendarIcon size={16} className="mr-2" />
                        Date:{" "}
                        <span className="font-medium ml-1">
                          {selectedEvent?.date}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Clock size={16} className="mr-2" />
                        Time:{" "}
                        <span className="font-medium ml-1">
                          {formatTimeRange(
                            selectedEvent?.startTime,
                            selectedEvent?.endTime
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 flex items-center">
                        <Users size={16} className="mr-2" />
                        Participants:{" "}
                        <span className="font-medium ml-1">
                          {selectedEvent?.participants}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Building size={16} className="mr-2" />
                        Organizer:{" "}
                        <span className="font-medium ml-1">
                          {selectedEvent?.organizer}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Conference Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Join Meeting
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["zoom", "teams", "google-meet"].map((platform) => {
                    const isActive = videoMeetingPlatform === platform;
                    const link = getVideoLink({
                      ...selectedEvent,
                      videoPlatform: platform,
                    });

                    return (
                      <button
                        key={platform}
                        onClick={() => setVideoMeetingPlatform(platform)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          isActive
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">
                              {getVideoPlatformIcon(platform)}
                            </span>
                            <span className="font-medium">
                              {getVideoPlatformName(platform)}
                            </span>
                          </div>
                          {isActive && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 text-left">
                          {link ? "Click to join meeting" : "No link available"}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Meeting Link */}
              {selectedEvent?.videoCallEnabled && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Meeting Link
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm text-gray-600 mb-1">
                          {getVideoPlatformName(videoMeetingPlatform)} Link
                        </p>
                        <p className="text-blue-600 font-mono text-sm truncate">
                          {getVideoLink({
                            ...selectedEvent,
                            videoPlatform: videoMeetingPlatform,
                          }) || "No link available"}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            getVideoLink({
                              ...selectedEvent,
                              videoPlatform: videoMeetingPlatform,
                            }) || ""
                          )
                        }
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                      >
                        <LinkIcon size={16} className="mr-2" />
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Meeting Controls */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Meeting Controls
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 bg-blue-100 hover:bg-blue-200 rounded-xl border border-blue-200 flex flex-col items-center justify-center">
                    <Camera size={24} className="text-blue-600 mb-2" />
                    <span className="text-sm font-medium">Camera</span>
                  </button>
                  <button className="p-4 bg-green-100 hover:bg-green-200 rounded-xl border border-green-200 flex flex-col items-center justify-center">
                    <Mic size={24} className="text-green-600 mb-2" />
                    <span className="text-sm font-medium">Microphone</span>
                  </button>
                  <button className="p-4 bg-purple-100 hover:bg-purple-200 rounded-xl border border-purple-200 flex flex-col items-center justify-center">
                    <ScreenShare size={24} className="text-purple-600 mb-2" />
                    <span className="text-sm font-medium">Share Screen</span>
                  </button>
                  <button className="p-4 bg-yellow-100 hover:bg-yellow-200 rounded-xl border border-yellow-200 flex flex-col items-center justify-center">
                    <UserPlus size={24} className="text-yellow-600 mb-2" />
                    <span className="text-sm font-medium">Invite</span>
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Meeting Tips
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                    Join 5 minutes early
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                    Test your audio/video
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                    Mute when not speaking
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                    Share agenda in chat
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                {getVideoLink({
                  ...selectedEvent,
                  videoPlatform: videoMeetingPlatform,
                }) ? (
                  <a
                    href={getVideoLink({
                      ...selectedEvent,
                      videoPlatform: videoMeetingPlatform,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center transition"
                  >
                    <Video size={20} className="mr-2" />
                    Join {getVideoPlatformName(videoMeetingPlatform)}
                  </a>
                ) : (
                  <button
                    onClick={() =>
                      toast.info("No video link available for this meeting")
                    }
                    className="w-full py-3.5 bg-gray-300 text-gray-700 rounded-xl font-semibold flex items-center justify-center cursor-not-allowed"
                    disabled
                  >
                    <Video size={20} className="mr-2" />
                    No Link Available
                  </button>
                )}

                <button
                  onClick={() =>
                    copyToClipboard(
                      getVideoLink({
                        ...selectedEvent,
                        videoPlatform: videoMeetingPlatform,
                      }) || ""
                    )
                  }
                  className="w-full py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium flex items-center justify-center transition"
                >
                  <LinkIcon size={18} className="mr-2" />
                  Copy Meeting Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Event Modal Component - Updated with Video Call options
  const EventModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditMode ? "Edit Event" : "Create New Event"}
            </h2>
            <p className="text-gray-600">Add or modify event details</p>
          </div>
          <button
            onClick={() => setShowEventModal(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl p-2 hover:bg-gray-100 rounded-full transition"
            disabled={saving}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmitEvent} className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={eventForm.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Team Meeting, Client Call, etc."
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  name="type"
                  value={eventForm.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  disabled={saving}
                >
                  <option value="meeting">Team Meeting</option>
                  <option value="client">Client Meeting</option>
                  <option value="review">Project Review</option>
                  <option value="training">Training Session</option>
                  <option value="planning">Planning Session</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={eventForm.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  disabled={saving}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    required
                    value={eventForm.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    disabled={saving}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time *
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    required
                    value={eventForm.endTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    disabled={saving}
                  />
                </div>
              </div>
            </div>

            {/* Video Call Toggle */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <Video size={18} className="mr-2 text-blue-600" />
                    Video Conference
                  </h3>
                  <p className="text-sm text-gray-600">
                    Enable video call for this meeting
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="videoCallEnabled"
                    checked={eventForm.videoCallEnabled}
                    onChange={handleInputChange}
                    className="sr-only peer"
                    disabled={saving}
                  />
                  <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {eventForm.videoCallEnabled && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video Platform *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["zoom", "teams", "google-meet"].map((platform) => (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => handleVideoPlatformChange(platform)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            eventForm.videoPlatform === platform
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">
                              {getVideoPlatformIcon(platform)}
                            </span>
                            <span className="font-medium">
                              {getVideoPlatformName(platform)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meeting Link
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="url"
                        name={`${eventForm.videoPlatform}Link`}
                        value={
                          eventForm[`${eventForm.videoPlatform}Link`] || ""
                        }
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder={`Enter ${getVideoPlatformName(
                          eventForm.videoPlatform
                        )} link or leave blank to auto-generate`}
                        disabled={saving}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const generatedLink = generateMeetingLink(
                            eventForm.videoPlatform
                          );
                          setEventForm((prev) => ({
                            ...prev,
                            [`${eventForm.videoPlatform}Link`]: generatedLink,
                          }));
                          toast.success("Meeting link generated!");
                        }}
                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        disabled={saving}
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Participants
                </label>
                <input
                  type="number"
                  name="participants"
                  min="1"
                  value={eventForm.participants}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="e.g., 10"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={eventForm.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Conference Room, Zoom, etc."
                  disabled={saving}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                value={eventForm.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                placeholder="Brief description of the event..."
                disabled={saving}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organizer
              </label>
              <input
                type="text"
                name="organizer"
                value={eventForm.organizer}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Name of organizer"
                disabled={saving}
              />
            </div>

            {isEditMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={eventForm.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  disabled={saving}
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={() => setShowEventModal(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center min-w-[120px]"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  {isEditMode ? "Updating..." : "Saving..."}
                </>
              ) : isEditMode ? (
                "Update Event"
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Delete Confirmation Modal
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
            <Trash2 className="text-red-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            Delete Event
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to delete "{selectedEvent?.title}"? This
            action cannot be undone.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteEvent}
              className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Event Details Modal - Updated with Video Call button
  const EventDetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${getTypeColor(selectedEvent?.type)}`}
            >
              <span className="text-xl">
                {getTypeIcon(selectedEvent?.type)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedEvent?.title}
              </h2>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                    selectedEvent?.type
                  )}`}
                >
                  {selectedEvent?.type?.charAt(0).toUpperCase() +
                    selectedEvent?.type?.slice(1)}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    selectedEvent?.status
                  )}`}
                >
                  {selectedEvent?.status?.charAt(0).toUpperCase() +
                    selectedEvent?.status?.slice(1)}
                </span>
                {selectedEvent?.videoCallEnabled && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex items-center">
                    <Video size={12} className="mr-1" />
                    Video Call
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowEventDetails(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CalendarIcon className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{selectedEvent?.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">
                    {formatTimeRange(
                      selectedEvent?.startTime,
                      selectedEvent?.endTime
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{selectedEvent?.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Users className="text-yellow-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Participants</p>
                  <p className="font-medium">
                    {selectedEvent?.participants} people
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {selectedEvent?.organizer && (
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Building className="text-pink-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Organizer</p>
                    <p className="font-medium">{selectedEvent?.organizer}</p>
                  </div>
                </div>
              )}

              {selectedEvent?.description && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Description</p>
                  <p className="text-gray-800 bg-gray-50 p-4 rounded-lg">
                    {selectedEvent?.description}
                  </p>
                </div>
              )}

              {selectedEvent?.videoCallEnabled &&
                getVideoLink(selectedEvent) && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {getVideoPlatformIcon(selectedEvent.videoPlatform)}
                        </span>
                        <div>
                          <p className="font-medium text-blue-900">
                            {getVideoPlatformName(selectedEvent.videoPlatform)}
                          </p>
                          <p className="text-sm text-blue-700 truncate max-w-[200px]">
                            {getVideoLink(selectedEvent)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(getVideoLink(selectedEvent))
                        }
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                      >
                        <LinkIcon size={14} className="mr-1" />
                        Copy
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setShowEventDetails(false);
                        handleOpenVideoCallModal(selectedEvent);
                      }}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 font-medium"
                    >
                      <Video size={18} />
                      <span>Join Video Conference</span>
                    </button>
                  </div>
                )}
            </div>
          </div>

          <div className="flex space-x-4 mt-8 pt-6 border-t">
            {selectedEvent?.videoCallEnabled && getVideoLink(selectedEvent) && (
              <button
                onClick={() => {
                  setShowEventDetails(false);
                  handleOpenVideoCallModal(selectedEvent);
                }}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2 font-medium"
              >
                <Video size={18} />
                <span>Join Video Call</span>
              </button>
            )}

            {selectedEvent?.status !== "completed" && (
              <button
                onClick={() => {
                  markEventAsComplete(selectedEvent);
                  setShowEventDetails(false);
                }}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 font-medium"
              >
                <CheckCircle size={18} />
                <span>Mark Complete</span>
              </button>
            )}

            <button
              onClick={() => {
                setShowEventDetails(false);
                handleOpenEventModal(selectedEvent);
              }}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center space-x-2 font-medium"
            >
              <Edit size={18} />
              <span>Edit Event</span>
            </button>

            <button
              onClick={() => {
                setShowEventDetails(false);
                confirmDelete(selectedEvent);
              }}
              className="flex-1 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center justify-center space-x-2 font-medium"
            >
              <Trash2 size={18} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <DashboardLayout role={role}>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <Loader2
              className="animate-spin mx-auto mb-4 text-blue-600"
              size={48}
            />
            <h3 className="text-xl font-semibold text-gray-900">
              Loading Calendar Events
            </h3>
            <p className="text-gray-600">
              Please wait while we load your events...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={role}>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600">
              Manage your schedule and events with video conference
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-gray-500">
                {events.length} events • {todayEvents.length} today
              </span>
              <button
                onClick={loadEvents}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <CalendarDays size={14} className="mr-1" />
                Refresh
              </button>
            </div>
          </div>
          <button
            onClick={() => handleOpenEventModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition"
          >
            <Plus size={18} className="mr-2" />
            Add Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Upcoming Events
              </h2>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Showing {events.length} events
                </span>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                  View All
                </button>
              </div>
            </div>

            {events.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon
                  className="mx-auto mb-4 text-gray-400"
                  size={48}
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No events found
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first event to get started
                </p>
                <button
                  onClick={() => handleOpenEventModal()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Create First Event
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer group"
                    onClick={() => handleViewEventDetails(event)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`p-3 rounded-lg ${getTypeColor(
                            event.type
                          )}`}
                        >
                          <CalendarIcon className="text-current" size={24} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium text-gray-900">
                              {event.title}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                event.type
                              )}`}
                            >
                              {event.type.charAt(0).toUpperCase() +
                                event.type.slice(1)}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                event.status
                              )}`}
                            >
                              {event.status.charAt(0).toUpperCase() +
                                event.status.slice(1)}
                            </span>
                            {event.videoCallEnabled && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex items-center">
                                <Video size={12} className="mr-1" />
                                Video
                              </span>
                            )}
                          </div>
                          <div className="mt-3 space-y-2">
                            <p className="text-sm text-gray-600 flex items-center">
                              <CalendarIcon size={14} className="mr-2" />
                              {event.date}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <Clock size={14} className="mr-2" />
                              {formatTimeRange(event.startTime, event.endTime)}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <Users size={14} className="mr-2" />
                              {event.participants} participants
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin size={14} className="mr-2" />
                              {event.location}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {event.videoCallEnabled && getVideoLink(event) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenVideoCallModal(event);
                            }}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded flex items-center"
                          >
                            <Video size={14} className="mr-1" />
                            Join Call
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEventModal(event);
                          }}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded flex items-center"
                        >
                          <Edit size={14} className="mr-1" />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Calendar View */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Calendar View
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center font-medium text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const dayEvents = events.filter((event) => {
                  const eventDate = new Date(event.date);
                  return eventDate.getDate() === day;
                });

                return (
                  <div
                    key={day}
                    className={`text-center p-3 rounded-lg cursor-pointer transition ${
                      dayEvents.length > 0
                        ? "bg-blue-50 border border-blue-200 hover:bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      if (dayEvents.length > 0) {
                        handleViewEventDetails(dayEvents[0]);
                      }
                    }}
                  >
                    <div className="font-medium">{day}</div>
                    {dayEvents.length > 0 && (
                      <div className="text-xs text-blue-600 mt-1">
                        {dayEvents.length} event
                        {dayEvents.length > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Today's Schedule</h3>
              <CalendarIcon size={24} />
            </div>
            <div className="space-y-4">
              {todayEvents.length > 0 ? (
                todayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white/20 p-4 rounded-lg hover:bg-white/30 transition cursor-pointer"
                    onClick={() => handleViewEventDetails(event)}
                  >
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm opacity-90">
                      {formatTimeRange(event.startTime, event.endTime)}
                    </p>
                    <p className="text-sm opacity-80">{event.location}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          event.status
                        )}`}
                      >
                        {event.status}
                      </span>
                      {event.videoCallEnabled && (
                        <span className="text-xs px-2 py-1 bg-blue-300/30 text-blue-200 rounded-full flex items-center">
                          <Video size={10} className="mr-1" />
                          Video
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <CalendarDays size={32} className="mx-auto mb-3 opacity-70" />
                  <p className="opacity-90">No events scheduled for today</p>
                  <button
                    onClick={() => handleOpenEventModal()}
                    className="mt-3 px-4 py-2 bg-white/30 hover:bg-white/40 rounded-lg transition text-sm"
                  >
                    Add Event for Today
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Event Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Events</span>
                <span className="font-medium">{events.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Video Meetings</span>
                <span className="font-medium">
                  {events.filter((e) => e.videoCallEnabled).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">In-person</span>
                <span className="font-medium">
                  {events.filter((e) => !e.videoCallEnabled).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed</span>
                <span className="font-medium text-green-600">
                  {events.filter((e) => e.status === "completed").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Upcoming</span>
                <span className="font-medium text-blue-600">
                  {events.filter((e) => e.status === "scheduled").length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setEventForm((prev) => ({
                    ...prev,
                    type: "meeting",
                    title: "Team Meeting",
                    videoCallEnabled: true,
                    videoPlatform: "zoom",
                  }));
                  handleOpenEventModal();
                }}
                className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700 transition text-left flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Video size={16} />
                  <span>+ Team Video Meeting</span>
                </div>
                <Users size={16} />
              </button>
              <button
                onClick={() => {
                  setEventForm((prev) => ({
                    ...prev,
                    type: "client",
                    title: "Client Call",
                    videoCallEnabled: true,
                    videoPlatform: "teams",
                  }));
                  handleOpenEventModal();
                }}
                className="w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-green-700 transition text-left flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Video size={16} />
                  <span>+ Client Video Call</span>
                </div>
                <Phone size={16} />
              </button>
              <button
                onClick={() => {
                  const now = new Date();
                  const tomorrow = new Date(now);
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  const tomorrowStr = tomorrow.toISOString().split("T")[0];

                  setEventForm((prev) => ({
                    ...prev,
                    date: tomorrowStr,
                    type: "planning",
                    title: "Planning Session",
                    videoCallEnabled: false,
                  }));
                  handleOpenEventModal();
                }}
                className="w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700 transition text-left flex items-center justify-between"
              >
                <span>+ In-person Planning</span>
                <CalendarDays size={16} />
              </button>
              <button
                onClick={() => handleOpenVideoCallModal(events[0])}
                className="w-full p-3 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg text-orange-700 transition text-left flex items-center justify-between"
              >
                <span>Test Video Conference</span>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Video Conference Platforms
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔵</span>
                  <div>
                    <p className="font-medium">Zoom Meetings</p>
                    <p className="text-sm text-gray-600">
                      {events.filter((e) => e.videoPlatform === "zoom").length}{" "}
                      meetings
                    </p>
                  </div>
                </div>
                <a
                  href="https://zoom.us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🟣</span>
                  <div>
                    <p className="font-medium">Microsoft Teams</p>
                    <p className="text-sm text-gray-600">
                      {events.filter((e) => e.videoPlatform === "teams").length}{" "}
                      meetings
                    </p>
                  </div>
                </div>
                <a
                  href="https://teams.microsoft.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🟢</span>
                  <div>
                    <p className="font-medium">Google Meet</p>
                    <p className="text-sm text-gray-600">
                      {
                        events.filter((e) => e.videoPlatform === "google-meet")
                          .length
                      }{" "}
                      meetings
                    </p>
                  </div>
                </div>
                <a
                  href="https://meet.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEventModal && <EventModal />}
      {showDeleteModal && <DeleteModal />}
      {showEventDetails && <EventDetailsModal />}
      {showVideoCallModal && <VideoCallModal />}
    </DashboardLayout>
  );
};

export default CalendarPage;
