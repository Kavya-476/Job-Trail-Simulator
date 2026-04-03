import React from 'react';
import { X, Shield, Lock, Eye } from 'lucide-react';

const PrivacyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-navy-light w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100 dark:border-slate-800 transition-all scale-in-center animate-in zoom-in duration-300">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-navy/30">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-black text-navy dark:text-white uppercase tracking-tight">Privacy Policy</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-navy rounded-full transition-colors text-slate-400 hover:text-navy dark:hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar">
                    <div className="space-y-8 text-slate-600 dark:text-slate-300 font-medium">
                        <section>
                            <h3 className="text-lg font-black text-navy dark:text-white mb-3 flex items-center gap-2">
                                <span className="text-primary tracking-widest text-xs">01</span> Information Collection
                            </h3>
                            <p className="leading-relaxed">
                                We collect information you provide directly to us during sign-up, including email, name, and education status. We also track simulation progress, task submissions, and performance metrics.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-black text-navy dark:text-white mb-3 flex items-center gap-2">
                                <span className="text-primary tracking-widest text-xs">02</span> Usage of Information
                            </h3>
                            <p className="leading-relaxed">
                                Your data is used to provide personalized feedback, track your learning journey, and improve our simulation engine. We do not sell your personal data to third parties.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-black text-navy dark:text-white mb-3 flex items-center gap-2">
                                <span className="text-primary tracking-widest text-xs">03</span> Data Protection
                            </h3>
                            <p className="leading-relaxed">
                                We implement industry-standard security measures to protect your information. Your password is encrypted and never stored in plain text.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-black text-navy dark:text-white mb-3 flex items-center gap-2">
                                <span className="text-primary tracking-widest text-xs">04</span> Your Rights
                            </h3>
                            <p className="leading-relaxed">
                                You have the right to access, update, or delete your account information at any time through your profile settings or by contacting our support team.
                            </p>
                        </section>

                        <section className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-sm italic">
                                Last Updated: March 2026. For privacy concerns, contact support@jobtrailsimulator.com
                            </p>
                        </section>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-navy/30 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-primary text-white font-black rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 active:scale-95 text-sm uppercase tracking-widest"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;
