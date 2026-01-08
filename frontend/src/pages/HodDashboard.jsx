import React from 'react';
import {
    Building2,
    Users,
    UserPlus,
    AlertCircle,
    BarChart3,
    Search,
    ChevronRight,
    TrendingUp,
    Mail
} from 'lucide-react';

const HodDashboard = () => {
    const departmentStats = {
        name: 'Computer Science & Engineering',
        totalStaff: 24,
        totalStudents: 420,
        avgPerformance: '82%',
        criticalGrievances: 2
    };

    const staffPerformance = [
        { id: 1, name: 'Dr. Sarah Wilson', subject: 'Cloud Computing', passRate: '96%', avgInternal: '44/50' },
        { id: 2, name: 'Prof. James Bond', subject: 'Network Security', passRate: '88%', avgInternal: '38/50' },
        { id: 3, name: 'Dr. Emily Blunt', subject: 'Machine Learning', passRate: '91%', avgInternal: '42/50' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Department HOD Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1">{departmentStats.name}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
                        <Mail size={18} /> Broadcast Message
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-bold text-sm hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
                        <BarChart3 size={18} /> Generate Dept. Report
                    </button>
                </div>
            </div>

            {/* High Level Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Students', value: '420', icon: Users, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Avg. Internal Mark', value: '41.2', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Failing Students', value: '18', icon: AlertCircle, color: 'text-red-600 bg-red-50' },
                    { label: 'Active Faculty', value: '24', icon: UserPlus, color: 'text-purple-600 bg-purple-50' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                        <div className={`p-3 rounded-2xl ${stat.color} mb-3`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-3xl font-bold text-slate-900 leading-tight">{stat.value}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center items-center">
                {/* Faculty Performance Overview */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-center">
                    <div className="p-6 border-b border-slate-50 border-slate-200 flex items-center justify-between">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <Building2 size={20} className="text-primary-600" />
                            Faculty Academic Performance
                        </h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input type="text" placeholder="Search faculty..." className="pl-8 pr-4 py-1.5 bg-slate-100 border-none rounded-lg text-xs outline-none" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Faculty Name</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center text-center">Subject Handling</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Avg. Pass Rate</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right text-center">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {staffPerformance.map((staff) => (
                                    <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-800">{staff.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-slate-500 font-medium">{staff.subject}</span>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: staff.passRate }}></div>
                                                </div>
                                                <span className="text-xs font-bold text-emerald-600">{staff.passRate}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-slate-400 hover:text-primary-600">
                                                <ChevronRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Departmental Challenges Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 h-full shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 -mr-12 -mt-12 group-hover:rotate-12 transition-transform duration-500">
                        <AlertCircle size={160} />
                    </div>
                    <div className="relative z-10 text-left">
                        <h3 className="text-xl font-bold mb-6">Status Overview</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                                    <span>Subject Allocation</span>
                                    <span className="text-primary-400">Complete</span>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full">
                                    <div className="h-full bg-primary-500 w-full rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                                    <span>Attendance Entry</span>
                                    <span className="text-amber-400">92%</span>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full">
                                    <div className="h-full bg-amber-500 w-[92%] rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                                    <span>Mark Entry</span>
                                    <span className="text-red-400">76%</span>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full">
                                    <div className="h-full bg-red-400 w-[76%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center">
                                <AlertCircle size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-200">2 Critical Grievances</p>
                                <p className="text-[10px] text-slate-500">Infrastructure related • LAB 04</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HodDashboard;
