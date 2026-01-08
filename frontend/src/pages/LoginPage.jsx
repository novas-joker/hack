import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { GraduationCap, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showToast('Please enter a valid academic email address', 'error');
            return false;
        }
        if (!password || password.length < 4) {
            showToast('Password must be at least 4 characters long', 'error');
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // EXCEPTION HANDLING: Network connectivity check
            if (!navigator.onLine) {
                throw new Error('Network Error');
            }

            // MOCK DATA for Hackathon Testing
            let mockRole = 'STUDENT';
            if (email.includes('hod')) mockRole = 'HOD';
            else if (email.includes('staff')) mockRole = 'STAFF';
            else if (email.includes('advisor')) mockRole = 'ADVISOR';

            // Simulating API latency
            await new Promise(resolve => setTimeout(resolve, 800));

            const mockUser = { id: 1, name: email.split('@')[0], email, role: mockRole };
            const mockToken = 'mock-jwt-token';

            login(mockUser, mockToken);
            showToast(`Welcome back, ${mockUser.name}!`, 'success');

            // Redirect based on role
            const roleMap = {
                'STUDENT': '/student/dashboard',
                'STAFF': '/staff/dashboard',
                'ADVISOR': '/advisor/dashboard',
                'HOD': '/hod/dashboard'
            };

            navigate(roleMap[mockRole] || '/');

        } catch (err) {
            showToast('Login failed. Please check your network connection.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary-600"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50"></div>

            <div className="w-full max-w-md p-8 relative z-10 text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-200 mb-4 transition-transform hover:scale-105 duration-300">
                        <GraduationCap size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AMS Portal</h1>
                    <p className="text-slate-500 mt-2">Academic Management System</p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 p-8 text-left">
                    <form onSubmit={handleLogin} className="space-y-6" noValidate>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                    <Mail size={18} />
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                                    placeholder="name@college.edu"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Sign In <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-[11px] text-slate-400 font-medium">
                    DEMO: Try hod@test.com / staff@test.com / student@test.com
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
