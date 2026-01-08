import React, { useState } from 'react';
import {
    Building2,
    Users,
    GraduationCap,
    ChevronRight,
    Search,
    Filter,
    BarChart3,
    TrendingUp,
    AlertCircle
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const HodDepartmentData = () => {
    const { showToast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');

    const departments = [
        { id: 1, class: '2-A', semester: '4th Sem', students: 62, attendance: '86%', cgpa: '7.92', advisor: 'Dr. Sarah Wilson' },
        { id: 2, class: '2-B', semester: '4th Sem', students: 64, attendance: '84%', cgpa: '7.85', advisor: 'Dr. John Doe' },
        { id: 3, class: '3-A', semester: '6th Sem', students: 58, attendance: '82%', cgpa: '8.12', advisor: 'Prof. James Bond' },
        { id: 4, class: '3-B', semester: '6th Sem', students: 60, attendance: '88%', cgpa: '8.05', advisor: 'Dr. Emily Blunt' },
        { id: 5, class: '4-A', semester: '8th Sem', students: 54, attendance: '92%', cgpa: '8.45', advisor: 'Dr. Rahul S.' },
    ];

    const filteredClasses = departments.filter(c =>
        c.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.advisor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight text-left">Departmental Data</h1>
                    <p className="text-slate-500 text-sm mt-1">Computer Science & Engineering • Overview of all Sections</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search class or advisor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all w-64 shadow-sm"
                        />
                    </div>
                    <button className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm text-center">
                    <div className="flex items-center gap-4 mb-2 justify-center">
                        <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                            <Users size={20} />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Students</p>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900">420</p>
                </div>
                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm text-center">
                    <div className="flex items-center gap-4 mb-2 justify-center">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <TrendingUp size={20} />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dept. Avg CGPA</p>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900">8.12</p>
                </div>
                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm text-center">
                    <div className="flex items-center gap-4 mb-2 justify-center">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                            <AlertCircle size={20} />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Sections</p>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900">08</p>
                </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden text-center">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <h2 className="font-bold text-slate-800 flex items-center gap-2">
                        <Building2 size={20} className="text-primary-600" />
                        Class-wise Performance Log
                    </h2>
                    <button
                        onClick={() => showToast('Downloading departmental log (Excel)...', 'success')}
                        className="text-primary-600 text-xs font-bold hover:underline"
                    >
                        Download Report
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Class / Section</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Faculty Advisor</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Attendance</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Avg CGPA</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredClasses.map((cls) => (
                                <tr key={cls.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3 text-left">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 font-bold">
                                                {cls.class}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{cls.semester}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{cls.students} Students</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-left">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 text-[10px] font-bold">
                                                {cls.advisor.charAt(4)}
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">{cls.advisor}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-left text-center">
                                        <span className={`text-sm font-bold ${parseInt(cls.attendance) < 80 ? 'text-amber-600' : 'text-slate-700'}`}>
                                            {cls.attendance}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-left text-center">
                                        <div className="flex items-center gap-2 justify-center">
                                            <BarChart3 size={14} className="text-primary-400" />
                                            <span className="text-sm font-bold text-slate-800">{cls.cgpa}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => showToast(`Accessing detailed records for Class ${cls.class}...`, 'info')}
                                            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredClasses.length === 0 && (
                <div className="p-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
                    <p className="text-slate-400 text-sm">No classes match your search query.</p>
                </div>
            )}
        </div>
    );
};

export default HodDepartmentData;
