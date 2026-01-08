import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    UserCheck,
    FileText,
    AlertCircle,
    LogOut,
    GraduationCap,
    ChevronRight,
    User,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ role, isOpen, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const menuItems = {
        STUDENT: [
            { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
            { name: 'My Profile', path: '/student/profile', icon: User },
            { name: 'Attendance & OD', path: '/student/attendance', icon: UserCheck },
            { name: 'Marks', path: '/student/marks', icon: FileText },
            { name: 'Complaints', path: '/student/complaints', icon: AlertCircle },
        ],
        STAFF: [
            { name: 'Dashboard', path: '/staff/dashboard', icon: LayoutDashboard },
            { name: 'Mark Attendance', path: '/staff/attendance', icon: UserCheck },
            { name: 'OD Requests', path: '/staff/od-requests', icon: FileText },
            { name: 'Complaints', path: '/staff/complaints', icon: AlertCircle },
        ],
        ADVISOR: [
            { name: 'Dashboard', path: '/advisor/dashboard', icon: LayoutDashboard },
            { name: 'Student Profiles', path: '/advisor/students', icon: User },
            { name: 'Class Analytics', path: '/advisor/analytics', icon: FileText },
        ],
        HOD: [
            { name: 'Dashboard', path: '/hod/dashboard', icon: LayoutDashboard },
            { name: 'Departmental Data', path: '/hod/data', icon: FileText },
        ]
    };

    const currentMenu = menuItems[role] || [];

    const sidebarVariants = {
        open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
        closed: { x: '-100%', opacity: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
    };

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                className={`fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 flex flex-col z-50 shadow-2xl lg:shadow-none ${!isOpen && 'pointer-events-none lg:pointer-events-auto lg:translate-x-0'}`}
            >
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-100">
                            <GraduationCap size={24} />
                        </div>
                        <span className="font-bold text-xl text-slate-800 tracking-tight">AMS Portal</span>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 lg:hidden">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    {currentMenu.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => window.innerWidth < 1024 && onClose()}
                            className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group ${location.pathname === item.path
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className={location.pathname === item.path ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} />
                                <span className="font-medium">{item.name}</span>
                            </div>
                            {location.pathname === item.path && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-slate-100">
                    <div className="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-200/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary-600 shadow-sm font-bold uppercase">
                                {user?.name?.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-slate-900 truncate uppercase">{user?.name}</p>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold opacity-70">{role.replace('_', ' ')}</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            navigate('/');
                        }}
                        className="w-full flex items-center justify-center gap-3 py-3.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200 font-bold text-sm bg-slate-50 border border-transparent hover:border-red-100"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
