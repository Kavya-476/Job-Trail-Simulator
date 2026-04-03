import React from 'react';
import { CheckCircle, ArrowRight, RotateCcw, Award, XCircle, ExternalLink } from 'lucide-react';

const TaskFeedback = ({ onNext, onRetry, score = 100, feedback, isLastTask = false }) => {
    let parsedFeedback = null;
    let feedbackText = feedback;

    try {
        if (typeof feedback === 'string' && (feedback.startsWith('{') || feedback.startsWith('['))) {
            parsedFeedback = JSON.parse(feedback);
            feedbackText = parsedFeedback.feedback || feedback;
        } else if (typeof feedback === 'object') {
            parsedFeedback = feedback;
            feedbackText = parsedFeedback.feedback || "Feedback available.";
        }
    } catch (e) {
        console.error("Failed to parse feedback JSON", e);
    }

    const detailedFeedback = parsedFeedback?.detailed_feedback || [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#1E293B] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform scale-100 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Task Review</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">AI Assessment Report</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-full font-bold text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed</span>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
                    {/* Score Section */}
                    <div className="flex items-start gap-8">
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
                                    className={score >= 70 ? "text-green-500" : "text-amber-500"}
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

                        <div className="space-y-2 flex-grow">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {score >= 90 ? "Excellent Performance!" : score >= 70 ? "Good Job!" : "Needs Improvement"}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feedbackText || "Evaluation complete."}
                            </p>
                        </div>
                    </div>

                    {/* Detailed Feedback */}
                    {detailedFeedback.length > 0 && (
                        <div className="space-y-4 border-t border-slate-100 dark:border-slate-700 pt-6">
                            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Detailed Analysis</h4>
                            <div className="grid gap-3">
                                {detailedFeedback.map((item, idx) => (
                                    <div key={idx} className={`p-3 rounded-lg border flex items-start gap-3 ${item.type === 'strength' ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30' : 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30'}`}>
                                        {item.type === 'strength' ? (
                                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                                        ) : (
                                            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                        )}
                                        <div>
                                            <h5 className={`text-xs font-bold uppercase tracking-wide mb-1 ${item.type === 'strength' ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                                                {item.type === 'strength' ? 'Core Strength' : 'Improvement Needed'}
                                            </h5>
                                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}



                    {/* Recommended Learning Path */}
                    {parsedFeedback?.course_recommendations?.length > 0 && (
                        <div className="space-y-4 border-t border-slate-100 dark:border-slate-700 pt-6">
                            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Recommended Learning Path</h4>
                            <div className="grid gap-4">
                                {parsedFeedback.course_recommendations.map((course, idx) => (
                                    <div key={idx} className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl p-5 hover:border-blue-500/40 transition-all group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h5 className="font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                                    {course.title}
                                                </h5>
                                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest italic">
                                                    {course.provider}
                                                </span>
                                            </div>
                                            <div className="p-1.5 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                                                <ExternalLink className="w-4 h-4 text-blue-600" />
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                            &quot;{course.justification}&quot;
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


                {/* Footer / Actions */}
                <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
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
        </div >
    );
};

export default TaskFeedback;
