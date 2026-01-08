import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    MapPin,
    FileText,
    CheckCircle2,
    AlertCircle,
    Plus,
    X,
    Send,
    Paperclip
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const StatCard = ({ label, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${colorClass}`}>
            <Icon size={20} />
        </div>
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
    </div>
);

const StudentAttendance = () => {
    const { showToast } = useToast();
    const [showODModal, setShowODModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [odForm, setOdForm] = useState({
        startDate: '',
        endDate: '',
        type: 'EVENT',
        reason: '',
        file: null
    });

    const subjects = [
        { name: 'Computer Networks', attended: 42, total: 45, percent: 93 },
        { name: 'Machine Learning', attended: 38, total: 45, percent: 84 },
        { name: 'Cyber Security', attended: 35, total: 45, percent: 77 },
        { name: 'Cloud Computing', attended: 40, total: 45, percent: 88 },
    ];

    const handleODSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!odForm.startDate || !odForm.endDate) {
            showToast('Please select both start and end dates', 'error');
            return;
        }
        if (new Date(odForm.startDate) > new Date(odForm.endDate)) {
            showToast('Start date cannot be after end date', 'error');
            return;
        }
        if (odForm.reason.length < 10) {
            showToast('Please provide a more detailed reason (min 10 chars)', 'error');
            return;
        }
        if (!odForm.file) {
            showToast('Please attach a proof document (PDF/Image)', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            // EXCEPTION HANDLING: Network check
            if (!navigator.onLine) {
                throw new Error('Offline');
            }

            // API call simulation
            await new Promise(resolve => setTimeout(resolve, 1500));
            showToast('OD Application submitted successfully!', 'success');
            setShowODModal(false);
            setOdForm({ startDate: '', endDate: '', type: 'EVENT', reason: '', file: null });
        } catch (err) {
            showToast('Submission failed. Check your internet connection.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight text-left">Attendance & OD Status</h1>
                    <p className="text-slate-500 text-sm mt-1 text-left">Track your presence and manage On-Duty requests.</p>
                </div>
                <button
                    onClick={() => setShowODModal(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 active:scale-95"
                >
                    <Plus size={20} /> Apply for OD
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <StatCard label="Overall Presence" value="85.2%" icon={CheckCircle2} colorClass="bg-green-50 text-green-600" />
                <StatCard label="Total Sessions" value="180" icon={Clock} colorClass="bg-blue-50 text-blue-600" />
                <StatCard label="OD Days" value="06" icon={MapPin} colorClass="bg-purple-50 text-purple-600" />
                <StatCard label="Shortage Caution" value="None" icon={AlertCircle} colorClass="bg-emerald-50 text-emerald-600" />
            </div>

            {/* Subject-wise Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {subjects.map((sub, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-center mb-4">
                            <div className="relative w-20 h-20 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="40" cy="40" r="36" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                                    <circle cx="40" cy="40" r="36" fill="none" stroke={sub.percent > 75 ? "#7C3AED" : "#EF4444"} strokeWidth="6"
                                        strokeDasharray={226} strokeDashoffset={226 - (226 * sub.percent) / 100} strokeLinecap="round" />
                                </svg>
                                <span className="absolute text-sm font-bold text-slate-800">{sub.percent}%</span>
                            </div>
                        </div>
                        <p className="text-sm font-bold text-slate-800 mb-1">{sub.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{sub.attended}/{sub.total} Sessions</p>
                    </div>
                ))}
            </div>

            {/* OD Application Modal */}
            {showODModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isSubmitting && setShowODModal(false)}></div>
                    <form
                        onSubmit={handleODSubmit}
                        className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl relative z-10 overflow-hidden"
                        noValidate
                    >
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Apply for On-Duty (OD)</h2>
                            <button
                                type="button"
                                onClick={() => setShowODModal(false)}
                                className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"
                                disabled={isSubmitting}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Start Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={odForm.startDate}
                                        onChange={(e) => setOdForm({ ...odForm, startDate: e.target.value })}
                                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">End Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={odForm.endDate}
                                        onChange={(e) => setOdForm({ ...odForm, endDate: e.target.value })}
                                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">OD Category</label>
                                <select
                                    value={odForm.type}
                                    onChange={(e) => setOdForm({ ...odForm, type: e.target.value })}
                                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                >
                                    <option value="EVENT">Technical Event / Hackathon</option>
                                    <option value="SPORTS">Sports / Competition</option>
                                    <option value="SICK">Medical Emergency</option>
                                    <option value="OFFICIAL">College Official Work</option>
                                </select>
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1 block text-left">Reason / Proof Details</label>
                                <textarea
                                    placeholder="Mention the event name, organization, and a brief description..."
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all min-h-[120px]"
                                    required
                                    value={odForm.reason}
                                    onChange={(e) => setOdForm({ ...odForm, reason: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1 block text-left">Attach Proof (PDF/JPG)</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="od-file"
                                        className="hidden"
                                        onChange={(e) => setOdForm({ ...odForm, file: e.target.files[0] })}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                    <label
                                        htmlFor="od-file"
                                        className={`w-full p-4 bg-slate-50 border-2 border-dashed rounded-2xl flex items-center justify-between cursor-pointer transition-all ${odForm.file ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-primary-400'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${odForm.file ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                <Paperclip size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">
                                                    {odForm.file ? odForm.file.name : 'Select Proof Document'}
                                                </p>
                                                <p className="text-[10px] text-slate-400 font-medium uppercase">
                                                    {odForm.file ? `${(odForm.file.size / 1024).toFixed(1)} KB` : 'Max size: 5MB'}
                                                </p>
                                            </div>
                                        </div>
                                        {odForm.file && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setOdForm({ ...odForm, file: null });
                                                }}
                                                className="p-1 hover:bg-white rounded-full text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowODModal(false)}
                                className="flex-1 py-3.5 text-slate-600 font-bold text-sm hover:underline"
                                disabled={isSubmitting}
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-3.5 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <Clock size={18} className="animate-spin" />
                                ) : (
                                    <Send size={18} />
                                )}
                                {isSubmitting ? 'Processing...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default StudentAttendance;
