import React, { useState, useEffect } from 'react';
import {
    Clock,
    Table as TableIcon,
    BarChart3,
    PieChart,
    Filter,
    SortAsc,
    RefreshCw,
    Send,
    CheckCircle2,
    Search,
    TrendingUp,
    Database,
    FileJson,
    Download,
    Share2,
    Layers,
    Activity,
    Maximize2,
    Play
} from 'lucide-react';

const DataSimulation = ({ currentTask, handleNext, isSubmitting }) => {
    const [findings, setFindings] = useState('');
    const [timeLeft, setTimeLeft] = useState(currentTask.time_limit || 2700);
    const [activeView, setActiveView] = useState('table');
    const [sqlQuery, setSqlQuery] = useState('-- Querying Order Trends\nSELECT region, SUM(revenue) as total_rev\nFROM orders\nWHERE date >= "2023-10-01"\nGROUP BY region\nORDER BY total_rev DESC;');

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
        <div className="h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#020617] text-gray-800 dark:text-slate-300 font-sans transition-colors overflow-hidden">
            {/* Analysis Lab Header */}
            <header className="h-16 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 shrink-0 z-50">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 pr-6 border-r border-slate-200 dark:border-white/10">
                        <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">InsightEngine Alpha</h1>
                            <p className="text-[9px] text-[#2563EB] font-bold mt-0.5 tracking-[0.2em] uppercase">Data Analysis Workspace</p>
                        </div>
                    </div>

                    <div className="flex items-center bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-xl text-slate-500 dark:text-slate-400 font-mono border border-slate-200 dark:border-white/5">
                        <Clock className="w-4 h-4 mr-3 text-[#2563EB]" />
                        <span className="text-sm font-bold">{formatTime(timeLeft)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-widest">Engine Live</span>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-600 dark:text-slate-400 text-xs font-bold">
                        <Share2 className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                    <button
                        onClick={() => handleNext(`SQL Query:\n${sqlQuery}\n\nSynthesis of Findings:\n${findings}`)}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl font-bold text-xs shadow-xl shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                        <span>{isSubmitting ? 'Submitting...' : 'Submit Project'}</span>
                    </button>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">
                {/* Left: SQL & Synthesis Panel */}
                <aside className="w-[400px] bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-white/5 flex flex-col shrink-0">
                    <div className="p-6 border-b border-slate-100 dark:border-white/5">
                        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Query Lab</h2>
                        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-white/5 group ring-1 ring-white/10 focus-within:ring-blue-500/50 transition-all shadow-2xl">
                            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                                <span className="text-[9px] font-mono text-white/40 uppercase">analysis.sql</span>
                                <button className="p-1 text-emerald-400 hover:bg-emerald-400/10 rounded">
                                    <Play className="w-3 h-3 fill-current" />
                                </button>
                            </div>
                            <textarea
                                value={sqlQuery}
                                onChange={(e) => setSqlQuery(e.target.value)}
                                className="w-full h-[300px] bg-transparent p-4 text-[11px] font-mono text-blue-300 focus:outline-none resize-none custom-scrollbar"
                            />
                        </div>
                    </div>

                    <div className="flex-grow p-6 overflow-y-auto space-y-8 custom-scrollbar">
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" /> Findings Synthesis
                            </h3>
                            <div className="p-5 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5 relative min-h-[160px] group transition-all focus-within:ring-2 ring-blue-500/20">
                                <textarea
                                    className="w-full bg-transparent text-[11px] text-slate-700 dark:text-white/80 focus:outline-none resize-none custom-scrollbar"
                                    rows="6"
                                    placeholder="Synthesize your findings here based on the data trends..."
                                    value={findings}
                                    onChange={(e) => setFindings(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-500/5 p-6 rounded-3xl border border-blue-100 dark:border-blue-500/20">
                            <div className="flex items-center gap-2 mb-4">
                                <Layers className="w-4 h-4 text-[#2563EB]" />
                                <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-wider">Task Context</span>
                            </div>
                            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                &quot;{currentTask.description || 'Analyze the Q3 revenue trends across all regions and identify the categories causing significant growth spikes.'}&quot;
                            </p>
                        </div>
                    </div>

                    <footer className="p-5 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20">
                        <div className="flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <span>V 4.2.0 Enterprise</span>
                            <div className="flex gap-4">
                                <span>SSL: ACTIVE</span>
                                <span>UTC-5</span>
                            </div>
                        </div>
                    </footer>
                </aside>

                {/* Main Content Area */}
                <main className="flex-grow p-8 space-y-8 overflow-y-auto custom-scrollbar">
                    {/* View Controls */}
                    <div className="flex items-center justify-between">
                        <div className="flex p-1 bg-slate-200 dark:bg-white/5 rounded-xl border border-slate-300 dark:border-white/10 shrink-0">
                            {[
                                { id: 'table', icon: <TableIcon className="w-3.5 h-3.5" />, label: 'Data Grid' },
                                { id: 'chart', icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Visualizer' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveView(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeView === tab.id ? 'bg-white dark:bg-blue-600 text-[#2563EB] dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-white'}`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 ring-blue-500/20 w-64 transition-all"
                                    placeholder="Filter dataset..."
                                />
                            </div>
                            <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10">
                                <RefreshCw className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {activeView === 'table' ? (
                        /* Professional Data Grid */
                        <div className="bg-white dark:bg-[#0F172A] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col transition-all">
                            <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-[#2563EB]">
                                        <Database className="w-4 h-4" />
                                    </div>
                                    <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Inventory_Orders_2023</h4>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-[10px] font-bold text-slate-500 transition-colors">
                                        <Filter className="w-3.5 h-3.5" /> Filter
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-[10px] font-bold text-slate-500 transition-colors">
                                        <SortAsc className="w-3.5 h-3.5" /> Sort
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 dark:bg-black/20">
                                            {['Order ID', 'Category', 'Revenue', 'Date', 'Region', 'Performance'].map((header, i) => (
                                                <th key={i} className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-white/5">{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        {[
                                            { id: '#ORD-2094', cat: 'Electronics', rev: '$1,240.80', date: '2023-10-12', reg: 'NORTH', perf: 85 },
                                            { id: '#ORD-2095', cat: 'Appliances', rev: '$450.50', date: '2023-10-12', reg: 'SOUTH', perf: 42 },
                                            { id: '#ORD-2096', cat: 'Electronics', rev: '$2,100.00', date: '2023-10-13', reg: 'WEST', perf: 98 },
                                            { id: '#ORD-2097', cat: 'Apparel', rev: '$89.99', date: '2023-10-13', reg: 'NORTH', perf: 15 },
                                            { id: '#ORD-2098', cat: 'Smart Devices', rev: '$560.20', date: '2023-10-14', reg: 'EAST', perf: 64 },
                                            { id: '#ORD-2099', cat: 'Electronics', rev: '$890.00', date: '2023-10-15', reg: 'WEST', perf: 72 },
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors group">
                                                <td className="px-8 py-5 text-xs font-mono font-bold text-[#2563EB] group-hover:translate-x-1 transition-transform">{row.id}</td>
                                                <td className="px-8 py-5 text-xs font-bold text-slate-700 dark:text-slate-300">{row.cat}</td>
                                                <td className="px-8 py-5 text-xs font-black text-slate-900 dark:text-white">{row.rev}</td>
                                                <td className="px-8 py-5 text-xs font-bold text-slate-400 font-mono tracking-tighter">{row.date}</td>
                                                <td className="px-8 py-5">
                                                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-widest">{row.reg}</span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-16 h-1 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${row.perf > 80 ? 'bg-emerald-500' : row.perf > 50 ? 'bg-blue-500' : 'bg-rose-500'}`}
                                                                style={{ width: `${row.perf}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-[10px] font-mono font-bold w-6">{row.perf}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        /* High Fidelity Chart Visualizer */
                        <div className="flex-grow flex flex-col gap-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white dark:bg-[#0F172A] rounded-[32px] p-8 border border-slate-200 dark:border-white/5 shadow-sm">
                                    <div className="flex items-center justify-between mb-10">
                                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Revenue Growth Map</h4>
                                        <div className="flex gap-2">
                                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-400 transition-colors"><Maximize2 className="w-4 h-4" /></button>
                                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
                                        </div>
                                    </div>

                                    <div className="h-[300px] flex items-end justify-between px-6 relative">
                                        {/* Chart Grid */}
                                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                                            {[...Array(6)].map((_, i) => <div key={i} className="w-full h-px bg-slate-900 dark:bg-white"></div>)}
                                        </div>

                                        {[
                                            { val: 65, color: 'bg-[#2563EB]' },
                                            { val: 45, color: 'bg-[#7C3AED]' },
                                            { val: 88, color: 'bg-emerald-500' },
                                            { val: 25, color: 'bg-rose-500' },
                                            { val: 55, color: 'bg-amber-500' }
                                        ].map((bar, i) => (
                                            <div key={i} className="w-16 relative group cursor-pointer">
                                                <div
                                                    style={{ height: `${bar.val}%` }}
                                                    className={`w-full ${bar.color} rounded-t-xl transition-all duration-1000 group-hover:brightness-110 shadow-lg`}
                                                >
                                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-md transition-all">
                                                        {bar.val}%
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between px-6 pt-6 border-t border-slate-100 dark:border-white/5">
                                        {['North', 'South', 'East', 'West', 'Central'].map(l => (
                                            <span key={l} className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-16 text-center">{l}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-[#0F172A] rounded-[32px] p-8 border border-slate-200 dark:border-white/5 shadow-sm flex flex-col justify-between">
                                    <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-10">Market Share Distribution</h4>

                                    <div className="flex items-center justify-center relative py-10 scale-110">
                                        <div className="w-48 h-48 rounded-full border-[12px] border-slate-50 dark:border-white/5 relative">
                                            <div className="absolute inset-0 rounded-full border-[12px] border-emerald-500 border-t-transparent border-l-transparent rotate-45 shadow-[0_0_20px_rgba(16,185,129,0.3)]"></div>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center font-black">
                                                <span className="text-2xl text-slate-900 dark:text-white tracking-tighter">72.4%</span>
                                                <span className="text-[9px] text-[#2563EB] uppercase tracking-widest">Growth</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-10">
                                        {[
                                            { label: 'Organic', val: '+12.4%', color: 'bg-emerald-500' },
                                            { label: 'Social', val: '+5.7%', color: 'bg-blue-500' },
                                            { label: 'Referral', val: '-1.2%', color: 'bg-rose-500' },
                                            { label: 'Direct', val: '+2.1%', color: 'bg-amber-500' }
                                        ].map(stat => (
                                            <div key={stat.label} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
                                                    <span className="text-[10px] font-bold text-slate-500">{stat.label}</span>
                                                </div>
                                                <span className={`text-[10px] font-black ${stat.val.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{stat.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#1E293B] rounded-[32px] p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-blue-500/20 transition-all duration-700"></div>
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="space-y-4 max-w-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-500/20 rounded-xl">
                                                <Activity className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Anomaly Detection Running</h3>
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed font-medium italic">
                                            Our system has identified a 15% revenue deviation in the &apos;Electronics&apos; sector for the North Region. Adjust your SQL query to filter by &apos;Order_Status = COMPLETED&apos; for more accurate historical comparison.
                                        </p>
                                    </div>
                                    <button className="px-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-xl">
                                        Apply Auto-Fix
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div >

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 10px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                }
            `}</style>
        </div >
    );
};

export default DataSimulation;
