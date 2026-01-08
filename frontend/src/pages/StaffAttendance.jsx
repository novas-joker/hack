import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import {
    CheckCircle2,
    XCircle,
    Clock,
    Search,
    Save,
    ChevronLeft,
    Calendar,
    BookOpen,
    Filter
} from 'lucide-react';

const StaffAttendance = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [isSaving, setIsSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [session, setSession] = useState({
        subject: 'Computer Networks',
        date: 'Jan 08, 2026',
        session: 'Morning (09:00 - 10:00)'
    });

    const [students, setStudents] = useState([
        { id: 1, name: 'Rahul Sharma', roll: '22CS104', status: 'PRESENT' },
        { id: 2, name: 'Priya Patel', roll: '22CS112', status: 'PRESENT' },
        { id: 3, name: 'Anish Kumar', roll: '22CS108', status: 'ABSENT' },
        { id: 4, name: 'Sneha Reddy', roll: '22CS125', status: 'OD' },
        { id: 5, name: 'Vikram Singh', roll: '22CS132', status: 'PRESENT' },
        { id: 6, name: 'Divya V', roll: '22CS115', status: 'PRESENT' },
    ]);

    const toggleStatus = (id, newStatus) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
    };

    const handleMarkAllPresent = () => {
        setStudents(students.map(s => ({ ...s, status: 'PRESENT' })));
        showToast('All students marked as present.', 'success');
    };

    const getStats = () => {
        const total = students.length;
        const present = students.filter(s => s.status === 'PRESENT').length;
        const absent = students.filter(s => s.status === 'ABSENT').length;
        const od = students.filter(s => s.status === 'OD').length;
        return { total, present, absent, od };
    };

    const stats = getStats();

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.roll.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (!navigator.onLine) {
                throw new Error('Offline');
            }
            await new Promise(resolve => setTimeout(resolve, 1500));
            showToast('Attendance records synchronized successfully!', 'success');
        } catch (err) {
            showToast('Cloud sync failed. Check your internet connection.', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-all active:scale-90"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Mark Attendance</h1>
                        <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
                            <Calendar size={14} /> {session.date} • <Clock size={14} /> {session.session}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 active:scale-95 disabled:opacity-50"
                >
                    {isSaving ? <Clock size={20} className="animate-spin" /> : <Save size={20} />}
                    {isSaving ? 'Saving...' : 'Save Attendance'}
                </button>
            </div>

            <div className="flex flex-wrap gap-4">
                <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <BookOpen size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Active Subject</p>
                        <p className="text-sm font-bold text-slate-800">{session.subject}</p>
                    </div>
                </div>
                <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 flex items-center gap-6 shadow-sm">
                    <div className="flex items-center gap-2 border-r border-slate-100 pr-4">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                        <span className="text-sm font-bold text-slate-700">{stats.present} Present</span>
                    </div>
                    <div className="flex items-center gap-2 border-r border-slate-100 pr-4 text-center">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                        <span className="text-sm font-bold text-slate-700">{stats.absent} Absent</span>
                    </div>
                    <div className="flex items-center gap-2 text-center">
                        <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                        <span className="text-sm font-bold text-slate-700">{stats.od} OD</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-center">
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Filter by name or roll number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={handleMarkAllPresent}
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-600 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all active:scale-95"
                    >
                        <Filter size={16} /> Mark All Present
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Student Details</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Roll Number</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Current Status</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3 text-center">
                                                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 font-bold text-sm">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <p className="text-sm font-bold text-slate-800">{student.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-sm font-medium text-slate-500">{student.roll}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase transition-all duration-300 ${student.status === 'PRESENT' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    student.status === 'ABSENT' ? 'bg-red-50 text-red-700 border-red-200' :
                                                        'bg-amber-50 text-amber-700 border-amber-200'
                                                }`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => toggleStatus(student.id, 'PRESENT')}
                                                    className={`p-2.5 rounded-xl transition-all ${student.status === 'PRESENT' ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-slate-50 text-slate-400 hover:bg-green-50 hover:text-green-600'}`}
                                                    title="Mark Present"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => toggleStatus(student.id, 'ABSENT')}
                                                    className={`p-2.5 rounded-xl transition-all ${student.status === 'ABSENT' ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600'}`}
                                                    title="Mark Absent"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                                <button
                                                    onClick={() => toggleStatus(student.id, 'OD')}
                                                    className={`p-2.5 rounded-xl transition-all ${student.status === 'OD' ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' : 'bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-600'}`}
                                                    title="Mark OD"
                                                >
                                                    <Clock size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-10 text-center text-slate-400 italic">
                                        No students found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium italic">
                        *OD status is automatically synchronized with the OD approval system.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StaffAttendance;
