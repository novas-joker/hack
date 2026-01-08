import React, { useState, useRef } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    GraduationCap,
    Award,
    ShieldCheck,
    BookOpen,
    Camera,
    X,
    Save
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileField = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
        <div className="p-2.5 bg-slate-100 text-slate-500 rounded-xl">
            <Icon size={18} />
        </div>
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const StudentProfile = () => {
    const { user } = useAuth();
    const { showToast } = useToast();
    const fileInputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [profileImg, setProfileImg] = useState(null);

    const isStudent = user?.role === 'STUDENT';
    const displayName = isStudent ? user?.name : 'Rahul Sharma';

    const [academicInfo, setAcademicInfo] = useState({
        rollNo: '22CS101',
        batch: '2022-2026',
        department: 'Computer Science & Engineering',
        semester: '4th Semester',
        cgpa: '8.45',
        advisor: 'Dr. Sarah Wilson'
    });

    const [personalInfo, setPersonalInfo] = useState({
        email: isStudent ? user?.email : 'rahul.s@college.edu',
        phone: '+91 98765 43210',
        address: '123 Academic Street, Knowledge Park, Chennai',
        dob: 'May 15, 2004',
        bloodGroup: 'O+ Positive'
    });

    const [editForm, setEditForm] = useState({ ...personalInfo });

    const handlePhotoClick = () => {
        if (!isStudent) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImg(reader.result);
                showToast('Profile photo updated successfully!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveDetails = (e) => {
        e.preventDefault();
        setPersonalInfo({ ...editForm });
        setIsEditing(false);
        showToast('Personal details updated successfully!', 'success');
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 text-slate-900 -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-700">
                    <GraduationCap size={240} />
                </div>

                <div className="relative">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-primary-600 rounded-[40px] flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-2xl shadow-primary-200 border-4 border-white overflow-hidden">
                        {profileImg ? (
                            <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            displayName?.charAt(0).toUpperCase()
                        )}
                    </div>
                    {isStudent && (
                        <button
                            onClick={handlePhotoClick}
                            className="absolute bottom-1 right-1 p-2.5 bg-slate-900 text-white rounded-2xl border-4 border-white shadow-xl hover:scale-105 transition-all"
                        >
                            <Camera size={18} />
                        </button>
                    )}
                </div>

                <div className="text-center md:text-left relative z-10 flex-1">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{displayName}</h1>
                        <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary-100">
                            {academicInfo.rollNo}
                        </span>
                    </div>
                    <p className="text-slate-500 font-medium mb-6">{academicInfo.department}</p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 border border-slate-100">
                            <GraduationCap size={14} /> {academicInfo.batch}
                        </div>
                        <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 rounded-xl text-xs font-bold text-emerald-600 border border-emerald-100">
                            <Award size={14} /> SGPA: {academicInfo.cgpa}
                        </div>
                        <div className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 rounded-xl text-xs font-bold text-blue-600 border border-blue-100">
                            <ShieldCheck size={14} /> {academicInfo.semester}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Details */}
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2 text-left">
                            <User size={20} className="text-primary-600" />
                            Personal Information
                        </h2>
                        {isStudent && (
                            <button
                                onClick={() => {
                                    setEditForm({ ...personalInfo });
                                    setIsEditing(true);
                                }}
                                className="text-primary-600 text-[10px] font-bold uppercase tracking-widest hover:underline"
                            >
                                Edit Details
                            </button>
                        )}
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <ProfileField icon={Mail} label="Email Address" value={personalInfo.email} />
                        <ProfileField icon={Phone} label="Contact Number" value={personalInfo.phone} />
                        <ProfileField icon={Calendar} label="Date of Birth" value={personalInfo.dob} />
                        <ProfileField icon={MapPin} label="Communication Address" value={personalInfo.address} />
                        <ProfileField icon={GraduationCap} label="Blood Group" value={personalInfo.bloodGroup} />
                    </div>
                </div>

                {/* Academic Details */}
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden text-center">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2 text-left">
                            <BookOpen size={20} className="text-primary-600" />
                            Academic Record
                        </h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <ProfileField icon={GraduationCap} label="Roll Number" value={academicInfo.rollNo} />
                        <ProfileField icon={User} label="Faculty Advisor" value={academicInfo.advisor} />
                        <ProfileField icon={BookOpen} label="Curriculum Year" value="2022 Regulations" />
                        <ProfileField icon={Calendar} label="Enrollment Date" value="Aug 24, 2022" />
                        <ProfileField icon={Award} label="Minor Degree" value="AI & ML (Pursuing)" />
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditing(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl relative z-10 overflow-hidden text-center"
                        >
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-primary-50/30">
                                <div className="text-left">
                                    <h2 className="text-xl font-bold text-slate-800">Edit Personal Details</h2>
                                    <p className="text-xs text-slate-500">Update your contact and address information</p>
                                </div>
                                <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-white rounded-xl transition-colors">
                                    <X size={20} className="text-slate-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveDetails} className="p-8 space-y-5 text-left">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                                    <input
                                        type="text"
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Communication Address</label>
                                    <textarea
                                        value={editForm.address}
                                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all min-h-[100px]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Date of Birth</label>
                                        <input
                                            type="text"
                                            value={editForm.dob}
                                            onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Blood Group</label>
                                        <input
                                            type="text"
                                            value={editForm.bloodGroup}
                                            onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all font-bold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 font-bold"
                                    >
                                        <Save size={18} /> Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentProfile;
