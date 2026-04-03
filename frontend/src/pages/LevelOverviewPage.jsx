import { useNavigate, useParams, Link } from 'react-router-dom';
import { jobService, simulationService } from '../services/api';
import { ArrowLeft, Clock, CheckCircle, Lock, Play, ChevronRight, Lightbulb, XCircle, BarChart2, Shield, Puzzle, Layout, RotateCcw, Zap, Loader2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

const LevelOverviewPage = () => {
    const { jobId, level } = useParams();
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [job, setJob] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorType, setErrorType] = useState(null); // 'AUTH' or 'DATA'
    const [showProgressModal, setShowProgressModal] = useState(false);

    const normalizedLevel = useMemo(() =>
        level ? level.charAt(0).toUpperCase() + level.slice(1).toLowerCase() : 'Beginner',
        [level]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setErrorType(null);
                const [jobData, tasksData, simsData] = await Promise.all([
                    jobService.getJob(jobId),
                    jobService.getTasks(jobId, normalizedLevel),
                    simulationService.getSubmissions()
                ]);
                setJob(jobData);
                setTasks(tasksData);
                setSubmissions(simsData);
            } catch (error) {
                console.error("Error fetching level data:", error);
                if (error.response && error.response.status === 401) {
                    setErrorType('AUTH');
                } else {
                    setErrorType('DATA');
                    setJob(null);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [jobId, normalizedLevel]);

    const levelMap = {
        'Beginner': {
            number: 1,
            title: 'Debugging and Code Analysis',
            description: 'Apply your problem-solving skills to identify, diagnose, and repair system vulnerabilities and logic errors.',
            progress: 40,
            progressText: '2 of 5 mandatory tasks finished'
        },
        'Intermediate': {
            number: 2,
            title: 'Feature Development and Integration',
            description: 'Build robust features and connect services using modern web architecture and API standards.',
            progress: 50,
            progressText: '1 of 2 core tasks in progress'
        },
        'Professional': {
            number: 3,
            title: 'System Design & Collaboration',
            description: 'Architect robust infrastructures, design scalable microservices, and lead technical decision-making processes for high-load environments.',
            progress: 0,
            progressText: '0 of 1 core architecture finalized'
        }
    };

    const currentLevelInfo = levelMap[normalizedLevel] || levelMap['Beginner'];



    const getStatusStyles = (status) => {
        switch (status) {
            case 'COMPLETED':
                return 'border-slate-100 dark:border-slate-800 bg-white dark:bg-navy-light';
            case 'NEXT TASK':
                return 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/10 ring-1 ring-blue-500 ring-opacity-20 shadow-sm';
            case 'LOCKED':
                return 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-light/40 opacity-70';
            case 'IN PROGRESS':
                return 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/10 ring-1 ring-blue-500 ring-opacity-20';
            default:
                return 'border-slate-100 dark:border-slate-800 bg-white dark:bg-navy-light';
        }
    };

    const currentTasks = useMemo(() => {
        if (!tasks.length) return [];

        return tasks.map(task => {
            const submission = submissions.find(s => s.task_id === task.id);
            const isCompleted = !!submission;

            // Icons based on task type/number
            let Icon = Puzzle;
            if (task.number === 3) Icon = Shield;
            if (task.number === 4) Icon = Layout;
            if (isCompleted) Icon = CheckCircle;

            return {
                ...task,
                status: isCompleted ? 'COMPLETED' : 'LAUNCH',
                icon: <Icon className="w-6 h-6" />,
                iconBg: isCompleted ? "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-blue-100 dark:bg-blue-500/10 text-[#2563EB]",
                duration: task.level === 'Professional' ? '90m' : '15m',
                feedback: submission ? {
                    title: task.title,
                    score: submission.score,
                    strengths: ["Task successfully submitted and evaluated by AI"],
                    weaknesses: submission.score < 80 ? ["Review requirements and try again for a higher score"] : ["Keep up the good work"],
                    tip: "Persistence is key in engineering. Great job on completing this module."
                } : null
            };
        });
    }, [tasks, submissions]);

    const averageScore = useMemo(() => {
        if (!submissions.length) return 0;
        const totalScore = submissions.reduce((acc, sub) => acc + sub.score, 0);
        return Math.round(totalScore / submissions.length);
    }, [submissions]);


    return (
        <div className="animate-in fade-in duration-700">
            <div className="max-w-6xl mx-auto py-10 space-y-10">
                {/* Back Navigation */}
                <Link
                    to={job ? `/jobs/${job.id}` : "/jobs"}
                    className="inline-flex items-center text-slate-500 hover:text-primary transition-colors font-medium text-sm group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    {job ? `Back to ${job.title} Role` : "Back to Jobs"}
                </Link>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="max-w-3xl space-y-4">
                        {normalizedLevel === 'Professional' && (
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 shadow-sm">
                                PROFESSIONAL TIER
                            </span>
                        )}
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Level {currentLevelInfo.number}: {currentLevelInfo.title}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
                            {currentLevelInfo.description}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowProgressModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-navy-light border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all text-sm font-bold text-slate-700 dark:text-slate-200"
                    >
                        {normalizedLevel === 'Professional' ? <BarChart2 className="w-4 h-4" /> : <BarChart2 className="w-4 h-4" />}
                        {normalizedLevel === 'Professional' ? 'Expert Scorecard' : 'View Progress'}
                    </button>
                </div>

                {/* Progress Card */}
                <div className="bg-white dark:bg-navy-light rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                {normalizedLevel === 'Professional' ? 'Senior Certification Progress' : `Level ${currentLevelInfo.number} Completion`}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                {currentTasks.filter(t => t.status === 'COMPLETED').length} of {currentTasks.length} mandatory tasks finished
                            </p>
                        </div>
                        <span className="text-3xl font-black text-[#2563EB]">
                            {currentTasks.length ? Math.round((currentTasks.filter(t => t.status === 'COMPLETED').length / currentTasks.length) * 100) : 0}%
                        </span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-navy rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#2563EB] rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${currentTasks.length ? (currentTasks.filter(t => t.status === 'COMPLETED').length / currentTasks.length) * 100 : 0}%` }}
                        />
                    </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {normalizedLevel === 'Professional' ? 'Final Evaluation Task' : 'Available Tasks'}
                    </h2>

                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Sourcing simulation tasks...</p>
                            </div>
                        ) : errorType === 'AUTH' ? (
                            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-8 rounded-[32px] text-center flex flex-col items-center gap-4">
                                <Shield className="w-12 h-12 text-red-500" />
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-navy dark:text-white">Session Expired</h3>
                                    <p className="text-sm text-slate-500 max-w-sm mx-auto">Please sign in to access these tasks and track your performance.</p>
                                </div>
                                <Link to="/login" className="btn-primary px-8 py-2.5">Login Now</Link>
                            </div>
                        ) : !currentTasks.length ? (
                            <div className="bg-gray-50 dark:bg-navy-light/30 border border-dashed border-gray-200 dark:border-slate-800 p-12 rounded-[32px] text-center flex flex-col items-center gap-4">
                                <Puzzle className="w-12 h-12 text-slate-300" />
                                <p className="text-slate-500 font-medium">No tasks found for this level variant.</p>
                            </div>
                        ) : (
                            currentTasks.slice(0, 3).map((task) => (
                                <div key={task.id} className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all ${getStatusStyles(task.status)}`}>
                                    <div className="flex items-start md:items-center gap-6">
                                        <div className={`${task.iconBg} p-4 rounded-xl shrink-0`}>
                                            {task.icon}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{task.title}</h3>
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest italic border ${task.status === 'COMPLETED' ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-green-200/50 dark:border-green-500/30' :
                                                    task.status === 'NEXT TASK' ? 'bg-blue-100 dark:bg-blue-500/20 text-[#2563EB] border-blue-200/50 dark:border-blue-500/30' :
                                                        task.status === 'IN PROGRESS' ? 'bg-blue-100 dark:bg-blue-500/20 text-[#2563EB] border-blue-200/50 dark:border-blue-500/30' :
                                                            'bg-slate-100 dark:bg-navy text-slate-400 border-slate-200/50 dark:border-slate-800'
                                                    }`}>
                                                    {task.status}
                                                </span>
                                            </div>
                                            {task.tags && (
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {task.tags.map(tag => (
                                                        <span key={tag} className="text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] border border-blue-100 dark:border-blue-800">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{task.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                                        <div className={`flex items-center gap-1.5 text-[10px] font-bold ${normalizedLevel === 'Professional' ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'}`}>
                                            <Clock className={`w-3 h-3 ${task.status === 'Professional' ? 'fill-blue-500/20' : ''}`} />
                                            {task.duration}
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                                            {task.status === 'COMPLETED' ? (
                                                <>
                                                    <button
                                                        onClick={() => setSelectedFeedback(task.feedback)}
                                                        className="px-6 py-2 bg-slate-100 dark:bg-navy text-slate-500 dark:text-slate-400 font-bold rounded-xl text-xs sm:text-sm opacity-80 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                                                    >
                                                        Review Feedback
                                                    </button>
                                                    <Link
                                                        to={task.number === 2 ? `/simulation/${job.id}/${normalizedLevel}/explanation` : task.number === 3 ? `/simulation/${job.id}/${normalizedLevel}/sanitize` : task.number === 4 ? `/simulation/${job.id}/${normalizedLevel}/todo-feature` : task.number === 5 ? `/simulation/${job.id}/${normalizedLevel}/rest-api` : task.number === 6 ? `/simulation/${job.id}/${normalizedLevel}/db-simulation` : task.number === 7 || task.id === 't7_sys_design' ? `/simulation/${job.id}/${normalizedLevel}/system-design` : `/simulation/${job.id}/${normalizedLevel}`}
                                                        className="flex items-center justify-center gap-2 px-6 py-2 bg-white dark:bg-navy-light text-primary border border-primary/20 hover:border-primary/50 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-sm"
                                                    >
                                                        <RotateCcw className="w-3 h-3" />
                                                        Retry Task
                                                    </Link>
                                                </>
                                            ) : task.status === 'IN PROGRESS' ? (
                                                <Link
                                                    to={task.number === 2 ? `/simulation/${job.id}/${normalizedLevel}/explanation` : task.number === 3 ? `/simulation/${job.id}/${normalizedLevel}/sanitize` : task.number === 4 ? `/simulation/${job.id}/${normalizedLevel}/todo-feature` : task.number === 5 ? `/simulation/${job.id}/${normalizedLevel}/rest-api` : task.number === 6 ? `/simulation/${job.id}/${normalizedLevel}/db-simulation` : task.number === 7 || task.id === 't7_sys_design' ? `/simulation/${job.id}/${normalizedLevel}/system-design` : `/simulation/${job.id}/${normalizedLevel}`}
                                                    className="w-full md:w-auto px-8 py-3 bg-[#2563EB] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-600 transition-all hover:scale-[1.02] active:scale-95 text-center"
                                                >
                                                    Continue Task
                                                </Link>
                                            ) : task.status === 'LOCKED' ? (
                                                <button disabled className="w-full md:w-auto px-8 py-2.5 bg-slate-100 dark:bg-navy text-slate-400 dark:text-slate-600 rounded-xl font-bold text-xs md:text-sm cursor-not-allowed flex items-center justify-center gap-2">
                                                    <Lock className="w-3 h-3" />
                                                    Launch
                                                </button>
                                            ) : (
                                                <Link
                                                    to={task.number === 2 ? `/simulation/${job.id}/${normalizedLevel}/explanation` : task.number === 3 ? `/simulation/${job.id}/${normalizedLevel}/sanitize` : task.number === 4 ? `/simulation/${job.id}/${normalizedLevel}/todo-feature` : task.number === 5 ? `/simulation/${job.id}/${normalizedLevel}/rest-api` : task.number === 6 ? `/simulation/${job.id}/${normalizedLevel}/db-simulation` : task.number === 7 || task.id === 't7_sys_design' ? `/simulation/${job.id}/${normalizedLevel}/system-design` : `/simulation/${job.id}/${normalizedLevel}`}
                                                    className="w-full md:w-auto px-8 py-3 bg-[#2563EB] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-600 transition-all hover:scale-[1.02] active:scale-95 text-center"
                                                >
                                                    Launch Task
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Additional Sections (Skills & Tip) - Preserving but styling to match Reference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-navy-light p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Skills Targeted</h3>
                        <div className="flex flex-wrap gap-2">
                            {['TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Problem Solving'].map(skill => (
                                <span key={skill} className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-[#2563EB] rounded-lg text-xs font-bold border border-blue-100/50 dark:border-blue-800">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#1E293B] dark:bg-navy-light p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-10 -mt-10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Lightbulb className="w-5 h-5 text-[#2563EB] fill-[#2563EB]/20" />
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Pro Tip</h3>
                            </div>
                            <p className="text-slate-300 dark:text-slate-400 text-sm leading-relaxed font-medium">
                                Read the requirements document for the final task carefully. Most students fail by not handling the join table constraints correctly in the database schema.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Section - Restored to ensure no items are removed */}
                <div className="bg-white dark:bg-navy-light p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ready to advance?</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium italic text-sm">
                            {normalizedLevel === 'Beginner' ? 'Finish all tasks in this level to unlock the Intermediate tier.' :
                                normalizedLevel === 'Intermediate' ? 'Complete your remaining tasks to qualify for the Professional tier.' :
                                    'Finalize your expert evaluation to earn your Senior Developer Certification.'}
                        </p>
                    </div>
                    <button className="px-10 py-4 bg-[#2563EB] text-white rounded-2xl font-black text-sm hover:bg-blue-600 transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20">
                        Learn More About JOB TRAIL SIMULATOR
                    </button>
                </div>
            </div>

            {/* Progress Modal */}
            {showProgressModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-navy-light w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col max-h-[90vh]">
                        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto custom-scrollbar">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary italic mb-2">Detailed Report</h3>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Level Progress</h2>
                                </div>
                                <button
                                    onClick={() => setShowProgressModal(false)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <XCircle className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex flex-col items-center justify-center gap-2">
                                    <span className="text-3xl font-black text-[#2563EB]">
                                        {currentTasks.length ? Math.round((currentTasks.filter(t => t.status === 'COMPLETED').length / currentTasks.length) * 100) : 0}%
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Completion</span>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-900/30 flex flex-col items-center justify-center gap-2">
                                    <span className="text-3xl font-black text-green-600 dark:text-green-400">
                                        {currentTasks.filter(t => t.status === 'COMPLETED').length}/{currentTasks.length}
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Tasks Done</span>
                                </div>
                                <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex flex-col items-center justify-center gap-2">
                                    <span className="text-3xl font-black text-amber-600 dark:text-amber-400">
                                        {averageScore}%
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Avg. Score</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <BarChart2 className="w-4 h-4 text-primary" />
                                    Task Breakdown
                                </h3>
                                <div className="space-y-3">
                                    {currentTasks.map(task => {
                                        const submission = submissions.find(s => s.task_id === task.id);
                                        return (
                                            <div key={task.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-navy border border-slate-100 dark:border-slate-800">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 rounded-lg ${task.status === 'COMPLETED' ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' :
                                                        'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                                                        }`}>
                                                        {task.status === 'COMPLETED' ? <CheckCircle className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{task.title}</h4>
                                                        <p className="text-xs text-slate-500 font-medium">{task.duration} • {task.status}</p>
                                                    </div>
                                                </div>
                                                {task.status === 'COMPLETED' ? (
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-lg font-black text-slate-900 dark:text-white">{submission?.score || 0}%</span>
                                                        <span className="text-[10px] font-bold text-green-500">PASSED</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-navy/50">
                            <button
                                onClick={() => setShowProgressModal(false)}
                                className="w-full py-3 bg-slate-900 dark:bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-[0.98]"
                            >
                                Close Report
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Modal - Preserving functionality */}
            {selectedFeedback && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-navy-light w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary italic mb-2">Review Feedback</h3>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">{selectedFeedback.title}</h2>
                                </div>
                                <div className="bg-primary/10 text-primary px-4 py-2 rounded-2xl flex flex-col items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Score</span>
                                    <span className="text-xl font-black">{selectedFeedback.score}%</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-500 mb-3">
                                        <CheckCircle className="w-4 h-4" /> Key Strengths
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedFeedback.strengths.map((s, i) => (
                                            <li key={i} className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-start gap-3">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-500 mb-3">
                                        <XCircle className="w-4 h-4" /> To Improve
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedFeedback.weaknesses.map((w, i) => (
                                            <li key={i} className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-start gap-3">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                                {w}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-indigo-50 dark:bg-navy p-5 rounded-2xl border border-indigo-100/50 dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <Lightbulb className="w-4 h-4 text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Instructor Tip</span>
                                </div>
                                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                    &quot;{selectedFeedback.tip}&quot;
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedFeedback(null)}
                                className="w-full py-4 bg-slate-900 dark:bg-primary text-white rounded-2xl font-black text-sm hover:opacity-90 transition-all active:scale-[0.98]"
                            >
                                Close Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LevelOverviewPage;

