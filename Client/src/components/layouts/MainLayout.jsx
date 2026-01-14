// src/components/layouts/MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!token) {
            navigate('/login');
            return;
        }
        
        // Role-based redirection
        const path = location.pathname;
        if (path.includes('/admin') && user.role !== 'admin') {
            navigate(`/${user.role}/dashboard`);
        } else if (path.includes('/manager') && user.role !== 'manager') {
            navigate(`/${user.role}/dashboard`);
        } else if (path.includes('/employee') && user.role !== 'employee') {
            navigate(`/${user.role}/dashboard`);
        }
    }, [location.pathname, navigate]);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;