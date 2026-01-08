import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import {
    Users,
    Clock,
    MessageSquare,
    AlertTriangle,
    ChevronRight,
    Search,
    CheckCircle2,
    XCircle
} from 'lucide-react';

const StatCard = ({ title, value, detail, icon: Icon, colorClass, onClick }) => (
    <div
        onClick={onClick}
        className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all ${onClick ? 'cursor-pointer active:scale-95' : ''}`}
    >
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl ${colorClass}`}>
                <Icon size={24} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Updates</span>
        </div>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            {detail}
        </p>
    </div>
);

const StaffDashboard = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const atRiskStudents = [
        { id: 1, name: 'Rahul Sharma', roll: '22CS104', attendance: '68%', internals: '32/100', reason: 'Low Attendance' },
        { id: 2, name: 'Priya Patel', roll: '22CS112', attendance: '72%', internals: '28/100', reason: 'Performance' },
        { id: 3, name: 'Anish Kumar', roll: '22CS108', attendance: '74%', internals: '45/100', reason: 'Low Attendance' },
    ];

    const pendingODs = [
        { id: 1, student: 'Sneha Reddy', event: 'Hackathon 2026', date: 'Jan 10-12', status: 'Pending' },
        { id: 2, student: 'Vikram Singh', event: 'Sports Zonal', date: 'Jan 15', status: 'Pending' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Staff Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1">Monitor student performance and handle administrative requests.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right sr-only sm:not-sr-only">
                        <p className="text-xs font-bold text-slate-400 uppercase">Today's Date</p>
                        <p className="text-sm font-bold text-slate-800">January 08, 2026</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="At-Risk Students"
                    value="12"
                    detail="Requires immediate attention"
                    icon={AlertTriangle}
                    colorClass="bg-red-50 text-red-600"
                    onClick={() => navigate('/staff/attendance')}
                />
                <StatCard
                    title="Pending OD Requests"
                    value="8"
                    detail="Waiting for your approval"
                    icon={Clock}
                    colorClass="bg-amber-50 text-amber-600"
                    onClick={() => navigate('/staff/od-requests')}
                />
                <StatCard
                    title="Open Complaints"
                    value="3"
                    detail="From current semester"
                    icon={MessageSquare}
                    colorClass="bg-primary-50 text-primary-600"
                    onClick={() => navigate('/staff/complaints')}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center items-center">
                {/* At-Risk Students Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-center">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <Users size={20} className="text-red-500" />
                            At-Risk Students (Class 2-B)
                        </h2>
                        <button
                            onClick={() => navigate('/staff/attendance')}
                            className="text-primary-600 text-xs font-bold hover:underline"
                        >
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Student</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Attendance</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Internals</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {atRiskStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{student.name}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{student.roll}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm font-bold ${parseInt(student.attendance) < 75 ? 'text-red-600' : 'text-slate-700'}`}>
                                                {student.attendance}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-600">{student.internals}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => showToast(`Opening performance record for ${student.name}...`, 'info')}
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                                                title="View Profile"
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pending OD Sidebar inside Dashboard */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
                            Pending ODs
                            <span className="bg-amber-100 px-2 py-1 rounded text-[10px] text-amber-700 font-bold">URGENT</span>
                        </h3>
                        <div className="space-y-4">
                            {pendingODs.map((od) => (
                                <div key={od.id} className="p-4 rounded-2xl border border-slate-50 hover:border-slate-100 transition-all">
                                    <div className="flex justify-between items-start mb-2 text-left">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{od.student}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">{od.event}</p>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{od.date}</span>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => navigate('/staff/od-requests')}
                                            className="flex-1 py-2 bg-primary-600 text-white text-xs font-bold rounded-lg hover:bg-primary-700 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                                        >
                                            <CheckCircle2 size={14} /> Approve
                                        </button>
                                        <button
                                            onClick={() => navigate('/staff/od-requests')}
                                            className="flex-1 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <XCircle size={14} /> Deny
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary-600 rounded-3xl p-6 text-white text-left relative overflow-hidden group">
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
                        <h4 className="font-bold text-lg mb-2 relative z-10">Attendance Marker</h4>
                        <p className="text-primary-100 text-xs mb-6 relative z-10 leading-relaxed">
                            Ready to mark attendance for your current session?
                        </p>
                        <button
                            onClick={() => navigate('/staff/attendance')}
                            className="w-full py-3 bg-white text-primary-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-50 transition-colors relative z-10"
                        >
                            Start Marking <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
