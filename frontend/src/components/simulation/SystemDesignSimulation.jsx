import React, { useState } from 'react';
import {
    Layout,
    Server,
    Database,
    Globe,
    MessageSquare,
    Box,
    ArrowRight,
    CheckCircle,
    RotateCcw,
    MousePointer,
    Move,
    ZoomIn,
    ZoomOut,
    Trash2,
    Save,
    Menu,
    X,
    Cpu,
    HardDrive,
    Cloud,
    Shield,
    Zap,
    Users,
    Activity,
    Lock,
    Settings,
    Layers,
    Check,
    User
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskFeedback from './TaskFeedback';
import { simulationService } from '../../services/api';
import { Loader2 } from 'lucide-react';

const SystemDesignSimulation = () => {
    const navigate = useNavigate();
    const { jobId, level } = useParams();
    const [showFeedback, setShowFeedback] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [aiFeedback, setAiFeedback] = useState(null);
    const [activeTool, setActiveTool] = useState('select');
    const [explanation, setExplanation] = useState('');
    const [zoom, setZoom] = useState(1);
    const [draggingNode, setDraggingNode] = useState(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Mock canvas nodes
    const [nodes, setNodes] = useState([
        { id: 1, type: 'api-gateway', x: 400, y: 100, label: 'API Gateway' },
        { id: 2, type: 'kafka', x: 400, y: 250, label: 'Kafka Cluster' },
        { id: 3, type: 'service-user', x: 200, y: 400, label: 'User Service' },
        { id: 4, type: 'db-users', x: 200, y: 550, label: 'User DB (SQL)' },
    ]);

    const [connections, setConnections] = useState([
        { id: 1, from: 1, to: 2 },
        { id: 2, from: 2, to: 3 },
        { id: 3, from: 2, to: 1 }, // Added reverse to keep visual paths for now
        { id: 4, from: 3, to: 4 }
    ]);

    const [activeConnection, setActiveConnection] = useState(null);
    const [history, setHistory] = useState([]);

    const saveHistory = () => {
        setHistory(prev => [...prev, { nodes: [...nodes], connections: [...connections] }]);
    };

    const handleUndo = () => {
        if (history.length === 0) return;
        const lastState = history[history.length - 1];
        setNodes(lastState.nodes);
        setConnections(lastState.connections);
        setHistory(prev => prev.slice(0, -1));
    };

    const libraryItems = [
        { type: 'load-balancer', label: 'Load Balancer', icon: <Server className="w-5 h-5 text-purple-500" /> },
        { type: 'service', label: 'Microservice', icon: <Box className="w-5 h-5 text-blue-500" /> },
        { type: 'database', label: 'Database', icon: <Database className="w-5 h-5 text-emerald-500" /> },
        { type: 'cache', label: 'Cache (Redis)', icon: <HardDrive className="w-5 h-5 text-red-500" /> },
        { type: 'queue', label: 'Message Queue', icon: <MessageSquare className="w-5 h-5 text-amber-500" /> },
        { type: 'cdn', label: 'CDN', icon: <Globe className="w-5 h-5 text-orange-500" /> },
    ];

    const [requirements, setRequirements] = useState([
        { id: 1, text: 'Handle 10M daily active users (DAU)', completed: false, type: 'load-balancer' },
        { id: 2, text: 'Ensure < 200ms latency for notifications', completed: false, type: 'cache' },
        { id: 3, text: 'Design for high availability (99.99%)', completed: false, type: 'cdn' },
        { id: 4, text: 'Decouple notification logic from main services', completed: false, type: 'queue' },
    ]);

    const handleAddNode = (type, label, x, y) => {
        saveHistory();
        const newNode = {
            id: Date.now(),
            type,
            x: x || Math.random() * 400 + 100,
            y: y || Math.random() * 300 + 100,
            label
        };
        setNodes([...nodes, newNode]);
    };

    const handleRemoveNode = (nodeId, e) => {
        e.stopPropagation();
        saveHistory();
        setNodes(prev => prev.filter(n => n.id !== nodeId));
        setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
    };

    const handleMouseDown = (e, node) => {
        if (activeTool !== 'select') return;
        saveHistory();
        setDraggingNode(node);
        const rect = e.currentTarget.getBoundingClientRect();
        setOffset({
            x: (e.clientX - rect.left) / zoom,
            y: (e.clientY - rect.top) / zoom
        });
    };

    const handleMouseMove = (e) => {
        const canvas = e.currentTarget;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoom;
        const y = (e.clientY - rect.top) / zoom;

        if (draggingNode) {
            const newNodeX = x - offset.x;
            const newNodeY = y - offset.y;

            setNodes(prev => prev.map(n =>
                n.id === draggingNode.id ? { ...n, x: newNodeX, y: newNodeY } : n
            ));
        }

        if (activeConnection) {
            setActiveConnection(prev => ({
                ...prev,
                currentX: x,
                currentY: y
            }));
        }
    };

    const handleMouseUp = () => {
        setDraggingNode(null);
        setActiveConnection(null);
    };

    const handleConnectionStart = (nodeId, e) => {
        e.stopPropagation();
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;

        setActiveConnection({
            fromId: nodeId,
            startX: node.x + 50, // Center of node (approx)
            startY: node.y + 40, // Adjust based on node height
            currentX: node.x + 50,
            currentY: node.y + 40
        });
    };

    const handleConnectionEnd = (nodeId) => {
        if (activeConnection && activeConnection.fromId !== nodeId) {
            // Check if connection already exists
            const exists = connections.some(c =>
                (c.from === activeConnection.fromId && c.to === nodeId) ||
                (c.from === nodeId && c.to === activeConnection.fromId)
            );

            if (!exists) {
                saveHistory();
                setConnections(prev => [
                    ...prev,
                    { id: Date.now(), from: activeConnection.fromId, to: nodeId }
                ]);
            }
        }
        setActiveConnection(null);
    };

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

    const handleDragStart = (e, item) => {
        e.dataTransfer.setData('application/react-node', JSON.stringify(item));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('application/react-node');
        if (!data) return;

        const item = JSON.parse(data);
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoom - 50; // Offset to center node
        const y = (e.clientY - rect.top) / zoom - 50;

        handleAddNode(item.type, item.label, x, y);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Requirement tracking logic
    React.useEffect(() => {
        const nodeTypes = new Set(nodes.map(n => n.type));
        setRequirements(prev => prev.map(req => {
            if (req.type === 'load-balancer' && (nodeTypes.has('load-balancer') || nodeTypes.has('api-gateway'))) {
                return { ...req, completed: true };
            }
            if (req.type === 'queue' && (nodeTypes.has('queue') || nodeTypes.has('kafka'))) {
                return { ...req, completed: true };
            }
            if (req.type === 'cache' && nodeTypes.has('cache')) {
                return { ...req, completed: true };
            }
            if (req.type === 'cdn' && nodeTypes.has('cdn')) {
                return { ...req, completed: true };
            }
            return req;
        }));
    }, [nodes]);

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const completedCount = requirements.filter(r => r.completed).length;
            const totalCount = requirements.length;

            let score = Math.round((completedCount / totalCount) * 100);
            let feedback = "";

            if (score === 100) {
                feedback = "Exceptional design! You've addressed all scaling, latency, and availability concerns with the correct architectural components.";
            } else if (score >= 75) {
                feedback = "Strong architectural foundation, but there are still some missing components to fully satisfy the high-scale requirements.";
            } else {
                feedback = "The current design is incomplete. Please ensure you've addressed latency, availability, and service decoupling using the library components.";
            }

            const designSummary = `Nodes: ${nodes.map(n => n.label).join(', ')}\nExplanation: ${explanation}`;
            const result = await simulationService.submitTask('t7_sys_design', designSummary);
            setAiFeedback({ score, feedback });
            setShowFeedback(true);
        } catch (error) {
            console.error("Error submitting task:", error);
            const completedCount = requirements.filter(r => r.completed).length;
            const score = Math.round((completedCount / requirements.length) * 100);
            setAiFeedback({
                score,
                feedback: score === 100 ? "Perfect design!" : "Design needs more components to meet requirements."
            });
            setShowFeedback(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-slate-50 font-sans text-slate-900 overflow-hidden">
            {/* Header */}
            <header className="h-14 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-white z-20 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
                        <Cloud className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-slate-900 leading-none">Job Trial Simulator</h1>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                            <span className="font-bold text-indigo-600">Arch-v1.0</span>
                            <span className="text-slate-300">/</span>
                            <span>
                                {level === 'Professional' ? 'Level 3' : level === 'Intermediate' ? 'Level 2' : 'Level 1'}
                            </span>
                            <span className="text-slate-300">/</span>
                            <span>Task 7</span>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button
                        onClick={() => setActiveTool('select')}
                        className={`p-1.5 rounded-md transition-all ${activeTool === 'select' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        title="Select Tool"
                    >
                        <MousePointer className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setActiveTool('move')}
                        className={`p-1.5 rounded-md transition-all ${activeTool === 'move' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        title="Pan Canvas"
                    >
                        <Move className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-slate-300 mx-1"></div>
                    <button
                        onClick={handleUndo}
                        disabled={history.length === 0}
                        className={`p-1.5 rounded-md transition-all ${history.length === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'}`}
                        title="Undo"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-slate-300 mx-1"></div>
                    <button
                        onClick={handleZoomIn}
                        className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-all font-bold flex items-center gap-1"
                        title="Zoom In"
                    >
                        <ZoomIn className="w-4 h-4" />
                        <span className="text-[10px]">{Math.round(zoom * 100)}%</span>
                    </button>
                    <button
                        onClick={handleZoomOut}
                        className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-all"
                        title="Zoom Out"
                    >
                        <ZoomOut className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-indigo-600/20 flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <CheckCircle className="w-4 h-4" />
                        )}
                        <span>{isSubmitting ? 'Submitting...' : 'Submit Design'}</span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                        <User className="w-4 h-4" />
                    </div>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">
                {/* Left Sidebar: Components */}
                <div className="w-64 border-r border-slate-200 flex flex-col bg-white shrink-0 z-10">
                    <div className="p-4 border-b border-slate-100">
                        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Library</h2>
                        <p className="text-[10px] text-slate-500">Drag items to the canvas</p>
                    </div>
                    <div className="flex-grow overflow-y-auto p-3 space-y-2">
                        {libraryItems.map((item, idx) => (
                            <div
                                key={idx}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item)}
                                onClick={() => handleAddNode(item.type, item.label)}
                                className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-white hover:shadow-md border border-slate-100 hover:border-indigo-100 rounded-xl cursor-grab active:cursor-grabbing transition-all group"
                            >
                                <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center: Canvas */}
                <div
                    className="flex-1 relative bg-slate-50 overflow-hidden cursor-crosshair"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {/* Grid Pattern Background */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        transform: `scale(${zoom})`,
                        transformOrigin: '0 0'
                    }}></div>

                    {/* Zoomable Container */}
                    <div style={{ transform: `scale(${zoom})`, transformOrigin: '0 0', height: '100%', width: '100%' }}>
                        {/* Nodes (Mocked) */}
                        {nodes.map(node => (
                            <div
                                key={node.id}
                                onMouseDown={(e) => handleMouseDown(e, node)}
                                className={`absolute flex flex-col items-center gap-2 p-4 bg-white rounded-xl border-2 transition-shadow cursor-move group ${draggingNode?.id === node.id ? 'border-indigo-500 shadow-2xl z-50' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-indigo-400'}`}
                                style={{ left: node.x, top: node.y }}
                            >
                                <button
                                    onClick={(e) => handleRemoveNode(node.id, e)}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all z-40 shadow-sm"
                                    title="Remove Item"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                                    {node.type.includes('db') ? <Database className="w-5 h-5" /> :
                                        node.type.includes('kafka') ? <MessageSquare className="w-5 h-5" /> :
                                            node.type.includes('user') ? <Box className="w-5 h-5" /> :
                                                <Server className="w-5 h-5" />}
                                </div>
                                <span className="text-xs font-bold text-slate-700 whitespace-nowrap">{node.label}</span>

                                {/* Connection Handles (Interactive) */}
                                <div
                                    onMouseDown={(e) => handleConnectionStart(node.id, e)}
                                    onMouseUp={() => handleConnectionEnd(node.id)}
                                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-200 rounded-full border-2 border-white hover:bg-indigo-400 hover:scale-125 transition-all cursor-crosshair z-30"
                                ></div>
                                <div
                                    onMouseDown={(e) => handleConnectionStart(node.id, e)}
                                    onMouseUp={() => handleConnectionEnd(node.id)}
                                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-200 rounded-full border-2 border-white hover:bg-indigo-400 hover:scale-125 transition-all cursor-crosshair z-30"
                                ></div>
                                <div
                                    onMouseDown={(e) => handleConnectionStart(node.id, e)}
                                    onMouseUp={() => handleConnectionEnd(node.id)}
                                    className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-slate-200 rounded-full border-2 border-white hover:bg-indigo-400 hover:scale-125 transition-all cursor-crosshair z-30"
                                ></div>
                                <div
                                    onMouseDown={(e) => handleConnectionStart(node.id, e)}
                                    onMouseUp={() => handleConnectionEnd(node.id)}
                                    className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-slate-200 rounded-full border-2 border-white hover:bg-indigo-400 hover:scale-125 transition-all cursor-crosshair z-30"
                                ></div>
                            </div>
                        ))}

                        {/* Connection Lines (Dynamic) */}
                        <svg className="absolute inset-0 pointer-events-none" style={{ minWidth: '2000px', minHeight: '2000px' }}>
                            <defs>
                                <marker
                                    id="arrowhead"
                                    markerWidth="10"
                                    markerHeight="7"
                                    refX="9"
                                    refY="3.5"
                                    orient="auto"
                                >
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#CBD5E1" />
                                </marker>
                            </defs>

                            {connections.map(conn => {
                                const fromNode = nodes.find(n => n.id === conn.from);
                                const toNode = nodes.find(n => n.id === conn.to);

                                if (!fromNode || !toNode) return null;

                                return (
                                    <path
                                        key={conn.id}
                                        d={`M ${fromNode.x + 50} ${fromNode.y + 40} L ${toNode.x + 50} ${toNode.y + 40}`}
                                        stroke="#CBD5E1"
                                        strokeWidth="2"
                                        strokeDasharray="4"
                                        fill="none"
                                        markerEnd="url(#arrowhead)"
                                    />
                                );
                            })}

                            {activeConnection && (
                                <path
                                    d={`M ${activeConnection.startX} ${activeConnection.startY} L ${activeConnection.currentX} ${activeConnection.currentY}`}
                                    stroke="#6366F1"
                                    strokeWidth="2"
                                    strokeDasharray="4"
                                    fill="none"
                                />
                            )}
                        </svg>
                    </div>

                    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-200 w-80">
                            <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
                                Design Justification
                            </h3>
                            <textarea
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                                placeholder="Explain your architectural choices here..."
                                className="w-full h-24 text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg resize-none focus:outline-none focus:border-indigo-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Context */}
                <div className="w-[320px] bg-white border-l border-slate-200 flex flex-col shrink-0 z-10">
                    <div className="p-6 overflow-y-auto space-y-8">
                        {/* Task Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest">
                                <Cpu className="w-4 h-4" />
                                System Requirements
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 leading-tight">
                                Design a Real-Time Notification System
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Architect a distributed system capable of sending push notifications to millions of users with minimal latency. Consider reliability, scalability, and decoupling of services.
                            </p>
                        </div>

                        {/* Checklist */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success Criteria</h3>
                            <div className="space-y-3">
                                {requirements.map(req => (
                                    <div key={req.id} className="flex gap-3 text-sm">
                                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${req.completed ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-300'}`}>
                                            {req.completed ? <CheckCircle className="w-3.5 h-3.5" /> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                                        </div>
                                        <span className={`${req.completed ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>{req.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Constraints */}
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl space-y-2">
                            <h3 className="text-[10px] font-black text-amber-800 uppercase tracking-widest flex items-center gap-2">
                                <Shield className="w-3.5 h-3.5" />
                                System Constraints
                            </h3>
                            <ul className="space-y-1">
                                <li className="text-xs text-amber-900/80 pl-2 border-l-2 border-amber-200">Max throughput: 50k req/sec</li>
                                <li className="text-xs text-amber-900/80 pl-2 border-l-2 border-amber-200">Data retention: 30 days</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {showFeedback && (
                <TaskFeedback
                    onNext={() => navigate(`/simulation/${jobId}/${level}/feedback`)}
                    onRetry={() => setShowFeedback(false)}
                    score={aiFeedback?.score}
                    feedback={aiFeedback?.feedback}
                />
            )}
        </div>
    );
};

export default SystemDesignSimulation;
