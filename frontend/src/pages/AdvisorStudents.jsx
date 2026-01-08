import React, { useState } from 'react';
import {
    Search,
    Filter,
    User,
    Mail,
    Phone,
    ChevronRight,
    GraduationCap,
    ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdvisorStudents = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const studentList = [
        { id: 1, name: 'Rahul Sharma', roll: '22CS101', email: 'rahul.s@college.edu', phone: '+91 98765 43210', batch: '2022-2026', cgpa: '8.45' },
        { id: 2, name: 'Priya Iyer', roll: '22CS102', email: 'priya.i@college.edu', phone: '+91 98765 43211', batch: '2022-2026', cgpa: '9.10' },
        { id: 3, name: 'Arjun Das', roll: '22CS103', email: 'arjun.d@college.edu', phone: '+91 98765 43212', batch: '2022-2026', cgpa: '7.80' },
        { id: 4, name: 'Sneha Reddy', roll: '22CS104', email: 'sneha.r@college.edu', phone: '+91 98765 43213', batch: '2022-2026', cgpa: '8.15' },
        { id: 5, name: 'Vikram Singh', roll: '22CS105', email: 'vikram.s@college.edu', phone: '+91 98765 43214', batch: '2022-2026', cgpa: '6.90' },
    ];

    const filteredStudents = studentList.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.roll.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Student Directory</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and view detailed profiles of students in your department.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or roll..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all w-64 shadow-sm"
                        />
                    </div>
                    <button
                        onClick={() => showToast('Filter options are being configured for your department.', 'info')}
                        className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredStudents.map((student) => (
                    <div
                        key={student.id}
                        className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all group relative overflow-hidden text-center"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-primary-600 -mr-6 -mt-6 group-hover:scale-110 transition-transform duration-500">
                            <GraduationCap size={120} />
                        </div>

                        <div className="flex items-start justify-between mb-6 relative z-10 text-left">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center font-bold text-xl border border-primary-100 shadow-sm">
                                    {student.name.charAt(0)}
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase">{student.name}</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{student.roll}</p>
                                </div>
                            </div>
                            <button className="p-2 text-slate-300 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                                <ArrowUpRight size={18} />
                            </button>
                        </div>

                        <div className="space-y-3 mb-6 relative z-10 text-left">
                            <div className="flex items-center gap-3 text-slate-500 text-sm">
                                <div className="p-1.5 bg-slate-50 rounded-lg"><Mail size={14} /></div>
                                <span className="truncate">{student.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-sm">
                                <div className="p-1.5 bg-slate-50 rounded-lg"><Phone size={14} /></div>
                                <span>{student.phone}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-50 relative z-10 text-left">
                            <div className="text-left">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Attendance</p>
                                <p className="text-sm font-bold text-slate-800">88.5%</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-right">CGPA</p>
                                <p className={`text-sm font-bold ${parseFloat(student.cgpa) > 8 ? 'text-emerald-600' : 'text-slate-800'}`}>{student.cgpa}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(`/student/profile`)} // Simulating viewing their profile
                            className="w-full mt-6 py-3 bg-slate-50 text-slate-600 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-all border border-slate-100"
                        >
                            View Full Profile
                        </button>
                    </div>
                ))}
            </div>

            {filteredStudents.length === 0 && (
                <div className="p-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search size={24} className="text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">No students found</h3>
                    <p className="text-slate-500 text-sm">Try searching with a different name or roll number.</p>
                </div>
            )}
        </div>
    );
};

export default AdvisorStudents;
