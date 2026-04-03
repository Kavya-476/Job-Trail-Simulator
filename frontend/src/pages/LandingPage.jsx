import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowRight, CheckCircle, Code, BarChart, Shield, Cloud, Play, ThumbsUp, Share2 } from 'lucide-react';
import { MOCK_JOBS } from '../data/mockData';
import illustration from '../assets/auth-illustration.png'; // Reusing the auth image for now

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-navy font-sans transition-colors">
            {/* Navbar */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center relative z-50">
                <div className="flex items-center space-x-2">
                    <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/30">
                        <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-xl font-black text-navy dark:text-white tracking-tight">TechPath</span>
                </div>
                <div className="hidden lg:flex items-center space-x-8">
                    <a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary font-bold text-sm uppercase tracking-widest transition-colors">About</a>
                    <a href="#roles" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary font-bold text-sm uppercase tracking-widest transition-colors">Roles</a>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                    <Link to="/login" className="text-navy dark:text-slate-200 font-black text-sm uppercase tracking-widest hover:text-primary transition-colors pr-2">Login</Link>
                    <Link to="/signup" className="px-4 py-2 sm:px-6 sm:py-3 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all font-black text-xs sm:text-sm shadow-lg shadow-primary/25 active:scale-95 uppercase tracking-widest">
                        Join Now
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 sm:space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">Open Beta Now Live</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-navy dark:text-white leading-[1.1] tracking-tight">
                        Experience Your <span className="text-primary italic">Future</span> Career Today.
                    </h1>
                    <p className="text-base sm:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                        Stop guessing. Start doing. TechPath lets you test-drive real-world job roles through immersive simulations before you commit.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                        <Link to="/signup" className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl hover:bg-primary-hover transition-all font-black text-lg shadow-2xl shadow-primary/30 active:scale-95 flex items-center justify-center gap-2">
                            Get Started Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center -space-x-4 pr-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={`w-12 h-12 rounded-full border-4 border-white dark:border-navy bg-slate-200 overflow-hidden shadow-sm`}>
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                                </div>
                            ))}
                            <div className="ml-8 flex flex-col items-start">
                                <span className="text-lg font-black text-navy dark:text-white leading-none">12k+</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Simulators</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                    <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-3xl transform rotate-3 scale-105 blur-xl"></div>
                    <div className="relative bg-white dark:bg-navy-light rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden border-2 border-slate-100 dark:border-slate-800 transition-colors">
                        <div className="absolute top-0 left-0 right-0 h-8 bg-slate-50 dark:bg-navy border-b dark:border-slate-800 flex items-center px-4 space-x-1.5 focus:z-10">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>
                        <img src={illustration} alt="Platform Preview" className="w-full h-auto object-cover mt-8 grayscale-[10%] group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 lg:py-32 bg-slate-50 dark:bg-navy-light transition-colors relative overflow-hidden" id="about">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="max-w-7xl mx-auto px-4 text-center mb-16 relative z-10">
                    <span className="text-primary font-black tracking-[0.25em] uppercase text-xs italic">The Workflow</span>
                    <h2 className="text-3xl sm:text-5xl font-black text-navy dark:text-white mt-4 mb-6">How It Works</h2>
                    <p className="text-slate-500 dark:text-slate-300 max-w-2xl mx-auto font-medium text-base sm:text-lg">Bridge the gap between theory and industry practice in three precise steps.</p>
                </div>

                <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {[
                        { title: 'Choose a Role', desc: 'Select from diverse tracks like DevOps, Data Analyst, or QA Engineer.', icon: <Terminal className="w-6 h-6 text-white" />, color: 'bg-primary' },
                        { title: 'Complete Tasks', desc: 'Tackle industry-grade tickets, fix real bugs, and analyze complex systems.', icon: <Code className="w-6 h-6 text-white" />, color: 'bg-indigo-600' },
                        { title: 'Build Portfolio', desc: 'Get detailed performance reports and shareable badges for your LinkedIn.', icon: <CheckCircle className="w-6 h-6 text-white" />, color: 'bg-emerald-500' }
                    ].map((step, idx) => (
                        <div key={idx} className="bg-white dark:bg-navy p-8 sm:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden relative">
                            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-slate-50 dark:bg-navy-light rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className={`${step.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg relative z-10 scale-110 -rotate-3 group-hover:rotate-0 transition-transform`}>
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-black text-navy dark:text-white mb-4 relative z-10">{step.title}</h3>
                            <p className="text-slate-500 dark:text-slate-300 leading-relaxed font-medium relative z-10">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Roles Section */}
            <section className="py-20 lg:py-32 bg-white dark:bg-navy transition-colors" id="roles">
                <div className="max-w-7xl mx-auto px-4 mb-16 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 text-center sm:text-left">
                    <div>
                        <h2 className="text-3xl sm:text-5xl font-black text-navy dark:text-white mb-4 tracking-tight">Available Simulations</h2>
                        <p className="text-slate-500 dark:text-slate-300 font-medium text-lg">Explore diverse roles across the modern tech spectrum.</p>
                    </div>
                    <Link to="/jobs" className="px-6 py-3 bg-slate-900 dark:bg-primary text-white rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95 flex items-center gap-2">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {MOCK_JOBS.slice(0, 4).map((job) => (
                        <div key={job.id} className="group border-2 border-slate-50 dark:border-slate-800 rounded-[2rem] p-6 sm:p-8 hover:border-primary dark:hover:border-primary transition-all cursor-pointer bg-slate-50/50 dark:bg-navy-light hover:bg-white dark:hover:bg-navy shadow-sm hover:shadow-2xl">
                            <div className="h-44 bg-navy dark:bg-navy-light rounded-2xl mb-8 overflow-hidden relative group-hover:scale-[1.02] transition-transform">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-white/10">
                                    <Terminal className="w-20 h-20 group-hover:rotate-12 transition-transform duration-500" />
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-navy dark:text-white mb-3 group-hover:text-primary transition-colors tracking-tight">{job.title}</h3>
                            <p className="text-slate-500 dark:text-slate-300 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">{job.description}</p>
                            <span className="text-primary text-xs font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                                Start Simulation <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonial */}
            <section className="py-20 lg:py-32 bg-slate-50 dark:bg-navy-light transition-colors relative overflow-hidden">
                <div className="absolute -left-10 top-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <div className="text-primary/20 mb-8 text-8xl font-black italic select-none">&quot;</div>
                    <h2 className="text-2xl sm:text-4xl font-black text-navy dark:text-white leading-tight mb-12 italic tracking-tight">
                        &quot;I wasn&apos;t sure if coding was for me. After simulating a week as a DevOps Dev on TechPath, I knew exactly what to study. I landed my first internship 3 months later!&quot;
                    </h2>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="w-16 h-16 rounded-full bg-white dark:bg-navy shadow-xl border-4 border-white dark:border-navy" />
                        <div>
                            <div className="font-black text-navy dark:text-white text-lg tracking-tight">Sarah Jenkins</div>
                            <div className="text-primary font-black uppercase tracking-widest text-[10px] italic">Junior Dev @ TechStack</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 transition-colors">
                <div className="max-w-7xl mx-auto bg-slate-900 border-4 border-slate-800 dark:bg-primary p-12 sm:p-20 md:p-28 rounded-[3rem] text-center relative overflow-hidden shadow-[0_48px_80px_-32px_rgba(0,0,0,0.3)]">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.2),transparent)] pointer-events-none"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 leading-tight tracking-tight">Ready to bridge the <span className="text-primary italic">skill gap</span>?</h2>
                        <p className="text-slate-400 dark:text-white/80 text-lg sm:text-xl font-medium mb-12 leading-relaxed">Join 12,000+ students and recent graduates already gaining real-world industry experience.</p>
                        <Link to="/signup" className="inline-flex items-center gap-3 px-12 py-5 bg-primary dark:bg-white text-white dark:text-primary rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-black/20 active:scale-95 group">
                            Launch Your Career
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-navy transition-colors">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="bg-primary p-1.5 rounded-lg">
                                <Terminal className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-black text-navy dark:text-white italic tracking-tight">TechPath</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-300 text-sm font-medium leading-relaxed">Simulating the future of work. We help students bridge the gap between education and global industry employment.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-black text-navy dark:text-white uppercase tracking-widest text-xs">Platform</h4>
                        <ul className="space-y-3 text-sm text-slate-500 font-medium">
                            <li><a href="#" className="hover:text-primary transition-colors">All Simulations</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">For Institutions</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Partner Program</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-black text-navy dark:text-white uppercase tracking-widest text-xs">Community</h4>
                        <ul className="space-y-3 text-sm text-slate-500 font-medium">
                            <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Discord Server</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-black text-navy dark:text-white uppercase tracking-widest text-xs">Support</h4>
                        <ul className="space-y-3 text-sm text-slate-500 font-medium">
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Work</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <p>&copy; 2026 TechPath Simulator. Built for the future of tech.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                        <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
