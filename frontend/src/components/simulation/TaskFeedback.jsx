import React from 'react';
import { CheckCircle, ArrowRight, RotateCcw, Award, XCircle } from 'lucide-react';

const TaskFeedback = ({ onNext, onRetry, score = 100, feedback, isLastTask = false }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#1E293B] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform scale-100 animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Task Review</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Assessment Report</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-full font-bold text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed</span>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8 space-y-8">
                    {/* Score Section */}
                    <div className="flex items-center gap-8">
                        <div className="relative w-24 h-24 flex-shrink-0">
                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                <path
                                    className="text-slate-100 dark:text-slate-700"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                />
                                <path
                                    className="text-blue-600"
                                    strokeDasharray={`${score}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                                <span className="text-2xl font-black text-slate-900 dark:text-white">{score}</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Score</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Excellent Performance!</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feedback || "You've successfully completed the task objectives. Your solution demonstrates a solid understanding of the core concepts."}
                            </p>
                        </div>
                    </div>

                    {/* Metrics/Details (Mocked Generic) */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-center space-y-1">
                            <div className="text-blue-600 font-bold text-lg">100%</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accuracy</div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-center space-y-1">
                            <div className="text-emerald-600 font-bold text-lg">Optimal</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-center space-y-1">
                            <div className="text-purple-600 font-bold text-lg">Clean</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Code Style</div>
                        </div>
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <button
                        onClick={onRetry}
                        className="text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-2 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Retry Task
                    </button>

                    <button
                        onClick={onNext}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                    >
                        <span>{isLastTask ? 'View Final Results' : 'Next Task'}</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskFeedback;
