// src/components/layouts/Topbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Menu, Search, Bell, HelpCircle, 
    User, Settings, LogOut, ChevronDown
} from 'lucide-react';

const Topbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const roleColors = {
        admin: 'bg-gradient-to-r from-red-500 to-pink-500',
        manager: 'bg-gradient-to-r from-purple-500 to-indigo-500',
        employee: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    };

    return (
        <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                        <Bell className="h-5 w-5 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                        <HelpCircle className="h-5 w-5 text-gray-600" />
                    </button>
                    
                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                        >
                            <div className={`w-8 h-8 ${roleColors[user.role] || 'bg-gray-500'} rounded-full flex items-center justify-center text-white font-bold`}>
                                {user.name?.charAt(0) || 'U'}
                            </div>
                            <div className="hidden md:block text-left">
                                <div className="font-medium text-gray-800">{user.name || 'User'}</div>
                                <div className="text-xs text-gray-600 capitalize">{user.role || 'Employee'}</div>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-600" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                                >
                                    <User className="h-4 w-4" />
                                    My Profile
                                </button>
                                <button
                                    onClick={() => navigate('/settings')}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                                >
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </button>
                                <div className="border-t border-gray-200 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;