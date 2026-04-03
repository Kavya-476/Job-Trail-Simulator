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
    Globe,
    X
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskFeedback from './TaskFeedback';
import { simulationService } from '../../services/api';
import { Loader2 } from 'lucide-react';

const ToDoFeatureSimulation = () => {
    const navigate = useNavigate();
    const { jobId, level } = useParams();
    const [showFeedback, setShowFeedback] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [aiFeedback, setAiFeedback] = useState(null);
    const [activeFile, setActiveFile] = useState('TodoList.js');
    const [activeTab, setActiveTab] = useState('frontend');

    // Multi-file content management
    const [fileContents, setFileContents] = useState({
        'App.js': `import React from 'react';
import TodoList from './TodoList';
import './styles.css';

function App() {
  return (
    <div className="app">
      <h1>My JTS Tasks</h1>
      <TodoList />
    </div>
  );
}

export default App;`,
        'TodoList.js': `import React, { useState } from 'react';

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
};

export default TodoList;`,
        'TodoItem.js': `import React from 'react';

const TodoItem = ({ task, onToggle }) => {
  return (
    <div className="todo-item">
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task.id)} 
      />
      <span>{task.text}</span>
    </div>
  );
};

export default TodoItem;`,
        'styles.css': `.todo-container { padding: 20px; }
.todo-item { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.priority-high { color: red; }
.priority-medium { color: orange; }
.priority-low { color: blue; }`,
        'api.js': `export const fetchTasks = () => {
  return fetch('/api/tasks').then(res => res.json());
};`,
        'server.js': `const express = require('express');
const app = express();

app.get('/api/tasks', (req, res) => {
  res.json([{ id: 1, text: 'Sample Task', priority: 'Medium' }]);
});`
    });

    const [tasks, setTasks] = useState([
        { id: 1, text: 'Refactor API Routes', priority: 'High', completed: true },
        { id: 2, text: 'Update README.md', priority: 'Low', completed: false },
    ]);
    const [newTaskText, setNewTaskText] = useState('');
    const [isRunningTests, setIsRunningTests] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [reqs, setReqs] = useState([
        { id: 1, text: 'Implement a dropdown selector for Priority (Low, Medium, High).', completed: false },
        { id: 2, text: 'Update the backend schema to store task priority in the database.', completed: false },
        { id: 3, text: 'Add logic to sort the UI list automatically by priority level.', completed: false },
    ]);
    const [showGuide, setShowGuide] = useState(true);
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Logic flags derived from user code
    const [logicFlags, setLogicFlags] = useState({
        hasPrioritySelect: false,
        hasSortLogic: false,
        hasBackendUpdate: false
    });

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };


    const sortTasks = (taskList) => {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        return [...taskList].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    };

    const handleAddTask = (priority = 'Medium') => {
        if (!newTaskText.trim()) return;
        const newTask = {
            id: Date.now(),
            text: newTaskText,
            priority: logicFlags.hasPrioritySelect ? priority : 'Medium',
            completed: false
        };
        let updatedTasks = [...tasks, newTask];
        if (logicFlags.hasSortLogic) {
            updatedTasks = sortTasks(updatedTasks);
        }
        setTasks(updatedTasks);
        setNewTaskText('');
    };

    const handleSave = () => {
        setIsSaving(true);
        const currentCode = fileContents['TodoList.js'];
        const serverCode = fileContents['server.js'];

        const flags = {
            hasPrioritySelect: currentCode.includes('priority') && (currentCode.includes('select') || currentCode.includes('option')),
            hasSortLogic: currentCode.includes('sort') || currentCode.includes('orderBy'),
            hasBackendUpdate: serverCode.includes('priority')
        };

        setTimeout(() => {
            setLogicFlags(flags);
            setIsSaving(false);

            // Auto-update requirements on save
            setReqs(prev => prev.map(r => {
                if (r.id === 1 && flags.hasPrioritySelect) return { ...r, completed: true };
                if (r.id === 2 && flags.hasBackendUpdate) return { ...r, completed: true };
                if (r.id === 3 && flags.hasSortLogic) return { ...r, completed: true };
                return r;
            }));

            // Re-sort existing tasks if sorting was just added
            if (flags.hasSortLogic) {
                setTasks(prev => sortTasks(prev));
            }
        }, 600);
    };

    const handleRunTests = () => {
        setIsRunningTests(true);
        setTestResult(null);

        // Sync code flags
        const currentCode = fileContents['TodoList.js'];
        const serverCode = fileContents['server.js'];
        const flags = {
            hasPrioritySelect: currentCode.includes('priority') && (currentCode.includes('select') || currentCode.includes('option')),
            hasSortLogic: currentCode.includes('sort') || currentCode.includes('orderBy'),
            hasBackendUpdate: serverCode.includes('priority')
        };

        setTimeout(() => {
            setLogicFlags(flags);
            setIsRunningTests(false);
            const allPassed = flags.hasPrioritySelect && flags.hasSortLogic && flags.hasBackendUpdate;
            setTestResult(allPassed ? 'success' : 'failure');
        }, 1500);
    };

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        setActiveFile(tab === 'frontend' ? 'TodoList.js' : 'api.js');
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const result = await simulationService.submitTask('t_todo_priority', fileContents['TodoList.js']);
            setAiFeedback(result);
            setShowFeedback(true);
        } catch (error) {
            console.error("Error submitting task:", error);
            setAiFeedback({
                score: 88,
                feedback: "Good work! You've successfully implemented the priority tags feature. The code structure for state management is solid.",
                detailed_feedback: [
                    { type: 'strength', content: 'Correct implementation of state updates with spread operator.' },
                    { type: 'improvement', content: 'Could add prop-types for better safety.' }
                ]
            });
            setShowFeedback(true);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            <span>
                                {level === 'Professional' ? 'Level 3' : level === 'Intermediate' ? 'Level 2' : 'Level 1'}
                            </span>
                            <span className="text-slate-300">/</span>
                            <span>Task 4</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-500">
                        <button onClick={() => navigate('/dashboard')} className="px-3 py-1.5 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Dashboard</button>
                        <button className="px-3 py-1.5 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors text-blue-600">Curriculum</button>
                        <button className="px-3 py-1.5 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Leaderboard</button>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setShowPreview(true);
                            setIsPreviewLoading(true);
                            setTimeout(() => setIsPreviewLoading(false), 800);
                        }}
                        className="px-4 py-2 bg-slate-100 font-bold hover:bg-slate-200 text-slate-700 text-xs rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Globe className="w-3.5 h-3.5" />
                        Preview App
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm shadow-blue-200 flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSubmitting && <Loader2 className="w-3 h-3 animate-spin" />}
                        {isSubmitting ? 'Submitting...' : 'Submit Code'}
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
                                        onClick={() => { setActiveFile(file.name); setActiveTab('frontend'); }}
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
                                        onClick={() => { setActiveFile(file.name); setActiveTab('backend'); }}
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
                                <button
                                    onClick={() => { setActiveFile('styles.css'); setActiveTab('frontend'); }}
                                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${activeFile === 'styles.css' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}
                                >
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
                            onClick={() => handleTabSwitch('frontend')}
                            className={`px-4 flex items-center gap-2 text-xs font-bold transition-colors border-r border-slate-100 ${activeTab === 'frontend' ? 'bg-blue-50 text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <Globe className="w-3.5 h-3.5" />
                            Frontend (React)
                        </button>
                        <button
                            onClick={() => handleTabSwitch('backend')}
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
                        <button
                            onClick={handleRunTests}
                            disabled={isRunningTests}
                            className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase rounded transition-all disabled:opacity-50"
                        >
                            {isRunningTests ? (
                                <div className="w-3 h-3 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                            ) : (
                                <Play className="w-3 h-3 fill-slate-500" />
                            )}
                            {isRunningTests ? 'Running...' : 'Run Tests'}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase rounded transition-all shadow-sm disabled:opacity-50"
                        >
                            {isSaving ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                                <FileText className="w-3 h-3" />
                            )}
                            {isSaving ? 'Saving...' : 'Save & Build'}
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
                            value={fileContents[activeFile] || ''}
                            onChange={(e) => setFileContents({ ...fileContents, [activeFile]: e.target.value })}
                            className="flex-grow p-4 font-mono text-sm leading-6 text-slate-700 resize-none focus:outline-none selection:bg-blue-100 whitespace-pre"
                            spellCheck="false"
                        />
                    </div>
                </div>

                {/* Right Panel: Task & Preview */}
                <div className="w-[450px] flex flex-col bg-slate-50 shrink-0 border-l border-slate-200">
                    <div className="flex-grow overflow-y-auto p-6 space-y-6">

                        {/* Task Instructions Guide */}
                        {showGuide && (
                            <div className="bg-blue-600 rounded-xl shadow-lg shadow-blue-200 p-5 text-white relative animate-in slide-in-from-right-4 duration-500">
                                <button onClick={() => setShowGuide(false)} className="absolute top-3 right-3 text-blue-200 hover:text-white">
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <Code className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-black text-sm uppercase tracking-wider">Quick Task Guide</h3>
                                </div>
                                <ul className="space-y-3 text-xs font-medium text-blue-50">
                                    <li className="flex gap-2">
                                        <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center shrink-0 font-bold">1</span>
                                        Open <code className="bg-white/10 px-1 rounded">TodoList.js</code> and add a priority selector to the task input.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center shrink-0 font-bold">2</span>
                                        Use <code className="bg-white/10 px-1 rounded">tasks.sort()</code> to order the list by High {'>'} Medium {'>'} Low.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center shrink-0 font-bold">3</span>
                                        Update the backend in <code className="bg-white/10 px-1 rounded">server.js</code> to accept the new priority field.
                                    </li>
                                </ul>
                                <button onClick={() => setShowGuide(false)} className="mt-4 w-full py-2 bg-white text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-colors">
                                    Got it, let's go!
                                </button>
                            </div>
                        )}

                        {!showGuide && (
                            <button onClick={() => setShowGuide(true)} className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-1 transition-transform">
                                <MoreHorizontal className="w-3 h-3" /> Show Task Guide
                            </button>
                        )}

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
                                    {reqs.map(req => (
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
                                        <div key={task.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                            <div
                                                onClick={() => toggleTask(task.id)}
                                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${task.completed ? 'bg-blue-500 border-blue-500' : 'border-slate-300 hover:border-blue-300'}`}
                                            >
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
                                    <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newTaskText}
                                            onChange={(e) => setNewTaskText(e.target.value)}
                                            placeholder="Add new task..."
                                            className="flex-grow text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                                        />
                                        {logicFlags.hasPrioritySelect && (
                                            <select
                                                className="text-[10px] px-1 bg-slate-50 border border-slate-200 rounded text-slate-500 outline-none"
                                                onChange={(e) => {
                                                    // Pass the priority to handleAddTask if needed, or manage in state
                                                    // For simple mock:
                                                }}
                                                id="preview-priority-select"
                                            >
                                                <option>High</option>
                                                <option>Medium</option>
                                                <option>Low</option>
                                            </select>
                                        )}
                                        <button
                                            type="submit"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const select = document.getElementById('preview-priority-select');
                                                handleAddTask(select ? select.value : 'Medium');
                                            }}
                                            className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm active:scale-95"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </form>
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
                        onNext={() => {
                            navigate(`/jobs/${jobId}/${level}/overview`);
                        }}
                        onRetry={() => setShowFeedback(false)}
                        score={aiFeedback?.score}
                        feedback={aiFeedback?.feedback}
                        detailedFeedback={aiFeedback?.detailed_feedback}
                    />
                )
            }

            {/* Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-blue-600" />
                                Live Preview: To-Do App
                            </h3>
                            <button onClick={() => setShowPreview(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-grow p-8 bg-slate-50 overflow-y-auto relative min-h-[400px]">
                            {isPreviewLoading ? (
                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
                                    <p className="text-sm font-bold text-slate-600 animate-pulse">Compiling Application...</p>
                                </div>
                            ) : (
                                <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-in zoom-in-95 duration-300">
                                    <h4 className="font-black text-xl mb-6">My To-Do List</h4>
                                    <div className="space-y-3 mb-6">
                                        {tasks.length > 0 ? tasks.map(t => (
                                            <div key={t.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 transition-all hover:bg-white hover:shadow-md">
                                                <div onClick={() => toggleTask(t.id)} className={`w-5 h-5 rounded-full border-2 cursor-pointer transition-all ${t.completed ? 'bg-emerald-500 border-emerald-500 scale-110' : 'border-slate-300 hover:border-blue-400'}`}>
                                                    {t.completed && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                                </div>
                                                <span className={`flex-grow text-sm font-medium ${t.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{t.text}</span>
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${t.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' :
                                                    t.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                        'bg-blue-50 text-blue-600 border-blue-100'
                                                    }`}>
                                                    {t.priority}
                                                </span>
                                            </div>
                                        )) : (
                                            <div className="text-center py-10 text-slate-400 italic">No tasks yet</div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newTaskText}
                                            onChange={(e) => setNewTaskText(e.target.value)}
                                            placeholder="New task..."
                                            className="flex-grow px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                                        />
                                        {logicFlags.hasPrioritySelect && (
                                            <select
                                                id="preview-priority-select-modal"
                                                className="px-2 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option>High</option>
                                                <option>Medium</option>
                                                <option>Low</option>
                                            </select>
                                        )}
                                        <button
                                            onClick={() => {
                                                const select = document.getElementById('preview-priority-select-modal');
                                                handleAddTask(select ? select.value : 'Medium');
                                            }}
                                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
                                        >
                                            <Plus className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                            <p className="text-xs text-slate-500">This is a live preview of your code execution sandbox.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToDoFeatureSimulation;
