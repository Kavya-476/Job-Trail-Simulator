import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Terminal, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/api';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const queryParams = new URLSearchParams(location.search);
    const email = location.state?.email || queryParams.get('email') || '';

    const handleReset = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        const token = queryParams.get('token');

        if (!token) {
            setError('Invalid reset link. Please request a new one.');
            return;
        }

        setIsLoading(true);

        try {
            await authService.resetPassword(email, token, password);
            setIsSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to reset password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-navy flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary p-2.5 rounded-xl shadow-xl">
                            <Terminal className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-navy dark:text-white mb-2">New Password</h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        Create a strong password to secure your account
                    </p>
                </div>

                {isSuccess ? (
                    <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/20 p-6 rounded-2xl text-center">
                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="font-bold text-green-900 dark:text-green-400 mb-2">Password Reset Successful!</h3>
                        <p className="text-sm text-green-700 dark:text-green-500/80">
                            Redirecting you to login page...
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleReset} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-xs font-black text-navy dark:text-slate-300 uppercase tracking-widest ml-1 text-primary">
                                Resetting for: {email || 'Email not found'}
                            </label>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-black text-navy dark:text-slate-300 uppercase tracking-widest ml-1">New Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
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

                        <div className="space-y-2">
                            <label className="block text-xs font-black text-navy dark:text-slate-300 uppercase tracking-widest ml-1">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-navy-light border-2 border-transparent focus:border-primary/30 dark:focus:border-primary/50 rounded-2xl outline-none transition-all placeholder:text-slate-400 font-bold text-navy dark:text-white"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-70"
                        >
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
