import React, { useState } from 'react';
import {
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    Search,
    Calendar,
    ExternalLink,
    Info,
    Loader2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const StaffODRequests = () => {
    const { showToast } = useToast();
    const [processingId, setProcessingId] = useState(null);
    const [requests, setRequests] = useState([
        {
            id: 1,
            student: 'Sneha Reddy',
            roll: '22CS125',
            event: 'Inter-College Hackathon',
            dates: 'Jan 10, 2026 - Jan 12, 2026',
            reason: 'Representing college at Smart India Hackathon finals.',
            status: 'PENDING'
        },
        {
            id: 2,
            student: 'Vikram Singh',
            roll: '22CS132',
            event: 'District Athletic Meet',
            dates: 'Jan 15, 2026',
            reason: 'Shotput and Discus throw competitions.',
            status: 'PENDING'
        },
        {
            id: 3,
            student: 'Ananya V',
            roll: '22CS102',
            event: 'Technical Seminar',
            dates: 'Jan 05, 2026',
            reason: 'Paper presentation on AI in Healthcare.',
            status: 'APPROVED'
        }
    ]);

    const handleAction = async (id, newStatus) => {
        setProcessingId(id);
        try {
            // EXCEPTION HANDLING: Network check
            if (!navigator.onLine) {
                throw new Error('Offline');
            }

            // Mock API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
            showToast(`OD Request ${newStatus.toLowerCase()} successfully!`, 'success');
        } catch (err) {
            showToast('Action failed. Check your internet connection.', 'error');
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight text-left">OD Request Management</h1>
                <p className="text-slate-500 text-sm mt-1 text-left">Review and approve "On-Duty" applications from students for events and competitions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-center">
                {requests.filter(r => r.status === 'PENDING').map((req) => (
                    <div key={req.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 hover:shadow-md transition-all text-left">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center font-bold text-lg">
                                    {req.student.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{req.student}</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{req.roll} • Computer Science</p>
                                </div>
                            </div>
                            <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 border border-amber-100">
                                <Clock size={12} /> PENDING
                            </span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl text-left">
                                <Calendar className="text-slate-400 shrink-0" size={18} />
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Event Duration</p>
                                    <p className="text-sm font-bold text-slate-800">{req.dates}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl text-left">
                                <FileText className="text-slate-400 shrink-0" size={18} />
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Purpose / Event</p>
                                    <p className="text-sm font-bold text-slate-800 leading-tight">{req.event}</p>
                                </div>
                            </div>
                            <div className="px-1 text-left">
                                <p className="text-sm text-slate-600 leading-relaxed italic">
                                    "{req.reason}"
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => handleAction(req.id, 'APPROVED')}
                                disabled={processingId === req.id}
                                className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-100 disabled:opacity-50"
                            >
                                {processingId === req.id ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                                Approve OD
                            </button>
                            <button
                                onClick={() => handleAction(req.id, 'REJECTED')}
                                disabled={processingId === req.id}
                                className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all disabled:opacity-50"
                            >
                                <XCircle size={18} /> Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {requests.filter(r => r.status === 'PENDING').length === 0 && (
                <div className="bg-white p-20 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-slate-400 space-y-4 text-center">
                    <div className="p-8 bg-slate-50 rounded-full">
                        <CheckCircle2 size={48} className="text-slate-200" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 text-lg">Inbox Clean!</p>
                        <p className="text-sm mt-1">No pending OD requests at this time.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffODRequests;
