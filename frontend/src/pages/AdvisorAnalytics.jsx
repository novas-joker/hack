import React, { useState } from 'react';
import {
    BarChart3,
    TrendingUp,
    Users,
    Award,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    Calendar
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const AdvisorAnalytics = () => {
    const { showToast } = useToast();
    const [timeframe, setTimeframe] = useState('This Semester');

    const classStats = [
        { label: 'Class Average CGPA', value: '7.85', trend: '+0.12', icon: Award, color: 'text-emerald-600 bg-emerald-50' },
        { label: 'Avg Attendance', value: '84%', trend: '-2%', icon: Users, color: 'text-blue-600 bg-blue-50' },
        { label: 'Students At Risk', value: '08', trend: '+1', icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
        { label: 'Pass Percentage', value: '92%', trend: '+4%', icon: TrendingUp, color: 'text-primary-600 bg-primary-50' },
    ];

    const subjectPerformance = [
        { subject: 'Machine Learning', passRate: 88, avgMark: 72, staff: 'Dr. Sarah Wilson' },
        { subject: 'Cyber Security', passRate: 94, avgMark: 81, staff: 'Prof. James Bond' },
        { subject: 'Soft Computing', passRate: 76, avgMark: 64, staff: 'Dr. Emily Blunt' },
        { subject: 'Cloud Computing', passRate: 91, avgMark: 78, staff: 'Dr. Rahul S.' },
    ];

    const performanceBuckets = [
        { range: '9.0 - 10.0', count: 12, color: 'bg-emerald-500' },
        { range: '8.0 - 8.9', count: 24, color: 'bg-emerald-400' },
        { range: '7.0 - 7.9', count: 18, color: 'bg-blue-400' },
        { range: '6.0 - 6.9', count: 6, color: 'bg-amber-400' },
        { range: '< 6.0', count: 4, color: 'bg-red-400' },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Class Analytics</h1>
                    <p className="text-slate-500 text-sm mt-1">Class 2-B • Computer Science & Engineering</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
                        <Calendar size={16} className="text-slate-400" />
                        <select
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
                        >
                            <option>This Semester</option>
                            <option>Last Semester</option>
                            <option>Academic Year</option>
                        </select>
                    </div>
                    <button
                        onClick={() => showToast('Generating detailed class report...', 'success')}
                        className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-bold text-sm hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 flex items-center gap-2"
                    >
                        <BarChart3 size={18} /> Export Data
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 text-center">
                {classStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm text-center">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                                {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.trend}
                            </div>
                        </div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                        <p className="text-3xl font-extrabold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center items-center">
                {/* Subject-wise Performance */}
                <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden text-center">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <BarChart3 size={20} className="text-primary-600" />
                            Subject-wise Performance
                        </h2>
                        <button onClick={() => showToast('Deep Analysis module is being prepared...', 'info')} className="text-primary-600 text-[10px] font-bold uppercase tracking-widest hover:underline">View Deep Analysis</button>
                    </div>
                    <div className="p-8 space-y-6">
                        {subjectPerformance.map((subj, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-slate-800">{subj.subject}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{subj.staff}</p>
                                    </div>
                                    <div className="text-right text-left">
                                        <span className="text-xs font-bold text-slate-400 uppercase mr-4">Avg: {subj.avgMark}/100</span>
                                        <span className="text-sm font-extrabold text-primary-600">{subj.passRate}% Pass</span>
                                    </div>
                                </div>
                                <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${subj.passRate > 90 ? 'bg-emerald-500' : subj.passRate > 80 ? 'bg-primary-500' : 'bg-amber-500'}`}
                                        style={{ width: `${subj.passRate}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grade Distribution */}
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 text-center">
                    <h2 className="font-bold text-slate-800 flex items-center gap-2 mb-8">
                        <Users size={20} className="text-primary-600" />
                        GPA Distribution
                    </h2>
                    <div className="space-y-6">
                        {performanceBuckets.map((bucket, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <span className="text-xs font-bold text-slate-500 w-20 text-left">{bucket.range}</span>
                                <div className="flex-1 h-3 bg-slate-50 rounded-full overflow-hidden">
                                    <div className={`h-full ${bucket.color}`} style={{ width: `${(bucket.count / 64) * 100 * 2}%` }}></div>
                                </div>
                                <span className="text-xs font-bold text-slate-800 w-8">{bucket.count}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-50">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                            <div className="text-left">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Top Scorer</p>
                                <p className="text-sm font-bold text-slate-800">Priya Iyer (22CS102)</p>
                            </div>
                            <Award className="text-amber-500" size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvisorAnalytics;
