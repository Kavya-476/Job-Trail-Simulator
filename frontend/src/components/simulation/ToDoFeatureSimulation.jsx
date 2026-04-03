import React, { useState } from 'react';
import {
    Layout,
    FileText,
    Folder,
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
    Globe
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskFeedback from './TaskFeedback';

const ToDoFeatureSimulation = () => {
    const navigate = useNavigate();
    const { jobId, level } = useParams();
    const [showFeedback, setShowFeedback] = useState(false);
    const [activeFile, setActiveFile] = useState('TodoList.js');
    const [activeTab, setActiveTab] = useState('frontend');
    const [code, setCode] = useState(`import React, { useState } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);

    // TODO: Implement priority tags enhancement
    const addTask = (text, priority) => {
        const newTask = {
            id: Date.now(),
            text,
            priority: priority || 'Medium',
            completed: false
        };
        setTasks([...tasks, newTask]);
    };

    return (
        <div className="todo-container">
            {/* Implementation goes here */}
        </div>
    );
};`);

    const [tasks, setTasks] = useState([
        { id: 1, text: 'Refactor API Routes', priority: 'High', completed: true },
        { id: 2, text: 'Update README.md', priority: 'Low', completed: false },
    ]);
    const [newTaskText, setNewTaskText] = useState('');

    const files = {
        frontend: [
            { name: 'App.js', type: 'file' },
            { name: 'TodoList.js', type: 'file', active: true },
            { name: 'TodoItem.js', type: 'file' },
            { name: 'styles.css', type: 'css' }
        ],
        backend: [
            { name: 'api.js', type: 'js' },
            { name: 'server.js', type: 'js' }
        ]
    };

    const requirements = [
        { id: 1, text: 'Implement a dropdown selector for Priority (Low, Medium, High).', completed: true },
        { id: 2, text: 'Update the backend schema to store task priority in the database.', completed: false },
        { id: 3, text: 'Add logic to sort the UI list automatically by priority level.', completed: false },
    ];

    return (
        <div className="h-screen flex flex-col bg-white font-sans text-slate-900 overflow-hidden">
            {/* Header */}
            <header className="h-14 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-white z-20">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        <Layout className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-slate-900 leading-none">Job Trial Simulator</h1>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                            <span>Level 2</span>
                            <span className="text-slate-300">/</span>
                            <span>Task 1</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-500">
                        <button className="px-3 py-1.5 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Dashboard</button>
                        <button className="px-3 py-1.5 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Curriculum</button>
                        <button className="px-3 py-1.5 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Leaderboard</button>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors">
                        Preview App
                    </button>
                    <button
                        onClick={() => setShowFeedback(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm shadow-blue-200"
                    >
                        Submit Code
                    </button>
                    <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                        <User className="w-4 h-4" />
                    </div>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">
                {/* Left Sidebar: File Explorer */}
                <div className="w-64 border-r border-slate-200 flex flex-col bg-slate-50/50 shrink-0">
                    <div className="p-3 border-b border-slate-200/50">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">
                            <Folder className="w-3.5 h-3.5" />
                            File Explorer
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto py-2">
                        <div className="mb-4">
                            <div className="px-4 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                SRC/Components
                            </div>
                            <div className="space-y-0.5">
                                {files.frontend.map((file, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveFile(file.name)}
                                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${file.name === activeFile ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        <FileText className={`w-4 h-4 ${file.name === activeFile ? 'text-blue-500' : 'text-slate-400'}`} />
                                        {file.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="px-4 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                SRC/Services
                            </div>
                            <div className="space-y-0.5">
                                {files.backend.map((file, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveFile(file.name)}
                                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${file.name === activeFile ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        <div className="w-4 h-4 flex items-center justify-center text-[10px] font-black bg-amber-100 text-amber-600 rounded">JS</div>
                                        {file.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="space-y-0.5">
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                                    <div className="w-4 h-4 flex items-center justify-center text-[8px] font-black bg-purple-100 text-purple-600 rounded">CSS</div>
                                    styles.css
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Panel: Code Editor */}
                <div className="flex-1 flex flex-col min-w-0 border-r border-slate-200">
                    {/* Tabs */}
                    <div className="h-10 flex border-b border-slate-200 bg-white">
                        <button
                            onClick={() => setActiveTab('frontend')}
                            className={`px-4 flex items-center gap-2 text-xs font-bold transition-colors border-r border-slate-100 ${activeTab === 'frontend' ? 'bg-blue-50 text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <Globe className="w-3.5 h-3.5" />
                            Frontend (React)
                        </button>
                        <button
                            onClick={() => setActiveTab('backend')}
                            className={`px-4 flex items-center gap-2 text-xs font-bold transition-colors border-r border-slate-100 ${activeTab === 'backend' ? 'bg-blue-50 text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <Database className="w-3.5 h-3.5" />
                            Backend (Node.js)
                        </button>
                    </div>

                    {/* Editor Toolbar */}
                    <div className="h-10 flex items-center justify-between px-4 border-b border-slate-100 bg-white">
                        <div className="text-xs text-slate-400 font-medium">
                            src / components / <span className="text-blue-600 font-bold">{activeFile}</span>
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase rounded transition-all">
                            <Play className="w-3 h-3 fill-slate-500" />
                            Run Tests
                        </button>
                    </div>

                    {/* Editor */}
                    <div className="flex-grow relative flex bg-white overflow-hidden">
                        <div className="w-10 bg-white border-r border-slate-100 flex flex-col items-center py-4 text-[10px] font-mono text-slate-300 select-none">
                            {Array.from({ length: 25 }).map((_, i) => (
                                <span key={i} className="h-6 leading-6">{i + 1}</span>
                            ))}
                        </div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="flex-grow p-4 font-mono text-sm leading-6 text-slate-700 resize-none focus:outline-none selection:bg-blue-100"
                            spellCheck="false"
                        />
                    </div>
                </div>

                {/* Right Panel: Task & Preview */}
                <div className="w-[400px] flex flex-col bg-slate-50 shrink-0">
                    <div className="flex-grow overflow-y-auto p-6 space-y-6">

                        {/* Task Card */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-lg font-black text-blue-600">Task 1: Priority Tags</h2>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Enhance the existing To-Do application with priority sorting functionality.
                                </p>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Feature Requirements</span>
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-[10px] font-bold">33% Done</span>
                                </div>

                                <div className="space-y-2">
                                    {requirements.map(req => (
                                        <div key={req.id} className={`flex gap-3 p-3 rounded-lg border text-sm transition-all ${req.completed ? 'bg-white border-blue-200 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-70'}`}>
                                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 ${req.completed ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300 bg-white'}`}>
                                                {req.completed && <CheckCircle className="w-3.5 h-3.5" />}
                                            </div>
                                            <span className={`${req.completed ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>{req.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Live Preview */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Preview</span>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    LIVE
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[350px]">
                                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <span className="text-xs font-bold text-slate-700">My Tasks</span>
                                    <Settings className="w-4 h-4 text-slate-400" />
                                </div>

                                <div className="flex-grow p-4 overflow-y-auto space-y-2 bg-[#F8FAFC]">
                                    {tasks.map(task => (
                                        <div key={task.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${task.completed ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                                                {task.completed && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <span className={`text-sm flex-grow ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.text}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${task.priority === 'High' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-3 border-t border-slate-100 bg-white">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Add new task..."
                                            className="flex-grow text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                                        />
                                        <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer Stats */}
                    <div className="bg-white border-t border-slate-200 p-3 flex justify-between items-center text-[10px] text-slate-400 font-medium">
                        <div>Ln 12, Col 42</div>
                        <div className="flex gap-4">
                            <span>UTF-8</span>
                            <span>JavaScript (React)</span>
                            <span className="flex items-center gap-1 text-blue-500">
                                <CheckCircle className="w-3 h-3" /> Linting: Clean
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-8 bg-white border-t border-slate-200 flex items-center px-4 gap-4 text-[10px] font-bold text-slate-500 shrink-0">
                <div className="flex items-center gap-1.5 text-emerald-600">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    Connected to Dev Server
                </div>
                <div className="flex-grow"></div>
                <div className="flex items-center gap-1.5 opacity-60">
                    <Globe className="w-3 h-3" />
                    main*
                </div>
                <span className="opacity-60">Saving...</span>
            </div>

            {
                showFeedback && (
                    <TaskFeedback
                        onNext={() => navigate(`/jobs/${jobId}/${level}/overview`)}
                        onRetry={() => setShowFeedback(false)}
                        feedback="Good job! You've implemented the priority tags feature. The To-Do list now supports priority levels."
                    />
                )
            }
        </div >
    );
};

export default ToDoFeatureSimulation;
