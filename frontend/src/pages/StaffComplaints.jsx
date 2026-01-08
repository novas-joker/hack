import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import {
    MessageSquare,
    Search,
    Filter,
    Clock,
    ChevronRight,
    CheckCircle2,
    AlertCircle,
    ShieldCheck,
    MoreVertical
} from 'lucide-react';

const StaffComplaints = () => {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('Open');
    const [resolvingId, setResolvingId] = useState(null);

    const complaints = [
        {
            id: 'TIC-945',
            category: 'Academic',
            subject: 'CAT 1 Marks discrepancy',
            date: 'Jan 05, 2026',
            status: 'IN_REVIEW',
            isAnonymous: false,
            student: 'Rahul Sharma',
            description: 'The internal marks calculated for Computer Networks CAT 1 show 65, but my paper score was 75. Requesting a re-check.'
        },
        {
            id: 'TIC-952',
            category: 'Infrastructure',
            subject: 'Lab 04 AC leaking',
            date: 'Jan 07, 2026',
            status: 'OPEN',
            isAnonymous: true,
            student: 'Anonymous',
            description: 'The air conditioning in Lab 04 (System Lab) is leaking water onto the students sitting in the second row. Extremely disruptive.'
        },
        {
            id: 'TIC-921',
            category: 'Staff-Related',
            subject: 'Extra classes timing',
            date: 'Jan 02, 2026',
            status: 'RESOLVED',
            isAnonymous: true,
            student: 'Anonymous',
            description: 'Requesting to move the zero-hour extra classes from 4PM to morning 8AM due to bus commute issues.'
        }
    ];

    const handleResolve = async (id) => {
        setResolvingId(id);
        try {
            // EXCEPTION HANDLING: Network check
            if (!navigator.onLine) {
                throw new Error('Offline');
            }

            // Simulated API Check
            await new Promise(resolve => setTimeout(resolve, 1500));
            showToast(`Grievance #${id} marked as Resolved.`, 'success');
        } catch (err) {
            showToast('Resolution update failed. Check internet connection.', 'error');
        } finally {
            setResolvingId(null);
        }
    };

    const statusColors = {
        'OPEN': 'bg-red-50 text-red-700 border-red-100',
        'IN_REVIEW': 'bg-amber-50 text-amber-700 border-amber-100',
        'RESOLVED': 'bg-emerald-50 text-emerald-700 border-emerald-100'
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Grievance Portal</h1>
                    <p className="text-slate-500 text-sm mt-1">Review and resolve departmental complaints and suggestions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
                        <Filter size={18} /> Filters
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                {[
                    { label: 'Total Open', count: 12, icon: AlertCircle, color: 'text-red-600 bg-red-50' },
                    { label: 'In Review', count: 5, icon: Clock, color: 'text-amber-600 bg-amber-50' },
                    { label: 'Resolved Today', count: 8, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Anonymous', count: 15, icon: ShieldCheck, color: 'text-slate-600 bg-slate-50' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{stat.count}</p>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-center">
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        {['Open', 'In Review', 'Resolved'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ID or Topic..."
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Reference ID</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Origin / Mode</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center text-center">Grievance Subject</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {complaints.map((comp) => (
                                <tr key={comp.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                                    <td className="px-8 py-5">
                                        <span className="text-sm font-bold text-primary-600">#{comp.id}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            {comp.isAnonymous ? (
                                                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white" title="Anonymous">
                                                    <ShieldCheck size={16} />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs">
                                                    {comp.student.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{comp.isAnonymous ? 'Restricted Identity' : comp.student}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{comp.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-medium text-slate-700 truncate max-w-xs">{comp.subject}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${statusColors[comp.status]}`}>
                                            {comp.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {comp.status !== 'RESOLVED' && (
                                                <button
                                                    onClick={() => handleResolve(comp.id)}
                                                    disabled={resolvingId === comp.id}
                                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                    title="Mark as Resolved"
                                                >
                                                    {resolvingId === comp.id ? <Clock size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                                                </button>
                                            )}
                                            <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                                                <MoreVertical size={18} />
                                            </button>
                                            <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-all group-hover:translate-x-1">
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-slate-50 text-center">
                    <button className="text-slate-400 text-xs font-bold hover:text-slate-600">Load More History</button>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Resolution Guidelines</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6">
                            All open grievances should be addressed within 72 hours. For infrastructure issues, tag the maintenance supervisor.
                            For academic disputes, ensure the course coordinator is looped in before final resolution.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div> High Urgency
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div> Under Investigation
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Successfully Closed
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-4 bg-slate-50 rounded-3xl min-w-[300px]">
                        <div className="text-center">
                            <p className="text-4xl font-black text-primary-600 mb-1">94%</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Resolution Rate</p>
                            <div className="w-full h-1 bg-slate-200 mt-4 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-600" style={{ width: '94%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffComplaints;
