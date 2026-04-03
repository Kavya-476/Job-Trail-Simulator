import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Github, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { authService } from '../services/api';
import illustration from '../assets/auth-illustration.png';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('password');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await authService.login(email, password, rememberMe);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.detail || 'Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (type) => {
        if (type === 'google') return; // Handled by GSI
        setIsLoading(true);
        setError('');
        try {
            if (type === 'linkedin') {
                await authService.linkedinLogin();
            }
            navigate('/dashboard');
        } catch (err) {
            setError(`Failed to sign in with ${type}.`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleResponse = async (response) => {
        setIsLoading(true);
        setError('');
        try {
            await authService.googleLogin(response.credential);
            navigate('/dashboard');
        } catch (err) {
            console.error('Google login error:', err);
            setError('Failed to sign in with Google. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        const initializeGoogle = () => {
            if (window.google) {
                google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: handleGoogleResponse
                });
                google.accounts.id.renderButton(
                    document.getElementById("google-button-container"),
                    {
                        theme: "outline",
                        size: "large",
                        width: containerWidth > 0 ? containerWidth : 400,
                        text: "continue_with",
                        shape: "pill",
                        logo_alignment: "left"
                    }
                );
            }
        };

        const container = document.getElementById("google-button-container");
        const containerWidth = container?.offsetWidth;

        if (window.google) {
            initializeGoogle();
        } else {
            const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
            if (script) {
                script.onload = initializeGoogle;
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-navy flex flex-col md:flex-row transition-colors">
            {/* Header for Mobile */}
            <div className="md:hidden p-4 sm:p-6 flex items-center justify-between border-b dark:border-slate-800 bg-white dark:bg-navy">
                <div className="flex items-center space-x-2">
                    <div className="bg-primary p-1.5 rounded-lg shadow-sm">
                        <Terminal className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-navy dark:text-white">JTS</span>
                </div>
                <Link to="/signup" className="text-xs sm:text-sm font-bold text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-primary hover:bg-primary/5 transition-all">
                    Sign Up
                </Link>
            </div>

            {/* Left Side - Image & Testimonial */}
            <div className="hidden md:flex md:w-1/2 relative min-h-screen bg-slate-100 dark:bg-slate-900 overflow-hidden">
                <img
                    src={illustration}
                    alt="Workplace"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-navy/40 dark:bg-navy/60"></div>

                {/* Logo */}
                <div className="absolute top-8 left-8 flex items-center space-x-2 z-20">
                    <div className="bg-primary p-2.5 rounded-xl shadow-xl">
                        <Terminal className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight">JOB TRAIL SIMULATOR</span>
                </div>

                {/* Glassmorphism Testimonial */}
                <div className="absolute bottom-12 left-12 right-12 z-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
                        <p className="text-xl lg:text-2xl font-bold text-white leading-snug mb-8 relative z-10 italic">
                            &quot;JOB TRAIL SIMULATOR helped me bridge the gap between theory and practice. I landed my first DevOps role within 3 months!&quot;
                        </p>
                        <div className="flex items-center space-x-4 relative z-10">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                                alt="Sarah Jenkins"
                                className="w-12 h-12 rounded-full border-2 border-white/50 bg-slate-200"
                            />
                            <div>
                                <div className="font-bold text-white tracking-wide">Sarah Jenkins</div>
                                <div className="text-white/70 text-sm font-medium">Junior DevOps Engineer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24 py-8 sm:py-12 bg-white dark:bg-navy relative">
                {/* Header for Desktop */}
                <div className="hidden md:flex justify-end absolute top-8 right-12 space-x-4 items-center animate-in fade-in duration-700">
                    <div className="text-sm text-slate-500 dark:text-slate-300 font-medium tracking-tight">Don&apos;t have an account?</div>
                    <Link to="/signup" className="text-sm font-black text-primary px-5 py-2.5 rounded-xl border-2 border-primary hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-sm">
                        Sign Up
                    </Link>
                </div>

                <div className="max-w-md w-full mx-auto animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl font-black text-navy dark:text-white mb-3">Welcome back</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Continue your journey into IT career exploration.</p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm animate-in fade-in zoom-in-95 duration-300">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Social Logins */}
                    <div className="mb-8">
                        <div
                            id="google-button-container"
                            className="flex justify-center w-full min-h-[50px] transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
                        ></div>

                        {/* LinkedIn logic remains intact but hidden from UI per request */}
                        {false && (
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('linkedin')}
                                className="flex items-center justify-center space-x-2 py-3 border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-navy-light transition-all font-bold text-navy dark:text-slate-200 active:scale-95 h-[50px]"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="w-5 h-5" alt="LinkedIn" />
                                <span className="text-sm">LinkedIn</span>
                            </button>
                        )}
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-white dark:bg-navy text-slate-400 font-black uppercase tracking-widest transition-colors">Or continue with mail</span>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-navy dark:text-slate-300 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-navy-light border-2 border-transparent focus:border-primary/30 dark:focus:border-primary/50 rounded-2xl outline-none transition-all placeholder:text-slate-400 font-bold text-navy dark:text-white"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-black text-navy dark:text-slate-300 uppercase tracking-widest">Password</label>
                                <Link to="/forgot-password" size="sm" className="text-xs font-black text-primary hover:underline uppercase tracking-tighter">Forgot Password?</Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors">
                                    <Eye className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-navy-light border-2 border-transparent focus:border-primary/30 dark:focus:border-primary/50 rounded-2xl outline-none transition-all placeholder:text-slate-400 font-bold text-navy dark:text-white"
                                    placeholder="••••••••"
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

                        <div className="flex items-center justify-between ml-1">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-primary focus:ring-primary border-slate-300 dark:border-slate-700 bg-transparent rounded transition-all cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-xs font-bold text-slate-500 dark:text-slate-300 cursor-pointer">
                                    Keep me logged in
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 sm:py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden relative`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign in to Dashboard</span>
                                </>
                            )}
                            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        </button>
                    </form>

                    <div className="mt-8 text-center md:hidden">
                        <p className="text-slate-500 dark:text-slate-300 text-sm font-medium">
                            Don&apos;t have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
