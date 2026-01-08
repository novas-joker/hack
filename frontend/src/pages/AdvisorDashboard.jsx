import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    BookOpen,
    AlertTriangle,
    BarChart3,
    Search,
    ChevronRight,
    UserPlus
} from 'lucide-react';

const AdvisorDashboard = () => {
    const navigate = useNavigate();
    const classDetails = {
        batch: '2022-2026',
        department: 'Computer Science',
        section: '2-B',
        totalStudents: 64,
        classAdvisor: 'Dr. Sarah Wilson'
    };

    const criticalIssues = [
        { id: 1, student: 'Rahul Sharma', issue: 'Attendance < 70%', status: 'Notified' },
        { id: 2, student: 'Priya Patel', issue: 'Low Internal Performance', status: 'Review Needed' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Faculty Advisor Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1">Coordination hub for Class {classDetails.section} • {classDetails.department}</p>
                </div>
                <button
                    onClick={() => navigate('/advisor/students')}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                >
                    <UserPlus size={18} /> Add Student
                </button>
            </div>

            {/* Class Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-900 text-white p-6 rounded-3xl col-span-1 md:col-span-2 relative overflow-hidden group">
                    <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
                        <Users size={180} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-primary-400 text-[10px] font-bold uppercase tracking-widest mb-1">Current Assignment</p>
                        <h2 className="text-3xl font-bold mb-4">Class {classDetails.section}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-slate-500 text-[10px] font-bold uppercase">Total Students</p>
                                <p className="text-xl font-bold">{classDetails.totalStudents}</p>
                            </div>
                            <div>
                                <p className="text-slate-500 text-[10px] font-bold uppercase">Batch</p>
                                <p className="text-xl font-bold">{classDetails.batch}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <BookOpen size={24} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Subjects</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900 mt-4">06</p>
                        <p className="text-xs text-slate-400 font-medium">Allocated for semester</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                            <BarChart3 size={24} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">GPA Avg</span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900 mt-4">7.82</p>
                        <p className="text-xs text-slate-400 font-medium">Overall class average</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center items-center">
                {/* Critical Issues Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-center">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <AlertTriangle size={20} className="text-amber-500" />
                            Academic Warnings
                        </h2>
                        <button className="text-primary-600 font-bold text-xs hover:underline">Manage All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Student Name</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Warning Indicator</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Action Taken</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {criticalIssues.map((issue) => (
                                    <tr key={issue.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-800">{issue.student}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg uppercase tracking-tight">
                                                {issue.issue}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-slate-500 italic">{issue.status}</span>
                                                <button className="p-2 text-slate-400 hover:text-primary-600">
                                                    <ChevronRight size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Search Student */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
                    <h3 className="font-bold text-slate-800 mb-2">Student Lookup</h3>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">Search profiles to manage attendance, marks, or records.</p>
                    <div className="relative mb-6">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search student or roll no."
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/advisor/analytics')}
                            className="w-full py-3 bg-slate-50 text-slate-600 font-bold text-xs rounded-xl border border-transparent hover:border-slate-200 transition-all"
                        >
                            Subject Allocation Dashboard
                        </button>
                        <button
                            onClick={() => navigate('/advisor/analytics')}
                            className="w-full py-3 bg-slate-50 text-slate-600 font-bold text-xs rounded-xl border border-transparent hover:border-slate-200 transition-all"
                        >
                            Class Timetable Management
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvisorDashboard;
