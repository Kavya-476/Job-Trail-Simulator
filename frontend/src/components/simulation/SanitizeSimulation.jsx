import React, { useState, useEffect } from 'react';
import {
    Terminal,
    Play,
    Settings,
    ChevronDown,
    Zap,
    Layout,
    Database,
    Server,
    Shield,
    AlertTriangle,
    CheckCircle,
    XCircle,
    XCircle,
    RotateCcw
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskFeedback from './TaskFeedback';

const SanitizeSimulation = () => {
    const navigate = useNavigate();
    const { jobId, level } = useParams();
    const [showFeedback, setShowFeedback] = useState(false);
    const [code, setCode] = useState(`from flask import request, jsonify
import sqlite3

@app.route('/api/login', methods=['POST'])
def login_handler():
    data = request.json
    email = data.get('email')
    pwd = data.get('password')

    # UNSAFE: String formatting allows SQL injection
    query = f"SELECT * FROM users WHERE email='{email}' AND pass='{pwd}'"
    cursor.execute(query) # CRASH HERE
    user = cursor.fetchone()

    if user:
        return jsonify({"status": "success"})
    return jsonify({"status": "fail"}), 401`);

    const [email, setEmail] = useState("admin'--");
    const [password, setPassword] = useState("..........");
    const [activeTab, setActiveTab] = useState('auth_handler.py');
    const [isRunning, setIsRunning] = useState(false);

    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans flex flex-col">
            {/* Top Navigation Bar */}
            <header className="h-14 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-600/20 p-1.5 rounded-lg border border-blue-500/30">
                        <Terminal className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-white tracking-tight">Level 1, Task 3: Form Debugging</h1>
                        <p className="text-[10px] text-slate-500 font-medium">Task: Identify and fix the SQL injection vulnerability in the login handler.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Progress</span>
                        <span className="text-xs font-bold text-white">33% Complete</span>
                    </div>
                    <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-blue-600 rounded-full"></div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-grow flex p-6 gap-6 overflow-hidden">

                {/* Left Panel: Live Preview */}
                <div className="w-1/2 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-white">Live Preview: Login Form</h2>
                        <span className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            Live
                        </span>
                    </div>

                    <div className="flex-grow bg-[#1E293B] rounded-2xl border border-slate-800 p-8 flex flex-col relative shadow-xl">
                        {/* Browser Window Controls Mock */}
                        <div className="absolute top-4 right-4 flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                        </div>

                        <div className="my-auto max-w-sm mx-auto w-full space-y-8">
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold text-white">Welcome back</h3>
                                <p className="text-slate-500 text-sm">Test the form resilience below</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono"
                                    />
                                </div>
                                <button
                                    onClick={() => setShowFeedback(true)}
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    <span>Sign In</span>
                                    <ChevronDown className="w-4 h-4 -rotate-90" />
                                </button>
                            </div>
                            <p className="text-center text-[10px] text-slate-600 font-medium">Environment: Sandboxed Trial v1.0.4</p>
                        </div>
                    </div>

                    {/* Crash Details Panel */}
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex justify-between items-start gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-red-400">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-xs font-black uppercase tracking-widest">Crash Details</span>
                            </div>
                            <p className="text-xs font-mono text-red-300/80 leading-relaxed">
                                CRITICAL: Internal Server Error 500 - Unhandled character exception at line 12. Input sanitization failed for character <span className="bg-red-500/20 px-1 rounded text-white">'</span>
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg shadow-lg shadow-red-500/20 transition-colors whitespace-nowrap">
                            View Logs
                        </button>
                    </div>
                </div>

                {/* Right Panel: Code Editor */}
                <div className="w-1/2 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-white">Backend: auth_handler.py</h2>
                        <div className="flex gap-2 text-slate-500">
                            <Layout className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                            <Settings className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <div className="flex-grow bg-[#1E293B] rounded-2xl border border-slate-800 flex flex-col overflow-hidden shadow-xl">
                        {/* Tabs */}
                        <div className="flex border-b border-slate-800 bg-[#0F172A]/50">
                            <button
                                className={`px-4 py-2.5 text-xs font-bold border-t-2 border-r border-slate-800 ${activeTab === 'auth_handler.py' ? 'bg-[#1E293B] text-blue-400 border-t-blue-500' : 'text-slate-500 border-t-transparent hover:bg-[#1E293B]/50'}`}
                                onClick={() => setActiveTab('auth_handler.py')}
                            >
                                <div className="flex items-center gap-2">
                                    <Server className="w-3 h-3" />
                                    auth_handler.py
                                </div>
                            </button>
                            <button
                                className={`px-4 py-2.5 text-xs font-bold border-t-2 border-r border-slate-800 ${activeTab === 'models.py' ? 'bg-[#1E293B] text-blue-400 border-t-blue-500' : 'text-slate-500 border-t-transparent hover:bg-[#1E293B]/50'}`}
                                onClick={() => setActiveTab('models.py')}
                            >
                                <div className="flex items-center gap-2">
                                    <Database className="w-3 h-3" />
                                    models.py
                                </div>
                            </button>
                        </div>

                        {/* Editor */}
                        <div className="flex-grow relative flex bg-[#1E293B]">
                            <div className="w-10 bg-[#1E293B] border-r border-slate-700/50 flex flex-col items-center py-4 text-[10px] font-mono text-slate-600 select-none">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <span key={i} className="h-6 leading-6">{i + 1}</span>
                                ))}
                            </div>
                            <div className="flex-grow relative">
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full h-full bg-transparent text-slate-300 p-4 font-mono text-sm leading-6 resize-none focus:outline-none"
                                    spellCheck="false"
                                />
                                {/* Error Highlight Overlay Mock */}
                                <div className="absolute top-[264px] left-0 w-full h-6 bg-red-500/10 pointer-events-none border-l-2 border-red-500"></div>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="p-4 bg-[#0F172A]/50 border-t border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
                                    <Play className="w-3 h-3" />
                                    Test with Input
                                </button>
                                <span className="text-[10px] font-medium text-slate-600">Shortcut: Ctrl + Enter</span>
                            </div>
                            <button
                                onClick={() => setShowFeedback(true)}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
                            >
                                <span>Submit Fix</span>
                                <ChevronDown className="w-3 h-3 -rotate-90" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer StatusBar */}
            <footer className="h-8 bg-[#0F172A] border-t border-slate-800 flex items-center justify-between px-6 text-[10px] font-medium text-slate-500 select-none">
                <div className="flex gap-6">
                    <span>Elapsed: 12m 45s</span>
                    <span>Hints used: 0/3</span>
                    <span>Attempts: 2</span>
                </div>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-slate-400">Server: Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span className="text-slate-400">Docker: Active</span>
                    </div>
                </div>
            </footer>
        </footer>
            {
        showFeedback && (
            <TaskFeedback
                onNext={() => navigate(`/jobs/${jobId}/${level}/overview`)}
                onRetry={() => setShowFeedback(false)}
                feedback="Great work! You correctly identified the SQL injection vulnerability and implemented parameterized queries to sanitize the inputs."
            />
        )
    }
        </div >
    );
};

export default SanitizeSimulation;
