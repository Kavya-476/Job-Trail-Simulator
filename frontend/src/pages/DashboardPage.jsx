import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, BarChart3, ArrowUpRight, Twitter, Linkedin, Clock, Terminal, Activity } from 'lucide-react';
import { MOCK_JOBS, MOCK_USER, MOCK_SIMULATIONS } from '../data/mockData';
import JobCard from '../components/JobCard';

const DashboardPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 transition-colors duration-300">
            {/* Hero Section */}
            <section className="bg-navy rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-12 text-center text-white relative overflow-hidden shadow-2xl min-h-[300px] md:min-h-[350px] flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

                <div className="relative z-10 space-y-4 md:space-y-6 max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        Find your dream IT career today.
                    </h1>
                    <p className="text-slate-300 text-base md:text-lg font-medium opacity-80 max-w-2xl mx-auto">
                        Experience simulated tasks for various IT roles and build your portfolio.
                    </p>

                    <form className="relative max-w-2xl mx-auto mt-6 md:mt-10 w-full" onSubmit={(e) => e.preventDefault()}>
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Try 'UX Designer'..."
                            className="w-full pl-12 pr-4 md:pr-32 py-4 bg-white dark:bg-navy-light text-navy dark:text-white rounded-xl md:rounded-2xl border-none shadow-xl focus:ring-4 focus:ring-primary/20 outline-none font-medium text-base md:text-lg placeholder:text-slate-400"
                        />
                        <button className="hidden md:block absolute right-2 top-2 bottom-2 px-8 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors shadow-lg">
                            Search
                        </button>
                    </form>
                    <button className="md:hidden w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg mt-4 transition-transform active:scale-95">
                        Search Jobs
                    </button>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content Column */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Your Progress */}
                    <section>
                        <div className="flex items-center space-x-2 mb-6 sm:mb-8">
                            <BarChart3 className="w-6 h-6 text-primary" />
                            <h2 className="text-xl sm:text-2xl font-extrabold text-navy dark:text-white">Your Progress</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            {[
                                { label: 'Simulations', value: MOCK_USER.stats.simulationsStarted },
                                { label: 'Hours Learned', value: MOCK_USER.stats.hoursLearned },
                                { label: 'Badges', value: MOCK_USER.stats.badgesEarned }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white dark:bg-navy-light p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                                    <div className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2">{stat.label}</div>
                                    <div className="text-2xl sm:text-4xl font-extrabold text-navy dark:text-white">{stat.value}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Recommended Roles */}
                    <section>
                        <div className="flex justify-between items-end mb-8">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-navy dark:text-white">Recommended Roles</h2>
                            <Link to="/jobs" className="text-primary font-bold text-sm hover:underline flex items-center">
                                View all <ArrowUpRight className="ml-1 w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {MOCK_JOBS.slice(0, 4).map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    </section>

                    {/* Activity History */}
                    <section>
                        <div className="flex items-center space-x-2 mb-8">
                            <Activity className="w-6 h-6 text-primary" />
                            <h2 className="text-xl sm:text-2xl font-extrabold text-navy dark:text-white">Activity History</h2>
                        </div>
                        <div className="bg-white dark:bg-navy-light rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead className="bg-slate-50 dark:bg-navy border-b border-slate-100 dark:border-slate-800">
                                        <tr>
                                            <th className="px-6 sm:px-8 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Job Role</th>
                                            <th className="px-6 sm:px-8 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                                            <th className="px-6 sm:px-8 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 sm:px-8 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Score</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                        {MOCK_SIMULATIONS.slice(0, 5).map(sim => (
                                            <tr key={sim.id} className="hover:bg-slate-50 dark:hover:bg-navy transition-colors group">
                                                <td className="px-6 sm:px-8 py-5 font-bold text-navy dark:text-slate-200 group-hover:text-primary transition-colors">{sim.job_title}</td>
                                                <td className="px-6 sm:px-8 py-5 text-sm text-slate-500 dark:text-slate-400 font-medium">{sim.date}</td>
                                                <td className="px-6 sm:px-8 py-5">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${sim.status === 'Completed' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                        }`}>
                                                        {sim.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 sm:px-8 py-5 text-right font-extrabold text-primary dark:text-primary-light">{sim.score}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Column */}
                <aside className="lg:col-span-4 space-y-8">
                    {/* Active Tasks */}
                    <div className="bg-white dark:bg-navy-light p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h3 className="text-xl font-bold text-navy dark:text-white mb-6">Active Tasks</h3>
                        <div className="space-y-6">
                            {[
                                { title: 'Submit React Project', info: 'Frontend Dev Course • Due Today', color: 'bg-yellow-400' },
                                { title: 'Network Security Quiz', info: 'Cybersecurity • Completed', color: 'bg-green-400' },
                                { title: 'Start UX Research', info: 'Product Design • New', color: 'bg-blue-400' }
                            ].map((task, idx) => (
                                <div key={idx} className="flex space-x-4 group cursor-pointer">
                                    <div className={`mt-1 w-3 h-3 rounded-full ${task.color} shrink-0`}></div>
                                    <div>
                                        <div className="font-bold text-navy dark:text-slate-200 group-hover:text-primary transition-colors">{task.title}</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{task.info}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Explore by Category */}
                    <div className="bg-white dark:bg-navy-light p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h3 className="text-xl font-bold text-navy dark:text-white mb-6">Explore by Category</h3>
                        <div className="flex flex-wrap gap-3">
                            {['Development', 'Design', 'Marketing', 'Data Science', 'Management', 'Security'].map((cat) => (
                                <button key={cat} className="px-4 py-2 bg-slate-50 dark:bg-navy hover:bg-primary/5 text-slate-600 dark:text-slate-400 hover:text-primary rounded-xl font-bold text-sm border border-slate-100 dark:border-slate-800 transition-all">
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Simple Footer */}
            <footer className="pt-12 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <div className="flex items-center space-x-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Terminal className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-navy dark:text-white">CareerSim</span>
                    </div>
                    <div className="flex space-x-8">
                        <a href="#" className="hover:text-primary">About</a>
                        <a href="#" className="hover:text-primary">Terms</a>
                        <a href="#" className="hover:text-primary">Privacy</a>
                        <a href="#" className="hover:text-primary">Support</a>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                    </div>
                </div>
                <div className="text-center text-xs text-slate-400 mt-12 mb-8">
                    © 2026 CareerSim Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default DashboardPage;
