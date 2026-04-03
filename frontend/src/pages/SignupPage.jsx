import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Eye, EyeOff, Calendar, User, Mail, Briefcase, AlertCircle } from 'lucide-react';
import { authService } from '../services/api';
import illustration from '../assets/auth-illustration.png';
import TermsModal from '../components/TermsModal';
import PrivacyModal from '../components/PrivacyModal';

const SignupPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [education, setEducation] = useState('');
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            await authService.signup(name, email, password, education);
            // Auto-login after signup
            await authService.login(email, password);
            navigate('/dashboard', { state: { newUser: true } });
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data?.detail || 'Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-navy flex flex-col justify-center items-center p-0 sm:p-4 md:p-8 font-sans transition-colors">
            <div className="max-w-6xl w-full bg-white dark:bg-navy-light sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px] border border-slate-100 dark:border-slate-800 transition-colors">

                {/* Left Side - Promotional */}
                <div className="hidden lg:flex lg:w-5/12 bg-navy relative overflow-hidden">
                    <img
                        src={illustration}
                        alt="Workspace"
                        className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale-[30%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/70 to-primary/40"></div>

                    <div className="relative z-10 p-12 flex flex-col h-full animate-in fade-in duration-1000">
                        <div className="flex items-center space-x-2 mb-auto">
                            <div className="bg-primary p-2.5 rounded-xl shadow-lg">
                                <Terminal className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black text-white tracking-tight">JOB TRAIL SIMULATOR</span>
                        </div>

                        <div className="mt-auto">
                            <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-6">
                                Experience your future career today.
                            </h1>
                            <p className="text-lg text-slate-300 font-medium max-w-sm mb-12 leading-relaxed">
                                Join thousands of students simulating real-world IT job roles and building professional portfolios.
                            </p>

                            {/* Simple Slider Dots indicator */}
                            <div className="flex space-x-3">
                                <div className="h-1.5 w-10 bg-primary rounded-full"></div>
                                <div className="h-1.5 w-2 bg-white/30 rounded-full"></div>
                                <div className="h-1.5 w-2 bg-white/30 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-navy-light relative">
                    {/* Header for Mobile */}
                    <div className="lg:hidden flex justify-between items-center mb-10">
                        <div className="flex items-center space-x-2">
                            <div className="bg-primary p-1.5 rounded-lg shadow-sm">
                                <Terminal className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold text-navy dark:text-white">JTS</span>
                        </div>
                        <Link to="/login" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Sign In</Link>
                    </div>

                    <div className="mb-8 sm:mb-10 text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-black text-navy dark:text-white mb-3">Create account</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Get started with your first career simulation.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 dark:bg-red-900/10 dark:border-red-900/20 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                            <p className="text-sm font-bold text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    <form className="space-y-5 sm:space-y-6 flex-1" onSubmit={handleSignup}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                            {/* Email Address */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-navy dark:text-slate-400 ml-1">Email Address</label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        placeholder="student@university.edu"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-4 pr-10 py-3.5 bg-slate-50 dark:bg-navy border-2 border-transparent focus:border-primary/30 dark:focus:border-primary/30 rounded-2xl outline-none transition-all placeholder:text-slate-400 font-bold text-navy dark:text-white"
                                        required
                                    />
                                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                </div>
                            </div>

                            {/* Username */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-navy dark:text-slate-400 ml-1">Username</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="johndoe123"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-4 pr-10 py-3.5 bg-slate-50 dark:bg-navy border-2 border-transparent focus:border-primary/30 dark:focus:border-primary/30 rounded-2xl outline-none transition-all placeholder:text-slate-400 font-bold text-navy dark:text-white"
                                        required
                                    />
                                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                </div>
                            </div>

                            {/* Date of Birth */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-navy dark:text-slate-400 ml-1">Date of Birth</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="mm/dd/yyyy"
                                        className="w-full pl-4 pr-10 py-3.5 bg-slate-50 dark:bg-navy border-2 border-transparent focus:border-primary/30 dark:focus:border-primary/30 rounded-2xl outline-none transition-all placeholder:text-slate-400 font-bold text-navy dark:text-white"
                                        onFocus={(e) => (e.target.type = 'date')}
                                        onBlur={(e) => (e.target.type = 'text')}
                                        required
                                    />
                                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                </div>
                            </div>

                            {/* Education Status */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-navy dark:text-slate-400 ml-1">Education Status</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-4 py-3.5 bg-slate-50 dark:bg-navy border-2 border-transparent focus:border-primary/30 dark:focus:border-primary/30 rounded-2xl outline-none transition-all font-bold text-navy dark:text-white appearance-none"
                                        value={education}
                                        onChange={(e) => setEducation(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled className="dark:bg-navy text-slate-400">Select status</option>
                                        <option value="student" className="dark:bg-navy text-navy dark:text-white">Current Student</option>
                                        <option value="graduate" className="dark:bg-navy text-navy dark:text-white">Recent Graduate</option>
                                        <option value="professional" className="dark:bg-navy text-navy dark:text-white">Working Professional</option>
                                    </select>
                                    <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-navy dark:text-slate-400 ml-1">Password</label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Min. 8 chars"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-4 pr-12 py-3.5 bg-slate-50 dark:bg-navy border-2 border-transparent focus:border-primary/30 dark:focus:border-primary/30 rounded-2xl outline-none transition-all placeholder:text-slate-400 font-bold text-navy dark:text-white"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy dark:hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-navy dark:text-slate-400 ml-1">Confirm Password</label>
                                <div className="relative group">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Re-enter password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-4 pr-12 py-3.5 bg-slate-50 dark:bg-navy border-2 border-transparent focus:border-primary/30 dark:focus:border-primary/30 rounded-2xl outline-none transition-all placeholder:text-slate-400 font-bold text-navy dark:text-white"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy dark:hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3 mt-4 ml-1">
                            <input type="checkbox" id="terms" className="mt-1 w-5 h-5 border-slate-300 dark:border-slate-700 bg-transparent rounded text-primary focus:ring-primary transition-all cursor-pointer" required />
                            <label htmlFor="terms" className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-300 leading-snug">
                                I agree to the <button type="button" onClick={() => setShowTerms(true)} className="text-primary font-bold hover:underline">Terms of Service</button> and <button type="button" onClick={() => setShowPrivacy(true)} className="text-primary font-bold hover:underline">Privacy Policy</button>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 sm:py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-3 disabled:opacity-70 group relative overflow-hidden"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <span>Create Account</span>
                            )}
                            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 dark:text-slate-300 font-medium">
                            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log In</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Links */}
            <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">
                <a href="#" className="hover:text-primary transition-colors">About</a>
                <a href="#" className="hover:text-primary transition-colors">Support</a>
                <button onClick={() => setShowPrivacy(true)} className="hover:text-primary transition-colors uppercase tracking-widest font-bold">Privacy</button>
                <a href="#" className="hover:text-primary transition-colors">Help</a>
            </div>

            <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
            <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
        </div>
    );
};

export default SignupPage;
