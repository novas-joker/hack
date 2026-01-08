import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import {
    FileText,
    Trophy,
    Target,
    BarChart3,
    Search,
    Download,
    Info
} from 'lucide-react';

const StudentMarks = () => {
    const { showToast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);

    const marksData = [
        { id: 1, name: 'Computer Networks', cat1: 88, cat2: 92, attendanceScore: 18, total: 46, status: 'Distinction' },
        { id: 2, name: 'Operating Systems', cat1: 75, cat2: 80, attendanceScore: 16, total: 40, status: 'First Class' },
        { id: 3, name: 'Database Management', cat1: 65, cat2: 70, attendanceScore: 14, total: 35, status: 'Second Class' },
        { id: 4, name: 'Software Engineering', cat1: 90, cat2: 85, attendanceScore: 19, total: 47, status: 'Distinction' },
    ];

    const filteredMarks = marksData.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDownload = async () => {
        setIsDownloading(true);
        showToast('Generating marksheet... Please wait', 'info');
        await new Promise(resolve => setTimeout(resolve, 2000));
        showToast('Marksheet downloaded successfully!', 'success');
        setIsDownloading(false);
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Academic Marks</h1>
                    <p className="text-slate-500 text-sm mt-1">Detailed breakdown of internal assessments and performance indices.</p>
                </div>
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 bg-white rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                    <Download size={20} className={isDownloading ? 'animate-bounce' : ''} />
                    {isDownloading ? 'Downloading...' : 'Download Marksheet'}
                </button>
            </div>

            {/* Internal Calculation Formula Card */}
            <div className="bg-primary-50 rounded-3xl p-6 border border-primary-100 flex items-start gap-4">
                <div className="p-3 bg-primary-600 text-white rounded-2xl shadow-lg shadow-primary-200">
                    <Info size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-primary-900 mb-1">Internal Marks Calculation</h3>
                    <p className="text-sm text-primary-700 leading-relaxed max-w-3xl">
                        Internal Total = (CAT 1 @ 40%) + (CAT 2 @ 40%) + (Attendance @ 20%).
                        Calculated out of 50 marks. Attendance score is derived from your percentage (90%+ = 20 pts, 85%+ = 18 pts, etc.)
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                {[
                    { label: 'GPA Equivalent', value: '8.45', icon: Target, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Rank in Class', value: '#12', icon: Trophy, color: 'text-amber-600 bg-amber-50' },
                    { label: 'Total Credits', value: '24', icon: FileText, color: 'text-purple-600 bg-purple-50' },
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
                        <div className={`p-4 rounded-2xl ${item.color}`}>
                            <item.icon size={28} />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-medium text-slate-500">{item.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Marks Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-center">
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="font-bold text-slate-800 flex items-center gap-2">
                        <BarChart3 size={20} className="text-primary-600" />
                        Subject-wise Marks Breakdown
                    </h2>
                    <div className="relative max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search subject..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary-500"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Subject Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">CAT 1 (100)</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">CAT 2 (100)</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Attd. Score</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Internal (50)</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Ranking</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredMarks.map((subject, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-800">{subject.name}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-600">{subject.cat1}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-600">{subject.cat2}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm font-medium text-slate-900 bg-slate-100 px-2 py-1 rounded-md">{subject.attendanceScore}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className={`text-sm font-bold ${subject.total > 40 ? 'text-green-600' : 'text-primary-600'}`}>{subject.total}/50</span>
                                            <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary-500" style={{ width: `${(subject.total / 50) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${subject.status === 'Distinction' ? 'bg-amber-50 text-amber-700' :
                                            subject.status === 'First Class' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-700'
                                            }`}>
                                            {subject.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filteredMarks.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400 italic">No subjects matching your search.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Performance Disclaimer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center sm:text-left">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Semester Progress</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                                <span>Course Completion</span>
                                <span className="text-slate-800 text-center">65%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                                <span>Performance vs Class Avg</span>
                                <span className="text-slate-800 text-center">+12%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: '77%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center p-8">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Need a Re-evaluation?</h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                        If you find any discrepancy in your CAT marks or attendance calculations, please reach out to the respective course coordinator or the HOD within 7 working days.
                    </p>
                    <button
                        onClick={() => showToast('Correction request has been sent to your Faculty Advisor.', 'info')}
                        className="text-primary-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        Initiate Correction Request <Download size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentMarks;
