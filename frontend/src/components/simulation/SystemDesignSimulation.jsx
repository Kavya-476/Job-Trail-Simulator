import React, { useState } from 'react';
import {
    Layout,
    Database,
    Server,
    Globe,
    Cloud,
    Cpu,
    ArrowRight,
    Type,
    RotateCcw,
    RotateCw,
    Plus,
    Minus,
    Maximize,
    Save,
    CheckCircle,
    User,
    Clock,
    FileText,
    Shield,
    Users,
    Zap,
    DollarSign,
    Box
} from 'lucide-react';

const SystemDesignSimulation = () => {
    const [explanation, setExplanation] = useState(`### 1. Ingestion Layer
We use a high-availability Load Balancer (Nginx/Envoy) to route requests to a cluster of API Gateways written in Go for concurrency.

### 2. Message Broker
To handle 100k RPS spikes, we implement Apache Kafka as a buffer between the API and the worker services.

### 3. Scaling Strategy
- Horizontal scaling of worker nodes based on Kafka lag metrics.`);

    // Mock nodes for the canvas
    const [nodes, setNodes] = useState([
        { id: 1, type: 'API Gateway', icon: Server, x: 250, y: 150, color: 'blue' },
        { id: 2, type: 'Kafka Cluster', icon: Box, x: 500, y: 150, color: 'slate' },
        { id: 3, type: 'User Metadata (Postgres)', icon: Database, x: 500, y: 350, color: 'blue' },
    ]);

    return (
        <div className="h-screen flex flex-col bg-[#0F1216] font-sans text-slate-300 overflow-hidden">
            {/* Header */}
            <header className="h-14 border-b border-slate-800 flex items-center justify-between px-4 shrink-0 bg-[#0F1216] z-20">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        <Box className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-white leading-none">DevTrial Simulator</h1>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-500">
                        <button className="hover:text-white transition-colors">Dashboard</button>
                        <button className="hover:text-white transition-colors">Leaderboard</button>
                        <div className="flex items-center gap-2 text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-full">
                            <Clock className="w-3.5 h-3.5" />
                            <span>54:21</span>
                        </div>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-blue-600/20">
                        Submit Design
                    </button>
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors border border-slate-700">
                        Save Draft
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300">
                        <User className="w-4 h-4" />
                    </div>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">
                {/* Left Sidebar: Problem Statement */}
                <div className="w-[320px] border-r border-slate-800 flex flex-col bg-[#0F1216] shrink-0 overflow-y-auto">
                    <div className="p-6 space-y-8">
                        <div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Level 3 / Task 1</div>
                            <h2 className="text-xl font-bold text-white mb-2">Real-time Notification System</h2>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Design a system to deliver mobile, web, and email alerts at scale.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest">
                                <FileText className="w-4 h-4" />
                                Problem
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                                A global social network needs a system to send push notifications to 100M active users with 100k peak Requests Per Second (RPS).
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest">
                                <Clock className="w-4 h-4" />
                                Constraints
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-slate-400">
                                    <div className="w-1 h-1 rounded-full bg-slate-500 mt-1.5 shrink-0"></div>
                                    <span>Latency: &lt; 200ms for 99% of deliveries.</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-slate-400">
                                    <div className="w-1 h-1 rounded-full bg-slate-500 mt-1.5 shrink-0"></div>
                                    <span>Durability: No notification loss allowed.</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-slate-400">
                                    <div className="w-1 h-1 rounded-full bg-slate-500 mt-1.5 shrink-0"></div>
                                    <span>Prioritization: Marketing vs. Critical Security alerts.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest">
                                <Users className="w-4 h-4" />
                                User Stories
                            </div>
                            <div className="space-y-2">
                                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800 text-xs text-slate-400 italic">
                                    "As a developer, I want to send a notification via a single API endpoint."
                                </div>
                                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800 text-xs text-slate-400 italic">
                                    "As a user, I want to toggle delivery preferences across channels."
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest">
                                <CheckCircle className="w-4 h-4" />
                                Criteria
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-xs text-slate-400">
                                    <div className="w-3 h-3 rounded-full border border-green-500 bg-green-500/20 flex items-center justify-center">
                                        <CheckCircle className="w-2 h-2 text-green-500" />
                                    </div>
                                    Scalability Plan
                                </li>
                                <li className="flex items-center gap-2 text-xs text-slate-400">
                                    <div className="w-3 h-3 rounded-full border border-green-500 bg-green-500/20 flex items-center justify-center">
                                        <CheckCircle className="w-2 h-2 text-green-500" />
                                    </div>
                                    Cost Optimization
                                </li>
                                <li className="flex items-center gap-2 text-xs text-slate-400">
                                    <div className="w-3 h-3 rounded-full border border-slate-600 flex items-center justify-center"></div>
                                    Error Handling
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Main Design Area */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#0A0C10] relative">
                    {/* Toolbar */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
                        <div className="flex gap-2 pointer-events-auto">
                            <div className="bg-[#1C2128] border border-slate-700 rounded-lg p-1 flex gap-1 shadow-xl">
                                {[Server, Database, Cpu, Cloud, Globe].map((Icon, i) => (
                                    <button key={i} className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                                        <Icon className="w-5 h-5" />
                                    </button>
                                ))}
                            </div>
                            <div className="bg-[#1C2128] border border-slate-700 rounded-lg p-1 flex gap-1 shadow-xl">
                                <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                                    <ArrowRight className="w-5 h-5 rotate-90" />
                                </button>
                                <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                                    <Type className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2 pointer-events-auto">
                            <div className="bg-[#1C2128] border border-slate-700 rounded-lg p-1 flex gap-1 shadow-xl">
                                <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                                    <RotateCw className="w-4 h-4" />
                                </button>
                            </div>
                            <button className="px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-600/20 flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Custom Node
                            </button>
                        </div>
                    </div>

                    {/* Canvas (Grid Background) */}
                    <div className="flex-grow relative overflow-hidden bg-[#0A0C10]"
                        style={{ backgroundImage: 'radial-gradient(#2D3748 1px, transparent 1px)', backgroundSize: '30px 30px' }}>

                        {/* Nodes */}
                        {nodes.map(node => (
                            <div
                                key={node.id}
                                className={`absolute w-48 p-4 rounded-xl border-2 flex flex-col items-center gap-3 bg-[#0F1216] cursor-move shadow-2xl group transition-transform hover:scale-105 ${node.color === 'blue' ? 'border-blue-500 shadow-blue-900/20' : 'border-slate-700 shadow-black/50'}`}
                                style={{ top: node.y, left: node.x }}
                            >
                                {node.type === 'API Gateway' && <div className="absolute bottom-4 left-4 right-4 h-1 bg-slate-800 rounded-full overflow-hidden"><div className="w-1/2 h-full bg-blue-500 rounded-full"></div></div>}

                                <node.icon className={`w-8 h-8 ${node.color === 'blue' ? 'text-blue-500' : 'text-slate-400'}`} />
                                <span className="text-xs font-bold text-white tracking-wide">{node.type}</span>
                            </div>
                        ))}

                        {/* Watermark text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                            <span className="text-[8vw] font-black text-white tracking-[1em]">WHITEBOARD AREA</span>
                        </div>

                        {/* Zoom Controls */}
                        <div className="absolute bottom-8 right-8 flex flex-col gap-2 pointer-events-auto">
                            <div className="bg-[#1C2128] border border-slate-700 rounded-lg overflow-hidden shadow-xl">
                                <button className="p-3 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border-b border-slate-700 flex justify-center w-full">
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button className="p-3 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex justify-center w-full">
                                    <Minus className="w-4 h-4" />
                                </button>
                            </div>
                            <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xl transition-colors">
                                <Maximize className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Panel: Explanation */}
                    <div className="h-[250px] border-t border-slate-800 bg-[#0F1216] flex flex-col shrink-0">
                        <div className="h-10 border-b border-slate-800 px-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button className="text-xs font-black text-white uppercase tracking-widest border-b-2 border-white py-2.5">Design Explanation</button>
                                <button className="text-xs font-bold text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors">Write</button>
                                <button className="text-xs font-bold text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors">Preview</button>
                            </div>
                            <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1.5 opacity-60">
                                <Clock className="w-3 h-3" />
                                Last saved 2m ago
                            </span>
                        </div>
                        <div className="flex-grow p-0">
                            <textarea
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                                className="w-full h-full bg-[#0A0C10] p-6 font-mono text-xs text-slate-400 leading-relaxed resize-none focus:outline-none"
                                spellCheck="false"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemDesignSimulation;
