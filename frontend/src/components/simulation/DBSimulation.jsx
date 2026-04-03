import React, { useState, useEffect } from 'react';
import {
    Clock,
    Database,
    Code2,
    Table,
    Layout,
    Settings,
    Play,
    Save,
    CheckCircle2,
    Search,
    Share2,
    HelpCircle,
    Terminal,
    FileCode,
    GitBranch,
    ShieldCheck,
    Zap,
    ChevronRight,
    Plus,
    Box,
    Maximize2
} from 'lucide-react';

const DBSimulation = ({ currentTask, handleNext }) => {
    const [activeTab, setActiveTab] = useState('schema');
    const [timeLeft, setTimeLeft] = useState(currentTask.time_limit || 3600);
    const [sqlQuery, setSqlQuery] = useState('-- Schema Refactoring Task\nALTER TABLE orders\nADD COLUMN tracking_id VARCHAR(255),\nADD CONSTRAINT fk_tracking\nFOREIGN KEY (tracking_id) REFERENCES shipping(id);');

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
        return `${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-screen flex flex-col bg-[#020617] text-slate-300 font-sans transition-colors overflow-hidden">
            {/* Database Console Header */}
            <header className="h-14 bg-[#0F172A] border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-50">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 pr-6 border-r border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                            <Database className="w-5 h-5" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xs font-black text-white uppercase tracking-wider">DBA_Console.sh</h1>
                            <p className="text-[9px] text-sky-400 font-bold mt-0.5 tracking-widest uppercase">Production Instance</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] font-bold">
                        <button
                            onClick={() => setActiveTab('schema')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${activeTab === 'schema' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Box className="w-3.5 h-3.5" />
                            Model Designer
                        </button>
                        <button
                            onClick={() => setActiveTab('query')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${activeTab === 'query' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Terminal className="w-3.5 h-3.5" />
                            SQL Shell
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center bg-black/40 px-3 py-1.5 rounded-lg text-slate-400 font-mono border border-white/5 ring-1 ring-white/10">
                        <Clock className="w-3.5 h-3.5 mr-2.5 text-sky-400" />
                        <span className="text-[11px] font-bold tracking-widest">{formatTime(timeLeft)}</span>
                    </div>

                    <div className="h-6 w-px bg-white/10"></div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20">
                            <ShieldCheck className="w-3 h-3" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Secure Mode</span>
                        </div>
                        <button
                            onClick={handleNext}
                            className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-5 py-2 rounded-lg font-bold text-[11px] shadow-lg shadow-sky-500/20 transition-all active:scale-95 flex items-center gap-2"
                        >
                            <Save className="w-3.5 h-3.5" />
                            Deploy Changes
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">
                {/* Left: Explorer Sidebar */}
                <aside className="w-64 bg-[#0B0E14] border-r border-white/5 flex flex-col shrink-0">
                    <div className="p-4 border-b border-white/5">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 group-focus-within:text-sky-400 transition-colors" />
                            <input
                                className="w-full bg-white/5 border border-white/5 rounded-md py-1.5 pl-8 pr-3 text-[10px] focus:outline-none focus:ring-1 ring-sky-500/50 transition-all"
                                placeholder="Schema Search..."
                            />
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4 space-y-6 custom-scrollbar">
                        <div>
                            <h2 className="text-[9px] font-black text-slate-600 uppercase tracking-[2px] mb-4 pl-2">Object Explorer</h2>
                            <nav className="space-y-1">
                                {[
                                    { icon: <Database className="w-3.5 h-3.5" />, label: 'core_production', color: 'text-sky-400' },
                                    { icon: <Table className="w-3.5 h-3.5 text-slate-500" />, label: 'users', indent: true },
                                    { icon: <Table className="w-3.5 h-3.5 text-slate-500" />, label: 'orders', indent: true },
                                    { icon: <Table className="w-3.5 h-3.5 text-slate-500" />, label: 'products', indent: true },
                                    { icon: <Table className="w-3.5 h-3.5 text-slate-500" />, label: 'payments', indent: true },
                                    { icon: <GitBranch className="w-3.5 h-3.5 text-slate-500" />, label: 'Stored Procedures' },
                                    { icon: <Zap className="w-3.5 h-3.5 text-slate-500" />, label: 'Triggers' },
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all hover:bg-white/5 group ${item.indent ? 'ml-6' : ''}`}>
                                        <div className={item.color || 'text-slate-500 group-hover:text-slate-300'}>{item.icon}</div>
                                        <span className={`text-[11px] font-medium ${item.indent ? 'text-slate-500' : 'text-slate-400'} group-hover:text-slate-200`}>{item.label}</span>
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="p-4 border-t border-white/5 bg-black/20">
                        <div className="flex items-center justify-between text-[9px] font-black text-slate-600 uppercase mb-3">
                            <span>Connection Health</span>
                            <span className="text-emerald-500">99.8%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[99.8%] bg-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                        </div>
                    </div>
                </aside>

                {/* Main Workspace */}
                <main className="flex-grow flex flex-col overflow-hidden relative">
                    {activeTab === 'schema' ? (
                        /* High-Fidelity Schema Builder */
                        <div className="flex-grow flex flex-col p-8 gap-8 overflow-y-auto bg-sim-bg custom-scrollbar">
                            <div className="flex items-center justify-between relative z-10">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">ERD Visual Designer</h2>
                                    <p className="text-xs text-slate-500 font-medium">Map out relationships and manage constraints visually.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 group transition-all">
                                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                                    </button>
                                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400"><Maximize2 className="w-4 h-4" /></button>
                                </div>
                            </div>

                            <div className="flex-grow relative border border-white/5 bg-[#0B0E14] rounded-3xl overflow-hidden shadow-2xl group min-h-[500px]">
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #0EA5E9 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                                {/* Table Nodes */}
                                <div className="absolute top-20 left-20 w-56 bg-[#1E293B] rounded-2xl border-2 border-sky-500/50 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20">
                                    <div className="bg-sky-500/10 px-4 py-2.5 border-b border-sky-500/20 flex justify-between items-center rounded-t-[14px]">
                                        <span className="text-[11px] font-black text-white uppercase tracking-widest">Orders</span>
                                        <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
                                    </div>
                                    <div className="p-4 space-y-3 font-mono">
                                        {[
                                            { name: 'order_id', type: 'UUID', key: 'PK' },
                                            { name: 'user_id', type: 'UUID', key: 'FK' },
                                            { name: 'status', type: 'VARCHAR' },
                                            { name: 'total', type: 'DECIMAL' },
                                        ].map((col, i) => (
                                            <div key={i} className="flex justify-between items-center text-[10px]">
                                                <div className="flex items-center gap-2">
                                                    <span className={col.key === 'PK' ? 'text-sky-400' : col.key === 'FK' ? 'text-amber-400' : 'text-slate-300'}>{col.name}</span>
                                                </div>
                                                <span className="text-slate-600 italic uppercase">{col.type} {col.key && `(${col.key})`}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="absolute top-48 left-[400px] w-56 bg-[#0F172A] rounded-2xl border border-white/10 p-1 shadow-2xl z-10 transition-transform hover:scale-105 duration-300">
                                    <div className="bg-white/5 px-4 py-2.5 border-b border-white/10 flex justify-between items-center rounded-t-[14px] text-[11px] font-black text-white uppercase tracking-widest">
                                        Users
                                    </div>
                                    <div className="p-4 space-y-3 font-mono opacity-60">
                                        {[
                                            { name: 'user_id', type: 'UUID', key: 'PK' },
                                            { name: 'email', type: 'VARCHAR' },
                                            { name: 'role', type: 'ENUM' },
                                            { name: 'bio', type: 'TEXT' },
                                        ].map((col, i) => (
                                            <div key={i} className="flex justify-between items-center text-[10px]">
                                                <span className={col.key === 'PK' ? 'text-sky-400' : 'text-slate-300'}>{col.name}</span>
                                                <span className="text-slate-600 italic uppercase">{col.type} {col.key && `(${col.key})`}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* SVG Connections */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <defs>
                                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0EA5E9" />
                                        </marker>
                                    </defs>
                                    <path d="M 280 120 C 350 120, 350 210, 400 210" stroke="#0EA5E9" strokeWidth="2" fill="none" strokeDasharray="6 4" opacity="0.4" markerEnd="url(#arrow)" />
                                </svg>

                                <div className="absolute bottom-6 right-8 flex gap-3">
                                    <div className="bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-2xl ring-1 ring-white/5">
                                        <zap className="w-3.5 h-3.5 text-amber-500" />
                                        <span className="text-slate-400">Auto-Fix Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* High-Fidelity SQL Terminal */
                        <div className="flex-grow flex flex-col p-8 gap-6 overflow-hidden bg-[#0B0E14]">
                            <div className="flex-grow flex flex-col bg-black/40 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                                <div className="px-6 py-3 border-b border-white/5 bg-white/[0.02] flex justify-between items-center transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="flex gap-1.5 focus-within:opacity-100 opacity-60 transition-opacity">
                                            <div className="w-3 h-3 rounded-full bg-red-500 border border-red-900/50"></div>
                                            <div className="w-3 h-3 rounded-full bg-amber-500 border border-amber-900/50"></div>
                                            <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-900/50"></div>
                                        </div>
                                        <div className="h-4 w-px bg-white/10"></div>
                                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">query_workspace_v1.sql</span>
                                    </div>
                                    <button
                                        className="flex items-center gap-2 px-5 py-2 bg-sky-500 text-white rounded-lg text-[11px] font-black shadow-lg shadow-sky-500/30 transition-all hover:scale-105 active:scale-95"
                                    >
                                        <Play className="w-3.5 h-3.5 fill-current" /> Execute Query
                                    </button>
                                </div>
                                <div className="flex-grow flex p-6 font-mono text-sm">
                                    <div className="w-12 text-slate-700 select-none text-right pr-6 border-r border-white/5 leading-7">
                                        {[...Array(12)].map((_, i) => <div key={i}>{i + 1}</div>)}
                                    </div>
                                    <textarea
                                        value={sqlQuery}
                                        onChange={(e) => setSqlQuery(e.target.value)}
                                        className="flex-grow bg-transparent p-0 pl-6 text-sky-400 focus:outline-none resize-none leading-7 h-full custom-scrollbar"
                                    />
                                </div>
                            </div>

                            <div className="h-64 bg-black/40 rounded-3xl border border-white/5 flex flex-col overflow-hidden shadow-xl">
                                <div className="px-6 py-3 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[2px] flex items-center gap-2">
                                        <FileCode className="w-4 h-4" /> Console Output
                                    </h3>
                                    <div className="flex items-center gap-4 text-[10px] text-slate-600 font-bold">
                                        <span>Affected: 124 rows</span>
                                        <span>Time: 0.004s</span>
                                    </div>
                                </div>
                                <div className="p-6 overflow-auto custom-scrollbar font-mono text-[11px] space-y-2">
                                    <p className="text-emerald-500">[SUCCESS] Query executed successfully.</p>
                                    <p className="text-slate-500">Connecting to node_01... Done.</p>
                                    <p className="text-slate-500 font-bold italic underline">Refactoring integrity check: 100% complete.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Integrated Reflection Panel */}
                    <div className="mx-8 mb-8 bg-[#0F172A] border border-white/10 rounded-2xl p-8 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-sky-500/10 transition-all duration-700"></div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-2.5 bg-sky-500/10 rounded-xl"><HelpCircle className="w-5 h-5 text-sky-400" /></div>
                            <div>
                                <h4 className="text-sm font-black text-white uppercase tracking-wider">Architectural Reasoning</h4>
                                <p className="text-[10px] text-slate-500 font-medium">Explain your database design decisions for this task.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Design Goal</label>
                                <textarea
                                    className="w-full bg-black/40 rounded-2xl border border-white/5 p-4 text-xs text-slate-300 focus:outline-none focus:ring-1 ring-sky-500/50 resize-none min-h-[100px] transition-all"
                                    placeholder="What was the main purpose of this schema change?"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Optimization Logic</label>
                                <textarea
                                    className="w-full bg-black/40 rounded-2xl border border-white/5 p-4 text-xs text-slate-300 focus:outline-none focus:ring-1 ring-sky-500/50 resize-none min-h-[100px] transition-all"
                                    placeholder="How did you ensure data integrity and performance?"
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                    height: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
};

export default DBSimulation;
