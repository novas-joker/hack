import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, Menu, ChevronRight, Home, X, MessageSquare, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!user) return;
        const initialNotes = user.role === 'STUDENT' ? [
            { id: 1, title: 'Attendance Warning', message: 'Your attendance in Machine Learning is 74%', type: 'warning', time: '2h ago', path: '/student/attendance', read: false },
            { id: 2, title: 'OD Approved', message: 'Your OD application is approved.', type: 'success', time: '5h ago', path: '/student/attendance', read: false },
            { id: 3, title: 'New Mark Released', message: 'CAT 1 Marks are now available.', type: 'info', time: '1d ago', path: '/student/marks', read: false },
        ] : [
            { id: 1, title: 'New OD Request', message: 'Rahul Sharma (22CS104) applied for OD.', type: 'info', time: '15m ago', path: `/${user.role.toLowerCase()}/od-requests`, read: false },
            { id: 2, title: 'Grievance Alert', message: 'Pending student complaint needs review.', type: 'warning', time: '2h ago', path: `/${user.role.toLowerCase()}/complaints`, read: false },
            { id: 3, title: 'System Message', message: 'Monthly attendance reports are ready.', type: 'success', time: '1d ago', path: '#', read: false },
        ];
        // Fix for specific HOD path
        const safeNotes = initialNotes.map(n => (user.role === 'HOD' && n.path.includes('od-requests')) ? { ...n, path: '/hod/dashboard' } : n);
        setNotifications(safeNotes);
    }, [user]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const handleNotificationClick = (id, path) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setShowNotifications(false);
        if (path && path !== '#') navigate(path);
    };

    const handleClearActivity = () => {
        setNotifications([]);
    };

    const getSearchData = () => {
        const role = user?.role?.toLowerCase();
        if (role === 'student') {
            return [
                { id: 1, title: 'Attendance & OD', path: '/student/attendance', category: 'Page' },
                { id: 2, title: 'Internal Marks', path: '/student/marks', category: 'Page' },
                { id: 3, title: 'Grievance Portal', path: '/student/complaints', category: 'Page' },
                { id: 4, title: 'Personal Profile', path: '/student/profile', category: 'Account' },
            ];
        }
        return [
            { id: 1, title: 'Student: Rahul Sharma', path: `/${role}/students`, category: 'Records' },
            { id: 2, title: 'Student: Priya Patel', path: `/${role}/students`, category: 'Records' },
            { id: 3, title: 'Mark Attendance', path: '/staff/attendance', category: 'Action' },
            { id: 4, title: 'Grievance Resolution', path: `/${role}/complaints`, category: 'Portal' },
            { id: 5, title: 'Analytics', path: role === 'hod' ? '/hod/data' : '/advisor/analytics', category: 'Data' },
        ];
    };

    const filteredSearch = searchQuery
        ? getSearchData().filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    // Breadcrumb Logic
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Sidebar
                role={user?.role}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div
                className={`min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen && window.innerWidth >= 1024 ? 'pl-72' : 'pl-0'
                    }`}
            >
                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-6 lg:px-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2.5 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-primary-600 rounded-xl transition-all border border-slate-200"
                        >
                            <Menu size={20} />
                        </button>

                        {/* Breadcrumb Navigation */}
                        <nav className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ml-4">
                            <Link to={`/${user?.role?.toLowerCase()}/dashboard`} className="text-slate-400 hover:text-primary-600 transition-colors flex items-center gap-1">
                                <Home size={12} />
                                Portal
                            </Link>
                            {pathnames.map((value, index) => {
                                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                                const isLast = index === pathnames.length - 1;
                                const label = value.replace(/-/g, ' ');

                                return (
                                    <React.Fragment key={to}>
                                        <ChevronRight size={10} className="text-slate-300" />
                                        {isLast ? (
                                            <span className="text-primary-600 underline underline-offset-4 decoration-2">{label}</span>
                                        ) : (
                                            <Link to={to} className="text-slate-400 hover:text-primary-600 transition-colors">
                                                {label}
                                            </Link>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6">
                        <div className="hidden sm:flex relative group">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-primary-500">
                                <Search size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Global Search..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSearchResults(e.target.value.length > 0);
                                }}
                                onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
                                className="w-48 lg:w-64 pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none text-sm transition-all"
                            />

                            {/* Global Search Results Dropdown */}
                            {showSearchResults && (
                                <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden text-center z-50">
                                    <div className="p-4 border-b border-slate-50 flex items-center justify-between text-left">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Search Results</p>
                                        <button onClick={() => setShowSearchResults(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {filteredSearch.length > 0 ? (
                                            filteredSearch.map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        navigate(item.path);
                                                        setShowSearchResults(false);
                                                        setSearchQuery('');
                                                    }}
                                                    className="w-full p-4 hover:bg-slate-50 flex items-center justify-between group transition-colors text-left"
                                                >
                                                    <div className="text-left">
                                                        <p className="text-sm font-bold text-slate-800 group-hover:text-primary-600">{item.title}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{item.category}</p>
                                                    </div>
                                                    <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-600" />
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-8 text-center">
                                                <p className="text-sm text-slate-400 italic">No matches found for "{searchQuery}"</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={`p-2.5 rounded-xl transition-all relative border ${showNotifications
                                    ? 'bg-primary-50 text-primary-600 border-primary-100'
                                    : 'text-slate-500 border-transparent hover:bg-slate-50'
                                    }`}
                            >
                                <Bell size={22} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden text-center z-50">
                                    <div className="p-4 border-b border-slate-50 flex items-center justify-between text-left">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Notifications ({unreadCount})</p>
                                        <button onClick={handleMarkAllRead} className="text-primary-600 text-[10px] font-bold uppercase hover:underline">Mark all read</button>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            notifications.map(note => (
                                                <div
                                                    key={note.id}
                                                    onClick={() => handleNotificationClick(note.id, note.path)}
                                                    className={`p-4 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors cursor-pointer text-left relative ${!note.read ? 'bg-primary-50/30' : ''}`}
                                                >
                                                    {!note.read && <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-primary-600 rounded-full"></div>}
                                                    <div className="flex items-start gap-3 text-left">
                                                        <div className={`p-2 rounded-lg shrink-0 ${note.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                                                            note.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                                                                'bg-blue-50 text-blue-600'
                                                            }`}>
                                                            {note.type === 'warning' ? <AlertCircle size={16} /> :
                                                                note.type === 'success' ? <CheckCircle2 size={16} /> :
                                                                    <Info size={16} />}
                                                        </div>
                                                        <div className="text-left">
                                                            <p className={`text-sm font-bold leading-tight mb-1 ${!note.read ? 'text-slate-900' : 'text-slate-600'}`}>{note.title}</p>
                                                            <p className="text-xs text-slate-500 leading-relaxed mb-1">{note.message}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{note.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-10 text-center">
                                                <p className="text-sm text-slate-400">All caught up!</p>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleClearActivity}
                                        className="w-full py-3 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors"
                                    >
                                        Clear All Activity
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="h-8 w-[1px] bg-slate-200"></div>

                        <div
                            onClick={() => navigate(`/${user?.role?.toLowerCase()}/profile`)}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <div className="text-right hidden lg:block">
                                <p className="text-xs font-bold text-slate-900 uppercase group-hover:text-primary-600 transition-colors">{user?.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{user?.role?.replace('_', ' ')}</p>
                            </div>
                            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary-200 group-hover:scale-110 group-hover:shadow-primary-300 transition-all">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 lg:p-10 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
