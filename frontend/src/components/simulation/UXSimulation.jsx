import React, { useState, useEffect } from 'react';
import {
    Clock,
    FileText,
    MousePointer2,
    Type,
    Layout,
    Image as ImageIcon,
    Square,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    ChevronDown,
    Zap,
    Layers,
    Blocks,
    Eye,
    Play,
    Settings,
    User,
    ChevronRight,
    Circle,
    Hand,
    PenTool,
    Search,
    Share2,
    CheckCircle
} from 'lucide-react';

const UXSimulation = ({ currentTask, tasks, currentTaskIndex, handleNext, isSubmitting }) => {
    const [rationale, setRationale] = useState('');
    const [fillColor, setFillColor] = useState('#0D93A5');
    const [radius, setRadius] = useState(12);
    const [shadow, setShadow] = useState(true);
    const [activeTab, setActiveTab] = useState('design');
    const [timeLeft, setTimeLeft] = useState(currentTask.time_limit || 1800);

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
        <div className="h-screen flex flex-col bg-[#F3F4F6] dark:bg-[#0F172A] text-gray-800 dark:text-slate-300 font-sans transition-colors overflow-hidden">
            {/* Professional Toolbar Header */}
            <header className="h-14 bg-[#1F2937] dark:bg-[#1E293B] border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-50">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 pr-6 border-r border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-[#0D93A5] flex items-center justify-center text-white">
                            <MousePointer2 className="w-5 h-5 fill-current" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xs font-bold text-white leading-none">DesignFlow Pro</h1>
                            <p className="text-[9px] text-[#0D93A5] font-mono mt-1 tracking-widest uppercase">UX/UI WORKSPACE</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        {[
                            { icon: <MousePointer2 className="w-4 h-4" />, active: true },
                            { icon: <Hand className="w-4 h-4" /> },
                            { icon: <Square className="w-4 h-4" /> },
                            { icon: <Circle className="w-4 h-4" /> },
                            { icon: <PenTool className="w-4 h-4" /> },
                            { icon: <Type className="w-4 h-4" /> },
                            { icon: <ImageIcon className="w-4 h-4" /> }
                        ].map((tool, i) => (
                            <button
                                key={i}
                                className={`p-2 rounded-lg transition-colors ${tool.active ? 'bg-[#0D93A5] text-white' : 'text-slate-400 hover:bg-white/10'}`}
                            >
                                {tool.icon}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-black/40 px-4 py-2 rounded-xl text-[#0D93A5] font-mono border border-white/5 mr-4">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm font-bold">{formatTime(timeLeft)}</span>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-lg transition-colors text-slate-300">
                        <Eye className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold">Preview</span>
                    </button>
                    <button className="p-2 text-slate-300 hover:bg-white/5 rounded-lg">
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleNext(`Design Rationale: ${rationale}\nFill Color: ${fillColor}\nCorner Radius: ${radius}px\nShadow: ${shadow}`)}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-5 py-2 bg-[#0D93A5] hover:bg-[#0CA3B5] text-white rounded-lg font-bold text-xs shadow-lg shadow-[#0D93A5]/20 transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <CheckCircle className="w-4 h-4" />
                        )}
                        <span>{isSubmitting ? 'Submitting...' : 'Finish Task'}</span>
                    </button>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">
                {/* Left: Layers & Assets Panel */}
                <aside className="w-64 bg-[#111827] dark:bg-[#0F172A] border-r border-white/5 flex flex-col shrink-0">
                    <div className="flex border-b border-white/5">
                        <button className="flex-grow p-3 text-[10px] font-bold text-[#0D93A5] border-b-2 border-[#0D93A5] bg-[#0D93A5]/5 uppercase tracking-wider">Layers</button>
                        <button className="flex-grow p-3 text-[10px] font-bold text-white/40 hover:text-white/60 uppercase tracking-wider">Assets</button>
                    </div>

                    <div className="flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar">
                        <div className="space-y-1">
                            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Current Page</h3>
                            {[
                                { name: 'Navigation Bar', icon: <Layers className="w-3.5 h-3.5" />, type: 'frame' },
                                { name: 'Hero Section', icon: <Layers className="w-3.5 h-3.5" />, type: 'frame' },
                                { name: 'Smart Card', icon: <Blocks className="w-3.5 h-3.5" />, type: 'component', selected: true },
                                { name: 'Inner Shadow', icon: <Square className="w-3.5 h-3.5" />, type: 'rect' },
                                { name: 'CTA Button', icon: <Square className="w-3.5 h-3.5" />, type: 'rect' },
                                { name: 'Device Image', icon: <ImageIcon className="w-3.5 h-3.5" />, type: 'image' },
                                { name: 'Title Text', icon: <Type className="w-3.5 h-3.5" />, type: 'text' }
                            ].map((layer, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer group transition-colors ${layer.selected ? 'bg-[#0D93A5]/20 text-[#25B6C9]' : 'hover:bg-white/5'}`}
                                >
                                    <div className={`${layer.selected ? 'text-[#0D93A5]' : 'text-slate-500'}`}>{layer.icon}</div>
                                    <span className="text-xs font-medium">{layer.name}</span>
                                    <Eye className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-40" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 border-t border-white/5 bg-black/10">
                        <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                            <span>28 Layers</span>
                            <span>4 Groups</span>
                        </div>
                    </div>
                </aside>

                {/* Center: Canvas Area */}
                <main className="flex-grow bg-[#E5E7EB] dark:bg-[#020617] p-8 overflow-auto flex flex-col items-center custom-scrollbar">
                    <div className="w-full max-w-4xl bg-white dark:bg-[#1E293B] shadow-2xl rounded-sm min-h-[1000px] p-12 relative overflow-hidden transition-colors border-x dark:border-slate-800">
                        {/* Status Bar Mock */}
                        <div className="flex justify-between items-center mb-12">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">SmartHome Dashboard v1.0</span>
                        </div>

                        {/* Task Requirements Overlay (Figma-style sticky note) */}
                        <div className="absolute top-12 right-12 w-64 bg-amber-100 p-5 rounded-lg shadow-xl -rotate-2 border border-amber-200 z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <FileText className="w-4 h-4 text-amber-600" />
                                <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">Mission Brief</span>
                            </div>
                            <p className="text-xs font-bold text-amber-900 leading-relaxed italic">
                                &quot;{currentTask.description || 'Improve the visual hierarchy of the main dashboard card.'}&quot;
                            </p>
                        </div>

                        {/* Selected Element with Bounding Box */}
                        <div className="relative p-10 border-2 border-[#0D93A5] rounded-[24px] group">
                            <div className="absolute -top-3 -left-0.5 bg-[#0D93A5] text-white text-[9px] font-black px-2 py-0.5 rounded-t-sm uppercase tracking-widest shadow-lg">Selection: Smart Card</div>

                            {/* Bounding Box Handles */}
                            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
                                <div key={pos} className={`absolute w-1.5 h-1.5 bg-white border border-[#0D93A5] ${pos === 'top-left' ? '-top-1 -left-1' : pos === 'top-right' ? '-top-1 -right-1' : pos === 'bottom-left' ? '-bottom-1 -left-1' : '-bottom-1 -right-1'}`} />
                            ))}

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <div className="w-24 h-4 bg-[#1F2937] dark:bg-slate-700 rounded-full"></div>
                                    <div className="w-48 h-3 bg-[#9CA3AF] dark:bg-slate-600 rounded-full"></div>
                                </div>

                                <div className="w-full aspect-[16/10] bg-gray-100 dark:bg-[#0F172A] rounded-2xl overflow-hidden relative shadow-inner">
                                    <img src="https://images.unsplash.com/photo-1556911220-e15224bbafb0?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Kitchen" />
                                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0D93A5] animate-pulse">
                                        <Zap className="w-5 h-5 fill-current" />
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                                        <span className="text-white font-bold text-sm">Smart Kitchen Control</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        style={{ backgroundColor: fillColor, borderRadius: `${radius}px`, boxShadow: shadow ? `0 8px 24px -6px ${fillColor}` : 'none' }}
                                        className="flex-grow py-4 text-white font-black text-xs uppercase tracking-[0.2em] transition-all hover:brightness-110 active:scale-95 shadow-xl"
                                    >
                                        Enable Security
                                    </button>
                                    <button
                                        style={{ borderRadius: `${radius}px` }}
                                        className="flex-grow py-4 border-2 border-gray-100 dark:border-slate-800 text-gray-400 dark:text-slate-500 font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-gray-50 dark:hover:bg-slate-800/50"
                                    >
                                        Settings
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Drop Zones / Secondary Elements */}
                        <div className="grid grid-cols-2 gap-8 mt-12">
                            <div className="h-48 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-4 bg-gray-50/50 dark:bg-black/10 group transition-all hover:border-[#0D93A5]/30">
                                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-slate-300 group-hover:text-[#0D93A5] transition-colors">
                                    <Layout className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black text-gray-300 dark:text-slate-600 tracking-widest uppercase italic group-hover:text-[#0D93A5]/50">Drop widget here</span>
                            </div>
                            <div className="h-48 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-4 bg-gray-50/50 dark:bg-black/10 group transition-all hover:border-[#0D93A5]/30">
                                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-slate-300 group-hover:text-[#0D93A5] transition-colors">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black text-gray-300 dark:text-slate-600 tracking-widest uppercase italic group-hover:text-[#0D93A5]/50">Drop widget here</span>
                            </div>
                        </div>

                        {/* Interactive Reflection Panel */}
                        <div className="mt-24 bg-[#111827] dark:bg-[#0F172A] rounded-3xl p-8 shadow-2xl border border-white/5 relative group transition-all ring-1 ring-white/10 hover:ring-[#0D93A5]/50">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#0D93A5]/20 rounded-xl">
                                        <div className="w-2 h-2 rounded-full bg-[#0D93A5] animate-pulse"></div>
                                    </div>
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Design Rationale</h4>
                                </div>
                                <span className="text-[10px] text-white/30 font-mono italic">Task {currentTaskIndex + 1} of {tasks.length} : UX Validation</span>
                            </div>
                            <div className="w-full bg-black/40 rounded-2xl p-6 border border-white/5 relative min-h-[140px] focus-within:border-[#0D93A5]/50 transition-colors">
                                <textarea
                                    className="absolute inset-0 bg-transparent p-6 text-[11px] text-white focus:outline-none resize-none custom-scrollbar"
                                    placeholder="Explain your design decisions... (e.g. 'I increased the corner radius to create a more friendly, rounded aesthetic that matches our brand guidelines...')"
                                    value={rationale}
                                    onChange={(e) => setRationale(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right: Properties Inspector */}
                <aside className="w-72 bg-[#111827] dark:bg-[#0F172A] border-l border-white/5 flex flex-col shrink-0">
                    <div className="flex border-b border-white/5">
                        {['design', 'prototype', 'inspect'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-grow p-3 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'text-[#0D93A5] border-b-2 border-[#0D93A5] bg-[#0D93A5]/5' : 'text-white/40 hover:text-white/60'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar">
                        {/* Alignment Section */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Alignment</h4>
                            <div className="grid grid-cols-4 gap-1 p-1 bg-black/20 rounded-lg">
                                {[AlignLeft, AlignCenter, AlignRight, AlignJustify].map((Icon, i) => (
                                    <button key={i} className="flex-grow aspect-square flex items-center justify-center text-white/40 hover:bg-[#0D93A5]/20 hover:text-[#0D93A5] rounded transition-all">
                                        <Icon className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Design Specifics */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Properties</h4>

                            <div className="space-y-5">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-bold text-white/50 uppercase">Fill Color</label>
                                        <span className="text-[10px] font-mono text-[#0D93A5] uppercase">{fillColor}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-xl border-2 border-white/10 cursor-pointer relative overflow-hidden"
                                            style={{ backgroundColor: fillColor }}
                                        >
                                            <input
                                                type="color"
                                                value={fillColor}
                                                onChange={(e) => setFillColor(e.target.value)}
                                                className="absolute inset-0 opacity-0 cursor-pointer scale-150"
                                            />
                                        </div>
                                        <div className="flex-grow bg-black/30 px-3 py-2.5 rounded-xl border border-white/5 flex justify-between items-center text-[10px] font-mono">
                                            <span className="text-white/80">100%</span>
                                            <ChevronDown className="w-3 h-3 text-white/20" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-bold text-white/50 uppercase">Corner Radius</label>
                                        <span className="text-[10px] font-mono text-[#0D93A5]">{radius}px</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="40" value={radius}
                                        onChange={(e) => setRadius(parseInt(e.target.value))}
                                        className="w-full accent-[#0D93A5] h-1 bg-white/5 rounded-full appearance-none cursor-pointer"
                                    />
                                </div>

                                <div className="flex items-center justify-between py-4 border-y border-white/5">
                                    <label className="text-[10px] font-bold text-white/50 uppercase">Shadow FX</label>
                                    <button
                                        onClick={() => setShadow(!shadow)}
                                        className={`w-10 h-5 rounded-full transition-all relative ${shadow ? 'bg-[#0D93A5]' : 'bg-white/10'}`}
                                    >
                                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${shadow ? 'right-1' : 'left-1'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Export Section */}
                        <div className="pt-6">
                            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                Export Assets
                            </button>
                        </div>
                    </div>

                    <div className="mt-auto p-5 border-t border-white/5 bg-black/20">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Sync with Cloud: OK</span>
                        </div>
                    </div>
                </aside>
            </div >

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
        </div >
    );
};

export default UXSimulation;
