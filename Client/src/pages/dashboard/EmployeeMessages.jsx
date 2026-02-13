import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "./DashboardLayout";
import {
  MessageSquare,
  Send,
  Search,
  Filter,
  User,
  Users,
  CheckCircle,
  Clock,
  Paperclip,
  Smile,
  MoreVertical,
  Star,
  StarOff,
  Trash2,
  Archive,
  Bell,
  BellOff,
  Reply,
  Forward,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MailOpen,
  Phone,
  Video,
  Image,
  File,
  Calendar,
  MapPin,
  Heart,
  ThumbsUp,
} from "lucide-react";

const EmployeeMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const mockConversations = [
        {
          id: 1,
          type: "direct",
          participants: [
            {
              id: 2,
              name: "Sarah Johnson",
              role: "Team Lead",
              avatar: "SJ",
              online: true,
            },
            {
              id: 1,
              name: user?.name || "You",
              role: "Employee",
              avatar: "ME",
              online: true,
            },
          ],
          lastMessage: "Can you review the project proposal by EOD?",
          timestamp: "10:30 AM",
          unread: 3,
          pinned: true,
        },
        {
          id: 2,
          type: "group",
          name: "Project Alpha Team",
          participants: [
            { id: 2, name: "Sarah Johnson", role: "Team Lead", avatar: "SJ" },
            { id: 3, name: "Mike Chen", role: "Developer", avatar: "MC" },
            { id: 4, name: "Emma Davis", role: "Designer", avatar: "ED" },
            {
              id: 1,
              name: user?.name || "You",
              role: "Employee",
              avatar: "ME",
            },
          ],
          lastMessage: "Meeting scheduled for tomorrow at 2 PM",
          timestamp: "Yesterday",
          unread: 0,
          pinned: true,
        },
        {
          id: 3,
          type: "direct",
          participants: [
            {
              id: 5,
              name: "Alex Brown",
              role: "HR Manager",
              avatar: "AB",
              online: false,
            },
            {
              id: 1,
              name: user?.name || "You",
              role: "Employee",
              avatar: "ME",
              online: true,
            },
          ],
          lastMessage: "Your leave request has been approved",
          timestamp: "2 days ago",
          unread: 0,
          pinned: false,
        },
        {
          id: 4,
          type: "group",
          name: "Company Announcements",
          participants: [],
          lastMessage: "New company policy update effective next week",
          timestamp: "3 days ago",
          unread: 12,
          pinned: false,
        },
        {
          id: 5,
          type: "direct",
          participants: [
            {
              id: 6,
              name: "Robert Wilson",
              role: "Client",
              avatar: "RW",
              online: true,
            },
            {
              id: 1,
              name: user?.name || "You",
              role: "Employee",
              avatar: "ME",
              online: true,
            },
          ],
          lastMessage: "Looking forward to our meeting tomorrow",
          timestamp: "1 week ago",
          unread: 0,
          pinned: false,
        },
      ];

      const mockMessages = [
        {
          id: 1,
          conversationId: 1,
          sender: { id: 2, name: "Sarah Johnson", avatar: "SJ" },
          content: "Hi, can you review the project proposal I sent?",
          timestamp: "10:15 AM",
          read: true,
          attachments: [],
        },
        {
          id: 2,
          conversationId: 1,
          sender: { id: 1, name: user?.name || "You", avatar: "ME" },
          content: "Sure Sarah, I'll review it by noon",
          timestamp: "10:18 AM",
          read: true,
          attachments: [],
        },
        {
          id: 3,
          conversationId: 1,
          sender: { id: 2, name: "Sarah Johnson", avatar: "SJ" },
          content: "Great! Can you also prepare the presentation slides?",
          timestamp: "10:25 AM",
          read: true,
          attachments: [],
        },
        {
          id: 4,
          conversationId: 1,
          sender: { id: 1, name: user?.name || "You", avatar: "ME" },
          content: "Will do. I'll share them by EOD",
          timestamp: "10:28 AM",
          read: true,
          attachments: [],
        },
        {
          id: 5,
          conversationId: 1,
          sender: { id: 2, name: "Sarah Johnson", avatar: "SJ" },
          content: "Perfect, thanks! Let me know if you need any help",
          timestamp: "10:30 AM",
          read: false,
          attachments: [],
        },
      ];

      setConversations(mockConversations);
      setMessages(mockMessages);
      setSelectedConversation(mockConversations[0]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      conversationId: selectedConversation.id,
      sender: { id: 1, name: user?.name || "You", avatar: "ME" },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
      attachments: [],
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Update conversation last message
    setConversations(
      conversations.map((conv) =>
        conv.id === selectedConversation.id
          ? { ...conv, lastMessage: newMessage, timestamp: "Just now" }
          : conv
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getConversationName = (conversation) => {
    if (conversation.type === "group") return conversation.name;
    const otherParticipant = conversation.participants.find((p) => p.id !== 1);
    return otherParticipant?.name || "Unknown";
  };

  const getConversationAvatar = (conversation) => {
    if (conversation.type === "group") {
      return (
        <div className="relative">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>
      );
    }

    const otherParticipant = conversation.participants.find((p) => p.id !== 1);
    return (
      <div className="relative">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
          {otherParticipant?.avatar || "U"}
        </div>
        {otherParticipant?.online && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>
    );
  };

  const filteredConversations = conversations.filter((conv) => {
    const name = getConversationName(conv).toLowerCase();
    return (
      name.includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const conversationMessages = messages.filter(
    (msg) => msg.conversationId === selectedConversation?.id
  );

  return (
    <DashboardLayout role="employee">
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-600 mt-2">
                Communicate with your team and colleagues
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                New Message
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
          {/* Conversations Sidebar */}
          <div className="lg:w-80 flex-shrink-0 flex flex-col">
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto bg-white rounded-xl border">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600 text-sm">
                      Loading conversations...
                    </p>
                  </div>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No conversations found</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedConversation?.id === conversation.id
                          ? "bg-blue-50"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {getConversationAvatar(conversation)}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 truncate">
                                {getConversationName(conversation)}
                              </span>
                              {conversation.pinned && (
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">
                                {conversation.timestamp}
                              </span>
                              {conversation.unread > 0 && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage}
                          </p>

                          {conversation.unread > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                {conversation.unread} new
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white rounded-xl border overflow-hidden">
            {!selectedConversation ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getConversationAvatar(selectedConversation)}
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {getConversationName(selectedConversation)}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {selectedConversation.type === "group"
                            ? `${selectedConversation.participants.length} members`
                            : selectedConversation.participants.find(
                                (p) => p.id !== 1
                              )?.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Video className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {conversationMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender.id === 1
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            message.sender.id === 1 ? "order-2" : "order-1"
                          }`}
                        >
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              message.sender.id === 1
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-gray-100 text-gray-900 rounded-bl-none"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <div
                            className={`flex items-center gap-2 mt-1 ${
                              message.sender.id === 1
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <span className="text-xs text-gray-500">
                              {message.timestamp}
                            </span>
                            {message.sender.id === 1 && (
                              <CheckCircle
                                className={`w-3 h-3 ${
                                  message.read
                                    ? "text-blue-500"
                                    : "text-gray-400"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            message.sender.id === 1
                              ? "bg-blue-500 text-white order-1 ml-2"
                              : "bg-gray-300 text-gray-700 order-2 mr-2"
                          }`}
                        >
                          {message.sender.avatar}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 bg-gray-100 rounded-2xl p-2">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here..."
                        className="w-full bg-transparent border-none outline-none resize-none px-2 py-1 text-sm"
                        rows="1"
                      />
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Paperclip className="w-4 h-4 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Image className="w-4 h-4 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Smile className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="lg:w-64 flex-shrink-0 hidden xl:block">
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 text-left hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium">New Group</span>
                </div>
              </button>
              <button className="w-full p-3 text-left hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Archive className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">Archived</span>
                </div>
              </button>
              <button className="w-full p-3 text-left hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="font-medium">Starred</span>
                </div>
              </button>
              <button className="w-full p-3 text-left hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="font-medium">Trash</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeMessages;
