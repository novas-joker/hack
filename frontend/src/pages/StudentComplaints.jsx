import React, { useState } from 'react';
import {
    MessageSquare,
    ShieldCheck,
    Send,
    Clock,
    CheckCircle2,
    AlertCircle,
    Search,
    ChevronRight,
    Info,
    Loader2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const StudentComplaints = () => {
    const { showToast } = useToast();
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        category: 'Academic',
        subject: '',
        description: ''
    });

    const previousComplaints = [
        { id: 'TIC-945', subject: 'CAT 1 Marks discrepancy', date: 'Jan 05, 2026', status: 'IN_REVIEW', type: 'Identified' },
        { id: 'TIC-812', subject: 'Lab 04 AC leaking', date: 'Dec 20, 2025', status: 'RESOLVED', type: 'Anonymous' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (form.subject.length < 5) {
            showToast('Subject is too short (min 5 chars)', 'error');
            return;
        }
        if (form.description.length < 20) {
            showToast('Please provide a detailed description (min 20 chars)', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            // EXCEPTION HANDLING: Network check
            if (!navigator.onLine) {
                throw new Error('Offline');
            }

            // Mock API
            await new Promise(resolve => setTimeout(resolve, 1500));
            showToast(`Complaint submitted ${isAnonymous ? 'anonoymously ' : ''}successfully!`, 'success');
            setForm({ category: 'Academic', subject: '', description: '' });
        } catch (err) {
            showToast('Submission failed. Check your internet connection.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight text-left">Grievance Portal</h1>
                <p className="text-slate-500 text-sm mt-1 text-left">Voice your concerns or suggestions directly to the department.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-center items-center">
                {/* Submission Form */}
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden text-center">
                    <div className={`p-8 border-b border-slate-50 transition-colors duration-500 ${isAnonymous ? 'bg-emerald-50/50' : 'bg-primary-50/30'}`}>
                        <div className="flex items-center justify-between mb-2 text-left">
                            <h2 className="text-lg font-bold text-slate-800">New Grievance</h2>
                            <button
                                onClick={() => {
                                    setIsAnonymous(!isAnonymous);
                                    showToast(isAnonymous ? 'Switched to Identified mode' : 'Switched to Anonymous mode', 'info');
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${isAnonymous ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-slate-200 text-slate-600'
                                    }`}
                            >
                                <ShieldCheck size={14} />
                                {isAnonymous ? 'Anonymous Mode ON' : 'Anonymous Mode OFF'}
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 text-left">
                            {isAnonymous
                                ? 'Your identity will be hidden from everyone, even the HOD.'
                                : 'Your profile details will be visible to the course coordinator.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6" noValidate>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1 block text-left">Category</label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                            >
                                <option>Academic</option>
                                <option>Infrastructure</option>
                                <option>Staff-Related</option>
                                <option>Others</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1 block text-left">Grievance Subject</label>
                            <input
                                type="text"
                                placeholder="Summary of the issue..."
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                required
                                value={form.subject}
                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1 block text-left">Detailed Description</label>
                            <textarea
                                placeholder="Describe the issue in detail..."
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all min-h-[160px]"
                                required
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${isAnonymous
                                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
                                : 'bg-primary-600 hover:bg-primary-700 shadow-primary-100'
                                } text-white disabled:opacity-50`}
                        >
                            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                            {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
                        </button>
                    </form>
                </div>

                {/* History & Tracking */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm text-center">
                        <div className="flex items-center justify-between mb-8 text-left">
                            <h3 className="font-bold text-slate-800">Tracking (Last 3)</h3>
                            <Search size={18} className="text-slate-400" />
                        </div>

                        <div className="space-y-4">
                            {previousComplaints.map((item) => (
                                <div key={item.id} className="p-5 rounded-2xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50/50 transition-all group cursor-pointer text-left">
                                    <div className="flex justify-between items-start mb-2 text-left">
                                        <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded">#{item.id}</span>
                                        <span className={`text-[10px] font-bold uppercase transition-all ${item.status === 'RESOLVED' ? 'text-emerald-500' : 'text-amber-500'
                                            }`}>
                                            {item.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm mb-1">{item.subject}</h4>
                                    <div className="flex justify-between items-center text-left">
                                        <p className="text-[10px] text-slate-400">{item.date} • {item.type}</p>
                                        <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500 text-left">
                            <ShieldCheck size={160} />
                        </div>
                        <div className="relative z-10 text-left">
                            <h4 className="font-bold text-lg mb-2">GDPR & Privacy Assurance</h4>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                Anonymous grievances are encrypted at the database level. No personal metadata (IP, Name, Roll) is stored when in Anonymous Mode.
                                Your feedback is essential for departmental growth.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentComplaints;
