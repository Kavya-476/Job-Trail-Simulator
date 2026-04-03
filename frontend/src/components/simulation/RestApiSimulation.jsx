import React, { useState } from 'react';
import {
    FileText,
    Play,
    CheckCircle,
    User,
    Settings,
    ChevronRight,
    Search,
    Plus,
    MoreHorizontal,
    Code,
    Database,
    Globe,
    Send,
    Clock,
    AlertCircle,
    RefreshCw,
    Terminal
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskFeedback from './TaskFeedback';

const RestApiSimulation = () => {
    const navigate = useNavigate();
    const { jobId, level } = useParams();
    const [showFeedback, setShowFeedback] = useState(false);
    const [activeFile, setActiveFile] = useState('postController.js');
    const [code, setCode] = useState(`const { PostModel } = require('../models');

exports.createPost = async (req, res) => {
    // TODO: Implement the create logic here
    const { title, content, authorId } = req.body;

    
};`);

    const [requestBody, setRequestBody] = useState(`{
    "title": "Modern UI Design",
    "content": "Design is not just...",
    "authorId": 101
}`);

    const [response, setResponse] = useState(null);
    const [activeRequestTab, setActiveRequestTab] = useState('body');

    const handleSendRequest = () => {
        setResponse({ status: '...', time: '...' });
        setTimeout(() => {
            setResponse({
                status: '201 Created',
                time: '24ms',
                data: {
                    id: 1,
                    title: "Modern UI Design",
                    content: "Design is not just...",
                    authorId: 101,
                    createdAt: new Date().toISOString()
                }
            });
        }, 1000);
    };

    return (
        <div className="h-screen flex flex-col bg-white font-sans text-slate-900 overflow-hidden">
            {/* Header */}
            <header className="h-14 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-white z-20">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-slate-900 leading-none">DevTrial Simulator</h1>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                            <span className="font-medium text-slate-400">Project:</span>
                            <span className="font-bold text-slate-600">BlogAPI</span>
                            <span className="text-slate-300">/</span>
                            <span>Level 2</span>
                            <span className="text-slate-300">/</span>
                            <span className="text-blue-600 font-bold">Task 2</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-500">
                        <button className="px-3 py-1.5 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Dashboard</button>
                        <button className="px-3 py-1.5 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Documentation</button>
                        <button className="px-3 py-1.5 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Help</button>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowFeedback(true)}
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm shadow-blue-200"
                    >
                        Submit Task
                    </button>
                    <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                        <User className="w-4 h-4" />
                    </div>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">
                {/* Left Sidebar: Task Requirements */}
                <div className="w-[300px] border-r border-slate-200 flex flex-col bg-slate-50/50 shrink-0 overflow-y-auto">
                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-widest">
                            <FileText className="w-4 h-4 text-blue-600" />
                            Task Requirements
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black rounded uppercase">POST</span>
                                <code className="text-sm font-bold text-slate-700">/posts</code>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Implement an endpoint to handle the creation of new blog posts. Your logic should validate the incoming data and persist it to the virtual database.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Required Fields</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2 text-xs text-slate-600">
                                        <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                        <span className="font-mono bg-slate-200/50 px-1 rounded text-slate-800">title</span> <span>(string, min 5 chars)</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-xs text-slate-600">
                                        <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                        <span className="font-mono bg-slate-200/50 px-1 rounded text-slate-800">content</span> <span>(string)</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-xs text-slate-600">
                                        <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                        <span className="font-mono bg-slate-200/50 px-1 rounded text-slate-800">authorId</span> <span>(integer)</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expected Responses</h3>
                                <ul className="space-y-3">
                                    <li className="text-xs space-y-1">
                                        <div className="flex items-center gap-2 font-bold text-emerald-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                            201 Created
                                        </div>
                                        <p className="text-slate-500 pl-3.5">Success. Returns the created post object with a generated ID.</p>
                                    </li>
                                    <li className="text-xs space-y-1">
                                        <div className="flex items-center gap-2 font-bold text-red-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                            400 Bad Request
                                        </div>
                                        <p className="text-slate-500 pl-3.5">Missing required fields or validation failure.</p>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs leading-relaxed text-blue-800 italic">
                                Hint: Use the <span className="font-mono bg-blue-100 px-1 rounded not-italic">PostModel.save()</span> method to interact with the database simulation.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Panel: Code Editor */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#1E1E1E]">
                    {/* Tabs */}
                    <div className="h-10 flex border-b border-[#2D2D2D] bg-[#252526]">
                        <button
                            onClick={() => setActiveFile('postController.js')}
                            className={`px-4 flex items-center gap-2 text-xs font-medium transition-colors border-r border-[#2D2D2D] ${activeFile === 'postController.js' ? 'bg-[#1E1E1E] text-yellow-500 border-t-2 border-t-yellow-500' : 'text-gray-400 hover:bg-[#2D2D2D]'}`}
                        >
                            <span className="text-yellow-500 font-bold">JS</span>
                            postController.js
                        </button>
                        <button
                            onClick={() => setActiveFile('models.js')}
                            className={`px-4 flex items-center gap-2 text-xs font-medium transition-colors border-r border-[#2D2D2D] ${activeFile === 'models.js' ? 'bg-[#1E1E1E] text-yellow-500 border-t-2 border-t-yellow-500' : 'text-gray-400 hover:bg-[#2D2D2D]'}`}
                        >
                            <span className="text-yellow-500 font-bold">JS</span>
                            models.js
                        </button>
                    </div>

                    {/* Editor */}
                    <div className="flex-grow relative flex bg-[#1E1E1E] overflow-hidden">
                        <div className="w-12 bg-[#1E1E1E] border-r border-[#2D2D2D] flex flex-col items-center py-4 text-[12px] font-mono text-[#858585] select-none">
                            {Array.from({ length: 25 }).map((_, i) => (
                                <span key={i} className="h-6 leading-6">{i + 1}</span>
                            ))}
                        </div>
                        <div className="flex-grow relative">
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-full bg-transparent p-4 font-mono text-sm leading-6 text-[#D4D4D4] resize-none focus:outline-none selection:bg-[#264F78]"
                                spellCheck="false"
                            />
                            {/* Active Line Highlight Mock */}
                            <div className="absolute top-[144px] left-0 w-full h-6 bg-[#2D2D2D]/50 pointer-events-none flex items-center justify-end px-2">
                                <span className="text-[10px] text-[#2D2D2D] bg-[#007ACC] px-1 rounded text-white">Active Line</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: API Tester */}
                <div className="w-[400px] flex flex-col bg-slate-50 shrink-0 border-l border-slate-200">
                    <div className="h-10 border-b border-slate-200 px-4 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase tracking-widest">
                            <Terminal className="w-4 h-4 text-blue-600" />
                            API Tester
                        </div>
                        <button
                            onClick={handleSendRequest}
                            className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-[10px] font-bold uppercase rounded border border-blue-200 transition-colors"
                        >
                            <Send className="w-3 h-3" />
                            Send Request
                        </button>
                    </div>

                    <div className="flex-grow flex flex-col p-6 space-y-6 overflow-y-auto">

                        {/* Request Body */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Request Body (JSON)</h3>
                            </div>
                            <textarea
                                value={requestBody}
                                onChange={(e) => setRequestBody(e.target.value)}
                                className="w-full h-32 font-mono text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3 resize-none focus:outline-none focus:border-blue-400"
                            />
                        </div>

                        {/* Response */}
                        <div className="space-y-3 flex-grow">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Response</h3>
                                {response && (
                                    <span className="text-[10px] font-bold bg-slate-200/50 px-2 py-0.5 rounded text-slate-600">TIME: {response.time}</span>
                                )}
                            </div>

                            <div className={`w-full ${response ? 'bg-white' : 'bg-slate-900'} rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[200px]`}>
                                <div className={`px-4 py-2 border-b ${response ? 'border-slate-100 bg-slate-50' : 'border-slate-800 bg-slate-800'} flex items-center justify-between`}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                                        {response ? (
                                            <span className="text-xs font-bold text-emerald-600">{response.status}</span>
                                        ) : (
                                            <span className="text-xs font-bold text-slate-500">---</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-grow p-4 font-mono text-xs overflow-auto">
                                    {response ? (
                                        <pre className="text-slate-600">{JSON.stringify(response.data, null, 2)}</pre>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-slate-500 italic opacity-50 space-y-2">
                                            <span>Press "Send Request" to see the output from</span>
                                            <span>your controller logic.</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recent Requests Log */}
                        <div className="space-y-3">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Requests</h3>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-[10px] text-slate-500 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-emerald-600">201</span>
                                        <span className="font-bold text-slate-700">POST /posts</span>
                                    </div>
                                    <span>2m ago</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-slate-500 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-red-500">400</span>
                                        <span className="font-bold text-slate-700">POST /posts</span>
                                    </div>
                                    <span>5m ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-8 bg-white border-t border-slate-200 flex items-center px-4 justify-between text-[10px] font-bold text-slate-500 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-emerald-600">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        Server: Active
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                        <CheckCircle className="w-3 h-3 text-slate-400" />
                        Linter: 0 errors
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-blue-600 animate-pulse">
                        <RefreshCw className="w-3 h-3" />
                        AUTO-SAVING
                    </div>
                    <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4 text-slate-400 font-medium">
                        <Code className="w-3 h-3" />
                        UTF-8
                    </div>
                    <div className="px-2 py-0.5 bg-blue-600 text-white rounded font-mono">
                        LINE 7, COL 5
                    </div>
                    <div className="font-mono text-slate-400">
                        NODE.JS V18.0.0
                    </div>
                </div>

                <div className="flex items-center gap-4 w-48">
                    <span className="text-slate-400">Task Progress: 45%</span>
                    <div className="flex-grow h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-[45%] h-full bg-blue-600 rounded-full"></div>
                    </div>
                </div>
            </div>
            {showFeedback && (
                <TaskFeedback
                    onNext={() => navigate(`/jobs/${jobId}/${level}/overview`)}
                    onRetry={() => setShowFeedback(false)}
                    feedback="Excellent! The API endpoint validates input correctly and returns the expected 201 Created response."
                />
            )}
        </div>
    );
};

export default RestApiSimulation;
