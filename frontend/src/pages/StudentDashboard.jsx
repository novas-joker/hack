import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TrendingUp,
    Clock,
    FileText,
    AlertCircle,
    Calendar,
    ArrowRight
} from 'lucide-react';

const KPICard = ({ title, value, subtext, icon: Icon, color, onClick }) => (
    <div
        onClick={onClick}
        className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer active:scale-95' : ''}`}
    >
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl ${color.bg} ${color.text}`}>
                <Icon size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-[10px] font-bold">
                <TrendingUp size={12} />
                <span>+2.4%</span>
            </div>
        </div>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <span className="text-xs text-slate-400 font-medium">{subtext}</span>
        </div>
    </div>
);

const StudentDashboard = () => {
    const navigate = useNavigate();
    const kpis = [
        { title: 'Current Attendance', value: '84.2%', subtext: 'Target: 75%', icon: Calendar, color: { bg: 'bg-blue-50', text: 'text-blue-600' }, path: '/student/attendance' },
        { title: 'Avg. Internal Mark', value: '42.5', subtext: 'Out of 50', icon: FileText, color: { bg: 'bg-purple-50', text: 'text-purple-600' }, path: '/student/marks' },
        { title: 'OD Status', value: 'Approved', subtext: 'Recent: Technical Symposium', icon: Clock, color: { bg: 'bg-emerald-50', text: 'text-emerald-600' }, path: '/student/attendance' },
        { title: 'Pending Complaints', value: '0', subtext: 'All issues resolved', icon: AlertCircle, color: { bg: 'bg-orange-50', text: 'text-orange-600' }, path: '/student/complaints' },
    ];

    const recentSubjects = [
        { name: 'Computer Networks', attendance: '92%', internals: '45/50', status: 'Excellent' },
        { name: 'Operating Systems', attendance: '81%', internals: '38/50', status: 'Good' },
        { name: 'Database Management', attendance: '74%', internals: '41/50', status: 'At Risk' },
        { name: 'Software Engineering', attendance: '88%', internals: '43/50', status: 'Excellent' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">Welcome back! Here's your academic summary for the current semester.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, idx) => (
                    <KPICard
                        key={idx}
                        {...kpi}
                        onClick={() => navigate(kpi.path)}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Academic Overview Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-center">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="font-bold text-slate-800">Subject-wise Academic Status</h2>
                        <button className="text-primary-600 text-xs font-bold hover:underline">View All Records</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Subject</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Attendance</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Internals</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Performance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentSubjects.map((subject, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-800 ">{subject.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-20">
                                                    <div
                                                        className={`h-full rounded-full ${parseInt(subject.attendance) < 75 ? 'bg-red-500' : 'bg-primary-500'}`}
                                                        style={{ width: subject.attendance }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium text-slate-600">{subject.attendance}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-slate-700">{subject.internals}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${subject.status === 'Excellent' ? 'bg-green-50 text-green-700' :
                                                subject.status === 'Good' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'
                                                }`}>
                                                {subject.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="space-y-6 text-center">
                    <div className="bg-primary-600 rounded-3xl p-6 text-white shadow-xl shadow-primary-100 relative overflow-hidden group">
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
                        <h3 className="text-lg font-bold mb-2 relative z-10">Quick Actions</h3>
                        <p className="text-primary-100 text-sm mb-6 relative z-10 leading-relaxed">Need to apply for a leave or report an issue? Use the shortcuts below.</p>
                        <div className="space-y-3 relative z-10">
                            <button
                                onClick={() => navigate('/student/attendance')}
                                className="w-full py-3 bg-white text-primary-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-50 transition-colors"
                            >
                                Apply for OD <ArrowRight size={16} />
                            </button>
                            <button
                                onClick={() => navigate('/student/complaints')}
                                className="w-full py-3 bg-primary-500/50 text-white rounded-xl font-bold border border-primary-400/30 hover:bg-primary-500/80 transition-colors"
                            >
                                Report Issue
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Upcoming Schedule</h3>
                        <div className="space-y-4">
                            {[
                                { time: '09:00 AM', name: 'Computer Networks', room: 'Lab 04' },
                                { time: '11:15 AM', name: 'Software Engineering', room: 'Hall 12' },
                            ].map((slot, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                    <div className="text-center min-w-[60px]">
                                        <p className="text-[10px] font-bold text-primary-600 uppercase leading-none">{slot.time.split(' ')[1]}</p>
                                        <p className="text-sm font-bold text-slate-900 mt-1">{slot.time.split(' ')[0]}</p>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-slate-800">{slot.name}</p>
                                        <p className="text-xs text-slate-500">Room: {slot.room}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
