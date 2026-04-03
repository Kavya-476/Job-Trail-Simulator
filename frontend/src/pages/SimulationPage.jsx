import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_JOBS, MOCK_TASKS } from '../data/mockData';
import { Clock, ChevronRight, CheckCircle, AlertCircle, Play, Save, Lightbulb, HelpCircle } from 'lucide-react';

// Specialized Simulation Components
import DevSimulation from '../components/simulation/DevSimulation';
import UXSimulation from '../components/simulation/UXSimulation';
import DataSimulation from '../components/simulation/DataSimulation';
import DBSimulation from '../components/simulation/DBSimulation';
import QASimulation from '../components/simulation/QASimulation';
import TaskFeedback from '../components/simulation/TaskFeedback';

const SimulationPage = () => {
    const { simId, level } = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('instructions'); // 'instructions' or 'workspace'
    const [isExecuting, setIsExecuting] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    // Find job from simId
    const job = MOCK_JOBS.find(j => j.id === simId) || MOCK_JOBS[0];
    const tasks = MOCK_TASKS[job.id] || MOCK_TASKS['job_dev'];
    const currentTask = tasks[currentTaskIndex];

    const handleTaskCompletion = () => {
        setShowFeedback(true);
    };

    const handleProceed = () => {
        setShowFeedback(false);
        if (currentTaskIndex < tasks.length - 1) {
            setCurrentTaskIndex(prev => prev + 1);
            setCode('');
            setShowHint(false);
            setSaveStatus(null);
            if (window.innerWidth < 768) setActiveTab('instructions');
        } else {
            navigate(`/simulation/${simId}/feedback`);
        }
    };

    const handleRun = () => {
        setIsExecuting(true);
        setTimeout(() => setIsExecuting(false), 1500);
    };

    const handleSave = () => {
        setSaveStatus('saving');
        setTimeout(() => setSaveStatus('saved'), 1000);
        setTimeout(() => setSaveStatus(null), 3000);
    };

    const simulationProps = {
        job,
        currentTask,
        tasks,
        currentTaskIndex,
        currentTaskIndex,
        handleNext: handleTaskCompletion,
        code,
        setCode,
        showHint,
        setShowHint,
        level,
        simId
    };

    // Specialized simulation selection
    const renderSpecializedSim = () => {
        switch (job.id) {
            case 'job_dev': return <DevSimulation {...simulationProps} />;
            case 'job_uiux': return <UXSimulation {...simulationProps} />;
            case 'job_data': return <DataSimulation {...simulationProps} />;
            case 'job_db': return <DBSimulation {...simulationProps} />;
            case 'job_test': return <QASimulation {...simulationProps} />;
            default: return null;
        }
    };

    const specializedSim = renderSpecializedSim();
    const specializedSim = renderSpecializedSim();
    if (specializedSim) {
        return (
            <>
                {specializedSim}
                {showFeedback && (
                    <TaskFeedback
                        onNext={handleProceed}
                        onRetry={() => setShowFeedback(false)}
                        isLastTask={currentTaskIndex === tasks.length - 1}
                    />
                )}
            </>
        );
    }

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50 dark:bg-navy overflow-hidden">
            {/* Header */}
            <div className="bg-white dark:bg-navy-light border-b border-gray-200 dark:border-slate-800 px-4 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm z-30">
                <div className="flex items-center space-x-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <div className="bg-indigo-100 dark:bg-primary/20 p-2 rounded-lg flex items-center gap-2 shrink-0">
                        <span className="font-bold text-primary dark:text-primary-light text-sm sm:text-base whitespace-nowrap">{job.title}</span>
                        <span className="bg-white dark:bg-navy px-2 py-0.5 rounded text-[10px] uppercase font-black text-indigo-400 dark:text-indigo-300 border border-indigo-100 dark:border-slate-800 italic shrink-0">
                            {level}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-slate-400 text-xs sm:text-sm shrink-0">
                        <span className="mr-2">Task {currentTaskIndex + 1} of {tasks.length}:</span>
                        <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px] sm:max-w-[300px]">{currentTask.title}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-4">
                    <div className="flex items-center bg-gray-100 dark:bg-navy px-3 py-1.5 rounded-full text-red-600 dark:text-red-400 font-mono font-medium text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        09:45
                    </div>
                    <button
                        onClick={handleTaskCompletion}
                        className="btn-primary flex items-center text-sm px-4 py-1.5"
                    >
                        {currentTaskIndex === tasks.length - 1 ? 'Finish' : 'Next'}
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>

            {showFeedback && (
                <TaskFeedback
                    onNext={handleProceed}
                    onRetry={() => setShowFeedback(false)}
                    isLastTask={currentTaskIndex === tasks.length - 1}
                />
            )}

            {/* Mobile Tab Switche (Visible only on small screens) */}
            <div className="flex md:hidden bg-white dark:bg-navy-light border-b border-gray-200 dark:border-slate-800 relative z-20">
                <button
                    onClick={() => setActiveTab('instructions')}
                    className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'instructions' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-500 dark:text-slate-400'}`}
                >
                    Instructions
                </button>
                <button
                    onClick={() => setActiveTab('workspace')}
                    className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'workspace' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-500 dark:text-slate-400'}`}
                >
                    Workspace
                </button>
            </div>

            {/* Main Content Split */}
            <div className="flex-grow flex overflow-hidden">
                {/* Left Panel: Instructions */}
                <div className={`${activeTab === 'instructions' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-1/3 bg-white dark:bg-navy-light border-r border-gray-200 dark:border-slate-800 overflow-y-auto p-4 sm:p-6`}>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 text-indigo-500" />
                        Instructions
                    </h2>
                    <div className="prose prose-sm prose-indigo text-gray-700 dark:text-slate-300">
                        <p className="mb-4">{currentTask.description}</p>

                        <div className="bg-blue-50 dark:bg-blue-500/10 border-l-4 border-blue-500 p-4 my-4 rounded">
                            <h4 className="text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-wide mb-1">Context</h4>
                            <p className="text-blue-800 dark:text-blue-200">{currentTask.context}</p>
                        </div>

                        {currentTask.hint && (
                            <div className="mt-6">
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    className="flex items-center text-indigo-600 dark:text-primary hover:text-indigo-700 font-medium text-sm transition-colors group"
                                >
                                    <HelpCircle className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform" />
                                    {showHint ? 'Hide Hint' : 'Need a Hint?'}
                                </button>

                                {showHint && (
                                    <div className="mt-3 p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="bg-amber-100 dark:bg-amber-500/20 p-1.5 rounded-lg">
                                            <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <p className="text-amber-900 dark:text-amber-200 text-sm leading-relaxed italic">
                                            {currentTask.hint}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {currentTask.type === 'multiple_choice' && (
                            <div className="space-y-3 mt-6">
                                {currentTask.options.map((opt, i) => (
                                    <label key={i} className="flex items-center p-3 border border-gray-200 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-navy transition-colors">
                                        <input type="radio" name="options" className="text-primary focus:ring-primary h-4 w-4" />
                                        <span className="ml-3 text-gray-700 dark:text-slate-300">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {/* Mobile specific navigation within panel */}
                        <div className="md:hidden mt-10">
                            <button
                                onClick={() => setActiveTab('workspace')}
                                className="w-full py-4 bg-navy dark:bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2"
                            >
                                <Play className="w-4 h-4" />
                                Open Workspace
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Workspace */}
                <div className={`${activeTab === 'workspace' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-2/3 bg-gray-900`}>
                    {/* Toolbar */}
                    <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                        <div className="flex space-x-2">
                            <span className="text-xs text-gray-400 font-mono">main.js</span>
                            {isExecuting && <span className="text-[10px] text-primary font-black uppercase animate-pulse">Running...</span>}
                            {saveStatus === 'saved' && <span className="text-[10px] text-green-400 font-black uppercase">Saved!</span>}
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleRun}
                                disabled={isExecuting}
                                className="text-xs flex items-center text-gray-300 hover:text-white bg-gray-700 px-2.5 py-1.5 rounded transition-colors disabled:opacity-50"
                            >
                                <Play className={`w-3 h-3 mr-1 ${isExecuting ? 'animate-spin' : ''}`} /> Run
                            </button>
                            <button
                                onClick={handleSave}
                                className="text-xs flex items-center text-gray-300 hover:text-white bg-gray-700 px-2.5 py-1.5 rounded transition-colors"
                            >
                                <Save className={`w-3 h-3 mr-1 ${saveStatus === 'saving' ? 'animate-bounce' : ''}`} /> {saveStatus === 'saved' ? 'Saved' : 'Save'}
                            </button>
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-grow relative">
                        {currentTask.type === 'multiple_choice' ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-6 text-center">
                                <HelpCircle className="w-12 h-12 mb-4 opacity-20" />
                                <p className="max-w-xs">This task is multiple choice. Select an option from the instructions panel on the left.</p>
                                <button
                                    onClick={() => setActiveTab('instructions')}
                                    className="md:hidden mt-6 text-primary font-bold hover:underline"
                                >
                                    Back to Instructions
                                </button>
                            </div>
                        ) : (
                            <textarea
                                className="w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
                                value={code || currentTask.code_snippet || ''}
                                onChange={(e) => setCode(e.target.value)}
                                spellCheck="false"
                                placeholder="// Type your solution here..."
                            />
                        )}
                    </div>

                    {/* Output Panel (Mock) */}
                    <div className="h-24 bg-black border-t border-gray-800 p-3 font-mono text-xs overflow-y-auto">
                        <div className="text-gray-500 mb-1">$ Console Output:</div>
                        {isExecuting ? (
                            <div className="text-gray-300">Compiling scripts...<br />Running tests...</div>
                        ) : saveStatus === 'saved' ? (
                            <div className="text-green-500">Progress saved to local instance successfully.</div>
                        ) : (
                            <div className="text-gray-600">Ready. Click &quot;Run&quot; to test your solution.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SimulationPage;
