import React from 'react';
import { X, Shield, Scale, FileText } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-navy-light w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100 dark:border-slate-800 transition-all scale-in-center animate-in zoom-in duration-300">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-navy/30">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <Scale className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-black text-navy dark:text-white uppercase tracking-tight">Terms of Service</h2>
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
                                <span className="text-primary tracking-widest text-xs">01</span> Acceptance of Terms
                            </h3>
                            <p className="leading-relaxed">
                                By accessing and using the Job Trail Simulator platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-black text-navy dark:text-white mb-3 flex items-center gap-2">
                                <span className="text-primary tracking-widest text-xs">02</span> User Conduct
                            </h3>
                            <p className="leading-relaxed">
                                You agree to use the platform only for educational purposes. Any misuse of terminal simulations, automated scraping, or attempts to circumvent security measures is strictly prohibited.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-black text-navy dark:text-white mb-3 flex items-center gap-2">
                                <span className="text-primary tracking-widest text-xs">03</span> Educational Nature
                            </h3>
                            <p className="leading-relaxed">
                                Job Trail Simulator provides a simulated environment. The tasks, feedbacks, and scores provided are for learning purposes and do not guarantee future employment results.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-black text-navy dark:text-white mb-3 flex items-center gap-2">
                                <span className="text-primary tracking-widest text-xs">04</span> Intellectual Property
                            </h3>
                            <p className="leading-relaxed">
                                All simulation content, code tasks, and educational materials are the property of Job Trail Simulator and may not be reproduced without explicit permission.
                            </p>
                        </section>

                        <section className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-sm italic">
                                Last Updated: March 2026. We reserve the right to modify these terms at any time.
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
                        I Understand
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
