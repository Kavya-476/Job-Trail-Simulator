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
    RotateCcw
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskFeedback from './TaskFeedback';
import { simulationService } from '../../services/api';
import { Loader2 } from 'lucide-react';

const SanitizeSimulation = () => {
    const navigate = useNavigate();
    const { jobId, level } = useParams();
    const [showFeedback, setShowFeedback] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [aiFeedback, setAiFeedback] = useState(null);
    const [files, setFiles] = useState({
        'auth_handler.py': `from flask import request, jsonify
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
    return jsonify({"status": "fail"}), 401`,
        'models.py': `from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False) # Stored as hash
    is_admin = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<User {self.email}>'`
    });

    const [email, setEmail] = useState("admin'--");
    const [password, setPassword] = useState("..........");
    const [activeTab, setActiveTab] = useState('auth_handler.py');
    const [isRunning, setIsRunning] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const [showLogs, setShowLogs] = useState(false);

    const analyzeCodeSafety = (codeContent) => {
        // Heuristic checks
        // Check for unsafe string formatting (f-string or .format or + concatenation in query)
        const hasUnsafeStringFormatting = /f"SELECT.*\{.*\}/i.test(codeContent) || /"SELECT.*".*format\(/.test(codeContent) || /"SELECT.*"\s*\+/.test(codeContent) || /'SELECT.*'\s*\+/.test(codeContent);

        // Check for parameterized queries (cursor.execute with 2 args: query and params tuple/list)
        // Regex looks for cursor.execute(query_var, (...)) or cursor.execute("...", (...))
        const hasParameterizedQuery = /cursor\.execute\s*\(\s*[a-zA-Z_]\w*\s*,\s*[\(\[\{]/.test(codeContent) || /cursor\.execute\s*\(\s*["'].*["']\s*,\s*[\(\[\{]/.test(codeContent) || /\?.+cursor\.execute/.test(codeContent) || /%s.+cursor\.execute/.test(codeContent);

        if (hasParameterizedQuery) return 'SAFE';
        if (hasUnsafeStringFormatting) return 'UNSAFE';
        return 'UNKNOWN'; // Default to unsafe behavior if ambiguous
    };

    const handleTestInput = () => {
        setIsRunning(true);
        setTestResult(null);

        // Analyze current code
        const currentCode = files['auth_handler.py'];
        const safetyStatus = analyzeCodeSafety(currentCode);
        const isInputMalicious = email.includes("'") || email.includes("--") || password.includes("'");

        setTimeout(() => {
            setIsRunning(false);
            if (safetyStatus === 'SAFE') {
                // Safe code handles all inputs safely
                setTestResult('safe');
            } else {
                // Unsafe code fails on malicious input
                if (isInputMalicious) {
                    setTestResult('vulnerable');
                } else {
                    setTestResult('safe');
                }
            }
        }, 1200);
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const result = await simulationService.submitTask('t3', files['auth_handler.py']);
            setAiFeedback(result);
            setShowFeedback(true);
        } catch (error) {
            console.error("Error submitting task:", error);
            setAiFeedback({
                score: 0,
                is_correct: false,
                feedback: `Submission Failed: ${error.response?.data?.detail || error.message || "Unknown error"}. Please check your connection or login again.`
            });
            setShowFeedback(true);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 rounded-full border border-slate-700/50">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            {level === 'Professional' ? 'Level 3' : level === 'Intermediate' ? 'Level 2' : 'Level 1'}
                        </span>
                    </div>
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
                                    onClick={handleTestInput}
                                    disabled={isRunning}
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Sign In</span>}
                                    {isRunning ? null : <ChevronDown className="w-4 h-4 -rotate-90" />}
                                </button>
                            </div>
                            <p className="text-center text-[10px] text-slate-600 font-medium">Environment: Sandboxed Trial v1.0.4</p>
                        </div>
                    </div>

                    {/* Crash Details Panel */}
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-start gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-red-400">
                                    <AlertTriangle className="w-4 h-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">Crash Details</span>
                                </div>
                                <p className="text-xs font-mono text-red-300/80 leading-relaxed">
                                    CRITICAL: Internal Server Error 500 - Unhandled character exception at line 12. Input sanitization failed for character <span className="bg-red-500/20 px-1 rounded text-white">'</span>
                                </p>
                            </div>
                            <button
                                onClick={() => setShowLogs(!showLogs)}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg shadow-lg shadow-red-500/20 transition-colors whitespace-nowrap"
                            >
                                {showLogs ? 'Hide Logs' : 'View Logs'}
                            </button>
                        </div>

                        {showLogs && (
                            <div className="bg-black/40 rounded-xl p-4 font-mono text-[10px] text-red-400/70 space-y-1 animate-in slide-in-from-top-2 duration-300">
                                <div>[16:05:22] ERROR: sqlalchemy.exc.InternalError: (sqlite3.InternalError)</div>
                                <div>[16:05:22] CRITICAL: Unexpected Character at index 14: "'"</div>
                                <div>[16:05:22] TRACEBACK: /usr/local/lib/python3.9/sqlite3/dbapi2.py In execute</div>
                                <div>[16:05:22] QUERY: SELECT * FROM users WHERE email='admin'--' AND pass='..........'</div>
                            </div>
                        )}
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
                                    value={files[activeTab]}
                                    onChange={(e) => setFiles({ ...files, [activeTab]: e.target.value })}
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
                                <button
                                    onClick={handleTestInput}
                                    disabled={isRunning}
                                    className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                                >
                                    {isRunning ? (
                                        <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                    ) : (
                                        <Play className="w-3 h-3" />
                                    )}
                                    {isRunning ? 'Analyzing...' : 'Test with Input'}
                                </button>
                                {testResult && (
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${testResult === 'vulnerable' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                        {testResult === 'vulnerable' ? 'Vulnerability Detected' : 'Input Appears Safe'}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <span>Submit Fix</span>}
                                {isSubmitting ? null : <ChevronDown className="w-3 h-3 -rotate-90" />}
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
            {
                showFeedback && (
                    <TaskFeedback
                        onNext={() => {
                            // Level 1 (Beginner) ends here for job_dev
                            navigate(`/simulation/${jobId}/${level}/feedback`);
                        }}
                        onRetry={() => setShowFeedback(false)}
                        score={aiFeedback?.score}
                        feedback={aiFeedback?.feedback}
                    />
                )
            }
        </div>
    );
};

export default SanitizeSimulation;
