import React, { useState, useEffect } from 'react';
import {
    Clock,
    ShieldAlert,
    Bug,
    Terminal,
    AlertTriangle,
    CheckCircle2,
    RefreshCw,
    HelpCircle,
    Send,
    Activity,
    Search,
    Filter,
    Layout,
    Eye,
    Code,
    Server,
    Settings,
    ChevronDown,
    Flag,
    Zap
} from 'lucide-react';

const QASimulation = ({ currentTask, handleNext }) => {
    const [timeLeft, setTimeLeft] = useState(currentTask.time_limit || 2400);
    const [qualityScore] = useState(82);

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
            {/* QA Control Center Header */}
            <header className="h-16 bg-[#0F172A] border-b border-white/5 flex items-center justify-between px-8 shrink-0 z-50 shadow-2xl">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 pr-8 border-r border-white/10">
                        <div className="w-10 h-10 rounded-xl bg-sim-teal flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-white uppercase tracking-wider">TestOps.Internal</h1>
                            <p className="text-[9px] text-sim-teal font-bold mt-0.5 tracking-[0.2em] uppercase">Core Integration Lab</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="flex items-center bg-black/40 px-4 py-2 rounded-xl text-slate-400 font-mono border border-white/5 ring-1 ring-white/5">
                            <Clock className="w-4 h-4 mr-3 text-sim-teal" />
                            <span className="text-sm font-bold tracking-tight">{formatTime(timeLeft)}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Integrity</p>
                                <p className="text-lg font-black text-sim-teal tracking-tighter">{qualityScore}%</p>
                            </div>
                            <div className="w-12 h-12 relative flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90 absolute">
                                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-white/5" />
                                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * qualityScore) / 100} className="text-sim-teal drop-shadow-[0_0_8px_rgba(13,147,165,0.5)]" />
                                </svg>
                                <CheckCircle2 className="w-4 h-4 text-sim-teal/50" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
                        <Activity className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Environment stable</span>
                    </div>
                    <button
                        onClick={handleNext}
                        className="bg-sim-teal hover:bg-teal-600 text-white px-6 py-2.5 rounded-xl font-black text-[11px] shadow-lg shadow-teal-500/20 transition-all active:scale-95 flex items-center gap-2 uppercase tracking-widest"
                    >
                        Push to Prod <Send className="w-3.5 h-3.5" />
                    </button>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">
                {/* Main: Targeted System View */}
                <main className="flex-grow flex flex-col p-8 gap-6 overflow-y-auto relative bg-[#020617] custom-scrollbar">
                    {/* Visual Interface Grid Backdrop */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0D93A5 1px, transparent 1px), linear-gradient(90deg, #0D93A5 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>

                    <div className="flex items-center justify-between relative z-10 mb-2">
                        <div className="flex items-center gap-3">
                            <Layout className="w-4 h-4 text-slate-500" />
                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[3px]">Staging Workspace / Customer_Dashboard_v3</h2>
                        </div>
                        <div className="flex gap-1.5 px-3 py-1 bg-black/40 rounded-full border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        </div>
                    </div>

                    {/* Highly Professional Mock UI Under Test */}
                    <div className="bg-[#0F172A] rounded-[32px] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex-grow flex flex-col overflow-hidden relative z-10 group/app transition-all">
                        {/* Mock App Header */}
                        <div className="h-16 px-8 border-b border-white/5 bg-white/[0.02] flex items-center gap-12 shrink-0">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                            </div>
                            <div className="h-4 w-px bg-white/10"></div>
                            <nav className="flex gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
                                <span className="text-white border-b-2 border-sim-teal pb-1">Analytics</span>
                                <span>Vault</span>
                                <span className="relative">
                                    Connections
                                    <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                </span>
                            </nav>
                            <div className="ml-auto flex items-center gap-4">
                                <div className="w-32 h-8 bg-black/40 rounded-lg border border-white/5 px-3 flex items-center text-[10px] text-slate-600 font-mono italic">
                                    Search instances...
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sim-teal to-blue-600 border border-white/10"></div>
                            </div>
                        </div>

                        {/* Mock App Content with "Bugs" */}
                        <div className="p-10 space-y-12 flex-grow overflow-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-black/40 p-8 rounded-3xl border border-white/5 relative group transition-all hover:border-red-500/50 cursor-pointer overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-red-500/20 transition-all"></div>
                                    <div className="absolute top-4 right-4 text-red-500/0 group-hover:text-red-500/60 transition-all font-mono text-[9px] font-black uppercase tracking-widest">Issue Logged</div>

                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Instance Revenue</p>
                                    <p className="text-3xl font-black text-white mb-2">$99,999,999.00</p>
                                    <p className="text-[10px] font-mono text-red-400 italic bg-red-500/10 px-2 py-1 rounded inline-block">critical_error: overflow_exception_0x221</p>
                                </div>

                                <div className="bg-black/40 p-8 rounded-3xl border border-white/5 relative group transition-all hover:border-sim-teal/50 cursor-pointer overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-sim-teal/10 rounded-full blur-2xl -mr-12 -mt-12 transition-all"></div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Processing Nodes</p>
                                    <p className="text-3xl font-black text-white mb-4">48 / 64</p>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[75%] bg-sim-teal shadow-[0_0_12px_rgba(13,147,165,0.6)]"></div>
                                    </div>
                                </div>

                                <div className="bg-black/40 p-8 rounded-3xl border border-white/5 relative group transition-all hover:border-amber-500/50 cursor-pointer overflow-hidden group/bug">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-12 -mt-12 transition-all"></div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">System Latency</p>
                                    <div className="flex items-end gap-3 mb-2">
                                        <p className="text-3xl font-black text-white">12ms</p>
                                        <p className="text-[11px] font-black text-emerald-500 pb-1">OPTIMIZED</p>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className={`h-4 w-1 rounded-full ${i > 15 ? 'bg-amber-500 animate-pulse' : 'bg-sim-teal/20'}`}></div>
                                        ))}
                                    </div>
                                    <div className="absolute inset-0 bg-transparent border-2 border-transparent group-hover/bug:border-amber-500 group-hover/bug:border-dashed transition-all pointer-events-none rounded-3xl"></div>
                                </div>
                            </div>

                            <div className="bg-black/40 rounded-3xl border border-white/5 overflow-hidden flex flex-col">
                                <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Server className="w-4 h-4 text-slate-500" />
                                        <span className="text-[11px] font-black text-white uppercase tracking-widest">Active System Logs</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
                                    </div>
                                </div>
                                <table className="w-full text-left text-[11px]">
                                    <thead className="bg-[#111827] text-slate-500 font-black uppercase tracking-widest">
                                        <tr>
                                            <th className="px-8 py-4">Trace_ID</th>
                                            <th className="px-8 py-4">Event Source</th>
                                            <th className="px-8 py-4">Security Level</th>
                                            <th className="px-8 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-slate-400 font-medium">
                                        {[
                                            { id: 'TRX_8892', source: 'Auth_Endpoint', level: 'SECURE', color: 'text-emerald-500' },
                                            { id: 'TRX_8893', source: '{{UNDEFINED_ENTITY}}', level: 'UNKNOWN', color: 'text-red-400 font-black italic underline decoration-wavy' },
                                            { id: 'TRX_8894', source: 'Data_Sync_Node', level: 'CAUTION', color: 'text-amber-500' },
                                            { id: 'TRX_8895', source: 'Gateway_Primary', level: 'SECURE', color: 'text-emerald-500' },
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                                <td className="px-8 py-4 font-mono text-[10px] text-slate-600">{row.id}</td>
                                                <td className={`px-8 py-4 ${row.color}`}>{row.source}</td>
                                                <td className="px-8 py-4">
                                                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-[1.5px] border ${row.level === 'SECURE' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' : row.level === 'UNKNOWN' ? 'border-red-500/40 text-red-500 bg-red-500/10' : 'border-amber-500/20 text-amber-500 bg-amber-500/5'}`}>
                                                        {row.level}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    <button className="px-3 py-1.5 bg-white/5 hover:bg-sim-teal hover:text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all">Inspect</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* App Status Bar */}
                        <div className="h-10 px-8 bg-black/40 border-t border-white/5 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-600">
                            <div className="flex gap-6">
                                <span>Engine: <span className="text-emerald-500">Normal</span></span>
                                <span>SSL: <span className="text-sim-teal">V3.4 Active</span></span>
                            </div>
                            <span>Workspace UID: FF-992-QA</span>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar: Bug Reporting Engine */}
                <aside className="w-[480px] bg-[#0F172A] border-l border-white/10 flex flex-col p-8 gap-8 transition-colors relative shadow-2xl overflow-hidden shrink-0">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sim-teal to-blue-600"></div>

                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                                <Bug className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tight">Report Engine</h2>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Log technical vulnerabilities with precision. Each valid bug increases your quality audit score.</p>
                    </div>

                    <div className="flex-grow space-y-8 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Bug signature</label>
                                <span className="text-[9px] font-mono text-slate-700">UID: BUG-TRX-AUTO</span>
                            </div>
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 transition-all focus-within:ring-2 ring-sim-teal/20">
                                <textarea className="w-full bg-transparent text-xs text-slate-200 focus:outline-none resize-none placeholder:text-slate-800" rows="3" placeholder="Define the failure point in the architecture..." />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Step-by-Step Reproduction</label>
                            <div className="space-y-3">
                                {[
                                    { step: 'Init system diagnostics', icon: <ChevronDown className="w-3 h-3" /> },
                                    { step: 'Access Dashboard node #4', icon: <ChevronDown className="w-3 h-3" /> },
                                    { step: 'Validate variable sanitization', icon: <ChevronDown className="w-3 h-3" /> }
                                ].map((s, i) => (
                                    <div key={i} className="flex gap-4 items-center p-3 bg-black/20 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                        <span className="w-6 h-6 flex items-center justify-center bg-white/5 rounded text-[10px] font-black text-slate-700 font-mono italic">{i + 1}</span>
                                        <p className="text-[11px] text-slate-400 font-medium flex-grow">{s.step}</p>
                                        <div className="text-slate-700">{s.icon}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Priority</label>
                                <button className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 flex justify-between items-center text-[10px] font-black uppercase text-red-500 tracking-widest hover:bg-black/60 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Flag className="w-3.5 h-3.5 fill-current" /> Critical
                                    </div>
                                    <ChevronDown className="w-3 h-3 text-slate-700" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Platform</label>
                                <button className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 flex justify-between items-center text-[10px] font-black uppercase text-sky-400 tracking-widest hover:bg-black/60 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Terminal className="w-3.5 h-3.5" /> Staging_01
                                    </div>
                                    <ChevronDown className="w-3 h-3 text-slate-700" />
                                </button>
                            </div>
                        </div>

                        <button className="w-full bg-sim-teal hover:bg-teal-600 text-white py-5 rounded-2xl font-black text-xs shadow-xl shadow-teal-500/20 transition-all flex items-center justify-center gap-4 active:scale-[0.98] uppercase tracking-[0.2em] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative">Submit Security Report</span>
                            <Zap className="w-4 h-4 fill-current relative" />
                        </button>

                        <div className="space-y-6 pt-10 border-t border-white/5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-black text-slate-700 uppercase tracking-[3px]">Audit Log (4)</h3>
                                <RefreshCw className="w-3.5 h-3.5 text-slate-800 cursor-pointer hover:rotate-180 transition-transform duration-500" />
                            </div>
                            <div className="space-y-3">
                                {[
                                    { title: 'Integer Overflow Leak', loc: 'Module: Dashboard#Finance', sev: 'CRITICAL', col: 'text-red-500', bg: 'bg-red-500/5' },
                                    { title: 'DOM Sanitization Failure', loc: 'Module: User_Input_Handler', sev: 'HIGH', col: 'text-amber-500', bg: 'bg-amber-500/5' },
                                    { title: 'Visual Contrast Violation', loc: 'Component: Profile_Card', sev: 'LOW', col: 'text-sky-500', bg: 'bg-sky-500/5' }
                                ].map((bug, i) => (
                                    <div key={i} className={`p-4 rounded-2xl border border-white/5 flex items-center justify-between group cursor-help transition-all hover:border-white/20 ${bug.bg}`}>
                                        <div className="space-y-1">
                                            <p className="text-[11px] font-black text-white/90 uppercase tracking-tight">{bug.title}</p>
                                            <p className="text-[9px] text-slate-600 truncate w-48 font-medium">{bug.loc}</p>
                                        </div>
                                        <div className={`text-[8px] font-black tracking-widest py-1 px-2 rounded-md border border-current opacity-60 ${bug.col}`}>{bug.sev}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Activity Feed Static */}
                    <div className="mt-8 p-5 bg-white/[0.02] rounded-2xl border border-white/5 flex items-center gap-4 group cursor-pointer transition-colors hover:bg-white/5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <p className="text-[10px] font-bold text-slate-500">Node_QA_Central: Heartbeat stable, scanning for vuln...</p>
                    </div>
                </aside>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
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

export default QASimulation;
