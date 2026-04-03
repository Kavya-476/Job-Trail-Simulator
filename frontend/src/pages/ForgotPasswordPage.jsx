import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Mail, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/api';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await authService.forgotPassword(email);
            setIsSubmitted(true);
        } catch (err) {
            setError(err.response?.data?.detail || 'Something went wrong. Please try again.');
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
                    <h2 className="text-3xl font-black text-navy dark:text-white mb-2">Reset Password</h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        {isSubmitted
                            ? "Check your email for instructions"
                            : "Enter your email to receive a password reset link"}
                    </p>
                </div>

                {isSubmitted ? (
                    <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/20 p-6 rounded-2xl text-center">
                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="font-bold text-green-900 dark:text-green-400 mb-2">Check Your Email</h3>
                        <p className="text-sm text-green-700 dark:text-green-500/80 mb-6">
                            If <span className="font-bold">{email}</span> is registered, we've sent instructions to reset your password.
                        </p>
                        <Link
                            to="/login"
                            className="inline-flex items-center text-primary font-bold hover:underline"
                        >
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

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

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-70"
                        >
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>

                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 font-bold hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </Link>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
