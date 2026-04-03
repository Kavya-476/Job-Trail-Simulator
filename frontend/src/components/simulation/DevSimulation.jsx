import React, { useState, useEffect } from 'react';
import {
    FileText,
    Folder,
    Zap,
    History,
    Settings,
    LogOut,
    Play,
    CheckCircle,
    Clock,
    Terminal,
    Wifi,
    User,
    ChevronDown,
    MoreHorizontal
} from 'lucide-react';

const DevSimulation = ({ currentTask, tasks, currentTaskIndex, handleNext, code, setCode, showHint, setShowHint }) => {
    const [timeLeft, setTimeLeft] = useState(currentTask.time_limit || 1500);
    const [explanation, setExplanation] = useState('');

    // Timer logic
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return {
            h: h.toString().padStart(2, '0'),
            m: m.toString().padStart(2, '0'),
            s: s.toString().padStart(2, '0')
        };
    };

    const time = formatTime(timeLeft);

    const calculatedProgress = Math.round(((currentTaskIndex + 1) / tasks.length) * 100);

    // Render for Code Explanation Task
    if (currentTask.type === 'code_explanation') {
        return (
            <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans">
                <div className="max-w-[1400px] mx-auto space-y-8">
                    {/* Header Card */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex justify-between items-center">
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                                {currentTask.breadcrumbs || `Level ${currentTask.number}: Fundamentals / Task ${currentTaskIndex + 1}: Logic Decomposition`}
                            </p>
                            <h1 className="text-3xl font-black text-[#1E293B]">{currentTask.title}</h1>
                            <p className="text-[#64748B] text-sm max-w-2xl">{currentTask.subtitle}</p>
                        </div>
                        <div className="w-[300px] space-y-3 text-right">
                            <div className="flex justify-between items-center text-xs font-bold uppercase text-[#1E293B]">
                                <span>Overall Progress</span>
                                <span className="text-blue-600">{calculatedProgress}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${calculatedProgress}%` }}></div>
                            </div>
                            <p className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">
                                {currentTask.taskLabel || `Task ${currentTaskIndex + 1} of ${tasks.length} in Level 1`}
                            </p>
                        </div>
                    </div>

                    {/* Main Content: Split Cards */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Code Panel */}
                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col min-h-[500px]">
                            <div className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="text-blue-600 rotate-45">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-bold text-[#1E293B]">{currentTask.fileName || 'tic-tac-toe.js'}</span>
                                </div>
                                <span className="text-[10px] font-black tracking-widest uppercase text-[#94A3B8]">Read Only</span>
                            </div>
                            <div className="flex flex-grow bg-[#F8FAFC]">
                                <div className="w-12 py-6 border-r border-slate-200 flex flex-col items-center gap-1.5 text-[11px] font-mono text-slate-400 select-none">
                                    {Array.from({ length: 15 }).map((_, i) => (
                                        <span key={i}>{i + 1}</span>
                                    ))}
                                </div>
                                <pre className="p-6 font-mono text-sm text-blue-600 leading-relaxed overflow-x-auto whitespace-pre">
                                    {currentTask.code_snippet}
                                </pre>
                            </div>
                        </div>

                        {/* Explanation Panel */}
                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col min-h-[500px]">
                            <div className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-bold text-[#1E293B]">Your Explanation</span>
                                </div>
                                <div className="flex gap-4">
                                    <button className="text-[#1E293B] font-black text-sm">B</button>
                                    <button className="text-[#1E293B]">
                                        <History className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <textarea
                                className="flex-grow p-8 bg-transparent text-slate-400 font-medium text-sm leading-relaxed resize-none focus:outline-none placeholder:text-slate-200"
                                placeholder="Explain step-by-step how the winning logic is determined... (e.g. 'The function defines a constant array called lines which contains...')"
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-8 pl-4">
                            <button className="flex items-center gap-2.5 text-slate-500 hover:text-[#1E293B] transition-colors" onClick={() => setShowHint(!showHint)}>
                                <History className="w-4 h-4 rotate-180" />
                                <span className="text-sm font-bold">Show Hint</span>
                            </button>
                            <div className="h-6 w-px bg-slate-200" />
                            <div className="flex items-center gap-2.5 text-slate-500">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-bold font-mono">
                                    Time Remaining: {time.m}:{time.s}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="px-8 py-3 bg-slate-50 text-slate-900 font-bold text-sm rounded-2xl hover:bg-slate-100 transition-all">
                                Save Draft
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 bg-blue-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-600/20 flex items-center gap-3 hover:bg-blue-500 transition-all"
                            >
                                Submit Explanation
                                <LogOut className="w-4 h-4 -rotate-90" />
                            </button>
                        </div>
                    </div>

                    {/* Footer Status Badges */}
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2.5 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 fill-green-500/20" />
                            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Code Compiled</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                            <div className="bg-blue-500/20 p-0.5 rounded">
                                <History className="w-3 h-3 text-blue-600" />
                            </div>
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">15 Lines of Code</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
                            <div className="text-orange-500">
                                <Zap className="w-3.5 h-3.5 fill-orange-500/20" />
                            </div>
                            <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Medium Complexity</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-[#0F172A] text-slate-400 font-sans selection:bg-blue-500/30">
            {/* Top Navigation / Breadcrumbs */}
            <header className="h-14 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-black text-xs italic">D</span>
                        </div>
                        <span className="text-white font-bold text-sm tracking-tight">DevTrial Simulator</span>
                    </div>

                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 rounded-full border border-slate-700/50">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Level {currentTask.number || 1}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Task {currentTask.number || 1}: {currentTask.title}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-300">
                        <Play className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-bold">Run Code</span>
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                    >
                        <CheckCircle className="w-4 h-4" />
                        <span>Submit Fix</span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                        <User className="w-4 h-4 text-slate-300" />
                    </div>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">
                {/* Left Mini Sidebar */}
                <nav className="w-16 bg-[#0F172A] border-r border-slate-800 flex flex-col items-center py-6 shrink-0">
                    <div className="flex flex-col items-center gap-8 w-full">
                        <button className="relative group p-3 hover:text-white transition-colors">
                            <FileText className="w-6 h-6 text-blue-500" />
                            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">Explorer</div>
                        </button>
                        <button className="relative group p-3 hover:text-white transition-colors">
                            <Folder className="w-6 h-6" />
                        </button>
                        <button className="relative group p-3 hover:text-white transition-colors">
                            <Zap className="w-6 h-6" />
                        </button>
                        <button className="relative group p-3 hover:text-white transition-colors">
                            <History className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="mt-auto flex flex-col items-center gap-8 w-full pb-6">
                        <button className="p-3 hover:text-white transition-colors">
                            <Settings className="w-6 h-6" />
                        </button>
                        <button className="p-3 hover:text-red-400 transition-colors">
                            <LogOut className="w-6 h-6" />
                        </button>
                    </div>
                </nav>

                {/* Instructions Panel */}
                <aside className="w-1/3 min-w-[380px] bg-[#0F172A] border-r border-slate-800 flex flex-col overflow-hidden">
                    <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-2 py-0.5 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded text-[10px] font-black tracking-widest uppercase">Problem</span>
                            <span className="px-2 py-0.5 bg-orange-600/10 text-orange-400 border border-orange-500/20 rounded text-[10px] font-black tracking-widest uppercase">{currentTask.difficulty || 'Easy'}</span>
                        </div>

                        <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{currentTask.title}</h2>

                        <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
                            <p>{currentTask.description}</p>

                            <div className="space-y-4">
                                <h3 className="text-xs font-black text-white/50 uppercase tracking-widest">Requirements:</h3>
                                <ul className="space-y-3">
                                    {currentTask.requirements ? currentTask.requirements.map((req, i) => (
                                        <li key={i} className="flex gap-3 items-start">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                            <span>{req}</span>
                                        </li>
                                    )) : (
                                        <li className="flex gap-3 items-start">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                            <span>Modify the existing logic in the editor.</span>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {currentTask.test_case && (
                                <div className="space-y-4 pt-4">
                                    <h3 className="text-xs font-black text-white/50 uppercase tracking-widest">Test Case 1</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl space-y-2">
                                            <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Actual Output</span>
                                            <pre className="text-[10px] font-mono text-red-300 whitespace-pre-wrap">{currentTask.test_case.actual}</pre>
                                        </div>
                                        <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl space-y-2">
                                            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Expected Output</span>
                                            <pre className="text-[10px] font-mono text-green-300 whitespace-pre-wrap">{currentTask.test_case.expected}</pre>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timer Footer */}
                    <div className="p-8 border-t border-slate-800 bg-slate-900/10">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Time Remaining</span>
                        <div className="flex gap-2">
                            {[time.h, time.m, time.s].map((unit, i) => (
                                <div key={i} className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
                                    <span className="text-2xl font-black text-white block leading-none mb-2">{unit}</span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{i === 0 ? 'HR' : i === 1 ? 'MIN' : 'SEC'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Editor/Console Workspace */}
                <main className="flex-grow flex flex-col min-w-0 bg-[#0F172A]">
                    {/* Tabs / Editor Header */}
                    <div className="h-10 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
                        <div className="flex items-center h-full">
                            <div className="flex items-center gap-2 h-full px-4 border-r border-slate-800 bg-[#0F172A] text-blue-400 text-[10px] font-black uppercase tracking-widest border-t-2 border-t-blue-500">
                                <Zap className="w-3 h-3" />
                                index.js
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <span>UTF-8</span>
                            <span>JavaScript</span>
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-grow relative flex min-h-0 overflow-hidden">
                        <div className="w-12 bg-[#0F172A] border-r border-slate-800 flex flex-col items-center py-4 text-[11px] font-mono text-slate-600 select-none">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <span key={i} className="h-6 leading-6">{i + 1}</span>
                            ))}
                        </div>
                        <textarea
                            className="flex-grow bg-transparent text-blue-400 p-4 font-mono text-sm resize-none focus:outline-none leading-6 custom-scrollbar"
                            value={code || currentTask.code_snippet || ''}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck="false"
                        />
                    </div>

                    {/* Console / Terminal Panel */}
                    <div className="h-80 bg-[#0F172A] border-t border-slate-800 flex flex-col shrink-0">
                        <div className="h-10 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/20">
                            <div className="flex items-center gap-3">
                                <Terminal className="w-3 h-3 text-slate-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Console Output</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-emerald-500/80">Live Execution</span>
                                </div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                        </div>

                        <div className="flex-grow p-6 font-mono text-[11px] space-y-2 overflow-y-auto custom-scrollbar">
                            <div className="flex gap-3">
                                <span className="text-slate-600">[14:22:01]</span>
                                <span className="text-blue-400 font-bold uppercase tracking-wider">System:</span>
                                <span className="text-slate-400">Compiler environment ready (v18.12.0)</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-slate-600">[14:22:02]</span>
                                <span className="text-blue-400 font-bold uppercase tracking-wider">Action:</span>
                                <span className="text-slate-400">Running test suites...</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-slate-600">[14:22:02]</span>
                                <span className="text-rose-500 font-bold uppercase tracking-wider">Failed:</span>
                                <span className="text-rose-400">Test Case 1 failed. Expected key &quot;status&quot; not found.</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-slate-600">[14:22:02]</span>
                                <span className="text-white">&gt; </span>
                                <span className="text-slate-300">&#123; statusCode: 200, data: [], timestamp: 1715421200 &#125;</span>
                            </div>
                            <div className="text-blue-400 animate-pulse font-black text-base leading-none">_</div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Status Bar */}
            <footer className="h-8 bg-blue-600 text-white flex items-center justify-between px-4 shrink-0 text-[10px] font-black uppercase tracking-widest">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="opacity-70">Connected</span>
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wifi className="w-3 h-3" />
                        <span className="opacity-70">Latency: 14ms</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <span className="opacity-70">Line 10, Col 24</span>
                    <span className="opacity-70">Ln 10, Char 24</span>
                </div>
            </footer>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1E293B;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #334155;
                }
            `}</style>
        </div>
    );
};

export default DevSimulation;
