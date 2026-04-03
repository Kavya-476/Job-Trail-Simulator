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
import { taskTests } from '../../data/taskTests';

const DevSimulation = ({ currentTask, tasks, currentTaskIndex, handleNext, code, setCode, showHint, setShowHint, level, isSubmitting }) => {
    const normalizedLevel = level ? level.charAt(0).toUpperCase() + level.slice(1).toLowerCase() : 'Beginner';
    const [timeLeft, setTimeLeft] = useState(currentTask.time_limit || 1500);
    const [explanation, setExplanation] = useState('');
    const [terminalLogs, setTerminalLogs] = useState([
        { time: '14:22:01', type: 'System', text: 'Compiler environment ready (v18.12.0)' }
    ]);
    const [isRunning, setIsRunning] = useState(false);
    const [activeView, setActiveView] = useState('problem'); // 'problem', 'explorer', 'history', 'settings'
    const [editorFontSize, setEditorFontSize] = useState(14);
    const [activeFile, setActiveFile] = useState('index.js');

    const mockFiles = {
        'package.json': JSON.stringify({
            "name": "simulation-project",
            "version": "1.0.0",
            "description": "DevTrial Simulation Environment",
            "main": "index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            "author": "JTS user",
            "license": "ISC"
        }, null, 2),
        'README.md': `# DevTrial Simulation

Welcome to the development environment. 
Follow the instructions in the "Problem" tab to complete your task.

## Getting Started
1. Read the requirements.
2. Edit \`index.js\`.
3. Click "Run Code" to test your solution.
`
    };

    const handleRunCode = () => {
        setIsRunning(true);
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newLogs = [...terminalLogs, {
            time: timestamp,
            type: 'Action',
            text: 'Executing current buffer...'
        }];
        setTerminalLogs(newLogs);

        setTimeout(() => {
            const test = taskTests[currentTask.id];
            let resultLogs = [];

            if (test) {
                // Run the specific test for this task
                // We use the current code in the editor, or fallback to initial if empty (though state should handle this)
                const codeToRun = code || currentTask.initial_code || '';
                const result = test(codeToRun);

                // Format logs from the test result
                resultLogs = result.logs.map(log => ({
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    type: log.type,
                    text: log.text
                }));
            } else {
                // Fallback validation or success for tasks without specific tests
                resultLogs = [{
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    type: 'System',
                    text: 'Execution finished. (No specific validation tests defined for this task specific ID)'
                }];
            }

            setIsRunning(false);
            setTerminalLogs(prev => [...prev, ...resultLogs]);
        }, 800);
    };

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
                                onClick={() => {
                                    const test = taskTests[currentTask.id];
                                    let passed = false;
                                    let feedback = "";

                                    if (test) {
                                        const result = test(code || currentTask.initial_code || '');
                                        passed = result.success;
                                        // Generate simple feedback from the last log if available
                                        const lastLog = result.logs[result.logs.length - 1];
                                        feedback = lastLog ? lastLog.text : (passed ? "All tests passed!" : "Tests failed.");
                                    } else {
                                        // If no test defined, assume manual verification or pass for now
                                        passed = true;
                                        feedback = "Submission received (Manual verification).";
                                    }

                                    // Pass the result to the parent handler
                                    handleNext({ passed, feedback });
                                }}
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-blue-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-600/20 flex items-center gap-3 hover:bg-blue-500 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <LogOut className="w-4 h-4 -rotate-90" />
                                )}
                                {isSubmitting ? 'Submitting...' : 'Submit Explanation'}
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
                        <span className="text-white font-bold text-sm tracking-tight">JOB TRAIL SIMULATOR</span>
                    </div>

                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 rounded-full border border-slate-700/50">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            {normalizedLevel === 'Professional' ? 'Level 3' : normalizedLevel === 'Intermediate' ? 'Level 2' : 'Level 1'}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Task {currentTask.number || 1}: {currentTask.title}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isRunning ? (
                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Play className="w-3 h-3 fill-current" />
                        )}
                        {isRunning ? 'Running...' : 'Run Code'}
                    </button>
                    <button
                        onClick={() => {
                            const test = taskTests[currentTask.id];
                            let passed = false;
                            let feedback = "";

                            if (test) {
                                // Run the test silently to check status
                                const result = test(code || currentTask.initial_code || '');
                                passed = result.success;
                                const lastLog = result.logs[result.logs.length - 1];
                                feedback = lastLog ? lastLog.text : (passed ? "Tests passed." : "Tests failed.");
                            } else {
                                passed = true; // Fallback
                                feedback = "Submitted for review.";
                            }

                            handleNext({ passed, feedback });
                        }}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <CheckCircle className="w-4 h-4" />
                        )}
                        <span>{isSubmitting ? 'Submitting...' : 'Submit Fix'}</span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600 cursor-pointer hover:bg-slate-600 transition-colors" title="User Profile">
                        <User className="w-4 h-4 text-slate-300" />
                    </div>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">
                {/* Left Mini Sidebar */}
                <nav className="w-16 bg-[#0F172A] border-r border-slate-800 flex flex-col items-center py-6 shrink-0">
                    <div className="flex flex-col items-center gap-8 w-full">
                        <button
                            onClick={() => setActiveView('problem')}
                            className={`relative group p-3 transition-colors ${activeView === 'problem' ? 'text-blue-500' : 'text-slate-500 hover:text-white'}`}
                        >
                            <FileText className="w-6 h-6" />
                            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">Problem</div>
                        </button>
                        <button
                            onClick={() => setActiveView('explorer')}
                            className={`relative group p-3 transition-colors ${activeView === 'explorer' ? 'text-blue-500' : 'text-slate-500 hover:text-white'}`}
                        >
                            <Folder className="w-6 h-6" />
                            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">Files</div>
                        </button>
                        <button
                            onClick={() => setActiveView('history')}
                            className={`relative group p-3 transition-colors ${activeView === 'history' ? 'text-blue-500' : 'text-slate-500 hover:text-white'}`}
                        >
                            <History className="w-6 h-6" />
                            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">Run History</div>
                        </button>
                    </div>

                    <div className="mt-auto flex flex-col items-center gap-8 w-full pb-6">
                        <button
                            onClick={() => setActiveView('settings')}
                            className={`p-3 transition-colors ${activeView === 'settings' ? 'text-blue-500' : 'text-slate-500 hover:text-white'}`}
                        >
                            <Settings className="w-6 h-6" />
                        </button>
                    </div>
                </nav>

                {/* Instructions / Sidebar Panel */}
                <aside className="w-1/3 min-w-[380px] bg-[#0F172A] border-r border-slate-800 flex flex-col overflow-hidden">
                    {activeView === 'problem' && (
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
                    )}

                    {activeView === 'explorer' && (
                        <div className="flex-grow p-8 text-slate-400">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Project Files</h3>
                            <div className="space-y-2">
                                <div
                                    onClick={() => setActiveFile('index.js')}
                                    className={`flex items-center gap-2 p-2 rounded cursor-pointer ${activeFile === 'index.js' ? 'text-blue-400 bg-blue-500/10' : 'hover:text-slate-200 hover:bg-slate-800/50'}`}
                                >
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm font-bold">index.js</span>
                                </div>
                                <div
                                    onClick={() => setActiveFile('package.json')}
                                    className={`flex items-center gap-2 p-2 rounded cursor-pointer ${activeFile === 'package.json' ? 'text-blue-400 bg-blue-500/10' : 'hover:text-slate-200 hover:bg-slate-800/50'}`}
                                >
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm">package.json</span>
                                </div>
                                <div
                                    onClick={() => setActiveFile('README.md')}
                                    className={`flex items-center gap-2 p-2 rounded cursor-pointer ${activeFile === 'README.md' ? 'text-blue-400 bg-blue-500/10' : 'hover:text-slate-200 hover:bg-slate-800/50'}`}
                                >
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm">README.md</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeView === 'history' && (
                        <div className="flex-grow p-8 text-slate-400">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Execution History</h3>
                            <div className="space-y-4">
                                {terminalLogs.filter(l => l.type !== 'Action').length > 0 ? (
                                    terminalLogs.filter(l => l.type !== 'Action').reverse().map((log, i) => (
                                        <div key={i} className="p-3 bg-slate-800/50 rounded border border-slate-700/50 text-xs font-mono">
                                            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                                <span>{log.time}</span>
                                                <span className={log.type === 'Failed' ? 'text-red-400' : 'text-green-400'}>{log.type}</span>
                                            </div>
                                            <div>{log.text}</div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs italic opacity-50">No execution history yet.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeView === 'settings' && (
                        <div className="flex-grow p-8 text-slate-400">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Editor Settings</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Font Size ({editorFontSize}px)</label>
                                    <input
                                        type="range"
                                        min="12"
                                        max="24"
                                        value={editorFontSize}
                                        onChange={(e) => setEditorFontSize(parseInt(e.target.value))}
                                        className="w-full accent-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Theme</label>
                                    <select className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm">
                                        <option>Night Owl</option>
                                        <option>Dracula</option>
                                        <option>Monokai</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

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
                                {activeFile}
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <span>UTF-8</span>
                            <span>{activeFile.endsWith('.js') ? 'JavaScript' : activeFile.endsWith('.json') ? 'JSON' : 'Markdown'}</span>
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
                            className="flex-grow bg-transparent text-blue-400 p-4 font-mono resize-none focus:outline-none leading-6 custom-scrollbar"
                            style={{ fontSize: `${editorFontSize}px` }}
                            value={activeFile === 'index.js' ? (code || currentTask.code_snippet || '') : mockFiles[activeFile]}
                            onChange={(e) => activeFile === 'index.js' ? setCode(e.target.value) : null}
                            readOnly={activeFile !== 'index.js'}
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
                            {terminalLogs.map((log, i) => (
                                <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <span className="text-slate-600">[{log.time}]</span>
                                    <span className={`${log.type === 'System' ? 'text-blue-400' : log.type === 'Failed' ? 'text-rose-500' : 'text-emerald-400'} font-bold uppercase tracking-wider`}>{log.type}:</span>
                                    <span className="text-slate-400">{log.text}</span>
                                </div>
                            ))}
                            {isRunning && (
                                <div className="text-blue-400 animate-pulse font-black text-base leading-none">_</div>
                            )}
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
        </div >
    );
};

export default DevSimulation;
