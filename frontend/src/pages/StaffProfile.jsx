import React, { useState, useRef } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Briefcase,
    ShieldCheck,
    Camera,
    Save,
    X,
    Building2,
    Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileField = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
        <div className="p-2.5 bg-slate-100 text-slate-500 rounded-xl">
            <Icon size={18} />
        </div>
        <div className="text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const StaffProfile = () => {
    const { user } = useAuth();
    const { showToast } = useToast();
    const fileInputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [profileImg, setProfileImg] = useState(null);

    const [professionalInfo, setProfessionalInfo] = useState({
        staffId: 'STF9420',
        designation: user?.role === 'HOD' ? 'Head of Department' : user?.role === 'ADVISOR' ? 'Assistant Professor & FA' : 'Assistant Professor',
        department: 'Computer Science & Engineering',
        specialization: 'Artificial Intelligence & Cloud',
        doj: 'August 12, 2018',
        experience: '8+ Years'
    });

    const [personalInfo, setPersonalInfo] = useState({
        email: user?.email || 'staff@college.edu',
        phone: '+91 91234 56789',
        address: 'Professor Quarters, Block A, College Campus',
        dob: 'March 22, 1988',
        bloodGroup: 'B+ Positive'
    });

    const [editForm, setEditForm] = useState({ ...personalInfo });

    const handlePhotoClick = () => fileInputRef.current?.click();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImg(reader.result);
                showToast('Profile photo updated!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setPersonalInfo({ ...editForm });
        setIsEditing(false);
        showToast('Profile updated successfully!', 'success');
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 text-slate-900 -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-700">
                    <Building2 size={240} />
                </div>

                <div className="relative">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-900 rounded-[40px] flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-2xl border-4 border-white overflow-hidden">
                        {profileImg ? <img src={profileImg} alt="Profile" className="w-full h-full object-cover" /> : user?.name?.charAt(0)}
                    </div>
                    <button onClick={handlePhotoClick} className="absolute bottom-1 right-1 p-2.5 bg-primary-600 text-white rounded-2xl border-4 border-white shadow-xl hover:scale-105 transition-all">
                        <Camera size={18} />
                    </button>
                </div>

                <div className="text-center md:text-left relative z-10 flex-1">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{user?.name}</h1>
                        <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                            {professionalInfo.staffId}
                        </span>
                    </div>
                    <p className="text-primary-600 font-bold mb-6">{professionalInfo.designation}</p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 border border-slate-100">
                            <Building2 size={14} /> {professionalInfo.department}
                        </div>
                        <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 rounded-xl text-xs font-bold text-emerald-600 border border-emerald-100">
                            <Award size={14} /> {professionalInfo.experience} Exp.
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-center">
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden text-center">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <User size={20} className="text-primary-600" /> Personal Identity
                        </h2>
                        <button onClick={() => { setEditForm({ ...personalInfo }); setIsEditing(true); }} className="text-primary-600 text-[10px] font-bold uppercase tracking-widest hover:underline">Edit Info</button>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
                        <ProfileField icon={Mail} label="Professional Email" value={personalInfo.email} />
                        <ProfileField icon={Phone} label="Contact Line" value={personalInfo.phone} />
                        <ProfileField icon={Calendar} label="Date of Birth" value={personalInfo.dob} />
                        <ProfileField icon={MapPin} label="Residential Address" value={personalInfo.address} />
                    </div>
                </div>

                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden text-center">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <Briefcase size={20} className="text-primary-600" /> Academic Role
                        </h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
                        <ProfileField icon={ShieldCheck} label="Specialization" value={professionalInfo.specialization} />
                        <ProfileField icon={Calendar} label="Joining Date" value={professionalInfo.doj} />
                        <ProfileField icon={Building2} label="Faculty Hub" value="Block 4, CSE Dept" />
                        <ProfileField icon={Mail} label="Dept Email" value="cse.hod@college.edu" />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditing(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl relative z-10 overflow-hidden text-center">
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50">
                                <div className="text-left">
                                    <h2 className="text-xl font-bold text-slate-800">Update Profile</h2>
                                    <p className="text-xs text-slate-500">Modify your personal contact details</p>
                                </div>
                                <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-white rounded-xl transition-colors"><X size={20} className="text-slate-400" /></button>
                            </div>
                            <form onSubmit={handleSave} className="p-8 space-y-5 text-left">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                    <input type="text" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Address</label>
                                    <textarea value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all min-h-[100px]" />
                                </div>
                                <div className="flex gap-3 pt-4 font-bold">
                                    <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50">Cancel</button>
                                    <button type="submit" className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 shadow-lg shadow-primary-200"><Save size={18} /> Save</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StaffProfile;
