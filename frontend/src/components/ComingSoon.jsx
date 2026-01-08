import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComingSoon = ({ title, feature }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="w-24 h-24 bg-primary-50 text-primary-600 rounded-[40px] flex items-center justify-center mb-8 animate-pulse">
                <Construction size={48} />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4 uppercase">{title || 'Feature Coming Soon'}</h1>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed mb-8">
                We're currently building the {feature || 'requested module'} to provide the best experience. Check back soon for updates!
            </p>
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
                <ArrowLeft size={18} /> Go Back
            </button>
        </div>
    );
};

export default ComingSoon;
