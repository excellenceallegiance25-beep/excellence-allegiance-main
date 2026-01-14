import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Users, Briefcase, TrendingUp,
    AlertCircle, Download, Clock, CheckCircle
} from 'lucide-react';
import axios from 'axios';

const ManagerDashboard = () => {
    const [teamStats, setTeamStats] = useState({
        teamSize: 8,
        activeProjects: 5,
        pendingApprovals: 3,
        teamPerformance: 87
    });
    
    const [teamMembers, setTeamMembers] = useState([]);
    const [projectProgress, setProjectProgress] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchManagerData();
    }, []);

    const fetchManagerData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            // Mock data - Replace with actual API call
            setTimeout(() => {
                setTeamMembers([
                    { id: 1, name: 'John Smith', position: 'Senior Developer', status: 'active', performance: 95 },
                    { id: 2, name: 'Sarah Johnson', position: 'Frontend Developer', status: 'active', performance: 88 },
                    { id: 3, name: 'Mike Wilson', position: 'Backend Developer', status: 'on_leave', performance: 92 },
                    { id: 4, name: 'Lisa Brown', position: 'UI/UX Designer', status: 'active', performance: 85 },
                ]);
                
                setProjectProgress([
                    { id: 1, name: 'E-Commerce Platform', progress: 75, teamSize: 5, deadline: 'Dec 28' },
                    { id: 2, name: 'Mobile App V2', progress: 45, teamSize: 3, deadline: 'Jan 15' },
                    { id: 3, name: 'Internal CRM', progress: 30, teamSize: 4, deadline: 'Feb 01' },
                    { id: 4, name: 'Website Redesign', progress: 90, teamSize: 2, deadline: 'Dec 20' },
                ]);
                setLoading(false);
            }, 1000);
            
            // Uncomment for actual API call:
            // const response = await axios.get('http://localhost:5000/api/manager/dashboard', {
            //     headers: { Authorization: `Bearer ${token}` }
            // });
            // setTeamStats(response.data.stats);
            // setTeamMembers(response.data.teamMembers);
            // setProjectProgress(response.data.projects);
            
        } catch (error) {
            console.error('Error fetching manager data:', error);
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Team Members',
            value: teamStats.teamSize,
            icon: <Users className="h-6 w-6" />,
            color: 'from-blue-500 to-cyan-500',
            link: '#'
        },
        {
            title: 'Active Projects',
            value: teamStats.activeProjects,
            icon: <Briefcase className="h-6 w-6" />,
            color: 'from-green-500 to-emerald-500',
            link: '#'
        },
        {
            title: 'Pending Approvals',
            value: teamStats.pendingApprovals,
            icon: <AlertCircle className="h-6 w-6" />,
            color: 'from-amber-500 to-orange-500',
            link: '#'
        },
        {
            title: 'Team Performance',
            value: `${teamStats.teamPerformance}%`,
            icon: <TrendingUp className="h-6 w-6" />,
            color: 'from-purple-500 to-pink-500',
            link: '#'
        }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>
                    <p className="text-gray-600">Lead your team to success</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => fetchManagerData()}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        <Download className="h-4 w-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 shadow-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                                {stat.icon}
                            </div>
                            <span className="text-sm text-gray-500">View Details</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-gray-600 font-medium">{stat.title}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Team Members */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Team Members</h3>
                        <Link to="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {teamMembers.map(member => (
                            <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">{member.name}</h4>
                                        <p className="text-sm text-gray-600">{member.position}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`px-3 py-1 text-xs rounded-full ${
                                        member.status === 'active' ? 'bg-green-100 text-green-700' :
                                        'bg-amber-100 text-amber-700'
                                    }`}>
                                        {member.status.replace('_', ' ')}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Performance: {member.performance}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Progress */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Project Progress</h3>
                        <Link to="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {projectProgress.map(project => (
                            <div key={project.id} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium text-gray-800">{project.name}</h4>
                                    <span className="font-bold text-blue-700">{project.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                    <div 
                                        className="bg-gradient-to-r from-green-500 to-emerald-400 h-2.5 rounded-full" 
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>{project.teamSize} members</span>
                                    <span>Deadline: {project.deadline}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-center transition-colors">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                        <span className="font-medium">Approve Requests</span>
                    </button>
                    <button className="p-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl text-center transition-colors">
                        <Briefcase className="h-8 w-8 mx-auto mb-2" />
                        <span className="font-medium">Create Project</span>
                    </button>
                    <button className="p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-center transition-colors">
                        <Users className="h-8 w-8 mx-auto mb-2" />
                        <span className="font-medium">Team Report</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;