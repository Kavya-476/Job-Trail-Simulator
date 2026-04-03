import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_JOBS, MOCK_TASKS } from '../data/mockData';
import {
    FileText,
    Zap,
    History,
    Play,
    CheckCircle,
    Clock,
    ChevronLeft,
    MoreHorizontal,
    LogOut
} from 'lucide-react';

const CodeExplanationPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    // Find task 2 specifically for this simulation
    const job = MOCK_JOBS.find(j => j.id === jobId) || MOCK_JOBS[0];
    const tasks = MOCK_TASKS[job.id] || MOCK_TASKS['job_dev'];
    const currentTask = tasks.find(t => t.id === 't2' || t.number === 2) || tasks[1];

    const [timeLeft, setTimeLeft] = useState(currentTask.time_limit || 600);
    const [explanation, setExplanation] = useState('');
    const [showHint, setShowHint] = useState(false);

    // Timer logic
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return {
            m: m.toString().padStart(2, '0'),
            s: s.toString().padStart(2, '0')
        };
    };

    const time = formatTime(timeLeft);
    const calculatedProgress = 40; // Hardcoded for this specific page as requested

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans overflow-x-hidden">
            <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8">
                {/* Header Card */}
                <div className="bg-white rounded-[32px] p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 hover:bg-slate-50 rounded-full transition-colors -ml-2 text-slate-400 hover:text-slate-600"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">
                                {currentTask.breadcrumbs || `Level 1: Fundamentals / Task 2: Logic Decomposition`}
                            </p>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-[#1E293B]">{currentTask.title}</h1>
                        <p className="text-[#64748B] text-xs md:text-sm max-w-2xl font-medium">{currentTask.subtitle}</p>
                    </div>
                    <div className="w-full md:w-[300px] space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-[#1E293B] tracking-widest">
                            <span>Analysis Progress</span>
                            <span className="text-blue-600">{calculatedProgress}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" style={{ width: `${calculatedProgress}%` }}></div>
                        </div>
                        <p className="text-[9px] font-black text-[#64748B] tracking-[0.3em] uppercase text-right">
                            {currentTask.taskLabel || `Task 2 of 5 in Level 1`}
                        </p>
                    </div>
                </div>

                {/* Main Content: Split Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Code Panel */}
                    <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm flex flex-col min-h-[400px] md:min-h-[550px] group transition-all hover:border-blue-200">
                        <div className="bg-white border-b border-slate-100 px-6 py-5 flex justify-between items-center bg-gradient-to-r from-white to-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <div className="text-blue-600 rotate-45">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </div>
                                </div>
                                <span className="text-sm font-black text-[#1E293B] tracking-tight">{currentTask.fileName || 'tic-tac-toe.js'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                <span className="text-[9px] font-black tracking-widest uppercase text-[#94A3B8]">Secure Environment</span>
                            </div>
                        </div>
                        <div className="flex flex-grow bg-[#F8FAFC]/50">
                            <div className="w-12 py-8 border-r border-slate-100 flex flex-col items-center gap-2 text-[10px] font-mono text-slate-300 select-none bg-white/30">
                                {Array.from({ length: 14 }).map((_, i) => (
                                    <span key={i} className="leading-relaxed">{i + 1}</span>
                                ))}
                            </div>
                            <div className="p-8 font-mono text-sm text-[#334155] leading-relaxed overflow-x-auto whitespace-pre selection:bg-blue-100 selection:text-blue-700 w-full relative">
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                    <Zap className="w-32 h-32" />
                                </div>
                                {currentTask.code_snippet}
                            </div>
                        </div>
                    </div>

                    {/* Explanation Panel */}
                    <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm flex flex-col min-h-[400px] md:min-h-[550px] focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-300 transition-all">
                        <div className="bg-white border-b border-slate-100 px-6 py-5 flex justify-between items-center bg-gradient-to-r from-white to-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                                    <FileText className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-black text-[#1E293B] tracking-tight">Technical Breakdown</span>
                            </div>
                            <div className="flex gap-3">
                                <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                    <span className="text-[#1E293B] font-black text-xs">B</span>
                                </button>
                                <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                    <History className="w-3.5 h-3.5 text-slate-500" />
                                </button>
                            </div>
                        </div>
                        <textarea
                            className="flex-grow p-8 bg-transparent text-slate-700 font-medium text-sm leading-relaxed resize-none focus:outline-none placeholder:text-slate-300 custom-scrollbar"
                            placeholder="Deconstruct the algorithm's functional flow here. Use bullet points for structural clarity..."
                            value={explanation}
                            onChange={(e) => setExplanation(e.target.value)}
                        />
                        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-slate-400 px-8 uppercase tracking-widest">
                            <span>Markdown Supported</span>
                            <span>{explanation.length} characters</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="bg-white rounded-[32px] p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto overflow-x-auto no-scrollbar">
                        <button
                            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${showHint ? 'bg-amber-100 text-amber-700' : 'text-slate-500 hover:bg-slate-50'}`}
                            onClick={() => setShowHint(!showHint)}
                        >
                            <History className={`w-4 h-4 ${showHint ? 'rotate-180' : ''} transition-transform`} />
                            <span className="text-xs md:text-sm font-black uppercase tracking-widest">Hint Architecture</span>
                        </button>
                        <div className="h-6 w-px bg-slate-200 hidden md:block" />
                        <div className="flex items-center gap-2.5 text-slate-800 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-xs md:text-sm font-black font-mono tracking-tighter">
                                {time.m}:{time.s} SYSTEM_LIMIT
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3 md:gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 md:px-8 py-3 bg-white border border-slate-200 text-[#1E293B] font-black text-[11px] rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest">
                            Save Draft
                        </button>
                        <button
                            onClick={() => navigate(`/simulation/${jobId}/feedback`)}
                            className="flex-1 md:flex-none px-6 md:px-8 py-4 bg-blue-600 text-white font-black text-[11px] rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center gap-3 hover:bg-blue-700 transition-all uppercase tracking-[0.2em] relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                            <span className="relative">Submit Final Report</span>
                            <LogOut className="w-3.5 h-3.5 -rotate-90 relative" />
                        </button>
                    </div>
                </div>

                {/* Hint Card */}
                {showHint && (
                    <div className="bg-amber-50 border border-amber-100 rounded-[24px] p-6 flex items-start gap-4 animate-in slide-in-from-bottom-2 duration-300">
                        <Zap className="w-5 h-5 text-amber-500 fill-amber-500/20 shrink-0 mt-1" />
                        <div>
                            <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-1">Architectural Hint</h4>
                            <p className="text-xs text-amber-900/70 font-medium leading-relaxed italic">&quot;{currentTask.hint}&quot;</p>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(226, 232, 240, 1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(203, 213, 225, 1);
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default CodeExplanationPage;
